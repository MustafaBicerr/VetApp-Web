/**
 * Şimdilik bu sayfanın yüklendiği STS sayfasına özel — SSS arama filtresi
 */
(function () {
  var input = document.getElementById("sss-faq-search");
  var items = document.querySelectorAll("[data-faq-item]");
  if (!input || !items.length) return;

  function norm(s) {
    return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  var catSel = "." + "s".repeat(3) + "-cat";

  input.addEventListener("input", function () {
    var q = norm(input.value);
    items.forEach(function (el) {
      var hay = norm(el.getAttribute("data-keywords"));
      var show =
        q.length === 0 ||
        hay.includes(q) ||
        norm(el.textContent).includes(q);
      el.style.display = show ? "" : "none";
    });
    document.querySelectorAll(catSel).forEach(function (sec) {
      var vis = Array.prototype.some.call(
        sec.querySelectorAll("[data-faq-item]"),
        function (x) {
          return x.offsetParent !== null;
        },
      );
      sec.style.display = vis ? "" : "none";
    });
  });
})();
