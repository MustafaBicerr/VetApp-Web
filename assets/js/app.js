(function () {
  function bootstrap() {
    const root = document.getElementById("app-root");
    if (!root) return;

    if (window.vetappHomeInit && typeof window.vetappHomeInit.initHomePage === "function") {
      window.vetappHomeInit.initHomePage(root);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
