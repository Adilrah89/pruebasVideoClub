import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";

// Resuelve rutas de imágenes de forma compatible con Parcel v2 y otros bundlers
const matrixSydney = new URL("./imagenes/matrix-sydney.jpg", import.meta.url)
  .href;
const matrixFuente = new URL("./imagenes/matrix-fuente.jpg", import.meta.url)
  .href;
const matrixCalle = new URL("./imagenes/matrix-calle.jpg", import.meta.url)
  .href;
const hobbitonNZ = new URL(
  "./imagenes/hobbiton-nueva-zelanda.jpg",
  import.meta.url
).href;
const hobbitonDetalle1 = new URL(
  "./imagenes/hobbiton-detalle1.jpg",
  import.meta.url
).href;
const hobbitonDetalle2 = new URL(
  "./imagenes/hobbiton-detalle2.jpg",
  import.meta.url
).href;
const interstellarIslandia = new URL(
  "./imagenes/interstellar-islandia.jpg",
  import.meta.url
).href;
const interstellarGlaciar1 = new URL(
  "./imagenes/interstellar-glaciar1jpg.jpg",
  import.meta.url
).href;
const interstellarGlaciar2 = new URL(
  "./imagenes/interstellar-glaciar2.jpg",
  import.meta.url
).href;
const gotDubrovnik = new URL("./imagenes/got-dubrovnik.jpg", import.meta.url)
  .href;
const gotMurallas = new URL("./imagenes/got-murallas.jpg", import.meta.url)
  .href;
const gotFortaleza = new URL("./imagenes/got-fortaleza.jpg", import.meta.url)
  .href;

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("table-body");
  const carouselWrapper = document.querySelector(
    "#viajes-carousel .swiper-wrapper"
  );
  const statusMessage = document.getElementById("status-message");

  const resolveImportUrl = (img) => {
    if (!img) return "";
    if (typeof img === "string") return img;

    if (typeof img === "object") {
      try {
        console.log("DEBUG imagen object keys:", Object.keys(img));
      } catch (e) {
        // ignore
      }

      const candidates = ["default", "src", "url", "href", "path"];
      for (const key of candidates) {
        if (img[key] && typeof img[key] === "string") return img[key];
      }

      for (const val of Object.values(img)) {
        if (
          typeof val === "string" &&
          (val.startsWith("/") ||
            val.startsWith("http") ||
            /\.jpe?g$|\.png$|\.webp$/.test(val))
        ) {
          return val;
        }
      }

      try {
        const s = img.toString();
        if (s && typeof s === "string" && s !== "[object Object]") return s;
      } catch (e) {
        // ignore
      }
    }

    return "";
  };

  const mockViajesPelis = [
    {
      id: 1,
      pelicula: "The Matrix",
      destino: "Sídney",
      pais: "Australia",
      anoRodaje: 1998,
      ubicacionExacta: "Varios edificios del distrito financiero (CBD)",
      imagenPrincipal: matrixSydney,
      galeriaImagenes: [matrixFuente, matrixCalle],
      textoExplicativo:
        "Aunque la película transcurre en una 'ciudad genérica', la mayoría de exteriores se rodaron en Sídney...",
    },
    {
      id: 2,
      pelicula: "El Señor de los Anillos",
      destino: "Matamata",
      pais: "Nueva Zelanda",
      anoRodaje: 1999,
      ubicacionExacta: "Hobbiton Movie Set",
      imagenPrincipal: hobbitonNZ,
      galeriaImagenes: [hobbitonDetalle1, hobbitonDetalle2],
      textoExplicativo:
        "Nueva Zelanda fue el escenario de la 'Tierra Media'. La granja cerca de Matamata se transformó permanentemente en Hobbiton.",
    },
    {
      id: 3,
      pelicula: "Interstellar",
      destino: "Svínafellsjökull",
      pais: "Islandia",
      anoRodaje: 2013,
      ubicacionExacta: "Glaciar Svínafellsjökull (Parque P. Skaftafell)",
      imagenPrincipal: interstellarIslandia,
      galeriaImagenes: [interstellarGlaciar1, interstellarGlaciar2],
      textoExplicativo:
        "Islandia sirvió como escenario para dos planetas alienígenas. El glaciar Svínafellsjökull fue el 'planeta de hielo' de Mann.",
    },
    {
      id: 4,
      pelicula: "Juego de Tronos (Serie)",
      destino: "Dubrovnik",
      pais: "Croacia",
      anoRodaje: 2011,
      ubicacionExacta: "Casco antiguo (Stari Grad)",
      imagenPrincipal: gotDubrovnik,
      galeriaImagenes: [gotMurallas, gotFortaleza],
      textoExplicativo:
        "Dubrovnik fue la localización principal para 'Desembarco del Rey' (King's Landing), la capital de los Siete Reinos.",
    },
  ];

  const fetchMockData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockViajesPelis });
      }, 500);
    });
  };

  const fetchViajesPelis = async () => {
    try {
      const response = await fetchMockData();
      const peliculas = response.data;

      tableBody.innerHTML = "";
      carouselWrapper.innerHTML = "";
      statusMessage.style.display = "none";

      if (peliculas.length === 0) {
        statusMessage.textContent = "No se encontraron destinos.";
        statusMessage.style.display = "block";
        return;
      }

      peliculas.forEach((pelicula) => {
        const row = document.createElement("tr");
        const slug = pelicula.pelicula.toLowerCase().replace(/ /g, "-");

        const resolvedMain = resolveImportUrl(pelicula.imagenPrincipal);
        console.log("DEBUG imagenPrincipal import:", pelicula.imagenPrincipal);
        console.log("DEBUG resolvedMain:", resolvedMain);

        row.innerHTML = `
            <td>${pelicula.pelicula}</td>
            <td>${pelicula.destino}</td>
            <td>${pelicula.pais}</td>
            <td>${pelicula.anoRodaje}</td>
            <td><a href="/detalle/${slug}.html">Ver Más</a></td> 
        `;
        tableBody.appendChild(row);

        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        // Galería central vertical (principal + secundarias)
        const allImages = [
          pelicula.imagenPrincipal,
          ...(pelicula.galeriaImagenes || []),
        ].slice(0, 3);
        const galleryHtml = allImages
          .map((img, idx) => {
            const url = resolveImportUrl(img);
            return `<figure class="gallery-item"><img class="gallery-img" src="${url}" alt="${
              pelicula.pelicula
            } imagen ${idx + 1}"></figure>`;
          })
          .join("");

        slide.innerHTML = `
          <div class="card card-vertical">
            <header class="card-header">
              <h3 class="titulo">${pelicula.pelicula}</h3>
              <span class="destino-chip">${pelicula.destino}</span>
            </header>
            <section class="card-gallery">${galleryHtml}</section>
            <section class="card-texto">
              <p class="descripcion">${pelicula.textoExplicativo}</p>
            </section>
          </div>
        `;
        carouselWrapper.appendChild(slide);
      });

      new Swiper("#viajes-carousel", {
        modules: [Navigation, Pagination],
        loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
      });
    } catch (error) {
      console.error("Error al obtener los viajes (mock):", error);
      statusMessage.textContent = "Error al cargar los datos (mock).";
      statusMessage.style.color = "red";
    }
  };

  fetchViajesPelis();
});
