// js/shared.js -- Solus shared utilities

// ── Navigation ──────────────────────────────────────────
const NAV_ORDER = ['home', 'stats', 'spec', 'resources'];
const NAV_HREFS = { home: 'index.html', stats: 'stats.html', spec: 'spec.html', resources: 'resources.html' };

function navTo(name) {
  window.location.href = NAV_HREFS[name] || 'index.html';
}

function updateNavIndicator(name) {
  const indicator = document.querySelector('.nav-indicator');
  if (!indicator) return;
  const idx = NAV_ORDER.indexOf(name);
  if (idx < 0) return;
  const labels = document.querySelectorAll('.nav-tab-lbl');
  if (!labels[idx]) return;
  const navTabs = labels[idx].closest('.nav-tabs');
  if (!navTabs) return;
  const navRect = navTabs.getBoundingClientRect();
  const lblRect = labels[idx].getBoundingClientRect();
  indicator.style.left  = (lblRect.left - navRect.left) + 'px';
  indicator.style.width = lblRect.width + 'px';
  labels.forEach((l, i) => l.classList.toggle('active-tab', i === idx));
}

// ── DOM helpers ─────────────────────────────────────────
function el(id) { return document.getElementById(id); }
function setText(id, val) { const e = el(id); if (e) e.textContent = val; }
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function fmtSpec(txt) {
  txt = txt.replace(/\^(\([^)]*\)|[-\w\/]+)/g, (_,e) => `<sup>${e.replace(/[()]/g,'')}</sup>`);
  txt = txt.replace(/([A-Z][a-z]?)(\d+)/g, '$1<sub>$2</sub>');
  txt = txt.replace(/--&gt;/g, '\u2192');
  txt = txt.replace(/&lt;--&gt;/g, '\u21cc');
  txt = txt.replace(/(\d+)\s*degrees?\s*[Cc]/g, '$1\u00b0C');
  return txt;
}

// ── Theme ────────────────────────────────────────────────
function applyTheme(t) {
  if (!t) { try { t = localStorage.getItem('rv_theme') || 'dark'; } catch(e) { t = 'dark'; } }
  document.documentElement.setAttribute('data-theme', t);
  const tcm = el('tcm');
  if (tcm) tcm.content = t === 'dark' ? '#0e1010' : '#f2f2ed';
  document.querySelectorAll('.theme-chk').forEach(c => { c.checked = (t === 'dark'); });
}
function toggleThemeFromSettings(checkbox) {
  const t = checkbox.checked ? 'dark' : 'light';
  applyTheme(t);
  try { localStorage.setItem('rv_theme', t); } catch(e) {}
}

// ── Admin ────────────────────────────────────────────────
let isAdmin = false;
try { isAdmin = sessionStorage.getItem('sv_admin') === '1'; } catch(e) {}
const ADMIN_PASSWORD = 'Xaniel32!';

function adminUnlock() {
  const pw = el('admin-pw-input'), err = el('admin-pw-error');
  if (!pw) return;
  if (pw.value === ADMIN_PASSWORD) {
    isAdmin = true;
    try { sessionStorage.setItem('sv_admin', '1'); } catch(e) {}
    pw.value = '';
    if (err) err.textContent = '';
    syncAdminUI();
    if (typeof onAdminChange === 'function') onAdminChange();
    showToast('Admin mode active', 'Welcome back, Daniel');
  } else {
    if (err) {
      err.textContent = 'Incorrect password';
      pw.value = '';
      pw.style.animation = 'none';
      requestAnimationFrame(() => { pw.style.animation = 'shake .3s ease'; });
      setTimeout(() => { if (err) err.textContent = ''; }, 2000);
    }
  }
}

function adminDeactivate() {
  openConfirm('Deactivate admin?', 'You will need to re-enter the password to enable admin mode again.', 'Deactivate', 'btn btn-secondary', () => {
    isAdmin = false;
    try { sessionStorage.removeItem('sv_admin'); } catch(e) {}
    syncAdminUI();
    if (typeof onAdminChange === 'function') onAdminChange();
    showToast('Admin mode off', '');
  });
}

