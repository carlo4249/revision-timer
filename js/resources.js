// js/resources.js -- Solus resources page

let resourcesBuilt = false;
const TT_DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const TT_SESSIONS = ['Session 1','Session 2','Session 3'];
let userTimetable = null;

function onAdminChange() { renderResources(); }
function onDataCleared() { renderExamList(); }

function renderResources() {
  renderExamList();
  buildPublicResources();
  const resAdmin = el('res-admin-view');
  if (resAdmin) resAdmin.style.display = isAdmin ? 'block' : 'none';
  if (!isAdmin) return;
  if (!resourcesBuilt) { renderNotionQuickLinks(); renderHowToRevise(); renderResSchedule(); resourcesBuilt = true; }
}

function buildPublicResources() {
  const pubWrap = el('res-public-view');
  if (!pubWrap || pubWrap._built) return;
  pubWrap._built = true;
  pubWrap.innerHTML = `
    <div class="lbl">Free revision sites</div>
    <div class="site-cat-lbl" style="margin-top:0">Practice and papers</div>
    <div class="site-grid">
      <a class="site-card" href="https://www.physicsandmathstutor.com/" target="_blank"><div class="site-name">Physics and Maths Tutor</div><div class="site-desc">Past papers and mark schemes for all subjects</div><div class="site-tag">All subjects</div></a>
      <a class="site-card" href="https://www.savemyexams.com/" target="_blank"><div class="site-name">Save My Exams</div><div class="site-desc">Topic questions and model answers</div></a>
      <a class="site-card" href="https://corbettmaths.com/5-a-day/" target="_blank"><div class="site-name">Corbett 5-a-day</div><div class="site-desc">Daily maths practice by grade</div><div class="site-tag">Daily habit</div></a>
      <a class="site-card" href="https://www.mathsgenie.co.uk/" target="_blank"><div class="site-name">Maths Genie</div><div class="site-desc">Graded topic questions with answers</div></a>
    </div>
    <div class="site-cat-lbl">Learn and understand</div>
    <div class="site-grid">
      <a class="site-card" href="https://app.senecalearning.com/dashboard" target="_blank"><div class="site-name">Seneca</div><div class="site-desc">Adaptive learning for all GCSE subjects</div><div class="site-tag">Free</div></a>
      <a class="site-card" href="https://www.bbc.co.uk/bitesize/levels/z98jmp3" target="_blank"><div class="site-name">BBC Bitesize GCSE</div><div class="site-desc">Topic summaries, quizzes, and videos</div><div class="site-tag">Free</div></a>
      <a class="site-card" href="https://www.cognitoresources.org/" target="_blank"><div class="site-name">Cognito</div><div class="site-desc">Short science video explanations</div></a>
      <a class="site-card" href="https://members.gcsepod.com/pupils/dashboard" target="_blank"><div class="site-name">GCSE Pod</div><div class="site-desc">Bite-size video podcasts per topic</div></a>
    </div>
    <div class="site-cat-lbl">Flashcards and recall</div>
    <div class="site-grid">
      <a class="site-card" href="https://quizlet.com/gb" target="_blank"><div class="site-name">Quizlet</div><div class="site-desc">Pre-made flashcard sets for every topic</div></a>
      <a class="site-card" href="https://www.anki.app/decks" target="_blank"><div class="site-name">AnkiWeb</div><div class="site-desc">Spaced repetition flashcard system</div><div class="site-tag">Best for SR</div></a>
      <a class="site-card" href="https://www.getrevising.co.uk/" target="_blank"><div class="site-name">Get Revising</div><div class="site-desc">Mindmaps, flashcards and revision timetables</div></a>
      <a class="site-card" href="https://www.freescience.info/gcse.php" target="_blank"><div class="site-name">Free Science</div><div class="site-desc">Notes and worksheets for GCSE sciences</div></a>
    </div>
    <div class="site-cat-lbl">Science</div>
    <div class="site-grid">
      <a class="site-card" href="https://www.youtube.com/@Freesciencelessons" target="_blank"><div class="site-name">Free Science Lessons</div><div class="site-desc">Full course YouTube videos</div></a>
      <a class="site-card" href="https://www.youtube.com/@BioNinja" target="_blank"><div class="site-name">BioNinja</div><div class="site-desc">Biology diagrams and notes</div></a>
      <a class="site-card" href="https://www.chemguide.co.uk/" target="_blank"><div class="site-name">ChemGuide</div><div class="site-desc">Chemistry explanations</div></a>
      <a class="site-card" href="https://www.physbot.co.uk/" target="_blank"><div class="site-name">Physbot</div><div class="site-desc">Physics revision videos</div></a>
    </div>
    <div class="site-cat-lbl">English and Humanities</div>
    <div class="site-grid">
      <a class="site-card" href="https://litcharts.com/" target="_blank"><div class="site-name">LitCharts</div><div class="site-desc">Literature guides and themes</div></a>
      <a class="site-card" href="https://www.sparknotes.com/" target="_blank"><div class="site-name">SparkNotes</div><div class="site-desc">Text summaries and analysis</div></a>
      <a class="site-card" href="https://www.internetgeography.net/" target="_blank"><div class="site-name">Internet Geography</div><div class="site-desc">GCSE Geography case studies</div></a>
      <a class="site-card" href="https://www.tutor2u.net/" target="_blank"><div class="site-name">Tutor2u</div><div class="site-desc">Business, Geography, Psychology</div></a>
    </div>
    <div class="lbl" style="margin-top:20px">My revision timetable</div>
    <div id="timetable-builder"></div>
  `;
  buildTimetableWidget();
}

