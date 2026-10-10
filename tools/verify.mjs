import {spawnSync} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
import {sha256} from '../src/validate.mjs';
const commands=[['--test'],['tools/check-skills.mjs'],['bin/dif.mjs','validate','examples/login/design.json','--gate','enforce'],['tools/benchmark.mjs']];
const runs=[];
for(const args of commands) {
 const result=spawnSync(process.execPath,args,{encoding:'utf8',timeout:60000,maxBuffer:8*1024*1024});
 process.stdout.write(result.stdout||'');process.stderr.write(result.stderr||'');
 runs.push({command:['node',...args],exitCode:result.status,stdout:result.stdout,stderr:result.stderr,error:result.error?.message??null});
 if(result.status!==0)break;
}
const files=['src/validate.mjs','src/report.mjs','bin/dif.mjs','schemas/design.schema.json','test/dif.test.mjs','examples/login/design.json','package-lock.json'];
const fingerprints=Object.fromEntries(await Promise.all(files.map(async f=>[f,sha256(await readFile(f))])));
const pass=runs.length===commands.length&&runs.every(r=>r.exitCode===0);
await writeFile('evidence/verification.json',JSON.stringify({runtime:process.version,pass,fingerprints,runs,boundary:'Local machine checks and authored fixtures only; independent Skill effectiveness, host compatibility and semantic design quality unproven.'},null,2)+'\n');
if(!pass)process.exitCode=1;
