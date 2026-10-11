import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const [runtime,executablePath]=process.argv.slice(2);if(!runtime||!executablePath)throw Error('Supply installed Playwright and Chromium');
const {chromium}=createRequire(import.meta.url)(path.resolve(runtime)),root=path.dirname(fileURLToPath(import.meta.url));
const browser=await chromium.launch({executablePath,headless:true});const results=[];
try{
 const page=await browser.newPage();await page.goto(pathToFileURL(path.join(root,'menu-print.html')).href);await page.evaluate(()=>document.fonts.ready);await page.emulateMedia({media:'print'});
 // Await decode of the shared photo asset as well as text layout.
 await page.evaluate(()=>new Promise((resolve,reject)=>{const i=new Image();i.onload=resolve;i.onerror=reject;i.src='assets/menu-food-grid.png';}));
 const bounds=await page.locator('.sheet').evaluateAll(es=>es.map(e=>({w:e.offsetWidth,h:e.offsetHeight,overflow:e.scrollHeight>e.clientHeight,footer:e.querySelector('footer').getBoundingClientRect().top,last:e.querySelector('.turn-over,.allergy-box').getBoundingClientRect().bottom})));
 if(bounds.some(b=>b.overflow||b.last>b.footer-4))throw Error('Printed content overlaps footer or overflows');
 await mkdir(path.resolve(root,'../../output/pdf'),{recursive:true});await page.pdf({path:path.resolve(root,'../../output/pdf/casa-tutti-table-menu.pdf'),printBackground:true,preferCSSPageSize:true,displayHeaderFooter:false});results.push({name:'A4 layout content stays above footer',pass:true,bounds});
 const p=await browser.newPage({viewport:{width:320,height:240}});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(pathToFileURL(path.join(root,'monster.html')).href);await p.evaluate(()=>window.FieldnoteDemo.reset());
 const shot=async name=>{await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await p.screenshot({path:path.join(root,`renders/screen-${name}.png`)});};
 await shot('list');await p.getByRole('button',{name:'コケマルをしらべる'}).click();await shot('detail');await p.getByRole('button',{name:'‹ 一覧',exact:true}).click();await p.getByRole('button',{name:'さがす',exact:true}).click();await shot('search');await p.getByRole('button',{name:'しらべる',exact:true}).click();await shot('found');await p.evaluate(()=>window.FieldnoteDemo.fail=true);await p.getByRole('button',{name:'図鑑に記録',exact:true}).click();if(!(await p.locator('.m-notice').innerText()).includes('記録できません'))throw Error('Missing failed save state');await shot('failure');await p.evaluate(()=>window.FieldnoteDemo.fail=false);await p.getByRole('button',{name:'図鑑に記録',exact:true}).click();await shot('saved');
 if(errors.length)throw Error(errors.join('\n'));const b=await p.locator('#monster-screen').boundingBox();if(b.x!==0||b.y!==0||b.width!==320||b.height!==240)throw Error('Not an exact display-only viewport');
 results.push({name:'Display-only bounds and interaction states',pass:true,bounds:b});
 await writeFile(path.join(root,'media-checks.json'),JSON.stringify({results,pass:true,boundary:'PDF layout and Web display prototype only. Physical print/color and M5 firmware, fonts, touch and performance are unverified.'},null,2)+'\n');
}finally{await browser.close();}
