(function () {
  function createGuideView() {
    const { el } = window.vetappDom;
    const { createSectionHeading } = window.vetappSections;

    const heading = createSectionHeading({
      eyebrow: "Kullanım kılavuzu",
      title: "VetApp’i 10 dakikada kliniğinizde çalışır hale getirin.",
      description:
        "Teknik bilginiz olmasa bile; kayıt, hasta ekleme, stok tanımlama ve satış adımlarında sizi adım adım yönlendiriyoruz.",
    });

    const steps = [
      {
        title: "1. Adım – Kliniğinizi kaydedin",
        body: "Klinik adı, adres ve iletişim bilgilerini girin. VetApp sizin için izole bir klinik alanı oluşturur.",
      },
      {
        title: "2. Adım – Ürün ve ilaçlarınızı içeri alın",
        body: "Barkod okuyucunuzla ilaçları okutarak ya da isimle arayarak master ilaç veritabanından stoğunuza ekleyin.",
      },
      {
        title: "3. Adım – İlk satış ve cari kaydı",
        body: "Quick Sale ekranından örnek bir satış yapın, kalan borcu cariye yazın ve müşteri detayında görün.",
      },
      {
        title: "4. Adım – Gün sonu kasa raporu",
        body: "Günün sonunda kasa ekranına girip, ciro, tahsilatlar ve masrafları tek kartta görün.",
      },
    ];

    const list = el("div", {
      className: "feature-grid",
      children: steps.map((step) =>
        el("article", {
          className: "feature-card",
          children: [
            el("h3", { className: "feature-title", text: step.title }),
            el("p", { className: "feature-body", text: step.body }),
          ],
        }),
      ),
    });

    return el("section", {
      className: "section home-content-section",
      children: [
        el("div", {
          className: "page-shell",
          children: [heading, list],
        }),
      ],
    });
  }

  window.vetappGuide = {
    createGuideView,
  };
})();

