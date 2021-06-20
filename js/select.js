const selects = [...document.getElementsByClassName("custom-select")];
const options = [...document.getElementsByClassName("option")];

closeAllSelects = () =>
  selects.map((select) => select.classList.remove("open"));

selects.map((select) => {
  select.addEventListener("click", (event) => {
    const isOpen =
      event.target.className.includes("open") ||
      event.path[1].className.includes("open");

    closeAllSelects();

    if (!isOpen) {
      select.classList.add("open");
    }
  });
});

options.map((option) => {
  option.addEventListener("click", () => {
    option.classList.add("selected");

    [...option.parentNode.children].filter((child) => {
      if (child !== option) {
        child.classList.remove("selected");
      }
    });

    const valueElement = option.parentNode.parentNode.firstElementChild;
    const optionText = option.innerText;

    valueElement.innerText = optionText;
  });
});

window.addEventListener("click", (event) => {
  const isSelect =
    event.target.className.includes("custom-select") ||
    event.path[1].className.includes("custom-select");

  if (!isSelect) {
    closeAllSelects();
  }
});
