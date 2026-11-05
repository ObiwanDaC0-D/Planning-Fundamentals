/* Planning Fundamentals 7.0: consolidated navigation and usability layer.
   Preserves existing learning modules and saved progress. */
(()=>{
'use strict';
const groups=[
{label:'Start',ids:['home','guided','mastery']},
{label:'Explore',ids:['process','diagram','deep','compare']},
{label:'Reference',ids:['reference','atlas','library','glossary']},
{label:'Practice & help',ids:['practice','sources']}
];
const style=document.createElement('style');style.textContent=`
.pf7-navgroup{margin:15px 0 0}.pf7-navlabel{padding:9px 13px 4px;color:var(--accent);font-size:.69rem;letter-spacing:.14em;font-weight:800;text-transform:uppercase}.pf7-navgroup button{width:100%;display:block}.pf7-navgroup button:focus-visible,.pf7-action:focus-visible{outline:2px solid var(--accent);outline-offset:2px}.pf7-top{display:flex;align-items:center;gap:10px;justify-content:space-between;margin-bottom:22px;flex-wrap:wrap}.pf7-top small{color:var(--muted)}.pf7-action{padding:9px 13px;background:var(--panel);border:1px solid var(--line);border-radius:9px;color:var(--text)}.pf7-homegrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:14px;margin:24px 0}.pf7-homecard{display:flex;flex-direction:column;align-items:start;gap:9px;text-align:left;padding:22px;border-radius:14px;background:var(--panel);border:1px solid var(--line);color:var(--text);min-height:165px}.pf7-homecard:hover{border-color:var(--accent)}.pf7-homecard strong{font-size:1.13rem}.pf7-homecard span{color:var(--muted);font-size:.89rem}.pf7-tip{margin-top:25px}.pf7-mobilemenu{display:none}@media(max-width:760px){.pf7-mobilemenu{display:inline-block}.side{height:auto;max-height:none;position:relative;padding:16px;border-right:0;border-bottom:1px solid var(--line)}.layout{display:block;min-height:100vh}.nav{display:none;max-height:65vh;overflow:auto;margin-top:10px}.nav.pf7-open{display:block}main{padding:24px 18px}.pf7-top{margin-bottom:14px}}`;document.head.appendChild(style);
const originalDrawNav=drawNav;
drawNav=function(){
const known=new Set(groups.flatMap(g=>g.ids));
const extras=nav.filter(([id])=>!known.has(id));
const all=groups.concat(extras.length?[{label:'Other',ids:extras.map(x=>x[0])}]:[]);
navEl.innerHTML=all.map(g=>'<section class="pf7-navgroup"><div class="pf7-navlabel">'+escapeHtml(g.label)+'</div>'+g.ids.map(id=>{const item=nav.find(n=>n[0]===id);if(!item)return '';return '<button type="button" data-nav="'+id+'" class="'+(page===id?'active':'')+'" '+(page===id?'aria-current="page"':'')+'>'+escapeHtml(item[1])+'</button>';}).join('')+'</section>').join('');
navEl.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{navEl.classList.remove('pf7-open');const toggle=document.getElementById('pf7toggle');if(toggle)toggle.setAttribute('aria-expanded','false');navigate(b.dataset.nav);});
};
const brand=document.querySelector('.brand');if(brand&&!document.getElementById('pf7toggle')){const toggle=document.createElement('button');toggle.id='pf7toggle';toggle.className='pf7-action pf7-mobilemenu';toggle.textContent='Menu';toggle.setAttribute('aria-controls','nav');toggle.setAttribute('aria-expanded','false');brand.insertAdjacentElement('afterend',toggle);toggle.onclick=()=>{const open=navEl.classList.toggle('pf7-open');toggle.setAttribute('aria-expanded',String(open));};}
const oldRender=render;
render=function(){
if(page!=='home'){oldRender();return;}
drawNav();
let guided=0,mastery=0;try{guided=Object.values(JSON.parse(localStorage.getItem('pf5-completed')||'{}')).filter(Boolean).length}catch{}
try{mastery=Object.values(JSON.parse(localStorage.getItem('pf6-state')||'{}')).filter(x=>x&&x.answered).length}catch{}
const cards=[
['guided','Guided Study','Follow the six-step planning process with applied lessons.',''+guided+'/6 checks completed'],
['mastery','Mastery Lab','Practice judgment using realistic hypothetical cases.',''+mastery+'/5 cases attempted'],
['reference','Reference Explorer','Find source chapters, sections, and personal notes.','51 indexed entries'],
['diagram','Process Explorer','Explore the six steps and their connections.','Interactive'],
['compare','Alternatives Lab','Experiment with tradeoffs and sensitivity.','Illustrative model'],
['deep','Learning Lab','Read focused lessons and test your reasoning.','Source-linked']
];
app.innerHTML=header('Planning Fundamentals','A simpler place to learn, practice, and reference.','Explore the planning process through guided instruction, interactive exercises, and historical IWR source materials.')+
'<div class="pf7-top"><small>Your learning dashboard</small><button class="pf7-action" id="pf7resume">Continue guided study</button></div>'+
'<div class="pf7-homegrid">'+cards.map(c=>'<button class="pf7-homecard" data-destination="'+c[0]+'"><strong>'+escapeHtml(c[1])+'</strong><span>'+escapeHtml(c[2])+'</span><small class="tag">'+escapeHtml(c[3])+'</small></button>').join('')+'</div>'+
'<div class="callout pf7-tip"><strong>About the sources:</strong> The 1996 Planning Manual, 1997 Planning Primer, and 2017 Risk-Informed Planning manual are historical educational references. They do not replace current USACE regulations, guidance, or approvals.</div>';
app.querySelectorAll('[data-destination]').forEach(b=>b.onclick=()=>navigate(b.dataset.destination));
document.getElementById('pf7resume').onclick=()=>navigate('guided');
};
render();
})();
