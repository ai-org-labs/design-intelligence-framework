import Ajv from 'ajv';
import { readFile, realpath, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const schema = JSON.parse(await readFile(new URL('../schemas/design.schema.json', import.meta.url)));
const checkSchema = new Ajv({ allErrors: true, strict: false }).compile(schema);
export const collections = ['requirements','assumptions','constraints','candidates','flows','screens','components','evidence','evaluations','decisions','approvals','changes','artifacts'];
export const sha256 = data => createHash('sha256').update(data).digest('hex');
export function contrast(a, b) {
  const luminance = hex => {
    if (!/^#[a-f\d]{6}$/i.test(hex)) throw new Error('Expected #RRGGBB');
    const c = hex.slice(1).match(/../g).map(x => parseInt(x,16)/255).map(x => x<=0.04045 ? x/12.92 : ((x+0.055)/1.055)**2.4);
    return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722;
  };
  const [x,y] = [luminance(a),luminance(b)].sort((x,y)=>y-x);
  return (x+0.05)/(y+0.05);
}
export async function validate(model, { baseDir, modelPath } = {}) {
  const findings = [];
  const add = (code, target, message, severity='error') => findings.push({code,target,message,severity});
  if (!checkSchema(model)) {
    for (const e of checkSchema.errors) add('SCHEMA',e.instancePath || '/',`${e.message} ${JSON.stringify(e.params)}`);
    return result();
  }
  const index = new Map();
  for (const group of collections) for (const item of model[group]) {
    if (index.has(item.id) || item.id===model.id) add('DUPLICATE_ID',item.id,'IDs must be globally unique.');
    index.set(item.id,{group,item});
  }
  const resolve = (id, group, owner) => {
    const found=index.get(id);
    if (!found || (group && found.group!==group)) add('REFERENCE',owner,`Expected ${group || 'entity'} reference: ${id}`);
    return found?.item;
  };
  const refs=(item,key,group)=>item[key].forEach(id=>resolve(id,group,item.id));
  for (const c of model.candidates) {
    refs(c,'assumptionIds','assumptions'); refs(c,'requirementIds','requirements'); refs(c,'parentIds','candidates');
    const checked=new Set();
    for (const ch of c.constraintChecks) {
      const ct=resolve(ch.constraintId,'constraints',c.id);
      ch.evidenceIds.forEach(id=>resolve(id,'evidence',c.id));
      if (checked.has(ch.constraintId)) add('DUPLICATE_CHECK',c.id,ch.constraintId);
      checked.add(ch.constraintId);
      if (ct?.kind==='hard' && ch.result!=='pass' && c.status==='shortlisted') add('HARD_CONSTRAINT',c.id,`${ct.id}: ${ch.result}; keep as hypothetical or resolve before shortlisting.`);
    }
    if(model.stage!=='explore') {
      for(const ct of model.constraints) if(!checked.has(ct.id)) add('CONSTRAINT_UNCHECKED',c.id,ct.id);
      if(c.status==='shortlisted') for(const req of model.requirements.filter(r=>r.priority==='must')) if(!c.requirementIds.includes(req.id)) add('REQUIREMENT_COVERAGE',c.id,req.id);
      if(!c.differences.length || !c.tradeoffs.length) add('COMPARISON',c.id,'Record meaningful differences and tradeoffs.');
    }
  }
  const visiting=new Set(),visited=new Set();
  function ancestry(id) {
    if(visiting.has(id)){add('LINEAGE_CYCLE',id,'Candidate lineage must be acyclic.');return;}
    if(visited.has(id))return;
    visiting.add(id);
    index.get(id)?.item.parentIds?.forEach(ancestry);
    visiting.delete(id);visited.add(id);
  }
  model.candidates.forEach(c=>ancestry(c.id));
  for(const ct of model.constraints) {
    refs(ct,'conflictsWith','constraints');
    if(ct.kind==='hard') for(const other of ct.conflictsWith) if(index.get(other)?.item.kind==='hard') {
      for(const c of model.candidates.filter(c=>c.status==='shortlisted')) if([ct.id,other].every(id=>c.constraintChecks.some(ch=>ch.constraintId===id && ch.result==='pass'))) add('CONTRADICTORY_CONSTRAINTS',c.id,`Resolve the declared conflict between ${ct.id} and ${other}.`);
    }
  }
  for(const a of model.assumptions) {
    refs(a,'evidenceIds','evidence');
    if(a.status==='confirmed' && (!a.evidenceIds.length || a.evidenceIds.some(id=>['hypothesis','expert-inference'].includes(index.get(id)?.item.kind)))) add('ASSUMPTION_EVIDENCE',a.id,'Confirmation needs non-hypothetical evidence.');
  }
  for (const group of ['flows','screens','components']) for(const item of model[group]) resolve(item.candidateId,'candidates',item.id);
  for(const f of model.flows) {
    refs(f,'screenIds','screens');
    for(const sid of f.screenIds) if(index.get(sid)?.item.candidateId!==f.candidateId) add('CROSS_CANDIDATE',f.id,sid);
    for(const edge of f.transitions) for(const sid of [edge.from,edge.to]) if(!f.screenIds.includes(sid)) add('FLOW_ENDPOINT',f.id,sid);
  }
  for(const s of model.screens) {
    refs(s,'componentIds','components');
    for(const cid of s.componentIds) if(index.get(cid)?.item.candidateId!==s.candidateId) add('CROSS_CANDIDATE',s.id,cid);
  }
  for(const c of model.components) {
    if(['input','button','link'].includes(c.kind)) {
      if(!c.label.trim()) add('ACCESSIBLE_NAME',c.id,'Interactive components need an accessible name.');
      if(c.keyboardAccessible===false) add('KEYBOARD',c.id,'Critical controls must be keyboard operable.');
      if(c.focusVisible===false) add('FOCUS',c.id,'Critical controls need visible focus.');
      if(c.keyboardAccessible===null || c.focusVisible===null) add('INTERACTION_UNVERIFIED',c.id,'Keyboard/focus behavior is not evaluated.','warning');
    }
    if(c.foreground && c.background) {
      const ratio=contrast(c.foreground,c.background);
      if(ratio<c.minContrast) add('CONTRAST',c.id,`Declared opaque sRGB contrast ${ratio.toFixed(2)} < ${c.minContrast}.`);
    } else add('CONTRAST_UNVERIFIED',c.id,'Missing colors; no measured contrast.','warning');
  }
  for(const e of model.evaluations) {
    resolve(e.targetId,null,e.id); refs(e,'evidenceIds','evidence');
    if(e.revision>model.revision) add('EVALUATION_REVISION',e.id,'Evaluation is from a future revision.');
    if(e.result==='unknown' && e.score!==null) add('FABRICATED_SCORE',e.id,'Unknown evaluations cannot carry scores.');
    if(e.result!=='unknown' && !e.evidenceIds.length) add('EVALUATION_EVIDENCE',e.id,'A judgment needs evidence, including not-applicable rationale.');
    if(e.method==='empirical' && e.result!=='unknown' && !e.evidenceIds.some(id=>index.get(id)?.item.kind==='measurement')) add('EMPIRICAL_EVIDENCE',e.id,'Empirical claims need a measurement.');
    if(e.method==='rule' && e.result!=='unknown' && !e.evidenceIds.some(id=>['fact','standard','measurement'].includes(index.get(id)?.item.kind))) add('RULE_EVIDENCE',e.id,'Rule judgments need facts, standards or measurements.');
  }
  for(const a of model.approvals) {
    refs(a,'targetIds',null);
    if(a.status!=='pending' && (a.authority!=='human-attested' || !a.actor?.trim() || !a.source?.trim() || !a.recordedAt || !Number.isFinite(Date.parse(a.recordedAt)))) add('HUMAN_AUTHORITY',a.id,'Record an attributable human statement and timestamp; never fabricate approval.');
  }
  for(const d of model.decisions) {
    refs(d,'candidateIds','candidates');
    if(d.resultCandidateId)resolve(d.resultCandidateId,'candidates',d.id);
    if(d.approvalId)resolve(d.approvalId,'approvals',d.id);
    if(d.action!=='defer') {
      const a=index.get(d.approvalId)?.item;
      if(!a || a.scope!=='design-adoption' || a.status!=='approved' || !d.candidateIds.every(id=>a.targetIds.includes(id))) add('DECISION_APPROVAL',d.id,'Adoption/rejection needs a matching recorded human approval.');
    }
    if(['adopt','partial','merge'].includes(d.action)) for(const cid of d.candidateIds) {
      const c=index.get(cid)?.item;
      if(c?.status!=='shortlisted')add('ADOPTION_ELIGIBILITY',d.id,`Candidate ${cid} is not a viable shortlist option.`);
    }
    if(d.action==='merge') {
      const child=index.get(d.resultCandidateId)?.item;
      if(!child || child.approach!=='merged' || !d.candidateIds.every(id=>child.parentIds.includes(id))) add('MERGE_LINEAGE',d.id,'Merged candidate must preserve all parents.');
    }
  }
  for(const ch of model.changes) {
    refs(ch,'targetIds',null);refs(ch,'evaluationIds','evaluations');
    if(ch.fromRevision>=ch.toRevision || ch.toRevision>model.revision) add('CHANGE_REVISION',ch.id,'Invalid change revision range.');
    if(model.stage==='finalize') for(const target of ch.targetIds) if(!ch.evaluationIds.some(id=>{const e=index.get(id)?.item;return e?.targetId===target && e.revision>=ch.toRevision;})) add('STALE_EVALUATION',target,'Changed target needs a linked re-evaluation.');
  }
  const shortlist=model.candidates.filter(c=>c.status==='shortlisted');
  if(model.candidates.length>model.budget.maxCandidates) add('BUDGET',model.id,'Candidate budget exceeded.');
  if(model.budget.maxToolCalls!==null && model.budget.toolCallsUsed!==null && model.budget.toolCallsUsed>model.budget.maxToolCalls) add('BUDGET',model.id,'Tool call budget exceeded.');
  if(model.budget.exhausted) add('BUDGET_EXHAUSTED',model.id,'Work stopped at budget; report remaining work.');
  if(model.stage!=='explore') {
    if(model.candidates.length<2 || !model.comparisonAxes.length) add('DIVERSITY',model.id,'Compare multiple candidates on explicit axes.');
    if(!model.requirements.length) add('REQUIREMENTS',model.id,'Requirements are missing.');
  }
  if(['visualize','finalize'].includes(model.stage)) {
    for(const c of shortlist) if(!model.flows.some(f=>f.candidateId===c.id)) add('FLOW_MISSING',c.id,'Shortlisted candidates need a flow.');
  }
  for(const a of model.artifacts) {
    refs(a,'candidateIds','candidates');refs(a,'entityIds',null);
    if(a.status!=='generated')continue;
    if(!a.path || (a.kind!=='model' && !a.sha256)) {add('ARTIFACT_METADATA',a.id,'Generated artifacts need path and digest (model excludes its own digest).');continue;}
    if(!baseDir) {add('ARTIFACT_UNVERIFIED',a.id,'No filesystem context supplied.','warning');continue;}
    try {
      const root=await realpath(baseDir), resolved=await realpath(path.resolve(root,a.path));
      const rel=path.relative(root,resolved);
      if(path.isAbsolute(a.path) || rel==='..' || rel.startsWith(`..${path.sep}`) || path.isAbsolute(rel)) throw new Error('Artifact must remain inside the package directory.');
      if(!(await stat(resolved)).isFile())throw new Error('Artifact is not a file.');
      const data=await readFile(resolved);
      if(!data.length)throw new Error('Artifact is empty.');
      if(a.kind==='model' && (!modelPath || resolved!==await realpath(modelPath)))throw new Error('Model artifact must reference the validated file.');
      if(a.sha256 && sha256(data)!==a.sha256)throw new Error('Artifact digest differs; review consistency and regenerate.');
      if(a.kind==='mockup') {
        const ext=path.extname(resolved).toLowerCase();
        const svg=ext==='.svg' && /<svg[\s>]/.test(data.toString()) && /<\/svg>/.test(data.toString()) && !/<script|<foreignObject|\bon\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:|data:|javascript:)/i.test(data.toString());
        const png=ext==='.png' && data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
        const jpg=['.jpg','.jpeg'].includes(ext) && data[0]===255 && data[1]===216 && data.at(-2)===255 && data.at(-1)===217;
        if(!(svg||png||jpg))throw new Error('Expected local SVG, PNG or JPEG mockup; text fallback is not an image.');
      }
    } catch(e) {add('ARTIFACT_INVALID',a.id,e.message);}
  }
  if(model.stage==='finalize') {
    if(shortlist.length<2) add('FINAL_COMPARISON',model.id,'Final proposal requires at least two viable shortlisted alternatives.');
    for(const kind of ['proposal','diagram','mockup','model']) if(!model.artifacts.some(a=>a.kind===kind && a.status==='generated')) add('DELIVERABLE_MISSING',model.id,kind);
    for(const c of shortlist) {
      for(const kind of ['proposal','diagram','mockup']) if(!model.artifacts.some(a=>a.kind===kind && a.status==='generated' && a.candidateIds.includes(c.id)))add('CANDIDATE_ARTIFACT',c.id,kind);
      for(const axis of ['design-quality','feasibility','business-value']) if(!model.evaluations.some(e=>e.targetId===c.id && e.axis===axis && e.revision===model.revision))add('EVALUATION_MISSING',c.id,axis);
      for(const method of ['rule','expert']) if(!model.evaluations.some(e=>e.targetId===c.id && e.method===method && e.result!=='unknown' && e.revision===model.revision))add('REVIEW_MISSING',c.id,method);
    }
    if(!model.risks.length) add('RISKS_MISSING',model.id,'State remaining risks and unevaluated matters.');
  }
  return result();
  function result() {
    const errors=findings.filter(f=>f.severity==='error');
    const artifactsUnverified=findings.some(f=>f.code==='ARTIFACT_UNVERIFIED');
    return {schemaVersion:'0.1',valid:errors.length===0,stage:model?.stage??null,
      completion:errors.length || artifactsUnverified ? 'incomplete' : model.stage==='finalize' ? 'ready-for-human-review' : 'in-progress',
      findings,boundary:'Checks structure, references, declared properties and artifact integrity. Human semantic review, real accessibility, user outcomes and approval authenticity are not proven.'};
  }
}
