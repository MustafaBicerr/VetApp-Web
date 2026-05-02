(function () {
  'use strict';

  /* ─────────────────────────────────────
     PLATFORM FILTER TABS
  ───────────────────────────────────── */
  const pgTabs     = document.querySelectorAll('.pg-tab');
  const categories = document.querySelectorAll('.ss-category');

  pgTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const platform = tab.dataset.tab;

      pgTabs.forEach(function (t) {
        const active = t === tab;
        t.classList.toggle('pg-tab--active', active);
        t.setAttribute('aria-selected', String(active));
      });

      categories.forEach(function (cat) {
        if (platform === 'all') {
          cat.classList.remove('is-hidden');
        } else {
          cat.classList.toggle('is-hidden', cat.dataset.platform !== platform);
        }
      });
    });
  });

  /* ─────────────────────────────────────
     LIGHTBOX
  ───────────────────────────────────── */
  const lightbox         = document.getElementById('lightbox');
  const lightboxImg      = document.getElementById('lightbox-img');
  const lightboxCaption  = document.getElementById('lightbox-caption');
  const lightboxClose    = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  function openLightbox(src, alt, caption, isMobile) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    if (isMobile) {
      lightboxImg.setAttribute('data-mobile', 'true');
    } else {
      lightboxImg.removeAttribute('data-mobile');
    }
    lightboxCaption.textContent = caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  // Click on desktop screenshot items
  document.querySelectorAll('.ss-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const img     = item.querySelector('img');
      const caption = item.querySelector('.ss-caption');
      if (!img) return;
      const strong = caption ? caption.querySelector('strong') : null;
      const span   = caption ? caption.querySelector('span')   : null;
      openLightbox(img.src, img.alt, (strong ? strong.textContent + ' – ' : '') + (span ? span.textContent : ''), false);
    });
  });

  // Click on mobile screenshot items
  document.querySelectorAll('.ss-mobile-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const img     = item.querySelector('img');
      const caption = item.querySelector('.ss-caption');
      if (!img) return;
      const strong = caption ? caption.querySelector('strong') : null;
      const span   = caption ? caption.querySelector('span')   : null;
      openLightbox(img.src, img.alt, (strong ? strong.textContent + ' – ' : '') + (span ? span.textContent : ''), true);
    });
  });

  // Close
  if (lightboxClose)    lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

})();
