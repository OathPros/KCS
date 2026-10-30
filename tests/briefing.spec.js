import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { chapters, benefits, questions, enablement, rolloutWebsites, evidence } from '../src/content.js';
const ids=chapters.map(c=>c.id);
test('all sections navigate with stable deep links and no runtime errors',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('./');
 for(let i=0;i<ids.length;i++){
  await expect(page.locator('.slide:visible')).toHaveCount(1);
  await expect(page.locator('.slide:visible')).toHaveAttribute('id',ids[i]);
  await expect(page.locator('.slide:visible h1')).toHaveCount(1);
  await expect(page.locator('#current-number')).toHaveText(String(i+1).padStart(2,'0'));
  if(i<ids.length-1)await page.getByRole('button',{name:'Next section',exact:true}).click();
 }
 await expect(page.getByRole('button',{name:'Next section',exact:true})).toBeDisabled();
 await page.reload();await expect(page.locator('#decisions')).toBeVisible();expect(errors).toEqual([]);
});
test('overview and presenter sources work with keyboard and focus return',async({page})=>{
 await page.goto('./');await page.keyboard.press('m');await expect(page.getByRole('dialog',{name:'Briefing sections'})).toBeVisible();
 await page.getByRole('button',{name:'04 Agent Solve Loop'}).click();
 await expect(page.locator('#daily-practice')).toBeVisible();await expect(page.locator('dialog[open]')).toHaveCount(0);
 await page.getByRole('button',{name:'Notes & sources',exact:true}).click();
 await expect(page.locator('#presenter-notes')).toContainText('Duo');
 await expect(page.locator('#presenter-notes a').first()).toHaveAttribute('href',/library.serviceinnovation.org/);
 await page.keyboard.press('Escape');await expect(page.locator('#notes-button')).toBeFocused();
 await page.locator('#presentation').focus();await page.keyboard.press('ArrowRight');await expect(page.locator('#launch-scope')).toBeVisible();
});
test('problem, role, evidence and rollout tabs all update their detail',async({page})=>{
 for(const [id,group,checks] of [
  ['case-for-change','problems',['Shared knowledge','Reuse proven answers','Improve during reuse','Find relevant knowledge']],
  ['rollout','stages',['Open access','Refine through real work','Onboard additional teams','Release community self-service']],
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
  await page.goto('http://127.0.0.1:4173/solve-loop.html');
  await page.getByRole('button',{name:'Review & search'}).click();
  if(article==='missing')await page.locator('[data-walk-choice="missing"]').click();
  else {await page.locator('[data-walk-choice="exists"]').click();await page.locator(`[data-walk-choice="${article}"]`).click();}
  await page.getByRole('button',{name:'Continue to linking'}).click();
  await expect(page.locator('#walk-panel h2')).toHaveText('Link the article');
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
 await page.goto('http://127.0.0.1:4173/solve-loop.html');await page.getByRole('button',{name:'Review & search'}).click();await page.locator('[data-walk-choice="exists"]').click();await page.locator('[data-walk-choice="update"]').click();
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
 await expect(page.locator('.slide:visible')).toHaveCount(ids.length);await expect(page.locator('.print-supplement')).toBeVisible();
 await expect(page.locator('.print-supplement')).toContainText('Agent walkthrough: every path');
 await page.getByRole('button',{name:'Return to presentation'}).click();await page.emulateMedia({media:'print'});await expect(page.locator('.slide:visible')).toHaveCount(ids.length);await expect(page.locator('.print-supplement')).toBeVisible();
});
for(const id of ids)test(`WCAG 2.2 AA: ${id}`,async({page})=>{
 await page.goto('./#'+id);await page.emulateMedia({reducedMotion:'reduce'});
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 expect(results.violations,JSON.stringify(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))).toEqual([]);
});
test('walkthrough branch choices and dialogs are accessible',async({page})=>{
 await page.goto('http://127.0.0.1:4173/solve-loop.html');await page.getByRole('button',{name:'Review & search'}).click();
 for(const state of ['choice','notes','overview','help']){
  if(state!=='choice'){await page.goto('./#daily-practice');await page.locator('#'+{notes:'notes',overview:'overview',help:'help'}[state]+'-button').click();}
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(results.violations).toEqual([]);
  await page.keyboard.press('Escape');
 }
});
for(const width of [320,375,768,1024,1366])test(`responsive layout at ${width}px has no horizontal overflow`,async({page})=>{
 await page.setViewportSize({width,height:width>1000?768:900});
 for(const id of ids){await page.goto('./#'+id);await page.emulateMedia({reducedMotion:'reduce'});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),id).toBe(true);}
});
test('static HTML remains readable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('http://127.0.0.1:4173/KCS/');
 await expect(page.locator('.slide:visible')).toHaveCount(ids.length);await expect(page.locator('.noscript')).toBeVisible();await context.close();
});

