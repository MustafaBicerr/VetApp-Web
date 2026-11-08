/* VetApp tanıtım sitesi — çalışma zamanı.
   Menü, görününce belirme, sayaçlar, "Klinikte bir gün" kaydırma sahnesi, mobil alt çubuk, iletişim formu.
   Hareket azaltılmışsa animasyonlar kapanır; JS yoksa sayfa son hâliyle okunur. */
(function () {
  'use strict';
  var root = document.documentElement;
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Başlık çizgisi
  var header = document.querySelector('.site-header');
  // Mobil alt çubuk: hero butonları ekrandan çıkınca görünür, kapanış bölümünde gizlenir
  var dock = document.querySelector('.dock');
  var heroCta = document.querySelector('[data-hero-cta]');
  var finalSec = document.querySelector('[data-final]');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (dock) {
      var past = heroCta ? heroCta.getBoundingClientRect().bottom < 0 : y > 500;
      var atEnd = finalSec ? finalSec.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
      dock.classList.toggle('show', past && !atEnd);
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobil menü
  var btn = document.querySelector('.menu-btn');
  function closeMenu() { root.classList.remove('menu-open'); if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Menüyü aç'); } }
  if (btn) {
    btn.addEventListener('click', function () {
      var open = root.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    });
    $$('.mobile-menu a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  // Sayaçlar
  function count(el) {
    var to = parseFloat(el.getAttribute('data-count')); if (isNaN(to)) return;
    var fmt = function (v) { return Math.round(v).toLocaleString('tr-TR'); };
    if (still) { el.textContent = fmt(to); return; }
    var t0 = null, dur = 1400;
    function tick(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur); el.textContent = fmt(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }

  // Görününce belirme + sayaç tetikleme
  var els = $$('.reveal, [data-count]');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        if (e.target.hasAttribute('data-count')) count(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); if (el.hasAttribute('data-count')) count(el); });
  }

  // "Klinikte bir gün" sahnesi: her tetik bloğu ekranın ortasına geldiğinde ilgili adım etkinleşir
  $$('[data-story]').forEach(function (story) {
    var caps = $$('.step-cap', story), scrs = $$('.scr', story), bars = $$('.progress i', story), trigs = $$('.trig', story);
    var clocks = $$('[data-clock]', story);
    var cur = -1;
    function go(i) {
      if (i === cur) return; cur = i;
      caps.forEach(function (c, k) { c.classList.toggle('on', k === i); c.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
      scrs.forEach(function (s, k) {
        if (k === i) { s.classList.remove('on'); void s.offsetWidth; s.classList.add('on'); } else s.classList.remove('on');
      });
      bars.forEach(function (b, k) { b.classList.toggle('done', k <= i); });
      var t = caps[i] && caps[i].getAttribute('data-time');
      if (t) clocks.forEach(function (c) { c.textContent = t; });
    }
    go(0);
    if (!('IntersectionObserver' in window)) return;
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) go(+e.target.getAttribute('data-i')); });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    trigs.forEach(function (t) { sio.observe(t); });
  });

  // İletişim / başvuru formları
  $$('form[data-contact]').forEach(function (form) {
    var msg = form.querySelector('.form-msg');
    var submit = form.querySelector('button[type="submit"]');
    function say(text, ok) { if (msg) { msg.textContent = text; msg.className = 'form-msg ' + (ok ? 'ok' : 'err'); } }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var fd = new FormData(form);
      var payload = {
        name: fd.get('name'), email: fd.get('email'), phone: fd.get('phone'), organization: fd.get('organization'),
        message: fd.get('message'), kind: fd.get('kind'), source_page: fd.get('source_page'),
        consent: form.querySelector('[name="consent"]').checked, website: fd.get('website')
      };
      if (!payload.name || String(payload.name).trim().length < 2) return say('Lütfen adınızı yazın.', false);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(payload.email || ''))) return say('Geçerli bir e-posta adresi girin.', false);
      if (!payload.message || String(payload.message).trim().length < 10) return say('Mesajınız en az 10 karakter olmalı.', false);
      if (!payload.consent) return say('Devam etmek için onay kutusunu işaretleyin.', false);
      submit.disabled = true; say('Gönderiliyor…', true);
      fetch(form.getAttribute('data-api'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok) { form.reset(); say('Teşekkürler! Mesajınız bize ulaştı, en kısa sürede dönüş yapacağız.', true); }
          else say((res.j && res.j.message) || 'Gönderilemedi. Lütfen daha sonra tekrar deneyin veya WhatsApp’tan yazın.', false);
        })
        .catch(function () { say('Bağlantı hatası. Lütfen tekrar deneyin ya da info@vetapp.com.tr adresine yazın.', false); })
        .then(function () { submit.disabled = false; });
    });
  });
})();
