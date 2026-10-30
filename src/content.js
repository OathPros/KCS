export const chapters = [
  {id:'opportunity', label:'The opportunity', short:'Opportunity', notes:'Knowledge is created, reused and improved as part of resolving requests. Halo brings shared knowledge into ticket work; KCS provides the practice that keeps it useful. The rollout begins with agent reuse and pilot authoring, then expands through supported waves.', sources:['york','guide']},
  {id:'case-for-change', label:'The case for change', short:'Why change', notes:'Knowledge leaves with individuals, answers scatter across systems and useful content drifts. KCS captures reusable learning during resolution, helps agents find relevant guidance and makes improvement part of reuse.', sources:['york','guide']},
  {id:'method', label:'How KCS works', short:'The method', notes:'The Solve Loop supports learning within an interaction; the Evolve Loop uses patterns across interactions to improve the system. Practices overlap during real work. KCS rests on abundance, value creation, demand-driven work and trust. Coaching, shared ownership and learning are central.', sources:['guide','principles']},
  {id:'daily-practice', label:'Agent Solve Loop', short:'Agent walkthrough', notes:'Use the Duo ticket to follow the knowledge workflow. Search early, reuse relevant knowledge and record its contribution. Improve within your permissions or flag a specific gap. Capture reusable issue, context and resolution when knowledge is missing. Share guidance with its intended audience and verify the outcome before resolving the ticket.', sources:['guide','york']},
  {id:'rollout', label:'The rollout', short:'Rollout', notes:'19 November 2026 is the planned agent launch and start of pilot authoring in SSB, OUR, CTS and CS. Winter 2027 refines content standards, coaching and workflows. Spring adoption waves follow team readiness and support capacity. Summer 2027 community self-service follows a separate content, audience and service-readiness review.', sources:['york']},
  {id:'operating-model', label:'Coaching and Knowledge Council', short:'Ownership', notes:'Coaching develops judgement and proficiency through observation, feedback and practice with real tickets and articles. The Knowledge Council brings contributors, coaches and service owners together to review frontline evidence, co-create the shared content standard and remove cross-team barriers. Directors protect time for active participation, nominate contributors and support workshops using real examples. Use failed searches, reuse feedback, content gaps and coaching observations as learning evidence.', sources:['coaching','guide','measurement','york']},
  {id:'evidence', label:'How we judge progress', short:'Evidence', notes:'Review three aims together: better support, healthy knowledge and sustainable adoption. Combine outcomes, content health and observed practice. Establish baselines before setting targets. Use activity trends for diagnosis and coaching, without individual article or link quotas. Assess successful self-service through task completion and requester experience.', sources:['guide','measurement','york']},
  {id:'decisions', label:'What directors need to do', short:'Director ask', notes:'Support active participation in the knowledge program, protect coaching and workshop time, and expand through readiness-based waves. Identify pilot participants, Knowledge Council contributors and coaches. Use the discussion form to record owners, capacity decisions and next steps. Notes are stored in this browser and can be copied or downloaded.', sources:['york','guide']}
];
const additions = [
 {before:'evidence', id:'benefits', label:'Benefits by entity and horizon', short:'Benefits', notes:'Our customers gain resolution steps in tickets, more consistent help and later access to community self-service. Our agents gain in-ticket knowledge, less repeated investigation and broader cross-team knowledge. Our institution gains a knowledge practice, evidence of service gaps and a foundation for future orchestration and automation. Review these benefits across launch and pilot, winter/spring 2027, and summer 2027 onward.', sources:['annotations','york','comms','measurement']},
 {before:'rollout', id:'launch-scope', label:'What changes at launch', short:'Launch scope', notes:'All Halo agents can search available knowledge, see suggestions, reuse, share suitable guidance and link articles. Onboarded pilot participants in SSB, OUR, CTS and CS create and improve articles. Community self-service follows in a later phase.', sources:['york','comms']},
 {before:'operating-model', id:'enablement', label:'Communications and rollout resources', short:'Enablement', notes:'Executive communications align sponsorship and phased adoption. Manager briefings protect capacity before participant invitations. The all-agent announcement explains launch access; pilot invitations set responsibilities and lead into training. The KB project page explains the rollout, KCS @ York explains the practice, and the Pilot Hub supports participants. Virtual training, coaching and workshops reinforce practice and gather feedback.', sources:['comms','york']},
 {before:'decisions', id:'leadership-questions', label:'Leadership questions', short:'Questions', notes:'The questions cover staff capacity, local accountability, authoring rights, existing content, safe sharing, expansion and value. Protect learning time, retain service ownership, contribute within permissions and use evidence to guide growth. Build suitable knowledge and evaluate readiness before extending self-service or automation.', sources:['york','comms','guide','measurement']}
];
for (const {before,...chapter} of additions) chapters.splice(chapters.findIndex(c=>c.id===before),0,chapter);
export const sources = {
  coaching:{label:'KCS roles and proficiency guidance',detail:'Consortium for Service Innovation, Practice 6: Process Integration, technique 6.4. Supports coaching, demonstrated proficiency and contribution in the workflow.',url:'https://library.serviceinnovation.org/KCS/Knowledge-Centered_Success_Practices_Guide/301-Evolve_Loop/Practice_6_Process_Integration/Technique_6.4'},
  annotations:{label:'Annotated benefits screenshots',detail:'User-supplied annotations: three groups; ticket-based resolution sharing; consistency; community self-service; less repetition; cross-team knowledge; knowledge maintenance; service-gap evidence; future orchestration and automation.',url:null},
  york:{label:'York leadership rollout', detail:'Halo_KB_Leadership_Rollout.pdf, supplied by the user. Launch scope, roadmap, readiness and leadership expectations.',url:null},
  comms:{label:'Launch communications', detail:'KB Pilot + Production Launch Coms .pdf, supplied by the user. Audience-specific launch messages, pilot responsibilities, training and support.',url:null},
  guide:{label:'KCS Practices Guide',detail:'Consortium for Service Innovation · Knowledge-Centered Success Practices Guide',url:'https://library.serviceinnovation.org/KCS/Knowledge-Centered_Success_Practices_Guide'},
  principles:{label:'Official KCS library',detail:'Consortium for Service Innovation · principles and methodology',url:'https://library.serviceinnovation.org/KCS/Principles_and_Core_Concepts'},
  measurement:{label:'KCS measurement guidance',detail:'See Performance Insight in the current Practices Guide. Use outcomes and behaviour together; avoid activity quotas.',url:'https://library.serviceinnovation.org/KCS/Knowledge-Centered_Success_Practices_Guide/301-Evolve_Loop/Practice_7_Performance_Insight/Technique_7.1'}
};
export const problems = [
 {label:'Knowledge leaves',icon:'↗',title:'Expertise should outlast the expert',before:'The answer depends on finding the person who remembers.',after:'Capture useful context during resolution. The next person can build on it.',gain:'Individual experience becomes shared capability.'},
 {label:'Work repeats',icon:'↻',title:'Solve the issue. Keep the learning',before:'A familiar issue triggers another investigation from the beginning.',after:'Search early. Reuse what helps and record its contribution to the resolution.',gain:'The next interaction starts further ahead.'},
 {label:'Answers drift',icon:'≠',title:'Useful knowledge gets better with use',before:'An outdated answer stays untouched until someone has spare time.',after:'Treat reuse as review. Correct the answer or flag a gap in the flow of work.',gain:'Demand directs attention to the knowledge that matters.'},
 {label:'Knowledge scatters',icon:'⌕',title:'An answer only helps if it can be found',before:'Useful guidance lives in tickets, chats and personal notes.',after:'Use a simple shared structure, the requester’s language and service context.',gain:'Relevant answers become easier to recognise and reuse.'}
];
export const practices = [
 {id:'reuse',loop:'Solve',label:'Reuse',verb:'Search early. Build on what is known.',body:'Search using the requester’s context. Reuse relevant knowledge and record when it helps.',example:'A familiar issue arrives. Search before starting another investigation.',value:'Less rediscovery'},
 {id:'improve',loop:'Solve',label:'Improve',verb:'Reuse is review.',body:'Check whether the answer fits. Correct it within your permissions, or flag the gap for improvement.',example:'An article omits a new authentication step. Improve it or flag it during the interaction.',value:'Knowledge that stays useful'},
 {id:'capture',loop:'Solve',label:'Capture',verb:'Keep the learning in the moment.',body:'When knowledge is missing, capture reusable issue, context and resolution as you work.',example:'A new issue is resolved. Record what another agent will need to recognise and resolve it.',value:'Experience that stays with York'},
 {id:'structure',loop:'Solve',label:'Structure',verb:'Make the answer easy to find and use.',body:'Use a simple, consistent format and the language people actually search.',example:'A meaningful title and clear environment details help the next agent recognise a match.',value:'Findable, usable answers'},
 {id:'content',loop:'Evolve',label:'Content health',verb:'Let demand guide improvement.',body:'Use reuse, feedback and failed searches to identify gaps, duplication and obsolete guidance.',example:'Repeated searches expose a missing service scenario. Address the gap where demand is real.',value:'Relevant knowledge'},
 {id:'process',loop:'Evolve',label:'Process integration',verb:'Make the useful behaviour easy.',body:'Align workflow, tools, roles and coaching so knowledge work belongs inside service delivery.',example:'Remove the extra steps that prevent agents from searching and linking knowledge in Halo.',value:'A sustainable practice'},
 {id:'insight',loop:'Evolve',label:'Performance insight',verb:'Look for value, not volume.',body:'Review outcomes, observed behaviour and contribution together. Counts alone do not establish value.',example:'Sample whether reused articles actually helped resolve the requester’s issue.',value:'Evidence for better decisions'},
 {id:'change',loop:'Evolve',label:'Change management',verb:'Build commitment through participation.',body:'Connect the purpose to everyday work. Coach people, listen to friction and adapt the approach.',example:'A coach brings a recurring workflow barrier to the working group for action.',value:'Adoption that lasts'}
];
export const stages = [
 {label:'Start',time:'19 Nov 2026',status:'Planned',title:'Open access. Begin the coached pilot',desc:'IT agents find and use available knowledge. Pilot participants begin creating and improving with coaching.',gate:'Core workflows, role access and coach coverage are ready.',scope:[['IT agents','Find and use'],['Pilot participants','Create and improve with coaching']],note:''},
 {label:'Learn',time:'Winter 2027',status:'Refine the practice',title:'Let real work shape York’s standard',desc:'Use live tickets, coaching and feedback to refine the content standard, permissions and operating model.',gate:'Evidence supports continuing, extending or adjusting the pilot.',scope:[['Pilot teams','Practise and surface friction'],['Knowledge Council','Refine standards and remove barriers']],note:'Standards, coaching and Solve/Evolve workflows mature through the pilot.'},
 {label:'Expand',time:'Spring 2027',status:'Readiness-based',title:'Add teams at a pace we can support',desc:'Bring additional teams into the practice through supported adoption waves.',gate:'The next team has working access, relevant knowledge and coaching capacity.',scope:[['Additional teams','Join through supported waves'],['Directors','Resolve scope and capacity decisions']],note:'Expansion follows demonstrated readiness, not a fixed team quota.'},
 {label:'Self-service',time:'Summer 2027',status:'Separate target',title:'Open suitable knowledge to the community',desc:'Publish audience-appropriate knowledge through a separate self-service release decision.',gate:'Content suitability, audience access and service readiness are confirmed.',scope:[['York community','Use approved self-service knowledge'],['Service owners','Confirm service accuracy and audience suitability']],note:'Internal use does not automatically authorize public publication.'}
];
export const roles = [
 {label:'Pilot teams',title:'Make knowledge part of resolution',body:'Search, reuse, capture and improve during real work. Bring examples of friction and missing knowledge.',output:'Evidence from real tickets and articles'},
 {label:'Coaches',title:'Develop judgement through practice',body:'Coach using actual work. Help people recognise useful knowledge and contribute within demonstrated proficiency.',output:'Stronger practice and supported contributors'},
 {label:'Knowledge Council',title:'Co-create the shared content standard',body:'Bring contributors, coaches and service owners together across teams. Use frontline evidence to evolve the shared content standard, address workflow barriers and inform adoption waves.',output:'A usable standard and an improvement backlog'},
 {label:'Service owners',title:'Keep the service truth clear',body:'Resolve service accuracy, audience and risk questions. Support appropriate publication decisions.',output:'Accurate guidance for the right audience'},
 {label:'Directors & managers',title:'Protect the conditions for adoption',body:'Nominate participants, protect coaching capacity and resolve cross-team scope and capacity decisions.',output:'Time, sponsorship and readiness-based decisions'}
];
export const programSupports = [
 {label:'Coaching', title:'Coaching in daily work', points:['Coach with real tickets','Develop judgement and proficiency','Reinforce search, reuse and improvement'], detail:'KCS coaching develops capability through observed work, feedback and practice. Coaches use actual tickets and articles to help contributors recognise useful knowledge, improve within their permissions and follow a shared workflow. Look for relevant reuse, usable answers and improved practice; activity counts alone do not show proficiency.'},
 {label:'Knowledge Council', title:'Shared standards across teams', points:['Bring frontline evidence together','Co-create our shared content standard','Remove cross-team workflow barriers'], detail:'Cross-team forum for contributors, coaches and service owners across teams. Bring failed searches, article examples, feedback and coaching observations into shared learning. Co-create a practical minimum content standard, test it in real work and improve it as needs become clearer. The council supports collective ownership and addresses system barriers; it should not become an approval queue for every article. '}
];
export const evidence = [
 {label:'Better support',question:'Does knowledge help resolve the issue?',signals:['Sample known-issue resolutions','Check whether reuse was relevant','Review requester experience'],decision:'Improve the answer or the workflow when reuse does not help.',avoid:'Article volume is not a measure of resolution quality.', displaySignals:['Known-issue resolutions','Relevant reuse','Requester experience'], action:'Improve answers and workflows that do not help.'},
 {label:'Healthy knowledge',question:'Can people find and trust the answer?',signals:['Review failed searches and feedback','Check relevance, duplication and gaps','Confirm audience and service accuracy'],decision:'Prioritise the knowledge people need and actually use.',avoid:'A large repository does not establish a useful repository.', displaySignals:['Failed searches and feedback','Relevance, duplication and gaps','Audience and service accuracy'], action:'Prioritise knowledge people need and use.'},
 {label:'Sustainable adoption',question:'Is the practice becoming part of the work?',signals:['Observe search and contribution in real work','Review coaching needs and workflow friction','Check team readiness and coach capacity'],decision:'Continue, adjust or expand based on evidence and capacity.',avoid:'Do not turn article or link counts into individual quotas.', displaySignals:['Search and contribution in practice','Coaching needs and workflow friction','Team readiness and coach capacity'], action:'Continue, adjust or expand based on evidence and capacity.'}
];
export const horizons = [
 {label:'Immediate', time:'Launch + pilot'},
 {label:'Short term', time:'Winter/spring 2027'},
 {label:'Long term', time:'Summer 2027 onward'}
];
export const benefits = [
 {label:'Our customers', outcomes:[
  ['Resolutions in tickets','Share suitable steps in one click.'],
  ['Consistent resolutions','Shared knowledge improves practice and resolution.'],
  ['Self-service portal','Our best knowledge, available for self-service.']
 ], proof:'Students, faculty and staff first receive suitable resolution steps directly in their tickets, shared by an agent in a single click. Reuse and improvement build consistency in both practice and resolution. Later, a community self-service portal makes our best suitable knowledge available directly, subject to content and audience readiness. Sample requester experience and resolution consistency; validate self-service task completion before wider release.'},
 {label:'Our agents', outcomes:[
  ['Start further ahead','Search and suggestions inside Halo tickets.'],
  ['Less repetition','Reuse answers instead of repeating investigations.'],
  ['The bigger picture','Access knowledge across teams and departments.']
 ], proof:'Agents start with search and article suggestions in Halo. Reusing documented resolutions reduces repeated investigation and time spent remembering steps. Access to shared knowledge across teams and departments builds a broader understanding, within audience permissions. Observe relevant reuse and recurring-ticket effort, and review cross-team knowledge access and coaching feedback. '},
 {label:'Our institution', outcomes:[
  ['Knowledge as practice','A shared mechanism to maintain knowledge.'],
  ['Evidence for improvement','Reveal knowledge gaps and unsupported services.'],
  ['Better automation','Knowledge and service links inform orchestration.']
 ], proof:'KCS establishes a working practice and mechanism for maintaining and sharing institutional knowledge. Knowledge gaps, unsupported services and usage patterns provide evidence for service improvement. In the longer term, consistent, consumable institutional knowledge, usage metrics and links between knowledge and services can inform better orchestration and automation. Review knowledge health, service gaps and useful ticket/article links before selecting automation opportunities. '}
];
export const enablement = [
 {label:'Executive announcement', time:'', body:'Align sponsorship and phased adoption.', detail:'Executive announcement: “Knowledge is coming to Halo; a new chapter for ITSM”. Frames the release as a phased knowledge-management capability, explains all-agent reuse versus onboarded pilot authoring, and reinforces leadership support.  Directs readers to the KB project page.'},
 {label:'Pilot manager briefing', time:'Before participant invitations', body:'Protect training and coaching time.', detail:'Manager briefing precedes participant announcements and training. Explains pilot scope, staff responsibilities, protected time, shared ownership and learning rather than article quotas. Directs managers to the Pilot Hub, KCS @ York and project page. '},
 {label:'All-agent announcement', time:'4 November', body:'Explain launch access and authoring boundaries.', detail:'All-agent announcement: “Knowledge is coming to Halo on November 19”. Scheduled for 4 November 2026. Explains suggestions, search, reuse, sharing and linking for all agents, with create/edit permissions for onboarded pilots. Directs agents to the KB project page for rollout information and future waves. '},
 {label:'Pilot invitation', time:'Before training and launch', body:'Set responsibilities; invite training and feedback.', detail:'Pilot invitation: “Halo KB Pilots… start your engines”. Addresses onboarded SSB, OUR, CTS and CS participants. Covers search, reuse, link, improve existing knowledge and capture missing reusable answers. Invites virtual training and live coaching, with feedback shaping the practice. Points to the Pilot Hub, KCS @ York and project page. '}
];
export const rolloutWebsites = [
 {label:'KB project page', path:'/uit/cio/opex/kb/', purpose:'Rollout scope, roadmap and future waves.', detail:'The shared destination for the executive and all-agent announcements. Explains the change and phased rollout. Interested teams use this page to learn about future waves.'},
 {label:'KCS @ York', path:'/uit/cio/opex/kb/kcs', purpose:'Explain the practice behind the tool.', detail:'The methodology resource referenced by the pilot and manager communications. Helps explain search, reuse, capture and improve as part of ticket resolution.'},
 {label:'Pilot Hub', path:'/uit/cio/opex/kb/pilots', purpose:'Equip participants for the pilot.', detail:'The pilot resource destination referenced by the participant and manager communications. Brings pilot guidance and resources together to support training and day-to-day practice.'}
];
export const questions = [
 {label:'Staff capacity', question:'Is this extra work?', answer:'Knowledge work moves into resolution. Leaders protect onboarding, coaching and feedback time; the pilot tests the effort needed.', detail:' Agree capacity with managers and named coaches before launch or adding teams. Review workflow friction and service impact during the pilot.'},
 {label:'Local teams', question:'What changes for local IT?', answer:'Teams reuse shared knowledge while service owners retain accountability for accuracy and audience. Local context belongs in the article.', detail:'Shared ownership means improving knowledge across team boundaries within permissions. It does not transfer service responsibility or imply unrestricted visibility. Include faculty and administrative-unit scenarios in coaching and readiness reviews.'},
 {label:'Authoring rights', question:'Can every agent create articles?', answer:'At launch, authoring is for onboarded pilot participants in SSB, OUR, CTS and CS. Other agents search, reuse, share and link.', detail:'Access and authoring remain distinct. Broader authoring follows supported adoption waves. Confirm the configured Halo access matrix; internal confidence and contributor proficiency do not automatically authorize public publication.'},
 {label:'Existing content', question:'Will everything be migrated?', answer:'The launch plan excludes mass migration. Prioritise knowledge needed in real tickets; review relevance, duplication and audience before reuse.', detail:'The rollout prioritises knowledge needed in real work.  Retain useful source context; do not bulk-copy stale or sensitive material into a new repository.'},
 {label:'Safe sharing', question:'How do we prevent unsafe guidance?', answer:'Check relevance and audience before sharing. Improve within permissions or flag the gap. Community self-service requires a separate readiness review.', detail:'Confirm audience settings and sharing paths in Halo, and make sure unsafe guidance and access issues reach named support. Do not include requester personal data in reusable articles. Service owners resolve accuracy and publication-risk questions.'},
 {label:'Expansion', question:'What opens the next wave?', answer:'A team can follow the workflow, receive timely coaching and use applicable knowledge. Expand when evidence and support capacity allow.', detail:'The roadmap identifies spring 2027 for additional frontline teams. Confirm team scope, onboarding, access and coaching capacity. Summer self-service is a conditional target, not an automatic consequence of the agent launch.'},
 {label:'Value & AI', question:'What benefits can we commit to?', answer:'Commit to learning and measuring. Baseline service outcomes, knowledge quality and adoption before setting targets. Self-service and automation depend on readiness.', detail:' Fewer tickets alone do not prove successful self-service. Avoid article quotas and assess whether knowledge actually helped resolve the issue.'}
];
export const arrowIcon='<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const arrow=`<span aria-hidden="true">${arrowIcon}</span>`;
const heading=(id,kicker,title)=>`<div class="slide-heading"><p class="eyebrow"><span>${String(chapters.findIndex(c=>c.id===id)+1).padStart(2,'0')}</span>${kicker}</p><h1 id="title-${id}">${title}</h1></div>`;
const section=(id,theme,body,classes='')=>`<section class="slide ${classes}" data-theme="${theme}" id="${id}" aria-labelledby="title-${id}"><div class="slide-inner">${body}</div></section>`;
const tabs=(group,items,selected=0)=>`<div class="tabs" role="tablist" aria-label="${group}">${items.map((x,i)=>`<button role="tab" id="${group}-tab-${i}" aria-controls="${group}-panel" aria-selected="${i===selected}" tabindex="${i===selected?0:-1}" data-tab="${group}" data-index="${i}">${x.label}</button>`).join('')}</div>`;
export const concise = {
 problems:[['Individual expertise','Shared knowledge'],['Repeated investigation','Reuse proven answers'],['Outdated answers','Improve during reuse'],['Scattered guidance','Find relevant knowledge']],
 practices:[['Search early','Use knowledge that fits the requester’s context.'],['Review during reuse','Fix it within your permissions, or flag it.'],['Capture reusable learning','Capture issue, context and resolution as you work.'],['Structure for search','Use a simple format and the requester’s language.'],['Improve content health','Use feedback and reuse to find knowledge gaps.'],['Integrate knowledge work','Connect workflow, tools, roles and coaching.'],['Measure useful outcomes','Review outcomes, behaviour and content quality together.'],['Support adoption','Coach, listen and adapt with the team.']],
 stages:[['Open access and start the pilot','Workflow + permissions + coaches','All agents: reuse. Onboarded pilot: author.'],['Refine through real work','Evidence to continue or adjust','Pilot teams + working group'],['Onboard additional teams','Relevant knowledge + coaching capacity','Supported adoption waves'],['Release community self-service','Content + audience + service readiness','Separate publication decision']],

};
const person='<svg class="person-icon" viewBox="0 0 80 90" aria-hidden="true"><circle cx="40" cy="24" r="15"/><path d="M12 80V65c0-18 56-18 56 0v15"/></svg>';
const article='<svg class="article-icon" viewBox="0 0 80 90" aria-hidden="true"><path d="M16 5h33l16 16v63H16zM49 5v18h16M27 40h26M27 52h26M27 64h17"/></svg>';
export function problemPanel(i=0){const [before,after]=concise.problems[i];return `<div class="comparison"><div class="before"><span class="micro">Today</span><div class="comparison-art">${person}<span class="broken-connection" aria-hidden="true"></span>${person}</div><h2>${before}</h2></div><div class="after"><span class="micro">With KCS</span><div class="comparison-art">${article}<span class="solid-connection" aria-hidden="true">→</span>${person}</div><h2>${after}</h2></div></div>`;}
export function practicePanel(i=0){const p=practices[i],[title,body]=concise.practices[i];return `<span class="practice-label">${p.loop} Loop / ${p.label}</span><h2>${title}</h2><p>${body}</p>`;}
export function stagePanel(i=0){const s=stages[i],[title,gate,scope]=concise.stages[i];return `<div class="stage-takeaway"><span class="micro">${s.status}</span><h2>${title}</h2><p>${scope}</p></div><div class="readiness"><span class="gate-mark" aria-hidden="true">${arrowIcon}</span><div><span class="micro">Readiness gate</span><p>${gate}</p></div></div>`;}
export function benefitPanel(i=0){return `<div class="benefit-horizons">${benefits[i].outcomes.map(([title,body],n)=>`<div class="benefit-horizon"><span class="horizon-number" aria-hidden="true">0${n+1}</span><p class="micro">${horizons[n].label}</p><p class="horizon-time">${horizons[n].time}</p><h2>${title}</h2><p class="horizon-description">${body}</p></div>`).join('')}</div>`;}
export function questionPanel(i=0){const q=questions[i];return `<span class="micro">Leadership question / ${String(i+1).padStart(2,'0')}</span><h2>${q.question}</h2><p>${q.answer}</p>`;}
// Independent circles retain their geometry at every viewport size. Arrowheads show
// feedback, while the caption explicitly avoids imposing a fixed practice sequence.
function renderLearningLoop(loop,offset){
 const title=loop==='solve'?'Solve':'Evolve';
 const coordinate=(angle)=>{const radians=angle*Math.PI/180;return [210+175*Math.cos(radians),210+175*Math.sin(radians)].map(n=>n.toFixed(3)).join(' ');};
 const sectors=[-135,-45,45,135].map((angle,i)=>`<path class="loop-highlight" data-loop-highlight="${offset+i}" data-selected="${offset+i===0}" d="M${coordinate(angle-34)}A175 175 0 0 1 ${coordinate(angle+34)}"/>`).join('');
 return `<div class="learning-loop" data-loop="${loop}" data-selected="${offset===0}">
 <svg class="learning-track" viewBox="0 0 420 420" aria-hidden="true">
 <defs><marker id="${loop}-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path class="loop-arrowhead" d="M1 1 7 4 1 7z"/></marker></defs>
 <circle class="loop-orbit" cx="210" cy="210" r="175"/>
 ${sectors}
 <g class="loop-flow" marker-end="url(#${loop}-arrow)"><path d="M194 35h32"/><path d="M385 194v32"/><path d="M226 385h-32"/><path d="M35 226v-32"/></g>
 </svg>
 <div class="learning-title"><strong>${title}</strong><span>${offset===0?'In each interaction':'Across interactions'}</span></div>
 <div class="loop-practices" role="group" aria-label="${title} Loop practices">${practices.slice(offset,offset+4).map((p,i)=>`<button aria-pressed="${offset+i===0}" aria-controls="practice-detail" data-practice="${offset+i}" class="practice-node node-${i}">${p.label}</button>`).join('')}</div>
 </div>`;
}
export function renderSlides(){return [
section('opportunity','ink',`
 <div class="hero-copy"><h1 id="title-opportunity">Knowledge is<br>coming to Halo</h1><p class="hero-date">November 19</p></div>
 ${heroDoubleLoop()}`,'hero-slide'),
section('case-for-change','white',`
 <div class="case-intro">${heading('case-for-change','Why change','Why share knowledge')}<div class="problem-picker" role="tablist" aria-label="problems" aria-orientation="vertical">${problems.map((p,i)=>`<button role="tab" id="problems-tab-${i}" aria-controls="problems-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-tab="problems" data-index="${i}">${p.label}<span aria-hidden="true">${arrowIcon}</span></button>`).join('')}</div></div><div id="problems-panel" role="tabpanel" aria-labelledby="problems-tab-0" tabindex="0">${problemPanel()}</div>`,'case-slide'),
section('method','white',`
 ${heading('method','The KCS method','Solve and Evolve')}
 <div class="double-loop" aria-label="Solve and Evolve are connected learning cycles">
 ${renderLearningLoop('solve',0)}
 <div class="loop-exchange" aria-label="Patterns from the work inform improvements to the system"><span>Patterns</span><svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><path d="M5 22h145m-12-10 12 10-12 10M155 58H10m12-10L10 58l12 10"/></svg><span>Improvements</span></div>
 ${renderLearningLoop('evolve',4)}
 </div>
 <p class="loop-caption">Practices overlap. They are not a fixed sequence.</p>
 <div class="practice-detail" id="practice-detail" role="region" aria-label="Selected KCS practice" aria-live="polite">${practicePanel()}</div>`,'method-slide'),
section('daily-practice','ink',`
 ${heading('daily-practice','Knowledge in ticket work','The agent Solve Loop')}
 <div class="solve-flow" role="region" aria-label="Complete agent Solve Loop flow" tabindex="0">${solveFlow()}</div>
 <p class="solve-flow-caption">Search early. Improve within your permissions. Share with the intended audience.</p>`,'walk-slide static-solve-slide'),
section('launch-scope','white',`
 ${heading('launch-scope','19 November 2026 / planned','Launch access')}
 <div class="launch-split"><div class="launch-everyone"><span class="micro">All Halo agents</span><h2>Search, reuse<br>share and link</h2><p>Search available knowledge.<br>See ticket suggestions.</p></div><div class="launch-authors"><span class="micro">Onboarded pilot participants</span><h2>Create and improve</h2><p class="pilot-roster">SSB / OUR / CTS / CS</p><p>Training + authoring permissions</p></div></div>
 <p class="launch-boundary">Share only with the intended audience. Community self-service comes later.</p>`,'launch-slide'),
section('rollout','white',`
 ${heading('rollout','York’s rollout','Rollout roadmap')}
 <div class="timeline" role="tablist" aria-label="stages">${stages.map((s,i)=>`<button role="tab" id="stages-tab-${i}" aria-controls="stages-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-tab="stages" data-index="${i}"><span class="milestone-dot" aria-hidden="true"></span><span class="stage-index">0${i+1}</span><strong>${s.label}</strong><span class="stage-time">${s.time}</span>${i===0||i===3?`<span class="stage-qualifier">${i===0?'Planned':'Target'}</span>`:''}</button>`).join('')}</div>
 <div id="stages-panel" class="stage-panel" role="tabpanel" aria-labelledby="stages-tab-0" tabindex="0">${stagePanel()}</div>`,'rollout-slide'),
section('enablement','white',`
 ${heading('enablement','Communications & rollout resources','Rollout communications')}
 <div class="rollout-resources"><div class="comms-register"><h2>Launch communications</h2><ul>${enablement.map(e=>`<li><div><h3>${e.label}</h3>${e.time?`<span>${e.time}</span>`:''}</div><p>${e.body}</p></li>`).join('')}</ul></div><div class="website-register"><h2>Supporting websites</h2><ul>${rolloutWebsites.map(w=>`<li><a href="https://www.yorku.ca${w.path}" target="_blank" rel="noopener noreferrer">${w.label} ${arrowIcon}<span>yorku.ca${w.path}</span></a><p>${w.purpose}</p></li>`).join('')}</ul></div></div>
 <p class="comms-path">Messages build awareness → Websites explain and equip → Coaching reinforces practice</p>
 `,'enablement-slide'),
section('operating-model','ink',`
 ${heading('operating-model','Our knowledge program','Coaching and shared ownership')}
 <div class="program-supports">${programSupports.map((support,i)=>`<div class="program-support"><p class="micro"><span aria-hidden="true">0${i+1} / </span>${support.label}</p><h2>${support.title}</h2><ul>${support.points.map(point=>`<li>${point}</li>`).join('')}</ul></div>`).join('')}</div>
 <p class="program-learning">Real work → Coaching → Council → Better practice</p>
 <div class="director-program-ask"><div><h2>Directors: support active participation</h2><p>Protect time for teams to participate actively in our knowledge program and co-create our shared content standard.</p></div><button class="button primary" data-open-discussion aria-haspopup="dialog">Capture team commitments ${arrowIcon}</button></div>
 <p class="program-source">Practice basis: <a href="${sources.guide.url}" target="_blank" rel="noopener noreferrer">KCS Practices Guide</a></p>`,'ownership-slide'),
section('benefits','white',`
 ${heading('benefits','Expected benefits','Who benefits')}
 <div class="entity-tabs">${tabs('benefits',benefits)}</div>
 <div id="benefits-panel" role="tabpanel" aria-labelledby="benefits-tab-0" tabindex="0">${benefitPanel()}</div>
 `,'benefits-slide'),
section('evidence','white',`
 ${heading('evidence','Three aims for our knowledge program','What success looks like')}
 <div class="success-aims">${evidence.map((aim,i)=>`<section class="success-aim" aria-labelledby="aim-${i}"><p class="aim-number" aria-hidden="true">0${i+1}</p><h2 id="aim-${i}">${aim.label}</h2><p class="aim-question">${aim.question}</p><h3>Evidence to review</h3><ul>${aim.displaySignals.map(signal=>`<li>${signal}</li>`).join('')}</ul><div class="aim-action"><h3>What we do with it</h3><p>${aim.action}</p></div></section>`).join('')}</div>
 <p class="success-principle">Baseline first. Measure service value, knowledge health and practice, without article or link quotas.</p>`,'evidence-slide'),
section('leadership-questions','ink',`
 ${heading('leadership-questions','Questions before expansion','Leadership questions')}
 <div class="questions-layout"><div class="question-picker" role="tablist" aria-label="questions" aria-orientation="vertical">${questions.map((q,i)=>`<button role="tab" id="questions-tab-${i}" aria-controls="questions-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-tab="questions" data-index="${i}"><span>${q.label}</span>${arrowIcon}</button>`).join('')}</div><div id="questions-panel" role="tabpanel" aria-labelledby="questions-tab-0" tabindex="0">${questionPanel()}</div></div>`,'questions-slide'),
section('decisions','white',`
 <div class="decision-intro">${heading('decisions','The director ask','Director commitments')}<button id="discussion-button" class="button light" aria-haspopup="dialog">Capture next steps ${arrowIcon}</button></div><div class="commitments">${[['participation','Confirm participation','Pilot teams + coaches'],['capacity','Protect capacity','Time to practise'],['readiness','Expand on evidence','Readiness gates']].map(([key,title,sub],i)=>`<label class="commitment"><input type="checkbox" data-commitment="${key}"><span class="check-visual" aria-hidden="true"></span><span><strong>${title}</strong><span>${sub}</span></span><span class="commitment-index" aria-hidden="true">0${i+1}</span></label>`).join('')}<div class="commitment-progress"><span id="commitment-count" aria-live="polite">0 of 3 marked for discussion</span><div aria-hidden="true"><span id="commitment-fill"></span></div></div></div>`,'decisions-slide')
].join('');}

export function solveFlow(){
 const box=(x,y,w,h,lines,type='')=>`<g class="solve-node ${type}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><text x="${x+w/2}" y="${y+h/2-(lines.length-1)*12}" text-anchor="middle" dominant-baseline="middle">${lines.map((line,i)=>`<tspan x="${x+w/2}" dy="${i?24:0}">${line}</tspan>`).join('')}</text></g>`;
 return `<svg viewBox="0 0 1560 510" role="img" aria-labelledby="solve-flow-title solve-flow-description"><title id="solve-flow-title">Agent Solve Loop ticket flow</title><desc id="solve-flow-description">Review the ticket and search for knowledge. If an article exists, reuse it, check accuracy, and improve or flag gaps. If no article exists, investigate, capture and create. Link useful knowledge to the ticket. If the requester can self-solve, share suitable guidance; otherwise continue agent-led resolution. Confirm the outcome and resolve.</desc><defs><marker id="solve-flow-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 10 5 0 10z"/></marker></defs><g class="solve-connectors" marker-end="url(#solve-flow-arrow)"><path d="M160 180h30"/><path d="M340 180h40"/><path d="M465 150V70h125"/><path d="M465 210v115h125"/><path d="M770 70h40"/><path d="M900 100v50"/><path d="M990 70h135v80"/><path d="M990 180h50"/><path d="M820 325h305V210"/><path d="M1210 180h50"/><path d="M1380 150V100"/><path d="M1380 210v80"/><path d="M1500 70h30v380h-30"/><path d="M1380 350v70"/></g>
 ${box(10,150,150,60,['Review','ticket'],'solve-accent')}
 ${box(190,150,150,60,['Search','knowledge'])}
 ${box(380,150,170,60,['Relevant','article exists?'],'solve-decision')}
 ${box(590,40,180,60,['Reuse','the answer'])}
 ${box(810,40,180,60,['Accurate and','complete?'],'solve-decision')}
 ${box(810,150,180,60,['Improve','or flag'])}
 ${box(590,290,230,70,['Investigate,','capture and create'])}
 ${box(1040,150,170,60,['Link article','to ticket'],'solve-accent')}
 ${box(1260,150,240,60,['Can requester','self-solve?'],'solve-decision')}
 ${box(1260,40,240,60,['Share suitable','guidance'])}
 ${box(1260,290,240,60,['Continue agent-led','resolution'])}
 ${box(1260,420,240,60,['Confirm outcome','and resolve'],'solve-accent')}
 <g class="solve-branch"><text x="490" y="134">Yes</text><text x="490" y="248">No</text><text x="1012" y="56">Yes</text><text x="917" y="133">No</text><text x="1400" y="132">Yes</text><text x="1400" y="253">No</text></g></svg>`;
}

// Curved-arrow geometry adapted from the supplied York KCS double-loop block.
export function heroDoubleLoop(){
 const arc='M 421.1 56.7 A 282 282 0 0 1 416.4 585.0 L 388 622 L 226 575 L 353 469 L 384.3 496.7 A 188 188 0 0 0 387.4 144.5 Z';
 const group=(loop,offset)=>`<div class="hero-loop-practices hero-loop-${loop}"><button class="hero-loop-name" data-hero-loop="${loop}" aria-pressed="false" aria-controls="hero-loop-detail">${loop==='solve'?'Solve':'Evolve'}</button>${practices.slice(offset,offset+4).map((p,i)=>({p,index:offset+i})).sort((a,b)=>loop==='evolve'?b.index-a.index:a.index-b.index).map(({p,index})=>`<button data-hero-practice="${index}" aria-pressed="false" aria-controls="hero-loop-detail">${p.label}</button>`).join('')}</div>`;
 return `<div class="hero-double-loop" aria-label="Interactive KCS Solve and Evolve loops">
 ${group('evolve',4)}<div class="hero-loop-wheel"><svg viewBox="0 0 640 640" aria-hidden="true"><path class="hero-evolve-arc" data-hero-arc="evolve" transform="rotate(180 320 320)" d="${arc}"/><path class="hero-solve-arc" data-hero-arc="solve" d="${arc}"/></svg><div class="hero-loop-centre"><div id="hero-loop-detail" role="region" aria-label="Selected loop or practice" aria-live="polite"><p class="hero-loop-kicker">KCS</p><h2>Solve and Evolve</h2><p>Use knowledge in each ticket. Improve the system through shared learning.</p></div></div></div>${group('solve',0)}<button class="hero-loop-overview" data-hero-overview>Overview</button>
 </div>`;
}
