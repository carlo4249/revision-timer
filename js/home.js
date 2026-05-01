// js/home.js -- Solus home page

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x,y,w,h,r){r=Math.min(r,w/2,h/2);this.beginPath();this.moveTo(x+r,y);this.arcTo(x+w,y,x+w,y+h,r);this.arcTo(x+w,y+h,x,y+h,r);this.arcTo(x,y+h,x,y,r);this.arcTo(x,y,x+w,y,r);this.closePath();return this;};
}

let S = {
  type:'paper', subject:'', phases:[], phaseIdx:0,
  timeLeft:0, totalTime:0, paused:false, sessionN:0,
  actualFocusSecs:0, energy:0, ticker:null,
  eyeT:null, hydraT:null, gratT:null, standT:null,
  breatheT:null, checkinT:null, checkinDismissT:null,
  wakelock:null, checkinScores:[], scheduleMode:false
};

let selM = 'paper', markCatSel = '', activeScreen = 'home';
let schedDragStart = null;

// ── Audio ────────────────────────────────────────────────
async function tone(type) {
  if (!CFG || !CFG.sound) return;
  try {
    const ctx = getAC();
    if (ctx.state === 'suspended') await ctx.resume();
    const notes = {
      start:[[440,.07],[550,.07],[660,.16]],end:[[660,.1],[550,.1],[440,.22]],
      warn:[[600,.16],[400,.22]],done:[[523,.09],[659,.09],[784,.11],[1047,.22]],soft:[[880,.05]]
    };
    let t = ctx.currentTime;
    (notes[type]||notes.soft).forEach(([f,d])=>{
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.connect(g);g.connect(ctx.destination);
      o.frequency.value=f;o.type='sine';
      g.gain.setValueAtTime(.2,t);g.gain.exponentialRampToValueAtTime(.001,t+d);
      o.start(t);o.stop(t+d+.01);t+=d*.82;
    });
  } catch(e){}
}
function notify(title, body, urgent) {
  if (CFG&&CFG.notif&&Notification.permission==='granted'){try{new Notification(title,{body,silent:!urgent});}catch(e){}}
  if('vibrate' in navigator) navigator.vibrate(urgent?[200,80,200]:[100,50,100]);
}

// ── Screen management ─────────────────────────────────────
const ALL_SCREENS = ['home-wrap','timer-screen','break-screen','log-screen'];
function showScreen(id) {
  activeScreen = id;
  ALL_SCREENS.forEach(s => { const e=el(s); if(e) e.classList.toggle('active', s===id); });
  const nav = el('bottom-nav');
  if (nav) nav.classList.toggle('hidden', id !== 'home-wrap');
}

