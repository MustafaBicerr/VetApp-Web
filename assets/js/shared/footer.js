(function () {
  function createFooter() {
    const { el } = window.vetappDom;

    const brandLine = el("div", {
      children: [
        el("span", {
          className: "footer-dot",
        }),
        el("span", {
          text: "VetApp • Veteriner klinikler için tasarlanmış yönetim sistemi",
        }),
      ],
    });

    const links = el("nav", {
      className: "footer-links",
      children: [
        el("a", {
          attrs: { href: "#features" },
          text: "Özellikler",
        }),
        el("a", {
          attrs: { href: "#pricing" },
          text: "Fiyatlandırma (yakında)",
        }),
        el("a", {
          attrs: { href: "#faq" },
          text: "Sık sorulanlar (yakında)",
        }),
        el("a", {
          attrs: { href: "mailto:info@vetapp.com.tr" },
          text: "İletişim",
        }),
      ],
    });

    const main = el("div", {
      className: "footer-main",
      children: [brandLine, links],
    });

    const meta = el("div", {
      className: "footer-meta",
      children: [
        el("span", {
          text: "© " + new Date().getFullYear() + " VetApp",
        }),
        el("span", {
          text: "Türkiye • Çoklu klinik (multi-tenant) mimari",
        }),
        el("span", {
          text: "Sunucu: vetapp.com.tr",
        }),
      ],
    });

    const inner = el("div", {
      className: "footer-inner",
      children: [main, meta],
    });

    return el("footer", {
      className: "footer",
      children: [inner],
    });
  }

  window.vetappFooter = {
    createFooter,
  };
})();
