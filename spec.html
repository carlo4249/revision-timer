<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">
<meta name="theme-color" id="tcm" content="#0e1010">
<title>Solus - Spec</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/style2.css">
<link rel="stylesheet" href="css/fixes.css">
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
<script src="js/firebase-config.js"></script>
</head>
<body>

<div class="desktop-card"></div>
<div class="app-bg"><div class="pattern-bg"></div></div>

<!-- Toast -->
<div class="toast" id="toast">
  <div class="toast-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg></div>
  <div class="toast-text"><div class="toast-title" id="toast-title">Done</div><div class="toast-sub" id="toast-sub"></div></div>
  <button class="toast-close" onclick="hideToast()"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="15" height="15"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg></button>
</div>

<!-- Settings -->
<div class="settings-backdrop" id="settings-backdrop" onclick="closeSettings()"></div>
<div class="card-clip-wrap">
  <div class="settings-panel" id="settings-panel">
    <div class="settings-panel-head">
      <span class="settings-panel-title">Settings</span>
      <button class="settings-close" onclick="closeSettings()"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg></button>
    </div>
    <div class="settings-section-lbl">Appearance</div>
    <div class="settings-wrap">
      <div class="theme-toggle-row">
        <span class="theme-toggle-label">Dark mode</span>
        <label class="theme-switch-sm">
          <input type="checkbox" class="ts-chk theme-chk" onchange="toggleThemeFromSettings(this)">
          <div class="ts-container"><div class="ts-clouds"></div><div class="ts-stars"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545Z" fill="currentColor"/></svg></div><div class="ts-circle"><div class="ts-sunmoon"><div class="ts-moon"><div class="ts-spot"></div><div class="ts-spot"></div><div class="ts-spot"></div></div></div></div></div>
        </label>
      </div>
    </div>
    <div class="settings-section-lbl">Account</div>
    <div class="settings-wrap" id="settings-account-section"></div>
    <div class="settings-section-lbl">Data</div>
    <div class="danger-zone" style="margin:0 14px">
      <div class="danger-header" onclick="toggleDanger(this)"><div class="danger-title">&#9888;&#xFE0F; Danger zone</div><span class="danger-arrow" style="transform:rotate(180deg)">&#9660;</span></div>
      <div class="danger-body open"><div style="font-size:12px;color:var(--red);margin-bottom:10px;line-height:1.55">Permanently deletes all session history, spec ratings, and spaced repetition data.</div><button class="clear-btn" onclick="confirmClearData()">Clear all data</button></div>
    </div>
    <div class="settings-section-lbl">Admin</div>
    <div class="admin-section">
      <div id="admin-unlock-section"><div style="font-size:12px;color:var(--muted);line-height:1.6">Restricted access.</div><div class="admin-unlock-form"><input type="password" class="tinput" id="admin-pw-input" placeholder="Password" autocomplete="off" onkeydown="if(event.key==='Enter')adminUnlock()"><button class="admin-unlock-btn" onclick="adminUnlock()">Unlock</button></div><div style="font-size:12px;color:var(--red);min-height:18px;margin-top:5px" id="admin-pw-error"></div></div>
      <div id="admin-active-section" style="display:none"><div class="admin-active-row"><div><div style="font-size:13px;font-weight:700;color:var(--brk)">&#10003; Admin mode active</div><div style="font-size:11px;color:var(--muted);margin-top:2px">Full access enabled</div></div><button class="admin-deactivate-btn" onclick="adminDeactivate()">Deactivate</button></div></div>
    </div>
    <div style="height:44px;flex-shrink:0"></div>
  </div>
</div>

<!-- Confirm overlay -->
<div class="overlay" id="confirm-ov" onclick="if(event.target===this)closeConfirm()">
  <div class="sheet"><div class="sheet-handle"></div><div class="sheet-title" id="confirm-title">Are you sure?</div><div class="sheet-body" id="confirm-body"></div><div class="sheet-btns"><button class="btn btn-danger" id="confirm-ok" onclick="doConfirm()">Confirm</button><button class="btn btn-secondary" onclick="closeConfirm()">Cancel</button></div></div>
</div>

<!-- ── SPEC SCREEN ── -->
<div class="screen tab-screen active" id="spec-screen">
  <div class="screen-head">
    <div class="hdr">
      <span class="app-name">Spec<span>.</span></span>
      <button class="cog-btn" onclick="openSettings()"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg></button>
    </div>
  </div>
  <div class="scroll-area" style="padding-top:4px">
    <div id="spec-lock-view" class="res-lock">
      <div class="res-lock-icon">&#127919;</div>
      <div class="res-lock-title">Spec tracker</div>
      <div class="res-lock-sub">Sign in to track your spec confidence and progress across every subject.</div>
    </div>
    <div id="spec-unlocked-view" style="display:none">
      <div style="font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:12px">Tap a point to cycle: <span style="color:var(--red)">red</span> &rarr; <span style="color:var(--log)">amber</span> &rarr; <span style="color:var(--brk)">green</span> &rarr; unrated</div>
      <div class="spec-legend">
        <div class="spec-leg-item"><div class="spec-leg-dot" style="background:var(--s3)"></div>Not rated</div>
        <div class="spec-leg-item"><div class="spec-leg-dot" style="background:#cc4038"></div>Red</div>
        <div class="spec-leg-item"><div class="spec-leg-dot" style="background:#be8816"></div>Amber</div>
        <div class="spec-leg-item"><div class="spec-leg-dot" style="background:#3c7250"></div>Green</div>
      </div>
      <div class="spec-subj-scroll" id="spec-scroll-wrap"><div class="spec-pills" id="spec-pills"></div></div>
      <div id="spec-prog-row"></div>
      <div id="spec-list"></div>
    </div>
    <div style="height:12px"></div>
  </div>
</div>

<!-- ── BOTTOM NAV ── -->
<nav class="bottom-nav" id="bottom-nav">
  <div class="nav-tabs">
    <input type="radio" name="nav-tab" id="nr-home" class="nav-radio">
    <label class="nav-tab-lbl" for="nr-home" onclick="navTo('home')"><span class="nav-icon">&#128218;</span><span class="nav-text">Home</span></label>
    <input type="radio" name="nav-tab" id="nr-stats" class="nav-radio">
    <label class="nav-tab-lbl" for="nr-stats" onclick="navTo('stats')"><span class="nav-icon">&#128202;</span><span class="nav-text">Stats</span></label>
    <input type="radio" name="nav-tab" id="nr-spec" class="nav-radio" checked>
    <label class="nav-tab-lbl active-tab" for="nr-spec" onclick="navTo('spec')"><span class="nav-icon">&#127919;</span><span class="nav-text">Spec</span></label>
    <input type="radio" name="nav-tab" id="nr-res" class="nav-radio">
    <label class="nav-tab-lbl" for="nr-res" onclick="navTo('resources')"><span class="nav-icon">&#128279;</span><span class="nav-text">Resources</span></label>
    <input type="radio" name="nav-tab" id="nr-check" class="nav-radio">
    <label class="nav-tab-lbl" for="nr-check" onclick="navTo('checklists')"><span class="nav-icon">&#9989;</span><span class="nav-text">Checklists</span></label>
    <div class="nav-indicator"></div>
  </div>
</nav>

<script src="js/data.js"></script>
<script src="js/storage.js"></script>
<script src="js/shared.js"></script>
<script src="js/spec.js"></script>
</body>
</html>
