/**
 * CYBERSHIELD - WHOLE WEBSITE STUDIO EDITOR MODE
 * 3-Click Trigger on Logo to unlock entire in-place webpage editing.
 * Zero popup obstruction! Top studio bar, theme switcher, section controls & persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
  window.activateCyberShieldAdmin = openPinSecurityModal;
  initThreeClickTrigger();
  initPinSecurityGateway();
  initStudioEditorBar();
  loadSavedCustomizations();
});

const CONFIG_STORAGE_KEY = 'cybershield_custom_editor_config';

/* ==========================================================================
   1. THREE-CLICK TRIGGER ENGINE
   ========================================================================== */
function initThreeClickTrigger() {
  const logoTrigger = document.querySelector('.brand-logo-trigger');
  const homeTrigger = document.getElementById('nav-home-link');
  const otherNavItems = document.querySelectorAll('.nav-link:not(#nav-home-link)');

  let clickCount = 0;
  let firstClickTime = 0;
  const CLICK_WINDOW_MS = 3000;
  const REQUIRED_CLICKS = 3; // Activated on 3 consecutive clicks!

  function registerClick(e) {
    const now = Date.now();

    if (firstClickTime === 0 || now - firstClickTime > CLICK_WINDOW_MS) {
      firstClickTime = now;
      clickCount = 1;
    } else {
      clickCount++;
    }

    // Micro visual pulse feedback on logo
    if (logoTrigger) {
      logoTrigger.classList.remove('logo-click-pulse');
      void logoTrigger.offsetWidth; // force reflow
      logoTrigger.classList.add('logo-click-pulse');
    }

    // Check for qualifying 3-click activation
    if (clickCount >= REQUIRED_CLICKS) {
      if (now - firstClickTime <= CLICK_WINDOW_MS) {
        openPinSecurityModal();
      }
      clickCount = 0;
      firstClickTime = 0;
    }
  }

  logoTrigger?.addEventListener('click', (e) => {
    registerClick(e);
  });

  homeTrigger?.addEventListener('click', (e) => {
    registerClick(e);
  });

  // Reset counter if clicking other links
  otherNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      clickCount = 0;
      firstClickTime = 0;
    });
  });
}

/* ==========================================================================
   2. PIN SECURITY GATEWAY (4-DIGIT AUTHENTICATION)
   ========================================================================== */
function openPinSecurityModal() {
  const modal = document.getElementById('cyber-pin-modal');
  const dialog = document.getElementById('cyber-pin-dialog');
  const boxes = document.querySelectorAll('.pin-box');
  const feedback = document.getElementById('pin-feedback');

  if (!modal) {
    activateWholeWebsiteEditor();
    return;
  }

  // Clear previous values
  boxes.forEach((b) => {
    b.value = '';
    b.classList.remove('filled');
  });

  if (feedback) {
    feedback.className = 'pin-feedback-msg';
    feedback.innerHTML = `Default Access PIN: <strong style="color: #ffd700;">2026</strong> (or 1337)`;
  }

  modal.classList.add('active');
  modal.style.display = 'flex';

  if (window.playCyberSound) window.playCyberSound('click');

  // Focus on first box
  setTimeout(() => {
    boxes[0]?.focus();
  }, 120);
}

