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

    const input = option.parentNode.parentNode.querySelector("input");
    const valueElement = option.parentNode.parentNode.querySelector(".value");
    const optionText = option.innerText;
    const optionValue = option.getAttribute("value");

    input.value = optionValue;
    valueElement.innerText = optionText;

    window.filterChange();
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
