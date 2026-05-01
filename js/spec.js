// js/spec.js -- Solus spec page

let currentSpecSubj = Object.keys(SPEC)[0] || 'Maths';

function onAdminChange() { renderSpec(); }
function onDataCleared() { renderSpec(); }

function renderSpec() {
  const hasUser = !!(currentUser || !window.FIREBASE_ENABLED);
  const specLock = el('spec-lock-view'), specUnlock = el('spec-unlocked-view');
  if (specLock)   specLock.style.display   = hasUser ? 'none'  : 'flex';
  if (specUnlock) specUnlock.style.display = hasUser ? 'block' : 'none';
  if (!hasUser) return;

  const pills = el('spec-pills'), list = el('spec-list'), prog = el('spec-prog-row');
  if (!pills || !list || !prog) return;
  if (!SPEC[currentSpecSubj]) currentSpecSubj = Object.keys(SPEC)[0] || 'Maths';

  pills.innerHTML = Object.keys(SPEC).map(name =>
    `<div class="spec-pill${name===currentSpecSubj?' act':''}" onclick="switchSpec('${escHtml(name)}')">${escHtml(name)}</div>`
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
  const specData = SPEC[currentSpecSubj], conf = SPEC_CONF[currentSpecSubj] || {};
  if (!specData) {
    list.innerHTML = '<div style="font-size:13px;color:var(--muted);padding:12px;text-align:center">Spec data coming soon.</div>';
    prog.innerHTML = ''; return;
  }
  let green=0, amber=0, red=0, none=0, totalIdx=0;
  specData.sections.forEach(sec => {
    sec.points.forEach(() => {
      const c = conf[totalIdx++];
      if (c==='green') green++; else if (c==='amber') amber++; else if (c==='red') red++; else none++;
    });
  });
  const boardBadge = specData.examBoard ? `<div class="spec-exam-board-badge">${escHtml(specData.examBoard)}</div>` : '';
  prog.innerHTML = boardBadge +
    `<div style="display:flex;gap:8px;margin-bottom:14px">
       <div class="spec-prog-badge"><div class="spec-prog-n" style="color:#cc4038">${red}</div><div class="spec-prog-lbl">Red</div></div>
       <div class="spec-prog-badge"><div class="spec-prog-n" style="color:#be8816">${amber}</div><div class="spec-prog-lbl">Amber</div></div>
       <div class="spec-prog-badge"><div class="spec-prog-n" style="color:#3c7250">${green}</div><div class="spec-prog-lbl">Green</div></div>
       <div class="spec-prog-badge"><div class="spec-prog-n" style="color:var(--hint)">${none}</div><div class="spec-prog-lbl">Unrated</div></div>
     </div>`;
  let idx=0, html='';
  specData.sections.forEach(sec => {
    html += `<div class="spec-section-lbl">${escHtml(sec.name)}</div>`;
    sec.points.forEach(p => {
      const c = conf[idx]||'';
      html += `<div class="spec-point" onclick="cycleSpec(${idx},this)"><div class="spec-dot${c?' '+c:''}"></div><div class="spec-txt">${fmtSpec(escHtml(p))}</div></div>`;
      idx++;
    });
  });
  list.innerHTML = html;
}

function cycleSpec(idx, pointEl) {
  if (!SPEC_CONF[currentSpecSubj]) SPEC_CONF[currentSpecSubj] = {};
  const cur = SPEC_CONF[currentSpecSubj][idx]||'';
  const next = {'':'red',red:'amber',amber:'green',green:''}[cur];
  if (next) SPEC_CONF[currentSpecSubj][idx] = next; else delete SPEC_CONF[currentSpecSubj][idx];
  saveSpec();
  const dot = pointEl.querySelector('.spec-dot');
  if (dot) dot.className = 'spec-dot'+(next?' '+next:'');
  renderSpecContent(el('spec-list'), el('spec-prog-row'));
}

function initSpecScroll() {
  const wrap = el('spec-scroll-wrap');
  if (!wrap || wrap._scrollInited) return;
  wrap._scrollInited = true;
  wrap.addEventListener('wheel', e => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { e.preventDefault(); wrap.scrollLeft += e.deltaY * 0.8; }
  }, { passive: false });
  let isDown=false, startX=0, startScrollLeft=0;
  wrap.addEventListener('mousedown', e=>{isDown=true;startX=e.pageX-wrap.offsetLeft;startScrollLeft=wrap.scrollLeft;wrap.style.cursor='grabbing';});
  wrap.addEventListener('mouseleave',()=>{isDown=false;wrap.style.cursor='grab';});
  wrap.addEventListener('mouseup',()=>{isDown=false;wrap.style.cursor='grab';});
  wrap.addEventListener('mousemove',e=>{if(!isDown)return;e.preventDefault();wrap.scrollLeft=startScrollLeft-(e.pageX-wrap.offsetLeft-startX);});
}

commonPageInit('spec', function() {
  initSpecScroll();
  renderSpec();
});
