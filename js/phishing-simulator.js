/**
 * CYBERSHIELD - PHISHING AWARENESS SIMULATOR
 * Interactive inspection and detection challenges with fictional email scenarios.
 * Strictly educational - no credentials collected, no real emails dispatched.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPhishingSimulator();
});

const phishingScenarios = [
  {
    id: 'tuition-refund',
    name: 'University Tuition Refund',
    tag: 'Student Scam',
    isPhishing: true,
    senderName: 'Office of Financial Aid & Bursar',
    senderEmail: 'refunds-portal-audit@univ-financial-aid-support.info',
    replyTo: 'audit-desk902@secure-mail-gateway.top',
    date: 'Oct 23, 2026, 09:14 AM',
    subject: 'URGENT: Outstanding Student Tuition Overpayment Refund ($1,840.00)',
    content: `
      <p>Dear Valued Student,</p>
      <p>Our recent fall semester tuition audit determined that your student account has an unprocessed overpayment balance of <strong>$1,840.00 USD</strong>.</p>
      <p style="background: rgba(255, 51, 102, 0.1); border-left: 3px solid #ff3366; padding: 0.8rem; margin: 1rem 0;">
        ⚠️ <strong>CRITICAL DEADLINE:</strong> Due to fiscal end-of-quarter regulations, you must confirm your banking account details within <strong>24 hours</strong> of this notice, or the funds will be permanently forfeited to the state treasury.
      </p>
      <p>To verify your direct deposit destination, authenticate immediately through the secure university portal link below:</p>
      <p style="margin: 1.5rem 0;">
        <span class="clue-inspectable" data-clue="fake-link" style="color: #00f0ff; text-decoration: underline; font-weight: bold;">
          https://university.edu.student-direct-deposit.verification-gateway-node4.xyz/auth?session=9281
        </span>
      </p>
      <p>Failure to respond immediately will result in forfeiture of funds and an administrative hold placed on your course enrollment.</p>
      <br>
      <p>Warm regards,<br><strong>Campus Bursar Division</strong><br>Financial Operations Taskforce</p>
    `,
    redFlags: [
      {
        element: 'senderEmail',
        title: 'Mismatched Sender Domain',
        desc: 'The email claims to be from the University Bursar, but uses an unofficial domain (@univ-financial-aid-support.info) instead of legitimate (.edu).'
      },
      {
        element: 'fake-link',
        title: 'Deceptive Lookalike Subdomain',
        desc: 'The link displays "university.edu", but the actual root domain being visited is "verification-gateway-node4.xyz". Hovering over links reveals their true destination.'
      },
      {
        element: 'urgency',
        title: 'Artificial Panic & Urgency',
        desc: 'Phishers use strict "24-hour forfeiture" threats and account hold ultimatums to cause panic and bypass logical thinking.'
      }
    ],
    explanation: 'PHISHING DETECTED: This is a classic collegiate financial aid scam. Red flags include an external sender domain (.info), an artificial 24-hour panic deadline, and a deceptive disguised URL ending in .xyz.'
  },
  {
    id: 'it-mfa-reset',
    name: 'Campus IT 2FA Expiry',
    tag: 'Credential Harvest',
    isPhishing: true,
    senderName: 'IT Central Security Operations',
    senderEmail: 'admin-notice@campus-sso-auth-portal.com',
    replyTo: 'no-reply@mailer-relay.net',
    date: 'Oct 23, 2026, 02:40 PM',
    subject: 'Action Required: Your Multi-Factor Authentication (2FA) expires today',
    content: `
      <p>Campus Network User,</p>
      <p>All institutional accounts are undergoing scheduled migration to the 2026 Zero-Trust Cybersecurity Protocol.</p>
      <p>Our automated systems noticed that your two-factor authentication profile has <strong>not yet synced</strong>. If you do not synchronize your identity profile before 5:00 PM today, your email, campus Wi-Fi, and LMS access will be immediately suspended.</p>
      <div style="margin: 1.5rem 0; text-align: center;">
        <span class="clue-inspectable" data-clue="fake-button" style="display: inline-block; background: #00f0ff; color: #050811; padding: 0.8rem 1.8rem; border-radius: 4px; font-weight: bold;">
          RE-AUTHENTICATE 2FA CREDENTIALS NOW
        </span>
      </div>
      <p style="font-size: 0.85rem; color: #94a3b8;">
        Link destination: <span style="font-family: monospace;">http://198.51.100.87:8080/campus/sso-login.php</span>
      </p>
      <br>
      <p>IT Operations Helpdesk<br>Security Infrastructure Division</p>
    `,
    redFlags: [
      {
        element: 'senderEmail',
        title: 'Untrusted Origin',
        desc: 'Campus IT services will always communicate from legitimate internal domain addresses, never from external third-party .com domains.'
      },
      {
        element: 'fake-button',
        title: 'Suspicious IP Address & Insecure HTTP Link',
        desc: 'The link points directly to an insecure raw IP address (http://198.51.100.87:8080) instead of a secure HTTPS university domain.'
      }
    ],
    explanation: 'PHISHING DETECTED: Attackers impersonate IT departments using generic warnings and threaten account termination. They direct victims to an insecure raw IP address to steal login passwords and session tokens.'
  },
  {
    id: 'google-legit-alert',
    name: 'Google Security Alert',
    tag: 'Legitimate Notice',
    isPhishing: false,
    senderName: 'Google Accounts',
    senderEmail: 'no-reply@accounts.google.com',
    replyTo: 'no-reply@accounts.google.com',
    date: 'Oct 23, 2026, 11:05 AM',
    subject: 'Security alert: New sign-in from Chrome on Windows',
    content: `
      <div style="border-bottom: 1px solid #334155; padding-bottom: 1rem; margin-bottom: 1rem;">
        <span style="font-family: monospace; font-size: 1.2rem; color: #00ff9d; font-weight: bold;">Google</span>
      </div>
      <p>Hi Alex,</p>
      <p>We noticed a new sign-in to your Google Account on a Windows device.</p>
      <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px; margin: 1rem 0;">
        <p style="margin-bottom: 0.3rem;"><strong>Device:</strong> Chrome on Windows 11</p>
        <p style="margin-bottom: 0.3rem;"><strong>Location:</strong> Chicago, IL, USA (IP: 73.189.20.12)</p>
        <p><strong>Time:</strong> Today, Oct 23, 2026, 11:04 AM</p>
      </div>
      <p>If this was you, you don't need to do anything. If you don't recognize this activity, review your devices immediately.</p>
      <div style="margin: 1.5rem 0;">
        <span class="clue-inspectable" data-clue="legit-link" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 0.7rem 1.4rem; border-radius: 4px; font-weight: 600;">
          Check Activity (myaccount.google.com/notifications)
        </span>
      </div>
      <p style="font-size: 0.85rem; color: #94a3b8;">You can also check security activity directly by visiting myaccount.google.com.</p>
    `,
    redFlags: [],
    explanation: 'LEGITIMATE NOTIFICATION: This email is authentic. The sender domain matches the true corporate domain (accounts.google.com), uses cryptographic DKIM verification, does not ask you to email back passwords, and gives a direct URL to standard Google account controls without panic threats.'
  },
  {
    id: 'package-delivery',
    name: 'FedEx Parcel Exception',
    tag: 'Delivery Fraud',
    isPhishing: true,
    senderName: 'FedEx Express Courier Dispatch',
    senderEmail: 'tracking-notification82@fedx-international-courier.biz',
    replyTo: 'dispatch-customs@service-desk44.biz',
    date: 'Oct 23, 2026, 07:22 AM',
    subject: 'Package Exception Notice: Delivery ID #FDX-99820-US requires recipient fee',
    content: `
      <p>Dear Customer,</p>
      <p>Your international priority courier parcel (Tracking #FDX-99820-US) arrived at the regional distribution depot, but clearance was halted due to an unpaid customs address clearance fee of <strong>$2.99</strong>.</p>
      <p>Our courier driver attempted delivery twice with no response. If the settlement is not resolved within 12 hours, the parcel will be destroyed at our regional facility.</p>
      <div style="margin: 1.5rem 0;">
        <span class="clue-inspectable" data-clue="fake-download" style="color: #ff3366; text-decoration: underline; font-weight: bold;">
          Download_Invoice_Receipt.pdf.exe (2.4 MB)
        </span>
      </div>
      <p>Please download and run the settlement form to approve address correction.</p>
      <br>
      <p>Customer Support Fleet Management<br>Express Cargo Handling</p>
    `,
    redFlags: [
      {
        element: 'fake-download',
        title: 'Executable Malicious Extension (.pdf.exe)',
        desc: 'The attachment pretends to be a PDF receipt but actually ends with ".exe", which installs malware or a Trojan horse when executed!'
      },
      {
        element: 'senderEmail',
        title: 'Typosquatted Brand Domain',
        desc: 'The domain is "fedx-international-courier.biz" (notice the missing "e" in FedEx) on a .biz TLD.'
      }
    ],
    explanation: 'PHISHING / MALWARE DELIVERY: This attack combines brand impersonation with a double extension file (".pdf.exe") designed to trick recipients into executing malware under the guise of paying a nominal shipping fee.'
  },
  {
    id: 'prof-gift-card',
    name: 'Professor Urgent Request',
    tag: 'Pretexting / BEC',
    isPhishing: true,
    senderName: 'Prof. Jonathan Vance (Department Head)',
    senderEmail: 'prof.jonathan.vance.univ@gmail.com',
    replyTo: 'prof.jonathan.vance.univ@gmail.com',
    date: 'Oct 23, 2026, 04:12 PM',
    subject: 'Urgent task — are you available on campus right now?',
    content: `
      <p>Hi,</p>
      <p>I am currently attending an off-campus academic conference and stuck in a keynote presentation with no voice call reception.</p>
      <p>I urgently need to purchase four $100 Apple Store Gift Cards for guest lecturers presenting at 5:30 PM today. Could you please run down to the campus bookstore or local store, purchase these cards, and email me photos of the PIN codes on the back right away?</p>
      <p>I will personally reimburse you first thing tomorrow morning along with a stipend for your assistance. Please reply to this email as soon as you see it as time is very sensitive.</p>
      <br>
      <p>Best,<br><strong>Prof. Jonathan Vance</strong><br>Department of Computer Science</p>
    `,
    redFlags: [
      {
        element: 'senderEmail',
        title: 'Free Webmail Account (Gmail) Instead of University Email',
        desc: 'Even though the display name shows the professor\'s name, the email address is a free @gmail.com account created by an impersonator.'
      },
      {
        element: 'gift-cards',
        title: 'Irrevocable Gift Card Payment Method',
        desc: 'Scammers frequently request gift card PINs because gift card balances are untraceable and cannot be refunded once drained.'
      }
    ],
    explanation: 'SOCIAL ENGINEERING / PRETEXTING: A common Business Email Compromise (BEC) scenario targeting research assistants and students. The attacker leverages authority, urgency, and an inability to talk by phone to request gift card codes.'
  }
];

function initPhishingSimulator() {
  const scenarioSelector = document.getElementById('phishing-scenarios-bar');
  const subjectEl = document.getElementById('sim-email-subject');
  const senderEl = document.getElementById('sim-email-sender');
  const replyToEl = document.getElementById('sim-email-replyto');
  const dateEl = document.getElementById('sim-email-date');
  const bodyEl = document.getElementById('sim-email-body');
  const verdictPhishBtn = document.getElementById('btn-verdict-phish');
  const verdictLegitBtn = document.getElementById('btn-verdict-legit');
  const explanationBox = document.getElementById('sim-explanation-box');
  const inspectModal = document.getElementById('clue-inspection-modal');

  let currentScenarioIndex = 0;
  let userScore = 0;
  let answeredScenarios = new Set();

  // Populate scenario navigation pills
  if (scenarioSelector) {
    scenarioSelector.innerHTML = phishingScenarios
      .map(
        (sc, idx) => `
        <button class="scenario-pill ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          ${sc.name}
        </button>
      `
      )
      .join('');

    const pills = scenarioSelector.querySelectorAll('.scenario-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        currentScenarioIndex = parseInt(pill.getAttribute('data-idx'), 10);
        loadScenario(currentScenarioIndex);
      });
    });
  }

  function loadScenario(index) {
    const sc = phishingScenarios[index];
    if (!sc) return;

    subjectEl.textContent = sc.subject;
    senderEl.textContent = `${sc.senderName} <${sc.senderEmail}>`;
    replyToEl.textContent = sc.replyTo;
    dateEl.textContent = sc.date;
    bodyEl.innerHTML = sc.content;

    // Reset verdict state
    explanationBox.style.display = 'none';
    verdictPhishBtn.disabled = false;
    verdictLegitBtn.disabled = false;

    // Attach clue inspection click listeners
    const clues = bodyEl.querySelectorAll('.clue-inspectable');
    clues.forEach((c) => {
      c.addEventListener('click', (e) => {
        e.stopPropagation();
        const clueKey = c.getAttribute('data-clue');
        const matched = sc.redFlags.find((rf) => rf.element === clueKey) || {
          title: 'Security Inspection Indicator',
          desc: 'Notice how this element interacts with headers and protocol signatures.'
        };
        window.showCyberToast(matched.title, matched.desc, 'info');
      });
    });
  }

  // Verdict buttons
  verdictPhishBtn?.addEventListener('click', () => submitVerdict(true));
  verdictLegitBtn?.addEventListener('click', () => submitVerdict(false));

  function submitVerdict(userSelectedPhish) {
    const sc = phishingScenarios[currentScenarioIndex];
    const isCorrect = userSelectedPhish === sc.isPhishing;

    verdictPhishBtn.disabled = true;
    verdictLegitBtn.disabled = true;

    if (isCorrect) {
      if (!answeredScenarios.has(sc.id)) {
        userScore++;
        answeredScenarios.add(sc.id);
      }
      if (window.playCyberSound) window.playCyberSound('unlock');
    } else {
      if (window.playCyberSound) window.playCyberSound('alert');
    }

    explanationBox.style.display = 'block';
    explanationBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
        <span style="font-family: var(--font-heading); font-size: 1.1rem; color: ${
          isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'
        };">
          ${isCorrect ? '✓ CORRECT ANALYSIS!' : '✗ INCORRECT ASSESSMENT'}
        </span>
        <span style="font-size: 0.85rem; color: var(--text-secondary);">
          Accuracy: ${userScore} / ${phishingScenarios.length} scenarios analyzed
        </span>
      </div>
      <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
        ${sc.explanation}
      </p>
      ${
        sc.redFlags.length > 0
          ? `
        <div style="background: rgba(5, 8, 17, 0.7); padding: 0.85rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="font-family: var(--font-subheading); font-size: 0.85rem; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 0.4rem;">
            Primary Red Flags Identified:
          </div>
          <ul style="list-style: none; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.4rem;">
            ${sc.redFlags.map((rf) => `<li>▸ <strong>${rf.title}:</strong> ${rf.desc}</li>`).join('')}
          </ul>
        </div>
      `
          : ''
      }
    `;
  }

  // Load first scenario
  loadScenario(0);
}
