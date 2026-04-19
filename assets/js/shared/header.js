(function () {
  function createHeader(onNavigate) {
    const { el } = window.vetappDom;

    const logoMark = el("div", {
      className: "logo-mark",
      text: "V",
    });

    const logoTexts = el("div", {
      children: [
        el("div", {
          className: "logo-text-main",
          text: "VETAPP",
        }),
        el("div", {
          className: "logo-text-sub",
          text: "Veteriner Klinik Yönetim Sistemi",
        }),
      ],
    });

    const logo = el("button", {
      className: "logo-lockup",
      children: [logoMark, logoTexts],
    });
    logo.addEventListener("click", () => {
      if (onNavigate) onNavigate("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const navLinks = el("nav", {
      className: "nav-links",
      children: [
        el("button", {
          className: "nav-link",
          text: "Ana sayfa",
        }),
        el("button", {
          className: "nav-link",
          text: "Program özellikleri",
        }),
        el("button", {
          className: "nav-link",
          text: "Kılavuz",
        }),
        el("button", {
          className: "nav-link",
          text: "Görseller",
        }),
        el("button", {
          className: "nav-link",
          text: "SSS",
        }),
      ],
    });

    const [homeLink, featuresLink, guideLink, galleryLink, faqLink] =
      navLinks.children;

    homeLink.addEventListener("click", () => onNavigate && onNavigate("home"));
    featuresLink.addEventListener("click", () => onNavigate && onNavigate("features"));
    guideLink.addEventListener("click", () => onNavigate && onNavigate("guide"));
    galleryLink.addEventListener("click", () => onNavigate && onNavigate("gallery"));
    faqLink.addEventListener("click", () => onNavigate && onNavigate("faq"));

    const trialBtn = el("button", {
      className: "btn btn-ghost",
      text: "Paneli Gör",
    });
    trialBtn.addEventListener("click", () => {
      window.open("https://panel.vetapp.com.tr", "_blank", "noopener");
    });

    const ctaBtn = el("button", {
      className: "btn btn-primary",
      text: "Ücretsiz denemeye başla",
    });
    ctaBtn.addEventListener("click", () => {
      const heroCta = document.querySelector("[data-scroll-target='hero-cta']");
      if (heroCta) {
        heroCta.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.href = "#hero";
      }
    });

    const actions = el("div", {
      className: "nav-actions",
      children: [trialBtn, ctaBtn],
    });

    const toggleIcon = el("span", {
      className: "nav-toggle-icon",
    });

    const toggleBtn = el("button", {
      className: "nav-toggle",
      children: [toggleIcon],
    });

    const navMain = el("div", {
      className: "nav-main",
      children: [navLinks, actions, toggleBtn],
    });

    const inner = el("div", {
      className: "header-inner",
      children: [logo, navMain],
    });

    const header = el("header", {
      className: "header",
      children: [inner],
    });

    toggleBtn.addEventListener("click", () => {
      header.classList.toggle("header--menu-open");
    });

    return header;
  }

  window.vetappHeader = {
    createHeader,
  };
})();
