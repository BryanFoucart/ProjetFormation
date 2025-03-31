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
  // créer une slide par objet
  games.forEach((game) => {
    const slide = document.createElement("div");
    slide.className = "carrousel-slide";
    const imgGame = document.createElement("img");
    imgGame.src = game.background_image; // imgGame.setAttribute("src", game.background_image)
    imgGame.alt = game.name;
    imgGame.addEventListener("click", () => openLightBox(imgGame.src, game));
    slide.appendChild(imgGame);
    carrousel.appendChild(slide);
    const caption = document.createElement("div");
    caption.className = "carrousel-caption";
    caption.textContent = game.name;
    slide.appendChild(caption);
    carrousel.appendChild(slide);
  });

  let currentIndex = 0;
  const totalSlides = games.length;

  function showSlide(index) {
    carrousel.style.transform = `translateX(-${index * 100}%)`;
    carrousel.style.transition = `transform 0.5s ease-in-out`;
  }

  const prevButton = document.querySelector(".prev");

  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    showSlide(currentIndex);
  });

  const nextButton = document.querySelector(".next");
  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  });

  // window.addEventListener("keydow", (e) => prevOrNext(e));
  // function prevOrNext(e) {
  //   if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || e.keyCode === 37) {
  //     prevButton.click();
  //   } else if (
  //     e.key === "ArrowRight" ||
  //     e.code === "ArrowRight" ||
  //     e.keyCode === 39
  //   ) {
  //     nextButton.click();
  //   }
  // }

  function calcSlide() {
    currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  }

  let inter;
  setTimeout(() => {
    inter = setInterval(calcSlide, 3000);
    carrousel.addEventListener("mouseenter", () => clearInterval(inter));
    carrousel.addEventListener("mouseleave", () => {
      clearInterval(inter);
      inter = setInterval(calcSlide, 3000);
    });
  }, 2000);

  function openLightBox(src, alt) {
    const lightbox = document.querySelector("#lightbox");
    const lightboxImg = document.querySelector("#lightbox-img");
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    lightboxImg.alt = alt;
  }

  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", () => {
    const lightbox = document.querySelector("#lightbox");
    lightbox.style.display = "none";
  });

  const lightbox = document.querySelector("#lightbox");
  lightbox.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      lightbox.style.display = "none";
    }
  });

  // window.addEventListener("keydown", logkey);
  // function logkey(e) {
  //   if (e.key === "Escape" || e.keyCode === 27) lightbox.style.display = "none";
  // }

  window.addEventListener("keydown", (e) => prevOrNext(e));
  function prevOrNext(e) {
    if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || e.keycode === 37) {
      prevButton.click();
    } else if (
      e.key === "ArrowRight" ||
      e.code === "ArrowRight" ||
      e.keyCode === 39
    ) {
      nextButton.click();
    } else if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
      lightbox.style.display = "none";
    }
  }
}
