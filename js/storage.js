// js/storage.js
// Data persistence: localStorage (always) + Firestore (when Firebase configured and signed in)

let currentUser = null;

// -- Defaults --
const DEFAULT_CFG         = { sound: true, notif: false, eye: true, hydra: true, checkin: true };
const DEFAULT_STATS       = { total: 0, mins: 0, hist: [] };
const DEFAULT_TODAY_DONE  = { date: '', s1: false, s2: false, s3: false };

// Keys used in localStorage / Firestore document fields
const LS_KEYS = {
  cfg:       'rv_cfg',
  stats:     'rv_stats',
  spaced:    'rv_spaced',
  todayDone: 'rv_today_done',
  spec:      'rv_spec',
  theme:     'rv_theme'
};

// -- localStorage helpers --
function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null ? parsed : fallback;
  } catch (e) {
    return fallback;
  }
}

function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('[Solus] localStorage write failed:', e.message);
  }
}

// -- Load all data from localStorage into global variables --
function loadFromLocalStorage() {
  CFG        = { ...DEFAULT_CFG,        ...lsGet(LS_KEYS.cfg,       {}) };
  STATS      = { ...DEFAULT_STATS,      ...lsGet(LS_KEYS.stats,     {}) };
  SPACED     = lsGet(LS_KEYS.spaced,    []);
  TODAY_DONE = { ...DEFAULT_TODAY_DONE, ...lsGet(LS_KEYS.todayDone, {}) };
  SPEC_CONF  = lsGet(LS_KEYS.spec,      {});

  if (!Array.isArray(SPACED))    SPACED = [];
  if (!Array.isArray(STATS.hist)) STATS.hist = [];
}

// -- Save a single key to localStorage and queue a Firestore sync --
function save(key, value) {
  lsSet(key, value);
  if (currentUser && window.FIREBASE_ENABLED && window.firebaseDb) {
    syncDocToFirestore();
  }
}

function saveCFG()       { save(LS_KEYS.cfg,       CFG); }
function saveStats()     { save(LS_KEYS.stats,      STATS); }
function saveSpaced()    { save(LS_KEYS.spaced,     SPACED); }
function saveTodayDone() { save(LS_KEYS.todayDone,  TODAY_DONE); }
function saveSpec()      { save(LS_KEYS.spec,       SPEC_CONF); }

// -- Firestore: write all data as a single document (debounced) --
let _syncTimer = null;
function syncDocToFirestore() {
  clearTimeout(_syncTimer);
  _syncTimer = setTimeout(() => {
    if (!currentUser || !window.firebaseDb) return;
    window.firebaseDb
      .collection('users')
      .doc(currentUser.uid)
      .set({
        cfg:       CFG,
        stats:     STATS,
        spaced:    SPACED,
        todayDone: TODAY_DONE,
        spec:      SPEC_CONF,
        updatedAt: Date.now()
      })
      .catch(e => console.warn('[Solus] Firestore write error:', e.message));
  }, 1500);
}

// -- Firestore: load all data for a user --
async function loadFromFirestore(uid) {
  if (!window.firebaseDb) return;
  try {
    const doc = await window.firebaseDb.collection('users').doc(uid).get();
    if (!doc.exists) return;
    const d = doc.data();
    if (d.cfg)       CFG        = { ...DEFAULT_CFG,        ...d.cfg };
    if (d.stats)     STATS      = { ...DEFAULT_STATS,      ...d.stats };
    if (Array.isArray(d.spaced)) SPACED = d.spaced;
    if (d.todayDone) TODAY_DONE = { ...DEFAULT_TODAY_DONE, ...d.todayDone };
    if (d.spec)      SPEC_CONF  = d.spec;

    if (!Array.isArray(SPACED))    SPACED = [];
    if (!Array.isArray(STATS.hist)) STATS.hist = [];

    lsSet(LS_KEYS.cfg,       CFG);
    lsSet(LS_KEYS.stats,     STATS);
    lsSet(LS_KEYS.spaced,    SPACED);
    lsSet(LS_KEYS.todayDone, TODAY_DONE);
    lsSet(LS_KEYS.spec,      SPEC_CONF);
  } catch (e) {
    console.warn('[Solus] Firestore read error:', e.message);
    loadFromLocalStorage();
  }
}

// -- Clear everything --
function clearAllData() {
  STATS      = { ...DEFAULT_STATS };
  SPACED     = [];
  TODAY_DONE = { ...DEFAULT_TODAY_DONE };
  SPEC_CONF  = {};
  Object.values(LS_KEYS).forEach(k => {
    try { localStorage.removeItem(k); } catch (e) {}
  });
  if (currentUser && window.firebaseDb) {
    window.firebaseDb
      .collection('users')
      .doc(currentUser.uid)
      .delete()
      .catch(() => {});
  }
}
