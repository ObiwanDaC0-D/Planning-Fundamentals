/* Planning Fundamentals 4.0 — chapter-level source navigator and study tools.
   Historical source indexes use printed page numbers, not PDF page offsets. */
(()=>{
'use strict';
const records=[
[0,'Fundamentals',2,'Six-step planning process, iterative practice, teamwork, and public participation','Foundations'],
[0,'Problems and Opportunities',6,'Identify problems, objectives, opportunities, and constraints','Scoping'],
[0,'Inventory and Forecasting',8,'Historic, existing, and future conditions; information sufficiency','Forecasting'],
[0,'Formulating Alternative Plans',10,'Management measures, alternative plans, and formulation','Formulation'],
[0,'Evaluating Alternative Plans',12,'Plan effects and evaluation considerations','Evaluation'],
[0,'Comparing Alternative Plans',14,'Benefit-cost, cost-effectiveness, and trade-off analysis','Comparison'],
[0,'Selecting a Plan',16,'No action, NED plan, and selection decisions','Selection'],
[1,'Planning Defined',7,'Planning as rational choice and structured problem solving','Foundations'],
[1,'History of Water Resource Planning',31,'Evolution of federal water resources planning','Foundations'],
[1,'Planning Guidance',54,'Historical guidance and planning requirements','Foundations'],
[1,'Characteristics of the Corps Planning Process',62,'Core planning characteristics and practice','Foundations'],
[1,'Identifying Problems and Opportunities',78,'Planning problems, opportunities, objectives, and constraints','Scoping'],
[1,'Inventorying and Forecasting Resources',108,'Resource inventory and future-condition forecasting','Forecasting'],
[1,'Formulating Alternative Plans',130,'Developing measures and alternatives','Formulation'],
[1,'Evaluating Alternative Plans',157,'Assessing consequences of alternatives','Evaluation'],
[1,'Comparing Alternative Plans',181,'Comparative analysis of alternative plans','Comparison'],
[1,'Selecting Recommended Plan',194,'Selecting and justifying a recommended plan','Selection'],
[1,'Practical Considerations',203,'Planning practice and implementation realities','Practice'],
[1,'Public Involvement and Teamwork',215,'Public participation and interdisciplinary collaboration','Stakeholders'],
[1,'Telling Your Story',238,'Explaining and documenting the planning decision','Communication'],
[2,'Planning',5,'Planning modernization, SMART planning tools, and risk-informed planning','Foundations'],
[2,'Planning Team',15,'Vertical team, project delivery team, charter, roles, and meetings','Teamwork'],
[2,'Introduction to Risk',31,'Risk identification, management, assessment, and communication','Risk'],
[2,'Uncertainty',41,'Knowledge uncertainty, natural variability, and planning uncertainty','Uncertainty'],
[2,'Task One — Scoping',51,'Problems, opportunities, risk identification, objectives, and criteria','Scoping'],
[2,'Ongoing Process — Gather Evidence',75,'Data, scenarios, uncertainty analysis, and decision evidence','Evidence'],
[2,'Task Two — Plan Formulation',101,'Measures, formulation strategies, and reformulation','Formulation'],
[2,'Task Three — Deciding',119,'Verification, evaluation, and plan comparison','Comparison'],
[2,'Task Four — Implementation',143,'Residual risk, TSP, and recommended plan','Implementation'],
[2,'Tell Your Story',157,'Communicating decisions, uncertainty, and documentation','Communication'],
[2,'Ongoing Process — Stakeholder Involvement',175,'Stakeholder identification, engagement, and risk communication','Stakeholders']
];
const sections=[
[2,'Planning modernization and SMART tools',7,'Decision Management Plan and Risk Register','Evidence'],
[2,'Vertical team alignment',18,'Alignment and project delivery team roles','Teamwork'],
[2,'Acceptable and tolerable risk',33,'Risk acceptance and tolerance concepts','Risk'],
[2,'Knowledge uncertainty',46,'Uncertainty from incomplete knowledge','Uncertainty'],
[2,'Natural variability',47,'Variability in natural systems','Uncertainty'],
[2,'Objectives and constraints',59,'Scoping objectives, constraints, and decision criteria','Scoping'],
[2,'Decision criteria',61,'Criteria used to inform decisions','Scoping'],
[2,'Problem identification techniques',66,'Ishikawa diagrams, brainstorming, mind maps, and related methods','Scoping'],
[2,'Scenarios',82,'Existing, without-plan, with-plan, and other scenarios','Forecasting'],
[2,'Uncertainty analysis',92,'Examining uncertainty in planning analyses','Uncertainty'],
[2,'Formulation strategies',109,'Methods for generating and combining measures','Formulation'],
[2,'Formulating for uncertainty',116,'Accounting for uncertainty in alternatives','Uncertainty'],
[2,'Plan verification',124,'Verifying plans in the decision process','Evaluation'],
[2,'Evaluation',125,'Estimating and evaluating plan effects','Evaluation'],
[2,'Comparing plans',132,'Alternative comparison in risk-informed planning','Comparison'],
[2,'Tentatively Selected Plan',148,'TSP development and decision context','Selection'],
[2,'TSP risk assessment',155,'Risk assessment of the tentatively selected plan','Risk'],
[2,'Explain uncertainty',168,'Clear communication of uncertainty','Communication'],
[2,'Identify stakeholders',179,'Stakeholder identification and prioritization','Stakeholders'],
[2,'Communicating uncertainty',186,'Communication approaches for uncertain information','Communication']
];
const entries=records.concat(sections).map((r,i)=>({id:i,manual:r[0],title:r[1],page:r[2],description:r[3],category:r[4],kind:i<records.length?'Chapter':'Section'}));
let query='',category='All',selected=null,onlyBookmarks=false;
let bookmarks;try{bookmarks=new Set(JSON.parse(localStorage.getItem('pf4-bookmarks')||'[]'));}catch{bookmarks=new Set();}
const style=document.createElement('style');style.textContent=`
.pf4-toolbar{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0}.pf4-toolbar input,.pf4-toolbar select{background:var(--panel);color:var(--text);border:1px solid var(--line);border-radius:10px;padding:12px;min-width:160px;flex:1}.pf4-entry{display:flex;justify-content:space-between;gap:14px;align-items:start;border:1px solid var(--line);border-radius:14px;background:var(--panel);padding:17px;margin:10px 0}.pf4-entry h3{margin:0}.pf4-entry p{color:var(--muted);margin:6px 0}.pf4-entry small{color:var(--accent)}.pf4-actions{display:flex;gap:7px;flex-wrap:wrap}.pf4-star{background:var(--panel2);border:1px solid var(--line);border-radius:9px;padding:8px 11px;color:var(--text)}.pf4-detail{max-width:850px}.pf4-detail details{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:15px;margin:12px 0}.pf4-detail summary{cursor:pointer;font-weight:700}.pf4-subtle{color:var(--muted);font-size:.87rem}.pf4-empty{padding:22px;border:1px dashed var(--line);border-radius:12px}.pf4-select{max-width:210px}@media(max-width:600px){.pf4-entry{display:block}.pf4-actions{margin-top:12px}}`;document.head.appendChild(style);
nav.push(['reference','Reference Explorer']);
const prior=render;
render=function(){if(page!=='reference'){prior();return;}drawNav();drawReference();};
function source(e){return manuals[e.manual];}
function pdf(e){return encodeURI(source(e).file);}
function save(){try{localStorage.setItem('pf4-bookmarks',JSON.stringify([...bookmarks]));}catch{}}
function drawReference(){
if(selected!==null){drawDetail(entries[selected]);return;}
app.innerHTML=header('Search the original manuals','Reference Explorer','Find chapters and key sections across all three uploaded publications. Search titles, subjects, and chapter descriptions; this is a curated index, not full-text PDF search.')+
'<div class="pf4-toolbar"><input id="pf4search" aria-label="Search reference index" placeholder="Search risk, formulation, stakeholders…" value="'+escapeHtml(query)+'"><select id="pf4category" aria-label="Filter by topic">'+['All',...new Set(entries.map(x=>x.category))].map(c=>'<option value="'+escapeHtml(c)+'" '+(category===c?'selected':'')+'>'+escapeHtml(c)+'</option>').join('')+'</select><button id="pf4book" class="btn secondary" aria-pressed="'+onlyBookmarks+'">'+(onlyBookmarks?'Show all':'Bookmarks only')+'</button></div><div id="pf4results" aria-live="polite"></div><div class="callout"><strong>Source note:</strong> Printed page numbers are used. They may not match PDF viewer page numbers because of front matter. The documents date to 1996, 1997, and 2017; confirm current policy independently.</div>';
document.getElementById('pf4search').oninput=e=>{query=e.target.value;drawResults();};
document.getElementById('pf4category').onchange=e=>{category=e.target.value;drawResults();};
document.getElementById('pf4book').onclick=()=>{onlyBookmarks=!onlyBookmarks;drawReference();};
drawResults();
}
function drawResults(){
const q=query.trim().toLowerCase();
const matching=entries.filter(e=>(category==='All'||e.category===category)&&(!onlyBookmarks||bookmarks.has(e.id))&&(!q||[e.title,e.description,e.category,source(e).title,e.kind].join(' ').toLowerCase().includes(q)));
document.getElementById('pf4results').innerHTML='<p class="pf4-subtle">'+matching.length+' matching references · '+entries.length+' indexed chapters and sections</p>'+(matching.length?matching.map(e=>'<article class="pf4-entry"><div><small>'+escapeHtml(e.category)+' · '+e.kind+' · '+source(e).year+'</small><h3>'+escapeHtml(e.title)+'</h3><p>'+escapeHtml(e.description)+'</p><p class="pf4-subtle">'+escapeHtml(source(e).title)+' · printed p. '+e.page+'</p></div><div class="pf4-actions"><button class="btn secondary" data-open="'+e.id+'">Explore</button><button class="pf4-star" data-bookmark="'+e.id+'" aria-label="'+(bookmarks.has(e.id)?'Remove bookmark':'Bookmark')+'" aria-pressed="'+bookmarks.has(e.id)+'">'+(bookmarks.has(e.id)?'★':'☆')+'</button></div></article>').join(''):'<div class="pf4-empty">No matching entries. Try a broader topic or clear the filters.</div>');
app.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.open);drawReference();window.scrollTo(0,0);});
app.querySelectorAll('[data-bookmark]').forEach(b=>b.onclick=()=>{const id=Number(b.dataset.bookmark);bookmarks.has(id)?bookmarks.delete(id):bookmarks.add(id);save();drawResults();});
}
function drawDetail(e){
const m=source(e),related=entries.filter(x=>x.id!==e.id&&(x.category===e.category||x.title.toLowerCase().includes(e.title.toLowerCase()))).slice(0,6);
app.innerHTML='<button class="crumb" id="pf4back">← Reference Explorer</button><div class="pf4-detail">'+header(e.category,escapeHtml(e.title),escapeHtml(e.description))+
'<div class="callout"><strong>Original source:</strong> '+escapeHtml(m.title)+' ('+m.year+'), printed page '+e.page+'.<p><a href="'+pdf(e)+'" target="_blank" rel="noopener">Open source PDF</a></p></div>'+
'<h2>Study this topic</h2><p>Use the source section to identify the author’s terminology, examples, methods, and assumptions. The description above is an index summary, not a replacement for the original chapter.</p>'+
'<details open><summary>Active reading questions</summary><ol><li>What planning decision or problem does this material address?</li><li>What inputs, assumptions, or uncertainties does it identify?</li><li>How does it connect to another step of the planning process?</li><li>Which ideas are durable planning principles, and which may require current policy verification?</li></ol></details>'+
'<details><summary>Personal study notes (stored on this device)</summary><textarea id="pf4notes" rows="6" style="width:100%;background:var(--panel2);color:var(--text);border:1px solid var(--line);border-radius:10px;padding:12px" placeholder="Write your understanding and questions…"></textarea><div class="pf4-toolbar"><button class="btn" id="pf4save">Save notes</button><button class="btn secondary" id="pf4export">Copy notes</button></div><p class="pf4-subtle" id="pf4status" aria-live="polite"></p></details>'+
'<h2>Related references</h2>'+(related.length?related.map(x=>'<button class="step" data-related="'+x.id+'"><span><strong>'+escapeHtml(x.title)+'</strong><small>'+escapeHtml(source(x).title)+' · p. '+x.page+'</small></span></button>').join(''):'<p class="muted">No additional indexed references in this category.</p>')+
'<div class="callout"><strong>Historical guidance:</strong> These manuals explain the practice of planning; they should not be treated as a substitute for current controlling regulations, statutes, or policy memoranda.</div></div>';
document.getElementById('pf4back').onclick=()=>{selected=null;drawReference();};
app.querySelectorAll('[data-related]').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.related);drawReference();window.scrollTo(0,0);});
const area=document.getElementById('pf4notes'),key='pf4-note-'+e.id;try{area.value=localStorage.getItem(key)||'';}catch{}
document.getElementById('pf4save').onclick=()=>{try{localStorage.setItem(key,area.value);document.getElementById('pf4status').textContent='Notes saved in this browser.';}catch{document.getElementById('pf4status').textContent='Browser storage is unavailable.';}};
document.getElementById('pf4export').onclick=async()=>{const content=e.title+'\n'+m.title+' · printed p. '+e.page+'\n\n'+area.value;try{await navigator.clipboard.writeText(content);document.getElementById('pf4status').textContent='Notes copied.';}catch{area.focus();area.select();document.getElementById('pf4status').textContent='Select and copy the notes manually.';}};
}
render();
})();
