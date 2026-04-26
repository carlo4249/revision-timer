// js/app.js -- Solus

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y,     x + w, y + h, r);
    this.arcTo(x + w, y + h, x,     y + h, r);
    this.arcTo(x,     y + h, x,     y,     r);
    this.arcTo(x,     y,     x + w, y,     r);
    this.closePath();
    return this;
  };
}

let CFG        = { ...DEFAULT_CFG };
let STATS      = { ...DEFAULT_STATS };
let SPACED     = [];
let TODAY_DONE = { ...DEFAULT_TODAY_DONE };
let SPEC_CONF  = {};

let S = {
  type:'paper', subject:'', phases:[], phaseIdx:0,
  timeLeft:0, totalTime:0, paused:false, sessionN:0,
  actualFocusSecs:0, energy:0, ticker:null,
  eyeT:null, hydraT:null, gratT:null, standT:null,
  breatheT:null, checkinT:null, checkinDismissT:null,
  wakelock:null, checkinScores:[], scheduleMode:false
};

let isAdmin         = false;
let confirmCallback = null;
let activeTab       = 'home';
let selM            = 'paper';
let markCatSel      = '';
let currentSpecSubj = 'Maths';
let statPeriod      = 'week';
let resourcesBuilt  = false;

const isPointerCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
const clickOrTap      = isPointerCoarse ? 'Tap' : 'Click';

try { isAdmin = sessionStorage.getItem('sv_admin') === '1'; } catch(e) {}


// ===================== HELPERS =====================

function el(id)           { return document.getElementById(id); }
function setText(id, val) { const e = el(id); if (e) e.textContent = val; }

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmtSpec(txt) {
  txt = txt.replace(/\^(\([^)]*\)|[-\w\/]+)/g, (_, e) => `<sup>${e.replace(/[()]/g, '')}</sup>`);
  txt = txt.replace(/([A-Z][a-z]?)(\d+)/g, '$1<sub>$2</sub>');
  txt = txt.replace(/--&gt;/g, '\u2192');
  txt = txt.replace(/&lt;--&gt;/g, '\u21cc');
  txt = txt.replace(/(\d+)\s*degrees?\s*[Cc]/g, '$1\u00b0C');
  return txt;
}

function fmt(secs) {
  const m = Math.floor(Math.abs(secs) / 60);
  const s = Math.abs(secs) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}


// ===================== THEME =====================

function toggleThemeFromSettings(checkbox) {
  const t = checkbox.checked ? 'dark' : 'light';
  applyTheme(t);
  try { localStorage.setItem('rv_theme', t); } catch(e) {}
}

function applyTheme(t) {
  if (!t) {
    try { t = localStorage.getItem('rv_theme') || 'dark'; } catch(e) { t = 'dark'; }
  }
  document.documentElement.setAttribute('data-theme', t);
  const tcm = el('tcm');
  if (tcm) tcm.content = t === 'dark' ? '#0e1010' : '#f2f2ed';
  document.querySelectorAll('.theme-chk').forEach(c => { c.checked = (t === 'dark'); });
}


// ===================== NAV INDICATOR =====================

const NAV_ORDER = ['home', 'stats', 'spec', 'resources'];

function updateNavIndicator(name) {
  const indicator = document.querySelector('.nav-indicator');
  if (!indicator) return;
  const idx = NAV_ORDER.indexOf(name);
  if (idx < 0) return;
  const labels = document.querySelectorAll('.nav-tab-lbl');
  if (!labels[idx]) return;
  const lbl = labels[idx];
  const navTabs = lbl.closest('.nav-tabs');
  if (!navTabs) return;
  const navRect = navTabs.getBoundingClientRect();
  const lblRect = lbl.getBoundingClientRect();
  indicator.style.left  = (lblRect.left - navRect.left) + 'px';
  indicator.style.width = lblRect.width + 'px';
  labels.forEach((l, i) => l.classList.toggle('active-tab', i === idx));
}


// ===================== SETTINGS =====================

function openSettings() {
  applySettings();
  syncAdminUI();
  const panel    = el('settings-panel');
  const backdrop = el('settings-backdrop');
  if (panel)    panel.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  updateSettingsAccountUI();
}

function closeSettings() {
  const panel    = el('settings-panel');
  const backdrop = el('settings-backdrop');
  if (panel)    panel.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function updateSettingsAccountUI() {
  const section = el('settings-account-section');
  if (!section) return;
  if (!window.FIREBASE_ENABLED) {
    section.innerHTML = '<div style="font-size:12px;color:var(--hint);padding:12px 14px;line-height:1.55">Firebase not configured. Running in local mode.</div>';
    return;
  }
  const user = currentUser;
  if (user) {
    const name = user.displayName || user.email || 'Signed in';
    section.innerHTML = `
      <div class="setting-row" style="flex-direction:column;align-items:flex-start;gap:4px">
        <div class="sr-lbl">Signed in as</div>
        <div class="sr-desc" style="word-break:break-all">${escHtml(name)}</div>
      </div>
      <div class="setting-row">
        <button class="btn btn-secondary" style="width:100%;font-size:13px;background:var(--s2);border:1.5px solid var(--border)" onclick="confirmSignOut()">Sign out</button>
      </div>`;
  } else {
    section.innerHTML = `
      <div class="setting-row">
        <button class="btn btn-secondary" style="width:100%;font-size:13px;background:var(--s2);border:1.5px solid var(--border)" onclick="window.location.href='auth.html'">Sign in to sync</button>
      </div>`;
  }
}


// ===================== SIGN OUT =====================

function confirmSignOut() {
  openConfirm(
    'Sign out?',
    'Your data is saved to the cloud and will be waiting when you sign back in.',
    'Sign out',
    'btn btn-secondary',
    () => signOutUser()
  );
}

async function signOutUser() {
  if (window.firebaseAuth) await window.firebaseAuth.signOut().catch(() => {});
  currentUser = null;
  closeSettings();
  window.location.href = 'auth.html';
}


// ===================== ADMIN MODE =====================

const ADMIN_PASSWORD = 'Xaniel32!';

function adminUnlock() {
  const pw  = el('admin-pw-input');
  const err = el('admin-pw-error');
  if (!pw) return;
  if (pw.value === ADMIN_PASSWORD) {
    isAdmin = true;
    try { sessionStorage.setItem('sv_admin', '1'); } catch(e) {}
    pw.value = '';
    if (err) err.textContent = '';
    syncAdminUI();
    updateAdminContentUI();
    buildScheduleCard();
    showToast('Admin mode active', 'Welcome back, Daniel');
  } else {
    if (err) {
      err.textContent = 'Incorrect password';
      pw.value = '';
      pw.style.animation = 'none';
      requestAnimationFrame(() => { pw.style.animation = 'shake .3s ease'; });
    }
  }
}

function adminDeactivate() {
  openConfirm(
    'Deactivate admin?',
    'You will need to re-enter the password to enable admin mode again.',
    'Deactivate',
    'btn btn-secondary',
    () => {
      isAdmin = false;
      try { sessionStorage.removeItem('sv_admin'); } catch(e) {}
      syncAdminUI();
      updateAdminContentUI();
      buildScheduleCard();
      showToast('Admin mode off', '');
    }
  );
}

function syncAdminUI() {
  const unlockSec = el('admin-unlock-section');
  const activeSec = el('admin-active-section');
  if (unlockSec) unlockSec.style.display = isAdmin ? 'none'  : 'block';
  if (activeSec) activeSec.style.display = isAdmin ? 'block' : 'none';
  const pw  = el('admin-pw-input');
  const err = el('admin-pw-error');
  if (pw)  pw.value = '';
  if (err) err.textContent = '';
  const t = document.documentElement.getAttribute('data-theme') || 'dark';
  document.querySelectorAll('.theme-chk').forEach(c => { c.checked = (t === 'dark'); });
}

function updateAdminContentUI() {
  updateExamChip();
  buildSubjChips();
  const ta = el('target-achieved');
  const tl = el('targets-lbl');
  if (ta) ta.style.display = isAdmin ? 'block' : 'none';
  if (tl) tl.style.display = isAdmin ? 'block' : 'none';
  const hasUser   = !!(currentUser || !window.FIREBASE_ENABLED);
  const specLock   = el('spec-lock-view');
  const specUnlock = el('spec-unlocked-view');
  if (specLock)   specLock.style.display   = hasUser ? 'none'  : 'flex';
  if (specUnlock) specUnlock.style.display = hasUser ? 'block' : 'none';
  const resAdmin = el('res-admin-view');
  if (resAdmin) resAdmin.style.display = isAdmin ? 'block' : 'none';
  if (isAdmin && activeTab === 'spec')      renderSpec();
  if (isAdmin && activeTab === 'resources') { resourcesBuilt = false; renderResources(); }
}


// ===================== TOAST =====================

let toastTimer = null;

function showToast(title, sub, ok) {
  if (ok === undefined) ok = true;
  const t = el('toast');
  if (!t) return;
  setText('toast-title', title);
  setText('toast-sub',   sub || '');
  const icon = t.querySelector('.toast-icon');
  if (icon) icon.style.color = ok ? 'var(--brk)' : 'var(--log)';
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 4000);
}

