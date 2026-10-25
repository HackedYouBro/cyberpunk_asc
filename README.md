# CyberShield – Cybersecurity Awareness & Protection Portal
**College Demonstration Project: Defensive Cybersecurity, Human-Centered Security Awareness & Interactive Defense Simulator**

---

## 🛡️ Project Overview
**CyberShield** is a modern, responsive, high-impact cybersecurity portal built as a college project to educate students, faculty, and everyday digital citizens on digital threat prevention. It features interactive client-side cryptographic tools, phishing detection simulators, assessment quizzes, and an administrator editing mode.

### 🌟 Key Pillars
1. **Zero-Trust Client-Side Privacy:** All password evaluations and entropy calculations execute 100% locally in the browser sandbox. No user-entered passwords or emails are ever logged, transmitted, or saved to external servers.
2. **Interactive Defensive Learning:** Hands-on phishing scenario inspections, brute-force crack time calculators, and practical quiz assessments rather than passive reading.
3. **Synthetic Demonstration Telemetry:** Security Operations Center (SOC) dashboard metrics and live threat interception streams clearly labeled for educational simulation.
4. **Hidden Website Editor Mode:** A discrete trigger (3 consecutive clicks on the CyberShield logo within 3 seconds) that transforms the entire website into an in-place visual editor with a docked top studio bar, 6 instant color themes, and zero popup panels.

---

## 🚀 How to Run the Website

Because CyberShield is engineered with pure, standards-compliant HTML5, CSS3, and ES6+ JavaScript:
- **No dependencies or build steps required.**
- Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari).
- Alternatively, you can serve it with any local static HTTP server if desired.

File Location:
```
C:\Users\techt\.gemini\antigravity\scratch\cybershield-portal\index.html
```

---

## 🧭 Main Pages & Feature Breakdown

### 1. Homepage & Hero Section
- **Heading:** *"Secure Your Digital World."*
- **Action Triggers:** "Explore Security Tools" and "Learn Cyber Safety".
- **Visuals:** Custom SVG cyber shield with animated particle rings, circuit traces, glowing defense tags, and responsive interactive canvas particle network.
- **Demonstration Statistics:** High-impact metric cards covering daily phishing volumes, human error rates, ransomware frequency, and education sector targets — clearly watermarked as simulated demonstration data.
- **Why It Matters:** Dedicated focus cards contrasting threats targeting college students (campus Wi-Fi, financial aid phishing, credential reuse) versus everyday consumers (identity theft, family impersonation, cloud extortion).

### 2. Section A: Cybersecurity Awareness
- Comprehensive breakdown of 6 critical threat vectors:
  1. Phishing & Spear-Phishing
  2. Malware & Keyloggers
  3. Ransomware Extortion
  4. Credential Stuffing & Brute Force
  5. Social Engineering & Pretexting
  6. Identity Theft & Data Breaches
- Each card highlights real-world warning signs, severity level, and tactical prevention tips.

### 3. Section B: Password Security Checker & Generator
- **Real-Time Shannon Entropy:** Computes entropy bits based on character pool diversity and length.
- **Offline GPU Cluster Crack Time:** Accurately estimates brute-force cracking resistance against high-speed hash-cracking clusters ($10^{10}$ combinations/second).
- **Dynamic 5-Tier Strength Meter:** Very Weak, Weak, Moderate, Strong, and Fortified/Military-Grade.
- **Live Criteria Checklist:** Verifies 12+ chars, uppercase, lowercase, numbers, symbols, and absence of repetitive/dictionary patterns.
- **High-Entropy Password Generator:** Customizable length slider (8 to 32 characters), character set toggles, instant copy-to-clipboard, and direct "Test In Checker" integration.
- **Privacy Guarantee:** 100% client-side guarantee banner.

### 4. Section C: Phishing Awareness Simulator
- **5 Fictional Educational Scenarios:**
  1. *University Tuition Refund ($1,840) Urgent Audit* (Student-targeted scam)
  2. *Campus IT 2FA Expiry Warning with Raw IP Link* (Credential harvesting)
  3. *Authentic Google Security Alert* (Legitimate reference benchmark)
  4. *FedEx International Exception with .pdf.exe attachment* (Executable malware payload)
  5. *Professor Urgent Gift Card Request* (Business Email Compromise / Pretexting)
- **Clickable Clues:** Users click dashed suspect text (mismatched domains, deceptive URLs, urgency cues) to reveal educational callouts.
- **Challenge Mode:** Users decide *"🚨 Flag as Phishing Scam"* or *"✅ Verify as Legitimate"* and receive instant feedback and accuracy scoring.

