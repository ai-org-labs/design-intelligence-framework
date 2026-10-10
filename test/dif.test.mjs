import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdtemp,cp,symlink} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {validate,contrast} from '../src/validate.mjs';
import {diff,report} from '../src/report.mjs';
const base=JSON.parse(await readFile(new URL('../examples/login/design.json',import.meta.url)));
const modelPath=path.resolve('examples/login/design.json');
const context={baseDir:path.dirname(modelPath),modelPath};
const copy=()=>structuredClone(base);
const codes=r=>r.findings.map(f=>f.code);
const cli=(...args)=>spawnSync(process.execPath,['bin/dif.mjs',...args],{encoding:'utf8'});
test('complete local artifact set is ready for human review, never automatically approved',async()=>{
 const r=await validate(copy(),context); assert.equal(r.valid,true);assert.equal(r.completion,'ready-for-human-review');assert(base.approvals.every(a=>a.status==='pending'));
});
test('without files, completion remains incomplete even for valid declarations',async()=>{
 const r=await validate(copy());assert.equal(r.completion,'incomplete');assert(codes(r).includes('ARTIFACT_UNVERIFIED'));
});
const cases=[
 ['duplicate global IDs','DUPLICATE_ID',m=>m.components[0].id=m.screens[0].id],
 ['wrong reference kind','REFERENCE',m=>m.screens[0].componentIds=[m.candidates[0].id]],
 ['cross-candidate screen','CROSS_CANDIDATE',m=>m.flows[0].screenIds.push('b-login')],
 ['invalid transition','FLOW_ENDPOINT',m=>m.flows[0].transitions[0].to='missing'],
 ['missing accessible name','ACCESSIBLE_NAME',m=>m.components[0].label=' '],
 ['keyboard blocked','KEYBOARD',m=>m.components[0].keyboardAccessible=false],
 ['focus hidden','FOCUS',m=>m.components[0].focusVisible=false],
 ['low contrast','CONTRAST',m=>{m.components[0].foreground='#AAAAAA';m.components[0].background='#FFFFFF';}],
 ['invalid color is schema error','SCHEMA',m=>m.components[0].foreground='#ZZZZZZ'],
 ['hard constraint failure','HARD_CONSTRAINT',m=>m.candidates[0].constraintChecks[0].result='fail'],
 ['hard constraint unknown','HARD_CONSTRAINT',m=>m.candidates[0].constraintChecks[0].result='unknown'],
 ['unchecked constraint','CONSTRAINT_UNCHECKED',m=>m.candidates[0].constraintChecks=[]],
 ['fake unknown score','FABRICATED_SCORE',m=>m.evaluations.find(e=>e.result==='unknown').score=0.8],
 ['fake empirical proof','EMPIRICAL_EVIDENCE',m=>{const e=m.evaluations[0];e.method='empirical';}],
 ['evidence-free judgment','EVALUATION_EVIDENCE',m=>m.evaluations[0].evidenceIds=[]],
 ['hypothesis confirmed without observation','ASSUMPTION_EVIDENCE',m=>m.assumptions[0].status='confirmed'],
 ['invented approval','HUMAN_AUTHORITY',m=>m.approvals[0].status='approved'],
 ['unapproved adoption','DECISION_APPROVAL',m=>m.decisions.push({id:'d',candidateIds:['candidate-a'],action:'adopt',rationale:'test',approvalId:null,resultCandidateId:null})],
 ['cyclic lineage','LINEAGE_CYCLE',m=>{m.candidates[0].parentIds=['candidate-b'];m.candidates[1].parentIds=['candidate-a'];}],
 ['missing image','DELIVERABLE_MISSING',m=>m.artifacts.find(a=>a.kind==='mockup').status='unavailable'],
 ['stale evaluation','STALE_EVALUATION',m=>m.changes[0].evaluationIds=[]],
 ['future evaluation','EVALUATION_REVISION',m=>m.evaluations[0].revision=999],
 ['missing independent axis','EVALUATION_MISSING',m=>m.evaluations=m.evaluations.filter(e=>e.axis!=='business-value')],
 ['missing expert review','REVIEW_MISSING',m=>m.evaluations=m.evaluations.filter(e=>e.method!=='expert')],
 ['no comparable shortlist','FINAL_COMPARISON',m=>m.candidates[1].status='rejected'],
 ['budget exhausted','BUDGET_EXHAUSTED',m=>m.budget.exhausted=true],
 ['tool limit exceeded','BUDGET',m=>{m.budget.maxToolCalls=1;m.budget.toolCallsUsed=2;}],
 ['missing artifact digest','ARTIFACT_METADATA',m=>m.artifacts[0].sha256=null],
 ['artifact tampering','ARTIFACT_INVALID',m=>m.artifacts[0].sha256='0'.repeat(64)],
 ['schema rejects malformed collection','SCHEMA',m=>m.candidates='not-an-array'],
 ['unknown fields rejected','SCHEMA',m=>m.secretScore=100],
];
for(const [name,code,mutate] of cases)test(name,async()=>{const m=copy();mutate(m);const r=await validate(m,context);assert.equal(r.valid,false);assert(codes(r).includes(code),JSON.stringify(r));});
test('contrast formula matches known black/white extremes and threshold',()=>{assert.equal(contrast('#000000','#FFFFFF'),21);assert.equal(contrast('#FFFFFF','#FFFFFF'),1);assert(contrast('#767676','#FFFFFF')>=4.5);assert(contrast('#777777','#FFFFFF')<4.5);});
test('malformed JSON-like inputs yield diagnostics, not exceptions',async()=>{for(const m of [null,[],3,{}, {stage:'finalize'}])assert.equal((await validate(m)).valid,false);});
test('artifacts cannot escape package through path or symlink',async()=>{
 const temp=await mkdtemp(path.join(os.tmpdir(),'dif-paths-'));await cp('examples/login',path.join(temp,'package'),{recursive:true});await writeFile(path.join(temp,'outside.md'),'outside');await symlink(path.join(temp,'outside.md'),path.join(temp,'package','linked.md'));
 for(const file of ['../outside.md','linked.md',path.join(temp,'outside.md')]) {
  const m=copy();m.artifacts[0].path=file;const r=await validate(m,{baseDir:path.join(temp,'package'),modelPath:path.join(temp,'package','design.json')});assert(codes(r).includes('ARTIFACT_INVALID'));
 }
});
test('text file is not a mockup even with a matching digest',async()=>{const m=copy();Object.assign(m.artifacts.find(a=>a.kind==='mockup'),{path:m.artifacts[0].path,sha256:m.artifacts[0].sha256});assert(codes(await validate(m,context)).includes('ARTIFACT_INVALID'));});
test('diff follows references to impacted screen, flow and review',()=>{
 const a=copy(),b=copy();b.components[0].label='New label';const d=diff(a,b);assert(d.changed.includes('a-signup-email'));assert(d.affected.includes('a-signup'));assert(d.affected.includes('flow-a'));assert.equal(diff(a,JSON.parse(JSON.stringify(a))).changed.length,0);
});
test('reports retain independent methods and unknown scores',async()=>{const m=copy();const output=report(m,await validate(m,context));assert(output.includes('no cross-method'));assert(output.includes('unevaluated'));assert(output.includes('empirical'));assert(output.includes('feasibility'));});
test('CLI defaults to warn; enforce fails protected negative example; invalid mode fails',()=>{
 const warn=cli('validate','examples/login/before.json');assert.equal(warn.status,0);assert.equal(JSON.parse(warn.stdout).valid,false);
 assert.equal(cli('validate','examples/login/before.json','--gate','enforce').status,1);
 assert.equal(cli('validate','examples/login/design.json','--gate','silent').status,2);
 assert.equal(cli('nonsense').status,2);
});
test('init creates valid explore model and refuses overwrite',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'dif-init-')),file=path.join(dir,'design.json');assert.equal(cli('init',file).status,0);assert.equal(cli('validate',file,'--gate','enforce').status,0);assert.equal(cli('init',file).status,2);
});
test('human-supplied decision record round trips without changing original',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'dif-decision-'));await cp('examples/login',dir,{recursive:true});
 const input=path.join(dir,'design.json'), output=path.join(dir,'decided.json'), record=path.join(dir,'record.json');const initial=await readFile(input,'utf8');
 const approval={id:'test-human-approval',scope:'design-adoption',targetIds:['candidate-a'],status:'approved',actor:'Test human (synthetic fixture)',source:'Synthetic test statement; not real adoption',recordedAt:'2026-10-10T12:00:00Z',authority:'human-attested'};
 const decision={id:'test-decision',candidateIds:['candidate-a'],action:'adopt',rationale:'Synthetic fixture choice',approvalId:approval.id,resultCandidateId:null};
 await writeFile(record,JSON.stringify({approval,decision}));const r=cli('decide',input,record,output);assert.equal(r.status,0,r.stderr);assert.equal(cli('validate',output,'--gate','enforce').status,1);assert.equal(JSON.parse(cli('validate',output).stdout).completion,'incomplete');assert.equal(await readFile(input,'utf8'),initial);assert.equal(cli('decide',input,record,output).status,2);
});

test('must requirements cannot silently disappear from a shortlisted option',async()=>{const m=copy();m.candidates[0].requirementIds=[];assert(codes(await validate(m,context)).includes('REQUIREMENT_COVERAGE'));});
test('declared hard conflicts cannot both be claimed satisfied',async()=>{const m=copy();m.constraints.push({id:'conflict',text:'conflicting requirement',kind:'hard',source:'test',conflictsWith:['constraint-access']});for(const c of m.candidates)c.constraintChecks.push({constraintId:'conflict',result:'pass',rationale:'claim',evidenceIds:['ev-declarations']});assert(codes(await validate(m,context)).includes('CONTRADICTORY_CONSTRAINTS'));});