function hideToast() {
  const t = el('toast');
  if (t) t.classList.remove('show');
}


// ===================== AUDIO =====================

let actx = null, audioUnlocked = false;

function getAC() {
  if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  return actx;
}

async function unlockAudio() {
  if (audioUnlocked) return;
  try {
    const ctx = getAC();
    if (ctx.state === 'suspended') await ctx.resume();
    audioUnlocked = true;
  } catch(e) {}
}

async function tone(type) {
  if (!CFG || !CFG.sound) return;
  try {
    const ctx = getAC();
    if (ctx.state === 'suspended') await ctx.resume();
    const notes = {
      start: [[440, .07], [550, .07], [660, .16]],
      end:   [[660, .1],  [550, .1],  [440, .22]],
      warn:  [[600, .16], [400, .22]],
      done:  [[523, .09], [659, .09], [784, .11], [1047, .22]],
      soft:  [[880, .05]]
    };
    let t = ctx.currentTime;
    (notes[type] || notes.soft).forEach(([f, d]) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.value = f;
      o.type = 'sine';
      g.gain.setValueAtTime(.2, t);
      g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.start(t);
      o.stop(t + d + .01);
      t += d * .82;
    });
  } catch(e) {}
}

async function askNotif() {
  if (!('Notification' in window)) return;
  const p = await Notification.requestPermission();
  CFG.notif = p === 'granted';
  saveCFG();
  const tgl = el('tgl-notif');
  if (tgl) tgl.checked = CFG.notif;
}

function notify(title, body, urgent) {
  if (CFG && CFG.notif && Notification.permission === 'granted') {
    try { new Notification(title, { body, silent: !urgent }); } catch(e) {}
  }
  if ('vibrate' in navigator) navigator.vibrate(urgent ? [200, 80, 200] : [100, 50, 100]);
}


// ===================== TABS =====================

const TAB_RADIO = { home: 'nr-home', stats: 'nr-stats', spec: 'nr-spec', resources: 'nr-res' };

function showTab(name) {
  activeTab = name;
  ['home-screen', 'stats-screen', 'spec-screen', 'resources-screen',
   'timer-screen', 'break-screen', 'log-screen'].forEach(sid => {
    const e = el(sid);
    if (e) e.classList.remove('active');
  });
  const target = el(name + '-screen');
  if (target) target.classList.add('active');

  const radioId = TAB_RADIO[name];
  if (radioId) { const r = el(radioId); if (r && !r.checked) r.checked = true; }
  const nav = el('bottom-nav');
  if (nav) nav.classList.remove('hidden');

  requestAnimationFrame(() => updateNavIndicator(name));

  if (name === 'stats')     refreshStats();
  if (name === 'spec')      renderSpec();
  if (name === 'resources') renderResources();
}

function showTimerScreen(id) {
  ['home-screen', 'stats-screen', 'spec-screen', 'resources-screen',
   'timer-screen', 'break-screen', 'log-screen'].forEach(sid => {
    const e = el(sid);
    if (e) e.classList.toggle('active', sid === id);
  });
  const nav = el('bottom-nav');
  if (nav) nav.classList.add('hidden');
}

function returnToHome() {
  clearInterval(S.ticker);
  S.ticker = null;
  stopReminders();
  stopBreathe();
  dismissCheckin();
  releaseLock2();
  ['timer-screen', 'break-screen', 'log-screen'].forEach(sid => {
    const e = el(sid);
    if (e) e.classList.remove('active');
  });
  showTab(activeTab || 'home');
}

function applySettings() {
  if (!CFG) return;
  Object.keys(CFG).forEach(k => {
    const e = el('tgl-' + k);
    if (e) e.checked = !!CFG[k];
  });
}

function toggleSetting(checkbox, key) {
  if (!CFG) return;
  CFG[key] = checkbox.checked;
  saveCFG();
  if (key === 'notif' && CFG.notif) askNotif();
}

function confirmClearData() {
  openConfirm(
    'Clear all data?',
    'Permanently deletes all session history, spec confidence, and spaced repetition data. This cannot be undone.',
    'Clear everything',
    'btn btn-danger',
    () => {
      clearAllData();
      CFG = { ...DEFAULT_CFG };
      refreshStats();
      buildScheduleCard();
      buildSRCard();
      updateProgressBar();
      showToast('Data cleared', 'All sessions removed', false);
    }
  );
}


// ===================== EXAM CHIP =====================

function daysToDate(d) {
  const target = new Date(d);
  const today  = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86400000);
}

function updateExamChip() {
  const chip = el('exam-chip');
  if (!chip) return;
  if (!isAdmin) { chip.classList.remove('visible'); return; }
  const upcoming = EXAMS
    .map(e => ({ ...e, days: daysToDate(e.date) }))
    .filter(e => e.days >= 0)
    .sort((a, b) => a.days - b.days);
  if (!upcoming.length) { chip.classList.remove('visible'); return; }
  const next = upcoming[0];
  chip.textContent = `${next.subj} ${next.days === 0 ? 'Today!' : next.days + 'd'}`;
  chip.classList.add('visible');
}


// ===================== SCHEDULE CARD =====================

function checkTodayDone() {
  const t = new Date().toDateString();
  if (!TODAY_DONE || TODAY_DONE.date !== t) {
    TODAY_DONE = { date: t, s1: false, s2: false, s3: false };
    saveTodayDone();
  }
}

function updateProgressBar() {
  checkTodayDone();
  const done = [TODAY_DONE.s1, TODAY_DONE.s2, TODAY_DONE.s3].filter(Boolean).length;
  const bar = el('session-progress-fill');
  if (bar) bar.style.width = (done / 3 * 100) + '%';
}

function updateStartBtn() {
  const btn = el('btn-start');
  if (!btn) return;
  const d = { blurt: '25 min', paper: '55 min', flash: '30 min', teach: '35 min', practise: '55 min', custom: 'Custom' };
  btn.textContent = 'Start Session - ' + (d[selM] || 'Go');
}

function buildQuickStart() {
  checkTodayDone();
  const dow = new Date().getDay();
  const td  = TIMETABLE[dow];
  if (!td) return;
  const slots = [td.s1.subj, td.s2.subj, td.s3.subj];
  const keys  = ['s1', 's2', 's3'];
  let next = -1;
  for (let i = 0; i < 3; i++) { if (!TODAY_DONE[keys[i]]) { next = i; break; } }
  const qs = el('quickstart');
  if (!qs) return;
  if (next < 0) { qs.style.display = 'none'; return; }
  qs.style.display = 'flex';
  const qsText = el('qs-text');
  if (qsText) qsText.textContent = isAdmin ? slots[next] : `Session ${next + 1}`;
}

function buildScheduleCard() {
  checkTodayDone();
  const dow  = new Date().getDay();
  const td   = TIMETABLE[dow];
  if (!td) return;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  setText('sc-title', `${days[dow]}'s Plan`);
  const doneCount = [TODAY_DONE.s1, TODAY_DONE.s2, TODAY_DONE.s3].filter(Boolean).length;
  setText('sc-badge', `${doneCount}/3 done`);
  const s1 = isAdmin ? td.s1.subj : 'Session 1';
  const s2 = isAdmin ? td.s2.subj : 'Session 2';
  const s3 = isAdmin ? td.s3.subj : 'Session 3';
  const mkRow = (n, subj, done, curr) =>
    `<div class="sc-row">
       <div class="sc-n ${done ? 'done' : curr ? 'curr' : ''}">${done ? '\u2713' : n}</div>
       <div class="sc-subj">${escHtml(subj)}</div>
     </div>`;
  const sessEl = el('sc-sessions');
  if (sessEl) sessEl.innerHTML =
    mkRow(1, s1, TODAY_DONE.s1, !TODAY_DONE.s1) +
    mkRow(2, s2, TODAY_DONE.s2, TODAY_DONE.s1 && !TODAY_DONE.s2) +
    mkRow(3, s3, TODAY_DONE.s3, TODAY_DONE.s1 && TODAY_DONE.s2 && !TODAY_DONE.s3);
  const progEl = el('sc-progress');
  if (progEl) progEl.innerHTML = [1, 2, 3].map(i =>
    `<div class="sp-dot ${TODAY_DONE['s' + i] ? 'done' : ''}"></div>`).join('');
  buildQuickStart();
  updateProgressBar();
}


// ===================== QUICK START WITH CONFIRM =====================

