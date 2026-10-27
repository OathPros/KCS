import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const ids=['opportunity','case-for-change','method','daily-practice','rollout','operating-model','evidence','decisions'];
test('all eight sections navigate with stable deep links and no runtime errors',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('./');
 for(let i=0;i<ids.length;i++){
  await expect(page.locator('.slide:visible')).toHaveCount(1);
  await expect(page.locator('.slide:visible')).toHaveAttribute('id',ids[i]);
  await expect(page.locator('.slide:visible h1')).toHaveCount(1);
  await expect(page.locator('#current-number')).toHaveText('0'+(i+1));
  if(i<7)await page.getByRole('button',{name:'Next section',exact:true}).click();
 }
 await expect(page.getByRole('button',{name:'Next section',exact:true})).toBeDisabled();
 await page.reload();await expect(page.locator('#decisions')).toBeVisible();expect(errors).toEqual([]);
});
test('overview and presenter sources work with keyboard and focus return',async({page})=>{
 await page.goto('./');await page.keyboard.press('m');await expect(page.getByRole('dialog',{name:'The briefing, at a glance.'})).toBeVisible();
 await page.getByRole('button',{name:'04 Agent Solve walkthrough'}).click();
 await expect(page.locator('#daily-practice')).toBeVisible();await expect(page.locator('dialog[open]')).toHaveCount(0);
 await page.getByRole('button',{name:'Notes & sources',exact:true}).click();
 await expect(page.locator('#presenter-notes')).toContainText('Duo');
 await expect(page.locator('#presenter-notes a').first()).toHaveAttribute('href',/library.serviceinnovation.org/);
 await page.keyboard.press('Escape');await expect(page.locator('#notes-button')).toBeFocused();
 await page.locator('#presentation').focus();await page.keyboard.press('ArrowRight');await expect(page.locator('#rollout')).toBeVisible();
});
test('problem, role, evidence and rollout tabs all update their detail',async({page})=>{
 for(const [id,group,checks] of [
  ['case-for-change','problems',['Use shared knowledge','Start with what’s known','Improve as you reuse','Find a useful answer']],
  ['rollout','stages',['Open access','Learn from real work','Bring the next team','Open suitable']],
  ['operating-model','roles',['Practise in real tickets','Build judgement','Turn patterns','Confirm service truth','Protect time']],
  ['evidence','evidence',['Did it help','Can people find','Is the practice']]
 ]){
  await page.goto('./#'+id);
  const tabs=page.locator(`[data-tab="${group}"]`);
  for(let i=0;i<checks.length;i++){
   await tabs.nth(i).click();await expect(tabs.nth(i)).toHaveAttribute('aria-selected','true');
   await expect(page.locator('#'+group+'-panel')).toContainText(checks[i]);
  }
 }
});
test('tab arrow keys move within their group without moving the slide',async({page})=>{
 await page.goto('./#rollout');await page.locator('#stages-tab-0').focus();await page.keyboard.press('ArrowRight');
 await expect(page.locator('#stages-tab-1')).toBeFocused();await expect(page.locator('#stages-tab-1')).toHaveAttribute('aria-selected','true');
 await expect(page.locator('#rollout')).toBeVisible();await page.keyboard.press('End');await expect(page.locator('#stages-tab-3')).toBeFocused();
});
test('all eight KCS practices expose useful detail',async({page})=>{
 await page.goto('./#method');
 for(let i=0;i<8;i++){
  const button=page.locator(`[data-practice="${i}"]`);await button.click();
  await expect(button).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#practice-detail')).toContainText((await button.innerText()).replace(/0\d|↗/g,'').trim());
 }
});
for(const article of ['missing','current','update'])for(const resolution of ['self','assisted']){
 test(`agent walkthrough: ${article} knowledge, ${resolution} resolution`,async({page})=>{
  await page.goto('./#daily-practice');
  await page.getByRole('button',{name:'Review & search'}).click();
  if(article==='missing')await page.locator('[data-walk-choice="missing"]').click();
  else {await page.locator('[data-walk-choice="exists"]').click();await page.locator(`[data-walk-choice="${article}"]`).click();}
  await page.getByRole('button',{name:'Continue to linking'}).click();
  await expect(page.locator('#walk-panel h2')).toHaveText('Link the article.');
  await page.getByRole('button',{name:'Link & continue'}).click();
  await page.locator(`[data-walk-choice="${resolution}"]`).click();
  if(resolution==='self')await expect(page.locator('#walk-panel')).toContainText('approved content');
  await page.getByRole('button',{name:'Confirm the outcome'}).click();await page.getByRole('button',{name:'Complete walkthrough'}).click();
  await expect(page.locator('#walk-step-count')).toHaveText('WALKTHROUGH COMPLETE');
  await expect(page.locator('#walk-panel')).toContainText(article==='missing'?'Capture path':'Reuse path');
  await expect(page.locator('#walk-panel')).toContainText(resolution==='self'?'Safe requester self-solve':'Agent-assisted resolution');
  await page.getByRole('button',{name:'Explore another route'}).click();await expect(page.locator('#walk-step-count')).toHaveText('STEP 1 OF 6');
 });
}
test('walkthrough backtracking restores decisions and restart clears route',async({page})=>{
 await page.goto('./#daily-practice');await page.getByRole('button',{name:'Review & search'}).click();await page.locator('[data-walk-choice="exists"]').click();await page.locator('[data-walk-choice="update"]').click();
 await page.getByRole('button',{name:'Back a step'}).click();await expect(page.locator('#walk-panel h2')).toContainText('need an update');
 await page.getByRole('button',{name:'Back a step'}).click();await expect(page.locator('#walk-panel h2')).toContainText('knowledge exist');
 await page.locator('[data-walk-choice="missing"]').click();await expect(page.locator('#walk-route-summary')).toHaveText('Capture new');
 await page.getByRole('button',{name:'Restart',exact:false}).click();await expect(page.locator('#walk-back')).toBeDisabled();
});
test('local discussion persists, exports exact text and clears',async({page})=>{
 await page.goto('./#decisions');
 await page.getByRole('checkbox',{name:'Confirm participation'}).check();await page.getByRole('checkbox',{name:'Protect capacity'}).check();
 await page.getByRole('button',{name:'Capture next steps'}).click();
 await page.getByRole('textbox',{name:'Capture next steps'}).fill('Confirm coach capacity with service owners.');
 await page.reload();await expect(page.locator('#commitment-count')).toHaveText('2 of 3 marked for discussion');await page.getByRole('button',{name:'Capture next steps'}).click();await expect(page.locator('#discussion-notes')).toHaveValue('Confirm coach capacity with service owners.');
 const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download .txt'}).click()]);
 expect(download.suggestedFilename()).toBe('York-KCS-director-discussion.txt');
 const stream=await download.createReadStream();let text='';for await(const c of stream)text+=c.toString();
 expect(text).toContain('Confirm coach capacity');expect(text).toContain('[x] Confirm participation');expect(text).not.toContain('[x] Expand');
 await page.getByRole('button',{name:'Clear this browser’s discussion'}).click();await page.reload();await expect(page.locator('#discussion-notes')).toHaveValue('');await expect(page.locator('#commitment-count')).toHaveText('0 of 3 marked for discussion');
});
test('unavailable local storage does not break the briefing',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('unavailable');}});});
 await page.goto('./#decisions');await page.getByRole('button',{name:'Capture next steps'}).click();await page.locator('#discussion-notes').fill('Unsaved notes');await expect(page.locator('#save-status')).toContainText('storage is unavailable');
});
test('reading and print modes include all alternative states',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Keyboard shortcuts and help'}).click();await page.getByRole('button',{name:'Reading & print view'}).click();
 await expect(page.locator('.slide:visible')).toHaveCount(8);await expect(page.locator('.print-supplement')).toBeVisible();
 await expect(page.locator('.print-supplement')).toContainText('Agent walkthrough: every path');
 await page.getByRole('button',{name:'Return to presentation'}).click();await page.emulateMedia({media:'print'});await expect(page.locator('.slide:visible')).toHaveCount(8);await expect(page.locator('.print-supplement')).toBeVisible();
});
for(const id of ids)test(`WCAG 2.2 AA: ${id}`,async({page})=>{
 await page.goto('./#'+id);await page.emulateMedia({reducedMotion:'reduce'});
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 expect(results.violations,JSON.stringify(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))).toEqual([]);
});
test('walkthrough branch choices and dialogs are accessible',async({page})=>{
 await page.goto('./#daily-practice');await page.getByRole('button',{name:'Review & search'}).click();
 for(const state of ['choice','notes','overview','help']){
  if(state!=='choice')await page.locator('#'+{notes:'notes',overview:'overview',help:'help'}[state]+'-button').click();
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(results.violations).toEqual([]);
  await page.keyboard.press('Escape');
 }
});
for(const width of [375,768,1366])test(`responsive layout at ${width}px has no horizontal overflow`,async({page})=>{
 await page.setViewportSize({width,height:width>1000?768:900});
 for(const id of ids){await page.goto('./#'+id);await page.emulateMedia({reducedMotion:'reduce'});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),id).toBe(true);}
});
test('static HTML remains readable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('http://127.0.0.1:4173/KCS/');
 await expect(page.locator('.slide:visible')).toHaveCount(8);await expect(page.locator('.noscript')).toBeVisible();await context.close();
});

