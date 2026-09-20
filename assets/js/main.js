/* ============================================================
   VetApp — main.js
   Nav scroll, mobile drawer, accordion, scroll-reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll shadow ── */
  const nav = document.getElementById('main-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile burger / drawer ── */
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('nav-drawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('is-open');
      drawer.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('is-open');
        drawer.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav?.contains(e.target) && !drawer.contains(e.target)) {
        burger.classList.remove('is-open');
        drawer.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ── Accordion ── */
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const isOpen = item.classList.contains('is-open');

      // Close siblings
      item.closest('.accordion')
          ?.querySelectorAll('.accordion__item.is-open')
          .forEach(openItem => {
            if (openItem !== item) {
              openItem.classList.remove('is-open');
              openItem.querySelector('.accordion__trigger')?.setAttribute('aria-expanded', 'false');
            }
          });

      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ── Scroll reveal (IntersectionObserver) ── */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('[data-reveal], [data-stagger]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything
    document.querySelectorAll('[data-reveal], [data-stagger]').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  /* ── Contact form ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = document.getElementById('contact-submit');
      if (btn) {
        btn.textContent = 'Gönderiliyor…';
        btn.disabled = true;
      }
      // In production, uncomment and configure Formspree:
      // try {
      //   await fetch(form.action, { method:'POST', body: new FormData(form), headers:{'Accept':'application/json'} });
      //   form.reset();
      //   btn.textContent = 'Gönderildi ✓';
      // } catch {
      //   btn.textContent = 'Hata! Tekrar deneyin.';
      //   btn.disabled = false;
      // }
      setTimeout(() => {
        if (btn) {
          btn.innerHTML = 'Mesajı Gönder <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8h9m-4-4 4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          btn.disabled = false;
        }
        form.reset();
        alert('Mesajınız alındı! En kısa sürede yanıt vereceğiz.');
      }, 800);
    });
  }

  /* ── FAQ sidebar active link ── */
  const faqSidebarLinks = document.querySelectorAll('.faq-sidebar__link');
  if (faqSidebarLinks.length) {
    const faqSections = document.querySelectorAll('.faq-section');
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          faqSidebarLinks.forEach(l => l.classList.remove('is-active'));
          const activeLink = document.querySelector(`.faq-sidebar__link[href="#${id}"]`);
          if (activeLink) activeLink.classList.add('is-active');
        }
      });
    }, { threshold: 0.5 });
    faqSections.forEach(s => sectionObserver.observe(s));
  }

});