function quickStart() {
  checkTodayDone();
  const dow   = new Date().getDay();
  const td    = TIMETABLE[dow];
  if (!td) return;
  const slots = [td.s1.subj, td.s2.subj, td.s3.subj];
  const keys  = ['s1', 's2', 's3'];
  let next = -1;
  for (let i = 0; i < 3; i++) { if (!TODAY_DONE[keys[i]]) { next = i; break; } }
  if (next < 0) return;

  const subjName   = isAdmin ? slots[next] : `Session ${next + 1}`;
  const methodName = METHODS[selM === 'custom' ? 'paper' : selM]?.name || 'Past Paper';

  openConfirm(
    `Start ${subjName}?`,
    `${methodName} session. Make sure you have everything you need before you begin.`,
    'Start now',
    'btn btn-primary',
    () => {
      S.subject = isAdmin ? slots[next] : 'General';
      S.type = selM;
      S.scheduleMode = true;
      const m = METHODS[selM === 'custom' ? 'paper' : selM];
      if (!m) return;
      S.phases = JSON.parse(JSON.stringify(m.phases)).map(p => ({
        ...p, sessionLabel: S.subject, method: selM === 'custom' ? 'paper' : selM
      }));
      beginSession();
    }
  );
}


// ===================== SCHEDULE OVERLAY =====================

let schedDragStart = null;

function openSchedOv() {
  const dow  = new Date().getDay();
  const td   = TIMETABLE[dow];
  if (!td) return;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  setText('sched-ov-title', `${days[dow]}'s Plan`);
  const mkRow = (n, subj, detail, done) =>
    `<div class="sched-ov-row">
       <div class="sched-ov-n ${done ? 'done' : ''}">${done ? '\u2713' : n}</div>
       <div style="flex:1">
         <div style="font-size:13px;font-weight:700;color:var(--text)">${escHtml(subj)}</div>
         ${detail ? `<div style="font-size:11px;color:var(--hint);margin-top:3px;line-height:1.5">${escHtml(detail)}</div>` : ''}
       </div>
     </div>`;
  const bodyEl = el('sched-ov-body');
  const show = isAdmin;
  if (bodyEl) bodyEl.innerHTML =
    mkRow(1, show ? td.s1.subj : 'Session 1', '', TODAY_DONE.s1) +
    mkRow(2, show ? td.s2.subj : 'Session 2', '', TODAY_DONE.s2) +
    mkRow(3, show ? td.s3.subj : 'Session 3', show ? (td.s3detail || '') : '', TODAY_DONE.s3);
  const ov = el('sched-ov');
  if (!ov) return;
  ov.classList.add('open');
  const sheet = ov.querySelector('.sched-ios-sheet');
  if (sheet) { sheet.style.transform = ''; sheet.style.transition = ''; }
  initSchedDrag();
}

function closeSchedOv() {
  const ov = el('sched-ov');
  if (!ov) return;
  const sheet = ov.querySelector('.sched-ios-sheet');
  if (sheet) {
    sheet.style.transition = 'transform .3s cubic-bezier(.22,.8,.3,1)';
    sheet.style.transform  = 'translateY(100%)';
    setTimeout(() => {
      ov.classList.remove('open');
      sheet.style.transform  = '';
      sheet.style.transition = '';
    }, 300);
  } else {
    ov.classList.remove('open');
  }
}

function initSchedDrag() {
  const ov = el('sched-ov');
  if (!ov) return;
  const sheet = ov.querySelector('.sched-ios-sheet');
  if (!sheet || sheet._dragInited) return;
  sheet._dragInited = true;
  sheet.addEventListener('touchstart', e => {
    schedDragStart = e.touches[0].clientY;
    sheet.style.transition = 'none';
  }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (schedDragStart === null) return;
    const d = e.touches[0].clientY - schedDragStart;
    if (d > 0) sheet.style.transform = `translateY(${d}px)`;
  }, { passive: true });
  sheet.addEventListener('touchend', e => {
    const d = e.changedTouches[0].clientY - (schedDragStart || 0);
    sheet.style.transition = 'transform .3s cubic-bezier(.22,.8,.3,1)';
    if (d > 80) closeSchedOv(); else sheet.style.transform = '';
    schedDragStart = null;
  }, { passive: true });
}

function startScheduleMode() {
  closeSchedOv();
  const dow = new Date().getDay();
  const td  = TIMETABLE[dow];
  if (!td) return;
  checkTodayDone();
  const subj = isAdmin
    ? (!TODAY_DONE.s1 ? td.s1.subj : !TODAY_DONE.s2 ? td.s2.subj : td.s3.subj)
    : 'General';

  openConfirm(
    "Start today's schedule?",
    `Beginning with ${escHtml(subj)}. Clear your desk, silence notifications, and focus.`,
    'Start schedule',
    'btn btn-primary',
    () => {
      S.subject = subj;
      S.type = 'schedule';
      S.scheduleMode = true;
      const m = METHODS['paper'];
      if (!m) return;
      S.phases = JSON.parse(JSON.stringify(m.phases)).map(p => ({
        ...p, sessionLabel: subj, method: 'paper'
      }));
      beginSession();
    }
  );
}


// ===================== SUBJECT CHIPS =====================

function buildSubjChips() {
  const chips = el('subj-chips');
  if (!chips) return;
  const dow    = new Date().getDay();
  const td     = TIMETABLE[dow];
  const todaySubjs = (isAdmin && td)
    ? [td.s1.subj, td.s2.subj].filter((s, i, a) => a.indexOf(s) === i)
    : [];
  const ordered = [...new Set([...todaySubjs, ...SUBJECTS.map(s => s.name)])];
  chips.innerHTML = ordered.map(name => {
    const hi    = todaySubjs.includes(name) && isAdmin;
    const safeN = escHtml(name);
    // Use data attribute to avoid single-quote injection in onclick
    return `<span class="subj-chip-btn" data-name="${safeN}"
      style="padding:5px 12px;background:${hi ? 'var(--acc-l)' : 'var(--s1)'};border:1px solid ${hi ? 'rgba(16,152,247,.2)' : 'var(--border)'};border-radius:20px;font-size:12px;font-weight:${hi ? 700 : 500};cursor:pointer;color:${hi ? 'var(--acc-t)' : 'var(--muted)'};display:inline-block;margin:2px 0;transition:opacity .15s">${safeN}</span>`;
  }).join('');
  // Delegate click to avoid inline JS with user-controlled strings
  chips.onclick = e => {
    const btn = e.target.closest('.subj-chip-btn');
    if (!btn) return;
    const subjEl = el('subj');
    if (subjEl) subjEl.value = btn.dataset.name;
  };
}


// ===================== METHOD SELECTION =====================

function selMethod(cardEl) {
  document.querySelectorAll('.method-card').forEach(c => c.classList.remove('sel'));
  cardEl.classList.add('sel');
  selM = cardEl.dataset.m;
  const cr = el('custom-row');
  if (cr) cr.style.display = selM === 'custom' ? 'grid' : 'none';
  updateStartBtn();
}


// ===================== CONFIRM OVERLAY =====================

function openConfirm(title, body, okLabel, okStyle, cb) {
  confirmCallback = cb;
  const ct  = el('confirm-title');
  const cb2 = el('confirm-body');
  const btn = el('confirm-ok');
  if (ct)  ct.textContent  = title;
  if (cb2) cb2.textContent = body;
  if (btn) { btn.textContent = okLabel; btn.className = okStyle; }
  const ov = el('confirm-ov');
  if (ov) ov.classList.add('open');
}

function closeConfirm() {
  const ov = el('confirm-ov');
  if (ov) ov.classList.remove('open');
  confirmCallback = null;
}

function doConfirm() {
  const cb = confirmCallback;
  closeConfirm();
  if (cb) cb();
}


// ===================== DANGER ZONE ACCORDION =====================

function toggleDanger(h) {
  const body  = h.nextElementSibling;
  const arrow = h.querySelector('.danger-arrow');
  if (!body) return;
  const open = body.classList.toggle('open');
  if (arrow) arrow.style.transform = open ? 'rotate(180deg)' : '';
}


// ===================== CUSTOM EXAMS =====================

function openAddExam()  { const ov = el('add-exam-ov'); if (ov) ov.classList.add('open'); }
function closeAddExam() { const ov = el('add-exam-ov'); if (ov) ov.classList.remove('open'); }

function saveCustomExam() {
  const subj  = el('add-exam-subj')  ? el('add-exam-subj').value.trim()  : '';
  const paper = el('add-exam-paper') ? el('add-exam-paper').value.trim() : '';
  const date  = el('add-exam-date')  ? el('add-exam-date').value         : '';
  if (!subj || !date) { showToast('Missing fields', 'Enter subject and date', false); return; }
  try {
    const stored = JSON.parse(localStorage.getItem('rv_custom_exams') || '[]');
    stored.push({ subj, paper, date, custom: true });
    localStorage.setItem('rv_custom_exams', JSON.stringify(stored));
  } catch(e) {}
  closeAddExam();
  renderExamList();
  showToast('Exam added', subj);
}


// ===================== SESSION CONTROL =====================

function normalizeSubj(s) {
  const k = s.trim().toLowerCase();
  return SUBJ_MAP[k] || (s.trim().charAt(0).toUpperCase() + s.trim().slice(1));
}

