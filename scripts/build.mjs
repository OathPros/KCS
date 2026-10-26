import { mkdir, rm, cp, readFile, writeFile } from 'node:fs/promises';
import { chapters, renderSlides, arrowIcon, problems, practices, stages, roles, evidence } from '../src/content.js';
await rm('dist', {recursive: true, force: true});
await mkdir('dist/fonts', {recursive: true});
for (const file of ['styles.css','app.js','content.js','favicon.svg']) await cp(`src/${file}`, `dist/${file}`);
await cp('node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2', 'dist/fonts/dm-sans-latin-wght-normal.woff2');
await cp('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2', 'dist/fonts/instrument-serif-latin-400-italic.woff2');
await cp('node_modules/@fontsource-variable/dm-sans/LICENSE', 'dist/fonts/DM-Sans-LICENSE.txt');
await cp('node_modules/@fontsource/instrument-serif/LICENSE', 'dist/fonts/Instrument-Serif-LICENSE.txt');
const progress = chapters.map((c,i)=>`<button aria-label="Section ${i+1}: ${c.label}" data-goto="${i}" ${i===0?'aria-current="step"':''}><span></span></button>`).join('');
const overview = chapters.map((c,i)=>`<button data-goto="${i}"><span>0${i+1}</span><strong>${c.label}</strong><span aria-hidden="true">↗</span></button>`).join('');
const supplement = `<h1>Complete interactive detail</h1><p>All alternative states, for reading and printing.</p><h2>The case for change</h2>${problems.map(p=>`<h3>${p.label}</h3><p>Today: ${p.before}</p><p>With KCS: ${p.after}</p>`).join('')}<h2>The KCS practices</h2>${practices.map(p=>`<h3>${p.loop}: ${p.label}</h3><p>${p.verb} ${p.body}</p>`).join('')}<h2>All rollout gates</h2>${stages.map(s=>`<h3>${s.label}: ${s.time} (${s.status})</h3><p>${s.title} ${s.desc}</p><p>Readiness gate: ${s.gate} ${s.note}</p>`).join('')}<h2>Role contributions</h2>${roles.map(r=>`<h3>${r.label}</h3><p>${r.body}</p>`).join('')}<h2>Evidence</h2>${evidence.map(e=>`<h3>${e.label}</h3><p>${e.question} ${e.decision}</p><p>${e.signals.join('; ')}. ${e.avoid}</p>`).join('')}<h2>Agent walkthrough: every path</h2><ol><li>Review the ticket. Use a meaningful subject with issue and context.</li><li>Search early: does relevant knowledge exist?</li><li>If yes, follow the relevant article. If it needs updating, improve within permissions or flag the gap. If no, investigate and capture reusable learning as the resolution becomes known.</li><li>Link the relevant knowledge to the ticket to record its contribution honestly.</li><li>If the article enables requester self-solve, share it only when audience access and suitability permit. Otherwise resolve the issue with the requester.</li><li>Follow the relevant service best practice, confirm the result and resolve the ticket. Learn from gaps. Do not force activity counts.</li></ol><h2>Presenter notes</h2>${chapters.map(c=>`<h3>${c.label}</h3><p>${c.notes}</p>`).join('')}`;
let html = await readFile('src/index.html','utf8');
html = html.replace('{{SLIDES}}',renderSlides()).replace('{{PROGRESS}}',progress).replace('{{OVERVIEW}}',overview).replace('{{SUPPLEMENT}}',supplement);
// Give each statically rendered section a stable, accessible heading.
for (const c of chapters) {
 if(c.id==='opportunity') continue;
 const start=html.indexOf(`<section class="slide" id="${c.id}"`);
 const heading=html.indexOf('<h1>',start);
 html=html.slice(0,heading)+html.slice(heading).replace('<h1>',`<h1 id="title-${c.id}">`);
}
html=html.replaceAll('↗',arrowIcon);
await writeFile('dist/index.html',html);
await writeFile('dist/.nojekyll','');
console.log('Built dependency-free static site in dist/');
