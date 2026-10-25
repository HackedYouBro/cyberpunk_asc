/**
 * CYBERSHIELD - MAIN APPLICATION CONTROLLER
 * Canvas particle network, navigation, audio effects, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();
  initNavigation();
  initStatCounters();
  initContactForm();
  initAudioSynthesizer();
  initCyberMouseAnimation();
});

/* ==========================================================================
   CYBER PARTICLE NETWORK CANVAS
   ========================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);

  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.3 ? '#ffd700' : '#f59e0b';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = 1 - dist / 130;
          ctx.strokeStyle = `rgba(255, 215, 0, ${alpha * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Navbar glass effect on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scroll spy
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile menu toggle
  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
    });
  });
}

/* ==========================================================================
   STATISTICS COUNTER ANIMATION
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach((stat) => {
            const target = parseFloat(stat.getAttribute('data-target') || '0');
            const suffix = stat.getAttribute('data-suffix') || '';
            const isDecimal = target % 1 !== 0;
            let current = 0;
            const duration = 1800;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                stat.textContent = (isDecimal ? target.toFixed(1) : Math.round(target)) + suffix;
                clearInterval(timer);
              } else {
                stat.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
              }
            }, stepTime);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.getElementById('stats');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   CONTACT FORM VALIDATION & SIMULATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('cyber-contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const responseModal = document.getElementById('contact-response-modal');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const subject = document.getElementById('contact-subject');
    const message = document.getElementById('contact-message');

    let isValid = true;

    // Validation checks
    if (!name.value.trim()) {
      showError('contact-name-error', 'Name is required');
      isValid = false;
    } else {
      hideError('contact-name-error');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError('contact-email-error', 'Please enter a valid email address');
      isValid = false;
    } else {
      hideError('contact-email-error');
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      showError('contact-message-error', 'Message must be at least 10 characters');
      isValid = false;
    } else {
      hideError('contact-message-error');
    }

    if (!isValid) return;

    // Simulate sending with high-tech UI feedback
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      TRANSMITTING ENCRYPTED PACKET...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      // Show demonstration confirmation
      showCyberToast(
        'MESSAGE DISPATCHED (DEMO MODE)',
        'Validation passed. As this is an educational demo portal, no external emails are dispatched.',
        'success'
      );
    }, 1500);
  });

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
    }
  }

  function hideError(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  }
}

/* ==========================================================================
   CYBER SOUND SYNTHESIZER (Web Audio API)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioSynthesizer() {
  window.playCyberSound = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'unlock') {
        // High-tech sci-fi activation chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.setValueAtTime(200, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  };
}

/* ==========================================================================
   GLOBAL CYBER TOAST NOTIFICATION
   ========================================================================== */
window.showCyberToast = function (title, message, type = 'info') {
  let toast = document.getElementById('cyber-global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cyber-global-toast';
    toast.className = 'cyber-toast';
    document.body.appendChild(toast);
  }

  const iconSvg =
    type === 'success'
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff9d" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    <div style="flex-shrink: 0">${iconSvg}</div>
    <div>
      <div style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: #fff;">${title}</div>
      <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px;">${message}</div>
    </div>
  `;

  toast.classList.add('show');
  if (window.playCyberSound) window.playCyberSound('click');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
};

/* ==========================================================================
   CYBER MOUSE CURSOR & PARTICLES ENGINE
   ========================================================================== */
function initCyberMouseAnimation() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  let dot = document.getElementById('cyber-cursor-dot');
  let ring = document.getElementById('cyber-cursor-ring');

  if (!dot) {
    dot = document.createElement('div');
    dot.id = 'cyber-cursor-dot';
    document.body.appendChild(dot);
  }

  if (!ring) {
    ring = document.createElement('div');
    ring.id = 'cyber-cursor-ring';
    document.body.appendChild(ring);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let lastSparkTime = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    const now = Date.now();
    if (now - lastSparkTime > 55) {
      lastSparkTime = now;
      spawnSpark(mouseX, mouseY);
    }
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.22;
    ringY += (mouseY - ringY) * 0.22;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  function spawnSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'cyber-spark';
    const offsetX = (Math.random() - 0.5) * 16;
    const offsetY = (Math.random() - 0.5) * 16;
    spark.style.left = `${x + offsetX}px`;
    spark.style.top = `${y + offsetY}px`;

    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }

  window.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'cyber-click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });

  const interactiveSelector = 'a, button, input, select, textarea, [contenteditable="true"], .btn, .cyber-card, .brand-logo-trigger, .scenario-pill, .filter-btn, .quiz-option-btn, [data-editable="true"], .theme-color-pill, .studio-tool-btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}
