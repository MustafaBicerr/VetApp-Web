(function () {
  function createHeroSection() {
    const { el } = window.vetappDom;

    const badge = el("div", {
      className: "pill",
      children: [
        el("span", { className: "pill-dot" }),
        el("span", {
          text: "Veteriner klinikler için tasarlandı",
        }),
      ],
    });

    const eyebrow = el("p", {
      className: "hero-eyebrow",
      text: "Hasta, stok ve kasa – tek bakışta",
    });

    const title = el("h1", {
      className: "hero-title",
      html: 'VetApp ile kliniğinizin <span>tüm fotoğrafını</span> aynı ekranda görün.',
    });

    const subtitle = el("p", {
      className: "hero-subtitle",
      text:
        "VetApp; randevu ve aşı takibinden, ilaç stoklarına ve günlük kasaya kadar tüm klinik işlerinizi tek bir sistemde toplar. " +
        "Böylece siz sadece tedaviye odaklanırsınız.",
    });

    const primaryCta = el("button", {
      className: "btn btn-primary",
      attrs: { "data-scroll-target": "hero-cta" },
      text: "Ücretsiz denemeyi aktive et",
    });
    primaryCta.addEventListener("click", () => {
      window.open("https://panel.vetapp.com.tr", "_blank", "noopener");
    });

    const secondaryCta = el("button", {
      className: "btn btn-ghost",
      text: "Demo ekranları gör",
    });
    secondaryCta.addEventListener("click", () => {
      const features = document.getElementById("features");
      if (features) {
        features.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    const actions = el("div", {
      className: "hero-actions",
      children: [primaryCta, secondaryCta],
    });

    const meta = el("div", {
      className: "hero-meta",
      children: [
        el("span", {
          children: [
            el("span", { className: "hero-meta-dot" }),
            el("span", { text: "Dakikalar içinde kurulum, eğitim gerektirmez" }),
          ],
        }),
        el("span", {
          text: "Çoklu klinik (multi-tenant) mimari",
        }),
        el("span", {
          text: "Türkiye için optimize edilmiş cari & enflasyon takibi",
        }),
      ],
    });

    const heroCopy = el("div", {
      children: [badge, eyebrow, title, subtitle, actions, meta],
    });

    const metricCards = [
      {
        label: "Bugünkü ciro",
        value: "₺32.480",
        pill: "+18% dünden",
      },
      {
        label: "Borçlu müşteri",
        value: "42",
        pill: "Riski tek listede görün",
      },
      {
        label: "Kritik stok",
        value: "7 ürün",
        pill: "SKT yaklaşan ilaçlar",
      },
      {
        label: "Aşı randevusu",
        value: "19",
        pill: "Günlük aşı takvimi",
      },
    ].map((m) =>
      el("div", {
        className: "metric-card",
        children: [
          el("div", { className: "metric-label", text: m.label }),
          el("div", { className: "metric-value", text: m.value }),
          el("div", { className: "metric-pill", text: m.pill }),
        ],
      }),
    );

    const metricsGrid = el("div", {
      className: "hero-panel-metrics",
      children: metricCards,
    });

    const panelHeader = el("div", {
      className: "hero-panel-header",
      children: [
        el("div", {
          children: [
            el("div", {
              className: "hero-panel-title",
              text: "Canlı dashboard ön izlemesi",
            }),
            el("div", {
              className: "hero-panel-tag",
              text: "Saatlik satış, tahsilat ve stok uyarıları tek ekranda",
            }),
          ],
        }),
      ],
    });

    const panelFooter = el("div", {
      className: "hero-panel-footer",
      children: [
        el("span", {
          children: [
            el("span", { className: "hero-panel-dot" }),
            el("span", { text: "Gerçek zamanlı kasa ve cari görünümü" }),
          ],
        }),
        el("span", {
          text: "Her klinik için ayrı, güvenli veri alanı",
        }),
      ],
    });

    const heroPanel = el("aside", {
      className: "hero-panel",
      children: [panelHeader, metricsGrid, panelFooter],
    });

    const grid = el("div", {
      className: "hero-grid",
      children: [heroCopy, heroPanel],
    });

    return el("section", {
      className: "section home-hero-section",
      attrs: { id: "hero" },
      children: [
        el("div", {
          className: "page-shell",
          children: [grid],
        }),
      ],
    });
  }

  window.vetappHomeHero = {
    createHeroSection,
  };
})();
