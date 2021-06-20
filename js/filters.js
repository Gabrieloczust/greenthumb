const emptyElement = document.getElementById("empty");
const plantsElement = document.getElementById("plants");
const cardsElement = document.getElementById("cards");

const getPlants = (sun, water, pets) => {
  fetch(
    `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data?.length) return setEmptyElement();
      setPlants(data);
    });
};

window.filterChange = () => {
  const sun = document.querySelector('[name="sun"]').value;
  const water = document.querySelector('[name="water"]').value;
  const pets = document.querySelector('[name="pets"]').value;

  if (sun && water && pets) {
    return getPlants(sun, water, pets);
  }

  setEmptyElement();
};

const setEmptyElement = () => {
  emptyElement.style.display = "block";
  plantsElement.style.display = "none";
};

const setPlants = (plants) => {
  cardsElement.innerHTML = "";
  emptyElement.style.display = "none";
  plantsElement.style.display = "block";

  plants
    .reverse()
    .map((plant) =>
      cardsElement.insertAdjacentHTML(
        "beforeend",
        cardElement(plant, plants.length)
      )
    );
};

const cardElement = (
  { url, name, price, staff_favorite, toxicity, sun, water },
  plantsLength
) => {
  const styleGrid = plantsLength > 3 ? "many" : "";

  return `
    <div class="card ${styleGrid}">
      <div class="body">
        <img src="${url}" alt="${name}" />
      </div>

      ${
        staff_favorite
          ? `<img src="images/icons/staff-favorite.svg" alt="staff favorite" class="favorite" />`
          : ""
      }

      <h3 class="name">${name}</h3>

      <footer class="footer">
        <b>${price}</b>
        <div class="icons">
          <img src="images/icons/${iconPet[toxicity]}.svg" alt="icon pet" />
          <img src="images/icons/${iconSun[sun]}.svg" alt="icon sun" />
          <img src="images/icons/${iconWater[water]}.svg" alt="icon water" />
        </div>
      </footer>
    </div>
  `;
};

const iconPet = {
  false: "pet",
  true: "toxic",
};

const iconSun = {
  no: "no-sun",
  low: "low-sun",
  high: "high-sun",
};

const iconWater = {
  rarely: "1-drop",
  regularly: "2-drops",
  daily: "3-drops",
};
