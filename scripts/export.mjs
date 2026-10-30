import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// Export the built presentation as one portable file with no external assets.
// Source links remain links; no uploaded reference documents are redistributed.
const output = process.argv[2] || 'artifacts/KCS-leadership-briefing.html';
let html = await readFile('dist/index.html', 'utf8');
let css = await readFile('dist/styles.css', 'utf8');
const font = await readFile('dist/fonts/dm-sans-latin-wght-normal.woff2');
css = css.replace("url('./fonts/dm-sans-latin-wght-normal.woff2')", `url('data:font/woff2;base64,${font.toString('base64')}')`);
const content = (await readFile('dist/content.js', 'utf8')).replace(/^export /gm, '');
const app = (await readFile('dist/app.js', 'utf8')).replace(/^import .*from '\.\/content\.js';\n/, '');
const favicon = await readFile('dist/favicon.svg', 'utf8');
const fontLicense = await readFile('dist/fonts/DM-Sans-LICENSE.txt', 'utf8');
html = html
 .replace('</head>', () => `<!-- Embedded DM Sans font license\n${fontLicense.replaceAll('-->', '-- >')}\n-->\n</head>`)
 .replace(/<link rel="preload"[^>]+>\n/, '')
 .replace(/<link rel="stylesheet"[^>]+>/, () => `<style>${css}</style>`)
 .replace(/<script type="module"[^>]+><\/script>/, () => `<script type="module">${content}\n${app}</script>`)
 .replace('href="./favicon.svg"', `href="data:image/svg+xml,${encodeURIComponent(favicon)}"`);
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, html);
await writeFile(path.join(path.dirname(output), 'DM-Sans-LICENSE.txt'), await readFile('dist/fonts/DM-Sans-LICENSE.txt'));
console.log(`Exported standalone briefing: ${output}`);