function initPinSecurityGateway() {
  const modal = document.getElementById('cyber-pin-modal');
  const dialog = document.getElementById('cyber-pin-dialog');
  const closeBtn = document.getElementById('pin-modal-close');
  const cancelBtn = document.getElementById('btn-pin-cancel');
  const submitBtn = document.getElementById('btn-pin-submit');
  const boxes = document.querySelectorAll('.pin-box');
  const feedback = document.getElementById('pin-feedback');

  const VALID_PINS = ['2026', '1337', '0000', '7777'];

  closeBtn?.addEventListener('click', closePinModal);
  cancelBtn?.addEventListener('click', closePinModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closePinModal();
  });

  function closePinModal() {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }

  // Input events for 4-digit boxes
  boxes.forEach((box, idx) => {
    box.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      box.value = val;

      if (val) {
        box.classList.add('filled');
        if (idx < boxes.length - 1) {
          boxes[idx + 1].focus();
        } else {
          verifyPin();
        }
      } else {
        box.classList.remove('filled');
      }
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && idx > 0) {
        boxes[idx - 1].focus();
        boxes[idx - 1].value = '';
        boxes[idx - 1].classList.remove('filled');
      } else if (e.key === 'Enter') {
        verifyPin();
      }
    });
  });

  submitBtn?.addEventListener('click', verifyPin);

  function verifyPin() {
    let enteredPin = '';
    boxes.forEach((b) => (enteredPin += b.value.trim()));

    if (enteredPin.length < 4) {
      if (feedback) {
        feedback.className = 'pin-feedback-msg error';
        feedback.textContent = 'Please enter all 4 digits.';
      }
      return;
    }

    if (VALID_PINS.includes(enteredPin)) {
      if (feedback) {
        feedback.className = 'pin-feedback-msg success';
        feedback.textContent = '✓ ACCESS GRANTED // INITIALIZING STUDIO EDITOR...';
      }
      if (window.playCyberSound) window.playCyberSound('unlock');

      setTimeout(() => {
        closePinModal();
        activateWholeWebsiteEditor();
      }, 400);
    } else {
      if (dialog) {
        dialog.classList.remove('pin-shake');
        void dialog.offsetWidth;
        dialog.classList.add('pin-shake');
      }

      if (feedback) {
        feedback.className = 'pin-feedback-msg error';
        feedback.textContent = '✗ ACCESS DENIED // INVALID PIN CODE';
      }

      if (window.playCyberSound) window.playCyberSound('alert');

      setTimeout(() => {
        boxes.forEach((b) => {
          b.value = '';
          b.classList.remove('filled');
        });
        boxes[0]?.focus();
      }, 550);
    }
  }
}

/* ==========================================================================
   3. ACTIVATE WHOLE WEBSITE EDITOR
   ========================================================================== */
let studioEditorActive = false;

function activateWholeWebsiteEditor() {
  if (studioEditorActive) return;
  studioEditorActive = true;

  // Play sci-fi audio sound
  if (window.playCyberSound) window.playCyberSound('unlock');

  // Trigger holographic screen flash
  const flash = document.createElement('div');
  flash.className = 'admin-activation-flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 1000);

  // Mark body
  document.body.classList.add('studio-editor-active');

  // Reveal Top Studio Control Bar
  const studioBar = document.getElementById('studio-editor-bar');
  if (studioBar) {
    studioBar.classList.add('active');
  }

  // Enable in-place editing across the ENTIRE webpage
  makeWebpageDirectlyEditable(true);

  // Inject section hover controls
  injectSectionControls();

  // Inject inline graphic switcher chip
  injectInlineGraphicChip();

  window.showCyberToast(
    'WHOLE WEBSITE EDITOR ACTIVATED',
    'Every heading, text, button, and card is now live-editable in place. Use the top studio bar to switch themes!',
    'success'
  );
}

/* ==========================================================================
   3. MAKE WEBPAGE DIRECTLY EDITABLE
   ========================================================================== */
function makeWebpageDirectlyEditable(enable) {
  const editableSelectors = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', '.hero-subtext', '.section-description',
    '.btn', '.nav-link', '.stat-number', '.stat-label',
    '.section-badge', '.threat-card-title', '.threat-card-desc',
    '.threat-points-list li span', '.detail-list li',
    '.resource-card h3', '.resource-card p',
    '.footer-links-list a', '.contact-info-panel h2',
    '#brand-title-text'
  ].join(', ');

  const elements = document.querySelectorAll(editableSelectors);

  elements.forEach((el) => {
    // Exclude editor controls
    if (el.closest('#studio-editor-bar') || el.closest('#cyber-global-toast') || el.closest('.studio-section-controls')) return;

    if (enable) {
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('data-editable', 'true');
      el.setAttribute('spellcheck', 'false');

      el.oninput = () => {
        el.setAttribute('data-user-modified', 'true');
      };
    } else {
      el.removeAttribute('contenteditable');
      el.removeAttribute('data-editable');
    }
  });
}

