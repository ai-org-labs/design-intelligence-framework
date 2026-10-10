import {spawnSync} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {sha256} from '../src/validate.mjs';
const [aof=process.env.AOF_DIR,qif=process.env.QIF_DIR]=process.argv.slice(2);
if(!aof||!qif)throw Error('Pass AOF and QIF checkout directories (see docs/architecture/providers.json).');
const root=process.cwd(), runs=[];
for(const [name,script,args,cwd] of [
 ['aof-organization',path.resolve(aof,'src/cli.js'),['organization-verify','--project',root],root],
 ['aof-ledger',path.resolve(aof,'src/cli.js'),['quality-ledger-audit','--project',root],root],
 ['aof-situation',path.resolve(aof,'src/cli.js'),['situation-assess','--project',root],root],
 ['qif-package',path.resolve(qif,'tools/qif.mjs'),['validate',path.join(root,'docs/quality/dif.quality-gate.json')],path.resolve(qif)]
]) {
 const run=spawnSync(process.execPath,[script,...args],{cwd,encoding:'utf8',timeout:60000,maxBuffer:8*1024*1024});
 runs.push({name,command:[process.execPath,script,...args],cwd,exitCode:run.status,stdout:run.stdout,stderr:run.stderr,error:run.error?.message??null,entrypointSha256:sha256(await readFile(script))});
}
const report={runtime:process.version,providers:JSON.parse(await readFile('docs/architecture/providers.json')),runs,pass:runs.every(r=>r.exitCode===0),boundary:'Official provider structural/runtime checks. No human approval, independent model review, semantic truth or release Go is implied.'};
// Keep the original locally; shared evidence replaces machine-specific paths only.
await (await import('node:fs/promises')).mkdir('evidence/local',{recursive:true});
await writeFile('evidence/local/providers.raw.json',JSON.stringify(report,null,2)+'\n');
let shared=JSON.stringify(report,null,2);
for(const [absolute,label] of [[root,'$DIF_ROOT'],[path.resolve(aof),'$AOF_DIR'],[path.resolve(qif),'$QIF_DIR'],[process.execPath,'$NODE']])shared=shared.split(absolute).join(label);
const sanitized=JSON.parse(shared);
sanitized.pathRedaction='Machine-specific paths replaced with documented placeholders; unmodified local log is excluded from Git.';
await writeFile('evidence/providers.json',JSON.stringify(sanitized,null,2)+'\n');
console.log(JSON.stringify({pass:report.pass,runs:runs.map(r=>({name:r.name,exitCode:r.exitCode})),report:'evidence/providers.json'},null,2));
if(!report.pass)process.exitCode=1;
