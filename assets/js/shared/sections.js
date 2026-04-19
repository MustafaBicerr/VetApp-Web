(function () {
  function createSectionHeading(opts) {
    const { el } = window.vetappDom;
    const { id, eyebrow, title, description } = opts;

    const parts = [];
    if (eyebrow) {
      parts.push(
        el("div", {
          className: "section-eyebrow",
          text: eyebrow,
        }),
      );
    }

    parts.push(
      el("h2", {
        className: "section-title",
        text: title,
      }),
    );

    if (description) {
      parts.push(
        el("p", {
          className: "section-description",
          text: description,
        }),
      );
    }

    return el("header", {
      className: "section-heading",
      attrs: id ? { id } : undefined,
      children: parts,
    });
  }

  window.vetappSections = {
    createSectionHeading,
  };
})();
