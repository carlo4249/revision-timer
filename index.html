<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Revision">
<meta name="theme-color" content="#0c0c10">
<title>Revision Timer</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
:root{
  --bg:#0c0c10;--s1:#141418;--s2:#1e1e26;--s3:#28283a;
  --text:#f0f0f6;--muted:#5a5a7a;--hint:#3a3a52;
  --accent:#7c6af7;--accent-l:rgba(124,106,247,.15);
  --focus:#4fa3e8;--focus-l:rgba(79,163,232,.12);
  --brk:#3dba8c;--brk-l:rgba(61,186,140,.12);
  --err:#e87a4f;--err-l:rgba(232,122,79,.12);
  --warn:#f0b429;--red:#e05252;
  --r:14px;--r-lg:20px;
  --ring-c:816.814
}
html,body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',sans-serif;min-height:100dvh;overflow-x:hidden;overscroll-behavior:none}
.screen{display:none;min-height:100dvh;padding:calc(env(safe-area-inset-top,16px) + 12px) 20px calc(env(safe-area-inset-bottom,16px) + 16px);flex-direction:column;gap:0}
.screen.active{display:flex}

/* ── SETUP ─────────────────────────────────────────── */
.hdr{display:flex;align-items:center;justify-content:space-between;padding:4px 0 18px}
.app-name{font-size:22px;font-weight:700;letter-spacing:-.8px}
.streak-chip{background:var(--s2);border-radius:20px;padding:6px 12px;font-size:13px;color:var(--warn);display:flex;align-items:center;gap:4px;cursor:pointer}
.lbl{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--muted);margin:16px 0 8px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
.card{background:var(--s1);border:1.5px solid transparent;border-radius:var(--r);padding:14px 8px 12px;text-align:center;cursor:pointer;transition:border-color .15s,background .15s;user-select:none}
.card:active{transform:scale(.97)}
.card.sel{border-color:var(--accent);background:var(--accent-l)}
.card .cd{font-size:19px;font-weight:700;letter-spacing:-.5px}
.card .cs{font-size:11px;color:var(--muted);margin-top:4px;line-height:1.4}
.card.pomo-sel{border-color:var(--focus);background:var(--focus-l)}
.card.pomo-sel .cd,.card.pomo-sel .cs{color:var(--focus)}