// ── Schedule card ─────────────────────────────────────────
function checkTodayDone() {
  const t = new Date().toDateString();
  if (!TODAY_DONE || TODAY_DONE.date !== t) {
    TODAY_DONE = { date:t, s1:false, s2:false, s3:false };
    saveTodayDone();
  }
}
function updateProgressBar() {
  checkTodayDone();
  const done = [TODAY_DONE.s1,TODAY_DONE.s2,TODAY_DONE.s3].filter(Boolean).length;
  const bar = el('session-progress-fill');
  if (bar) bar.style.width = (done/3*100)+'%';
}
function updateStartBtn() {
  const btn = el('btn-start');
  if (!btn) return;
  const d = {blurt:'25 min',paper:'55 min',flash:'30 min',teach:'35 min',practise:'55 min',custom:'Custom'};
  btn.textContent = 'Start Session - '+(d[selM]||'Go');
}
function buildSubjChips() {
  const chips = el('subj-chips');
  if (!chips) return;
  const dow = new Date().getDay(), td = TIMETABLE[dow];
  const todaySubjs = (isAdmin&&td) ? [td.s1.subj,td.s2.subj].filter((s,i,a)=>a.indexOf(s)===i) : [];
  const ordered = [...new Set([...todaySubjs,...SUBJECTS.map(s=>s.name)])];
  chips.innerHTML = ordered.map(name => {
    const hi = todaySubjs.includes(name)&&isAdmin;
    const safeN = escHtml(name);
    return `<span class="subj-chip-btn" data-name="${safeN}" style="padding:5px 12px;background:${hi?'var(--acc-l)':'var(--s1)'};border:1px solid ${hi?'rgba(16,152,247,.2)':'var(--border)'};border-radius:20px;font-size:12px;font-weight:${hi?700:500};cursor:pointer;color:${hi?'var(--acc-t)':'var(--muted)'};display:inline-block;margin:2px 0;transition:opacity .15s">${safeN}</span>`;
  }).join('');
  chips.onclick = e => { const btn=e.target.closest('.subj-chip-btn'); if(!btn) return; const subjEl=el('subj'); if(subjEl) subjEl.value=btn.dataset.name; };
}
function buildQuickStart() {
  checkTodayDone();
  const dow=new Date().getDay(), td=TIMETABLE[dow];
  if (!td) return;
  const slots=[td.s1.subj,td.s2.subj,td.s3.subj], keys=['s1','s2','s3'];
  let next=-1;
  for (let i=0;i<3;i++){if(!TODAY_DONE[keys[i]]){next=i;break;}}
  const qs=el('quickstart');
  if (!qs) return;
  if (next<0){qs.style.display='none';return;}
  qs.style.display='flex';
  const qsText=el('qs-text');
  if (qsText) qsText.textContent=isAdmin?slots[next]:`Session ${next+1}`;
}
function buildScheduleCard() {
  checkTodayDone();
  const dow=new Date().getDay(), td=TIMETABLE[dow];
  if (!td) return;
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  setText('sc-title',`${days[dow]}'s Plan`);
  const doneCount=[TODAY_DONE.s1,TODAY_DONE.s2,TODAY_DONE.s3].filter(Boolean).length;
  setText('sc-badge',`${doneCount}/3 done`);
  const s1=isAdmin?td.s1.subj:'Session 1', s2=isAdmin?td.s2.subj:'Session 2', s3=isAdmin?td.s3.subj:'Session 3';
  const mkRow=(n,subj,done,curr)=>
    `<div class="sc-row"><div class="sc-n ${done?'done':curr?'curr':''}">${done?'\u2713':n}</div><div class="sc-subj">${escHtml(subj)}</div></div>`;
  const sessEl=el('sc-sessions');
  if (sessEl) sessEl.innerHTML=mkRow(1,s1,TODAY_DONE.s1,!TODAY_DONE.s1)+mkRow(2,s2,TODAY_DONE.s2,TODAY_DONE.s1&&!TODAY_DONE.s2)+mkRow(3,s3,TODAY_DONE.s3,TODAY_DONE.s1&&TODAY_DONE.s2&&!TODAY_DONE.s3);
  const progEl=el('sc-progress');
  if (progEl) progEl.innerHTML=[1,2,3].map(i=>`<div class="sp-dot ${TODAY_DONE['s'+i]?'done':''}"></div>`).join('');
  buildQuickStart();
  updateProgressBar();
}

