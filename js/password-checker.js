/**
 * CYBERSHIELD - PASSWORD SECURITY CHECKER & GENERATOR
 * 100% Client-Side. Never stores, transmits, or logs passwords.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordChecker();
  initPasswordGenerator();
});

function initPasswordChecker() {
  const pwdInput = document.getElementById('pwd-input');
  const toggleBtn = document.getElementById('toggle-pwd-vis');
  const meterFill = document.getElementById('strength-meter-fill');
  const meterText = document.getElementById('strength-meter-text');
  const crackTimeVal = document.getElementById('crack-time-value');
  const suggestionsBox = document.getElementById('pwd-suggestions');
  const entropyVal = document.getElementById('entropy-value');

  // Criteria DOM elements
  const critLength = document.getElementById('crit-length');
  const critUpper = document.getElementById('crit-upper');
  const critLower = document.getElementById('crit-lower');
  const critNumber = document.getElementById('crit-number');
  const critSymbol = document.getElementById('crit-symbol');
  const critUnique = document.getElementById('crit-unique');

  if (!pwdInput) return;

  // Toggle Visibility
  toggleBtn?.addEventListener('click', () => {
    const isPassword = pwdInput.type === 'password';
    pwdInput.type = isPassword ? 'text' : 'password';
    toggleBtn.innerHTML = isPassword
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  });

  // Common dictionary patterns to penalize
  const commonPatterns = [
    'password', '123456', 'qwerty', 'admin', 'welcome', 'letmein',
    'monkey', 'dragon', 'football', 'master', 'shadow', 'student'
  ];

  pwdInput.addEventListener('input', (e) => {
    const password = e.target.value;
    evaluatePassword(password);
  });

  function evaluatePassword(pwd) {
    if (!pwd) {
      resetMeter();
      return;
    }

    const len = pwd.length;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
    const hasRepeat = /(.)\1{2,}/.test(pwd);
    const lowerPwd = pwd.toLowerCase();
    const hasCommon = commonPatterns.some((pattern) => lowerPwd.includes(pattern));

    // Update criteria UI
    updateCriterion(critLength, len >= 12);
    updateCriterion(critUpper, hasUpper);
    updateCriterion(critLower, hasLower);
    updateCriterion(critNumber, hasNumber);
    updateCriterion(critSymbol, hasSymbol);
    updateCriterion(critUnique, !hasRepeat && !hasCommon);

    // Calculate Character Pool Size for Shannon Entropy
    let poolSize = 0;
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSymbol) poolSize += 33;
    if (poolSize === 0) poolSize = 1;

    // Shannon Entropy (bits) = Length * log2(Pool Size)
    let entropy = Math.round(len * Math.log2(poolSize));
    if (hasCommon) entropy = Math.max(entropy - 25, 5);
    if (hasRepeat) entropy = Math.max(entropy - 15, 5);

    if (entropyVal) entropyVal.textContent = `${entropy} bits`;

    // Calculate Brute-Force Crack Time
    // Assumption: High-speed GPU cluster at 10^10 hashes/sec
    const totalCombinations = Math.pow(poolSize, len);
    const seconds = totalCombinations / 1e10;
    const crackTime = formatCrackTime(seconds, len, hasCommon);
    if (crackTimeVal) crackTimeVal.textContent = crackTime;

    // Determine Strength Level (0 - 100)
    let score = 0;
    if (len >= 8) score += 15;
    if (len >= 12) score += 20;
    if (len >= 16) score += 15;
    if (hasLower) score += 10;
    if (hasUpper) score += 10;
    if (hasNumber) score += 15;
    if (hasSymbol) score += 15;
    if (hasCommon) score = Math.max(10, score - 35);
    if (hasRepeat) score = Math.max(10, score - 20);

    score = Math.min(Math.max(score, 5), 100);

    // Render strength meter UI
    renderStrengthUI(score);

    // Render dynamic suggestions
    renderSuggestions(pwd, len, hasUpper, hasLower, hasNumber, hasSymbol, hasCommon);
  }

  function updateCriterion(el, isValid) {
    if (!el) return;
    if (isValid) {
      el.classList.add('valid');
      el.querySelector('.crit-icon').innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else {
      el.classList.remove('valid');
      el.querySelector('.crit-icon').innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    }
  }

  function renderStrengthUI(score) {
    meterFill.style.width = `${score}%`;

    if (score < 25) {
      meterFill.style.backgroundColor = 'var(--accent-red)';
      meterFill.style.boxShadow = 'var(--glow-red)';
      meterText.textContent = 'CRITICAL / VERY WEAK';
      meterText.style.color = 'var(--accent-red)';
    } else if (score < 50) {
      meterFill.style.backgroundColor = 'var(--accent-yellow)';
      meterFill.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.4)';
      meterText.textContent = 'WEAK - VULNERABLE';
      meterText.style.color = 'var(--accent-yellow)';
    } else if (score < 75) {
      meterFill.style.backgroundColor = 'var(--accent-blue)';
      meterFill.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.4)';
      meterText.textContent = 'MODERATE';
      meterText.style.color = 'var(--accent-blue)';
    } else if (score < 90) {
      meterFill.style.backgroundColor = 'var(--accent-cyan)';
      meterFill.style.boxShadow = 'var(--glow-cyan)';
      meterText.textContent = 'STRONG';
      meterText.style.color = 'var(--accent-cyan)';
    } else {
      meterFill.style.backgroundColor = 'var(--accent-green)';
      meterFill.style.boxShadow = 'var(--glow-green)';
      meterText.textContent = 'FORTIFIED / MILITARY-GRADE';
      meterText.style.color = 'var(--accent-green)';
    }
  }

  function formatCrackTime(seconds, len, hasCommon) {
    if (hasCommon || len < 6) return 'Instant (< 0.01 sec)';
    if (seconds < 1) return 'Instant (< 1 sec)';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 315360000) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 31536000000) return `${Math.round(seconds / 31536000).toLocaleString()} years`;
    return '100+ Million Centuries';
  }

  function renderSuggestions(pwd, len, hasUpper, hasLower, hasNumber, hasSymbol, hasCommon) {
    if (!suggestionsBox) return;
    const tips = [];

    if (len < 12) tips.push('Increase length to 12 or more characters. Length is the #1 defense against brute-force attacks.');
    if (!hasUpper || !hasLower) tips.push('Mix both UPPERCASE and lowercase characters.');
    if (!hasNumber) tips.push('Add random numeric digits (not sequential like 123).');
    if (!hasSymbol) tips.push('Include special symbols (e.g. #, $, %, @, !).');
    if (hasCommon) tips.push('Remove predictable dictionary words or personal terms.');

    if (tips.length === 0) {
      suggestionsBox.innerHTML = `
        <div style="color: var(--accent-green); font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Excellent entropy. This password follows all recommended cryptographic hygiene guidelines.
        </div>
      `;
    } else {
      suggestionsBox.innerHTML = `
        <div style="font-family: var(--font-subheading); font-size: 0.85rem; color: var(--accent-yellow); margin-bottom: 0.4rem; text-transform: uppercase;">
          Tactical Recommendations:
        </div>
        <ul style="list-style: none; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.35rem;">
          ${tips.map((t) => `<li>▸ ${t}</li>`).join('')}
        </ul>
      `;
    }
  }

  function resetMeter() {
    meterFill.style.width = '0%';
    meterText.textContent = 'ENTER PASSWORD';
    meterText.style.color = 'var(--text-muted)';
    if (crackTimeVal) crackTimeVal.textContent = '—';
    if (entropyVal) entropyVal.textContent = '0 bits';
    [critLength, critUpper, critLower, critNumber, critSymbol, critUnique].forEach((el) => {
      if (el) {
        el.classList.remove('valid');
        el.querySelector('.crit-icon').innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
      }
    });
    if (suggestionsBox) {
      suggestionsBox.innerHTML = `<span style="color: var(--text-muted); font-size: 0.85rem;">Evaluation feedback will appear here as you type.</span>`;
    }
  }
}

/* ==========================================================================
   PASSWORD GENERATOR ENGINE
   ========================================================================== */
