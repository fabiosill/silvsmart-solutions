/* ===========================
   SILVSMART SOLUTIONS
   main.js — Pure JavaScript
=========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ─── HAMBURGER MENU ─── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ─── HERO BG PARALLAX ─── */
  const heroBg = document.querySelector('.hero-bg');
  // hero-bg is a <div> with CSS background, not an <img>, so use setTimeout only
  setTimeout(() => heroBg?.classList.add('loaded'), 50);

  window.addEventListener('scroll', () => {
    if (!heroBg) return;
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.dataset.delay = (i % 4) * 80;
    revealObserver.observe(el);
  });

  /* ─── ANIMATED COUNTERS ─── */
  const counters = document.querySelectorAll('.count-num');
  let countersStarted = false;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2200;
    const start = performance.now();
    const startVal = 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterSection = document.querySelector('.counters-grid');
  if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach(el => animateCounter(el));
        counterObserver.unobserve(counterSection);
      }
    }, { threshold: 0.3 });
    counterObserver.observe(counterSection);
  }

  /* ─── TESTIMONIALS SLIDER ─── */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.t-dot');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(n) {
    slides[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(sliderInterval);
      goToSlide(i);
      startSlider();
    });
  });

  function startSlider() {
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 4500);
  }

  if (slides.length) {
    goToSlide(0);
    startSlider();
  }

  /* ─── BACK TO TOP ─── */
  const backTop = document.getElementById('back-top');
  window.addEventListener('scroll', () => {
    backTop?.classList.toggle('show', window.scrollY > 500);
  });

  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── SMOOTH SCROLL NAV LINKS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── CONTACT FORM ─── */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      successMsg.classList.add('show');
    }, 1200);
  });

  /* ─── HOVER EFFECTS ON SERVICE CARDS ─── */
  document.querySelectorAll('.servico-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  /* ─── ACTIVE NAV LINK ON SCROLL ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        activeLink?.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ─── SUBTLE CURSOR GLOW (desktop only) ─── */
  if (window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed; pointer-events: none; z-index: 9999;
      width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(200,169,126,0.04) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: left 0.3s ease, top 0.3s ease;
      will-change: left, top;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

});