function syncAdminUI() {
  const unlockSec = el('admin-unlock-section'), activeSec = el('admin-active-section');
  if (unlockSec) unlockSec.style.display = isAdmin ? 'none' : 'block';
  if (activeSec) activeSec.style.display = isAdmin ? 'block' : 'none';
  const pw = el('admin-pw-input'), err = el('admin-pw-error');
  if (pw) pw.value = '';
  if (err) err.textContent = '';
  const t = document.documentElement.getAttribute('data-theme') || 'dark';
  document.querySelectorAll('.theme-chk').forEach(c => { c.checked = (t === 'dark'); });
}

// Stub - each page overrides
function onAdminChange() {}
function onDataCleared() {}

// ── Settings panel ───────────────────────────────────────
function openSettings() {
  applySettings();
  syncAdminUI();
  const panel = el('settings-panel'), backdrop = el('settings-backdrop');
  if (panel) panel.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  updateSettingsAccountUI();
}
function closeSettings() {
  const panel = el('settings-panel'), backdrop = el('settings-backdrop');
  if (panel) panel.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}
function applySettings() {
  if (!CFG) return;
  Object.keys(CFG).forEach(k => { const e = el('tgl-' + k); if (e) e.checked = !!CFG[k]; });
}
function toggleSetting(checkbox, key) {
  if (!CFG) return;
  CFG[key] = checkbox.checked;
  saveCFG();
  if (key === 'notif' && CFG.notif) askNotif();
}
function toggleDanger(h) {
  const body = h.nextElementSibling, arrow = h.querySelector('.danger-arrow');
  if (!body) return;
  const open = body.classList.toggle('open');
  if (arrow) arrow.style.transform = open ? 'rotate(180deg)' : '';
}
function confirmClearData() {
  openConfirm('Clear all data?', 'Permanently deletes all session history, spec confidence, and spaced repetition data. This cannot be undone.', 'Clear everything', 'btn btn-danger', () => {
    clearAllData();
    CFG = { ...DEFAULT_CFG };
    showToast('Data cleared', 'All sessions removed', false);
    if (typeof onDataCleared === 'function') onDataCleared();
  });
}

