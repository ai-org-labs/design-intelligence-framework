import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {validate} from '../src/validate.mjs';
const results=[];
for(let level=1;level<=3;level++) {
 const spec=JSON.parse(await readFile(`benchmarks/level-${level}.json`,'utf8'));
 const {base,patches,expectedFindings}=spec.mechanicalFixture;
 const model=JSON.parse(await readFile(base,'utf8'));
 for(const patch of patches){let item=model;for(const key of patch.path.slice(0,-1))item=item[key];item[patch.path.at(-1)]=patch.value;}
 const actual=(await validate(model,{baseDir:path.dirname(path.resolve(base)),modelPath:path.resolve(base)})).findings.filter(f=>f.severity==='error');
 const key=f=>`${f.code}:${f.target}`;
 const expected=new Set(expectedFindings.map(key)), observed=new Set(actual.map(key));
 const tp=[...expected].filter(x=>observed.has(x)).length,fp=[...observed].filter(x=>!expected.has(x)).length,fn=expected.size-tp;
 const criticalMisses=expectedFindings.filter(f=>f.severity==='critical' && !observed.has(key(f))).length;
 results.push({case:spec.id,truePositive:tp,falsePositive:fp,falseNegative:fn,precision:tp+fp?tp/(tp+fp):null,recall:expected.size?tp/expected.size:null,criticalMisses,severityAccuracy:null,proposalMetrics:null,agentTrials:0,pass:fp===0 && fn===0 && criticalMisses===0});
}
const positivePath=path.resolve('examples/login/design.json');
const positive=await validate(JSON.parse(await readFile(positivePath)),{baseDir:path.dirname(positivePath),modelPath:positivePath});
const result={suite:'DIF authored mechanical fixtures v0.1',runtime:process.version,skillVersion:'0.1.0-dev.0',gate:{status:'provisional-development-only',expectedRecall:1,expectedPrecision:1,maxCriticalMisses:0},positiveControlPassed:positive.valid,results,pass:positive.valid&&results.every(r=>r.pass),boundary:'These are exact-rule fixtures with authored mutations, not held-out design tasks or AI ability measurements. Severity classification, diversity, practicality and exploration efficiency are unevaluated; scores are null.'};
await mkdir('evidence',{recursive:true});await writeFile('evidence/benchmark.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
