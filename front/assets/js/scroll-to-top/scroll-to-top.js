function scrollToTop() {
  const scrollToTopButton = document.querySelector("#scroll-to-top");
  const heroHeader = document.querySelector("#hero-header");
  console.log(heroHeader.offsetHeight);

  window.addEventListener("scroll", () => {
    console.log(scrollY);

    if (scrollY > heroHeader.offsetHeight) {
      scrollToTopButton.style.display = "block";
    } else if (scrollY === 0) {
      scrollToTopButton.style.display = "none";
    }
    scrollToTopButton.addEventListener("click", () => window.scrollTo(0, 0));
  });
}
window.addEventListener("DOMContentLoaded", scrollToTop);
