(function () {
  function createHomeContentSection() {
    const { el } = window.vetappDom;
    const { createSectionHeading } = window.vetappSections;

    const heading = createSectionHeading({
      id: "features",
      eyebrow: "VetApp ne çözüyor?",
      title: "Klinik yoğunluğunu düzenler, rakamları netleştirir.",
      description:
        "Hasta kayıtlarını, stokları ve cariyi ayrı ayrı programlarda taşıma devri bitti. VetApp, veteriner kliniğinizin tüm kritik akışlarını tek sistemde toplar.",
    });

    const features = [
      {
        label: "Klinik kayıtlar",
        title: "Hasta, randevu ve aşı karnesi bir arada",
        body:
          "Her hasta kartında randevu geçmişi, aşı planı ve pet sahibinin borç durumu tek ekranda. Bilgi kaybı olmadan tedaviye devam edin.",
        tags: ["Veteriner hekim", "Resepsiyon"],
      },
      {
        label: "Stok & ilaç",
        title: "Master ilaç veritabanı ve barkodlu stok",
        body:
          "İlaçları isim veya barkodla bulun, tek tıkla kliniğinize ürün olarak ekleyin. Kritik stok ve SKT uyarılarıyla ilaç bitmeden haberdar olun.",
        tags: ["Stok sorumlusu", "Klinik sahibi"],
      },
      {
        label: "Finans & cari",
        title: "Gerçek anlamda güncel cari tablo",
        body:
          "Müşteri borçları, geçmiş satışlar, tahsilatlar ve enflasyon farkı aynı tabloda. Hangi müşteride ne kadar risk taşıdığınızı net görün.",
        tags: ["Klinik sahibi", "Muhasebe"],
      },
      {
        label: "Satış & POS",
        title: "Telefon üzerinden bile kullanılabilen hızlı satış ekranı",
        body:
          "Barkodla ürünü okutun, sepeti oluşturun, isterseniz tamamını, isterseniz bir kısmını tahsil edin. Kalan otomatik olarak cariye yazılır.",
        tags: ["Kasa", "Resepsiyon"],
      },
      {
        label: "Kasa & raporlar",
        title: "Gün sonu sürprizlerine veda",
        body:
          "Bugünkü ciro, tahsilatlar, masraflar, ödeme yöntemleri ve tedarikçi borçları tek dashboard’da. Rakamlar kasa ile birebir tutarlı.",
        tags: ["Klinik sahibi"],
      },
      {
        label: "Çoklu klinik mimari",
        title: "Her klinik için izole ve güvenli alan",
        body:
          "Her kullanıcı kendi kliniğinin verisini görür; veriler klinikler arasında karışmaz. VetApp, çoklu klinik (multi-tenant) mimariye göre tasarlandı.",
        tags: ["Tek klinik", "Zincir klinik"],
      },
    ];

    const featureCards = features.map((f) => {
      const tagEls = (f.tags || []).map((t) =>
        el("span", {
          children: [el("span", { className: "feature-dot" }), el("span", { text: t })],
        }),
      );

      return el("article", {
        className: "feature-card",
        children: [
          el("div", { className: "feature-label", text: f.label }),
          el("h3", { className: "feature-title", text: f.title }),
          el("p", { className: "feature-body", text: f.body }),
          el("div", {
            className: "feature-meta",
            children: tagEls,
          }),
        ],
      });
    });

    const grid = el("div", {
      className: "feature-grid",
      children: featureCards,
    });

    return el("section", {
      className: "section home-content-section",
      children: [
        el("div", {
          className: "page-shell",
          children: [heading, grid],
        }),
      ],
    });
  }

  window.vetappHomeContent = {
    createHomeContentSection,
  };
})();