/* ==========================================================================
   4. INJECT SECTION HOVER CONTROLS
   ========================================================================== */
function injectSectionControls() {
  const sections = document.querySelectorAll('main > section[id]');

  sections.forEach((sec, idx) => {
    if (sec.querySelector('.studio-section-controls')) return;

    sec.style.position = 'relative';
    const controls = document.createElement('div');
    controls.className = 'studio-section-controls';
    controls.innerHTML = `
      <button type="button" class="sec-ctrl-btn btn-sec-up" title="Move section up" ${idx === 0 ? 'disabled' : ''}>▲ Up</button>
      <button type="button" class="sec-ctrl-btn btn-sec-down" title="Move section down" ${idx === sections.length - 1 ? 'disabled' : ''}>▼ Down</button>
      <button type="button" class="sec-ctrl-btn btn-sec-hide" title="Hide/Show section">👁️ Hide</button>
    `;

    // Move Up
    controls.querySelector('.btn-sec-up').addEventListener('click', (e) => {
      e.stopPropagation();
      const prev = sec.previousElementSibling;
      if (prev && prev.tagName === 'SECTION') {
        sec.parentElement.insertBefore(sec, prev);
        updateSectionButtons();
        window.showCyberToast('SECTION MOVED', `Section #${sec.id} shifted up.`, 'info');
      }
    });

    // Move Down
    controls.querySelector('.btn-sec-down').addEventListener('click', (e) => {
      e.stopPropagation();
      const next = sec.nextElementSibling;
      if (next && next.tagName === 'SECTION') {
        sec.parentElement.insertBefore(next, sec);
        updateSectionButtons();
        window.showCyberToast('SECTION MOVED', `Section #${sec.id} shifted down.`, 'info');
      }
    });

    // Toggle Hide/Show
    controls.querySelector('.btn-sec-hide').addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = sec.style.opacity === '0.25';
      if (isHidden) {
        sec.style.opacity = '1';
        sec.style.filter = 'none';
        controls.querySelector('.btn-sec-hide').textContent = '👁️ Hide';
        window.showCyberToast('SECTION RESTORED', `Section #${sec.id} is now visible.`, 'info');
      } else {
        sec.style.opacity = '0.25';
        sec.style.filter = 'grayscale(1)';
        controls.querySelector('.btn-sec-hide').textContent = '👁️ Show';
        window.showCyberToast('SECTION HIDDEN', `Section #${sec.id} marked hidden.`, 'info');
      }
    });

    sec.appendChild(controls);
  });

  function updateSectionButtons() {
    const currentSecs = document.querySelectorAll('main > section[id]');
    currentSecs.forEach((s, i) => {
      const up = s.querySelector('.btn-sec-up');
      const down = s.querySelector('.btn-sec-down');
      if (up) up.disabled = i === 0;
      if (down) down.disabled = i === currentSecs.length - 1;
    });
  }
}

/* ==========================================================================
   5. INJECT INLINE GRAPHIC CHANGER CHIP
   ========================================================================== */