// ── Schedule overlay ──────────────────────────────────────
function openSchedOv() {
  const dow=new Date().getDay(), td=TIMETABLE[dow];
  if (!td) return;
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  setText('sched-ov-title',`${days[dow]}'s Plan`);
  const mkRow=(n,subj,detail,done)=>
    `<div class="sched-ov-row"><div class="sched-ov-n ${done?'done':''}">${done?'\u2713':n}</div><div style="flex:1"><div style="font-size:13px;font-weight:700;color:var(--text)">${escHtml(subj)}</div>${detail?`<div style="font-size:11px;color:var(--hint);margin-top:3px;line-height:1.5">${escHtml(detail)}</div>`:''}</div></div>`;
  const bodyEl=el('sched-ov-body');
  const show=isAdmin;
  if (bodyEl) bodyEl.innerHTML=mkRow(1,show?td.s1.subj:'Session 1','',TODAY_DONE.s1)+mkRow(2,show?td.s2.subj:'Session 2','',TODAY_DONE.s2)+mkRow(3,show?td.s3.subj:'Session 3',show?(td.s3detail||''):'',TODAY_DONE.s3);
  const ov=el('sched-ov');
  if (!ov) return;
  ov.classList.add('open');
  const sheet=ov.querySelector('.sched-ios-sheet');
  if (sheet){sheet.style.transform='';sheet.style.transition='';}
  initSchedDrag();
}
function closeSchedOv() {
  const ov=el('sched-ov');
  if (!ov) return;
  const sheet=ov.querySelector('.sched-ios-sheet');
  if (sheet){sheet.style.transition='transform .3s cubic-bezier(.22,.8,.3,1)';sheet.style.transform='translateY(100%)';setTimeout(()=>{ov.classList.remove('open');sheet.style.transform='';sheet.style.transition='';},300);}
  else ov.classList.remove('open');
}
function initSchedDrag() {
  const ov=el('sched-ov');if(!ov)return;
  const sheet=ov.querySelector('.sched-ios-sheet');if(!sheet||sheet._dragInited)return;
  sheet._dragInited=true;
  sheet.addEventListener('touchstart',e=>{schedDragStart=e.touches[0].clientY;sheet.style.transition='none';},{passive:true});
  sheet.addEventListener('touchmove',e=>{if(schedDragStart===null)return;const d=e.touches[0].clientY-schedDragStart;if(d>0)sheet.style.transform=`translateY(${d}px)`;},{passive:true});
  sheet.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientY-(schedDragStart||0);sheet.style.transition='transform .3s cubic-bezier(.22,.8,.3,1)';if(d>80)closeSchedOv();else sheet.style.transform='';schedDragStart=null;},{passive:true});
}
function startScheduleMode() {
  closeSchedOv();
  const dow=new Date().getDay(), td=TIMETABLE[dow];
  if (!td) return;
  checkTodayDone();
  const subj=isAdmin?(!TODAY_DONE.s1?td.s1.subj:!TODAY_DONE.s2?td.s2.subj:td.s3.subj):'General';
  openConfirm("Start today's schedule?",`Beginning with ${escHtml(subj)}. Clear your desk and commit to the session.`,'Start schedule','btn btn-primary',()=>{
    S.subject=subj; S.type='schedule'; S.scheduleMode=true;
    const m=METHODS['paper']; if(!m) return;
    S.phases=JSON.parse(JSON.stringify(m.phases)).map(p=>({...p,sessionLabel:subj,method:'paper'}));
    beginSession();
  });
}

// ── Quick start ───────────────────────────────────────────
function quickStart() {
  checkTodayDone();
  const dow=new Date().getDay(), td=TIMETABLE[dow];
  if (!td) return;
  const slots=[td.s1.subj,td.s2.subj,td.s3.subj], keys=['s1','s2','s3'];
  let next=-1;
  for (let i=0;i<3;i++){if(!TODAY_DONE[keys[i]]){next=i;break;}}
  if (next<0) return;
  const subjName=isAdmin?slots[next]:`Session ${next+1}`;
  const methodName=METHODS[selM==='custom'?'paper':selM]?.name||'Past Paper';
  openConfirm(`Start ${subjName}?`,`${methodName} session. Clear your space before you begin.`,'Start now','btn btn-primary',()=>{
    S.subject=isAdmin?slots[next]:'General'; S.type=selM; S.scheduleMode=true;
    const m=METHODS[selM==='custom'?'paper':selM]; if(!m) return;
    S.phases=JSON.parse(JSON.stringify(m.phases)).map(p=>({...p,sessionLabel:S.subject,method:selM==='custom'?'paper':selM}));
    beginSession();
  });
}

// ── Method selection ──────────────────────────────────────
function selMethod(cardEl) {
  document.querySelectorAll('.method-card').forEach(c=>c.classList.remove('sel'));
  cardEl.classList.add('sel');
  selM=cardEl.dataset.m;
  const cr=el('custom-row');
  if (cr) cr.style.display=selM==='custom'?'grid':'none';
  updateStartBtn();
}

