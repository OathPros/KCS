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
 await page.reload();await expect(page.locator('#leadership-questions')).toBeVisible();expect(errors).toEqual([]);
});
test('overview and help work with keyboard and focus return',async({page})=>{
 await page.goto('./');await page.keyboard.press('m');await expect(page.getByRole('dialog',{name:'Briefing sections'})).toBeVisible();
 await page.getByRole('button',{name:'03 Agent Solve Loop'}).click();
 await expect(page.locator('#daily-practice')).toBeVisible();await expect(page.locator('dialog[open]')).toHaveCount(0);
 await page.getByRole('button',{name:'Keyboard shortcuts and help'}).click();
 await expect(page.getByRole('dialog',{name:'Presentation controls'})).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.locator('#help-button')).toBeFocused();
 await page.locator('#presentation').focus();await page.keyboard.press('ArrowRight');await expect(page.locator('#launch-scope')).toBeVisible();
});
test('problem, role, evidence and rollout tabs all update their detail',async({page})=>{
 for(const [id,group,checks] of [
  ['case-for-change','problems',['Shared knowledge','Reuse proven answers','Improve during reuse','Find relevant knowledge']],
  ['rollout','stages',['Launch KB module','Refine through real work','Onboard additional teams','Release community self-service']],
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
test('reading and print modes contain only the edited slides',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Keyboard shortcuts and help'}).click();await page.getByRole('button',{name:'Reading & print view'}).click();
 await expect(page.locator('.slide:visible')).toHaveCount(ids.length);await expect(page.locator('.print-supplement')).toHaveCount(0);
 await expect(page.locator('#method')).toHaveCount(0);
 await page.getByRole('button',{name:'Return to presentation'}).click();await page.emulateMedia({media:'print'});await expect(page.locator('.slide:visible')).toHaveCount(ids.length);await expect(page.locator('.print-supplement')).toHaveCount(0);
});
for(const id of ids)test(`WCAG 2.2 AA: ${id}`,async({page})=>{
 await page.goto('./#'+id);await page.emulateMedia({reducedMotion:'reduce'});
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 expect(results.violations,JSON.stringify(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))).toEqual([]);
});
test('walkthrough branch choices and dialogs are accessible',async({page})=>{
 await page.goto('http://127.0.0.1:4173/solve-loop.html');await page.getByRole('button',{name:'Review & search'}).click();
 for(const state of ['choice','overview','help']){
  if(state!=='choice'){await page.goto('./#daily-practice');await page.locator('#'+{overview:'overview',help:'help'}[state]+'-button').click();}
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
  expect(words,`${id}: ${words} on-screen words`).toBeLessThanOrEqual(id==='enablement'?130:id==='operating-model'?120:id==='evidence'?170:id==='participation'?140:id==='program-evidence'?160:id==='leadership-questions'?110:65);
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
test('fullscreen opens and closes from the presentation toolbar',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Toggle fullscreen'}).click();
 await expect.poll(()=>page.evaluate(()=>document.fullscreenElement?.id)).toBe('kcs-app');
 await page.getByRole('button',{name:'Toggle fullscreen'}).click();
 await expect.poll(()=>page.evaluate(()=>document.fullscreenElement===null)).toBe(true);
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

test('benefits cover the three requested groups and every horizon, with keyboard selection',async({page})=>{
 await page.goto('./#benefits');
 await expect(page.locator('[data-tab=benefits]')).toHaveText(['Our customers','Our agents','York']);
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

for(const size of [{width:1280,height:720},{width:1920,height:1080}])test(`all interactive slide states fit at ${size.width}px`,async({page})=>{
 await page.setViewportSize(size);
 for(const [id,group] of [['benefits','benefits'],['leadership-questions','questions'],['rollout','stages']]){
  await page.goto('./#'+id);
  for(const tab of await page.locator(`[data-tab="${group}"]`).all()){
   await tab.click();
   expect(await page.locator('.slide:visible').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1),await tab.innerText()).toBe(true);
  }
 }
});

test('rollout slide lists every communication and all three resource destinations',async({page})=>{
 await page.goto('./#enablement');
 await expect(page.locator('.comms-register li')).toHaveCount(3);
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
 await expect(page.locator('.comms-path')).toHaveCount(0);
});

test('coaching and council support participation and co-creation of the standard',async({page})=>{
 await page.goto('./#operating-model');
 const supports=page.locator('.program-support');await expect(supports).toHaveCount(2);
 await expect(supports.nth(0)).toContainText('Develop judgement and proficiency');
 await expect(supports.nth(1).locator('h2')).toHaveText('Council');
 await expect(supports.nth(1)).toContainText('Bring frontline evidence together');
 await expect(supports.nth(1)).toContainText('Co-create our shared content standard');
 await expect(page.locator('.program-participation-ask')).toContainText('our teams to participate in our knowledge program');
 await expect(page.locator('.program-source')).toHaveCount(0);
 await expect(page.locator('#operating-model button')).toHaveCount(0);
 await expect(page.locator('#operating-model h1')).toHaveText('Committing to future success');

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
 await expect(page.locator('.success-principle')).toHaveCount(0);
});

test('presentation and workflow contain no placeholder or demo labels',async({page})=>{
 const filler=/\bdemo(?: only)?\b|\billustrative\b|\bplaceholder\b|\bunconfirmed\b|\bunresolved\b|timing to confirm|draft plan|\bproposed\b|no formal approval|still to confirm/i;
 for(const id of ids){
  await page.goto('./#'+id);
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
 for(const id of ['case-for-change','launch-scope','program-evidence']){
  await page.goto('./#'+id);
  expect(await page.locator('#'+id).evaluate(e=>getComputedStyle(e).backgroundColor)).not.toBe('rgb(227, 24, 55)');
 }
 await page.goto('./#benefits');await page.getByRole('button',{name:'Next section',exact:true}).click();
 await expect(page.locator('#evidence')).toBeVisible();
});

test('leadership revision connects purpose, contribution, recognition and action',async({page})=>{
 await page.goto('./#case-for-change');await expect(page.locator('.purpose-statement')).toContainText('our community gets consistent help');await expect(page.locator('.purpose-statement')).toContainText('York retains what its teams learn');
 await page.goto('./#participation');
 await expect(page.locator('.recognition-table tbody tr')).toHaveCount(4);
 await expect(page.locator('.recognition-table tbody strong')).toHaveText(['Search and reuse','Improve and capture','Coach and collaborate','Co-create our standard']);
 await expect(page.locator('.recognition-table tbody td:last-child')).toContainText(['helped resolve a request','clearer or more useful','coaching and teamwork','feedback changed our shared standard']);
 await expect(page.locator('.recognition-call')).toContainText('team meetings and one-to-ones');
 await expect(page.locator('.recognition-call')).toContainText('name the contribution, explain its impact and thank the people involved');
 await expect(page.locator('.recognition-call')).toContainText('without article quotas or leaderboards');
 await expect(page.locator('.participation-value,.participation-columns')).toHaveCount(0);
 await page.goto('./#operating-model');await expect(page.locator('.program-learning')).toHaveCount(0);
 await page.goto('./#evidence');await expect(page.locator('.leadership-check')).toHaveCount(0);
 await expect(page.locator('#decisions,#discussion-dialog,[data-commitment]')).toHaveCount(0);
});

test('presenter notes are absent from the HTML, controls, shortcuts and print output',async({page})=>{
 const response=await page.goto('./');const html=await response.text();
 expect(html).not.toMatch(/presenter-notes|notes-dialog|notes-button|print-supplement|PRESENTER COMPANION|Notes &amp; sources/);
 await page.keyboard.press('n');await expect(page.locator('dialog[open]')).toHaveCount(0);
 await page.emulateMedia({media:'print'});await expect(page.locator('.slide:visible')).toHaveCount(ids.length);
 await expect(page.locator('#discussion-notes')).toHaveCount(0);

});
test('uploaded edits remain intact after tab changes and reload',async({page})=>{
 await page.goto('./#enablement');await expect(page.locator('.comms-register')).not.toContainText('Executive announcement');
 await expect(page.locator('.website-register li p')).toHaveText(['Announce the change & the tool','Explain the methodology','Prepare our pilots']);
 await page.goto('./#operating-model');await expect(page.locator('#operating-model h1')).toHaveText('Committing to future success');
 await expect(page.locator('.program-support h2')).toHaveText(['Coaching','Council']);
 await page.goto('./#participation');await expect(page.locator('#participation h1')).toHaveText('Celebrate knowledge work');
 await page.goto('./#leadership-questions');await page.locator('#questions-tab-1').click();await page.locator('#questions-tab-0').click();
 await expect(page.locator('.question-outcome')).toContainText('Copenhagen');await expect(page.locator('.question-outcome')).toContainText('70%');
 await page.reload();await expect(page.locator('.question-outcome')).toContainText('three years');
 await expect(page.locator('#total-number')).toHaveCount(0);await expect(page.locator('.footer-slash')).toHaveText('/ 12');
});

test('evidence follows coaching and the presentation ends with meaningful questions',async({page})=>{
 await page.goto('./#operating-model');await page.getByRole('button',{name:'Next section',exact:true}).click();
 await expect(page.locator('#program-evidence')).toBeVisible();
 await expect(page.locator('.investment-pillar h2')).toHaveText(['Coaching','Shared standard','Knowledge Council']);
 await expect(page.locator('.investment-pillar>a')).toHaveCount(3);
 for(const link of await page.locator('.investment-pillar>a').all()){
  await expect(link).toHaveAttribute('href',/^https:\/\/library\.serviceinnovation\.org\/KCS\//);await link.focus();await expect(link).toBeFocused();
 }
 await expect(page.locator('.investment-test')).toContainText('capacity needed to sustain');
 await page.locator('#presentation').focus();await page.keyboard.press('End');
 await expect(page.locator('#leadership-questions')).toBeVisible();await expect(page.locator('#next-button')).toBeDisabled();
 await expect(page.locator('#decisions,#discussion-dialog,[data-open-discussion]')).toHaveCount(0);
 for(const [i,phrase] of [[1,'work through cross-team ownership'],[2,'support capacity'],[3,'a new location alone'],[4,'outdated or wrong'],[5,'not a commitment to onboard everyone'],[6,'not launch commitments']]){
  await page.locator('#questions-tab-'+i).click();await expect(page.locator('#questions-panel')).toContainText(phrase);
 }
 await page.keyboard.press('m'); // Tab focus does not invoke deck shortcuts.
 await page.locator('#presentation').focus();await page.keyboard.press('m');
 await expect(page.locator('.overview-list button')).toHaveCount(ids.length);
 await expect(page.locator('.overview-list button').last()).toContainText('Questions for discussion');
});
test('mobile help controls remain accessible without the removed discussion form',async({page})=>{
 await page.setViewportSize({width:375,height:850});await page.goto('./#leadership-questions');
 await page.getByRole('button',{name:'Keyboard shortcuts and help'}).click();
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(result.violations).toEqual([]);
});

for(const width of [768,1280,1920])test(`communications rows align across both registers at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:width===768?1024:Math.round(width*9/16)});await page.goto('./#enablement');await page.evaluate(()=>document.fonts.ready);
 const left=await page.locator('.comms-register li').all(),right=await page.locator('.website-register li').all();
 for(let i=0;i<3;i++){
  const a=await left[i].boundingBox(),b=await right[i].boundingBox();
  expect(Math.abs(a.y-b.y)).toBeLessThanOrEqual(1);expect(Math.abs(a.height-b.height)).toBeLessThanOrEqual(1);
 }
});
test('benefits use equal-width tab underlines without duplicate horizon rules',async({page})=>{
 await page.setViewportSize({width:1280,height:720});await page.goto('./#benefits');
 const tabs=page.locator('[data-tab=benefits]'),bounds=await page.locator('.entity-tabs .tabs').boundingBox();
 for(const tab of await tabs.all())expect((await tab.boundingBox()).width).toBeCloseTo(bounds.width/3,0);
 for(let i=0;i<3;i++){
  await tabs.nth(i).click();await expect(tabs.nth(i)).toHaveCSS('border-bottom-color','rgb(227, 24, 55)');
  await expect(tabs.nth((i+1)%3)).not.toHaveCSS('border-bottom-color','rgb(227, 24, 55)');
 }
 for(const horizon of await page.locator('.benefit-horizon').all())await expect(horizon).toHaveCSS('border-top-width','0px');
 await expect(tabs.nth(2)).toHaveText('York');
});

test('roadmap distinguishes completed launch preparation from future self-service readiness',async({page})=>{
 await page.goto('./#rollout');await expect(page.locator('.timeline strong')).toHaveText(['Launch','Pilot','Expand','Self-service']);
 await expect(page.locator('.stage-qualifier')).toHaveCount(0);
 await expect(page.locator('.stage-audiences span')).toHaveText(['All agents: reuse knowledge','Onboarded pilot agents: create and update knowledge']);
 await expect(page.locator('.readiness')).toHaveAttribute('data-state','complete');
 await expect(page.locator('.readiness .micro')).toHaveText('Launch preparation complete');
 await expect(page.locator('.readiness-check')).toBeVisible();await expect(page.locator('.gate-mark')).toHaveCSS('color','rgb(24, 113, 61)');
 await expect(page.locator('.readiness p')).toHaveText('Workflow + draft standard + pilot onboarding information + live training');
 await page.locator('#stages-tab-3').click();await expect(page.locator('.stage-takeaway .micro')).toHaveText('Big win');
 await expect(page.locator('.stage-takeaway')).toContainText('Our community can search and follow our approved and maintained knowledge');
 await expect(page.locator('.readiness')).toHaveAttribute('data-state','pending');await expect(page.locator('.readiness-check')).toHaveCount(0);
 await expect(page.locator('.readiness .micro')).toHaveText('Readiness gate');
 await page.locator('#stages-tab-0').click();await expect(page.locator('.readiness-check')).toBeVisible();
});
