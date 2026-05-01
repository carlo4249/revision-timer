// js/stats.js -- Solus stats page

let statPeriod = 'week';

function onAdminChange() { renderTargetVsAchieved(); }
function onDataCleared() { refreshStats(); }

function getHistInPeriod() {
  const hist = Array.isArray(STATS.hist) ? STATS.hist : [];
  if (statPeriod === 'week') {
    const ws = new Date(); ws.setDate(ws.getDate()-ws.getDay()); ws.setHours(0,0,0,0);
    return hist.filter(h => h.dateStr && new Date(h.dateStr) >= ws);
  }
  if (statPeriod === 'month') {
    const ms = new Date(); ms.setDate(ms.getDate()-30); ms.setHours(0,0,0,0);
    return hist.filter(h => h.dateStr && new Date(h.dateStr) >= ms);
  }
  return hist;
}

function setPeriod(p) {
  statPeriod = p;
  const lblMap = { week:'This week', month:'This month', all:'All time' };
  const lbl = el('st-period-lbl'); if (lbl) lbl.textContent = lblMap[p]||'This week';
  const ctitle = el('chart-title-lbl');
  if (ctitle) ctitle.textContent = p==='week'?'This week (minutes)':p==='month'?'Last 30 days (minutes)':'All time (minutes)';
  refreshStats();
}

function refreshStats() {
  const today = new Date().toDateString();
  const hist = Array.isArray(STATS.hist) ? STATS.hist : [];
  const todayMins = hist.filter(h=>h.dateStr===today).reduce((a,h)=>a+(h.mins||0),0);
  const periodHist = getHistInPeriod();
  const periodMins = periodHist.reduce((a,h)=>a+(h.mins||0),0);
  const periodCount = periodHist.length;
  setText('st-today', String(todayMins||0));
  setText('st-week',  String(periodMins||0));
  setText('st-total', String(STATS.total||0));
  setText('st-mins',  String(STATS.mins||0));
  const lbl = el('st-period-lbl');
  if (lbl) {
    const m = { week:'This week', month:'This month', all:'All time' };
    lbl.textContent = `${m[statPeriod]||'This week'} (${periodCount} session${periodCount!==1?'s':''})`;
  }
  renderWeekChart();
  renderSubjBars();
  if (isAdmin) {
    const ta = el('target-achieved'), tl = el('targets-lbl');
    if (ta) ta.style.display = 'block';
    if (tl) tl.style.display = 'block';
    renderTargetVsAchieved();
  }
}

let _chartRAF = 0;
function renderWeekChart() { cancelAnimationFrame(_chartRAF); _chartRAF = requestAnimationFrame(_doRenderWeekChart); }
function _doRenderWeekChart() {
  const canvas = el('week-chart'); if (!canvas) return;
  const W = canvas.offsetWidth; if (!W) return;
  const dpr = Math.min(window.devicePixelRatio||1,3);
  canvas.width=W*dpr; canvas.height=90*dpr;
  canvas.style.width=W+'px'; canvas.style.height='90px';
  const ctx = canvas.getContext('2d'); ctx.scale(dpr,dpr);
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], today=new Date(), data=[];
  for (let i=6;i>=0;i--) {
    const d=new Date(today); d.setDate(d.getDate()-i);
    const ds=d.toDateString(), hist=Array.isArray(STATS.hist)?STATS.hist:[];
    const mins=hist.filter(h=>h.dateStr===ds).reduce((a,h)=>a+(h.mins||0),0);
    data.push({label:days[d.getDay()],mins,today:i===0});
  }
  const maxMins=Math.max(...data.map(d=>d.mins),60);
  const barW=(W-40)/7-6, chartH=68;
  ctx.clearRect(0,0,W,90);
  const isDark=document.documentElement.getAttribute('data-theme')!=='light';
  data.forEach((d,i)=>{
    const x=20+i*((W-40)/7), barH=d.mins>0?(d.mins/maxMins)*chartH:2, y=chartH-barH+8;
    ctx.beginPath(); ctx.roundRect(x,y,barW,barH,3);
    if (d.today&&d.mins>0){const g=ctx.createLinearGradient(x,y,x,y+barH);g.addColorStop(0,'#60c8fb');g.addColorStop(1,'#1098f7');ctx.fillStyle=g;}
    else ctx.fillStyle=d.mins>0?(isDark?'#3c5c48':'#7aaa8a'):(isDark?'#1c1f1f':'#d8d8d3');
    ctx.fill();
    ctx.fillStyle=isDark?'#3a5044':'#9aaa9a'; ctx.font='600 9px Outfit,sans-serif'; ctx.textAlign='center';
    ctx.fillText(d.label,x+barW/2,85);
    if(d.mins>0){ctx.fillStyle=d.today?'#60c8fb':(isDark?'#4a7060':'#5a8068');ctx.font='700 9px Outfit,sans-serif';ctx.fillText(String(d.mins),x+barW/2,y-3);}
  });
}

function renderTargetVsAchieved() {
  const target=el('target-achieved'); if(!target)return;
  const ws=new Date(); ws.setDate(ws.getDate()-ws.getDay()); ws.setHours(0,0,0,0);
  const achieved={}, hist=Array.isArray(STATS.hist)?STATS.hist:[];
  hist.forEach(h=>{if(h.dateStr&&new Date(h.dateStr)>=ws&&h.subj)achieved[h.subj]=(achieved[h.subj]||0)+(h.mins||0);});
  if(!Object.keys(achieved).length){target.innerHTML='<div style="font-size:13px;color:var(--hint);text-align:center;padding:6px">No sessions this week yet</div>';return;}
  target.innerHTML=SUBJECTS.map(s=>{
    const done=achieved[s.name]||0, pct=Math.min(100,Math.round(done/s.weeklyMins*100)), met=done>=s.weeklyMins;
    return `<div class="target-row"><div class="tr-top"><span class="tr-name">${escHtml(s.name)}</span><span class="tr-nums ${met?'met':''}">${done}/${s.weeklyMins}m${met?' \u2713':''}</span></div><div class="tr-track"><div class="tr-fill ${met?'met':''}" style="width:${pct}%"></div></div></div>`;
  }).join('');
}

function renderSubjBars() {
  const bars=el('subj-bars'); if(!bars)return;
  const mins={}, hist=Array.isArray(STATS.hist)?STATS.hist:[];
  hist.forEach(h=>{if(h.subj)mins[h.subj]=(mins[h.subj]||0)+(h.mins||0);});
  const sorted=Object.entries(mins).sort((a,b)=>b[1]-a[1]).slice(0,8);
  if(!sorted.length){bars.innerHTML='<div class="stats-empty"><div class="stats-empty-icon">&#128202;</div><div class="stats-empty-title">No sessions yet</div><div class="stats-empty-sub">Your subject breakdown appears here after your first session.</div></div>';return;}
  const maxVal=sorted[0][1];
  bars.innerHTML=sorted.map(([subj,m])=>`<div class="subj-bar-row"><div class="subj-bar-lbl">${escHtml(subj)}</div><div class="subj-bar-track"><div class="subj-bar-fill" style="width:${(m/maxVal*100).toFixed(0)}%"></div></div><div class="subj-bar-n">${m}m</div></div>`).join('');
}

window.addEventListener('resize', renderWeekChart);

commonPageInit('stats', function() {
  refreshStats();
});