// ── Session start ─────────────────────────────────────────
function normalizeSubj(s) {
  const k=s.trim().toLowerCase();
  return SUBJ_MAP[k]||(s.trim().charAt(0).toUpperCase()+s.trim().slice(1));
}
function startSession() {
  const raw=el('subj'), subjectVal=raw&&raw.value.trim()?normalizeSubj(raw.value.trim()):'';
  if (!subjectVal) {
    openConfirm('No subject entered','Starting without a subject logs this as "General".','Start anyway','btn btn-primary',()=>_doStartSession('General'));
    return;
  }
  const methodName=METHODS[selM]?.name||'Custom';
  const durations={blurt:'25 min',paper:'55 min',flash:'30 min',teach:'35 min',practise:'55 min',custom:'custom time'};
  openConfirm(`Start ${escHtml(subjectVal)}?`,`${methodName} · ${durations[selM]||''}. Clear your space and commit.`,'Start session','btn btn-primary',()=>_doStartSession(subjectVal));
}
function _doStartSession(subject) {
  S.subject=subject; S.type=selM; S.scheduleMode=false;
  if (selM==='custom') {
    const fm=Math.max(5,Math.min(180,parseInt(el('cust-focus')?.value||'45')||45));
    const bm=Math.max(0,Math.min(60,parseInt(el('cust-break')?.value||'0')||0));
    S.phases=[{t:'focus',d:fm*60,l:'Focus',s:`${fm} min`,sessionLabel:S.subject,method:'custom'}];
    if (bm>0) S.phases.push({t:'brk',d:bm*60,l:'Break',s:`${bm} min`,sessionLabel:S.subject,method:'custom'});
    S.phases.push({t:'log',d:0,sessionLabel:S.subject,method:'custom'});
  } else {
    const m=METHODS[selM]; if(!m) return;
    S.phases=JSON.parse(JSON.stringify(m.phases)).map(p=>({...p,sessionLabel:S.subject,method:selM}));
  }
  beginSession();
}
function beginSession() {
  S.phaseIdx=0; S.sessionN++; S.actualFocusSecs=0; S.checkinScores=[]; S.energy=0;
  markCatSel='';
  enterPhase(0);
  if (CFG&&CFG.notif) askNotif();
}

