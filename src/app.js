import { chapters, sources, problems, practices, stages, roles, evidence, arrowIcon, problemPanel, practicePanel, stagePanel, rolePanel, evidencePanel } from './content.js';
const root=document.querySelector('#kcs-app');
const $=(s)=>root.querySelector(s);
const $$=(s)=>[...root.querySelectorAll(s)];
root.classList.add('js');
let current=0,reading=false,toastTimer;
const slides=$$('.slide');
function toast(message){$('#toast').textContent=message;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,4200);}
function closeDialogs(){$$('dialog[open]').forEach(d=>d.close());}
function goTo(index,{updateHash=true,focus=false}={}){
 if(index<0||index>=chapters.length)return;
 current=index;
 root.dataset.theme=slides[index].dataset.theme;
 slides.forEach((s,i)=>{s.hidden=i!==index&&!reading;s.classList.remove('is-entering');});
 if(!reading) slides[index].classList.add('is-entering');
 if(updateHash)history.replaceState(null,'','#'+chapters[index].id);
 $$('.chapter-progress button').forEach((b,i)=>{if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 $('#current-number').textContent=String(index+1).padStart(2,'0');
 $('#footer-section-label').textContent=chapters[index].label;
 $('#previous-button').disabled=index===0;
 $('#next-button').disabled=index===chapters.length-1;
 $('#announcement').textContent=`Section ${index+1} of ${chapters.length}: ${chapters[index].label}`;
 updateNotes();closeDialogs();
 if(focus){if(reading){slides[index].scrollIntoView({block:'start'});}else{$('#presentation').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}}
}
function extraNotes(id){
 const entries={
  'case-for-change':problems.map(p=>[p.label,`Today: ${p.before} With KCS: ${p.after} ${p.gain}`]),
  method:practices.map(p=>[`${p.loop} Loop: ${p.label}`,`${p.body} Example: ${p.example}`]),
  rollout:stages.map(s=>[`${s.label}: ${s.time} (${s.status})`,`${s.desc} Readiness: ${s.gate} ${s.note}`]),
  'operating-model':roles.map(r=>[r.label,`${r.body} Contribution: ${r.output}`]),
  evidence:evidence.map(e=>[e.label,`${e.question} ${e.decision} ${e.signals.join('; ')}. ${e.avoid}`])
 }[id];
 return entries?`<details class="notes-detail"><summary>Supporting detail</summary>${entries.map(([label,body])=>`<h3>${label}</h3><p>${body}</p>`).join('')}</details>`:'';
}
function updateNotes(){const c=chapters[current];$('#presenter-notes').innerHTML=`<h3>${String(current+1).padStart(2,'0')} / ${c.label}</h3><p>${c.notes}</p>${extraNotes(c.id)}<h3>Sources</h3><ul>${c.sources.map(key=>{const s=sources[key];return `<li>${s.url?`<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label} ${arrowIcon}</a>`:`<strong>${s.label}</strong>`}<span>${s.detail}</span></li>`;}).join('')}</ul>`;}
function fromHash(){const i=chapters.findIndex(c=>'#'+c.id===location.hash);goTo(i<0?0:i,{updateHash:false});}
root.addEventListener('click',e=>{
 const goto=e.target.closest('[data-goto]');if(goto)goTo(Number(goto.dataset.goto),{focus:true});
 if(e.target.closest('[data-next]'))goTo(current+1,{focus:true});
 if(e.target.closest('[data-close]'))e.target.closest('dialog').close();
});
$('#previous-button').addEventListener('click',()=>goTo(current-1,{focus:true}));
$('#next-button').addEventListener('click',()=>goTo(current+1,{focus:true}));
$('#overview-button').addEventListener('click',()=>$('#overview-dialog').showModal());
$('#notes-button').addEventListener('click',()=>$('#notes-dialog').showModal());
$('#help-button').addEventListener('click',()=>$('#help-dialog').showModal());
$('#discussion-button').addEventListener('click',()=>$('#discussion-dialog').showModal());
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
function toggleReading(){closeDialogs();reading=!reading;$('#exit-reading').hidden=!reading;root.classList.toggle('reading',reading);slides.forEach((s,i)=>s.hidden=!reading&&i!==current);$('#reading-button').textContent=reading?'Return to presentation →':'Reading & print view →';toast(reading?'Reading view: all sections and alternative states are available.':'Presentation view restored.');}
$('#reading-button').addEventListener('click',toggleReading);
$('#exit-reading').addEventListener('click',toggleReading);
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await root.requestFullscreen();closeDialogs();}catch{toast('Fullscreen is unavailable in this browser.');}}
$('#fullscreen-button').addEventListener('click',fullscreen);
window.addEventListener('hashchange',fromHash);
document.addEventListener('keydown',e=>{
 if(!e.target.closest('input,textarea,select,[contenteditable="true"]')&&(e.key==='PageDown'||e.key==='PageUp')){e.preventDefault();goTo(current+(e.key==='PageDown'?1:-1),{focus:true});return;}
 const interactive=e.target.closest('input,textarea,select,button,a,[role="tab"],[role="tabpanel"],[contenteditable="true"]');
 if(e.metaKey||e.ctrlKey||e.altKey||$('dialog[open]')||interactive)return;
 if(e.code==='Space'){e.preventDefault();goTo(current+1,{focus:true});}
 if(e.key==='ArrowRight'){e.preventDefault();goTo(current+1,{focus:true});}
 if(e.key==='ArrowLeft'){e.preventDefault();goTo(current-1,{focus:true});}
 if(e.key==='Home'){e.preventDefault();goTo(0,{focus:true});}
 if(e.key==='End'){e.preventDefault();goTo(chapters.length-1,{focus:true});}
 if(e.key.toLowerCase()==='m')$('#overview-dialog').showModal();
 if(e.key.toLowerCase()==='n')$('#notes-dialog').showModal();
 if(e.key.toLowerCase()==='f')fullscreen();
 if(e.key.toLowerCase()==='r')toggleReading();
 if(e.key.toLowerCase()==='p'){e.preventDefault();window.print();}
});
const panels={problems:problemPanel,stages:stagePanel,roles:rolePanel,evidence:evidencePanel};
function selectTab(tab){const group=tab.dataset.tab;const list=tab.closest('[role="tablist"]');list.querySelectorAll('[role="tab"]').forEach(b=>{b.setAttribute('aria-selected',String(b===tab));b.tabIndex=b===tab?0:-1;});const panel=$('#'+group+'-panel');panel.innerHTML=panels[group](Number(tab.dataset.index));panel.setAttribute('aria-labelledby',tab.id);}
$$('[role="tablist"]').forEach(list=>{
 list.addEventListener('click',e=>{const t=e.target.closest('[role="tab"]');if(t)selectTab(t);});
 list.addEventListener('keydown',e=>{
  const tabs=[...list.querySelectorAll('[role="tab"]')],i=tabs.indexOf(document.activeElement);if(i<0)return;
  let next=i;const vertical=list.getAttribute('aria-orientation')==='vertical';
  if(e.key===(vertical?'ArrowDown':'ArrowRight'))next=(i+1)%tabs.length;
  else if(e.key===(vertical?'ArrowUp':'ArrowLeft'))next=(i-1+tabs.length)%tabs.length;
  else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;
  e.preventDefault();tabs[next].focus();selectTab(tabs[next]);
 });
});
function selectPractice(button){
 const index=button.dataset.practice;
 $$('[data-practice]').forEach(node=>node.setAttribute('aria-pressed',String(node===button)));
 $$('[data-loop-highlight]').forEach(arc=>arc.dataset.selected=String(arc.dataset.loopHighlight===index));
 $$('.learning-loop').forEach(loop=>loop.dataset.selected=String(loop.contains(button)));
 $('#practice-detail').innerHTML=practicePanel(Number(index));
}
$$('[data-practice]').forEach(button=>button.addEventListener('click',()=>selectPractice(button)));
$$('.loop-practices').forEach(group=>group.addEventListener('keydown',event=>{
 const buttons=[...group.querySelectorAll('[data-practice]')];
 const index=buttons.indexOf(document.activeElement);if(index<0)return;
 let next=index;
 if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;
 else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;
 else if(event.key==='Home')next=0;
 else if(event.key==='End')next=buttons.length-1;
 else return;
 event.preventDefault();buttons[next].focus();selectPractice(buttons[next]);
}));
// This demonstration performs no live Halo operations. Each choice is local.
const routeLabels=['Review','Search','Reuse / capture','Link','Help','Resolve'];
let walk={step:0,exists:null,update:null,selfSolve:null,completed:false},walkHistory=[];
function choice(value,title,body){return `<button class="walk-choice" data-walk-choice="${value}"><strong>${title}<span aria-hidden="true">${arrowIcon}</span></strong><span>${body}</span></button>`;}
function nextButton(text){return `<button class="button primary walk-continue" data-walk-next>${text} <span aria-hidden="true">→</span></button>`;}
function renderWalk(moveFocus=false){
 const {step,exists,update,selfSolve,completed}=walk;
 $('#walk-route-list').innerHTML=routeLabels.map((s,i)=>`<li class="${i===step?'current':i<step?'done':''}" ${i===step?'aria-current="step"':''}><span aria-hidden="true">${i<step?'✓':String(i+1).padStart(2,'0')}</span><span>${s}</span><span class="sr-only">${i===step?'Current step':i<step?'Completed':''}</span></li>`).join('');
 $('#walk-step-count').textContent=completed?'WALKTHROUGH COMPLETE':`STEP ${step+1} OF 6`;
 $('#walk-back').disabled=walkHistory.length===0;
 const route=[];if(exists!==null)route.push(exists?'Reuse existing':'Capture new');if(update===true)route.push('Improve or flag');if(selfSolve!==null)route.push(selfSolve?'Share safely':'Agent-assisted resolution');
 $('#walk-route-summary').textContent=route.length?route.join(' → '):'Proposed workflow · Demo only';
 let html='';
 if(step===0)html=`<h2>Start with the issue.</h2><div class="walk-ticket"><p><del>Help with my account</del>Duo authentication fails after replacing a phone</p></div>${nextButton('Review & search')}`;
 if(step===1)html=`<h2>Does relevant knowledge exist?</h2><p>Search “Duo” + “replacement phone”.</p><div class="walk-choices">${choice('exists','Yes. Reuse it.','Check the match.')}${choice('missing','No. Capture new.','Investigate. Keep the learning.')}</div>`;
 if(step===2&&exists&&update===null)html=`<h2>Does it need an update?</h2><p>Reuse is review.</p><div class="walk-choices">${choice('update','Yes. Improve or flag.','Within your permissions.')}${choice('current','No. Use what works.','No duplicate needed.')}</div>`;
 if(step===2&&exists&&update!==null)html=update?`<h2>Improve. Or flag.</h2><p>Correct within your permissions; otherwise flag the gap.</p>${nextButton('Continue to linking')}`:`<h2>Reuse what works.</h2><p>A useful answer. No duplicate needed.</p>${nextButton('Continue to linking')}`;
 if(step===2&&!exists)html=`<h2>Keep what you learn.</h2><p>Capture issue, context and resolution in a shared structure.</p><div class="walk-note">Pilot permissions apply.</div>${nextButton('Continue to linking')}`;
 if(step===3)html=`<h2>Link the article.</h2><p>Record knowledge that helped resolve the ticket.</p><div class="link-graphic" aria-hidden="true"><div>Knowledge</div><span>→</span><div>Ticket</div></div>${nextButton('Link & continue')}`;
 if(step===4&&selfSolve===null)html=`<h2>Can the requester self-solve?</h2><p>Check suitability and audience access before sharing.</p><div class="walk-choices">${choice('self','Yes. Share safely.','Approved content. Permitted audience.')}${choice('assisted','No. Help them resolve.','Use knowledge with the requester.')}</div>`;
 if(step===4&&selfSolve!==null)html=selfSolve?`<h2>Share a clear next step.</h2><p>Share approved content with a permitted audience.</p><div class="walk-note">Internal use does not authorize public access.</div>${nextButton('Confirm the outcome')}`:`<h2>Resolve it together.</h2><p>Use knowledge and the relevant service procedure.</p>${nextButton('Confirm the outcome')}`;
 if(step===5&&!completed)html=`<h2>Confirm. Then resolve.</h2><p>Check the outcome. Keep the useful learning.</p><div class="walk-route-chips">${route.map(r=>`<span class="walk-route-chip">${r}</span>`).join('')}</div>${nextButton('Complete walkthrough')}`;
 if(completed)html=`<h2>One resolution.<br>Shared learning.</h2><p>${exists?'Reuse':'Capture'} path · ${selfSolve?'Safe requester self-solve':'Agent-assisted resolution'}</p><button class="button primary walk-continue" data-walk-reset>Explore another route <span aria-hidden="true">↺</span></button>`;
 $('#walk-panel').innerHTML=html;
 if(moveFocus){const heading=$('#walk-panel h2');heading.tabIndex=-1;heading.focus({preventScroll:true});}
}
function advanceWalk(action){walkHistory.push({...walk});
 if(action==='exists'||action==='missing'){walk.exists=action==='exists';walk.step=2;}
 else if(action==='update'||action==='current'){walk.update=action==='update';}
 else if(action==='self'||action==='assisted'){walk.selfSolve=action==='self';}
 else if(walk.step===5)walk.completed=true;
 else walk.step++;
 renderWalk(true);
}
function resetWalk(){walk={step:0,exists:null,update:null,selfSolve:null,completed:false};walkHistory=[];renderWalk(true);}
$('#walk-panel').addEventListener('click',e=>{const choice=e.target.closest('[data-walk-choice]');if(choice)advanceWalk(choice.dataset.walkChoice);if(e.target.closest('[data-walk-next]'))advanceWalk('next');if(e.target.closest('[data-walk-reset]'))resetWalk();});
$('#walk-back').addEventListener('click',()=>{if(walkHistory.length)walk=walkHistory.pop();renderWalk(true);});
$('#walk-restart').addEventListener('click',resetWalk);
// Versioned local-only storage. Invalid or unavailable storage never prevents use.
const storageKey='york-kcs-discussion-v1';
const commitmentLabels={participation:'Confirm participation: identify pilot teams, working-group representatives and coaches.',capacity:'Protect capacity: make time for coaching, practice and supported onboarding.',readiness:'Expand on evidence: agree readiness gates and the next-wave decision owner.'};
let discussion={checked:[],notes:''};
try{const stored=JSON.parse(localStorage.getItem(storageKey)||'null');if(stored&&Array.isArray(stored.checked)&&typeof stored.notes==='string')discussion={checked:stored.checked.filter(k=>k in commitmentLabels),notes:stored.notes.slice(0,10000)};}catch{/* Safe fallback when storage is blocked. */}
$$('[data-commitment]').forEach(c=>c.checked=discussion.checked.includes(c.dataset.commitment));
$('#discussion-notes').value=discussion.notes;
function refreshCount(){const n=discussion.checked.length;$('#commitment-count').textContent=`${n} of 3 marked for discussion`;$('#commitment-fill').style.width=(n/3*100)+'%';}
function saveDiscussion(){discussion={checked:$$('[data-commitment]:checked').map(c=>c.dataset.commitment),notes:$('#discussion-notes').value};try{localStorage.setItem(storageKey,JSON.stringify(discussion));$('#save-status').textContent='Saved in this browser only. No formal approval is recorded.';}catch{$('#save-status').textContent='Browser storage is unavailable. Copy or download your notes to keep them.';}refreshCount();}
$$('[data-commitment]').forEach(c=>c.addEventListener('change',saveDiscussion));
$('#discussion-notes').addEventListener('input',saveDiscussion);
function summary(){return `KCS AT YORK | DIRECTOR DISCUSSION\nPlanning aid, not a formal approval record.\n\nCOMMITMENTS MARKED FOR DISCUSSION\n${discussion.checked.length?discussion.checked.map(k=>'[x] '+commitmentLabels[k]).join('\n'):'None marked.'}\n\nNEXT STEPS & NOTES\n${discussion.notes||'No notes entered.'}\n\nSTILL TO CONFIRM\nFinal launch date; pilot roster; coach coverage; working-group mandate; Halo permissions.\n\nPlanned Halo KB go-live: 19 November 2026 (unconfirmed).\nSelf-service: separate summer 2027 target, subject to readiness.\n`;}
$('#copy-summary').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary());toast('Discussion summary copied.');}catch{toast('Clipboard unavailable. Use Download .txt to save the summary.');}});
$('#download-notes').addEventListener('click',()=>{const u=URL.createObjectURL(new Blob([summary()],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='York-KCS-director-discussion.txt';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);toast('Discussion summary downloaded.');});
$('#clear-notes').addEventListener('click',()=>{discussion={checked:[],notes:''};$$('[data-commitment]').forEach(c=>c.checked=false);$('#discussion-notes').value='';try{localStorage.removeItem(storageKey);}catch{}refreshCount();$('#save-status').textContent='Discussion cleared from this browser. No formal approval is recorded.';toast('Local discussion cleared.');});
window.addEventListener('beforeprint',()=>{let p=$('.print-notes');if(!p){p=document.createElement('p');p.className='print-notes';$('.print-supplement').append(p);}p.textContent=summary();});
window.addEventListener('afterprint',()=>{$('.print-notes')?.remove();});
renderWalk();refreshCount();fromHash();
