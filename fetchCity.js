const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cityList = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cityList.push(...data));

const input = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function findCity(searchWord, list) {
  return list.filter((li) => {
    const regex = new RegExp(searchWord, "gi"); 
    return li.city.match(regex);
  });
}

input.addEventListener("onChange", displayCity);
input.addEventListener("keyup", displayCity);

function displayCity() {
  const filteredCities = findCity(this.value, cityList);
  const html = filteredCities
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const myCity = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `<li>${myCity} ${place.state} ${numberWithCommas(place.population)}</li>`;
    })
    .join("");
  suggestions.innerHTML = html;
}