// ── Phase control ─────────────────────────────────────────
function fmt(secs) {
  const m=Math.floor(Math.abs(secs)/60), s=Math.abs(secs)%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function enterPhase(idx) {
  clearInterval(S.ticker); S.ticker=null;
  S.phaseIdx=idx;
  const ph=S.phases[idx];
  if (!ph){sessionComplete();return;}
  S.timeLeft=ph.d; S.totalTime=ph.d; S.paused=false;
  if (ph.t==='log'){stopReminders();showLogScreen(ph);return;}
  if (ph.t==='brk'){showScreen('break-screen');renderBreakScreen(ph);tone('end');startBreathe();}
  else {showScreen('timer-screen');renderTimerScreen(ph);tone('start');startReminders(ph.d);scheduleCheckin(ph.d);requestWakeLock();}
  notify(ph.l,ph.sessionLabel||'',false);
  if (ph.d>0) S.ticker=setInterval(tick,1000);
  else enterPhase(idx+1);
}
function tick() {
  if (S.paused) return;
  S.timeLeft=Math.max(0,S.timeLeft-1);
  const ph=S.phases[S.phaseIdx];
  if (ph&&ph.t==='focus') S.actualFocusSecs++;
  renderTimeDisplay();
  if (S.timeLeft===60) tone('warn');
  if (S.timeLeft===0){clearInterval(S.ticker);S.ticker=null;enterPhase(S.phaseIdx+1);}
}
function renderTimeDisplay() {
  const ph=S.phases[S.phaseIdx];if(!ph)return;
  if (ph.t==='brk'){setText('brk-time',fmt(S.timeLeft));}
  else {
    setText('t-time',fmt(S.timeLeft));
    const ring=el('ring');
    if (ring&&S.totalTime>0) ring.style.strokeDashoffset=String(CIRC*(1-S.timeLeft/S.totalTime));
  }
}
function togglePause() {
  S.paused=!S.paused;
  const label=S.paused?'Resume':'Pause';
  ['btn-pause','brk-pause'].forEach(id=>setText(id,label));
}
function renderTimerScreen(ph) {
  setText('phase-lbl',ph.l||'Focus');setText('t-sub',ph.s||'');setText('t-subj',ph.sessionLabel||S.subject||'Session');setText('t-time',fmt(ph.d));setText('btn-pause','Pause');
  const ring=el('ring');if(ring)ring.style.strokeDashoffset='0';
  const m=METHODS[ph.method],iconEl=el('timer-method-icon');
  if(iconEl)iconEl.textContent=m?m.icon:'';
  renderDots();
}
function renderBreakScreen(ph) {
  setText('brk-lbl',ph.l||'Break');setText('brk-time',fmt(ph.d));setText('brk-sublabel',ph.s||'Hydrate, stretch, rest your eyes');
  const nxt=S.phases[S.phaseIdx+1];
  setText('brk-next',nxt&&nxt.t!=='log'?`Next: ${nxt.l}`:'');
  setText('brk-pause','Pause');
}
function renderDots() {
  const c=el('pdots');if(!c)return;c.innerHTML='';
  const COL={focus:'var(--acc)',brk:'var(--brk)',log:'var(--log)'};
  S.phases.forEach((p,i)=>{
    const d=document.createElement('div');d.className='pdot';
    if(i<S.phaseIdx){d.style.background='var(--brk)';d.classList.add('done');}
    else if(i===S.phaseIdx){d.style.background=COL[p.t]||'var(--acc)';d.classList.add('active');}
    c.appendChild(d);
  });
}
function confirmSkip() {
  const next=S.phases[S.phaseIdx+1], nn=next?(next.t==='log'?'error log':next.t==='brk'?'break':'focus'):'done';
  openConfirm('Skip phase?',`Jump to ${nn}.`,'Skip','btn btn-secondary',()=>{
    clearInterval(S.ticker);S.ticker=null;stopBreathe();dismissCheckin();stopReminders();enterPhase(S.phaseIdx+1);
  });
}
function confirmEnd() {
  openConfirm('End session?','Your focus time will be saved to stats.','End session','btn btn-danger',()=>{
    clearInterval(S.ticker);S.ticker=null;stopReminders();stopBreathe();dismissCheckin();releaseLock2();
    recordSession();returnToHome();buildScheduleCard();
  });
}
function returnToHome() {
  clearInterval(S.ticker);S.ticker=null;stopReminders();stopBreathe();dismissCheckin();releaseLock2();
  showScreen('home-wrap');
  buildScheduleCard();buildSRCard();
}

// ── Breathe ───────────────────────────────────────────────
const BRK_MSGS=['Breathe in...','Hold...','Breathe out...','Hold...'], BRK_DUR=[4000,2000,4000,2000];
let brkStep=0;
function startBreathe(){stopBreathe();brkStep=0;nextBrk();}
function nextBrk(){const e=el('brk-breathe');if(e)e.textContent=BRK_MSGS[brkStep%4];S.breatheT=setTimeout(()=>{brkStep++;nextBrk();},BRK_DUR[brkStep%4]);}
function stopBreathe(){clearTimeout(S.breatheT);S.breatheT=null;}

// ── Wake lock ─────────────────────────────────────────────
async function requestWakeLock(){try{if('wakeLock'in navigator)S.wakelock=await navigator.wakeLock.request('screen');}catch(e){}}
function releaseLock2(){try{if(S.wakelock){S.wakelock.release();S.wakelock=null;}}catch(e){}}

// ── Reminders ─────────────────────────────────────────────
function startReminders(dur){
  stopReminders();
  if(CFG&&CFG.eye)   S.eyeT=setInterval(()=>flash('b-eye',4000),20*60*1000);
  if(CFG&&CFG.hydra) S.hydraT=setInterval(()=>flash('b-hydra',4000),45*60*1000);
  if(dur>=25*60) S.gratT=setTimeout(()=>flash('b-gratitude',5000),25*60*1000);
  if(dur>=35*60) S.standT=setTimeout(()=>flash('b-stand',5000),35*60*1000);
}
function flash(id,ms){
  const e=el(id),ts=el('timer-screen');
  if(!e||!ts||!ts.classList.contains('active'))return;
  e.classList.add('show');tone('soft');
  setTimeout(()=>e.classList.remove('show'),ms);
}
function stopReminders(){
  [S.eyeT,S.hydraT].forEach(t=>{if(t!=null)clearInterval(t);});
  [S.gratT,S.standT].forEach(t=>{if(t!=null)clearTimeout(t);});
  S.eyeT=S.hydraT=S.gratT=S.standT=null;
}
function scheduleCheckin(rem){
  clearTimeout(S.checkinT);
  if(!CFG||!CFG.checkin||rem<8*60)return;
  S.checkinT=setTimeout(showCheckin,(7+Math.random()*5)*60*1000);
}
function showCheckin(){
  const ts=el('timer-screen');
  if(!ts||!ts.classList.contains('active'))return;
  if(S.paused){scheduleCheckin(S.timeLeft);return;}
  const co=el('checkin-ov');if(co)co.classList.add('vis');
  S.checkinDismissT=setTimeout(dismissCheckin,15000);
}
function logCheckin(score,optEl){
  document.querySelectorAll('.checkin-opt').forEach(o=>o.classList.remove('picked'));
  optEl.classList.add('picked');S.checkinScores.push(score);
  clearTimeout(S.checkinDismissT);
  if(score<=2)setTimeout(()=>flash('b-boxbreath',6000),700);
  setTimeout(dismissCheckin,600);
}
function dismissCheckin(){
  clearTimeout(S.checkinDismissT);
  const co=el('checkin-ov');if(co)co.classList.remove('vis');
  document.querySelectorAll('.checkin-opt').forEach(o=>o.classList.remove('picked'));
  scheduleCheckin(S.timeLeft);
}

// ── Log screen ────────────────────────────────────────────
function showLogScreen(ph) {
  showScreen('log-screen');
  const hdr=el('log-header');if(hdr)hdr.textContent=ph.sessionLabel?`${ph.sessionLabel} done`:'Session complete';
  const logSubjEl=el('log-subj');if(logSubjEl)logSubjEl.value=(S.subject&&S.subject!=='General')?S.subject:'';
  ['log-topic','log-wrong','log-correct','log-avoid','log-question'].forEach(id=>{const e=el(id);if(e)e.value='';});
  ['log-got','log-total'].forEach(id=>{const e=el(id);if(e)e.value='';});
  document.querySelectorAll('.e-btn,.mark-cat-btn').forEach(b=>b.classList.remove('sel','sel-app','sel-know','sel-term'));
  const spaced=el('tgl-spaced');if(spaced)spaced.checked=false;
  const mg=el('mark-guidance');if(mg)mg.classList.remove('vis');
  const cb=el('copy-btn');if(cb){cb.classList.remove('copied');cb.innerHTML='<span>Copy for Notion</span><span style="font-size:15px">&#128203;</span>';}
  markCatSel='';S.energy=0;
  tone('done');notify('Session done','Log your errors.',true);releaseLock2();
}
function selEnergy(btn){document.querySelectorAll('.e-btn').forEach(b=>b.classList.remove('sel'));btn.classList.add('sel');S.energy=parseInt(btn.dataset.e)||0;}
function selMarkCat(btn,cat){
  document.querySelectorAll('.mark-cat-btn').forEach(b=>b.classList.remove('sel-app','sel-know','sel-term'));
  btn.classList.add('sel-'+cat);markCatSel=cat;
  const guidance={app:'<strong>Application</strong>: You knew the content but missed the connection. Fix: more timed exam questions. Read each question twice.',know:'<strong>Knowledge gap</strong>: You could not recall a fact or process. Fix: add to flashcards today and drill until automatic.',term:'<strong>Terminology</strong>: Wrong word or missed a mark scheme term. Fix: study the mark scheme and highlight every term you missed.'};
  const g=el('mark-guidance');if(g){g.innerHTML=guidance[cat]||'';g.classList.add('vis');}
}
function copyForNotion(){
  const now=new Date(), dateStr=`${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
  const subj=(el('log-subj')&&el('log-subj').value.trim())||S.subject;
  const got=(el('log-got')&&el('log-got').value.trim())||'', tot=(el('log-total')&&el('log-total').value.trim())||'';
  const topic=(el('log-topic')&&el('log-topic').value.trim())||'';
  const question=(el('log-question')&&el('log-question').value.trim())||'';
  const wrong=(el('log-wrong')&&el('log-wrong').value.trim())||'';
  const correct=(el('log-correct')&&el('log-correct').value.trim())||'';
  const avoid=(el('log-avoid')&&el('log-avoid').value.trim())||'';
  const catMap={app:'Application',know:'Knowledge',term:'Terminology'};
  const row=[dateStr,subj,topic,question,catMap[markCatSel]||'',got&&tot?`${got}/${tot}`:'',wrong,correct,avoid].join('\t');
  const cb=el('copy-btn');
  if(navigator.clipboard){navigator.clipboard.writeText(row).then(()=>{if(cb){cb.classList.add('copied');cb.innerHTML='<span>Copied</span><span>\u2713</span>';setTimeout(()=>{cb.classList.remove('copied');cb.innerHTML='<span>Copy for Notion</span><span style="font-size:15px">&#128203;</span>';},2500);}}).catch(()=>fallbackCopy(row));}
  else fallbackCopy(row);
}
function fallbackCopy(text){const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);}
function doneLog(skip){
  const logSubj=el('log-subj');if(logSubj&&logSubj.value.trim())S.subject=normalizeSubj(logSubj.value.trim());
  if(!skip){const topic=el('log-topic'),spaced=el('tgl-spaced');if(topic&&topic.value.trim()&&spaced&&spaced.checked)addToSR(topic.value.trim(),S.subject);}
  recordSession();stopBreathe();releaseLock2();
  returnToHome();
}
function sessionComplete(){tone('done');notify('All done!','Great work.',true);recordSession();releaseLock2();returnToHome();}

// ── Record session ────────────────────────────────────────
function markScheduledDone(){
  checkTodayDone();
  const dow=new Date().getDay(),td=TIMETABLE[dow];if(!td)return;
  const slots=['s1','s2','s3'],schSubjs=[td.s1.subj,td.s2.subj,td.s3.subj];
  for(let i=0;i<3;i++){
    if(!TODAY_DONE[slots[i]]){
      const sched=schSubjs[i].toLowerCase(),sess=S.subject.toLowerCase();
      if(S.scheduleMode||sched.includes(sess)||sess.includes(sched)||sched.split(' ').some(w=>w.length>3&&sess.includes(w))){
        TODAY_DONE[slots[i]]=true;saveTodayDone();
        const done=[TODAY_DONE.s1,TODAY_DONE.s2,TODAY_DONE.s3].filter(Boolean).length;
        showToast('Session done',done===3?'All 3 done today. Great work.':`${done}/3 sessions done`);
        break;
      }
    }
  }
}
function recordSession(){
  const focusMins=Math.max(1,Math.round(S.actualFocusSecs/60));
  STATS.total=(STATS.total||0)+1;STATS.mins=(STATS.mins||0)+focusMins;
  if(!Array.isArray(STATS.hist))STATS.hist=[];
  STATS.hist.unshift({date:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),dateStr:new Date().toDateString(),subj:S.subject,method:S.type,mins:focusMins,energy:S.energy,markCat:markCatSel});
  if(STATS.hist.length>90)STATS.hist.pop();
  saveStats();markScheduledDone();
}

// ── Spaced repetition ─────────────────────────────────────
function srDueItems(){const now=Date.now();return(Array.isArray(SPACED)?SPACED:[]).filter(i=>i.nextReview&&i.nextReview<=now);}
function buildSRCard(){
  const due=srDueItems(),card=el('sr-due-card');if(!card)return;
  if(!due.length){card.style.display='none';return;}
  card.style.display='block';setText('sr-due-count',String(due.length));
  const preview=el('sr-due-preview');
  if(preview){if(due.length===1)preview.textContent=`"${due[0].topic}" - ${due[0].subj}`;else{const subjects=[...new Set(due.map(d=>d.subj))].slice(0,3).join(', ');preview.textContent=`${subjects} - tap to review`;}}
}
let srQueue=[],srIdx=0;
function openSRReview(){srQueue=srDueItems();if(!srQueue.length)return;srIdx=0;const ov=el('sr-ov');if(ov)ov.classList.add('open');renderSRCard();}
function closeSRReview(){const ov=el('sr-ov');if(ov)ov.classList.remove('open');buildSRCard();}
function renderSRCard(){
  const item=srQueue[srIdx];
  if(!item){closeSRReview();showToast('Review done','All caught up',true);buildSRCard();return;}
  setText('sr-topic',item.topic);setText('sr-subj-lbl',`${item.subj} - ${srIntervalLabel(item.interval||1)}`);
  const prog=el('sr-prog');if(prog)prog.innerHTML=srQueue.map((_,i)=>`<div class="sr-prog-dot${i<srIdx?' done':''}"></div>`).join('');
  const remaining=srQueue.length-srIdx;setText('sr-hint',remaining===1?'Last one':`${remaining} left`);
}
function srIntervalLabel(d){if(d<=1)return'Due today';if(d<7)return`Next: ${d}d`;if(d<30)return`Next: ${Math.round(d/7)}w`;return`Next: ${Math.round(d/30)}mo`;}
function srAnswer(remembered){
  const item=srQueue[srIdx];if(!item)return;
  const now=Date.now(),idx=(Array.isArray(SPACED)?SPACED:[]).findIndex(i=>i.id===item.id);
  if(idx<0){srIdx++;renderSRCard();return;}
  if(remembered){const ni=Math.min((item.interval||1)*2,60);SPACED[idx].interval=ni;SPACED[idx].streak=(item.streak||0)+1;SPACED[idx].nextReview=now+ni*86400000;}
  else{SPACED[idx].interval=1;SPACED[idx].streak=0;SPACED[idx].nextReview=now+86400000;}
  SPACED[idx].lastReviewed=now;saveSpaced();srIdx++;renderSRCard();
}
function addToSR(topic,subj){
  if(!Array.isArray(SPACED))SPACED=[];
  const now=Date.now();
  SPACED.push({id:`${now}-${Math.random().toString(36).slice(2)}`,topic,subj,added:now,nextReview:now+14*86400000,interval:14,streak:0,lastReviewed:null});
  saveSpaced();
}
function migrateSRItems(){if(!Array.isArray(SPACED)){SPACED=[];return;}let changed=false;SPACED.forEach((item,i)=>{if(!item.id){SPACED[i].id=`${Date.now()}-${i}`;changed=true;}if(!item.nextReview){SPACED[i].nextReview=Date.now();SPACED[i].interval=1;SPACED[i].streak=0;changed=true;}});if(changed)saveSpaced();}

// ── Keyboard ──────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return;
  const ts=el('timer-screen'),bs=el('break-screen');
  if (!ts||!bs) return;
  const onTimer=ts.classList.contains('active'),onBreak=bs.classList.contains('active');
  if (!onTimer&&!onBreak) return;
  if (e.code==='Space'){e.preventDefault();togglePause();}
  if (e.code==='KeyS'&&onTimer) confirmSkip();
  if (e.code==='Escape') confirmEnd();
});

// ── Admin change hook ─────────────────────────────────────
function onAdminChange() { buildScheduleCard(); buildSubjChips(); updateExamChip(); }
function onDataCleared() { buildScheduleCard(); buildSRCard(); updateProgressBar(); }

// ── Init ──────────────────────────────────────────────────
commonPageInit('home', function() {
  migrateSRItems();
  buildScheduleCard();
  buildSubjChips();
  buildSRCard();
  updateStartBtn();
  updateProgressBar();
  // Default method selection
  const defaultCard = document.querySelector('.method-card[data-m="paper"]');
  if (defaultCard) defaultCard.classList.add('sel');
  showScreen('home-wrap');
  // Desktop scroll
  document.querySelectorAll('.screen, #home-wrap').forEach(screen => {
    screen.addEventListener('wheel', e => {
      const scrollArea = screen.querySelector('.scroll-area');
      if (!scrollArea || scrollArea.contains(e.target)) return;
      e.preventDefault(); scrollArea.scrollBy({ top: e.deltaY, behavior: 'auto' });
    }, { passive: false });
  });
});
