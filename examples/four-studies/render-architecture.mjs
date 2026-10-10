// Optional, use the provider checkouts pinned in docs/architecture/providers.json.
import {readFile,writeFile} from 'node:fs/promises';
import {pathToFileURL,fileURLToPath} from 'node:url';
import path from 'node:path';
import {JSDOM} from 'jsdom';
const[archmodelDir,archmapDir]=process.argv.slice(2);if(!archmodelDir||!archmapDir)throw Error('Supply pinned built ArchModel/ArchMap checkouts');
const dom=new JSDOM('<html><body></body></html>');globalThis.window=dom.window;globalThis.document=dom.window.document;globalThis.DOMParser=dom.window.DOMParser;
const am=await import(pathToFileURL(path.resolve(archmodelDir,'dist/archmodel.js'))),map=await import(pathToFileURL(path.resolve(archmapDir,'dist/archmap-mermaid.js'))),root=path.dirname(fileURLToPath(import.meta.url));
const model=am.parseModel(await readFile(path.join(root,'studies.archmodel.yaml'),'utf8')),diagnostics=am.validateModel(model);if(diagnostics.length)throw Error(JSON.stringify(diagnostics));
const ids=new Map(model.entities.map((e,i)=>[e.id,`s${i}`])),label=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replace(/[\n\r]/g,' ');
const mmd=['%% archmap: {"view":"layers"}','flowchart LR',...model.entities.map(e=>`  ${ids.get(e.id)}["${label(e.name)}"]`),...model.edges.map(e=>`  ${ids.get(e.from)} -->|"${label(e.relation)}"| ${ids.get(e.to)}`)].join('\n')+'\n';
const result=await map.renderMermaid(mmd);await writeFile(path.join(root,'architecture.mmd'),mmd);await writeFile(path.join(root,'architecture.svg'),result.svg);await writeFile(path.join(root,'architecture-check.json'),JSON.stringify({diagnostics,entities:model.entities.length,edges:model.edges.length,boundary:'Source parse and generated projection only; human acceptance remains unknown.'},null,2)+'\n');console.log('Study ArchModel validated; ArchMap generated.');
