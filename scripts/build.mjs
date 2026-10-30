import { mkdir, rm, cp, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chapters, renderSlides, arrowIcon } from '../src/content.js';
await rm('dist', {recursive: true, force: true});
await mkdir('dist/fonts', {recursive: true});
for (const file of ['styles.css','app.js','content.js','favicon.svg']) await cp(`src/${file}`, `dist/${file}`);
await cp('node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2', 'dist/fonts/dm-sans-latin-wght-normal.woff2');
await cp('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2', 'dist/fonts/instrument-serif-latin-400-italic.woff2');
await cp('node_modules/@fontsource-variable/dm-sans/LICENSE', 'dist/fonts/DM-Sans-LICENSE.txt');
await cp('node_modules/@fontsource/instrument-serif/LICENSE', 'dist/fonts/Instrument-Serif-LICENSE.txt');
const progress = chapters.map((c,i)=>`<button aria-label="Section ${i+1}: ${c.label}" data-goto="${i}" ${i===0?'aria-current="step"':''}><span></span></button>`).join('');
const overview = chapters.map((c,i)=>`<button data-goto="${i}"><span>${String(i+1).padStart(2,'0')}</span><strong>${c.label}</strong><span aria-hidden="true">↗</span></button>`).join('');
let html = await readFile('src/index.html','utf8');
html = html.replace('{{SLIDES}}',renderSlides()).replace('{{PROGRESS}}',progress).replace('{{OVERVIEW}}',overview).replace('{{TOTAL}}',String(chapters.length).padStart(2,'0'));
html=html.replaceAll('↗',arrowIcon).replaceAll('↙',arrowIcon.replace('arrow-icon','arrow-icon icon-down-left')).replaceAll('↖',arrowIcon.replace('arrow-icon','arrow-icon icon-up-left')).replaceAll('↵',arrowIcon.replace('arrow-icon','arrow-icon icon-down-left'));
// Version the module graph and stylesheet so a new deck cannot load stale presentation assets.
const appSource=await readFile('src/app.js','utf8');
const contentSource=await readFile('src/content.js','utf8');
const styleSource=await readFile('src/styles.css','utf8');
const version=createHash('sha256').update(appSource).update(contentSource).update(styleSource).digest('hex').slice(0,12);
await writeFile(`dist/content.${version}.js`,contentSource);
await writeFile(`dist/app.${version}.js`,appSource.replace("from './content.js'",`from './content.${version}.js'`));
await writeFile(`dist/styles.${version}.css`,styleSource);
html=html.replace('./styles.css',`./styles.${version}.css`).replace('./app.js',`./app.${version}.js`);
await writeFile('dist/index.html',html);
await writeFile('dist/.nojekyll','');
console.log('Built dependency-free static site in dist/');

await import('./build-walkthrough.mjs');
