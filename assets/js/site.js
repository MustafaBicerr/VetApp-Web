(function () {
  'use strict';
  var root = document.documentElement;

  // Başlık: kaydırınca çizgi
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobil menü
  var btn = document.querySelector('.menu-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var open = root.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    });
    document.querySelectorAll('.mobile-menu a').forEach(function (a) {
      a.addEventListener('click', function () { root.classList.remove('menu-open'); btn.setAttribute('aria-expanded', 'false'); });
    });
  }

  // Görününce belirme
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // İletişim / başvuru formları
  document.querySelectorAll('form[data-contact]').forEach(function (form) {
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
          else say((res.j && res.j.message) || 'Gönderilemedi. Lütfen daha sonra tekrar deneyin veya e-posta yazın.', false);
        })
        .catch(function () { say('Bağlantı hatası. Lütfen tekrar deneyin ya da info@vetapp.com.tr adresine yazın.', false); })
        .then(function () { submit.disabled = false; });
    });
  });
})();