test('default slides have a presentation-sized word budget',async({page})=>{
 for(const id of ids){
  await page.goto('./#'+id);
  const words=(await page.locator('.slide:visible').innerText()).trim().split(/\s+/).length;
  expect(words,`${id}: ${words} on-screen words`).toBeLessThanOrEqual(id==='enablement'?130:id==='operating-model'?120:id==='evidence'?160:65);
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
 await page.keyboard.press('PageDown');await expect(page.locator('#enablement')).toBeVisible();
 await page.keyboard.press('PageUp');await expect(page.locator('#rollout')).toBeVisible();
 await page.locator('#presentation').focus();await page.keyboard.press('Space');await expect(page.locator('#enablement')).toBeVisible();
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
 await page.keyboard.press('r');await expect(page.locator('.slide:visible')).toHaveCount(ids.length);
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

test('benefits cover the three requested groups and every horizon, with keyboard selection',async({page})=>{
 await page.goto('./#benefits');
 await expect(page.locator('[data-tab=benefits]')).toHaveText(['Our customers','Our agents','Our institution']);
 await expect(page.locator('#benefits-tab-0')).toHaveAttribute('aria-selected','true');
 for(let i=0;i<benefits.length;i++){
  await page.locator('#benefits-tab-'+i).click();
  for(const [title,body] of benefits[i].outcomes){
   await expect(page.locator('#benefits-panel')).toContainText(title);
   await expect(page.locator('#benefits-panel')).toContainText(body);
  }
  await expect(page.locator('.benefit-horizon')).toHaveCount(3);
 }
 await page.locator('#benefits-tab-0').focus();await page.keyboard.press('ArrowRight');
 await expect(page.locator('#benefits-tab-1')).toBeFocused();
 await expect(page.locator('#benefits-tab-1')).toHaveAttribute('aria-selected','true');
 await expect(page.locator('#benefits .eyebrow')).toContainText('Expected benefits');
 await page.keyboard.press('r'); // The tab has focus, so use the dedicated reading control.
 await page.getByRole('button',{name:'Keyboard shortcuts and help'}).click();
 await page.getByRole('button',{name:'Reading & print view'}).click();
 await expect(page.locator('.benefit-table tbody tr')).toHaveCount(benefits.length);
 await expect(page.locator('.print-supplement')).toContainText('Baseline service outcomes');
});
test('leadership questions are available to keyboard users',async({page})=>{
 await page.goto('./#leadership-questions');
 for(let i=0;i<questions.length;i++){
  await page.locator('#questions-tab-'+i).click();
  await expect(page.locator('#questions-panel h2')).toHaveText(questions[i].question);
  await expect(page.locator('#questions-panel')).toContainText(questions[i].answer);
 }
 await page.locator('#questions-tab-0').focus();await page.keyboard.press('ArrowDown');
 await expect(page.locator('#questions-tab-1')).toBeFocused();

});
test('launch permissions remain distinct and Solve slide shows the full flow',async({page})=>{
 await page.goto('./#launch-scope');
 await expect(page.locator('.launch-everyone')).toContainText('All Halo agents');
 await expect(page.locator('.launch-authors')).toContainText('Onboarded pilot participants');
 await expect(page.locator('.pilot-roster')).toHaveText('SSB / OUR / CTS / CS');
 await page.goto('./#daily-practice');
 await expect(page.locator('.solve-flow svg')).toBeVisible();
 await expect(page.locator('#walk-panel')).toHaveCount(0);
 await expect(page.locator('#daily-practice button')).toHaveCount(0);
 const overlaps=await page.locator('.solve-flow svg').evaluate(svg=>{
  const boxes=[...svg.querySelectorAll('.solve-node rect')].map(e=>({x:e.x.baseVal.value,y:e.y.baseVal.value,w:e.width.baseVal.value,h:e.height.baseVal.value}));
  return boxes.some((a,i)=>boxes.slice(i+1).some(b=>Math.min(a.x+a.w,b.x+b.w)>Math.max(a.x,b.x)&&Math.min(a.y+a.h,b.y+b.h)>Math.max(a.y,b.y)));
 });
 expect(overlaps,'Flow nodes must remain separate').toBe(false);
 await expect(page.locator('.solve-flow')).toContainText('capture and create');
 await expect(page.locator('.solve-flow')).toContainText('Continue agent-led');
});

for(const size of [{width:1280,height:720},{width:1920,height:1080}])test(`all leadership alternative states fit at ${size.width}px`,async({page})=>{
 await page.setViewportSize(size);
 for(const [id,group] of [['benefits','benefits'],['leadership-questions','questions']]){
  await page.goto('./#'+id);
  for(const tab of await page.locator(`[data-tab="${group}"]`).all()){
   await tab.click();
   expect(await page.locator('.slide:visible').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1),await tab.innerText()).toBe(true);
  }
 }
});

test('rollout slide lists every communication and all three resource destinations',async({page})=>{
 await page.goto('./#enablement');
 await expect(page.locator('.comms-register li')).toHaveCount(4);
 for(const message of enablement){
  const row=page.locator('.comms-register li').filter({hasText:message.label});
  await expect(row).toContainText(message.time);await expect(row).toContainText(message.body);
 }
 await expect(page.locator('.website-register a')).toHaveCount(3);
 for(const site of rolloutWebsites){
  const link=page.getByRole('link',{name:new RegExp(site.label)});
  await expect(link).toHaveAttribute('href','https://www.yorku.ca'+site.path);
  await expect(link).toHaveAttribute('rel','noopener noreferrer');
  await expect(link.locator('..')).toContainText(site.purpose);
  await link.focus();await expect(link).toBeFocused();
 }
 await expect(page.locator('.comms-path')).toContainText('Websites explain and equip');
 await page.getByRole('button',{name:'Notes & sources',exact:true}).click();
 await page.locator('.notes-detail summary').click();
 await expect(page.locator('#presenter-notes')).toContainText('future waves');
 await page.keyboard.press('Escape');await page.locator('#presentation').focus();await page.keyboard.press('r');
 await expect(page.locator('.print-supplement')).toContainText('https://www.yorku.ca/uit/cio/opex/kb/pilots');
});

test('coaching and council support participation and co-creation of the standard',async({page})=>{
 await page.goto('./#operating-model');
 const supports=page.locator('.program-support');await expect(supports).toHaveCount(2);
 await expect(supports.nth(0)).toContainText('Develop judgement and proficiency');
 await expect(supports.nth(1)).toContainText('Knowledge Council');
 await expect(supports.nth(1)).toContainText('Bring frontline evidence together');
 await expect(supports.nth(1)).toContainText('Co-create our shared content standard');
 await expect(page.locator('.director-program-ask')).toContainText('participate actively in our knowledge program');
 await expect(page.locator('.program-source a')).toHaveAttribute('href',/library.serviceinnovation.org\/KCS/);
 await page.getByRole('button',{name:'Capture team commitments'}).click();
 await expect(page.getByRole('dialog',{name:'Capture next steps'})).toBeVisible();
 await page.locator('#discussion-notes').fill('Nominate council contributors; protect time for content-standard workshops.');
 await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Capture team commitments'})).toBeFocused();
 await page.getByRole('button',{name:'Notes & sources',exact:true}).click();await page.locator('.notes-detail summary').click();
 await expect(page.locator('#presenter-notes')).toContainText('should not become an approval queue');
 await expect(page.locator('#presenter-notes')).toContainText('failed searches');
});

test('all three success aims connect questions, evidence and action on one slide',async({page})=>{
 await page.goto('./#evidence');await expect(page.locator('.success-aim')).toHaveCount(3);
 await expect(page.locator('#evidence [role=tab]')).toHaveCount(0);
 for(const [i,aim] of evidence.entries()){
  const column=page.locator('.success-aim').nth(i);
  await expect(column.getByRole('heading',{name:aim.label,exact:true})).toBeVisible();
  await expect(column).toContainText(aim.question);
  for(const signal of aim.displaySignals)await expect(column).toContainText(signal);
  await expect(column.locator('.aim-action')).toContainText(aim.action);
 }
 await expect(page.locator('.success-principle')).toContainText('without article or link quotas');
 await page.getByRole('button',{name:'Notes & sources',exact:true}).click();await page.locator('.notes-detail summary').click();
 for(const aim of evidence)await expect(page.locator('#presenter-notes')).toContainText(aim.avoid);
});

test('presentation, notes and workflow contain no placeholder or demo labels',async({page})=>{
 const filler=/\bdemo(?: only)?\b|\billustrative\b|\bplaceholder\b|\bunconfirmed\b|\bunresolved\b|timing to confirm|draft plan|\bproposed\b|no formal approval|still to confirm/i;
 for(const id of ids){
  await page.goto('./#'+id);await page.getByRole('button',{name:'Notes & sources',exact:true}).click();
  expect(await page.locator('#kcs-app').textContent()).not.toMatch(filler);
  await page.keyboard.press('Escape');
 }
 await expect(page.locator('textarea[placeholder]')).toHaveCount(0);
 await page.goto('http://127.0.0.1:4173/solve-loop.html');
 expect(await page.locator('#kcs-solve-walkthrough').textContent()).not.toMatch(filler);
});

test('standalone walkthrough is responsive and self-contained',async({page})=>{
 const assets=[];page.on('request',r=>assets.push(r.url()));
 await page.setViewportSize({width:375,height:850});await page.goto('http://127.0.0.1:4173/solve-loop.html');
 await expect(page.locator('#walk-panel h2')).toHaveText('Review the issue');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(assets.filter(u=>!u.endsWith('/solve-loop.html'))).toEqual([]);
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(results.violations).toEqual([]);
});

test('opening contains only the announcement and date on the left and a working double loop on the right',async({page})=>{
 await page.goto('./');
 await expect(page.locator('.hero-copy h1')).toHaveText('Knowledge iscoming to Halo');
 await expect(page.locator('.hero-date')).toHaveText('November 19');
 expect((await page.locator('.hero-copy').innerText()).replace(/\s+/g,' ').trim()).toBe('Knowledge is coming to Halo November 19');
 await expect(page.locator('.hero-copy button')).toHaveCount(0);
 const region=page.locator('#hero-loop-detail');
 for(const [loop,text] of [['solve','Solve Loop'],['evolve','Evolve Loop']]){
  await page.locator(`[data-hero-loop="${loop}"]`).click();await expect(region.locator('h2')).toHaveText(text);
 }
 for(let i=0;i<8;i++){
  const button=page.locator(`[data-hero-practice="${i}"]`);await button.click();
  await expect(button).toHaveAttribute('aria-pressed','true');await expect(region.locator('h2')).toHaveText(await button.innerText());
 }
 await page.locator('[data-hero-loop=solve]').focus();await page.keyboard.press('ArrowDown');
 await expect(page.locator('[data-hero-practice="0"]')).toBeFocused();
 await expect(page.locator('[data-hero-practice="0"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('[data-hero-overview]').click();await expect(region.locator('h2')).toHaveText('Solve and Evolve');
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(result.violations).toEqual([]);
});
test('briefing headings use direct titles without periods',async({page})=>{
 await page.goto('./');
 const headings=await page.locator('#kcs-app h1,#kcs-app h2,#kcs-app h3').allTextContents();
 expect(headings.filter(h=>h.includes('.'))).toEqual([]);
});
for(const viewport of [{width:1280,height:720},{width:1920,height:1080},{width:375,height:850}])test(`opening practice explanations fit inside the loop at ${viewport.width}px`,async({page})=>{
 await page.setViewportSize(viewport);await page.goto('./');
 for(let i=0;i<8;i++){
  await page.locator(`[data-hero-practice="${i}"]`).click();
  expect(await page.locator('.hero-loop-centre').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1)).toBe(true);
 }
 const svg=page.locator('.hero-loop-wheel>svg'),bounds=await svg.boundingBox();
 await svg.click({position:{x:bounds.width*.9,y:bounds.height*.5}});await expect(page.locator('#hero-loop-detail h2')).toHaveText('Solve Loop');
});

test('York palette uses red accents without full red slide backgrounds and benefits lead into evidence',async({page})=>{
 await page.goto('./');
 expect(await page.locator('#kcs-app').evaluate(e=>getComputedStyle(e).getPropertyValue('--red').trim())).toBe('#e31837');
 expect(ids.indexOf('benefits')+1).toBe(ids.indexOf('evidence'));
 await expect(page.locator('.slide[data-theme=red]')).toHaveCount(0);
 for(const id of ['case-for-change','launch-scope','decisions']){
  await page.goto('./#'+id);
  expect(await page.locator('#'+id).evaluate(e=>getComputedStyle(e).backgroundColor)).not.toBe('rgb(227, 24, 55)');
 }
 await page.goto('./#benefits');await page.getByRole('button',{name:'Next section',exact:true}).click();
 await expect(page.locator('#evidence')).toBeVisible();
});
