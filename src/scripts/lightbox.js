document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Cerrar imagen">&times;</button>
        <div class="lightbox-content-wrapper">
            <img src="" alt="" class="lightbox-image">
            <p class="lightbox-caption"></p>
        </div>
    `;
  document.body.appendChild(lightbox);

  const lbImage = lightbox.querySelector(".lightbox-image");
  const lbCaption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const openLightbox = (src, alt) => {
    lbImage.src = src;
    lbImage.alt = alt;
    lbCaption.textContent = alt || "";
    lightbox.classList.add("active");
    closeBtn.focus();
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  const images = document.querySelectorAll(".destino-img, .hero-image");

  images.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", (e) => {
      const source = img.currentSrc || img.src;
      openLightbox(source, img.alt);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (
      e.target === lightbox ||
      e.target.classList.contains("lightbox-content-wrapper")
    ) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
});
