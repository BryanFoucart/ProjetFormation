// Sélectionner les éléments nécessaires
const galleryItems = document.querySelectorAll(".galerie-item img");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const closeBtn = document.querySelector(".close");

// Fonction pour fermer la lightbox
const closeLightBox = () => {
  lightbox.style.display = "none";
};

// Fonction pour ajouter ou retirer le zoom
const toggleZoom = () => {
  // Vérifier si l'image est déjà zoomée
  if (lightboxImg.classList.contains("zoomed")) {
    lightboxImg.classList.remove("zoomed"); // Retirer le zoom
    lightboxImg.style.transform = "none"; // Réinitialiser la position
  } else {
    lightboxImg.classList.add("zoomed"); // Appliquer le zoom
  }
};

// Ouvre la lightbox avec l'image cliquée
galleryItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const imageSrc = event.target.src; // Récupère l'URL de l'image cliquée
    const imageAlt = event.target.alt; // Récupère la description de l'image

    lightboxImg.src = imageSrc; // Affiche l'image dans la lightbox
    lightboxImg.alt = imageAlt; // Affiche la description dans la lightbox

    lightbox.style.display = "flex"; // Affiche la lightbox
  });
});

// Ferme la lightbox lorsqu'on clique sur la croix
closeBtn.addEventListener("click", () => {
  closeLightBox(); // Cache la lightbox
});

// Ferme la lightbox lorsqu'on clique en dehors de l'image
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightBox(); // Cache la lightbox
  }
});

// Ferme la lightbox lorsqu'on appuie sur la touche Échap
window.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" ||
    event.code === "Escape" ||
    event.keyCode === 27
  ) {
    closeLightBox(); // Cache la lightbox;
  }
});

// Ajoute le zoom lors du clic sur l'image dans la lightbox
lightboxImg.addEventListener("click", toggleZoom);

// Variables pour le pan (déplacement de l'image)
let isDragging = false;
let startX, startY, initialX, initialY;

// Gère l'événement de démarrage du drag (clic et maintien)
lightboxImg.addEventListener("mousedown", (event) => {
  if (lightboxImg.classList.contains("zoomed")) {
    isDragging = true;
    startX = event.clientX - initialX;
    startY = event.clientY - initialY;
    lightbox.style.cursor = "grabbing"; // Change le curseur pour indiquer qu'on déplace
  }
});

// Gère le déplacement de l'image pendant le drag
lightboxImg.addEventListener("mousemove", (event) => {
  if (isDragging) {
    initialX = event.clientX - startX;
    initialY = event.clientY - startY;
    lightboxImg.style.transform = `translate(${initialX}px, ${initialY}px)`; // Déplace l'image
  }
});

// Arrête le drag lorsque la souris est relâchée
lightboxImg.addEventListener("mouseup", () => {
  isDragging = false;
  lightbox.style.cursor = "zoom-in"; // Revenir au curseur par défaut
});

// Si la souris quitte la zone de l'image, le drag est annulé
lightboxImg.addEventListener("mouseleave", () => {
  isDragging = false;
  lightbox.style.cursor = "zoom-in";
});
