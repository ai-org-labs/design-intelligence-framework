// Optional local renderer: node render.mjs <playwright module directory> <Chromium executable>
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const [runtime,executablePath]=process.argv.slice(2);
if(!runtime||!executablePath)throw Error('Supply an installed Playwright module directory and Chromium executable; no downloads are performed.');
const {chromium}=createRequire(import.meta.url)(path.resolve(runtime));
const root=path.dirname(fileURLToPath(import.meta.url));
await mkdir(path.join(root,'renders'),{recursive:true});
const browser=await chromium.launch({executablePath,headless:true});
const results=[];
try {
 for(const direction of ['A','B','C'])for(const width of [1280,390]) {
  const page=await browser.newPage({viewport:{width,height:width===390?844:960},deviceScaleFactor:1});
  await page.goto(pathToFileURL(path.join(root,'preview.html')).href+`?direction=${direction}`);
  await page.screenshot({path:path.join(root,`renders/${direction}-${width}.png`),fullPage:true});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  await page.locator('.cta').click();
  await page.waitForFunction(()=>{const r=document.querySelector('#teas').getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;});
  const targetReached=await page.locator('#teas').evaluate(e=>{const r=e.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;});
  const button=page.locator('[aria-controls="sencha"]');await button.click();
  const detailOpened=await page.locator('#sencha').isVisible();await button.click();
  const detailClosed=!(await page.locator('#sencha').isVisible());
  results.push({direction,width,overflow,targetReached,detailOpened,detailClosed});await page.close();
 }
 const page=await browser.newPage({viewport:{width:1280,height:960},deviceScaleFactor:1});
 await page.goto(pathToFileURL(path.join(root,'preview.html')).href+'?direction=A&revision=before');
 await page.screenshot({path:path.join(root,'renders/A-before-1280.png'),fullPage:true});
 await page.close();
 const board=await browser.newPage({viewport:{width:1500,height:900},deviceScaleFactor:1});
 await board.goto(pathToFileURL(path.join(root,'board.html')).href);
 await board.screenshot({path:path.join(root,'renders/comparison.png'),fullPage:true});
 const evidence={date:new Date().toISOString(),renderer:'Local Chromium through optional Playwright',results,pass:results.every(r=>!r.overflow&&r.targetReached&&r.detailOpened&&r.detailClosed),boundary:'Local HTML prototype layout/interaction checks only; no preference, conversion, assistive-technology or native-device evidence. Visual critique is by the author, not independent.'};
 await writeFile(path.join(root,'checks.json'),JSON.stringify(evidence,null,2)+'\n');
 console.log(JSON.stringify(evidence,null,2));
 if(!evidence.pass)process.exitCode=1;
}finally{await browser.close();}
