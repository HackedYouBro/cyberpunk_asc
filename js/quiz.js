/**
 * CYBERSHIELD - CYBER SAFETY QUIZ
 * 10 rigorous, high-quality multiple choice questions with feedback,
 * progress tracking, scoring badges, and full review capabilities.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberQuiz();
});

const quizQuestions = [
  {
    id: 1,
    question: "You receive an email claiming to be from your university's IT department stating your account will be deleted in 2 hours unless you confirm your password. What is the most critical red flag?",
    options: [
      "The email was sent during normal evening hours.",
      "Artificial urgency paired with an ultimatum requiring immediate password submission.",
      "The email contains the university logo in the footer.",
      "The email has a polite greeting addressed to students."
    ],
    correctIndex: 1,
    explanation: "Legitimate institutional IT departments will never ask you for your password via email or threaten immediate deletion within a 2-hour window. Artificial panic is the primary weapon used by social engineers to bypass caution."
  },
  {
    id: 2,
    question: "Which of the following authentication methods is considered the MOST secure against real-time phishing and SIM-swapping attacks?",
    options: [
      "SMS text message verification codes",
      "Email one-time PIN codes",
      "Hardware FIDO2 / WebAuthn security keys or Authenticator Apps",
      "Security questions (e.g., mother's maiden name, first pet)"
    ],
    correctIndex: 2,
    explanation: "Hardware security keys (FIDO2/WebAuthn) and time-based authenticator apps are cryptographically bound to the domain and cannot be intercepted via SMS interception, SS7 exploits, or SIM swaps."
  },
  {
    id: 3,
    question: "When connecting to a free public Wi-Fi hotspot at a campus cafe or airport, what is the best defense against 'Man-in-the-Middle' (MitM) eavesdropping?",
    options: [
      "Browsing only in Incognito / Private browsing mode",
      "Using a trusted, encrypted Virtual Private Network (VPN) and enforcing HTTPS",
      "Clearing browser cookies before connecting",
      "Lowering the Wi-Fi transmission power on your laptop"
    ],
    correctIndex: 1,
    explanation: "Incognito mode only prevents local history logging; it does NOT encrypt public Wi-Fi network traffic. A trusted VPN tunnels and encrypts all your traffic from the hotspot to the destination, rendering eavesdropped packets unreadable."
  },
  {
    id: 4,
    question: "What does the industry-standard '3-2-1 Backup Rule' for ransomware protection require?",
    options: [
      "3 copies of data, across 2 different storage media, with at least 1 copy stored offline or offsite",
      "3 passwords, changed every 2 months, with 1 master reset key",
      "Backing up data at 3 PM, 2 days a week, on 1 external USB drive",
      "Encrypting data with 3 keys, 2 algorithms, and 1 recovery phrase"
    ],
    correctIndex: 0,
    explanation: "The 3-2-1 strategy dictates keeping 3 copies of your data (1 primary and 2 backups) on 2 distinct media types (e.g. SSD and Cloud), with at least 1 copy kept strictly offline / immutable to prevent ransomware from encrypting backups."
  },
  {
    id: 5,
    question: "You find an unlabeled, brand-new 64GB USB flash drive lying on a classroom table. What should you do?",
    options: [
      "Plug it into your laptop to inspect the owner's files and return it",
      "Format the USB drive before opening any files",
      "Do NOT plug it in; hand it to campus security or lost-and-found",
      "Plug it into a friend's computer first to be safe"
    ],
    correctIndex: 2,
    explanation: "'USB drop attacks' use malicious hardware (e.g., Rubber Ducky or BadUSB) that emulates high-speed keyboards to execute arbitrary malicious code the moment the drive is plugged in, bypassing formatting or antivirus before you can react."
  },
  {
    id: 6,
    question: "What is 'Credential Stuffing' in modern cybersecurity?",
    options: [
      "Typing passwords with extra special characters into forms",
      "Automated testing of stolen username/password pairs from past data breaches across hundreds of other websites",
      "Sending physical letters with fake password recovery codes",
      "Overloading a server's memory buffer with oversized login requests"
    ],
    correctIndex: 1,
    explanation: "Because millions of users reuse the exact same passwords across multiple platforms, attackers use automated botnets to 'stuff' credentials leaked in past breaches into unrelated banking, social, and collegiate portals."
  },
  {
    id: 7,
    question: "What makes a passphrase like 'correct-horse-battery-staple-92' generally more resilient to brute-force attacks than 'P@ssw0rd1'?",
    options: [
      "It is registered with national cybersecurity registries",
      "It contains significantly higher mathematical entropy due to its length",
      "It uses only Latin words which computers cannot calculate",
      "Attackers never test hyphenated words"
    ],
    correctIndex: 1,
    explanation: "Password cracking complexity scales exponentially with character length. A 30-character passphrase composed of random words provides vastly higher mathematical entropy than a short 9-character password with predictable leetspeak substitutions."
  },
  {
    id: 8,
    question: "Why are software and operating system updates critical to digital security?",
    options: [
      "They only update the visual graphic themes and emojis",
      "They patch known vulnerabilities (CVEs) before threat actors can exploit them",
      "They slow down hardware to save battery life",
      "They delete old passwords automatically"
    ],
    correctIndex: 1,
    explanation: "When software vendors discover zero-day bugs and Common Vulnerabilities and Exposures (CVEs), they release patches. Unpatched systems are scanned and targeted by automated exploit kits within hours of a vulnerability announcement."
  },
  {
    id: 9,
    question: "What is 'Shoulder Surfing'?",
    options: [
      "Watching someone type their PIN, password, or sensitive details from behind them in public",
      "Using dual monitors while browsing social media",
      "Carrying a laptop bag over one shoulder",
      "Sending duplicate emails to multiple department heads"
    ],
    correctIndex: 0,
    explanation: "Shoulder surfing is direct physical observation where an attacker discreetly looks over someone's shoulder in coffee shops, lecture halls, or ATMs to record login credentials or financial PINs."
  },
  {
    id: 10,
    question: "What is the primary indicator of potential identity theft among the options below?",
    options: [
      "Receiving a monthly bank statement by email",
      "Unfamiliar inquiries or unrecognized accounts appearing on your credit report",
      "A website asking you to update your profile photo",
      "Your computer fan running faster during intensive tasks"
    ],
    correctIndex: 1,
    explanation: "Unfamiliar credit inquiries, unexpected bills from collection agencies, or unauthorized credit lines appearing on credit monitoring reports are standard hallmarks that your personally identifiable information (PII) has been compromised."
  }
];

function initCyberQuiz() {
  const quizCard = document.getElementById('quiz-active-card');
  const resultsCard = document.getElementById('quiz-results-card');
  const questionNumEl = document.getElementById('quiz-current-num');
  const questionTextEl = document.getElementById('quiz-question-text');
  const optionsContainer = document.getElementById('quiz-options-list');
  const progressBar = document.getElementById('quiz-progress-fill');
  const explanationBox = document.getElementById('quiz-explanation-box');
  const nextBtn = document.getElementById('quiz-next-btn');
  const retakeBtn = document.getElementById('quiz-retake-btn');
  const reviewBtn = document.getElementById('quiz-review-btn');
  const reviewContainer = document.getElementById('quiz-review-container');

  let currentQuestionIndex = 0;
  let userScore = 0;
  let userAnswers = []; // Record of { questionId, selectedIndex, isCorrect }

  function loadQuestion(index) {
    const q = quizQuestions[index];
    if (!q) return;

    questionNumEl.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    questionTextEl.textContent = q.question;
    progressBar.style.width = `${((index + 1) / quizQuestions.length) * 100}%`;

    explanationBox.style.display = 'none';
    nextBtn.style.display = 'none';

    optionsContainer.innerHTML = q.options
      .map(
        (opt, optIdx) => `
        <button class="quiz-option-btn" data-index="${optIdx}">
          <span class="option-badge">${String.fromCharCode(65 + optIdx)}</span>
          <span class="option-text">${opt}</span>
        </button>
      `
      )
      .join('');

    const optButtons = optionsContainer.querySelectorAll('.quiz-option-btn');
    optButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-index'), 10);
        handleOptionSelect(selectedIdx, optButtons, q);
      });
    });
  }

  function handleOptionSelect(selectedIdx, buttons, q) {
    const isCorrect = selectedIdx === q.correctIndex;
    if (isCorrect) {
      userScore++;
      if (window.playCyberSound) window.playCyberSound('unlock');
    } else {
      if (window.playCyberSound) window.playCyberSound('alert');
    }

    userAnswers.push({
      questionId: q.id,
      selectedIdx,
      isCorrect
    });

    // Disable all options and show colors
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add('selected-correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('selected-wrong');
      }
    });

    // Show explanation box
    explanationBox.style.display = 'block';
    explanationBox.innerHTML = `
      <div style="font-family: var(--font-subheading); font-weight: 700; color: ${
        isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'
      }; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;">
        ${isCorrect ? '✓ CORRECT ANSWER' : '✗ SECURITY ANALYSIS'}
      </div>
      <div style="color: #cbd5e1; font-size: 0.92rem;">${q.explanation}</div>
    `;

    // Show Next button
    nextBtn.style.display = 'inline-flex';
    nextBtn.textContent =
      currentQuestionIndex === quizQuestions.length - 1 ? 'VIEW RESULTS' : 'NEXT QUESTION ▸';
  }

  nextBtn?.addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    } else {
      showResults();
    }
  });

  function showResults() {
    quizCard.style.display = 'none';
    resultsCard.style.display = 'block';

    const scorePct = Math.round((userScore / quizQuestions.length) * 100);
    const scoreBig = document.getElementById('results-score-val');
    const rankTitle = document.getElementById('results-rank-title');
    const rankDesc = document.getElementById('results-rank-desc');

    scoreBig.textContent = `${userScore} / ${quizQuestions.length}`;

    if (scorePct >= 90) {
      rankTitle.textContent = '🛡️ CYBER DEFENSE COMMANDER';
      rankTitle.style.color = 'var(--accent-green)';
      rankDesc.textContent =
        'Exceptional digital awareness! You possess elite instincts to identify advanced phishing, protect credentials, and guard institutional networks.';
    } else if (scorePct >= 70) {
      rankTitle.textContent = '⚔️ VIGILANT SENTINEL';
      rankTitle.style.color = 'var(--accent-cyan)';
      rankDesc.textContent =
        'Strong security posture! You understand core threat vectors well. Reviewing the few missed questions will hone your instincts to perfection.';
    } else if (scorePct >= 50) {
      rankTitle.textContent = '🔍 CYBER SCOUT';
      rankTitle.style.color = 'var(--accent-yellow)';
      rankDesc.textContent =
        'Solid foundation, but several vulnerabilities remain. Review the awareness section and simulator red flags to stay safe online.';
    } else {
      rankTitle.textContent = '⚠️ VULNERABLE TARGET';
      rankTitle.style.color = 'var(--accent-red)';
      rankDesc.textContent =
        'High cyber exposure risk. We strongly advise reviewing all CyberShield awareness modules and adopting password manager best practices immediately.';
    }
  }

  // Review Answers Toggle
  reviewBtn?.addEventListener('click', () => {
    if (reviewContainer.style.display === 'block') {
      reviewContainer.style.display = 'none';
      reviewBtn.textContent = 'REVIEW ALL QUESTIONS';
    } else {
      reviewContainer.style.display = 'block';
      reviewBtn.textContent = 'HIDE REVIEW';

      reviewContainer.innerHTML = quizQuestions
        .map((q, idx) => {
          const answer = userAnswers[idx];
          const isCorrect = answer?.isCorrect;
          return `
          <div style="background: rgba(10, 15, 29, 0.75); border: 1px solid ${
            isCorrect ? 'rgba(0, 255, 157, 0.3)' : 'rgba(255, 51, 102, 0.3)'
          }; padding: 1.25rem; border-radius: 8px; margin-bottom: 1rem; text-align: left;">
            <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem; color: #fff;">
              Q${idx + 1}: ${q.question}
            </div>
            <div style="font-size: 0.85rem; color: ${
              isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'
            }; margin-bottom: 0.3rem;">
              Your choice: ${q.options[answer?.selectedIdx]} (${isCorrect ? 'Correct' : 'Incorrect'})
            </div>
            <div style="font-size: 0.85rem; color: var(--accent-cyan); margin-bottom: 0.5rem;">
              Correct answer: ${q.options[q.correctIndex]}
            </div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); background: rgba(5,8,17,0.5); padding: 0.5rem; border-radius: 4px;">
              ${q.explanation}
            </div>
          </div>
        `;
        })
        .join('');
    }
  });

  // Retake Quiz
  retakeBtn?.addEventListener('click', () => {
    currentQuestionIndex = 0;
    userScore = 0;
    userAnswers = [];
    resultsCard.style.display = 'none';
    quizCard.style.display = 'block';
    if (reviewContainer) reviewContainer.style.display = 'none';
    loadQuestion(0);
  });

  // Initial load
  loadQuestion(0);
}
