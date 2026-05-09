/* ===========================
   SILVSMART SOLUTIONS
   main.js — Limpo, sem duplicações
=========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ─── HAMBURGER MENU ─── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar ao clicar em qualquer link do menu
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Fechar ao clicar fora do menu (overlay)
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── HERO BG: forçar classe loaded (div, não img) ─── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 80);

    /* Parallax suave — apenas desktop */
    if (window.matchMedia('(min-width: 769px)').matches) {
      window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
          heroBg.style.transform = `scale(1) translateY(${window.scrollY * 0.2}px)`;
        }
      }, { passive: true });
    }
  }

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('visible'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.dataset.delay = (i % 4) * 80;
      revealObserver.observe(el);
    });
  }

  /* ─── COUNTERS ANIMADOS ─── */
  const counters       = document.querySelectorAll('.count-num');
  const counterSection = document.querySelector('.counters-grid');
  let countersStarted  = false;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 2200;
    const start    = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  if (counterSection && counters.length) {
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
  const dots   = document.querySelectorAll('.t-dot');
  let current  = 0;
  let sliderTimer;

  function goToSlide(n) {
    slides[current]?.classList.remove('active');
    dots[current]?.classList.remove('active');
    current = ((n % slides.length) + slides.length) % slides.length;
    slides[current]?.classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startSlider() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => goToSlide(current + 1), 4500);
  }

  if (slides.length) {
    goToSlide(0);
    startSlider();

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); startSlider(); });
    });
  }

  /* ─── BACK TO TOP ─── */
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });

    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── SMOOTH SCROLL LINKS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const selector = link.getAttribute('href');
      if (selector === '#') return;
      const target = document.querySelector(selector);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── FORMULÁRIO DE CONTATO ─── */
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form && successMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn     = form.querySelector('.form-submit');
      btn.textContent = 'Enviando...';
      btn.disabled    = true;

      setTimeout(() => {
        form.style.display = 'none';
        successMsg.classList.add('show');
      }, 1200);
    });
  }

  /* ─── ACTIVE NAV LINK AO SCROLLAR ─── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          active?.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
  }

  /* ─── CURSOR GLOW (apenas desktop) ─── */
  if (window.matchMedia('(min-width: 1025px) and (hover: hover)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = [
      'position:fixed', 'pointer-events:none', 'z-index:9999',
      'width:300px', 'height:300px', 'border-radius:50%',
      'background:radial-gradient(circle,rgba(200,169,126,0.04) 0%,transparent 70%)',
      'transform:translate(-50%,-50%)',
      'transition:left .25s ease,top .25s ease',
      'will-change:left,top',
    ].join(';');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

});
