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
  ['case-for-change','problems',['Expertise should','Solve the issue','Useful knowledge','An answer only']],
  ['rollout','stages',['Open access','Let real work','Add teams','Open suitable']],
  ['operating-model','roles',['Make knowledge','Develop judgement','Turn patterns','Keep the service','Protect the conditions']],
  ['evidence','evidence',['Does knowledge','Can people','Is the practice']]
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
  await expect(page.locator('#walk-panel h2')).toHaveText('Link the knowledge to the ticket.');
  await page.getByRole('button',{name:'Link & continue'}).click();
  await page.locator(`[data-walk-choice="${resolution}"]`).click();
  if(resolution==='self')await expect(page.locator('#walk-panel')).toContainText('approved content');
  await page.getByRole('button',{name:'Confirm the outcome'}).click();await page.getByRole('button',{name:'Complete walkthrough'}).click();
  await expect(page.locator('#walk-step-count')).toHaveText('WALKTHROUGH COMPLETE');
  await expect(page.locator('#walk-panel')).toContainText(article==='missing'?'capture path':'reuse path');
  await expect(page.locator('#walk-panel')).toContainText(resolution==='self'?'safe requester self-solve':'agent-assisted resolution');
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
 await page.getByRole('textbox',{name:'Capture next steps'}).fill('Confirm coach capacity with service owners.');
 await page.reload();await expect(page.locator('#commitment-count')).toHaveText('2 of 3 marked for discussion');await expect(page.locator('#discussion-notes')).toHaveValue('Confirm coach capacity with service owners.');
 const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download .txt'}).click()]);
 expect(download.suggestedFilename()).toBe('York-KCS-director-discussion.txt');
 const stream=await download.createReadStream();let text='';for await(const c of stream)text+=c.toString();
 expect(text).toContain('Confirm coach capacity');expect(text).toContain('[x] Confirm participation');expect(text).not.toContain('[x] Expand');
 await page.getByRole('button',{name:'Clear this browser’s discussion'}).click();await page.reload();await expect(page.locator('#discussion-notes')).toHaveValue('');await expect(page.locator('#commitment-count')).toHaveText('0 of 3 marked for discussion');
});
test('unavailable local storage does not break the briefing',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('unavailable');}});});
 await page.goto('./#decisions');await page.locator('#discussion-notes').fill('Unsaved notes');await expect(page.locator('#save-status')).toContainText('storage is unavailable');
});
test('reading and print modes include all alternative states',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Reading & print view'}).click();
 await expect(page.locator('.slide:visible')).toHaveCount(8);await expect(page.locator('.print-supplement')).toBeVisible();
 await expect(page.locator('.print-supplement')).toContainText('Agent walkthrough: every path');
 await page.getByRole('button',{name:'Return to presentation'}).click();await page.emulateMedia({media:'print'});await expect(page.locator('.slide:visible')).toHaveCount(8);await expect(page.locator('.print-supplement')).toBeVisible();
});
test('every section passes automated WCAG 2.2 AA checks',async({page})=>{
 for(const id of ids){
  await page.goto('./#'+id);await page.emulateMedia({reducedMotion:'reduce'});
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  expect(results.violations,JSON.stringify(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))).toEqual([]);
 }
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