test('default slides have a presentation-sized word budget',async({page})=>{
 for(const id of ids){
  await page.goto('./#'+id);
  const words=(await page.locator('.slide:visible').innerText()).trim().split(/\s+/).length;
  expect(words,`${id}: ${words} on-screen words`).toBeLessThanOrEqual(65);
 }
});
for(const size of [{width:1280,height:720},{width:1366,height:768},{width:1600,height:900},{width:1920,height:1080},{width:2560,height:1440}])test(`slides fit the ${size.width}×${size.height} presentation viewport`,async({page})=>{
 await page.setViewportSize(size);
 for(const id of ids){
  await page.goto('./#'+id);
  expect(await page.evaluate(()=>document.documentElement.scrollHeight<=window.innerHeight+1),id).toBe(true);
  const fits=await page.locator('.slide:visible').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1);
  expect(fits,`${id} should not need scrolling`).toBe(true);
 }
});
test('presentation remote and space navigation work after interactions',async({page})=>{
 await page.goto('./#rollout');await page.locator('#stages-tab-1').click();
 await page.keyboard.press('PageDown');await expect(page.locator('#operating-model')).toBeVisible();
 await page.keyboard.press('PageUp');await expect(page.locator('#rollout')).toBeVisible();
 await page.locator('#presentation').focus();await page.keyboard.press('Space');await expect(page.locator('#operating-model')).toBeVisible();
});
test('discussion stays out of the slideshow until requested',async({page})=>{
 await page.goto('./#decisions');await expect(page.locator('#discussion-notes')).toBeHidden();
 await page.getByRole('button',{name:'Capture next steps'}).click();await expect(page.locator('#discussion-notes')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.locator('#discussion-button')).toBeFocused();
});
test('mobile controls and discussion dialog pass accessibility checks',async({page})=>{
 await page.setViewportSize({width:375,height:850});
 await page.goto('./#decisions');
 for(const open of [false,true]){
  if(open)await page.getByRole('button',{name:'Capture next steps'}).click();
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  expect(result.violations).toEqual([]);
 }
});
test('fullscreen opens and closes from the presentation toolbar',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Toggle fullscreen'}).click();
 await expect.poll(()=>page.evaluate(()=>document.fullscreenElement?.id)).toBe('kcs-app');
 await page.getByRole('button',{name:'Toggle fullscreen'}).click();
 await expect.poll(()=>page.evaluate(()=>document.fullscreenElement===null)).toBe(true);
});
for(const size of [{width:1280,height:720},{width:1920,height:1080}])test(`Solve and Evolve render complete circular loops at ${size.width}px`,async({page})=>{
 await page.setViewportSize(size);await page.goto('./#method');await page.evaluate(()=>document.fonts.ready);
 const loops=page.locator('.learning-loop');await expect(loops).toHaveCount(2);
 for(const loop of await loops.all()){
  await expect(loop.locator('.learning-track')).toBeVisible();
  const bounds=await loop.locator('.loop-orbit').boundingBox();
  expect(bounds.width).toBeGreaterThan(240);expect(Math.abs(bounds.width-bounds.height)).toBeLessThan(1);
  expect(await loop.locator('.loop-flow path').count()).toBe(4);
  await expect(loop.locator('.loop-flow')).toHaveAttribute('marker-end',/url\(#(?:solve|evolve)-arrow\)/);
  const buttons=await loop.locator('[data-practice]').all();expect(buttons).toHaveLength(4);
  const boxes=await Promise.all(buttons.map(b=>b.boundingBox()));
  for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){
   const a=boxes[i],b=boxes[j];
   const overlap=Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x)>0&&Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y)>0;
   expect(overlap,'Practice labels must not overlap').toBe(false);
  }
 }
 await expect(page.locator('.loop-exchange')).toContainText('Patterns');await expect(page.locator('.loop-exchange')).toContainText('Improvements');
 await expect(page.locator('.loop-caption')).toContainText('not a fixed sequence');
});
test('practice selection highlights the matching circular track and supports keyboard navigation',async({page})=>{
 await page.setViewportSize({width:1920,height:1080});await page.goto('./#method');
 for(let i=0;i<8;i++){
  await page.locator(`[data-practice="${i}"]`).click();
  await expect(page.locator('.loop-highlight[data-selected="true"]')).toHaveCount(1);
  await expect(page.locator('.loop-highlight[data-selected="true"]')).toHaveAttribute('data-loop-highlight',String(i));
  await expect(page.locator('.loop-highlight[data-selected="true"]')).toHaveCSS('opacity','1');
  await expect(page.locator('.learning-loop[data-selected="true"]')).toHaveAttribute('data-loop',i<4?'solve':'evolve');
 }
 await page.locator('[data-practice="0"]').focus();await page.keyboard.press('ArrowRight');
 await expect(page.locator('[data-practice="1"]')).toBeFocused();await expect(page.locator('[data-practice="1"]')).toHaveAttribute('aria-pressed','true');
 await page.keyboard.press('End');await expect(page.locator('[data-practice="3"]')).toBeFocused();
 await page.keyboard.press('ArrowRight');await expect(page.locator('[data-practice="0"]')).toBeFocused();
 await expect(page.locator('#method')).toBeVisible();
});
test('desktop presentation type grows for a full-HD screen',async({page})=>{
 await page.setViewportSize({width:1920,height:1080});await page.goto('./#method');
 expect(await page.locator('#method h1').evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(88);
 expect(await page.locator('[data-practice="0"]').evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(20);
 expect(await page.locator('#practice-detail p').evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(27);
 await page.goto('./#rollout');expect(await page.locator('.stage-time').first().evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(27);
});
test('desktop reading view remains legible with all slides in normal document flow',async({page})=>{
 await page.setViewportSize({width:1920,height:1080});await page.goto('./');
 await page.keyboard.press('r');await expect(page.locator('.slide:visible')).toHaveCount(8);
 for(const slide of await page.locator('.slide').all()){
  const size=await slide.locator('h1').evaluate(e=>parseFloat(getComputedStyle(e).fontSize));expect(size).toBeGreaterThan(30);
  const box=await slide.boundingBox();expect(box.height).toBeGreaterThan(300);
 }
 expect(await page.evaluate(()=>document.documentElement.scrollHeight)).toBeGreaterThan(4000);
});
test('desktop scaling keeps discussion dialog actions full-sized',async({page})=>{
 await page.setViewportSize({width:1920,height:1080});await page.goto('./#decisions');
 await page.getByRole('button',{name:'Capture next steps'}).click();
 const action=await page.locator('#copy-summary').boundingBox();expect(action.height).toBeGreaterThanOrEqual(44);
});
