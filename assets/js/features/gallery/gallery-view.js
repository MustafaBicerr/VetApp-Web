(function () {
  function createGalleryView() {
    const { el } = window.vetappDom;
    const { createSectionHeading } = window.vetappSections;

    const heading = createSectionHeading({
      eyebrow: "Uygulama içi görüntüler",
      title: "Dashboard, satış, stok ve klinik ekranları.",
      description:
        "Aşağıdaki görseller, VetApp’in mobil ve masaüstü görünümünden örnek ekranlardır. Şimdilik placeholder; yakında gerçek ekran görüntüleri ile güncellenecek.",
    });

    const placeholders = ["Dashboard", "Satış & POS", "Stok", "Cari & kasa"].map(
      (label) =>
        el("article", {
          className: "feature-card",
          children: [
            el("div", {
              className: "feature-label",
              text: "Ekran ön izleme",
            }),
            el("h3", {
              className: "feature-title",
              text: label,
            }),
            el("div", {
              className: "feature-body",
              text: "Buraya bu ekrana ait gerçek bir ekran görüntüsü yerleştirilecek.",
            }),
          ],
        }),
    );

    const grid = el("div", {
      className: "feature-grid",
      children: placeholders,
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

  window.vetappGallery = {
    createGalleryView,
  };
})();