function confirmSkip() {
  const next = S.phases[S.phaseIdx + 1];
  const nn   = next ? (next.t === 'log' ? 'error log' : next.t === 'brk' ? 'break' : 'focus') : 'done';
  openConfirm('Skip phase?', `Jump to ${nn}.`, 'Skip', 'btn btn-secondary', () => {
    clearInterval(S.ticker);
    S.ticker = null;
    stopBreathe();
    dismissCheckin();
    stopReminders();
    enterPhase(S.phaseIdx + 1);
  });
}

function confirmEnd() {
  openConfirm('End session?', 'Your focus time will be saved to stats.', 'End session', 'btn btn-danger', () => {
    clearInterval(S.ticker);
    S.ticker = null;
    stopReminders();
    stopBreathe();
    dismissCheckin();
    releaseLock2();
    recordSession();
    returnToHome();
    buildScheduleCard();
  });
}


// ===================== START SESSION WITH CONFIRM =====================

function startSession() {
  const raw = el('subj');
  const subjectVal = raw && raw.value.trim() ? normalizeSubj(raw.value.trim()) : '';

  if (!subjectVal) {
    openConfirm(
      'No subject entered',
      'Starting without a subject will log this session as "General". Add a subject for better stats.',
      'Start anyway',
      'btn btn-primary',
      () => _doStartSession('General')
    );
    return;
  }

  const methodName = METHODS[selM]?.name || 'Custom';
  const durations  = { blurt: '25 min', paper: '55 min', flash: '30 min', teach: '35 min', practise: '55 min', custom: 'custom time' };
  const dur        = durations[selM] || '';

  openConfirm(
    `Start ${escHtml(subjectVal)}?`,
    `${methodName} \u00b7 ${dur}. Clear your space, put your phone away, and commit to the session.`,
    'Start session',
    'btn btn-primary',
    () => _doStartSession(subjectVal)
  );
}

function _doStartSession(subject) {
  S.subject = subject;
  S.type = selM;
  S.scheduleMode = false;
  if (selM === 'custom') {
    const focusEl = el('cust-focus');
    const breakEl = el('cust-break');
    const fm = Math.max(5,  Math.min(180, parseInt((focusEl && focusEl.value) || '45') || 45));
    const bm = Math.max(0,  Math.min(60,  parseInt((breakEl && breakEl.value) || '0')  || 0));
    S.phases = [{ t: 'focus', d: fm * 60, l: 'Focus', s: `${fm} min`, sessionLabel: S.subject, method: 'custom' }];
    if (bm > 0) S.phases.push({ t: 'brk', d: bm * 60, l: 'Break', s: `${bm} min`, sessionLabel: S.subject, method: 'custom' });
    S.phases.push({ t: 'log', d: 0, sessionLabel: S.subject, method: 'custom' });
  } else {
    const m = METHODS[selM];
    if (!m) return;
    S.phases = JSON.parse(JSON.stringify(m.phases)).map(p => ({ ...p, sessionLabel: S.subject, method: selM }));
  }
  beginSession();
}

function beginSession() {
  S.phaseIdx = 0;
  S.sessionN++;
  S.actualFocusSecs = 0;
  S.checkinScores   = [];
  S.energy    = 0;
  markCatSel  = '';
  enterPhase(0);
  if (CFG && CFG.notif) askNotif();
}

function enterPhase(idx) {
  clearInterval(S.ticker);
  S.ticker = null;
  S.phaseIdx = idx;
  const ph = S.phases[idx];
  if (!ph) { sessionComplete(); return; }
  S.timeLeft  = ph.d;
  S.totalTime = ph.d;
  S.paused    = false;
  if (ph.t === 'log') { stopReminders(); showLogScreen(ph); return; }
  if (ph.t === 'brk') {
    showTimerScreen('break-screen');
    renderBreakScreen(ph);
    tone('end');
    startBreathe();
  } else {
    showTimerScreen('timer-screen');
    renderTimerScreen(ph);
    tone('start');
    startReminders(ph.d);
    scheduleCheckin(ph.d);
    requestWakeLock();
  }
  notify(ph.l, ph.sessionLabel || '', false);
  if (ph.d > 0) S.ticker = setInterval(tick, 1000);
  else enterPhase(idx + 1);
}

function tick() {
  if (S.paused) return;
  S.timeLeft = Math.max(0, S.timeLeft - 1);
  const ph = S.phases[S.phaseIdx];
  if (ph && ph.t === 'focus') S.actualFocusSecs++;
  renderTimeDisplay();
  if (S.timeLeft === 60) tone('warn');
  if (S.timeLeft === 0)  { clearInterval(S.ticker); S.ticker = null; enterPhase(S.phaseIdx + 1); }
}

function renderTimeDisplay() {
  const ph = S.phases[S.phaseIdx];
  if (!ph) return;
  const s = fmt(S.timeLeft);
  if (ph.t === 'brk') {
    setText('brk-time', s);
  } else {
    setText('t-time', s);
    const ring = el('ring');
    if (ring && S.totalTime > 0) ring.style.strokeDashoffset = String(CIRC * (1 - S.timeLeft / S.totalTime));
  }
}

function togglePause() {
  S.paused = !S.paused;
  const label = S.paused ? 'Resume' : 'Pause';
  ['btn-pause', 'brk-pause'].forEach(id => setText(id, label));
}

function renderTimerScreen(ph) {
  setText('phase-lbl', ph.l || 'Focus');
  setText('t-sub',     ph.s || '');
  setText('t-subj',    ph.sessionLabel || S.subject || 'Session');
  setText('t-time',    fmt(ph.d));
  setText('btn-pause', 'Pause');
  const ring = el('ring');
  if (ring) ring.style.strokeDashoffset = '0';
  const m      = METHODS[ph.method];
  const iconEl = el('timer-method-icon');
  if (iconEl) iconEl.textContent = m ? m.icon : '';
  renderDots();
}

function renderBreakScreen(ph) {
  setText('brk-lbl',      ph.l || 'Break');
  setText('brk-time',     fmt(ph.d));
  setText('brk-sublabel', ph.s || 'Hydrate, stretch, rest your eyes');
  const nxt = S.phases[S.phaseIdx + 1];
  setText('brk-next', nxt && nxt.t !== 'log' ? `Next: ${nxt.l}` : '');
  setText('brk-pause', 'Pause');
}

function renderDots() {
  const c = el('pdots');
  if (!c) return;
  c.innerHTML = '';
  const COL = { focus: 'var(--acc)', brk: 'var(--brk)', log: 'var(--log)' };
  S.phases.forEach((p, i) => {
    const d = document.createElement('div');
    d.className = 'pdot';
    if (i < S.phaseIdx)        { d.style.background = 'var(--brk)'; d.classList.add('done'); }
    else if (i === S.phaseIdx) { d.style.background = COL[p.t] || 'var(--acc)'; d.classList.add('active'); }
    c.appendChild(d);
  });
}


// ===================== BREATHE =====================

const BRK_MSGS = ['Breathe in...', 'Hold...', 'Breathe out...', 'Hold...'];
const BRK_DUR  = [4000, 2000, 4000, 2000];
let brkStep = 0;

function startBreathe() { stopBreathe(); brkStep = 0; nextBrk(); }

function nextBrk() {
  const e = el('brk-breathe');
  if (e) e.textContent = BRK_MSGS[brkStep % 4];
  S.breatheT = setTimeout(() => { brkStep++; nextBrk(); }, BRK_DUR[brkStep % 4]);
}

function stopBreathe() { clearTimeout(S.breatheT); S.breatheT = null; }


// ===================== WAKE LOCK =====================

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) S.wakelock = await navigator.wakeLock.request('screen');
  } catch(e) {}
}

function releaseLock2() {
  try { if (S.wakelock) { S.wakelock.release(); S.wakelock = null; } } catch(e) {}
}


// ===================== LOG SCREEN =====================

function showLogScreen(ph) {
  showTimerScreen('log-screen');
  const hdr = el('log-header');
  if (hdr) hdr.textContent = ph.sessionLabel ? `${ph.sessionLabel} done` : 'Session complete';
  const logSubjEl = el('log-subj');
  if (logSubjEl) logSubjEl.value = (S.subject && S.subject !== 'General') ? S.subject : '';
  ['log-topic', 'log-wrong', 'log-correct', 'log-avoid', 'log-question'].forEach(id => {
    const e = el(id);
    if (e) e.value = '';
  });
  ['log-got', 'log-total'].forEach(id => {
    const e = el(id);
    if (e) e.value = '';
  });
  document.querySelectorAll('.e-btn,.mark-cat-btn').forEach(b =>
    b.classList.remove('sel', 'sel-app', 'sel-know', 'sel-term')
  );
  const spaced = el('tgl-spaced');
  if (spaced) spaced.checked = false;
  const mg = el('mark-guidance');
  if (mg) mg.classList.remove('vis');
  const cb = el('copy-btn');
  if (cb) { cb.classList.remove('copied'); cb.innerHTML = '<span>Copy for Notion</span><span style="font-size:15px">&#128203;</span>'; }
  markCatSel = '';
  S.energy   = 0;
  tone('done');
  notify('Session done', 'Log your errors.', true);
  releaseLock2();
}

