import { arrowIcon } from './content.js';
export function initSolveWalkthrough(root){
 if(root.dataset.walkReady)return;root.dataset.walkReady='true';
 const $=selector=>root.querySelector(selector);
// Walkthrough state is local to the presentation.
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
 $('#walk-route-summary').textContent=route.length?route.join(' → '):'Agent knowledge workflow';
 let html='';
 if(step===0)html=`<h2>Review the issue</h2><div class="walk-ticket"><p><del>Help with my account</del>Duo authentication fails after replacing a phone</p></div>${nextButton('Review & search')}`;
 if(step===1)html=`<h2>Does relevant knowledge exist?</h2><p>Search “Duo” + “replacement phone”.</p><div class="walk-choices">${choice('exists','Yes. Reuse it.','Check the match.')}${choice('missing','No. Capture new.','Investigate. Keep the learning.')}</div>`;
 if(step===2&&exists&&update===null)html=`<h2>Does it need an update?</h2><p>Reuse is review.</p><div class="walk-choices">${choice('update','Yes. Improve or flag.','Within your permissions.')}${choice('current','No. Use what works.','No duplicate needed.')}</div>`;
 if(step===2&&exists&&update!==null)html=update?`<h2>Improve or flag</h2><p>Correct within your permissions; otherwise flag the gap.</p>${nextButton('Continue to linking')}`:`<h2>Reuse what works</h2><p>A useful answer. No duplicate needed.</p>${nextButton('Continue to linking')}`;
 if(step===2&&!exists)html=`<h2>Keep what you learn</h2><p>Capture issue, context and resolution in a shared structure.</p><div class="walk-note">Pilot permissions apply.</div>${nextButton('Continue to linking')}`;
 if(step===3)html=`<h2>Link the article</h2><p>Record knowledge that helped resolve the ticket.</p><div class="link-graphic" aria-hidden="true"><div>Knowledge</div><span>→</span><div>Ticket</div></div>${nextButton('Link & continue')}`;
 if(step===4&&selfSolve===null)html=`<h2>Can the requester self-solve?</h2><p>Check suitability and audience access before sharing.</p><div class="walk-choices">${choice('self','Yes. Share safely.','Approved content. Permitted audience.')}${choice('assisted','No. Help them resolve.','Use knowledge with the requester.')}</div>`;
 if(step===4&&selfSolve!==null)html=selfSolve?`<h2>Share a clear next step</h2><p>Share approved content with a permitted audience.</p><div class="walk-note">Internal use does not authorize public access.</div>${nextButton('Confirm the outcome')}`:`<h2>Resolve it together</h2><p>Use knowledge and the relevant service procedure.</p>${nextButton('Confirm the outcome')}`;
 if(step===5&&!completed)html=`<h2>Verify the outcome</h2><p>Check the outcome. Keep the useful learning.</p><div class="walk-route-chips">${route.map(r=>`<span class="walk-route-chip">${r}</span>`).join('')}</div>${nextButton('Complete walkthrough')}`;
 if(completed)html=`<h2>Resolution and shared learning</h2><p>${exists?'Reuse':'Capture'} path · ${selfSolve?'Safe requester self-solve':'Agent-assisted resolution'}</p><button class="button primary walk-continue" data-walk-reset>Explore another route <span aria-hidden="true">↺</span></button>`;
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

renderWalk();
}
