(function () {
  function createProgramView() {
    const { el } = window.vetappDom;
    const { createSectionHeading } = window.vetappSections;

    const heading = createSectionHeading({
      eyebrow: "Program özellikleri",
      title: "VetApp hangi modülleri içeriyor?",
      description:
        "Klinik kaydı, stok ve finans akışını ayrı ayrı düşünmek yerine; VetApp ile tek bir bütünün parçaları gibi yönetirsiniz.",
    });

    const grid = el("div", {
      className: "feature-grid",
      children: [
        el("article", {
          className: "feature-card",
          children: [
            el("div", { className: "feature-label", text: "Klinik" }),
            el("h3", {
              className: "feature-title",
              text: "Hasta, randevu ve aşı karnesi",
            }),
            el("p", {
              className: "feature-body",
              text: "Her pet için tam klinik kart; randevu geçmişi, aşı planı ve pet sahibinin cari durumu tek bakışta.",
            }),
          ],
        }),
        el("article", {
          className: "feature-card",
          children: [
            el("div", { className: "feature-label", text: "Stok" }),
            el("h3", {
              className: "feature-title",
              text: "Master ilaç veritabanı ve barkod",
            }),
            el("p", {
              className: "feature-body",
              text: "Piyasadaki veteriner ilaçlarını isim veya barkodla bulun, tek tıkla kliniğinize ürün olarak ekleyin.",
            }),
          ],
        }),
        el("article", {
          className: "feature-card",
          children: [
            el("div", { className: "feature-label", text: "Finans" }),
            el("h3", {
              className: "feature-title",
              text: "Cari, kasa ve tedarikçi borçları",
            }),
            el("p", {
              className: "feature-body",
              text: "Müşteri borçları, enflasyon farkları, günlük kasa ve tedarikçi faturaları tek dashboard’da.",
            }),
          ],
        }),
      ],
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

  window.vetappProgram = {
    createProgramView,
  };
})();

