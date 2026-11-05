const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const files=['learning-lab.js','planning-lab-v3.js','reference-explorer-v4.js','guided-study-v5.js','mastery-lab-v6.js','usability-v7.js'];
const html=fs.readFileSync('index.html','utf8');
for(const f of files){const code=fs.readFileSync(f,'utf8');new vm.Script(code,{filename:f});assert.ok(html.includes('<script src="'+f+'" defer></script>'),'Missing script: '+f);}
assert.ok(html.includes('id="app"'),'Main app container missing');
assert.ok(html.includes('id="nav"'),'Navigation container missing');
for(const f of ['Planning_Manual.pdf','Planning_Manual_Part_II.pdf','Planning_Primer.pdf']){assert.ok(fs.existsSync(f),'Missing source document: '+f);}
const all=files.map(f=>fs.readFileSync(f,'utf8')).join('\n');
for(const section of ['guided','mastery','reference','diagram','compare','deep','atlas'])assert.ok(all.includes("['"+section+"'"),'Missing navigation: '+section);
console.log('PASS: '+files.length+' scripts parse, are linked, navigation exists, source PDFs exist.');
