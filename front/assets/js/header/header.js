const toggleNavMobile = () => {
  let navMobile = document.querySelector("nav > #nav");
  let iconMenu = document.querySelector("nav > #toggle-nav");
  navMobile.classList.toggle("mobile");
  iconMenu.setAttribute(
    "class",
    navMobile.classList.contains("mobile") ? "fas fa-x" : "fas fa-bars"
  );
};

const closeMenu = () => {
  let navMobile = document.querySelector("nav > #nav");
  let iconMenu = document.querySelector("nav > #toggle-nav");
  navMobile.classList.remove("mobile");
  iconMenu.setAttribute(
    "class",
    navMobile.classList.contains("mobile") ? "fas fa-x" : "fas fa-bars"
  );
};

function initMobileMenu() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    let toggleNav = document.querySelector("#toggle-nav");
    toggleNav.style.cursor = "cell";
    toggleNav.addEventListener("click", toggleNavMobile);
    let closeNavMain = document.querySelector("main");
    closeNavMain.addEventListener("click", closeMenu);
    let closeNavLinks = document.querySelectorAll("nav > #nav > ul > li > a");
    closeNavLinks.forEach((closeNavLink) => {
      closeNavLink.addEventListener("click", closeMenu);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  window.addEventListener("resize", initMobileMenu);
  window.addEventListener("scroll", closeMenu);
  window.addEventListener("resize", closeMenu);
});