function renderNotionQuickLinks() {
  const wrap = el('notion-quicklinks'); if (!wrap) return;
  wrap.innerHTML = NOTION_PAGES.map(p =>
    `<a class="notion-quick-link" href="${escHtml(p.url)}" target="_blank" rel="noopener noreferrer">
       <span class="notion-quick-icon">${p.icon}</span>
       <div style="flex:1"><div class="notion-quick-title">${escHtml(p.title)}</div><div class="notion-quick-sub">${escHtml(p.sub)}</div></div>
       <span style="color:var(--hint);font-size:14px;margin-left:auto;flex-shrink:0">&#8250;</span>
     </a>`
  ).join('');
}

function renderExamList() {
  const wrap = el('exam-list'); if (!wrap) return;
  const today = new Date(); today.setHours(0,0,0,0);
  let allExams = [];
  if (isAdmin) allExams = [...EXAMS];
  try { const custom=JSON.parse(localStorage.getItem('rv_custom_exams')||'[]'); allExams=[...allExams,...custom]; } catch(e){}
  const upcoming = allExams
    .map(e=>{const d=new Date(e.date);d.setHours(0,0,0,0);return{...e,days:Math.round((d-today)/86400000)};})
    .filter(e=>e.days>=-1).sort((a,b)=>a.days-b.days).slice(0,12);
  if (!upcoming.length){wrap.innerHTML='<div style="font-size:13px;color:var(--muted);padding:14px 0;text-align:center">No upcoming exams. Add one below.</div>';return;}
  wrap.innerHTML = upcoming.map(e=>{
    const [,eMM,eDD]=e.date?e.date.split('-'):['','',''];
    const cls=e.days===0?'today':e.days<=3?'soon':'';
    const label=e.days===0?'TODAY':e.days<0?'Yest':String(e.days);
    const sub=e.days<=0?'':e.days===1?'day':'days';
    return `<div class="exam-row ${cls}"><div><div class="exam-name">${escHtml(e.subj)}</div><div class="exam-paper">${escHtml(e.paper||'')}${eDD&&eMM?`, ${eDD}/${eMM}`:''}</div></div><div style="text-align:right"><div class="exam-days">${label}</div><div class="exam-days-lbl">${sub}</div></div></div>`;
  }).join('');
}

function renderHowToRevise() {
  const wrap = el('how-to-revise'); if (!wrap) return;
  wrap.innerHTML = Object.entries(HOW_TO).map(([subj,tips])=>{
    const s=SUBJECTS.find(x=>x.name===subj||x.name.startsWith(subj));
    const examStr=s?`<span class="acc-exam">${escHtml(s.examDates)}</span>`:'';
    return `<div class="subj-accordion"><div class="acc-header" onclick="toggleAcc(this)"><span class="acc-title">${escHtml(subj)}</span><div style="display:flex;align-items:center;gap:6px">${examStr}<span class="acc-arrow">&#9660;</span></div></div><div class="acc-body"><div style="height:8px"></div>${tips.map(t=>`<div class="acc-tip">${t}</div>`).join('')}</div></div>`;
  }).join('');
}

function toggleAcc(h) {
  const b=h.nextElementSibling, arrow=h.querySelector('.acc-arrow');
  if (!b) return;
  const open=b.classList.toggle('open');
  if (arrow) arrow.style.transform=open?'rotate(180deg)':'';
}

function renderResSchedule() {
  const wrap=el('res-sched-table'); if(!wrap) return;
  const dow=new Date().getDay(), days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let html=`<div class="sched-th-row"><div class="sched-th">Day</div><div class="sched-th">S1</div><div class="sched-th">S2</div><div class="sched-th">S3</div></div>`;
  [0,1,2,3,4,5,6].forEach(d=>{
    const td=TIMETABLE[d]; if(!td) return;
    html+=`<div class="${d===dow?'sched-tr today-row':'sched-tr'}"><div class="sched-td day">${days[d]}</div><div class="sched-td">${escHtml(td.s1.subj)} <span style="color:var(--hint)">${td.s1.mins}m</span></div><div class="sched-td">${escHtml(td.s2.subj)} <span style="color:var(--hint)">${td.s2.mins}m</span></div><div class="sched-td">${escHtml(td.s3.subj)} <span style="color:var(--hint)">${td.s3.mins}m</span></div></div>`;
  });
  wrap.innerHTML=html;
}