function selEnergy(btn) {
  document.querySelectorAll('.e-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  S.energy = parseInt(btn.dataset.e) || 0;
}

function selMarkCat(btn, cat) {
  document.querySelectorAll('.mark-cat-btn').forEach(b => b.classList.remove('sel-app', 'sel-know', 'sel-term'));
  btn.classList.add('sel-' + cat);
  markCatSel = cat;
  const guidance = {
    app:  '<strong>Application</strong>: You knew the content but missed the connection. Fix: more timed exam questions. Read each question twice.',
    know: '<strong>Knowledge gap</strong>: You could not recall a fact or process. Fix: add to flashcards today and drill until automatic.',
    term: '<strong>Terminology</strong>: Wrong word or missed a mark scheme term. Fix: study the mark scheme and highlight every term you missed.'
  };
  const g = el('mark-guidance');
  if (g) { g.innerHTML = guidance[cat] || ''; g.classList.add('vis'); }
}

function copyForNotion() {
  const now     = new Date();
  const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  const subj     = (el('log-subj')      && el('log-subj').value.trim())      || S.subject;
  const got      = (el('log-got')       && el('log-got').value.trim())        || '';
  const tot      = (el('log-total')     && el('log-total').value.trim())      || '';
  const topic    = (el('log-topic')     && el('log-topic').value.trim())      || '';
  const question = (el('log-question')  && el('log-question').value.trim())   || '';
  const wrong    = (el('log-wrong')     && el('log-wrong').value.trim())      || '';
  const correct  = (el('log-correct')   && el('log-correct').value.trim())    || '';
  const avoid    = (el('log-avoid')     && el('log-avoid').value.trim())      || '';
  const catMap   = { app: 'Application', know: 'Knowledge', term: 'Terminology' };
  const row = [dateStr, subj, topic, question, catMap[markCatSel] || '', got && tot ? `${got}/${tot}` : '', wrong, correct, avoid].join('\t');
  const cb  = el('copy-btn');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(row).then(() => {
      if (cb) {
        cb.classList.add('copied');
        cb.innerHTML = '<span>Copied</span><span>\u2713</span>';
        setTimeout(() => {
          cb.classList.remove('copied');
          cb.innerHTML = '<span>Copy for Notion</span><span style="font-size:15px">&#128203;</span>';
        }, 2500);
      }
    }).catch(() => fallbackCopy(row));
  } else {
    fallbackCopy(row);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity  = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch(e) {}
  document.body.removeChild(ta);
}

function doneLog(skip) {
  const logSubj = el('log-subj');
  if (logSubj && logSubj.value.trim()) S.subject = normalizeSubj(logSubj.value.trim());
  if (!skip) {
    const topic  = el('log-topic');
    const spaced = el('tgl-spaced');
    if (topic && topic.value.trim() && spaced && spaced.checked) addToSR(topic.value.trim(), S.subject);
  }
  recordSession();
  stopBreathe();
  releaseLock2();
  returnToHome();
  refreshStats();
  buildScheduleCard();
}

function sessionComplete() {
  tone('done');
  notify('All done!', 'Great work.', true);
  recordSession();
  releaseLock2();
  returnToHome();
  refreshStats();
  buildScheduleCard();
}


// ===================== RECORD SESSION =====================

function markScheduledDone() {
  checkTodayDone();
  const dow  = new Date().getDay();
  const td   = TIMETABLE[dow];
  if (!td) return;
  const slots    = ['s1', 's2', 's3'];
  const schSubjs = [td.s1.subj, td.s2.subj, td.s3.subj];
  for (let i = 0; i < 3; i++) {
    if (!TODAY_DONE[slots[i]]) {
      const sched = schSubjs[i].toLowerCase();
      const sess  = S.subject.toLowerCase();
      if (S.scheduleMode || sched.includes(sess) || sess.includes(sched) ||
          sched.split(' ').some(w => w.length > 3 && sess.includes(w))) {
        TODAY_DONE[slots[i]] = true;
        saveTodayDone();
        const done = [TODAY_DONE.s1, TODAY_DONE.s2, TODAY_DONE.s3].filter(Boolean).length;
        showToast('Session done', done === 3 ? 'All 3 done today. Great work.' : `${done}/3 sessions done`);
        break;
      }
    }
  }
}

function recordSession() {
  const focusMins = Math.max(1, Math.round(S.actualFocusSecs / 60));
  STATS.total = (STATS.total || 0) + 1;
  STATS.mins  = (STATS.mins  || 0) + focusMins;
  if (!Array.isArray(STATS.hist)) STATS.hist = [];
  STATS.hist.unshift({
    date:    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    dateStr: new Date().toDateString(),
    subj:    S.subject,
    method:  S.type,
    mins:    focusMins,
    energy:  S.energy,
    markCat: markCatSel
  });
  if (STATS.hist.length > 90) STATS.hist.pop();
  saveStats();
  markScheduledDone();
}


// ===================== REMINDERS =====================

function startReminders(dur) {
  stopReminders();
  if (CFG && CFG.eye)   S.eyeT   = setInterval(() => flash('b-eye',   4000), 20 * 60 * 1000);
  if (CFG && CFG.hydra) S.hydraT = setInterval(() => flash('b-hydra', 4000), 45 * 60 * 1000);
  if (dur >= 25 * 60) S.gratT  = setTimeout(() => flash('b-gratitude', 5000), 25 * 60 * 1000);
  if (dur >= 35 * 60) S.standT = setTimeout(() => flash('b-stand',     5000), 35 * 60 * 1000);
}

function flash(id, ms) {
  const e  = el(id);
  const ts = el('timer-screen');
  if (!e || !ts || !ts.classList.contains('active')) return;
  e.classList.add('show');
  tone('soft');
  setTimeout(() => e.classList.remove('show'), ms);
}

function stopReminders() {
  [S.eyeT, S.hydraT].forEach(t => { if (t != null) clearInterval(t); });
  [S.gratT, S.standT].forEach(t => { if (t != null) clearTimeout(t); });
  S.eyeT = S.hydraT = S.gratT = S.standT = null;
}

function scheduleCheckin(rem) {
  clearTimeout(S.checkinT);
  if (!CFG || !CFG.checkin || rem < 8 * 60) return;
  S.checkinT = setTimeout(showCheckin, (7 + Math.random() * 5) * 60 * 1000);
}

function showCheckin() {
  const ts = el('timer-screen');
  if (!ts || !ts.classList.contains('active')) return;
  if (S.paused) { scheduleCheckin(S.timeLeft); return; }
  const co = el('checkin-ov');
  if (co) co.classList.add('vis');
  S.checkinDismissT = setTimeout(dismissCheckin, 15000);
}

function logCheckin(score, optEl) {
  document.querySelectorAll('.checkin-opt').forEach(o => o.classList.remove('picked'));
  optEl.classList.add('picked');
  S.checkinScores.push(score);
  clearTimeout(S.checkinDismissT);
  if (score <= 2) setTimeout(() => flash('b-boxbreath', 6000), 700);
  setTimeout(dismissCheckin, 600);
}

function dismissCheckin() {
  clearTimeout(S.checkinDismissT);
  const co = el('checkin-ov');
  if (co) co.classList.remove('vis');
  document.querySelectorAll('.checkin-opt').forEach(o => o.classList.remove('picked'));
  scheduleCheckin(S.timeLeft);
}


// ===================== STATS =====================

function getHistInPeriod() {
  const hist = Array.isArray(STATS.hist) ? STATS.hist : [];
  if (statPeriod === 'week') {
    const ws = new Date();
    ws.setDate(ws.getDate() - ws.getDay());
    ws.setHours(0, 0, 0, 0);
    return hist.filter(h => h.dateStr && new Date(h.dateStr) >= ws);
  }
  if (statPeriod === 'month') {
    const ms = new Date();
    ms.setDate(ms.getDate() - 30);
    ms.setHours(0, 0, 0, 0);
    return hist.filter(h => h.dateStr && new Date(h.dateStr) >= ms);
  }
  return hist;
}

function setPeriod(p) {
  statPeriod = p;
  const lblMap = { week: 'This week', month: 'This month', all: 'All time' };
  const lbl    = el('st-period-lbl');
  if (lbl) lbl.textContent = lblMap[p] || 'This week';
  const ctitle = el('chart-title-lbl');
  if (ctitle) ctitle.textContent =
    p === 'week'  ? 'This week (minutes)' :
    p === 'month' ? 'Last 30 days (minutes)' :
                    'All time (minutes)';
  refreshStats();
}

function refreshStats() {
  const today      = new Date().toDateString();
  const hist       = Array.isArray(STATS.hist) ? STATS.hist : [];
  const todayMins  = hist.filter(h => h.dateStr === today).reduce((a, h) => a + (h.mins || 0), 0);
  const periodHist = getHistInPeriod();
  const periodMins = periodHist.reduce((a, h) => a + (h.mins || 0), 0);
  const periodCount = periodHist.length;
  setText('st-today', String(todayMins  || 0));
  setText('st-week',  String(periodMins || 0));
  setText('st-total', String(STATS.total || 0));
  setText('st-mins',  String(STATS.mins  || 0));
  const lbl = el('st-period-lbl');
  if (lbl) {
    const m = { week: 'This week', month: 'This month', all: 'All time' };
    lbl.textContent = `${m[statPeriod] || 'This week'} (${periodCount} session${periodCount !== 1 ? 's' : ''})`;
  }
  renderWeekChart();
  renderSubjBars();
  if (isAdmin) renderTargetVsAchieved();
}

let _chartRAF = 0;

function renderWeekChart() {
  cancelAnimationFrame(_chartRAF);
  _chartRAF = requestAnimationFrame(_doRenderWeekChart);
}

function _doRenderWeekChart() {
  const canvas = el('week-chart');
  if (!canvas) return;
  const W = canvas.offsetWidth;
  if (!W) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  canvas.width  = W * dpr;
  canvas.height = 90 * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = '90px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const days  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const data  = [];
  for (let i = 6; i >= 0; i--) {
    const d  = new Date(today);
    d.setDate(d.getDate() - i);
    const ds   = d.toDateString();
    const hist = Array.isArray(STATS.hist) ? STATS.hist : [];
    const mins = hist.filter(h => h.dateStr === ds).reduce((a, h) => a + (h.mins || 0), 0);
    data.push({ label: days[d.getDay()], mins, today: i === 0 });
  }
  const maxMins = Math.max(...data.map(d => d.mins), 60);
  const barW    = (W - 40) / 7 - 6;
  const chartH  = 68;
  ctx.clearRect(0, 0, W, 90);
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  data.forEach((d, i) => {
    const x    = 20 + i * ((W - 40) / 7);
    const barH = d.mins > 0 ? (d.mins / maxMins) * chartH : 2;
    const y    = chartH - barH + 8;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, 3);
    if (d.today && d.mins > 0) {
      const g = ctx.createLinearGradient(x, y, x, y + barH);
      g.addColorStop(0, '#60c8fb');
      g.addColorStop(1, '#1098f7');
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = d.mins > 0 ? (isDark ? '#3c5c48' : '#7aaa8a') : (isDark ? '#1c1f1f' : '#d8d8d3');
    }
    ctx.fill();
    ctx.fillStyle = isDark ? '#3a5044' : '#9aaa9a';
    ctx.font = '600 9px Outfit,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(d.label, x + barW / 2, 85);
    if (d.mins > 0) {
      ctx.fillStyle = d.today ? '#60c8fb' : (isDark ? '#4a7060' : '#5a8068');
      ctx.font = '700 9px Outfit,sans-serif';
      ctx.fillText(String(d.mins), x + barW / 2, y - 3);
    }
  });
}

