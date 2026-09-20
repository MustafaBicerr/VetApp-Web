/* ============================================================
   VetApp — Main JavaScript
   Nav scroll, mobile drawer, scroll reveal, accordion
   ============================================================ */

'use strict';

// ── Nav scroll glass effect ─────────────────────────────────
(function initNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Mobile burger / drawer ──────────────────────────────────
(function initBurger() {
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('nav-drawer');
  if (!burger || !drawer) return;

  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
    burger.classList.toggle('is-open', isOpen);
    drawer.classList.toggle('is-open', isOpen);
    drawer.setAttribute('aria-hidden', String(!isOpen));
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  burger.addEventListener('click', toggle);

  // Close on drawer link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) toggle();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) toggle();
  });
})();

// ── Scroll reveal (IntersectionObserver) ───────────────────
(function initReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  const staggerEls = document.querySelectorAll('[data-stagger]');

  const opts = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, opts);

  revealEls.forEach(el => observer.observe(el));
  staggerEls.forEach(el => observer.observe(el));
})();

// ── Accordion (FAQ) ─────────────────────────────────────────
(function initAccordion() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const isOpen = item.classList.contains('is-open');

      // Close all siblings
      trigger.closest('.accordion').querySelectorAll('.accordion__item').forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
      });

      // Toggle this one
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

// ── Active nav link ─────────────────────────────────────────
(function initActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav__link, .nav__drawer-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPath = href.split('/').pop() || 'index.html';
    const isActive =
      linkPath === currentPath ||
      (currentPath === '' && (linkPath === '' || linkPath === 'index.html')) ||
      (currentPath === 'index.html' && (linkPath === '' || linkPath === '/'));

    link.classList.toggle('is-active', isActive);
  });
})();

// ── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});
