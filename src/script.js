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
      "Aunque la película transcurre en una 'ciudad genérica', la mayoría de exteriores se rodaron en Sídney. La elección de la ciudad australiana permitió aprovechar su arquitectura moderna y calles menos reconocibles internacionalmente, ayudando a crear la ilusión de un espacio urbano 'universal'. Muchos interiores se filmaron en naves adaptadas, y varias escenas icónicas (como persecuciones y tiroteos) aprovecharon callejones del CBD. Tras el estreno, algunos puntos se convirtieron en pequeñas paradas turísticas para fans que buscan replicar encuadres de la película.",
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
      "Nueva Zelanda fue el escenario de la 'Tierra Media'. La granja cerca de Matamata se transformó permanentemente en Hobbiton. El set original se desmontó tras la trilogía, pero se reconstruyó con materiales duraderos para las precuelas y hoy funciona como atracción oficial. Cada madriguera se diseñó con distintos tamaños para forzar perspectivas y reforzar la diferencia de escala entre hobbits y humanos. El turismo cinematográfico en la región impulsó la economía local con tours diarios y eventos temáticos.",
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
      "Islandia sirvió como escenario para dos planetas alienígenas. El glaciar Svínafellsjökull fue el 'planeta de hielo' de Mann. El equipo eligió localizaciones con contrastes extremos de luz y superficies irregulares para transmitir hostilidad y aislamiento. Las condiciones climáticas exigieron ventanas de rodaje muy controladas y adaptación del equipo técnico para operar en temperaturas bajas y sobre hielo inestable. La textura real del glaciar redujo la necesidad de efectos digitales extensos en muchas tomas.",
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
      "Dubrovnik fue la localización principal para 'Desembarco del Rey' (King's Landing), la capital de los Siete Reinos. Las murallas medievales, callejones de piedra y fortalezas costeras ofrecieron una base auténtica sobre la que añadir mínimos retoques digitales. La producción combinó tomas prácticas con matte paintings para ampliar el horizonte y los puertos. El éxito de la serie multiplicó el número de visitas estacionales y obligó a regular ciertos accesos para proteger el patrimonio histórico local.",
  },
];

const resolveImportUrl = (img) => {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object") {
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
      )
        return val;
    }
    try {
      const s = img.toString();
      if (s && typeof s === "string" && s !== "[object Object]") return s;
    } catch (_) {}
  }
  return "";
};

const fetchMockData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockViajesPelis });
    }, 500);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("peliculas-nav");
  const contentContainer = document.getElementById("destino-display");
  const statusMessage = document.getElementById("status-message");

  let peliculasData = [];

  const renderDestino = (pelicula) => {
    if (!pelicula) return;

    const img1 = resolveImportUrl(pelicula.imagenPrincipal);
    const img2 = resolveImportUrl(pelicula.galeriaImagenes[0] || img1);
    const img3 = resolveImportUrl(pelicula.galeriaImagenes[1] || img2);

    contentContainer.innerHTML = `
      <div class="destino-gallery-left">
          <img src="${img1}" alt="${pelicula.destino} - Imagen Principal" class="destino-img">
          <img src="${img2}" alt="${pelicula.destino} - Detalle 1" class="destino-img">
      </div>

      <div class="destino-content-right">
          <div class="destino-texto">
              <h2>${pelicula.destino}</h2>
              <span class="pais">${pelicula.pais} (${pelicula.anoRodaje})</span>
              <p>${pelicula.textoExplicativo}</p>
              <p><strong>Ubicación:</strong> ${pelicula.ubicacionExacta}</p>
          </div>
          <img src="${img3}" alt="${pelicula.destino} - Detalle 2" class="destino-img">
      </div>
    `;
    contentContainer.classList.add("loaded");
  };

  const handleNavClick = (e, pelicula) => {
    e.preventDefault();

    renderDestino(pelicula);

    navContainer
      .querySelectorAll("a")
      .forEach((a) => a.classList.remove("active"));
    e.currentTarget.classList.add("active");
  };

  const fetchViajesPelis = async () => {
    try {
      const response = await fetchMockData();
      peliculasData = response.data;

      navContainer.innerHTML = "";
      statusMessage.style.display = "none";

      if (peliculasData.length === 0) {
        statusMessage.textContent = "No se encontraron destinos.";
        statusMessage.style.display = "block";
        return;
      }

      peliculasData.forEach((pelicula, index) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = pelicula.pelicula;
        link.dataset.id = pelicula.id;

        link.addEventListener("click", (e) => handleNavClick(e, pelicula));

        navContainer.appendChild(link);
      });

      if (peliculasData.length > 0) {
        renderDestino(peliculasData[0]);
        navContainer.querySelector("a").classList.add("active");
      }
    } catch (error) {
      console.error("Error al obtener los viajes (mock):", error);
      statusMessage.textContent = "Error al cargar los datos (mock).";
      statusMessage.style.color = "red";
    }
  };

  fetchViajesPelis();
});
