import { collections } from './validate.mjs';
const cell = v => String(v ?? '—').replaceAll('|','\\|').replaceAll('\n',' ').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function report(model, validation) {
  const lines=[`# ${cell(model.title)}`, '', `Stage: ${model.stage} · Revision: ${model.revision} · ${validation.completion}`, '', '## Alternatives', '', '| ID | Candidate | Status | Rationale | Tradeoffs |','|---|---|---|---|---|'];
  for(const c of model.candidates)lines.push(`| ${c.id} | ${cell(c.name)} | ${c.status} | ${cell(c.rationale)} | ${cell(c.tradeoffs.join('; '))} |`);
  lines.push('','## Evaluations — no cross-method or cross-axis average','','| Target | Axis | Method | Criterion | Result | Score | Evidence | Uncertainty |','|---|---|---|---|---|---|---|---|');
  for(const e of model.evaluations)lines.push(`| ${e.targetId} | ${e.axis} | ${e.method} | ${cell(e.criterion)} | ${e.result} | ${e.score ?? 'unevaluated'} | ${e.evidenceIds.join(', ')} | ${cell(e.uncertainty)} |`);
  lines.push('','## Assumptions','',...model.assumptions.map(a=>`- ${a.id}: ${cell(a.text)} (${a.status})`),'','## Risks','',...model.risks.map(x=>`- ${cell(x)}`),'','## Findings','',...validation.findings.map(f=>`- ${f.severity}: ${f.code} / ${f.target} — ${cell(f.message)}`),'','## Boundary','',validation.boundary,'');
  return lines.join('\n');
}
export function diff(before, after) {
  const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value==='object' ? Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])])) : value;
  const key = value => JSON.stringify(canonical(value));
  const flatten=m=>new Map(collections.flatMap(g=>m[g].map(x=>[x.id,{collection:g,...x}])));
  const a=flatten(before), b=flatten(after), added=[], removed=[], changed=[];
  for(const [id,item] of b) {if(!a.has(id))added.push(id);else if(key(a.get(id))!==key(item))changed.push(id);}
  for(const id of a.keys())if(!b.has(id))removed.push(id);
  const affected=new Set([...added,...removed,...changed]);
  // Reference closure traverses JSON values, never text substrings.
  function references(v) {if(typeof v==='string')return affected.has(v);if(Array.isArray(v))return v.some(references);return v && typeof v==='object' && Object.entries(v).some(([k,x])=>k!=='id' && references(x));}
  let size;
  do {size=affected.size;for(const [id,item] of [...a,...b])if(references(item))affected.add(id);} while(affected.size!==size);
  const metadataChanges=Object.keys(after).filter(k=>!collections.includes(k) && key(before[k])!==key(after[k]));
  return {added,removed,changed,metadataChanges,affected:[...affected].sort(),evaluationsToRepeat:after.evaluations.filter(e=>affected.has(e.targetId)||affected.has(e.id)||metadataChanges.includes('comparisonAxes')).map(e=>e.id),boundary:'Dependency-based scope proposal. Human review may expand impact; use full re-evaluation when uncertain.'};
}
