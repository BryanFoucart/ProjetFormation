function scrollToTop() {
  const scrollToTopButton = document.querySelector("#scroll-to-top");
  const heroHeader = document.querySelector("#hero-header");
  // console.log(heroHeader.offsetHeight);

  window.addEventListener("scroll", () => {
    // console.log(scrollY);
    const height = heroHeader ? heroHeader.offsetHeight : 200;
    if (scrollY >= height) {
      scrollToTopButton.style.display = "block";
    } else if (scrollY === 0) {
      scrollToTopButton.style.display = "none";
    }
    scrollToTopButton.addEventListener("click", () => window.scrollTo(0, 0));
  });
}
window.addEventListener("DOMContentLoaded", scrollToTop);

const main = document.querySelector("main");
const scrollPosition = document.querySelector("#scroll-to-top");
const root = document.documentElement;

function posScroll() {
  const posScroll = (root.clientWidth - main.clientWidth) / 2 + 16;
  scrollPosition.style.right = `${posScroll}px`;
}
window.addEventListener("DOMContentLoaded", () => {
  // console.log(main.clientWidth);
  window.addEventListener("resize", posScroll);
});
posScroll();