function renderTargetVsAchieved() {
  const target = el('target-achieved');
  if (!target) return;
  const ws = new Date();
  ws.setDate(ws.getDate() - ws.getDay());
  ws.setHours(0, 0, 0, 0);
  const achieved = {};
  const hist = Array.isArray(STATS.hist) ? STATS.hist : [];
  hist.forEach(h => {
    if (h.dateStr && new Date(h.dateStr) >= ws && h.subj)
      achieved[h.subj] = (achieved[h.subj] || 0) + (h.mins || 0);
  });
  if (!Object.keys(achieved).length) {
    target.innerHTML = '<div style="font-size:13px;color:var(--hint);text-align:center;padding:6px">No sessions this week yet</div>';
    return;
  }
  target.innerHTML = SUBJECTS.map(s => {
    const done = achieved[s.name] || 0;
    const pct  = Math.min(100, Math.round(done / s.weeklyMins * 100));
    const met  = done >= s.weeklyMins;
    return `<div class="target-row">
      <div class="tr-top">
        <span class="tr-name">${escHtml(s.name)}</span>
        <span class="tr-nums ${met ? 'met' : ''}">${done}/${s.weeklyMins}m${met ? ' \u2713' : ''}</span>
      </div>
      <div class="tr-track"><div class="tr-fill ${met ? 'met' : ''}" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

function renderSubjBars() {
  const bars = el('subj-bars');
  if (!bars) return;
  const mins = {};
  const hist = Array.isArray(STATS.hist) ? STATS.hist : [];
  hist.forEach(h => { if (h.subj) mins[h.subj] = (mins[h.subj] || 0) + (h.mins || 0); });
  const sorted = Object.entries(mins).sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (!sorted.length) {
    bars.innerHTML = '<div class="stats-empty"><div class="stats-empty-icon">&#128202;</div><div class="stats-empty-title">No sessions yet</div><div class="stats-empty-sub">Your subject breakdown appears here after your first session.</div></div>';
    return;
  }
  const maxVal = sorted[0][1];
  bars.innerHTML = sorted.map(([subj, m]) =>
    `<div class="subj-bar-row">
       <div class="subj-bar-lbl">${escHtml(subj)}</div>
       <div class="subj-bar-track"><div class="subj-bar-fill" style="width:${(m / maxVal * 100).toFixed(0)}%"></div></div>
       <div class="subj-bar-n">${m}m</div>
     </div>`
  ).join('');
}


// ===================== SPEC =====================

function renderSpec() {
  const pills = el('spec-pills');
  const list  = el('spec-list');
  const prog  = el('spec-prog-row');
  if (!pills || !list || !prog) return;
  if (!SPEC[currentSpecSubj]) currentSpecSubj = Object.keys(SPEC)[0] || 'Maths';
  pills.innerHTML = Object.keys(SPEC).map(name =>
    `<div class="spec-pill${name === currentSpecSubj ? ' act' : ''}" onclick="switchSpec('${escHtml(name)}')">${escHtml(name)}</div>`
  ).join('');
  renderSpecContent(list, prog);
}

function switchSpec(name) {
  if (!SPEC[name]) return;
  currentSpecSubj = name;
  document.querySelectorAll('.spec-pill').forEach(p => p.classList.toggle('act', p.textContent === name));
  renderSpecContent(el('spec-list'), el('spec-prog-row'));
}

function renderSpecContent(list, prog) {
  if (!list || !prog) return;
  const specData = SPEC[currentSpecSubj];
  const conf     = SPEC_CONF[currentSpecSubj] || {};
  if (!specData) {
    list.innerHTML = '<div style="font-size:13px;color:var(--muted);padding:12px;text-align:center">Spec data coming soon.</div>';
    prog.innerHTML = '';
    return;
  }
  let green = 0, amber = 0, red = 0, none = 0, totalIdx = 0;
  specData.sections.forEach(sec => {
    sec.points.forEach(() => {
      const c = conf[totalIdx++];
      if      (c === 'green') green++;
      else if (c === 'amber') amber++;
      else if (c === 'red')   red++;
      else                    none++;
    });
  });

  const boardBadge = specData.examBoard
    ? `<div class="spec-exam-board-badge">${escHtml(specData.examBoard)}</div>`
    : '';

  prog.innerHTML = boardBadge +
    `<div style="display:flex;gap:8px;margin-bottom:14px">
       <div class="spec-prog-badge"><div class="spec-prog-n" style="color:#cc4038">${red}</div><div class="spec-prog-lbl">Red</div></div>
       <div class="spec-prog-badge"><div class="spec-prog-n" style="color:#be8816">${amber}</div><div class="spec-prog-lbl">Amber</div></div>
       <div class="spec-prog-badge"><div class="spec-prog-n" style="color:#3c7250">${green}</div><div class="spec-prog-lbl">Green</div></div>
       <div class="spec-prog-badge"><div class="spec-prog-n" style="color:var(--hint)">${none}</div><div class="spec-prog-lbl">Unrated</div></div>
     </div>`;

  let idx = 0, html = '';
  specData.sections.forEach(sec => {
    html += `<div class="spec-section-lbl">${escHtml(sec.name)}</div>`;
    sec.points.forEach(p => {
      const c = conf[idx] || '';
      html += `<div class="spec-point" onclick="cycleSpec(${idx},this)"><div class="spec-dot${c ? ' ' + c : ''}"></div><div class="spec-txt">${fmtSpec(escHtml(p))}</div></div>`;
      idx++;
    });
  });
  list.innerHTML = html;
}

function cycleSpec(idx, pointEl) {
  if (!SPEC_CONF[currentSpecSubj]) SPEC_CONF[currentSpecSubj] = {};
  const cur  = SPEC_CONF[currentSpecSubj][idx] || '';
  const next = { '': 'red', red: 'amber', amber: 'green', green: '' }[cur];
  if (next) SPEC_CONF[currentSpecSubj][idx] = next;
  else delete SPEC_CONF[currentSpecSubj][idx];
  saveSpec();
  const dot = pointEl.querySelector('.spec-dot');
  if (dot) dot.className = 'spec-dot' + (next ? ' ' + next : '');
  renderSpecContent(el('spec-list'), el('spec-prog-row'));
}

function initSpecScroll() {
  const wrap = el('spec-scroll-wrap');
  if (!wrap || wrap._scrollInited) return;
  wrap._scrollInited = true;
  wrap.addEventListener('wheel', e => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { e.preventDefault(); wrap.scrollLeft += e.deltaY * 0.8; }
  }, { passive: false });
  let isDown = false, startX = 0, startScrollLeft = 0;
  wrap.addEventListener('mousedown',  e => { isDown = true; startX = e.pageX - wrap.offsetLeft; startScrollLeft = wrap.scrollLeft; wrap.style.cursor = 'grabbing'; });
  wrap.addEventListener('mouseleave', () => { isDown = false; wrap.style.cursor = 'grab'; });
  wrap.addEventListener('mouseup',    () => { isDown = false; wrap.style.cursor = 'grab'; });
  wrap.addEventListener('mousemove',  e => { if (!isDown) return; e.preventDefault(); wrap.scrollLeft = startScrollLeft - (e.pageX - wrap.offsetLeft - startX); });
}


// ===================== RESOURCES =====================

function renderResources() {
  renderExamList();
  buildPublicResources();
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
    <div class="site-cat-lbl">Science specific</div>
    <div class="site-grid">
      <a class="site-card" href="https://www.youtube.com/@Freesciencelessons" target="_blank"><div class="site-name">Free Science Lessons</div><div class="site-desc">Full course YouTube videos (Grades 7-11)</div></a>
      <a class="site-card" href="https://www.youtube.com/@BioNinja" target="_blank"><div class="site-name">BioNinja</div><div class="site-desc">Biology diagrams and notes</div></a>
      <a class="site-card" href="https://www.chemguide.co.uk/" target="_blank"><div class="site-name">ChemGuide</div><div class="site-desc">Chemistry A-Level and GCSE explanations</div></a>
      <a class="site-card" href="https://www.physbot.co.uk/" target="_blank"><div class="site-name">Physbot</div><div class="site-desc">Physics revision videos and resources</div></a>
    </div>
    <div class="site-cat-lbl">English and Humanities</div>
    <div class="site-grid">
      <a class="site-card" href="https://litcharts.com/" target="_blank"><div class="site-name">LitCharts</div><div class="site-desc">Literature guides, themes and quotes</div></a>
      <a class="site-card" href="https://www.sparknotes.com/" target="_blank"><div class="site-name">SparkNotes</div><div class="site-desc">Text summaries and analysis</div></a>
      <a class="site-card" href="https://www.internetgeography.net/" target="_blank"><div class="site-name">Internet Geography</div><div class="site-desc">GCSE Geography case studies and notes</div></a>
      <a class="site-card" href="https://www.tutor2u.net/" target="_blank"><div class="site-name">Tutor2u</div><div class="site-desc">Business, Geography, Psychology notes</div></a>
    </div>
    <div class="lbl" style="margin-top:20px">My revision timetable</div>
    <div id="timetable-builder"></div>
  `;
  buildTimetableWidget();
}

function renderNotionQuickLinks() {
  const wrap = el('notion-quicklinks');
  if (!wrap) return;
  wrap.innerHTML = NOTION_PAGES.map(p =>
    `<a class="notion-quick-link" href="${escHtml(p.url)}" target="_blank" rel="noopener noreferrer">
       <span class="notion-quick-icon">${p.icon}</span>
       <div style="flex:1">
         <div class="notion-quick-title">${escHtml(p.title)}</div>
         <div class="notion-quick-sub">${escHtml(p.sub)}</div>
       </div>
       <span style="color:var(--hint);font-size:14px;margin-left:auto;flex-shrink:0">&#8250;</span>
     </a>`
  ).join('');
}

function renderExamList() {
  const wrap  = el('exam-list');
  if (!wrap) return;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let allExams = [];
  if (isAdmin) allExams = [...EXAMS];
  try {
    const custom = JSON.parse(localStorage.getItem('rv_custom_exams') || '[]');
    allExams = [...allExams, ...custom];
  } catch(e) {}
  const upcoming = allExams
    .map(e => { const d = new Date(e.date); d.setHours(0, 0, 0, 0); return { ...e, days: Math.round((d - today) / 86400000) }; })
    .filter(e => e.days >= -1)
    .sort((a, b) => a.days - b.days)
    .slice(0, 12);
  if (!upcoming.length) {
    wrap.innerHTML = '<div style="font-size:13px;color:var(--muted);padding:14px 0;text-align:center">No upcoming exams. Add one below.</div>';
    return;
  }
  wrap.innerHTML = upcoming.map(e => {
    const [, eMM, eDD] = e.date ? e.date.split('-') : ['', '', ''];
    const cls   = e.days === 0 ? 'today' : e.days <= 3 ? 'soon' : '';
    const label = e.days === 0 ? 'TODAY' : e.days < 0 ? 'Yest' : String(e.days);
    const sub   = e.days <= 0 ? '' : e.days === 1 ? 'day' : 'days';
    return `<div class="exam-row ${cls}">
      <div>
        <div class="exam-name">${escHtml(e.subj)}</div>
        <div class="exam-paper">${escHtml(e.paper || '')}${eDD && eMM ? `, ${eDD}/${eMM}` : ''}</div>
      </div>
      <div style="text-align:right">
        <div class="exam-days">${label}</div>
        <div class="exam-days-lbl">${sub}</div>
      </div>
    </div>`;
  }).join('');
}

function renderHowToRevise() {
  const wrap = el('how-to-revise');
  if (!wrap) return;
  wrap.innerHTML = Object.entries(HOW_TO).map(([subj, tips]) => {
    const s       = SUBJECTS.find(x => x.name === subj || x.name.startsWith(subj));
    const examStr = s ? `<span class="acc-exam">${escHtml(s.examDates)}</span>` : '';
    return `<div class="subj-accordion">
      <div class="acc-header" onclick="toggleAcc(this)">
        <span class="acc-title">${escHtml(subj)}</span>
        <div style="display:flex;align-items:center;gap:6px">${examStr}<span class="acc-arrow">&#9660;</span></div>
      </div>
      <div class="acc-body">
        <div style="height:8px"></div>
        ${tips.map(t => `<div class="acc-tip">${t}</div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

function toggleAcc(h) {
  const b     = h.nextElementSibling;
  const arrow = h.querySelector('.acc-arrow');
  if (!b) return;
  const open = b.classList.toggle('open');
  if (arrow) arrow.style.transform = open ? 'rotate(180deg)' : '';
}

function renderResSchedule() {
  const wrap = el('res-sched-table');
  if (!wrap) return;
  const dow  = new Date().getDay();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let html = `<div class="sched-th-row">
    <div class="sched-th">Day</div>
    <div class="sched-th">S1</div>
    <div class="sched-th">S2</div>
    <div class="sched-th">S3</div>
  </div>`;
  [0, 1, 2, 3, 4, 5, 6].forEach(d => {
    const td = TIMETABLE[d];
    if (!td) return;
    html += `<div class="${d === dow ? 'sched-tr today-row' : 'sched-tr'}">
      <div class="sched-td day">${days[d]}</div>
      <div class="sched-td">${escHtml(td.s1.subj)} <span style="color:var(--hint)">${td.s1.mins}m</span></div>
      <div class="sched-td">${escHtml(td.s2.subj)} <span style="color:var(--hint)">${td.s2.mins}m</span></div>
      <div class="sched-td">${escHtml(td.s3.subj)} <span style="color:var(--hint)">${td.s3.mins}m</span></div>
    </div>`;
  });
  wrap.innerHTML = html;
}


// ===================== TIMETABLE BUILDER =====================

const TT_DAYS     = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TT_SESSIONS = ['Session 1', 'Session 2', 'Session 3'];
let userTimetable = null;

function loadUserTimetable() {
  try { userTimetable = JSON.parse(localStorage.getItem('rv_user_tt') || 'null'); } catch(e) { userTimetable = null; }
  if (!userTimetable) {
    userTimetable = {};
    TT_DAYS.forEach(d => { userTimetable[d] = TT_SESSIONS.map(() => ({ subj: '', mins: 60 })); });
  }
}

function saveUserTimetable() {
  try { localStorage.setItem('rv_user_tt', JSON.stringify(userTimetable)); } catch(e) {}
}

function buildTimetableWidget() {
  const wrap = el('timetable-builder');
  if (!wrap) return;
  loadUserTimetable();
  wrap.innerHTML = `
    <div style="font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:12px;background:var(--s0);border:1px solid var(--border);border-radius:var(--r);padding:10px 13px">
      Build your own weekly revision timetable. Enter subjects and time for each session, then save.
    </div>
    <div id="tt-days-wrap"></div>
    <button class="btn btn-primary" style="margin-top:12px" onclick="saveTimetableWidget()">Save timetable</button>
  `;
  renderTTDays();
}

function renderTTDays() {
  const wrap = el('tt-days-wrap');
  if (!wrap) return;
  wrap.innerHTML = TT_DAYS.map((day, di) => {
    const sessions    = userTimetable[day] || [];
    const sessionRows = TT_SESSIONS.map((_, si) => {
      const s = sessions[si] || { subj: '', mins: 60 };
      return `<div class="tt-session-row">
        <div class="tt-session-lbl">S${si + 1}</div>
        <input class="tt-input" type="text" placeholder="Subject..." value="${escHtml(s.subj)}"
          oninput="updateTT('${escHtml(day)}',${si},'subj',this.value)">
        <input class="tt-input tt-mins-input" type="number" min="10" max="180" value="${s.mins || 60}"
          oninput="updateTT('${escHtml(day)}',${si},'mins',parseInt(this.value)||60)">
        <span style="font-size:11px;color:var(--hint);flex-shrink:0">min</span>
      </div>`;
    }).join('');
    const hasSessions = sessions.some(s => s && s.subj);
    const summary     = hasSessions ? sessions.filter(s => s && s.subj).map(s => s.subj).join(', ') : 'Add subjects';
    return `<div class="tt-day-block">
      <div class="tt-day-head" onclick="toggleTTDay('tt-body-${di}',this)">
        <span class="tt-day-name">${day}</span>
        <span class="tt-day-summary" id="tt-summary-${di}">${escHtml(summary)}</span>
      </div>
      <div class="tt-day-body" id="tt-body-${di}" style="display:none">${sessionRows}</div>
    </div>`;
  }).join('');
}

function toggleTTDay(bodyId) {
  const body = el(bodyId);
  if (!body) return;
  body.style.display = body.style.display === 'none' ? 'flex' : 'none';
}

function updateTT(day, sessionIdx, field, value) {
  if (!userTimetable[day]) userTimetable[day] = TT_SESSIONS.map(() => ({ subj: '', mins: 60 }));
  if (!userTimetable[day][sessionIdx]) userTimetable[day][sessionIdx] = { subj: '', mins: 60 };
  userTimetable[day][sessionIdx][field] = value;
  const di = TT_DAYS.indexOf(day);
  if (di >= 0) {
    const summaryEl = el(`tt-summary-${di}`);
    if (summaryEl) {
      const sessions = userTimetable[day];
      summaryEl.textContent = sessions.filter(s => s && s.subj).map(s => s.subj).join(', ') || 'Add subjects';
    }
  }
}

function saveTimetableWidget() {
  saveUserTimetable();
  showToast('Timetable saved', 'Your schedule has been saved');
}


// ===================== SPACED REPETITION =====================

function srDueItems() {
  const now = Date.now();
  return (Array.isArray(SPACED) ? SPACED : []).filter(i => i.nextReview && i.nextReview <= now);
}

function buildSRCard() {
  const due  = srDueItems();
  const card = el('sr-due-card');
  if (!card) return;
  if (!due.length) { card.style.display = 'none'; return; }
  card.style.display = 'block';
  setText('sr-due-count', String(due.length));
  const preview = el('sr-due-preview');
  if (preview) {
    if (due.length === 1) preview.textContent = `"${due[0].topic}" - ${due[0].subj}`;
    else {
      const subjects = [...new Set(due.map(d => d.subj))].slice(0, 3).join(', ');
      preview.textContent = `${subjects} - tap to review`;
    }
  }
}

let srQueue = [], srIdx = 0;

function openSRReview() {
  srQueue = srDueItems();
  if (!srQueue.length) return;
  srIdx = 0;
  const ov = el('sr-ov');
  if (ov) ov.classList.add('open');
  renderSRCard();
}

function closeSRReview() {
  const ov = el('sr-ov');
  if (ov) ov.classList.remove('open');
  buildSRCard();
}

function renderSRCard() {
  const item = srQueue[srIdx];
  if (!item) { closeSRReview(); showToast('Review done', 'All caught up', true); buildSRCard(); return; }
  setText('sr-topic',    item.topic);
  setText('sr-subj-lbl', `${item.subj} - ${srIntervalLabel(item.interval || 1)}`);
  const prog = el('sr-prog');
  if (prog) prog.innerHTML = srQueue.map((_, i) =>
    `<div class="sr-prog-dot${i < srIdx ? ' done' : ''}"></div>`
  ).join('');
  const remaining = srQueue.length - srIdx;
  setText('sr-hint', remaining === 1 ? 'Last one' : `${remaining} left`);
}

function srIntervalLabel(d) {
  if (d <= 1)  return 'Due today';
  if (d < 7)   return `Next: ${d}d`;
  if (d < 30)  return `Next: ${Math.round(d / 7)}w`;
  return `Next: ${Math.round(d / 30)}mo`;
}

function srAnswer(remembered) {
  const item = srQueue[srIdx];
  if (!item) return;
  const now = Date.now();
  const idx = (Array.isArray(SPACED) ? SPACED : []).findIndex(i => i.id === item.id);
  if (idx < 0) { srIdx++; renderSRCard(); return; }
  if (remembered) {
    const ni = Math.min((item.interval || 1) * 2, 60);
    SPACED[idx].interval    = ni;
    SPACED[idx].streak      = (item.streak || 0) + 1;
    SPACED[idx].nextReview  = now + ni * 86400000;
  } else {
    SPACED[idx].interval    = 1;
    SPACED[idx].streak      = 0;
    SPACED[idx].nextReview  = now + 86400000;
  }
  SPACED[idx].lastReviewed = now;
  saveSpaced();
  srIdx++;
  renderSRCard();
}

function addToSR(topic, subj) {
  if (!Array.isArray(SPACED)) SPACED = [];
  const now = Date.now();
  SPACED.push({
    id:          `${now}-${Math.random().toString(36).slice(2)}`,
    topic, subj,
    added:       now,
    nextReview:  now + 14 * 86400000,
    interval:    14,
    streak:      0,
    lastReviewed: null
  });
  saveSpaced();
}

function migrateSRItems() {
  if (!Array.isArray(SPACED)) { SPACED = []; return; }
  let changed = false;
  SPACED.forEach((item, i) => {
    if (!item.id)         { SPACED[i].id = `${Date.now()}-${i}`; changed = true; }
    if (!item.nextReview) { SPACED[i].nextReview = Date.now(); SPACED[i].interval = 1; SPACED[i].streak = 0; changed = true; }
  });
  if (changed) saveSpaced();
}


// ===================== KEYBOARD =====================

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const ts = el('timer-screen');
  const bs = el('break-screen');
  if (!ts || !bs) return;
  const onTimer = ts.classList.contains('active');
  const onBreak = bs.classList.contains('active');
  if (!onTimer && !onBreak) return;
  if (e.code === 'Space')  { e.preventDefault(); togglePause(); }
  if (e.code === 'KeyS' && onTimer) confirmSkip();
  if (e.code === 'Escape') confirmEnd();
});


// ===================== MANIFEST =====================

function injectManifest() {
  try {
    const icon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%230e1010'/%3E%3Ctext x='50' y='64' font-size='52' font-family='Outfit,sans-serif' font-weight='800' fill='%231098f7' text-anchor='middle'%3ES%3C/text%3E%3C/svg%3E";
    const m = {
      name: 'Solus', short_name: 'Solus',
      start_url: '.', display: 'standalone',
      background_color: '#0e1010', theme_color: '#0e1010',
      icons: [{ src: icon, sizes: '192x192', type: 'image/svg+xml' }]
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(m)], { type: 'application/json' }));
    const l   = document.createElement('link');
    l.rel = 'manifest';
    l.href = url;
    document.head.appendChild(l);
  } catch(e) {}
}


// ===================== DESKTOP SCROLL =====================

function initDesktopScroll() {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.addEventListener('wheel', e => {
      const scrollArea = screen.querySelector('.scroll-area');
      if (!scrollArea || scrollArea.contains(e.target)) return;
      e.preventDefault();
      scrollArea.scrollBy({ top: e.deltaY, behavior: 'auto' });
    }, { passive: false });
  });
}