.info-box{background:var(--s1);border-left:2px solid var(--focus);border-radius:0 var(--r) var(--r) 0;padding:12px 14px;font-size:13px;color:var(--muted);line-height:1.65;margin-top:8px;display:none}
.info-box b{color:var(--focus);font-weight:600}
.schedule-btn{width:100%;background:var(--s1);border:1.5px dashed var(--hint);border-radius:var(--r);padding:14px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;margin-bottom:2px}
.schedule-btn .sb-left{font-size:14px;font-weight:500}
.schedule-btn .sb-right{font-size:12px;color:var(--muted)}
.tinput{width:100%;background:var(--s1);border:1.5px solid var(--hint);border-radius:var(--r);padding:13px 15px;font-size:15px;color:var(--text);outline:none;font-family:inherit}
.tinput::placeholder{color:var(--muted)}
.tinput:focus{border-color:var(--accent)}
.row-toggle{display:flex;align-items:center;justify-content:space-between;background:var(--s1);border-radius:var(--r);padding:13px 15px;margin-bottom:8px;font-size:14px;color:var(--text)}
.tgl{width:44px;height:26px;background:var(--s3);border-radius:13px;position:relative;cursor:pointer;transition:background .2s;flex-shrink:0}
.tgl.on{background:var(--accent)}
.tgl::after{content:'';position:absolute;width:20px;height:20px;background:#fff;border-radius:50%;top:3px;left:3px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.4)}
.tgl.on::after{left:21px}
.custom-row{display:grid;grid-template-columns:1fr 1fr;gap:9px;display:none}
.btn-start{width:100%;padding:18px;border:none;border-radius:var(--r-lg);background:var(--accent);color:#fff;font-size:17px;font-weight:700;cursor:pointer;letter-spacing:.2px;margin-top:auto;flex-shrink:0}
.btn-start:active{transform:scale(.98);opacity:.9}

/* ── TIMER ─────────────────────────────────────────── */
.t-top{display:flex;align-items:center;justify-content:space-between;padding:4px 0 8px}
.phase-pill{padding:6px 13px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:.3px}
.pp-focus{background:var(--focus-l);color:var(--focus)}
.pp-break{background:var(--brk-l);color:var(--brk)}
.pp-log{background:var(--err-l);color:var(--err)}
.subj-tag{font-size:13px;color:var(--muted);max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.btn-ghost{background:none;border:none;color:var(--muted);font-size:13px;cursor:pointer;padding:4px 0}

.pdots{display:flex;gap:6px;align-items:center;margin:4px 0 10px}
.pdot{width:6px;height:6px;border-radius:50%;background:var(--hint);flex-shrink:0;transition:all .3s}
.pdot.active{width:18px;border-radius:3px}
.pdot.done{background:var(--accent)}

.ring-wrap{position:relative;width:min(290px,76vw);height:min(290px,76vw);margin:0 auto}
.ring-svg{width:100%;height:100%}
circle.track{fill:none;stroke:var(--s2);stroke-width:11}
circle.prog{fill:none;stroke-linecap:round;stroke-width:11;transition:stroke-dashoffset 1s linear,stroke .4s}

.flow-bar{width:100%;background:rgba(240,180,41,.08);border:1px solid rgba(240,180,41,.25);border-radius:var(--r);padding:12px 14px;display:none;align-items:center;justify-content:space-between;gap:10px;margin:4px 0}
.flow-bar.vis{display:flex}
.flow-bar span{font-size:13px;color:var(--warn)}
.btn-extend{background:rgba(240,180,41,.18);border:none;border-radius:9px;color:var(--warn);font-size:13px;font-weight:700;padding:8px 13px;cursor:pointer;white-space:nowrap}

.badges{display:flex;gap:8px;min-height:34px;overflow:hidden}
.badge{background:var(--s1);border-radius:10px;padding:7px 12px;font-size:12px;color:var(--muted);opacity:0;transform:translateY(4px);transition:opacity .4s,transform .4s;pointer-events:none;white-space:nowrap}
.badge.show{opacity:1;transform:translateY(0);pointer-events:auto}

.t-ctrls{display:flex;gap:10px;flex-shrink:0}
.btn-c{flex:1;padding:16px 8px;border:none;border-radius:var(--r);font-size:15px;font-weight:600;cursor:pointer;font-family:inherit}
.btn-c:active{transform:scale(.97)}
.bc-pause{background:var(--s2);color:var(--text)}
.bc-skip{background:var(--s1);color:var(--muted)}
.bc-end{background:rgba(224,82,82,.1);color:var(--red)}

/* ── BREAK ─────────────────────────────────────────── */
#break-screen{align-items:center;justify-content:space-between;text-align:center}
.brk-top{width:100%;display:flex;align-items:center;justify-content:space-between;padding:4px 0}
.brk-hero{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px}
.breathe-ring{width:min(180px,50vw);height:min(180px,50vw);border-radius:50%;border:1.5px solid rgba(61,186,140,.3);display:flex;align-items:center;justify-content:center;position:relative}
.breathe-ring::before{content:'';position:absolute;inset:-1px;border-radius:50%;background:radial-gradient(circle,rgba(61,186,140,.12),transparent 70%);animation:b-scale 8s ease-in-out infinite}
.breathe-ring::after{content:'';position:absolute;inset:14px;border-radius:50%;border:1px solid rgba(61,186,140,.15);animation:b-scale 8s ease-in-out infinite .2s}
@keyframes b-scale{0%,100%{transform:scale(.88);opacity:.6}50%{transform:scale(1.08);opacity:1}}
.brk-time{font-size:52px;font-weight:200;letter-spacing:-2.5px;font-variant-numeric:tabular-nums}
.brk-label{font-size:14px;color:var(--brk)}
.brk-ctrls{width:100%;display:flex;gap:10px;flex-shrink:0}

/* ── ERROR LOG ─────────────────────────────────────── */
.el-prompt{background:var(--s1);border-radius:var(--r);padding:13px 15px;font-size:13px;color:var(--muted);line-height:1.65;margin-bottom:4px}
.el-prompt strong{color:var(--err);font-weight:600}
.energy-row{display:flex;gap:7px;justify-content:space-between}
.e-btn{flex:1;padding:12px 4px;background:var(--s1);border:1.5px solid transparent;border-radius:var(--r);font-size:22px;cursor:pointer;text-align:center;transition:all .15s}
.e-btn:active{transform:scale(.95)}
.e-btn.sel{border-color:var(--accent);background:var(--accent-l)}
.tarea{width:100%;background:var(--s1);border:1.5px solid var(--hint);border-radius:var(--r);padding:13px 15px;font-size:14px;color:var(--text);outline:none;resize:none;font-family:inherit;line-height:1.65;min-height:110px}
.tarea:focus{border-color:var(--err)}
.tarea::placeholder{color:var(--muted)}
.btn-skip{width:100%;padding:14px;border:none;background:none;color:var(--muted);font-size:14px;cursor:pointer;font-family:inherit}

/* ── STATS ─────────────────────────────────────────── */
.s-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
.scard{background:var(--s1);border-radius:var(--r);padding:14px 15px}
.scard-lbl{font-size:12px;color:var(--muted);margin-bottom:5px}
.scard-val{font-size:28px;font-weight:700;letter-spacing:-.5px}
.scard-unit{font-size:11px;color:var(--muted);margin-top:1px}
.hist-item{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:14px}
.hist-item:last-child{border:none}
.hi-sub{font-size:11px;color:var(--muted);margin-top:2px}

/* ── SCROLLABLE CONTENT ────────────────────────────── */
.scroll-area{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}
.scroll-area::-webkit-scrollbar{display:none}
</style>
</head>
<body>

<!-- ═══════════════════════════════ SETUP ══════════════════════════════════ -->
<div class="screen active" id="setup-screen">
  <div class="hdr">
    <span class="app-name">Revision</span>
    <div class="streak-chip" id="streak-chip" onclick="goStats()">🔥 <span id="streak-num">0</span> days</div>
  </div>

  <div class="scroll-area">
    <button class="schedule-btn" onclick="startScheduleMode()">
      <div class="sb-left">📋 Today's schedule</div>
      <div class="sb-right">3 sessions · starts 5pm</div>
    </button>

    <div class="lbl">Subject</div>
    <input class="tinput" id="subj" type="text" placeholder="e.g. Chemistry, Maths…" autocomplete="off" spellcheck="false">

    <div class="lbl">Session length</div>
    <div class="grid-3" id="type-grid">
      <div class="card" data-t="30" onclick="selType(this)">
        <div class="cd">30m</div>
        <div class="cs">25m focus<br>+ error log</div>
      </div>
      <div class="card" data-t="40" onclick="selType(this)">
        <div class="cd">40m</div>
        <div class="cs">35m focus<br>+ error log</div>
      </div>
      <div class="card sel" data-t="60" onclick="selType(this)">
        <div class="cd">60m</div>
        <div class="cs">50m focus<br>break + log</div>
      </div>
      <div class="card" data-t="90" onclick="selType(this)">
        <div class="cd">90m</div>
        <div class="cs">75m focus<br>break + log</div>
      </div>
      <div class="card" data-t="custom" onclick="selType(this)">
        <div class="cd">Custom</div>
        <div class="cs">set your<br>own time</div>
      </div>
    </div>

    <div class="custom-row" id="custom-row" style="margin-top:9px">
      <input class="tinput" id="cust-focus" type="number" min="5" max="180" placeholder="Focus mins">
      <input class="tinput" id="cust-break" type="number" min="0" max="60" placeholder="Break mins (0=none)">
    </div>

    <div class="lbl">Pomodoro mode</div>
    <div class="grid-3" id="pomo-grid">
      <div class="card" data-t="pomo-c" onclick="selType(this)">
        <div class="cd" style="font-size:15px">Classic</div>
        <div class="cs">25m / 5m<br>4 rounds</div>
      </div>
      <div class="card" data-t="pomo-e" onclick="selType(this)">
        <div class="cd" style="font-size:15px">Extended</div>
        <div class="cs">52m / 17m<br>DeskTime</div>
      </div>
      <div class="card" data-t="pomo-u" onclick="selType(this)">
        <div class="cd" style="font-size:15px">Ultradian</div>
        <div class="cs">90m / 20m<br>brain cycle</div>
      </div>
    </div>

    <div class="info-box" id="pomo-info">
      <b>Why longer Pomodoros?</b> Standard 25-min blocks are criticised for interrupting flow state — the deep cognitive mode you want to be in. DeskTime research found the most productive workers focus for <b>52 min</b> then rest <b>17 min</b>. Ultradian rhythm (<b>90 min</b>) matches your brain's natural focus-rest cycle.<br><br>Both modes include a <b>flow check</b>: 3 min before the break, you'll be asked if you're in the zone. You can extend by 5 min without resetting the session.
    </div>

    <div class="lbl">Settings</div>
    <div class="row-toggle">
      <span>🔔 Notifications</span>
      <div class="tgl" id="tgl-notif" onclick="toggleS(this,'notif')"></div>
    </div>
    <div class="row-toggle">
      <span>🔊 Sound chimes</span>
      <div class="tgl on" id="tgl-sound" onclick="toggleS(this,'sound')"></div>
    </div>
    <div class="row-toggle">
      <span>👁 20-20-20 eye reminders</span>
      <div class="tgl on" id="tgl-eye" onclick="toggleS(this,'eye')"></div>
    </div>
    <div class="row-toggle">
      <span>💧 Hydration reminders</span>
      <div class="tgl on" id="tgl-hydra" onclick="toggleS(this,'hydra')"></div>
    </div>
    <div class="row-toggle" style="margin-bottom:0">
      <span>🧍 Posture checks</span>
      <div class="tgl on" id="tgl-posture" onclick="toggleS(this,'posture')"></div>
    </div>
    <div style="height:16px"></div>
  </div>

  <button class="btn-start" onclick="startSession()">Start Session</button>
</div>

<!-- ═══════════════════════════════ TIMER ══════════════════════════════════ -->
<div class="screen" id="timer-screen">
  <div class="t-top">
    <div class="phase-pill pp-focus" id="phase-lbl">Focus</div>
    <div class="subj-tag" id="t-subj">Revision</div>
    <button class="btn-ghost" onclick="goStats()">Stats ›</button>
  </div>

  <div class="pdots" id="pdots"></div>

  <div class="ring-wrap">
    <svg class="ring-svg" viewBox="0 0 290 290">
      <circle class="track" cx="145" cy="145" r="126"/>
      <circle class="prog" id="ring" cx="145" cy="145" r="126"
        stroke="var(--focus)"
        stroke-dasharray="791.68"
        stroke-dashoffset="0"
        transform="rotate(-90 145 145)"/>
      <text id="t-time" x="145" y="138"
        font-size="56" font-weight="200" fill="var(--text)"
        text-anchor="middle" dominant-baseline="middle"
        font-family="-apple-system,BlinkMacSystemFont,sans-serif"
        font-variant-numeric="tabular-nums">50:00</text>
      <text id="t-sub" x="145" y="172"
        font-size="13" fill="var(--muted)"
        text-anchor="middle" dominant-baseline="middle"
        font-family="-apple-system,sans-serif">Deep focus</text>
      <text id="t-sess" x="145" y="192"
        font-size="11" fill="var(--hint)"
        text-anchor="middle" dominant-baseline="middle"
        font-family="-apple-system,sans-serif">Session 1</text>
    </svg>
  </div>

  <div class="flow-bar" id="flow-bar">
    <span>🌊 In the zone? Break in 3 min</span>
    <button class="btn-extend" onclick="extendFocus()">+ 5 min</button>
  </div>

  <div class="badges" id="badges">
    <div class="badge" id="b-eye">👁 Look 20ft away — 20 secs</div>
    <div class="badge" id="b-hydra">💧 Water check</div>
    <div class="badge" id="b-posture">🧍 Posture check</div>
  </div>

  <div class="t-ctrls">
    <button class="btn-c bc-pause" id="btn-pause" onclick="togglePause()">Pause</button>
    <button class="btn-c bc-skip" onclick="skipPhase()">Skip ›</button>
    <button class="btn-c bc-end" onclick="endSession()">End</button>
  </div>
</div>

<!-- ═══════════════════════════════ BREAK ══════════════════════════════════ -->
<div class="screen" id="break-screen">
  <div class="brk-top">
    <div class="phase-pill pp-break" id="brk-lbl">Break</div>
    <button class="btn-ghost" onclick="skipPhase()">Skip ›</button>
  </div>

  <div class="brk-hero">
    <div style="font-size:16px;font-weight:500" id="brk-title">Step away from the screen</div>
    <div class="breathe-ring">
      <div style="text-align:center">
        <div style="font-size:13px;color:var(--brk)" id="brk-breathe">Breathe in…</div>
      </div>
    </div>
    <div class="brk-time" id="brk-time">05:00</div>
    <div class="brk-label" id="brk-sublabel">Hydrate · stretch · look outside</div>
  </div>

  <div class="brk-ctrls">
    <button class="btn-c bc-pause" id="brk-pause" onclick="togglePause()">Pause</button>
    <button class="btn-c bc-skip" onclick="skipPhase()">Done early</button>
  </div>
</div>

<!-- ═══════════════════════════════ ERROR LOG ══════════════════════════════ -->
<div class="screen" id="log-screen">
  <div style="font-size:20px;font-weight:700;padding:8px 0 12px;letter-spacing:-.3px">Error Log</div>

  <div class="scroll-area">
    <div class="el-prompt">
      <strong>Session complete.</strong> Note anything that tripped you up — unclear concepts, careless errors, knowledge gaps. These are your highest-value revision targets.
    </div>

    <div class="lbl">Energy this session</div>
    <div class="energy-row">
      <div class="e-btn" data-e="1" onclick="selEnergy(this)">😴</div>
      <div class="e-btn" data-e="2" onclick="selEnergy(this)">😕</div>
      <div class="e-btn" data-e="3" onclick="selEnergy(this)">😐</div>
      <div class="e-btn" data-e="4" onclick="selEnergy(this)">🙂</div>
      <div class="e-btn" data-e="5" onclick="selEnergy(this)">🔥</div>
    </div>

    <div class="lbl">Errors & gaps</div>
    <textarea class="tarea" id="log-errors" placeholder="e.g. Couldn't recall Le Chatelier's principle · mixed up ionic vs covalent · wrong formula for momentum…"></textarea>

    <div class="lbl">Review targets for next time</div>
    <textarea class="tarea" id="log-review" placeholder="e.g. Re-read equilibrium chapter · practice mole calculations · flashcards on definitions…" style="min-height:90px"></textarea>
    <div style="height:8px"></div>
  </div>

  <button class="btn-start" style="background:var(--err)" onclick="doneLog()">Save &amp; Continue</button>
  <button class="btn-skip" onclick="doneLog(true)">Skip error log</button>
</div>

<!-- ═══════════════════════════════ STATS ══════════════════════════════════ -->
<div class="screen" id="stats-screen">
  <div class="hdr">
    <span class="app-name">Stats</span>
    <button class="btn-ghost" style="font-size:15px;color:var(--accent)" onclick="showScreen('setup-screen')">← Back</button>
  </div>

  <div class="scroll-area">
    <div class="s-grid">
      <div class="scard">
        <div class="scard-lbl">🔥 Streak</div>
        <div class="scard-val" id="st-streak">0</div>
        <div class="scard-unit">days</div>
      </div>
      <div class="scard">
        <div class="scard-lbl">⏱ Today</div>
        <div class="scard-val" id="st-today">0</div>
        <div class="scard-unit">minutes</div>
      </div>
      <div class="scard">
        <div class="scard-lbl">📚 Sessions</div>
        <div class="scard-val" id="st-total">0</div>
        <div class="scard-unit">all time</div>
      </div>
      <div class="scard">
        <div class="scard-lbl">🌊 Flow ext.</div>
        <div class="scard-val" id="st-flow">0</div>
        <div class="scard-unit">times in flow</div>
      </div>
    </div>

    <div class="lbl">Recent sessions</div>
    <div style="background:var(--s1);border-radius:var(--r);padding:4px 14px" id="hist-list">
      <div style="color:var(--muted);font-size:14px;text-align:center;padding:14px">No sessions yet</div>
    </div>

    <div class="lbl">Your daily schedule</div>
    <div style="background:var(--s1);border-radius:var(--r);overflow:hidden">
      <div style="display:flex;justify-content:space-between;padding:11px 14px;font-size:13px;border-bottom:1px solid rgba(255,255,255,.05)">
        <span>Session 1</span><span style="color:var(--muted)">5:00 – 6:00pm · 60min</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:11px 14px;font-size:13px;border-bottom:1px solid rgba(255,255,255,.05)">
        <span>Session 2</span><span style="color:var(--muted)">6:20 – 7:20pm · 60min</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:11px 14px;font-size:13px">
        <span>Session 3</span><span style="color:var(--muted)">7:40 – 8:10pm · 30min</span>
      </div>
    </div>
    <div style="height:12px"></div>
  </div>

  <button class="btn-start" onclick="showScreen('setup-screen')">New Session</button>
</div>

<script>
/* ──────────────────── CONSTANTS ──────────────────── */
const CIRC = 791.68; // 2π×126

const SESSIONS = {
  '30':[
    {t:'focus',d:25*60,l:'Deep Focus',s:'25 min block'},
    {t:'log',d:5*60,l:'Error Log',s:''}
  ],
  '40':[
    {t:'focus',d:35*60,l:'Deep Focus',s:'35 min block'},
    {t:'log',d:5*60,l:'Error Log',s:''}
  ],
  '60':[
    {t:'focus',d:50*60,l:'Deep Focus',s:'50 min block'},
    {t:'brk',d:5*60,l:'Break',s:'5 min — step away'},
    {t:'log',d:5*60,l:'Error Log',s:''}
  ],
  '90':[
    {t:'focus',d:75*60,l:'Deep Focus',s:'75 min block'},
    {t:'brk',d:10*60,l:'Break',s:'10 min — recover'},
    {t:'log',d:5*60,l:'Error Log',s:''}
  ],
  'pomo-e':[
    {t:'focus',d:52*60,l:'Deep Focus',s:'52 min · DeskTime method'},
    {t:'brk',d:17*60,l:'Break',s:'17 min · no screens'},
    {t:'log',d:5*60,l:'Error Log',s:''}
  ],
  'pomo-u':[
    {t:'focus',d:90*60,l:'Ultradian Block',s:'90 min · brain cycle'},
    {t:'brk',d:20*60,l:'Recovery',s:'20 min · light rest'},
    {t:'log',d:5*60,l:'Error Log',s:''}
  ],
};

// Build classic pomo: 4×(25m focus + 5m break), long break at end, then log
function buildPomoC() {
  const p=[];
  for(let i=0;i<4;i++){
    p.push({t:'focus',d:25*60,l:`Focus ${i+1} of 4`,s:'25 min'});
    p.push(i<3
      ?{t:'brk',d:5*60,l:'Short Break',s:'5 min'}
      :{t:'brk',d:15*60,l:'Long Break',s:'15 min — you earned it'});
  }
  p.push({t:'log',d:5*60,l:'Error Log',s:''});
  return p;
}

// Your daily schedule: 3 sessions (flexible start)
function buildSchedule() {
  return [
    // Session 1: 60 min
    {t:'focus',d:50*60,l:'Session 1 · Focus',s:'50 min'},
    {t:'brk',d:5*60,l:'Break',s:'5 min'},
    {t:'log',d:5*60,l:'Error Log',s:''},
    // Inter-session gap indicator (we skip to next)
    {t:'focus',d:50*60,l:'Session 2 · Focus',s:'50 min'},
    {t:'brk',d:5*60,l:'Break',s:'5 min'},
    {t:'log',d:5*60,l:'Error Log',s:''},
    // Session 3: 30 min
    {t:'focus',d:25*60,l:'Session 3 · Focus',s:'25 min'},
    {t:'log',d:5*60,l:'Final Error Log',s:''},
  ];
}

/* ──────────────────── STATE ──────────────────── */
let S = {
  type:'60', subject:'', phases:[], phaseIdx:0,
  timeLeft:0, totalTime:0, paused:false,
  flowShown:false, flowExts:0,
  sessionN:0, energy:0,
  ticker:null, eyeT:null, hydraT:null, postureT:null, breatheT:null,
};

let CFG = JSON.parse(localStorage.getItem('rv_cfg')||'{"notif":false,"sound":true,"eye":true,"hydra":true,"posture":true}');
let STATS = JSON.parse(localStorage.getItem('rv_stats')||'{"streak":0,"lastDay":"","total":0,"mins":0,"flow":0,"hist":[]}');

/* ──────────────────── AUDIO ──────────────────── */
let actx = null;
function ac(){
  if(!actx) actx = new (window.AudioContext||window.webkitAudioContext)();
  return actx;
}
function tone(type){
  if(!CFG.sound) return;
  try{
    const ctx=ac();
    const notes={
      start:[[440,.08],[550,.08],[660,.18]],
      end:  [[660,.12],[550,.12],[440,.28]],
      warn: [[600,.18],[400,.28]],
      done: [[523,.1],[659,.1],[784,.12],[1047,.28]],
      soft: [[880,.06]],
    };
    let t=ctx.currentTime;
    (notes[type]||notes.soft).forEach(([f,d])=>{
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.connect(g);g.connect(ctx.destination);
      o.frequency.value=f;o.type='sine';
      g.gain.setValueAtTime(.28,t);
      g.gain.exponentialRampToValueAtTime(.001,t+d);
      o.start(t);o.stop(t+d);
      t+=d*.85;
    });
  }catch(e){}
}

/* ──────────────────── NOTIFICATIONS ──────────────────── */
async function askNotif(){
  if(!('Notification'in window))return;
  const p=await Notification.requestPermission();
  CFG.notif=p==='granted';
  saveCFG();
  document.getElementById('tgl-notif').classList.toggle('on',CFG.notif);
}
function notify(title,body){
  if(CFG.notif&&Notification.permission==='granted') new Notification(title,{body,silent:false});
  if('vibrate'in navigator) navigator.vibrate([180,80,180]);
}

/* ──────────────────── UI HELPERS ──────────────────── */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function fmt(s){
  const m=Math.floor(s/60),sec=s%60;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}
function saveCFG(){localStorage.setItem('rv_cfg',JSON.stringify(CFG));}
function saveStats(){localStorage.setItem('rv_stats',JSON.stringify(STATS));}

/* ──────────────────── SETUP INTERACTIONS ──────────────────── */
let selT='60';
function selType(el){
  document.querySelectorAll('#type-grid .card,#pomo-grid .card').forEach(c=>{
    c.classList.remove('sel','pomo-sel');
  });
  const isPomo=el.dataset.t.startsWith('pomo');
  el.classList.add(isPomo?'pomo-sel':'sel');
  selT=el.dataset.t;
  S.type=selT;
  document.getElementById('pomo-info').style.display=(isPomo&&selT!=='pomo-c')?'block':'none';
  document.getElementById('custom-row').style.display=selT==='custom'?'grid':'none';
}
function toggleS(el,key){
  el.classList.toggle('on');
  CFG[key]=el.classList.contains('on');
  saveCFG();
  if(key==='notif'&&CFG.notif) askNotif();
}
function applySettings(){
  Object.keys(CFG).forEach(k=>{
    const el=document.getElementById('tgl-'+k);
    if(el) el.classList.toggle('on',CFG[k]);
  });
}
function startScheduleMode(){
  S.type='schedule';
  document.getElementById('subj').value='';
  S.subject='Schedule';
  S.phases=buildSchedule();
  beginSession();
}

/* ──────────────────── START ──────────────────── */
function startSession(){
  S.subject=document.getElementById('subj').value.trim()||'Revision';
  S.type=selT;
  if(selT==='custom'){
    const fm=parseInt(document.getElementById('cust-focus').value)||45;
    const bm=parseInt(document.getElementById('cust-break').value)||0;
    S.phases=[{t:'focus',d:fm*60,l:'Deep Focus',s:`${fm} min block`}];
    if(bm>0) S.phases.push({t:'brk',d:bm*60,l:'Break',s:`${bm} min`});
    S.phases.push({t:'log',d:5*60,l:'Error Log',s:''});
  } else if(selT==='pomo-c'){
    S.phases=buildPomoC();
  } else {
    S.phases=SESSIONS[selT]||SESSIONS['60'];
  }
  beginSession();
}

function beginSession(){
  S.phaseIdx=0;
  S.flowShown=false;
  S.flowExts=0;
  S.sessionN++;
  enterPhase(0);
  if(CFG.notif) askNotif();
  startReminders();
}

/* ──────────────────── PHASE ENGINE ──────────────────── */
function enterPhase(idx){
  clearInterval(S.ticker);
  S.phaseIdx=idx;
  const ph=S.phases[idx];
  if(!ph){sessionDone();return;}
  S.timeLeft=ph.d;
  S.totalTime=ph.d;
  S.paused=false;
  S.flowShown=false;

  if(ph.t==='log'){
    stopReminders();
    showLogScreen();
    return;
  }
  if(ph.t==='brk'){
    showBreak(ph);
    startBreathe();
    tone('end');
  } else {
    showTimer(ph);
    tone('start');
  }
  notify(ph.l, ph.s||'');
  S.ticker=setInterval(tick,1000);
}

function tick(){
  if(S.paused)return;
  S.timeLeft=Math.max(0,S.timeLeft-1);
  refreshDisplay();
  const ph=S.phases[S.phaseIdx];
  // Flow check 3 min before break (focus phases only)
  if(ph.t==='focus'&&!S.flowShown&&S.timeLeft===3*60){
    const next=S.phases[S.phaseIdx+1];
    if(next&&next.t==='brk'){showFlowBar();S.flowShown=true;}
  }
  if(S.timeLeft===60){tone('warn');notify(ph.l,'1 minute left');}
  if(S.timeLeft===0){clearInterval(S.ticker);enterPhase(S.phaseIdx+1);}
}

function refreshDisplay(){
  const ph=S.phases[S.phaseIdx];
  if(!ph)return;
  const s=fmt(S.timeLeft);
  if(ph.t==='brk'){
    const el=document.getElementById('brk-time');
    if(el)el.textContent=s;
  } else {
    const el=document.getElementById('t-time');
    if(el)el.textContent=s;
    const ring=document.getElementById('ring');
    if(ring){
      const off=CIRC*(1-S.timeLeft/S.totalTime);
      ring.style.strokeDashoffset=off;
    }
  }
}

/* ──────────────────── CONTROLS ──────────────────── */
function togglePause(){
  S.paused=!S.paused;
  ['btn-pause','brk-pause'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.textContent=S.paused?'Resume':'Pause';
  });
}
function skipPhase(){clearInterval(S.ticker);hideFlowBar();stopBreathe();enterPhase(S.phaseIdx+1);}
function endSession(){
  clearInterval(S.ticker);
  stopReminders();
  stopBreathe();
  showScreen('setup-screen');
}
function extendFocus(){
  S.timeLeft+=5*60;
  S.totalTime+=5*60;
  S.flowExts++;
  STATS.flow=(STATS.flow||0)+1;
  hideFlowBar();
  S.flowShown=true;
  tone('start');
  notify('Flow extended','+5 min added');
}
function showFlowBar(){
  document.getElementById('flow-bar').classList.add('vis');
  tone('warn');
}
function hideFlowBar(){
  document.getElementById('flow-bar').classList.remove('vis');
}

/* ──────────────────── SCREEN BUILDERS ──────────────────── */
function showTimer(ph){
  showScreen('timer-screen');
  // Phase pill
  const pill=document.getElementById('phase-lbl');
  pill.textContent=ph.l;
  pill.className='phase-pill pp-focus';
  // Subjects
  document.getElementById('t-subj').textContent=S.subject;
  document.getElementById('t-time').textContent=fmt(ph.d);
  document.getElementById('t-sub').textContent=ph.s||'';
  document.getElementById('t-sess').textContent=`Session ${S.sessionN}`;
  // Ring color
  const ring=document.getElementById('ring');
  ring.style.stroke='var(--focus)';
  ring.style.strokeDashoffset='0';
  document.getElementById('btn-pause').textContent='Pause';
  hideFlowBar();
  renderDots();
}
function showBreak(ph){
  showScreen('break-screen');
  document.getElementById('brk-lbl').textContent=ph.l;
  document.getElementById('brk-title').textContent=ph.l;
  document.getElementById('brk-time').textContent=fmt(ph.d);
  document.getElementById('brk-sublabel').textContent=ph.s||'Hydrate · stretch · look outside';
  document.getElementById('brk-pause').textContent='Pause';
}
function renderDots(){
  const c=document.getElementById('pdots');
  c.innerHTML='';
  const COLS={focus:'var(--focus)',brk:'var(--brk)',log:'var(--err)'};
  S.phases.forEach((p,i)=>{
    const d=document.createElement('div');
    d.className='pdot';
    if(i<S.phaseIdx)d.style.background='var(--accent)',d.classList.add('done');
    else if(i===S.phaseIdx){d.style.background=COLS[p.t]||'var(--focus)';d.classList.add('active');}
    c.appendChild(d);
  });
}

/* ──────────────────── BREATHE ──────────────────── */
const BRK_PHASES=['Breathe in…','Hold…','Breathe out…','Hold…'];
const BRK_DURS=[4000,2000,4000,2000];
let brkStep=0;
function startBreathe(){
  stopBreathe();brkStep=0;nextBrk();
}
function nextBrk(){
  const el=document.getElementById('brk-breathe');
  if(el)el.textContent=BRK_PHASES[brkStep%4];
  S.breatheT=setTimeout(()=>{brkStep++;nextBrk();},BRK_DURS[brkStep%4]);
}
function stopBreathe(){clearTimeout(S.breatheT);}

/* ──────────────────── ERROR LOG ──────────────────── */
function showLogScreen(){
  showScreen('log-screen');
  document.getElementById('log-errors').value='';
  document.getElementById('log-review').value='';
  document.querySelectorAll('.e-btn').forEach(b=>b.classList.remove('sel'));
  S.energy=0;
  tone('done');
  notify('Session complete!','Time to log errors.');
}
function selEnergy(el){
  document.querySelectorAll('.e-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  S.energy=parseInt(el.dataset.e);
}
function doneLog(skip){
  recordSession();
  stopBreathe();
  showScreen('setup-screen');
  refreshStats();
}

/* ──────────────────── SESSION DONE ──────────────────── */
function sessionDone(){
  tone('done');
  notify('All done!','Excellent revision session.');
  recordSession();
  showScreen('setup-screen');
  refreshStats();
}
function recordSession(){
  const today=new Date().toDateString();
  const focusMins=Math.round(S.phases.filter(p=>p.t==='focus').reduce((a,p)=>a+p.d,0)/60);
  STATS.total++;
  STATS.mins+=focusMins;
  if(STATS.lastDay!==today){
    const yest=new Date();yest.setDate(yest.getDate()-1);
    STATS.streak=STATS.lastDay===yest.toDateString()?STATS.streak+1:1;
    STATS.lastDay=today;
  }
  STATS.hist.unshift({
    date:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
    dateStr:today,
    subj:S.subject,type:S.type,mins:focusMins,energy:S.energy
  });
  if(STATS.hist.length>60)STATS.hist.pop();
  saveStats();
}

/* ──────────────────── REMINDERS ──────────────────── */
function startReminders(){
  stopReminders();
  if(CFG.eye) S.eyeT=setInterval(()=>flash('b-eye',3500),20*60*1000);
  if(CFG.hydra) S.hydraT=setInterval(()=>flash('b-hydra',4000),45*60*1000);
  if(CFG.posture) S.postureT=setInterval(()=>flash('b-posture',3000),30*60*1000);
}
function flash(id,ms){
  const el=document.getElementById(id);
  if(!el)return;
  el.classList.add('show');
  tone('soft');
  setTimeout(()=>el.classList.remove('show'),ms);
}
function stopReminders(){
  [S.eyeT,S.hydraT,S.postureT].forEach(clearInterval);
}

/* ──────────────────── STATS SCREEN ──────────────────── */
function goStats(){refreshStats();showScreen('stats-screen');}
function refreshStats(){
  document.getElementById('st-streak').textContent=STATS.streak;
  document.getElementById('st-total').textContent=STATS.total;
  document.getElementById('st-flow').textContent=STATS.flow||0;
  document.getElementById('streak-num').textContent=STATS.streak;
  const today=new Date().toDateString();
  const todayMins=STATS.hist.filter(h=>h.dateStr===today).reduce((a,h)=>a+(h.mins||0),0);
  document.getElementById('st-today').textContent=todayMins;
  const emo=['','😴','😕','😐','🙂','🔥'];
  const typeNames={'30':'30m','40':'40m','60':'60m','90':'90m','pomo-c':'Classic Pomo','pomo-e':'Extended Pomo','pomo-u':'Ultradian','custom':'Custom','schedule':'Schedule'};
  const el=document.getElementById('hist-list');
  if(!STATS.hist.length){
    el.innerHTML='<div style="color:var(--muted);font-size:14px;text-align:center;padding:14px">No sessions yet</div>';
    return;
  }
  el.innerHTML=STATS.hist.slice(0,12).map(h=>`
    <div class="hist-item">
      <div>
        <div style="font-weight:500">${h.subj}</div>
        <div class="hi-sub">${h.date} · ${typeNames[h.type]||h.type} · ${h.mins}m focus</div>
      </div>
      <div style="font-size:20px">${emo[h.energy]||''}</div>
    </div>`).join('');
}

/* ──────────────────── PWA ──────────────────── */
function injectManifest(){
  try{
    const m={name:'Revision Timer',short_name:'Revision',start_url:'.',display:'standalone',background_color:'#0c0c10',theme_color:'#0c0c10',icons:[{src:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%237c6af7'/%3E%3Ctext y='.9em' font-size='55' font-family='system-ui'%3E📚%3C/text%3E%3C/svg%3E",sizes:'192x192',type:'image/svg+xml'}]};
    const url=URL.createObjectURL(new Blob([JSON.stringify(m)],{type:'application/json'}));
    const l=document.createElement('link');l.rel='manifest';l.href=url;
    document.head.appendChild(l);
  }catch(e){}
}

/* ──────────────────── INIT ──────────────────── */
applySettings();
refreshStats();
injectManifest();
// Unlock audio context on first touch (required on iOS)
document.addEventListener('touchstart',()=>{try{ac().resume();}catch(e){}},{once:true,passive:true});
document.addEventListener('click',()=>{try{ac().resume();}catch(e){}},{once:true});
</script>
</body>
</html>
