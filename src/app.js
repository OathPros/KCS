import { chapters, practices, arrowIcon, problemPanel, stagePanel, benefitPanel, questionPanel } from './content.js';
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
 closeDialogs();
 if(focus){if(reading){slides[index].scrollIntoView({block:'start'});}else{$('#presentation').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}}
}
function fromHash(){const i=chapters.findIndex(c=>'#'+c.id===location.hash);goTo(i<0?0:i,{updateHash:false});}
root.addEventListener('click',e=>{
 const goto=e.target.closest('[data-goto]');if(goto)goTo(Number(goto.dataset.goto),{focus:true});
 if(e.target.closest('[data-next]'))goTo(current+1,{focus:true});
 if(e.target.closest('[data-close]'))e.target.closest('dialog').close();
});
$('#previous-button').addEventListener('click',()=>goTo(current-1,{focus:true}));
$('#next-button').addEventListener('click',()=>goTo(current+1,{focus:true}));
$('#overview-button').addEventListener('click',()=>$('#overview-dialog').showModal());
$('#help-button').addEventListener('click',()=>$('#help-dialog').showModal());
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
function toggleReading(){closeDialogs();reading=!reading;$('#exit-reading').hidden=!reading;root.classList.toggle('reading',reading);slides.forEach((s,i)=>s.hidden=!reading&&i!==current);$('#reading-button').textContent=reading?'Return to presentation →':'Reading & print view →';toast(reading?'Reading view: all slides are available.':'Presentation view restored.');}
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
fromHash();