function injectInlineGraphicChip() {
  const heroVisual = document.querySelector('.hero-visual');
  if (!heroVisual || heroVisual.querySelector('.inline-graphic-chip')) return;

  const chip = document.createElement('div');
  chip.className = 'inline-graphic-chip';
  chip.innerHTML = `
    <span style="font-size: 0.72rem; color: var(--accent-green); font-weight: 700; font-family: var(--font-mono);">GRAPHIC:</span>
    <button type="button" class="graphic-chip-btn active" data-preset="shield">🛡️ Shield</button>
    <button type="button" class="graphic-chip-btn" data-preset="lock">🔒 Lock</button>
    <button type="button" class="graphic-chip-btn" data-preset="radar">📡 Radar</button>
    <button type="button" class="graphic-chip-btn" data-preset="custom">🔗 URL</button>
  `;

  const heroBadge = heroVisual.querySelector('.cyber-shield-badge');
  const btns = chip.querySelectorAll('.graphic-chip-btn');

  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const preset = btn.getAttribute('data-preset');

      if (preset === 'custom') {
        const url = prompt('Enter image URL for central hero graphic:', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400');
        if (url && heroBadge) {
          heroBadge.innerHTML = `<img src="${url}" alt="Custom Graphic" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 25px var(--accent-cyan));" onerror="this.onerror=null; this.src='https://via.placeholder.com/170x200/0a0f1d/00f0ff?text=Invalid+Image';">`;
          window.showCyberToast('IMAGE UPDATED', 'Custom hero graphic URL loaded.', 'success');
        }
      } else {
        applyGraphicPreset(preset, heroBadge);
        window.showCyberToast('GRAPHIC CHANGED', `Preset "${preset}" applied.`, 'success');
      }
    });
  });

  heroVisual.appendChild(chip);
}

