import {readdir,readFile,access} from 'node:fs/promises';
import path from 'node:path';
for(const name of await readdir('skills')) {
 const root=path.join('skills',name), source=await readFile(path.join(root,'SKILL.md'),'utf8');
 const match=source.match(/^---\nname: ([a-z0-9]+(?:-[a-z0-9]+)*)\ndescription: ([^\n]+)\n/);
 if(!match || match[1]!==name || name.length>64 || match[2].length>1024)throw Error(`Invalid skill metadata: ${name}`);
 for(const m of source.matchAll(/\]\((references\/[^)]+)\)/g))await access(path.join(root,m[1]));
}
for(const [a,b] of [['schemas/design.schema.json','skills/dif-design/references/design.schema.json'],['knowledge/principles.json','skills/dif-design/references/knowledge.json']]) {
 if(!(await readFile(a)).equals(await readFile(b)))throw Error(`Bundled resource drift: ${b}`);
}
console.log('Skill metadata, referenced resources and bundled contracts passed. Host behavior not proven.');