// ── Add exam overlay ──────────────────────────────────────
function openAddExam()  { const ov=el('add-exam-ov'); if(ov) ov.classList.add('open'); }
function closeAddExam() { const ov=el('add-exam-ov'); if(ov) ov.classList.remove('open'); }
function saveCustomExam() {
  const subj=el('add-exam-subj')?el('add-exam-subj').value.trim():'';
  const paper=el('add-exam-paper')?el('add-exam-paper').value.trim():'';
  const date=el('add-exam-date')?el('add-exam-date').value:'';
  if(!subj||!date){showToast('Missing fields','Enter subject and date',false);return;}
  try{const stored=JSON.parse(localStorage.getItem('rv_custom_exams')||'[]');stored.push({subj,paper,date,custom:true});localStorage.setItem('rv_custom_exams',JSON.stringify(stored));}catch(e){}
  closeAddExam(); renderExamList(); showToast('Exam added',subj);
}

// ── Timetable builder ─────────────────────────────────────
function loadUserTimetable() {
  try { userTimetable = JSON.parse(localStorage.getItem('rv_user_tt')||'null'); } catch(e){ userTimetable=null; }
  if (!userTimetable) {
    userTimetable = {};
    TT_DAYS.forEach(d=>{ userTimetable[d]=TT_SESSIONS.map(()=>({subj:'',mins:60})); });
  }
}
function saveUserTimetable() { try{localStorage.setItem('rv_user_tt',JSON.stringify(userTimetable));}catch(e){} }
function buildTimetableWidget() {
  const wrap=el('timetable-builder'); if(!wrap) return;
  loadUserTimetable();
  wrap.innerHTML=`<div style="font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:12px;background:var(--s0);border:1px solid var(--border);border-radius:var(--r);padding:10px 13px">Build your own weekly revision timetable. Enter subjects and time, then save.</div><div id="tt-days-wrap"></div><button class="btn btn-primary" style="margin-top:12px" onclick="saveTimetableWidget()">Save timetable</button>`;
  renderTTDays();
}
function renderTTDays() {
  const wrap=el('tt-days-wrap'); if(!wrap) return;
  wrap.innerHTML=TT_DAYS.map((day,di)=>{
    const sessions=userTimetable[day]||[];
    const sessionRows=TT_SESSIONS.map((_,si)=>{
      const s=sessions[si]||{subj:'',mins:60};
      return `<div class="tt-session-row"><div class="tt-session-lbl">S${si+1}</div><input class="tt-input" type="text" placeholder="Subject..." value="${escHtml(s.subj)}" oninput="updateTT('${escHtml(day)}',${si},'subj',this.value)"><input class="tt-input tt-mins-input" type="number" min="10" max="180" value="${s.mins||60}" oninput="updateTT('${escHtml(day)}',${si},'mins',parseInt(this.value)||60)"><span style="font-size:11px;color:var(--hint);flex-shrink:0">min</span></div>`;
    }).join('');
    const hasSessions=sessions.some(s=>s&&s.subj);
    const summary=hasSessions?sessions.filter(s=>s&&s.subj).map(s=>s.subj).join(', '):'Add subjects';
    return `<div class="tt-day-block"><div class="tt-day-head" onclick="toggleTTDay('tt-body-${di}',this)"><span class="tt-day-name">${day}</span><span class="tt-day-summary" id="tt-summary-${di}">${escHtml(summary)}</span></div><div class="tt-day-body" id="tt-body-${di}" style="display:none">${sessionRows}</div></div>`;
  }).join('');
}
function toggleTTDay(bodyId){const body=el(bodyId);if(!body)return;body.style.display=body.style.display==='none'?'flex':'none';}
function updateTT(day,sessionIdx,field,value){
  if(!userTimetable[day])userTimetable[day]=TT_SESSIONS.map(()=>({subj:'',mins:60}));
  if(!userTimetable[day][sessionIdx])userTimetable[day][sessionIdx]={subj:'',mins:60};
  userTimetable[day][sessionIdx][field]=value;
  const di=TT_DAYS.indexOf(day);if(di>=0){const summaryEl=el(`tt-summary-${di}`);if(summaryEl){const sessions=userTimetable[day];summaryEl.textContent=sessions.filter(s=>s&&s.subj).map(s=>s.subj).join(', ')||'Add subjects';}}
}
function saveTimetableWidget(){saveUserTimetable();showToast('Timetable saved','Your schedule has been saved');}

commonPageInit('resources', function() {
  renderResources();
});