function applyGraphicPreset(preset, heroBadge) {
  if (!heroBadge) return;
  if (preset === 'shield') {
    heroBadge.innerHTML = `
      <svg width="170" height="200" viewBox="0 0 170 200" fill="none">
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="170" y2="200" gradientUnits="userSpaceOnUse">
            <stop stop-color="#00f0ff" stop-opacity="0.35"/>
            <stop offset="0.5" stop-color="#0a1630" stop-opacity="0.85"/>
            <stop offset="1" stop-color="#00ff9d" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <path class="shield-svg-path" d="M85 10L15 45V95C15 145 45 185 85 195C125 185 155 145 155 95V45L85 10Z"/>
        <path d="M85 30V85M85 85H40M85 85H130M85 85V155M40 85V115M130 85V115" stroke="#00f0ff" stroke-width="1.8" stroke-dasharray="3 3"/>
        <circle cx="85" cy="85" r="7" fill="#00ff9d"/>
        <circle cx="40" cy="115" r="4" fill="#00f0ff"/>
        <circle cx="130" cy="115" r="4" fill="#00f0ff"/>
        <rect x="75" y="105" width="20" height="16" rx="3" fill="#050811" stroke="#00ff9d" stroke-width="1.8"/>
        <path d="M80 105V97C80 94.2386 82.2386 92 85 92C87.7614 92 90 94.2386 90 97V105" stroke="#00ff9d" stroke-width="1.8"/>
      </svg>
    `;
  } else if (preset === 'lock') {
    heroBadge.innerHTML = `
      <svg width="170" height="200" viewBox="0 0 170 200" fill="none">
        <circle cx="85" cy="100" r="75" stroke="#00ff9d" stroke-width="2" stroke-dasharray="6 6"/>
        <circle cx="85" cy="100" r="55" stroke="#00f0ff" stroke-width="2"/>
        <rect x="55" y="85" width="60" height="50" rx="8" fill="#090f20" stroke="#00ff9d" stroke-width="2.5"/>
        <path d="M68 85V68C68 58.6112 75.6112 51 85 51C94.3888 51 102 58.6112 102 68V85" stroke="#00f0ff" stroke-width="3"/>
        <circle cx="85" cy="105" r="6" fill="#00f0ff"/>
        <line x1="85" y1="111" x2="85" y2="122" stroke="#00f0ff" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
  } else if (preset === 'radar') {
    heroBadge.innerHTML = `
      <svg width="170" height="200" viewBox="0 0 170 200" fill="none">
        <circle cx="85" cy="100" r="75" stroke="#00f0ff" stroke-width="2"/>
        <circle cx="85" cy="100" r="50" stroke="#00ff9d" stroke-width="1.5" stroke-dasharray="4 4"/>
        <circle cx="85" cy="100" r="25" stroke="#00f0ff" stroke-width="1.5"/>
        <line x1="85" y1="25" x2="85" y2="175" stroke="rgba(0,240,255,0.4)" stroke-width="1.5"/>
        <line x1="10" y1="100" x2="160" y2="100" stroke="rgba(0,240,255,0.4)" stroke-width="1.5"/>
        <circle cx="85" cy="100" r="5" fill="#ff3366"/>
        <circle cx="115" cy="70" r="4" fill="#00ff9d" opacity="0.9"/>
        <circle cx="60" cy="130" r="4" fill="#00f0ff" opacity="0.9"/>
      </svg>
    `;
  }
}

/* ==========================================================================
   6. TOP STUDIO CONTROL BAR & THEME SYSTEM
   ========================================================================== */
function initStudioEditorBar() {
  const studioBar = document.getElementById('studio-editor-bar');
  if (!studioBar) return;

  // Viewport Device Switcher (PC vs. Mobile)
  const btnViewPc = document.getElementById('btn-view-pc');
  const btnViewMobile = document.getElementById('btn-view-mobile');

  btnViewPc?.addEventListener('click', () => {
    btnViewPc.classList.add('active');
    btnViewMobile?.classList.remove('active');
    document.body.classList.remove('preview-mode-mobile');
    window.showCyberToast('VIEWPORT: PC / DESKTOP', 'Displaying 100% full-width desktop layout.', 'info');
  });

  btnViewMobile?.addEventListener('click', () => {
    btnViewMobile.classList.add('active');
    btnViewPc?.classList.remove('active');
    document.body.classList.add('preview-mode-mobile');
    const wrapper = document.getElementById('website-viewport-wrapper');
    if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.showCyberToast('VIEWPORT: MOBILE DEVICE', 'Displaying optimized mobile layout inside smartphone bezel.', 'info');
  });

  // Text Formatting tools
  document.getElementById('btn-studio-bold')?.addEventListener('click', () => {
    document.execCommand('bold', false, null);
  });
  document.getElementById('btn-studio-italic')?.addEventListener('click', () => {
    document.execCommand('italic', false, null);
  });
  document.getElementById('btn-studio-underline')?.addEventListener('click', () => {
    document.execCommand('underline', false, null);
  });

  // Font family selector
  const fontSelect = document.getElementById('studio-font-select');
  fontSelect?.addEventListener('change', (e) => {
    document.documentElement.style.setProperty('--font-heading', e.target.value);
    window.showCyberToast('FONT UPDATED', `Headings font set to ${e.target.value}.`, 'info');
  });

  // Color Theme Switcher Pills
  const themePills = document.querySelectorAll('.theme-color-pill');
  themePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      themePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const theme = pill.getAttribute('data-theme');
      applyTheme(theme);
    });
  });

  // Custom Color Picker
  const customColorInput = document.getElementById('studio-custom-color');
  customColorInput?.addEventListener('input', (e) => {
    const col = e.target.value;
    document.documentElement.style.setProperty('--accent-cyan', col);
    document.documentElement.style.setProperty('--border-bright', `${col}66`);
    document.documentElement.style.setProperty('--glow-cyan', `0 0 20px ${col}59`);
  });

  // Add Custom Card
  document.getElementById('btn-studio-add-card')?.addEventListener('click', () => {
    const card = document.createElement('section');
    card.id = `custom-card-${Date.now()}`;
    card.className = 'section';
    card.innerHTML = `
      <div class="container">
        <div class="cyber-card" style="border-color: var(--accent-green); background: rgba(0, 255, 157, 0.08); text-align: center; padding: 2.5rem;">
          <div class="section-badge badge-green" contenteditable="true">ANNOUNCEMENT ADVISORY</div>
          <h2 class="section-title text-green" contenteditable="true">Custom Cybersecurity Bulletin</h2>
          <p class="section-description" contenteditable="true">Type directly here to write any new campus alert, event announcement, or project description.</p>
        </div>
      </div>
    `;

    const main = document.querySelector('main');
    const hero = document.getElementById('home');
    if (main && hero) {
      main.insertBefore(card, hero.nextElementSibling);
      injectSectionControls();
      card.scrollIntoView({ behavior: 'smooth' });
      window.showCyberToast('NEW SECTION CREATED', 'Announcement card added below Hero.', 'success');
    }
  });

  // Save Changes
  document.getElementById('btn-studio-save')?.addEventListener('click', saveAllCustomizations);

  // Reset Defaults
  document.getElementById('btn-studio-reset')?.addEventListener('click', () => {
    if (confirm('Revert all webpage edits and themes back to factory defaults?')) {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
      window.location.reload();
    }
  });

  // Exit Editor
  document.getElementById('btn-studio-exit')?.addEventListener('click', exitStudioEditor);
}

function applyTheme(theme) {
  if (theme === 'gold') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  window.showCyberToast('THEME APPLIED', `Website color palette switched to "${theme.toUpperCase()}".`, 'info');
}

function exitStudioEditor() {
  studioEditorActive = false;
  document.body.classList.remove('studio-editor-active');
  document.body.classList.remove('preview-mode-mobile');
  document.getElementById('btn-view-pc')?.classList.add('active');
  document.getElementById('btn-view-mobile')?.classList.remove('active');
  const studioBar = document.getElementById('studio-editor-bar');
  if (studioBar) studioBar.classList.remove('active');

  makeWebpageDirectlyEditable(false);

  // Remove section controls
  document.querySelectorAll('.studio-section-controls').forEach((c) => c.remove());
  document.querySelectorAll('.inline-graphic-chip').forEach((c) => c.remove());

  window.showCyberToast('STUDIO EDITOR CLOSED', 'Webpage returned to normal visitor mode.', 'info');
}

/* ==========================================================================
   7. PERSISTENCE (SAVE & LOAD)
   ========================================================================== */
function saveAllCustomizations() {
  const modifiedElements = {};
  document.querySelectorAll('[data-editable="true"]').forEach((el, index) => {
    const id = el.id || `custom-element-${index}`;
    modifiedElements[id] = el.innerHTML;
  });

  const activeTheme = document.documentElement.getAttribute('data-theme') || 'gold';

  const config = {
    version: '3.0',
    savedAt: new Date().toISOString(),
    theme: activeTheme,
    fontHeading: getComputedStyle(document.documentElement).getPropertyValue('--font-heading').trim(),
    customAccent: getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim(),
    modifiedElements
  };

  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));

  window.showCyberToast(
    'CHANGES SAVED LOCALLY',
    'All text edits and theme preferences have been stored in browser memory.',
    'success'
  );
}

function loadSavedCustomizations() {
  const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
  if (!raw) return;

  try {
    const config = JSON.parse(raw);

    // Apply saved theme
    if (config.theme) {
      applyTheme(config.theme);
      const pill = document.querySelector(`.theme-color-pill[data-theme="${config.theme}"]`);
      if (pill) {
        document.querySelectorAll('.theme-color-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
      }
    }

    if (config.fontHeading) {
      document.documentElement.style.setProperty('--font-heading', config.fontHeading);
    }

    // Apply modified elements
    if (config.modifiedElements) {
      Object.keys(config.modifiedElements).forEach((key) => {
        const el = document.getElementById(key);
        if (el) {
          el.innerHTML = config.modifiedElements[key];
        }
      });
    }
  } catch (e) {
    console.error('Failed to load saved customizations:', e);
  }
}
