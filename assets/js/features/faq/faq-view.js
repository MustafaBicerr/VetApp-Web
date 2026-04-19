(function () {
  function createFaqView() {
    const { el } = window.vetappDom;
    const { createSectionHeading } = window.vetappSections;

    const heading = createSectionHeading({
      eyebrow: "Sıkça sorulan sorular",
      title: "VetApp hakkında merak edilenler.",
      description:
        "Aşağıdaki sorular, veteriner hekimlerden en sık duyduğumuz başlıkların kısa ve net cevaplarıdır.",
    });

    const faqs = [
      {
        q: "VetApp’i kullanmak için teknik bilgiye ihtiyacım var mı?",
        a: "Hayır. Temel bilgisayar/telefon kullanımı biliyor olmanız yeterli. Ekranlar, günlük klinik akışınıza göre sadeleştirilmiş şekilde tasarlandı.",
      },
      {
        q: "Verilerim nerede ve nasıl saklanıyor?",
        a: "VetApp çoklu klinik (multi-tenant) mimari ile çalışır. Her klinik kendi alanında izole tutulur, diğer kliniklerle karışmaz.",
      },
      {
        q: "Stok ve kasa verilerim uyuşmazsa ne olur?",
        a: "Satış, tahsilat, masraf ve tedarikçi ödemeleri tek kasa motorundan geçtiği için dashboard ve kasa rakamları birbiriyle tutarlı çalışır.",
      },
      {
        q: "Ücretsiz deneme var mı?",
        a: "Evet. Panel üzerinden hazır test hesabı ile sisteme girip tüm modülleri risksiz şekilde deneyebilirsiniz.",
      },
    ];

    const list = el("div", {
      className: "feature-grid",
      children: faqs.map((item) =>
        el("article", {
          className: "feature-card",
          children: [
            el("h3", { className: "feature-title", text: item.q }),
            el("p", { className: "feature-body", text: item.a }),
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

  window.vetappFaq = {
    createFaqView,
  };
})();

