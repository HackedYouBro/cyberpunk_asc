/**
 * CYBERSHIELD - SECURITY DASHBOARD
 * Visual demonstration charts, simulated SOC threat alerts feed,
 * personal hygiene checklist, and simulated activity telemetry.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThreatDonutChart();
  initThreatStreamFeed();
  initHygieneChecklist();
});

/* ==========================================================================
   INTERACTIVE SVG THREAT VECTOR DONUT CHART
   ========================================================================== */
function initThreatDonutChart() {
  const container = document.getElementById('threat-donut-chart-container');
  if (!container) return;

  const data = [
    { label: 'Phishing & Social Eng.', percent: 41, color: '#ffd700' },
    { label: 'Ransomware Payloads', percent: 24, color: '#ef4444' },
    { label: 'Credential Stuffing', percent: 18, color: '#f59e0b' },
    { label: 'Zero-Day / Exploit Kits', percent: 11, color: '#d97706' },
    { label: 'Insider Threat / Misconfig', percent: 6, color: '#fde047' }
  ];

  const size = 260;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const paths = data.map((item) => {
    const strokeDasharray = `${(item.percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += item.percent;

    return `
      <circle
        cx="${size / 2}" cy="${size / 2}" r="${radius}"
        fill="transparent"
        stroke="${item.color}"
        stroke-width="${strokeWidth}"
        stroke-dasharray="${strokeDasharray}"
        stroke-dashoffset="${strokeDashoffset}"
        style="transition: stroke-width 0.25s, opacity 0.25s; cursor: pointer;"
        class="chart-segment"
        data-label="${item.label}"
        data-percent="${item.percent}"
      />
    `;
  });

  const legend = data
    .map(
      (item) => `
    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.45rem;">
      <span style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);">
        <span style="width: 10px; height: 10px; border-radius: 50%; background: ${item.color};"></span>
        ${item.label}
      </span>
      <span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">${item.percent}%</span>
    </div>
  `
    )
    .join('');

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
      <div style="position: relative; width: ${size}px; height: ${size}px;">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg);">
          ${paths.join('')}
        </svg>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; pointer-events: none;">
          <div id="chart-center-val" style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #fff;">100%</div>
          <div id="chart-center-lbl" style="font-family: var(--font-subheading); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Vectors</div>
        </div>
      </div>
      <div style="width: 100%; margin-top: 1.5rem;">
        ${legend}
      </div>
    </div>
  `;

  // Add hover effect
  const segments = container.querySelectorAll('.chart-segment');
  const centerVal = container.querySelector('#chart-center-val');
  const centerLbl = container.querySelector('#chart-center-lbl');

  segments.forEach((seg) => {
    seg.addEventListener('mouseenter', () => {
      segments.forEach((s) => (s.style.opacity = '0.45'));
      seg.style.opacity = '1';
      seg.style.strokeWidth = `${strokeWidth + 6}px`;

      centerVal.textContent = `${seg.getAttribute('data-percent')}%`;
      centerLbl.textContent = seg.getAttribute('data-label').split(' ')[0];
    });

    seg.addEventListener('mouseleave', () => {
      segments.forEach((s) => {
        s.style.opacity = '1';
        s.style.strokeWidth = `${strokeWidth}px`;
      });
      centerVal.textContent = '100%';
      centerLbl.textContent = 'Vectors';
    });
  });
}

/* ==========================================================================
   LIVE SIMULATED SOC THREAT STREAM
   ========================================================================== */
function initThreatStreamFeed() {
  const terminal = document.getElementById('soc-terminal-logs');
  const pauseBtn = document.getElementById('soc-pause-btn');
  if (!terminal) return;

  const mockEvents = [
    { type: 'critical', action: 'BLOCKED', desc: 'DDoS SYN Flood mitigated on Gateway Cluster #4 (48,000 req/s)' },
    { type: 'warning', action: 'INTERCEPTED', desc: 'Spear-phishing spoofing campus financial aid quarantined (SHA-256: 4f1a...)' },
    { type: 'info', action: 'INSPECTED', desc: 'Outbound DNS query to known malicious C2 domain sinkholed' },
    { type: 'critical', action: 'QUARANTINED', desc: 'Ransomware .lockbit staging binary neutralized on endpoint node 14B' },
    { type: 'warning', action: 'DETECTED', desc: 'Credential stuffing velocity spike detected (184 failed attempts/min)' },
    { type: 'success', action: 'SECURED', desc: 'Automated SSL/TLS certificate rotation completed successfully' },
    { type: 'info', action: 'TELEMETRY', desc: 'Deep packet inspection scan completed across 14 virtual VLANs' },
    { type: 'critical', action: 'PREVENTED', desc: 'SQL Injection payload filtered on student grade portal endpoint' }
  ];

  let isPaused = false;

  pauseBtn?.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'RESUME STREAM' : 'PAUSE STREAM';
    pauseBtn.classList.toggle('btn-primary');
  });

  function getTimestamp() {
    const d = new Date();
    return d.toTimeString().split(' ')[0] + '.' + Math.floor(d.getMilliseconds() / 100);
  }

  function addLog() {
    if (isPaused) return;

    const event = mockEvents[Math.floor(Math.random() * mockEvents.length)];
    const time = getTimestamp();

    const entry = document.createElement('div');
    entry.className = `log-entry ${event.type}`;
    entry.innerHTML = `
      <span style="color: var(--text-muted); font-size: 0.75rem;">[${time}]</span>
      <span style="font-weight: 700; margin-left: 4px;">[${event.action}]</span>:
      <span>${event.desc}</span>
    `;

    terminal.insertBefore(entry, terminal.firstChild);

    // Keep log buffer bounded to 25 items
    if (terminal.children.length > 25) {
      terminal.removeChild(terminal.lastChild);
    }
  }

  // Pre-seed initial 5 logs
  for (let i = 0; i < 5; i++) {
    addLog();
  }

  // Add new simulated event every 3.5 seconds
  setInterval(addLog, 3500);
}

/* ==========================================================================
   PERSONAL SECURITY HYGIENE CHECKLIST
   ========================================================================== */
function initHygieneChecklist() {
  const checkboxes = document.querySelectorAll('.hygiene-checkbox');
  const scoreDisplay = document.getElementById('hygiene-score-display');
  const STORAGE_KEY = 'cybershield_hygiene_checklist';

  // Load saved checklist state
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  checkboxes.forEach((cb) => {
    const id = cb.getAttribute('data-id');
    if (savedState[id]) {
      cb.checked = true;
    }

    cb.addEventListener('change', () => {
      savedState[id] = cb.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      updateScore();
      if (window.playCyberSound) window.playCyberSound('click');
    });
  });

  function updateScore() {
    const total = checkboxes.length;
    let checked = 0;
    checkboxes.forEach((cb) => {
      if (cb.checked) checked++;
    });

    const pct = Math.round((checked / total) * 100);
    if (scoreDisplay) {
      scoreDisplay.textContent = `${pct}%`;
      scoreDisplay.style.color = pct >= 80 ? 'var(--accent-green)' : pct >= 50 ? 'var(--accent-cyan)' : 'var(--accent-yellow)';
    }
  }

  updateScore();
}
