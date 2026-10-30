import { chapters, sources, problems, practices, stages, roles, evidence, arrowIcon, problemPanel, practicePanel, stagePanel, benefits, horizons, enablement, rolloutWebsites, programSupports, questions, benefitPanel, questionPanel } from './content.js';
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
  benefits:benefits.map(b=>[b.label,b.outcomes.map(([title,body],i)=>`${horizons[i].label}: ${title}. ${body}`).join(' ')+' How to validate: '+b.proof]),
  'launch-scope':[['All Halo agents','Search, see suggestions, reuse, share suitable guidance and link articles available to them.'],['Onboarded pilot participants','SSB, OUR, CTS and CS create and improve after onboarding. Authoring follows onboarding.']],
  enablement:[...enablement.map(e=>[e.label,`${e.time}. ${e.detail}`]),...rolloutWebsites.map(w=>[w.label,`${w.purpose} ${w.detail} https://www.yorku.ca${w.path}`])],
  'leadership-questions':questions.map(q=>[q.question,q.answer+' '+q.detail]),
  method:practices.map(p=>[`${p.loop} Loop: ${p.label}`,`${p.body} Example: ${p.example}`]),
  rollout:stages.map(s=>[`${s.label}: ${s.time} (${s.status})`,`${s.desc} Readiness: ${s.gate} ${s.note}`]),
  'operating-model':[...programSupports.map(p=>[p.label,p.detail]),...roles.map(r=>[r.label,`${r.body} Contribution: ${r.output}`])],
  evidence:evidence.map(e=>[e.label,`${e.question} ${e.decision} ${e.signals.join('; ')}. ${e.avoid}`])
 }[id];
 return entries?`<details class="notes-detail"><summary>Supporting detail</summary>${entries.map(([label,body])=>`<h3>${label}</h3><p>${body}</p>`).join('')}</details>`:'';
}
function updateNotes(){const c=chapters[current];$('#presenter-notes').innerHTML=`<h3>${String(current+1).padStart(2,'0')} / ${c.label}</h3><p>${c.notes}</p>${extraNotes(c.id)}<h3>Sources</h3><ul>${c.sources.map(key=>{const s=sources[key];return `<li>${s.url?`<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label} ${arrowIcon}</a>`:`<strong>${s.label}</strong>`}<span>${s.detail}</span></li>`;}).join('')}</ul>`;}
function fromHash(){const i=chapters.findIndex(c=>'#'+c.id===location.hash);goTo(i<0?0:i,{updateHash:false});}
root.addEventListener('click',e=>{
 if(e.target.closest('[data-open-discussion]'))$('#discussion-dialog').showModal();
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
const panels={problems:problemPanel,stages:stagePanel,benefits:benefitPanel,questions:questionPanel};
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
const heroLoop=$('.hero-double-loop');
function selectHeroLoop({practice=null,loop=null}={}){
 const selected=practice===null?null:practices[practice];
 const active=selected?selected.loop.toLowerCase():loop;
 heroLoop.dataset.active=active||'overview';
 heroLoop.querySelectorAll('[data-hero-practice]').forEach(b=>b.setAttribute('aria-pressed',String(Boolean(selected)&&Number(b.dataset.heroPractice)===practice)));
 heroLoop.querySelectorAll('[data-hero-loop]').forEach(b=>b.setAttribute('aria-pressed',String(!selected&&b.dataset.heroLoop===loop)));
 const heading=selected?selected.label:loop==='solve'?'Solve Loop':loop==='evolve'?'Evolve Loop':'Solve and Evolve';
 const summaries=['Search early, reuse relevant knowledge and link it to the ticket.','Correct useful knowledge as you reuse it, or flag gaps.','Capture the issue, context and resolution during the interaction.','Use consistent titles and clear issue, environment and resolution details.','Use reuse, failed searches and feedback to prioritise content improvements.','Make knowledge work part of ticket handling and service delivery.','Review service outcomes, content quality and observed practice together.','Build participation through coaching, leadership support and shared learning.'];
 const body=selected?summaries[practice]:loop==='solve'?'Reuse, improve, capture and structure knowledge while resolving requests.':loop==='evolve'?'Use patterns across interactions to improve content, processes and adoption.':'Use knowledge in each ticket. Improve the system through shared learning.';
 $('#hero-loop-detail').innerHTML=`<p class="hero-loop-kicker">${selected?selected.loop+' Loop':'KCS'}</p><h2>${heading}</h2><p>${body}</p>`;
}
heroLoop.addEventListener('click',e=>{
 const practice=e.target.closest('[data-hero-practice]');if(practice)selectHeroLoop({practice:Number(practice.dataset.heroPractice)});
 const loop=e.target.closest('[data-hero-loop],[data-hero-arc]');if(loop)selectHeroLoop({loop:loop.dataset.heroLoop||loop.dataset.heroArc});
 if(e.target.closest('[data-hero-overview]'))selectHeroLoop();
});
heroLoop.querySelectorAll('.hero-loop-practices').forEach(group=>group.addEventListener('keydown',e=>{
 const buttons=[...group.querySelectorAll('button')],i=buttons.indexOf(document.activeElement);if(i<0)return;
 let next=i;
 if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(i+1)%buttons.length;
 else if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(i-1+buttons.length)%buttons.length;
 else if(e.key==='Home')next=0;else if(e.key==='End')next=buttons.length-1;else return;
 e.preventDefault();buttons[next].focus();buttons[next].click();
}));
// Versioned local-only storage. Invalid or unavailable storage never prevents use.
const storageKey='york-kcs-discussion-v1';
const commitmentLabels={participation:'Confirm participation: identify pilot teams, Knowledge Council contributors and coaches; co-create the shared content standard.',capacity:'Protect capacity: make time for coaching, practice and supported onboarding.',readiness:'Expand on evidence: agree readiness gates and the next-wave decision owner.'};
let discussion={checked:[],notes:''};
try{const stored=JSON.parse(localStorage.getItem(storageKey)||'null');if(stored&&Array.isArray(stored.checked)&&typeof stored.notes==='string')discussion={checked:stored.checked.filter(k=>k in commitmentLabels),notes:stored.notes.slice(0,10000)};}catch{/* Safe fallback when storage is blocked. */}
$$('[data-commitment]').forEach(c=>c.checked=discussion.checked.includes(c.dataset.commitment));
$('#discussion-notes').value=discussion.notes;
function refreshCount(){const n=discussion.checked.length;$('#commitment-count').textContent=`${n} of 3 marked for discussion`;$('#commitment-fill').style.width=(n/3*100)+'%';}
function saveDiscussion(){discussion={checked:$$('[data-commitment]:checked').map(c=>c.dataset.commitment),notes:$('#discussion-notes').value};try{localStorage.setItem(storageKey,JSON.stringify(discussion));$('#save-status').textContent='Saved in this browser.';}catch{$('#save-status').textContent='Browser storage is unavailable. Copy or download your notes to keep them.';}refreshCount();}
$$('[data-commitment]').forEach(c=>c.addEventListener('change',saveDiscussion));
$('#discussion-notes').addEventListener('input',saveDiscussion);
function summary(){return `KCS AT YORK | DIRECTOR DISCUSSION\n\nTEAM COMMITMENTS\n${discussion.checked.map(k=>'[x] '+commitmentLabels[k]).join('\n')}\n\nNEXT STEPS & NOTES\n${discussion.notes}\n\nROLLOUT\nPlanned agent launch: 19 November 2026.\nPilot groups: SSB, OUR, CTS and CS; authoring follows onboarding.\nCommunity self-service: summer 2027, following readiness review.\n`;}
$('#copy-summary').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary());toast('Discussion summary copied.');}catch{toast('Clipboard unavailable. Use Download .txt to save the summary.');}});
$('#download-notes').addEventListener('click',()=>{const u=URL.createObjectURL(new Blob([summary()],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='York-KCS-director-discussion.txt';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);toast('Discussion summary downloaded.');});
$('#clear-notes').addEventListener('click',()=>{discussion={checked:[],notes:''};$$('[data-commitment]').forEach(c=>c.checked=false);$('#discussion-notes').value='';try{localStorage.removeItem(storageKey);}catch{}refreshCount();$('#save-status').textContent='Discussion cleared from this browser.';toast('Local discussion cleared.');});
window.addEventListener('beforeprint',()=>{let p=$('.print-notes');if(!p){p=document.createElement('p');p.className='print-notes';$('.print-supplement').append(p);}p.textContent=summary();});
window.addEventListener('afterprint',()=>{$('.print-notes')?.remove();});
refreshCount();fromHash();
