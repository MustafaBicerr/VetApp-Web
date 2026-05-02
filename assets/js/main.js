(function () {
  'use strict';

  /* ─────────────────────────────────────
     1. MOBILE NAV TOGGLE
  ───────────────────────────────────── */
  const header     = document.getElementById('header');
  const navToggle  = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      navToggle.classList.toggle('is-active', isOpen);
    });

    // Close menu on mobile nav link click
    document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        navToggle.classList.remove('is-active');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (mobileMenu.classList.contains('is-open') &&
          !header.contains(e.target)) {
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        navToggle.classList.remove('is-active');
      }
    });
  }

  /* ─────────────────────────────────────
     2. HEADER SCROLL EFFECT
  ───────────────────────────────────── */
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ─────────────────────────────────────
     3. IMAGE STACK TABS
  ───────────────────────────────────── */
  document.querySelectorAll('[data-stack]').forEach(function (stack) {
    const tabsContainer = stack.nextElementSibling;
    if (!tabsContainer || !tabsContainer.classList.contains('img-tabs')) return;

    const images = stack.querySelectorAll('.img-stack__item');
    const tabs   = tabsContainer.querySelectorAll('.img-tab');

    function switchTo(idx) {
      images.forEach(function (img, i) {
        img.classList.toggle('img-stack__item--active', i === idx);
      });
      tabs.forEach(function (tab, i) {
        const active = i === idx;
        tab.classList.toggle('img-tab--active', active);
        tab.setAttribute('aria-selected', String(active));
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { switchTo(i); });
    });
  });

  /* ─────────────────────────────────────
     4. FAQ ACCORDION
  ───────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';
      const answer  = btn.nextElementSibling;

      // Close all others
      document.querySelectorAll('.faq-q').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        const a = b.nextElementSibling;
        if (a) a.hidden = true;
      });

      // Toggle current
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.hidden = false;
      }
    });
  });

  /* ─────────────────────────────────────
     5. SMOOTH SCROLL FOR ANCHOR LINKS
  ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const hash   = anchor.getAttribute('href');
      if (hash === '#') return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────────
     6. FADE-UP SCROLL ANIMATIONS
  ───────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll('.fade-up');
    if (fadeEls.length) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      fadeEls.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ─────────────────────────────────────
     7. ACTIVE NAV LINK (scroll spy)
  ───────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (
    sections.length &&
    navLinks.length &&
    document.body.classList.contains("site-body--homepage")
  ) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            link.classList.toggle('nav-link--active', href === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { io.observe(s); });
  }

})();
