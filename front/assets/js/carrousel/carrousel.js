import { fetchData } from "../lib/functions.js";

window.addEventListener("DOMContentLoaded", () => {
  fetchData({
    route:
      "/games?key=db76511d21a143668bd090896650561f&dates=2019-09-01,2019-09-30&platforms=18,1,7",
  })
    .then((data) => data.results)
    .then((games) => {
      if (games && games.length > 0) {
        createCarrousel(games);
      } else {
        console.log("Aucun carrousel");
      }
    });
});

function createCarrousel(games) {
  const carrousel = document.querySelector(".carrousel");
  // créer un slide par objet
  games.forEach((game) => {
    const slide = document.createElement("div");
    slide.className = "carrousel-slide";
    const imgGame = document.createElement("img");
    imgGame.src = game.background_image; // imgGame.setAttribute("src", game.background_image)
    imgGame.alt = game.name;
    slide.appendChild(imgGame);
  });
}
