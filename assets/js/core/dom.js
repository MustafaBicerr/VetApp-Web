window.vetappDom = (function () {
  function el(tag, options = {}) {
    const node = document.createElement(tag);
    if (options.className) {
      node.className = options.className;
    }
    if (options.attrs) {
      Object.entries(options.attrs).forEach(([key, value]) => {
        if (value != null) node.setAttribute(key, value);
      });
    }
    if (options.text) {
      node.textContent = options.text;
    }
    if (options.html) {
      node.innerHTML = options.html;
    }
    if (options.children) {
      options.children.forEach((child) => {
        if (!child) return;
        node.appendChild(child);
      });
    }
    return node;
  }

  function clear(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  return {
    el,
    clear,
  };
})();