### 5. Section D: Cyber Safety Quiz
- 10 practical multiple-choice questions covering Wi-Fi security, hardware 2FA keys, the 3-2-1 backup rule, USB drop attacks, credential stuffing, passphrases, CVE updates, and identity theft.
- Immediate explanatory breakdown for every question.
- Dynamic scoring with rank badges (*Cyber Defense Commander*, *Vigilant Sentinel*, *Cyber Scout*).
- Full question-by-question review capability and quiz retake option.

### 6. Section E: Security Operations Center (SOC) Dashboard
- **Threat Vector Donut Chart:** Interactive SVG chart illustrating attack frequency distribution with segment hover tooltips.
- **Live Simulated SOC Threat Feed:** Real-time terminal log appending synthetic threat mitigations every 3.5 seconds with pause/resume controls.
- **Personal Hygiene Audit:** Interactive 6-point cyber hygiene checklist persisting state across sessions via `localStorage`.

### 7. Section F: Resources & Contact
- Direct links to trusted authorities (CISA, OWASP, FTC).
- Form with full front-end validation (email format, message length) and an explicit demonstration-mode confirmation modal.

---

## 🔑 Whole Website Studio Editor Mode (Three-Click Trigger + 4-Digit PIN)

### Trigger & Authentication Workflow:
1. Locate the **CyberShield Logo** in the top navigation bar.
2. Click it **3 consecutive times within 3 seconds**.
3. A futuristic **Security Gateway Dialog** appears prompting for a **4-digit Administrator PIN**.
4. Enter the 4-digit PIN:
   - **Default Admin PIN:** `2026` (or `1337`)
   - Inputs feature auto-focus jump, backspace handling, and shake animations on incorrect entry.
5. Upon entering the correct PIN:
   - An audio unlock chime plays.
   - The top-docked **Studio Control Bar** slides in.
   - **The entire webpage becomes directly editable in place with zero popup panels blocking the view!**

### Studio & Aesthetic Capabilities:
- **Default Black & Gold Theme:** Luxury obsidian black backgrounds (`#080603`) paired with radiant cyber gold (`#ffd700`) and amber (`#f59e0b`) glowing accents.
- **Golden Quantum Compass Mouse Animation:** Geometric diamond laser reticle, radiant gold core, trailing golden stardust embers, and expanding click shockwaves.
- **Direct Webpage In-Place Editing:** Every heading, paragraph, card title, stat number, button label, and badge is directly clickable and live-editable right on the webpage.
- **Dynamic 6-Theme Color Switcher:** One-click instant theme switching in the top Studio Bar:
  - 👑 **Gold & Black (Default):** Radiant Cyber Gold `#ffd700` & Deep Obsidian `#080603`
  - 📟 **Matrix:** Phosphor Terminal Green `#00ff66` & `#39ff14`
  - ⚡ **Cobalt:** Electric Blue `#38bdf8` & Royal Cobalt `#2563eb`
  - 🚨 **Crimson:** Alert Neon Red `#ff0055` & Crimson `#ff3366`
  - 🔮 **Synthwave:** Cyber Magenta `#ff007f` & Ultraviolet `#a855f7`
  - 🌐 **Cyan/Neon:** Original Cyan `#00f0ff` & Neon Green `#00ff9d`
  - 🎨 **Custom Color Picker:** Direct live color swatch to choose any custom accent!
- **Section Controls on Hover:** Move sections up/down or toggle visibility right from the page.
- **Inline Graphic Changer:** Hover on the central hero visual to switch between Shield, Lock, Radar, or custom image URL.
- **Persistence:** Save all in-place edits and active theme to `localStorage`.

---

## 📁 Project Structure

```
cybershield-portal/
├── index.html                 # Semantic single-page application & responsive layout
├── css/
│   ├── styles.css             # Cyberpunk design system, 6 color themes & mouse animations
│   └── editor.css             # Top studio bar, inline edit indicators & section controls
├── js/
│   ├── main.js                # Canvas particle network, cyber mouse cursor, synth & forms
│   ├── password-checker.js    # 100% Client-side Shannon entropy, crack timer & generator
│   ├── phishing-simulator.js  # Interactive fictional email inspection & detection sandbox
│   ├── quiz.js                # 10-question cyber assessment engine with badges & review
│   ├── dashboard.js           # SVG threat vector donut chart, simulated SOC feed & checklist
│   └── editor.js              # 3-click trigger, whole website studio bar & theme engine
├── server.ps1                 # Lightweight local static HTTP server
├── start-server.bat           # 1-Click batch launcher for local server
└── README.md                  # Comprehensive project documentation
```

---
*Developed for College Project Presentation – CyberShield Portal.*
