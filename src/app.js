import { chapters, sources, arrowIcon, problemPanel, practicePanel, stagePanel, rolePanel, evidencePanel } from './content.js';
const root=document.querySelector('#kcs-app');
const $=(s)=>root.querySelector(s);
const $$=(s)=>[...root.querySelectorAll(s)];
root.classList.add('js');
let current=0,reading=false,toastTimer;
const slides=$$('.slide');
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(message){$('#toast').textContent=message;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,4200);}
function closeDialogs(){$$('dialog[open]').forEach(d=>d.close());}
function goTo(index,{updateHash=true,focus=false}={}){
 if(index<0||index>=chapters.length)return;
 current=index;
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
function updateNotes(){const c=chapters[current];$('#presenter-notes').innerHTML=`<h3>${String(current+1).padStart(2,'0')} / ${c.label}</h3><p>${c.notes}</p><h3>Sources</h3><ul>${c.sources.map(key=>{const s=sources[key];return `<li>${s.url?`<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label} ${arrowIcon}</a>`:`<strong>${s.label}</strong>`}<span>${s.detail}</span></li>`;}).join('')}</ul>`;}
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
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
function toggleReading(){reading=!reading;root.classList.toggle('reading',reading);slides.forEach((s,i)=>s.hidden=!reading&&i!==current);$('#reading-button').textContent=reading?'Return to presentation →':'Reading & print view →';toast(reading?'Reading view: all sections and alternative states are available.':'Presentation view restored.');}
$('#reading-button').addEventListener('click',toggleReading);
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await root.requestFullscreen();closeDialogs();}catch{toast('Fullscreen is unavailable in this browser.');}}
$('#fullscreen-button').addEventListener('click',fullscreen);
window.addEventListener('hashchange',fromHash);
document.addEventListener('keydown',e=>{
 const interactive=e.target.closest('input,textarea,select,button,a,[role="tab"],[role="tabpanel"],[contenteditable="true"]');
 if(e.metaKey||e.ctrlKey||e.altKey||$('dialog[open]')||interactive)return;
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
$$('[data-practice]').forEach(b=>b.addEventListener('click',()=>{$$('[data-practice]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('#practice-detail').innerHTML=practicePanel(Number(b.dataset.practice));}));
// This demonstration performs no live Halo operations. Each choice is local.
const routeLabels=['Review the ticket','Search for knowledge','Reuse or capture','Link to the ticket','Requester resolution','Confirm & resolve'];
let walk={step:0,exists:null,update:null,selfSolve:null,completed:false},walkHistory=[];
function choice(value,title,body){return `<button class="walk-choice" data-walk-choice="${value}"><strong>${title}<span aria-hidden="true">${arrowIcon}</span></strong><span>${body}</span></button>`;}
function nextButton(text){return `<button class="button primary walk-continue" data-walk-next>${text} <span aria-hidden="true">→</span></button>`;}
function renderWalk(moveFocus=false){
 const {step,exists,update,selfSolve,completed}=walk;
 $('#walk-route-list').innerHTML=routeLabels.map((s,i)=>`<li class="${i===step?'current':i<step?'done':''}" ${i===step?'aria-current="step"':''}><span aria-hidden="true">${i<step?'✓':String(i+1).padStart(2,'0')}</span><span>${s}</span><span class="sr-only">${i===step?'Current step':i<step?'Completed':''}</span></li>`).join('');
 $('#walk-step-count').textContent=completed?'WALKTHROUGH COMPLETE':`STEP ${step+1} OF 6`;
 $('#walk-back').disabled=walkHistory.length===0;
 const route=[];if(exists!==null)route.push(exists?'Reuse existing':'Capture new');if(update===true)route.push('Improve or flag');if(selfSolve!==null)route.push(selfSolve?'Share safely':'Agent-assisted resolution');
 $('#walk-route-summary').textContent=route.length?route.join(' → '):'Make choices to follow a ticket from review to resolution.';
 let html='';
 if(step===0)html=`<span class="micro">Start with context</span><h2>A useful subject makes the next step easier.</h2><p>Review the issue and the requester’s context. Describe the service and the problem without exposing personal information.</p><div class="walk-ticket"><span class="micro">Meaningful ticket subject</span><p><del>Help with my account</del>Duo authentication fails after replacing a phone</p></div>${nextButton('Review & search')}`;
 if(step===1)html=`<span class="micro">Search early</span><h2>Does relevant knowledge exist?</h2><p>Search for “Duo” and “replacement phone”. Check that the article matches the requester’s issue and context.</p><div class="walk-choices">${choice('exists','Yes, a relevant article','Follow the knowledge and check whether it fits.')}${choice('missing','No relevant article','Investigate and capture what you learn.')}</div><div class="walk-note"><span aria-hidden="true">${arrowIcon}</span>Choose either path to explore the workflow.</div>`;
 if(step===2&&exists&&update===null)html=`<span class="micro">Follow the relevant article</span><h2>Does the knowledge need an update?</h2><p>Use the article while investigating. Reuse is review: verify the answer in the context of this interaction.</p><div class="walk-choices">${choice('update','Yes, there’s a gap','Improve it within your permissions, or flag it.')}${choice('current','No, it fits','Reuse the relevant answer as it stands.')}</div>`;
 if(step===2&&exists&&update!==null)html=update?`<span class="micro">Improve or flag</span><h2>Keep the answer useful for the next person.</h2><p>Make the correction or create an updated article version using the approved Halo workflow and your contributor rights. If you cannot change it, flag the gap.</p><div class="walk-result"><span aria-hidden="true">${arrowIcon}</span><p>A new phone setup step is missing. The useful correction stays connected to the original knowledge.</p></div>${nextButton('Continue to linking')}`:`<span class="micro">Reuse the answer</span><h2>A relevant answer is already available.</h2><p>Use the article to support the resolution. There is no need to create a duplicate just to record a contribution.</p><div class="walk-result"><span aria-hidden="true">✓</span><p>The issue and context match. The existing article helps this interaction.</p></div>${nextButton('Continue to linking')}`;
 if(step===2&&!exists)html=`<span class="micro">Capture & structure</span><h2>Turn the investigation into reusable knowledge.</h2><p>As the resolution becomes known, capture the issue, relevant context and resolution from the ticket using a simple shared structure.</p><div class="walk-result"><span aria-hidden="true">${arrowIcon}</span><p>Create within the approved pilot permissions. Coaching develops judgement; do not publish an unverified answer as trusted guidance.</p></div>${nextButton('Continue to linking')}`;
 if(step===3)html=`<span class="micro">Record useful reuse</span><h2>Link the knowledge to the ticket.</h2><p>Associate the ${exists?'relevant':'newly captured'} article with the ticket to record its contribution. Use the approved Halo linking workflow.</p><div class="walk-result"><span aria-hidden="true">${arrowIcon}</span><p>A useful relationship, not a quota. Link knowledge honestly when it helped the work.</p></div>${nextButton('Link & continue')}`;
 if(step===4&&selfSolve===null)html=`<span class="micro">Choose the resolution path</span><h2>Can the requester self-solve with this article?</h2><p>Check both whether the answer is suitable and whether the requester is permitted to access it. Internal agent access does not mean public access.</p><div class="walk-choices">${choice('self','Yes, suitable & accessible','Share approved knowledge with the requester.')}${choice('assisted','No, agent help is needed','Resolve the issue with the requester.')}</div>`;
 if(step===4&&selfSolve!==null)html=selfSolve?`<span class="micro">Share safely</span><h2>Send the knowledge with a clear next action.</h2><p>Explain what to do and how to get further help. Share only audience-appropriate, approved content through the permitted channel.</p><div class="walk-result"><span aria-hidden="true">${arrowIcon}</span><p>The pilot does not automatically open self-service to the York community. Check permissions before sharing.</p></div>${nextButton('Confirm the outcome')}`:`<span class="micro">Agent-assisted resolution</span><h2>Use the knowledge to resolve the request.</h2><p>Work with the requester using the relevant service procedure. Keep the knowledge linked even when the requester cannot self-solve.</p><div class="walk-result"><span aria-hidden="true">${arrowIcon}</span><p>The article supports the work. It does not replace the agent’s judgement or service controls.</p></div>${nextButton('Confirm the outcome')}`;
 if(step===5&&!completed)html=`<span class="micro">Follow service best practice</span><h2>Confirm the result. Keep the learning.</h2><p>Check the outcome with the requester, record an appropriate resolution and follow the relevant service procedure to resolve the ticket.</p><div class="walk-ticket"><span class="micro">The route you explored</span><p>${route.map(r=>`<span class="walk-route-chip">${r}</span>`).join('')}</p></div>${nextButton('Complete walkthrough')}`;
 if(completed)html=`<span class="micro">The next interaction starts further ahead</span><h2>One resolved ticket. Shared learning.</h2><p>You followed the ${exists?'reuse':'capture'} path${update?' with an improvement or flag':''}, linked the knowledge, and chose ${selfSolve?'safe requester self-solve':'agent-assisted resolution'}.</p><div class="walk-result"><span aria-hidden="true">✓</span><p>Search, reuse, improve and capture belong in the work. Coaching and feedback make the practice stronger.</p></div><button class="button primary walk-continue" data-walk-reset>Explore another route <span aria-hidden="true">↺</span></button>`;
 $('#walk-panel').innerHTML=html.replaceAll('↗',arrowIcon);
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
window.addEventListener('beforeprint',()=>{let p=$('.print-notes');if(!p){p=document.createElement('p');p.className='print-notes';$('.discussion').append(p);}p.textContent=summary();$('#discussion-notes').hidden=true;});
window.addEventListener('afterprint',()=>{$('#discussion-notes').hidden=false;$('.print-notes')?.remove();});
renderWalk();refreshCount();fromHash();
