#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { validate, collections } from '../src/validate.mjs';
import { report, diff } from '../src/report.mjs';
const help=`DIF — development preview
  dif init OUTPUT.json
  dif validate MODEL.json [--gate warn|enforce]
  dif report MODEL.json
  dif diff BEFORE.json AFTER.json
  dif decide MODEL.json RECORD.json OUTPUT.json
Default gate: warn (diagnostics still report valid=false). Enforce exits 1 on findings.
Malformed input/usage/I/O exits 2. decide records a human-supplied approval and decision;
it does not obtain approval or verify the identity of its author. Output never overwrites.
`;
async function load(file) {return JSON.parse(await readFile(file,'utf8'));}
async function checked(file) {
  const model=await load(file), validation=await validate(model,{baseDir:path.dirname(path.resolve(file)),modelPath:path.resolve(file)});
  return {model,validation};
}
try {
  const [command,...args]=process.argv.slice(2);
  if(command==='--help' || command==='help' || !command) {process.stdout.write(help);}
  else if(command==='init') {
    if(args.length!==1)throw Error(help);
    const model={schemaVersion:'0.1',id:'design',title:'Untitled design',language:'ja',stage:'explore',revision:1,mode:'standard',comparisonAxes:[],risks:[],budget:{maxCandidates:6,maxToolCalls:null,toolCallsUsed:null,exhausted:false},...Object.fromEntries(collections.map(k=>[k,[]]))};
    await writeFile(args[0],JSON.stringify(model,null,2)+'\n',{flag:'wx'});
    console.log(JSON.stringify({created:args[0],completion:'in-progress'}));
  } else if(command==='validate' || command==='report') {
    if(!args[0] || (command==='report' && args.length!==1) || (command==='validate' && args.length!==1 && !(args.length===3 && args[1]==='--gate' && ['warn','enforce'].includes(args[2]))))throw Error(help);
    const {model,validation}=await checked(args[0]);
    if(command==='report') {
      if(validation.findings.some(f=>f.code==='SCHEMA'))throw Error('Cannot report malformed model. Run validate.');
      process.stdout.write(report(model,validation));
    } else console.log(JSON.stringify(validation,null,2));
    if(args[2]==='enforce' && !validation.valid)process.exitCode=1;
  } else if(command==='diff') {
    if(args.length!==2)throw Error(help);
    const pair=await Promise.all(args.map(checked));
    if(pair.some(p=>p.validation.findings.some(f=>f.code==='SCHEMA')))throw Error('Cannot diff malformed models.');
    console.log(JSON.stringify(diff(pair[0].model,pair[1].model),null,2));
  } else if(command==='decide') {
    if(args.length!==3)throw Error(help);
    if(path.dirname(path.resolve(args[0]))!==path.dirname(path.resolve(args[2])))throw Error('Decision output must share the model directory to preserve artifact paths.');
    const {model,validation:inputValidation}=await checked(args[0]), record=await load(args[1]);
    if(!inputValidation.valid)throw Error('Repair the input model before recording adoption.');
    if(!record.approval || !record.decision || Object.keys(record).some(k=>!['approval','decision'].includes(k)))throw Error('Expected {approval, decision} human-supplied record.');
    model.approvals.push(record.approval);model.decisions.push(record.decision);
    for(const a of model.artifacts)if(a.kind==='model'){a.path=path.basename(args[2]);a.sha256=null;}
    const validation=await validate(model);
    if(!validation.valid)throw Error(JSON.stringify(validation.findings));
    // The original proposal may say 'pending'; invalidate it rather than hide the new inconsistency.
    for(const a of model.artifacts)if(a.kind==='proposal'){a.status='missing';a.sha256=null;a.limitations='Regenerate the proposal to include the recorded human decision.';}
    await writeFile(args[2],JSON.stringify(model,null,2)+'\n',{flag:'wx'});
    console.log(JSON.stringify({created:args[2],authority:'human-attested; identity not verified',completion:'incomplete',next:'Regenerate the proposal and artifact digest to reflect the decision, then validate.'}));
  } else throw Error(help);
} catch(e) {console.error(JSON.stringify({error:e.message}));process.exitCode=2;}
