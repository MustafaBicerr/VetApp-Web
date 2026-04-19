(function () {
  function initHomePage(root) {
    const { el, clear } = window.vetappDom;
    const { createHeader } = window.vetappHeader;
    const { createFooter } = window.vetappFooter;
    const { createHeroSection } = window.vetappHomeHero;
    const { createHomeContentSection } = window.vetappHomeContent;

    clear(root);

    const pageRoot = el("div", {
      className: "page-root",
    });

    const main = el("main", {
      className: "page-main",
    });

    function render(view) {
      const children = [];
      if (view === "home") {
        children.push(createHeroSection(), createHomeContentSection());
      } else if (view === "features") {
        if (window.vetappProgram) {
          children.push(window.vetappProgram.createProgramView());
        }
      } else if (view === "guide") {
        if (window.vetappGuide) {
          children.push(window.vetappGuide.createGuideView());
        }
      } else if (view === "gallery") {
        if (window.vetappGallery) {
          children.push(window.vetappGallery.createGalleryView());
        }
      } else if (view === "faq") {
        if (window.vetappFaq) {
          children.push(window.vetappFaq.createFaqView());
        }
      }

      if (children.length === 0) {
        children.push(createHeroSection(), createHomeContentSection());
      }

      clear(main);
      children.forEach((c) => main.appendChild(c));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const header = createHeader(render);
    const footer = createFooter();

    pageRoot.appendChild(header);
    pageRoot.appendChild(main);
    pageRoot.appendChild(footer);

    root.appendChild(pageRoot);

    render("home");
  }

  window.vetappHomeInit = {
    initHomePage,
  };
})();