function initPasswordGenerator() {
  const lengthSlider = document.getElementById('gen-length-slider');
  const lengthDisplay = document.getElementById('gen-length-val');
  const incUpper = document.getElementById('gen-inc-upper');
  const incLower = document.getElementById('gen-inc-lower');
  const incNumbers = document.getElementById('gen-inc-numbers');
  const incSymbols = document.getElementById('gen-inc-symbols');
  const generateBtn = document.getElementById('btn-generate-pwd');
  const copyBtn = document.getElementById('btn-copy-gen-pwd');
  const outputText = document.getElementById('gen-pwd-output-text');
  const testInCheckerBtn = document.getElementById('btn-test-in-checker');

  if (!lengthSlider || !outputText) return;

  lengthSlider.addEventListener('input', (e) => {
    if (lengthDisplay) lengthDisplay.textContent = e.target.value;
  });

  generateBtn?.addEventListener('click', generatePassword);

  function generatePassword() {
    const len = parseInt(lengthSlider.value, 10);
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charPool = '';
    const guaranteed = [];

    if (incLower?.checked) {
      charPool += lowerChars;
      guaranteed.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);
    }
    if (incUpper?.checked) {
      charPool += upperChars;
      guaranteed.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
    }
    if (incNumbers?.checked) {
      charPool += numberChars;
      guaranteed.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    }
    if (incSymbols?.checked) {
      charPool += symbolChars;
      guaranteed.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
    }

    if (charPool === '') {
      charPool = lowerChars;
      guaranteed.push(lowerChars[0]);
    }

    // Cryptographically strong random values
    const array = new Uint32Array(len);
    window.crypto.getRandomValues(array);

    const result = [...guaranteed];
    for (let i = guaranteed.length; i < len; i++) {
      result.push(charPool[array[i] % charPool.length]);
    }

    // Shuffle array
    for (let i = result.length - 1; i > 0; i--) {
      const j = array[i] % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }

    const generatedPassword = result.join('');
    outputText.textContent = generatedPassword;
    if (window.playCyberSound) window.playCyberSound('click');
  }

  // Copy to clipboard
  copyBtn?.addEventListener('click', () => {
    const pwd = outputText.textContent;
    if (!pwd || pwd.includes('Click Generate')) return;

    navigator.clipboard.writeText(pwd).then(() => {
      window.showCyberToast(
        'COPIED TO CLIPBOARD',
        'Secure high-entropy password copied securely.',
        'success'
      );
    });
  });

  // Test in checker button
  testInCheckerBtn?.addEventListener('click', () => {
    const pwd = outputText.textContent;
    if (!pwd || pwd.includes('Click Generate')) return;
    const pwdInput = document.getElementById('pwd-input');
    if (pwdInput) {
      pwdInput.value = pwd;
      pwdInput.dispatchEvent(new Event('input'));
      pwdInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // Generate an initial sample password
  generatePassword();
}
