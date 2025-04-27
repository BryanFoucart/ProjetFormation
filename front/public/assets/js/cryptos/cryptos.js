import { fetchData } from "../lib/functions.js";

window.addEventListener("DOMContentLoaded", () => {
  let loading = true;
  let tabGames = [];
  fetchData({
    route: "/games",
    options: {
      params: {
        key: "e46bab18047e466aaf70d23b4193671f",
        dates: "2019-09-01,2019-09-30",
        platforms: "18,1,7",
      },
    },
  })
    .then((data) => {
      return data.results;
    })
    .then((data) => {
      loading = !loading;
      tabGames = [...tabGames, data];
      create(loading, tabGames[0]);
    });
});

function create(loading, tabGames) {
  if (!loading) {
    // console.log(tabGames);
    const cryptos = document.querySelector("#cryptos");
    const container = document.createElement("div");
    container.setAttribute("id", "content-games");
    cryptos.appendChild(container);
    tabGames.map((game) => {
      // for (let i = 0; i < tabGames.length; i += 2) {
      // let pair = tabGames.slice(i, i + 2);
      const divArea = document.createElement("div");
      divArea.style.opacity = "0.7";
      divArea.style.transform = "scale(0.7)";
      container.appendChild(divArea);
      const anim = [
        { opacity: "0.7", transform: "scale(0.7)" },
        { opacity: "1", transform: "scale(1)" },
      ];

      const options = {
        duration: 800,
        easing: "ease-in-out",
        fill: "forwards",
      };

      let lastScrollY = window.scrollY;
      const observer = new IntersectionObserver(
        (entries) => {
          // Détection du sens du scroll
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY; //Permet de faire que l'anim se fait uniquement en descendant
          lastScrollY = currentScrollY;
          entries.forEach((entry) => {
            if (entry.isIntersecting && isScrollingDown) {
              entry.target.animate(anim, options);
              // observer.unobserve(entry.target); observer une seule fois
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      // pair.map((game) => {
      const card = document.createElement("div");
      card.setAttribute("class", "game-card");
      const imgGame = document.createElement("img");
      imgGame.setAttribute("src", game.background_image);
      imgGame.setAttribute("alt", `Image du jeu ${game.name}`);
      const avatarGame = document.createElement("img");
      avatarGame.setAttribute("src", game.short_screenshots[1].image);
      avatarGame.setAttribute("alt", `Image du jeu ${game.name}`);
      const headerCard = document.createElement("div");
      const nameGame = document.createElement("h3");
      nameGame.textContent = `${
        game.name.length >= 10 ? game.name.substring(0, 10) + "..." : game.name
      }`;
      const dateGame = document.createElement("span");
      dateGame.textContent = `${game.released}`;
      headerCard.append(nameGame, dateGame);
      card.append(headerCard, imgGame, avatarGame);
      divArea.append(card);
      observer.observe(divArea);
      // });
      // console.log(pair);
    });
  } else {
    console.log("loading ...");
  }
}
