window.scrollToTop = () => window.scrollTo({ top: 0, behavior: `smooth` });

window.scrollToFilter = () =>
  document
    .querySelector(".filters")
    .scrollIntoView({ behavior: "smooth", block: "start" });