// ── Account UI ───────────────────────────────────────────
function updateSettingsAccountUI() {
  const section = el('settings-account-section');
  if (!section) return;
  if (!window.FIREBASE_ENABLED) {
    section.innerHTML = '<div style="font-size:12px;color:var(--hint);padding:12px 14px;line-height:1.55">Running in local mode. Data saved locally.</div>';
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

function confirmSignOut() {
  openConfirm('Sign out?', 'Your data is saved to the cloud and will be waiting when you sign back in.', 'Sign out', 'btn btn-secondary', () => signOutUser());
}
async function signOutUser() {
  if (window.firebaseAuth) await window.firebaseAuth.signOut().catch(() => {});
  currentUser = null;
  closeSettings();
  window.location.href = 'auth.html';
}

// ── Toast ────────────────────────────────────────────────
let _toastTimer = null;
function showToast(title, sub, ok) {
  if (ok === undefined) ok = true;
  const t = el('toast');
  if (!t) return;
  setText('toast-title', title);
  setText('toast-sub', sub || '');
  const icon = t.querySelector('.toast-icon');
  if (icon) icon.style.color = ok ? 'var(--brk)' : 'var(--log)';
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(hideToast, 4000);
}
function hideToast() { const t = el('toast'); if (t) t.classList.remove('show'); }

// ── Confirm overlay ──────────────────────────────────────
let confirmCallback = null;
function openConfirm(title, body, okLabel, okStyle, cb) {
  confirmCallback = cb;
  const ct = el('confirm-title'), cb2 = el('confirm-body'), btn = el('confirm-ok');
  if (ct)  ct.textContent  = title;
  if (cb2) cb2.textContent = body;
  if (btn) { btn.textContent = okLabel; btn.className = okStyle; }
  const ov = el('confirm-ov');
  if (ov) ov.classList.add('open');
}
function closeConfirm() { const ov = el('confirm-ov'); if (ov) ov.classList.remove('open'); confirmCallback = null; }
function doConfirm()    { const cb = confirmCallback; closeConfirm(); if (cb) cb(); }

// ── Exam chip ────────────────────────────────────────────
function daysToDate(d) {
  const target = new Date(d), today = new Date();
  today.setHours(0,0,0,0); target.setHours(0,0,0,0);
  return Math.round((target - today) / 86400000);
}
function updateExamChip() {
  const chip = el('exam-chip');
  if (!chip) return;
  if (!isAdmin) { chip.classList.remove('visible'); return; }
  const upcoming = EXAMS.map(e => ({ ...e, days: daysToDate(e.date) }))
    .filter(e => e.days >= 0).sort((a,b) => a.days - b.days);
  if (!upcoming.length) { chip.classList.remove('visible'); return; }
  const next = upcoming[0];
  chip.textContent = `${next.subj} ${next.days === 0 ? 'Today!' : next.days + 'd'}`;
  chip.classList.add('visible');
}

// ── Audio ────────────────────────────────────────────────
let _actx = null, _audioUnlocked = false;
function getAC() { if (!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)(); return _actx; }
async function unlockAudio() {
  if (_audioUnlocked) return;
  try { const ctx = getAC(); if (ctx.state === 'suspended') await ctx.resume(); _audioUnlocked = true; } catch(e) {}
}
async function askNotif() {
  if (!('Notification' in window)) return;
  const p = await Notification.requestPermission();
  CFG.notif = p === 'granted';
  saveCFG();
  const tgl = el('tgl-notif');
  if (tgl) tgl.checked = CFG.notif;
}

// ── Manifest ─────────────────────────────────────────────
function injectManifest() {
  try {
    const icon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%230e1010'/%3E%3Ctext x='50' y='64' font-size='52' font-family='Outfit,sans-serif' font-weight='800' fill='%231098f7' text-anchor='middle'%3ES%3C/text%3E%3C/svg%3E";
    const m = { name:'Solus', short_name:'Solus', start_url:'index.html', display:'standalone', background_color:'#0e1010', theme_color:'#0e1010', icons:[{src:icon,sizes:'192x192',type:'image/svg+xml'}] };
    const url = URL.createObjectURL(new Blob([JSON.stringify(m)], { type:'application/json' }));
    const l = document.createElement('link'); l.rel = 'manifest'; l.href = url;
    document.head.appendChild(l);
  } catch(e) {}
}

// ── Common page init ─────────────────────────────────────
async function commonPageInit(pageName, pageInitFn) {
  applyTheme();
  injectManifest();
  document.addEventListener('touchstart', () => unlockAudio(), { once:true, passive:true });
  document.addEventListener('click',      () => unlockAudio(), { once:true });

  const finishInit = async (user) => {
    currentUser = user;
    loadFromLocalStorage();
    if (user && window.FIREBASE_ENABLED && window.firebaseDb) {
      await loadFromFirestore(user.uid);
    }
    syncAdminUI();
    applySettings();
    updateExamChip();
    if (typeof pageInitFn === 'function') pageInitFn();
    requestAnimationFrame(() => {
      updateNavIndicator(pageName);
      window.addEventListener('resize', () => requestAnimationFrame(() => updateNavIndicator(pageName)));
    });
  };

  if (window.FIREBASE_ENABLED && window.firebaseAuth) {
    window.firebaseAuth.onAuthStateChanged(async user => {
      if (user) { await finishInit(user); }
      else { window.location.href = 'auth.html'; }
    });
  } else {
    await finishInit(null);
  }
}