// ===================== WINDOW RESIZE =====================

window.addEventListener('resize', () => {
  requestAnimationFrame(() => updateNavIndicator(activeTab));
});


// ===================== INIT =====================

function initApp() {
  applyTheme();
  applySettings();
  syncAdminUI();
  updateAdminContentUI();
  buildScheduleCard();
  buildSubjChips();
  updateExamChip();
  refreshStats();
  injectManifest();
  migrateSRItems();
  buildSRCard();
  updateStartBtn();
  initSpecScroll();
  initDesktopScroll();
  document.addEventListener('touchstart', () => unlockAudio(), { once: true, passive: true });
  document.addEventListener('click',      () => unlockAudio(), { once: true });
  requestAnimationFrame(() => updateNavIndicator('home'));
  setTimeout(() => {
    const loader = el('app-loader');
    if (loader) { loader.classList.add('gone'); setTimeout(() => loader.remove(), 500); }
  }, 600);
}


// ===================== ENTRY POINT =====================

if (window.FIREBASE_ENABLED && window.firebaseAuth) {
  window.firebaseAuth.onAuthStateChanged(async user => {
    if (user) {
      currentUser = user;
      loadFromLocalStorage();
      await loadFromFirestore(user.uid);
      initApp();
    } else {
      window.location.href = 'auth.html';
    }
  });
} else {
  loadFromLocalStorage();
  initApp();
}
