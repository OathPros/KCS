const graphDocument = "\u003c!doctype html>\n\u003chtml lang=\"en\">\n\u003chead>\n\u003cmeta charset=\"utf-8\">\n\u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n\u003cmeta name=\"theme-color\" content=\"#17141e\">\n\u003ctitle>KCS | Knowledge Value\u003c/title>\n\u003cstyle>\n:root{color-scheme:dark;--bg:#17141e;--panel:#211e29;--edge:#49414f;--muted:#bcb3c0;--ink:#fff9fd;--create:#8bc7ff;--reuse:#66dfaa;--portal:#ffcb7a;--ai:#ff5778;font-family:Arial,Helvetica,sans-serif}\n*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;background:var(--bg);color:var(--ink)}button,input{font:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible{outline:2px solid #fff;outline-offset:3px}\n.graph-only{width:100%;height:100svh;min-height:390px;padding:clamp(11px,2vw,23px);display:flex;flex-direction:column;gap:12px;overflow:hidden;background:radial-gradient(ellipse 90% 75% at 65% 5%,#332438 0%,#17141e 83%)}\n.toolbar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;min-height:41px}\n.legend{display:flex;gap:7px;flex-wrap:wrap;align-items:center}\n.legend button,.ranges button{display:inline-flex;align-items:center;gap:8px;border:1px solid #534957;background:#292530;color:#f9f6fb;padding:9px 11px;border-radius:8px;font-size:clamp(11px,.9vw,13px);font-weight:750;white-space:nowrap;min-height:36px}\n.legend button:hover,.ranges button:hover{background:#3b303d;border-color:#89718a}\n.legend button[aria-pressed=\"false\"]{opacity:.36}.legend button[aria-pressed=\"true\"]{border-color:#675b6d}\n.legend output{font-variant-numeric:tabular-nums;min-width:5ch;text-align:right;font-weight:800}.key{width:21px;min-width:21px;border-top:3px solid;display:inline-block;border-radius:1px}.key.create{border-color:var(--create);border-top-style:dashed}.key.reuse{border-color:var(--reuse)}.key.portal{border-color:var(--portal)}.key.ai{border-color:var(--ai);border-top-style:dotted;border-top-width:4px}\n.ranges{display:flex;gap:5px;align-items:center}.ranges button{min-width:50px;justify-content:center}.ranges button.active{color:white;background:#a3183e;border-color:#e31837}.ranges .range-label{font-size:10px;color:#beb2c1;font-weight:800;text-transform:uppercase;letter-spacing:.12em;margin-right:3px}\n.plot{flex:1;position:relative;min-height:220px;border:1px solid var(--edge);border-radius:13px;overflow:hidden;background:linear-gradient(160deg,#292530,#1e1b25 78%)}\n#chart{width:100%;height:100%;display:block;touch-action:pan-y}\n.gridline{stroke:#5c5462;opacity:.4;stroke-width:1}.axis{stroke:#8d8190;stroke-width:1.4}.tick{fill:#d5cad8;font-size:15px;font-variant-numeric:tabular-nums}.axislabel{fill:#eee5f0;font-size:16px;font-weight:700}.end-label{font-size:14px;font-weight:800;paint-order:stroke;stroke:#211d27;stroke-width:5px;stroke-linejoin:round}.series{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:4.5}.series.create{stroke:var(--create);stroke-dasharray:13 10}.series.reuse{stroke:var(--reuse)}.series.portal{stroke:var(--portal)}.series.ai{stroke:var(--ai);stroke-dasharray:3 8;stroke-width:5.2}\n.marker{cursor:pointer;outline:none}.marker .hit{fill:transparent}.marker .ring{opacity:.13;transition:opacity .15s ease}.marker .core{stroke:#241e2a;stroke-width:3}.marker:hover .ring,.marker:focus-visible .ring,.marker.selected .ring{opacity:.4}.marker:focus-visible .core{stroke:white;stroke-width:4}\n.tool-tip{position:absolute;z-index:8;display:none;width:min(335px,calc(100% - 24px));max-height:calc(100% - 30px);overflow:auto;padding:17px 19px;background:#392535;color:white;border:1px solid #e65a7b;border-radius:11px;box-shadow:0 18px 54px #0008;line-height:1.42}\n.tool-tip.visible{display:block}.tip-head{display:flex;align-items:start;justify-content:space-between;gap:10px}.tip-head h2{font-size:20px;line-height:1.13;margin:0 0 8px;letter-spacing:-.03em}.tool-tip p{margin:0;color:#f2e3ed;font-size:13px}.tool-tip a{display:inline-block;margin-top:12px;color:#ffabbc;font-size:12px;font-weight:750;text-decoration:underline;text-underline-offset:3px}.tip-close{border:0;border-radius:6px;width:26px;height:26px;background:#644252;color:#fff;font-size:20px;line-height:1;flex-shrink:0}\n.scrub{display:flex;align-items:center;gap:12px;min-height:28px;padding:1px 8px}.scrub label{color:#e8dce9;white-space:nowrap;font-size:12px;font-weight:800}.scrub input{flex:1;accent-color:#e31837;min-width:50px;cursor:pointer}.scrub output{min-width:94px;text-align:right;font-size:13px;font-variant-numeric:tabular-nums;color:#fff;font-weight:800}\n .scrub{position:relative;display:block;height:38px;min-height:38px;padding:0}\n.scrub label{position:absolute;left:0;top:10px}\n.scrub input{position:absolute;top:6px;margin:0;min-width:0;height:24px;appearance:none;-webkit-appearance:none;background:transparent}\n.scrub input::-webkit-slider-runnable-track{height:5px;background:#827483;border-radius:3px}\n.scrub input::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:16px;height:16px;border:0;border-radius:50%;background:#e31837;margin-top:-5.5px}\n.scrub input::-moz-range-track{height:5px;background:#827483;border-radius:3px}\n.scrub input::-moz-range-thumb{width:16px;height:16px;border:0;border-radius:50%;background:#e31837}\n.scrub output{position:absolute;right:0;top:10px;min-width:0;font-size:12px}\n@media(max-width:800px){.graph-only{height:auto;min-height:95svh}.plot{flex:none;height:clamp(340px,58svh,660px)}.toolbar{align-items:start}.legend{gap:5px}.legend button,.ranges button{padding:8px 9px;font-size:11px;min-height:34px}.end-label{font-size:16px}.ranges .range-label{margin-left:2px}}\n@media(max-width:520px){.graph-only{padding:9px;gap:8px}.plot{height:57svh;min-height:280px}.legend button{gap:5px}.legend output{font-variant-numeric:tabular-nums;min-width:5ch;text-align:right;font-weight:800}.key{width:16px;min-width:16px}.tick{font-size:17px}.axislabel{font-size:17px}.tool-tip{top:auto!important;left:10px!important;right:10px;width:auto;bottom:10px!important;max-height:58%}.scrub{gap:6px}.scrub output{min-width:83px;font-size:11px}.scrub label{font-size:11px}}\n@media print{.graph-only{height:100vh;min-height:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}.plot{flex:1}.tool-tip,.scrub{display:none!important}}\n@media(prefers-reduced-motion:reduce){*{transition:none!important}}\n\u003c/style>\n\u003c/head>\n\u003cbody>\n\u003cdiv class=\"graph-only\" id=\"graphOnly\">\n  \u003cdiv class=\"toolbar\">\n    \u003cdiv class=\"legend\" aria-label=\"Toggle graph series\">\n      \u003cbutton type=\"button\" data-series=\"create\" aria-pressed=\"true\">\u003cspan class=\"key create\">\u003c/span>Knowledge created \u003coutput data-share=\"create\" aria-label=\"Knowledge created share\">0.0%\u003c/output>\u003c/button>\n      \u003cbutton type=\"button\" data-series=\"reuse\" aria-pressed=\"true\">\u003cspan class=\"key reuse\">\u003c/span>Agent reuse \u003coutput data-share=\"reuse\" aria-label=\"Agent reuse share\">0.0%\u003c/output>\u003c/button>\n      \u003cbutton type=\"button\" data-series=\"portal\" aria-pressed=\"true\">\u003cspan class=\"key portal\">\u003c/span>Portal self-service \u003coutput data-share=\"portal\" aria-label=\"Portal self-service share\">0.0%\u003c/output>\u003c/button>\n      \u003cbutton type=\"button\" data-series=\"ai\" aria-pressed=\"true\">\u003cspan class=\"key ai\">\u003c/span>AI self-service \u003coutput data-share=\"ai\" aria-label=\"AI self-service share\">0.0%\u003c/output>\u003c/button>\n    \u003c/div>\n    \u003cdiv class=\"ranges\" aria-label=\"Choose month range\">\n      \u003cspan class=\"range-label\">Months\u003c/span>\n      \u003cbutton type=\"button\" data-range=\"6\" aria-pressed=\"true\" class=\"active\">6\u003c/button>\n      \u003cbutton type=\"button\" data-range=\"12\" aria-pressed=\"false\">12\u003c/button>\n      \u003cbutton type=\"button\" data-range=\"24\" aria-pressed=\"false\">24\u003c/button>\n    \u003c/div>\n  \u003c/div>\n  \u003cdiv class=\"plot\" id=\"plot\">\n    \u003csvg id=\"chart\" viewBox=\"0 0 1000 540\" role=\"group\" aria-label=\"Interactive graph showing monthly shares of interactions for knowledge creation, agent reuse, portal self-service and AI-powered self-service over up to 24 months. Click circular milestones to learn more.\">\n      \u003cg id=\"grid\">\u003c/g>\n      \u003cg id=\"lines\">\u003c/g>\n      \u003cg id=\"cursor\">\u003c/g>\n      \u003cg id=\"milestones\">\u003c/g>\n      \u003cg id=\"ends\">\u003c/g>\n      \u003ctext x=\"494\" y=\"521\" text-anchor=\"middle\" class=\"axislabel\">Months\u003c/text>\n      \u003ctext transform=\"translate(19 247) rotate(-90)\" text-anchor=\"middle\" class=\"axislabel\">Interactions (%)\u003c/text>\n    \u003c/svg>\n    \u003cdiv class=\"tool-tip\" id=\"tip\" role=\"dialog\" aria-labelledby=\"tipTitle\">\n      \u003cdiv class=\"tip-head\">\u003ch2 id=\"tipTitle\">\u003c/h2>\u003cbutton type=\"button\" class=\"tip-close\" id=\"tipClose\" aria-label=\"Close explanation\">\u00d7\u003c/button>\u003c/div>\n      \u003cp id=\"tipBody\">\u003c/p>\n      \u003ca id=\"tipLink\" target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://library.serviceinnovation.org/KCS/KCS_v6/KCS_v6_Practices_Guide/030\">KCS guidance &#8599;\u003c/a>\n    \u003c/div>\n  \u003c/div>\n  \u003cdiv class=\"scrub\">\n    \u003clabel for=\"month\">Month\u003c/label>\n    \u003cinput id=\"month\" type=\"range\" min=\"0\" max=\"6\" step=\"0.1\" value=\"0\" aria-label=\"Explore the graph by month\">\n    \u003coutput id=\"monthReadout\" for=\"month\">0 / 6\u003c/output>\n  \u003c/div>\n\u003c/div>\n\u003cscript>\n(()=>{'use strict';\nconst DATA={\ncreate:[200,500,900,1700,2500,3300,3900,4200,4300,4100,3900,3600,3200,2800,2400,2100,1900,1750,1650,1550,1450,1350,1250,1150],\nreuse:[10,40,120,350,900,1600,2400,3300,4100,4700,5200,5600,5900,6200,6500,6800,7100,7300,7500,7700,7900,8000,8100,8200],\nportal:[0,0,0,0,0,0,0,100,250,500,900,1400,2000,2600,3200,3800,4300,4800,5300,5800,6300,6800,7600,9000],\nai:[0,0,0,0,0,0,0,0,0,50,100,180,350,700,1200,2000,3200,4800,7000,9500,12200,14500,16500,18500]};\n// Normalize against all four series, regardless of visibility.\nfor(let month=0;month\u003c24;month++){\n const total=Object.values(DATA).reduce((sum,series)=>sum+series[month],0);\n for(const series of Object.values(DATA))series[month]=total?series[month]/total*100:0;\n}\nconst META={create:{name:'Create',color:'#8bc7ff',start:1},reuse:{name:'Reuse',color:'#66dfaa',start:1},portal:{name:'Portal self-service',color:'#ffcb7a',start:8},ai:{name:'AI self-service',color:'#ff5778',start:10}};\nconst URL='https://library.serviceinnovation.org/KCS/KCS_v6/KCS_v6_Practices_Guide/030';\nconst SPOTS=[\n {id:'capture',x:6,series:'create',title:'Capture knowledge while solving',body:'Knowledge creation builds the foundation. Capture the answers that come from real issues as part of the Solve Loop.'},\n {id:'peak',x:9,series:'create',title:'Creation\u2019s share declines',body:'As existing answers do more of the work, creation accounts for a smaller share of interactions.'},\n {id:'portal',x:8,series:'portal',title:'Portal self-service begins',body:'At month 8, knowledge begins reaching people through the portal. Adoption grows as content becomes easier to find and use.'},\n {id:'reuse',x:12,series:'reuse',title:'Reuse builds momentum',body:'Teams work from what is already known instead of rediscovering solutions. Reusing and improving knowledge reinforces the cycle.'},\n {id:'ai',x:10,series:'ai',title:'AI self-service goes live',body:'AI-powered self-service begins at month 10 and accelerates as more reliable knowledge becomes available.'},\n {id:'scale',x:20,series:'ai',title:'AI gains interaction share',body:'AI-powered self-service accounts for a growing share of interactions. Creation remains the input supporting reuse and self-service.'},\n {id:'end',x:24,series:'ai',title:'The payoff: more value, less creation',body:'By month 24, AI-powered self-service has the largest share of interactions. Creation is the smallest line but underpins reuse, portal self-service and AI delivery.'}\n];\nconst NS='http://www.w3.org/2000/svg';\nconst $=s=>document.querySelector(s);const grid=$('#grid'),lines=$('#lines'),cursor=$('#cursor'),milestones=$('#milestones'),ends=$('#ends'),svg=$('#chart'),tip=$('#tip'),plot=$('#plot'),slider=$('#month');\nconst bounds={x0:78,x1:840,y0:461,y1:32};let range=6,yMax=100,active=null,pinned=false;\nconst visible={create:true,reuse:true,portal:true,ai:true};\nconst xScale=m=>bounds.x0+m/range*(bounds.x1-bounds.x0);\nconst yScale=v=>bounds.y0-v/yMax*(bounds.y0-bounds.y1);\nfunction val(series,m){const a=DATA[series];if(m\u003c=1)return a[0]*(3*Math.max(0,m)**2-2*Math.max(0,m)**3);const low=Math.floor(m),high=Math.ceil(m);return low===high?a[low-1]:a[low-1]+(a[high-1]-a[low-1])*(m-low)}\nfunction el(name,attrs,parent){const e=document.createElementNS(NS,name);Object.entries(attrs||{}).forEach(([k,v])=>e.setAttribute(k,String(v)));parent?.append(e);return e}\nfunction smooth(arr,start){const pts=arr.map((y,i)=>({x:xScale(start+i),y:yScale(y)}));if(!pts.length)return '';let d=`M${pts[0].x},${pts[0].y}`;for(let i=0;i\u003cpts.length-1;i++){const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];const c1x=p1.x+(p2.x-p0.x)/6,c1y=i===0&&start===1?p1.y:p1.y+(p2.y-p0.y)/6,c2x=p2.x-(p3.x-p1.x)/6,c2y=p2.y-(p3.y-p1.y)/6;d+=` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`}return d}\nfunction axis(){grid.replaceChildren();const step=20;yMax=100;for(let y=0;y\u003c=yMax;y+=step){el('line',{class:'gridline',x1:bounds.x0,x2:bounds.x1,y1:yScale(y),y2:yScale(y)},grid);const t=el('text',{class:'tick',x:67,y:yScale(y)+5,'text-anchor':'end'},grid);t.textContent=y+'%'}let interval=range===24?3:range===12?2:1;for(let m=0;m\u003c=range;m+=interval){const x=xScale(m);el('line',{class:'axis',x1:x,x2:x,y1:bounds.y0,y2:bounds.y0+7},grid);const t=el('text',{class:'tick',x,y:bounds.y0+27,'text-anchor':'middle'},grid);t.textContent=m}if(range%interval){const x=xScale(range);const t=el('text',{class:'tick',x,y:bounds.y0+27,'text-anchor':'middle'},grid);t.textContent=range}el('line',{class:'axis',x1:bounds.x0,x2:bounds.x0,y1:bounds.y1,y2:bounds.y0},grid);el('line',{class:'axis',x1:bounds.x0,x2:bounds.x1,y1:bounds.y0,y2:bounds.y0},grid)}\nfunction layout(){\n const rect=svg.getBoundingClientRect();if(!rect.width||!rect.height)return;\n const width=Math.max(360,540*rect.width/rect.height);bounds.x1=width-90;\n svg.setAttribute('viewBox',`0 0 ${width} 540`);\n svg.querySelector('.axislabel').setAttribute('x',(bounds.x0+bounds.x1)/2);\n const matrix=svg.getScreenCTM(),scrub=$('.scrub').getBoundingClientRect();\n if(matrix){const left=bounds.x0*matrix.a+matrix.e-scrub.left,right=bounds.x1*matrix.a+matrix.e-scrub.left;\n slider.style.left=(left-8)+'px';slider.style.width=(right-left+16)+'px';}\n}\nfunction draw(){layout();closeTip();axis();lines.replaceChildren();milestones.replaceChildren();ends.replaceChildren();for(const [k,m] of Object.entries(META)){if(!visible[k]||range\u003cm.start)continue;const a=DATA[k].slice(m.start-1,range);let d=smooth(a,m.start);if(k==='create'||k==='reuse')d=`M${xScale(0)},${yScale(0)} C${xScale(1/3)},${yScale(0)} ${xScale(2/3)},${yScale(a[0])} ${xScale(1)},${yScale(a[0])}`+d.slice(d.indexOf(\" C\"));el('path',{class:'series '+k,d},lines)}\n // Direct end labels keep the 24-month outcome immediately legible.\n const labels=Object.keys(META).filter(k=>visible[k]&&range>=META[k].start&&val(k,range)>0).map(k=>({k,y:yScale(val(k,range)),actual:yScale(val(k,range))})).sort((a,b)=>a.y-b.y);\n for(let i=1;i\u003clabels.length;i++)if(labels[i].y-labels[i-1].y\u003c20)labels[i].y=labels[i-1].y+20;\n for(const a of labels){if(Math.abs(a.y-a.actual)>2)el('line',{x1:bounds.x1,y1:a.actual,x2:bounds.x1+12,y2:a.y,stroke:META[a.k].color,'stroke-width':1.8},ends);const t=el('text',{class:'end-label',x:bounds.x1+14,y:a.y+5,fill:META[a.k].color},ends);t.textContent=val(a.k,range).toFixed(1)+'%'}\n for(const s of SPOTS){if(s.x>range||!visible[s.series])continue;const g=el('g',{class:'marker',role:'button',tabindex:'0','aria-label':s.title,'data-id':s.id,transform:`translate(${xScale(s.x)} ${yScale(val(s.series,s.x))})`},milestones);el('circle',{class:'ring',r:17,fill:META[s.series].color},g);el('circle',{class:'core',r:5.3,fill:META[s.series].color},g);el('circle',{class:'hit',r:19},g);g.addEventListener('click',e=>{e.stopPropagation();showTip(s,g,true)});g.addEventListener('mouseenter',()=>{if(!pinned)showTip(s,g,false)});g.addEventListener('mouseleave',()=>{if(!pinned)closeTip()});g.addEventListener('focus',()=>{if(!pinned)showTip(s,g,false)});g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showTip(s,g,true)}})}\n updateCursor()}\nfunction updateCursor(){cursor.replaceChildren();const m=Math.min(range,Math.max(0,Number(slider.value)));const x=xScale(m);el('line',{x1:x,x2:x,y1:bounds.y1,y2:bounds.y0,stroke:'#f5c7d4','stroke-width':1.4,'stroke-dasharray':'5 8',opacity:.6},cursor);for(const [k,meta] of Object.entries(META)){$('[data-share=\"'+k+'\"]').textContent=val(k,m).toFixed(1)+'%';if(!visible[k]||(m\u003cmeta.start&&k!=='create'&&k!=='reuse'))continue;el('circle',{cx:x,cy:yScale(val(k,m)),r:5.7,fill:meta.color,stroke:'#241e2a','stroke-width':2.3},cursor)}$('#monthReadout').textContent=(Number.isInteger(m)?m:m.toFixed(1))+' / '+range}\nfunction showTip(s,g,pin){active=s.id;pinned=!!pin;milestones.querySelectorAll('.marker').forEach(e=>e.classList.toggle('selected',e.dataset.id===s.id));$('#tipTitle').textContent=s.title;$('#tipBody').textContent=s.body;$('#tipLink').href=URL;tip.classList.add('visible');const cr=plot.getBoundingClientRect(),br=g.getBoundingClientRect();const leftGuess=br.right-cr.left+15;const width=tip.offsetWidth;let left=leftGuess+width>cr.width-12?br.left-cr.left-width-15:leftGuess;left=Math.min(cr.width-width-10,Math.max(10,left));let top=br.top-cr.top-20;top=Math.min(cr.height-tip.offsetHeight-10,Math.max(10,top));tip.style.left=left+'px';tip.style.top=top+'px'}\nfunction closeTip(){active=null;pinned=false;tip.classList.remove('visible');milestones.querySelectorAll('.marker').forEach(e=>e.classList.remove('selected'))}\nfunction setRange(n,month=n){range=n;slider.max=String(range);slider.value=String(month);document.querySelectorAll('[data-range]').forEach(b=>{const selected=Number(b.dataset.range)===range;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected))});draw()}\ndocument.querySelectorAll('[data-series]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.series;visible[k]=!visible[k];b.setAttribute('aria-pressed',String(visible[k]));draw()}));document.querySelectorAll('[data-range]').forEach(b=>b.addEventListener('click',()=>setRange(Number(b.dataset.range))));slider.addEventListener('input',updateCursor);slider.addEventListener('change',()=>{if(Number(slider.value)>=range&&range\u003c24)setRange(range===6?12:24,range)});$('#tipClose').addEventListener('click',closeTip);plot.addEventListener('click',e=>{if(!e.target.closest('.marker,#tip'))closeTip()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeTip()});new ResizeObserver(()=>{if(svg.clientWidth&&svg.clientHeight)draw()}).observe(svg);draw();\n})();\n\u003c/script>\n\u003c/body>\n\u003c/html>\n";
export const chapters = [
  {
    "id": "opportunity",
    "label": "The opportunity",
    "short": "Opportunity"
  },
  {
    "id": "case-for-change",
    "label": "The case for change",
    "short": "Why change"
  },
  {
    "id": "daily-practice",
    "label": "Agent Solve Loop",
    "short": "Agent walkthrough"
  },
  {
    "id": "launch-scope",
    "label": "What changes at launch",
    "short": "Launch scope"
  },
  {
    "id": "rollout",
    "label": "The rollout",
    "short": "Rollout"
  },
  {
    "id": "enablement",
    "label": "Communications and rollout resources",
    "short": "Enablement"
  },
  {
    "id": "pilot-hypercare",
    "label": "Pilot hypercare",
    "short": "Pilot support"
  },
  {"id":"knowledge-value","label":"Expected knowledge effort to value over time","short":"Interactive graph"},
  {
    "id": "operating-model",
    "label": "Committing to future success",
    "short": "Ownership"
  },
  {
    "id": "program-evidence",
    "label": "Why these supports matter",
    "short": "Practice evidence"
  },
  {
    "id": "participation",
    "label": "Celebrate knowledge work",
    "short": "Participation"
  },
  {
    "id": "benefits",
    "label": "Benefits by entity and horizon",
    "short": "Benefits"
  },
  {
    "id": "evidence",
    "label": "How we judge progress",
    "short": "Evidence"
  },
  {
    "id": "leadership-questions",
    "label": "Questions for discussion",
    "short": "Questions"
  }
];
export const problems = [
  {
    "label": "Knowledge leaves"
  },
  {
    "label": "Work repeats"
  },
  {
    "label": "Answers drift"
  },
  {
    "label": "Knowledge scatters"
  }
];
export const practices = [
  {
    "id": "reuse",
    "loop": "Solve",
    "label": "Reuse"
  },
  {
    "id": "improve",
    "loop": "Solve",
    "label": "Improve"
  },
  {
    "id": "capture",
    "loop": "Solve",
    "label": "Capture"
  },
  {
    "id": "structure",
    "loop": "Solve",
    "label": "Structure"
  },
  {
    "id": "content",
    "loop": "Evolve",
    "label": "Content health"
  },
  {
    "id": "process",
    "loop": "Evolve",
    "label": "Process integration"
  },
  {
    "id": "insight",
    "loop": "Evolve",
    "label": "Performance insight"
  },
  {
    "id": "change",
    "loop": "Evolve",
    "label": "Change management"
  }
];
export const stages = [
  {
    "label": "Launch",
    "time": "19 Nov 2026",
    "status": "Launch + pilot",
    "preparationComplete": true
  },
  {
    "label": "Pilot",
    "time": "Winter 2027",
    "status": "Refine the practice"
  },
  {
    "label": "Expand",
    "time": "Spring 2027",
    "status": "Readiness-based"
  },
  {
    "label": "Self-service",
    "time": "Summer 2027",
    "status": "Big win"
  }
];
export const programSupports = [
  {
    "label": "Coaching",
    "points": [
      "Coach with real tickets",
      "Develop judgement and proficiency",
      "Reinforce search, reuse and improvement"
    ]
  },
  {
    "label": "Council",
    "points": [
      "Bring frontline evidence together",
      "Co-create our shared content standard",
      "Remove cross-team workflow barriers"
    ]
  }
];
export const participation = [
  {
    "behaviour": "Search and reuse",
    "practice": "Build on relevant knowledge before creating more.",
    "recognition": "Highlight an answer that helped resolve a request."
  },
  {
    "behaviour": "Improve and capture",
    "practice": "Fix gaps and keep reusable learning from tickets.",
    "recognition": "Thank the people who made an answer clearer or more useful."
  },
  {
    "behaviour": "Coach and collaborate",
    "practice": "Help others learn and share expertise across teams.",
    "recognition": "Celebrate coaching and teamwork in our team updates."
  },
  {
    "behaviour": "Co-create our standard",
    "practice": "Bring examples, test guidance and suggest improvements.",
    "recognition": "Show teams how their feedback changed our shared standard."
  }
];
export const evidence = [
  {
    "label": "Better support",
    "question": "Does knowledge help resolve the issue?",
    "displaySignals": [
      "Known-issue resolutions",
      "Relevant reuse",
      "Requester experience"
    ],
    "action": "Improve answers and workflows that do not help."
  },
  {
    "label": "Healthy knowledge",
    "question": "Can people find and trust the answer?",
    "displaySignals": [
      "Failed searches and feedback",
      "Relevance, duplication and gaps",
      "Audience and service accuracy"
    ],
    "action": "Prioritise knowledge people need and use."
  },
  {
    "label": "Sustainable adoption",
    "question": "Is the practice becoming part of the work?",
    "displaySignals": [
      "Search and contribution in practice",
      "Coaching needs and workflow friction",
      "Team readiness and coach capacity"
    ],
    "action": "Continue, adjust or expand based on evidence and capacity."
  }
];
export const horizons = [
  {
    "label": "Immediate",
    "time": "Launch + pilot"
  },
  {
    "label": "Short term",
    "time": "Winter/spring 2027"
  },
  {
    "label": "Long term",
    "time": "Summer 2027 onward"
  }
];
export const benefits = [
  {
    "label": "Our customers",
    "outcomes": [
      [
        "Resolutions in tickets",
        "Share suitable steps in one click."
      ],
      [
        "Consistent resolutions",
        "Shared knowledge improves practice and resolution."
      ],
      [
        "Self-service portal",
        "Our best knowledge, available for self-service."
      ]
    ]
  },
  {
    "label": "Our agents",
    "outcomes": [
      [
        "Start further ahead",
        "Search and suggestions inside Halo tickets."
      ],
      [
        "Less repetition",
        "Reuse answers instead of repeating investigations."
      ],
      [
        "The bigger picture",
        "Access knowledge across teams and departments."
      ]
    ]
  },
  {
    "label": "York",
    "outcomes": [
      [
        "Knowledge as practice",
        "A shared mechanism to maintain knowledge."
      ],
      [
        "Evidence for improvement",
        "Reveal knowledge gaps and unsupported services."
      ],
      [
        "Better automation",
        "Knowledge and service links inform orchestration."
      ]
    ]
  }
];
export const enablement = [
  {
    "label": "Pilot manager briefing",
    "time": "Before participant invitations",
    "body": "Protect training and coaching time."
  },
  {
    "label": "All-agent announcement",
    "time": "4 November",
    "body": "Explain launch access and authoring boundaries."
  },
  {
    "label": "Pilot invitation",
    "time": "Before training and launch",
    "body": "Set responsibilities; invite training and feedback."
  }
];
export const rolloutWebsites = [
  {
    "label": "KB project page",
    "path": "/uit/cio/opex/kb/",
    "purpose": "Announce the change & the tool"
  },
  {
    "label": "KCS @ York",
    "path": "/uit/cio/opex/kb/kcs",
    "purpose": "Explain the methodology"
  },
  {
    "label": "Pilot Hub",
    "path": "/uit/cio/opex/kb/pilots",
    "purpose": "Prepare our pilots"
  }
];
export const programEvidence = [
  {
    "label": "Coaching",
    "fact": "KCS links contribution rights to demonstrated proficiency, supported by coaching.",
    "application": "Practise with real tickets and feedback before expanding authoring.",
    "source": "Roles and proficiency · 6.4",
    "url": "https://library.serviceinnovation.org/KCS/Knowledge-Centered_Success_Practices_Guide/301-Evolve_Loop/Practice_6_Process_Integration/Technique_6.4"
  },
  {
    "label": "Shared standard",
    "fact": "KCS combines structured knowledge with collective ownership and review during reuse.",
    "application": "Agree a usable article structure, then improve it through real work.",
    "source": "KCS principles and core concepts",
    "url": "https://library.serviceinnovation.org/KCS/Principles_and_Core_Concepts"
  },
  {
    "label": "Knowledge Council",
    "fact": "KCS evaluates outcomes, observed practice and content quality together.",
    "application": "Our council can use that evidence to fix shared gaps and workflow barriers.",
    "source": "Measure the right things · 7.1",
    "url": "https://library.serviceinnovation.org/KCS/Knowledge-Centered_Success_Practices_Guide/301-Evolve_Loop/Practice_7_Performance_Insight/Technique_7.1"
  }
];
export const questions = [
  {
    "label": "Staff capacity",
    "question": "Is this extra work?",
    "answer": "We’ll need time to learn and practise during the pilot. Our aim is to reduce repeat investigation while building and maintaining shared service knowledge.",
    "reportedOutcome": "The University of Copenhagen reported about a 70% reduction in average resolution time over three years."
  },
  {
    "label": "Local teams",
    "question": "Do local teams lose ownership?",
    "answer": "Sharing articles does not replace our local service responsibilities. We need to capture what varies by service, audience or environment so others can judge whether an answer applies. We’ll use the pilot to work through cross-team ownership and review arrangements."
  },
  {
    "label": "Authoring access",
    "question": "Why limit authoring at launch?",
    "answer": "Authoring starts with onboarded participants in SSB, OUR, CTS and CS so we can test the workflow with coaching. All agents can search, reuse, share and link. Broader authoring depends on onboarding, readiness and the support capacity to sustain it."
  },
  {
    "label": "Existing content",
    "question": "What happens to existing documentation?",
    "answer": "We’re not moving everything into Halo. We’ll prioritise answers needed in live tickets and review relevance, accuracy and duplication before bringing them in. Existing material still needs an owner and a maintenance plan; a new location alone will not make it current."
  },
  {
    "label": "Accuracy and sharing",
    "question": "How do we keep guidance accurate and safe?",
    "answer": "An article can be outdated or wrong. We still need to check context and audience before sharing, and correct or flag problems. Service owners need to resolve disputed guidance. Community self-service requires a separate review of content, access and service readiness."
  },
  {
    "label": "Expansion",
    "question": "What would delay expansion?",
    "answer": "If teams cannot find useful knowledge, get timely coaching or fit the practice into ticket work, we should adjust before adding more teams. Spring is a planning horizon, not a commitment to onboard everyone. We’ll review readiness and capacity with the teams involved."
  },
  {
    "label": "Benefits and AI",
    "question": "Are we promising savings or an AI solution?",
    "answer": "We do not have measured York savings yet. We expect less repeat investigation, more consistent answers and better retention of service knowledge. We’ll compare those outcomes with the effort needed to sustain the practice. AI and automation are later possibilities, not launch commitments."
  }
];
export const arrowIcon='<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const arrow=`<span aria-hidden="true">${arrowIcon}</span>`;
const heading=(id,kicker,title)=>`<div class="slide-heading"><p class="eyebrow"><span>${String(chapters.findIndex(c=>c.id===id)+1).padStart(2,'0')}</span>${kicker}</p><h1 id="title-${id}">${title}</h1></div>`;
const section=(id,theme,body,classes='')=>`<section class="slide ${classes}" data-theme="${theme}" id="${id}" aria-labelledby="title-${id}"><div class="slide-inner">${body}</div></section>`;
const tabs=(group,items,selected=0)=>`<div class="tabs" role="tablist" aria-label="${group}">${items.map((x,i)=>`<button role="tab" id="${group}-tab-${i}" aria-controls="${group}-panel" aria-selected="${i===selected}" tabindex="${i===selected?0:-1}" data-tab="${group}" data-index="${i}">${x.label}</button>`).join('')}</div>`;
export const concise = {
 problems:[['Individual expertise','Shared knowledge'],['Repeated investigation','Reuse proven answers'],['Outdated answers','Improve during reuse'],['Scattered guidance','Find relevant knowledge']],
 stages:[['Launch KB module &amp; begin the pilot','Workflow + draft standard + pilot onboarding information + live training',['All agents: reuse knowledge','Onboarded pilot agents: create and update knowledge']],['Refine through real work','Evidence to continue or adjust','Pilot teams + working group'],['Onboard additional teams','Relevant knowledge + coaching capacity','Supported adoption waves'],['Release community self-service','Content + audience + service readiness','Our community can search and follow our approved and maintained knowledge.']],

};
const person='<svg class="person-icon" viewBox="0 0 80 90" aria-hidden="true"><circle cx="40" cy="24" r="15"/><path d="M12 80V65c0-18 56-18 56 0v15"/></svg>';
const article='<svg class="article-icon" viewBox="0 0 80 90" aria-hidden="true"><path d="M16 5h33l16 16v63H16zM49 5v18h16M27 40h26M27 52h26M27 64h17"/></svg>';
export function problemPanel(i=0){const [before,after]=concise.problems[i];return `<div class="comparison"><div class="before"><span class="micro">Today</span><div class="comparison-art">${person}<span class="broken-connection" aria-hidden="true"></span>${person}</div><h2>${before}</h2></div><div class="after"><span class="micro">With KCS</span><div class="comparison-art">${article}<span class="solid-connection" aria-hidden="true">→</span>${person}</div><h2>${after}</h2></div></div>`;}
export function stagePanel(i=0){
 const s=stages[i],[title,gate,scope]=concise.stages[i];
 const complete=s.preparationComplete===true;
 const mark=complete?'<svg class="readiness-check" viewBox="0 0 32 32" aria-hidden="true"><path d="m5 16 7 7L27 8"/></svg>':arrowIcon;
 const audience=Array.isArray(scope)?`<p class="stage-audiences">${scope.map(line=>`<span>${line}</span>`).join('')}</p>`:`<p>${scope}</p>`;
 return `<div class="stage-takeaway"><span class="micro">${s.status}</span><h2>${title}</h2>${audience}</div><div class="readiness" data-state="${complete?'complete':'pending'}"><span class="gate-mark" aria-hidden="true">${mark}</span><div><span class="micro">${complete?'Launch preparation complete':'Readiness gate'}</span><p>${gate}</p></div></div>`;
}
export function benefitPanel(i=0){return `<div class="benefit-horizons">${benefits[i].outcomes.map(([title,body],n)=>`<div class="benefit-horizon${n===i?' is-selected':''}"><span class="horizon-number" aria-hidden="true">0${n+1}</span><p class="micro">${horizons[n].label}</p><p class="horizon-time">${horizons[n].time}</p><h2>${title}</h2><p class="horizon-description">${body}</p></div>`).join('')}</div>`;}
export function questionPanel(i=0){const q=questions[i];return `<span class="micro">Leadership question / ${String(i+1).padStart(2,'0')}</span><h2>${q.question}</h2><p>${q.answer}</p>${q.reportedOutcome?`<p class="question-outcome">${q.reportedOutcome}</p>`:''}`;}
export function renderSlides(){return [
section('opportunity','ink',`
 <div class="hero-copy"><h1 id="title-opportunity">Knowledge is<br>coming to Halo</h1><p class="hero-date">November 19</p></div>
 ${heroDoubleLoop()}`,'hero-slide'),
section('case-for-change','white',`
 <div class="case-intro">${heading('case-for-change','Our purpose','Why share knowledge')}<p class="purpose-statement">Make service knowledge available in ticket work so our community gets consistent help, agents avoid repeat investigation and York retains what its teams learn.</p><div class="problem-picker" role="tablist" aria-label="problems" aria-orientation="vertical">${problems.map((p,i)=>`<button role="tab" id="problems-tab-${i}" aria-controls="problems-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-tab="problems" data-index="${i}">${p.label}<span aria-hidden="true">${arrowIcon}</span></button>`).join('')}</div></div><div id="problems-panel" role="tabpanel" aria-labelledby="problems-tab-0" tabindex="0">${problemPanel()}</div>`,'case-slide'),
section('daily-practice','ink',`
 ${heading('daily-practice','Knowledge in ticket work','The agent Solve Loop')}
 <div class="solve-flow" role="region" aria-label="Complete agent Solve Loop flow" tabindex="0">${solveFlow()}</div>
 `,'walk-slide static-solve-slide'),
section('launch-scope','white',`
 ${heading('launch-scope','19 November 2026','Launch access')}
 <div class="launch-split"><div class="launch-everyone"><span class="micro">All Halo agents</span><h2>Search, reuse<br>share and link</h2><p>Search available knowledge.<br>See ticket suggestions.</p></div><div class="launch-authors"><span class="micro">Onboarded pilot participants</span><h2>Create and improve</h2><p class="pilot-roster">SSB / OUR / CTS / CS</p><p>Training + authoring permissions</p></div></div>
 `,'launch-slide'),
section('rollout','white',`
 ${heading('rollout','York’s rollout','Rollout roadmap')}
 <div class="timeline" role="tablist" aria-label="stages">${stages.map((s,i)=>`<button role="tab" id="stages-tab-${i}" aria-controls="stages-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-tab="stages" data-index="${i}"><span class="milestone-dot" aria-hidden="true"></span><span class="stage-index">0${i+1}</span><strong>${s.label}</strong><span class="stage-time">${s.time}</span></button>`).join('')}</div>
 <div id="stages-panel" class="stage-panel" role="tabpanel" aria-labelledby="stages-tab-0" tabindex="0">${stagePanel()}</div>`,'rollout-slide'),
section('enablement','white',`
 ${heading('enablement','Communications & rollout resources','Rollout communications')}
 <div class="rollout-resources"><div class="comms-register"><h2>Launch communications</h2><ul>${enablement.map(e=>`<li><div><h3>${e.label}</h3>${e.time?`<span>${e.time}</span>`:''}</div><p>${e.body}</p></li>`).join('')}</ul></div><div class="website-register"><h2>Supporting websites</h2><ul>${rolloutWebsites.map(w=>`<li><a href="https://www.yorku.ca${w.path}" target="_blank" rel="noopener noreferrer">${w.label} ${arrowIcon}<span>yorku.ca${w.path}</span></a><p>${w.purpose}</p></li>`).join('')}</ul></div></div>

 `,'enablement-slide'),
section('pilot-hypercare','white',`
 ${heading('pilot-hypercare','Practical support for pilot testing','Pilot hypercare')}
 <p class="pilot-lead">Led by staff trained in KCS v6 Fundamentals and Practitioner practices</p>
 <dl class="pilot-support-routes">
  <div><dt>Live &amp; asynchronous KCS training for pilot participants</dt><dd>Live sessions and self-paced training covering the Halo workflow and KCS practice.</dd></div>
  <div><dt>Coaching during real work</dt><dd>In-person and virtual drop-in coaching for individual agents and teams. Work through actual tickets to understand the practice, build the habit, identify which tickets need knowledge, and learn techniques for creating it efficiently and consistently.</dd></div>
  <div><dt>Weekly open drop-ins</dt><dd>Weekly virtual stand-ups for anyone with questions or feedback. Participation will help identify candidates to become coaches or join the KCS Council.</dd></div>
  <div><dt>Urgent questions and help</dt><dd>Our pilot lead will create and monitor the <strong>Knowledge Workers @ York</strong> Teams chat for urgent questions and requests for help.</dd></div>
 </dl>
`,'hypercare-slide'),
section('knowledge-value','ink',`
 ${heading('knowledge-value','Interactive illustration','Expected knowledge effort to value over time')}
 <iframe class="knowledge-graph" title="Interactive knowledge value graph" srcdoc="${graphDocument.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')}"></iframe>
`,'knowledge-graph-slide'),
section('operating-model','ink',`
 ${heading('operating-model','Our knowledge program','Committing to future success')}
 <div class="program-supports">${programSupports.map((support,i)=>`<div class="program-support"><h2>${support.label}</h2><ul>${support.points.map(point=>`<li>${point}</li>`).join('')}</ul></div>`).join('')}</div>

 <div class="program-participation-ask"><div><h2>Support active participation</h2><p>Let’s protect time for our teams to participate in our knowledge program and co-create our shared content standard</p></div></div>
`,'ownership-slide'),
section('program-evidence','white',`
 ${heading('program-evidence','KCS practice evidence','Why these supports matter')}
 <div class="investment-columns">${programEvidence.map((item,i)=>`<section class="investment-pillar" aria-labelledby="investment-${i}"><h2 id="investment-${i}">${item.label}</h2><p class="investment-fact">${item.fact}</p><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.source} ${arrowIcon}</a></section>`).join('')}</div>
 <div class="investment-applications"><h2>What this means for us</h2><div class="investment-columns">${programEvidence.map(item=>`<p>${item.application}</p>`).join('')}</div></div>
`,'investment-slide'),
section('participation','white',`
 ${heading('participation','Behaviours and recognition','Celebrate knowledge work')}
 <table class="recognition-table"><thead><tr><th scope="col">Behaviours we want</th><th scope="col">How we recognise them</th></tr></thead><tbody>${participation.map(item=>`<tr><td><strong>${item.behaviour}</strong><p>${item.practice}</p></td><td><span class="recognition-mobile-label">Recognise it</span><p>${item.recognition}</p></td></tr>`).join('')}</tbody></table>
 <div class="recognition-call"><h2>Let’s recognise and celebrate these behaviours</h2><p>In team meetings and one-to-ones, name the contribution, explain its impact and thank the people involved. Recognise useful work without article quotas or leaderboards.</p></div>
`,'participation-slide'),
section('benefits','white',`
 ${heading('benefits','Expected benefits','Who benefits')}
 <div class="entity-tabs">${tabs('benefits',benefits)}</div>
 <div id="benefits-panel" role="tabpanel" aria-labelledby="benefits-tab-0" tabindex="0">${benefitPanel()}</div>
 `,'benefits-slide'),
section('evidence','white',`
 ${heading('evidence','Three aims for our knowledge program','What success looks like')}
 <div class="success-aims">${evidence.map((aim,i)=>`<section class="success-aim" aria-labelledby="aim-${i}"><p class="aim-number" aria-hidden="true">0${i+1}</p><h2 id="aim-${i}">${aim.label}</h2><p class="aim-question">${aim.question}</p><h3>Evidence to review</h3><ul>${aim.displaySignals.map(signal=>`<li>${signal}</li>`).join('')}</ul><div class="aim-action"><h3>What we do with it</h3><p>${aim.action}</p></div></section>`).join('')}</div>
`,'evidence-slide'),
section('leadership-questions','ink',`
 ${heading('leadership-questions','Questions before expansion','Questions for discussion')}
 <div class="questions-layout"><div class="question-picker" role="tablist" aria-label="questions" aria-orientation="vertical">${questions.map((q,i)=>`<button role="tab" id="questions-tab-${i}" aria-controls="questions-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-tab="questions" data-index="${i}"><span>${q.label}</span>${arrowIcon}</button>`).join('')}</div><div id="questions-panel" role="tabpanel" aria-labelledby="questions-tab-0" tabindex="0">${questionPanel()}</div></div>`,'questions-slide')
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
