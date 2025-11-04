document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("table-body");
  const statusMessage = document.getElementById("status-message");

  const mockPeliculas = [
    {
      id_pelicula: 1,
      titulo: "The Matrix",
      ano_estreno: 1999,
      duracion_min: 136,
      clasificacion: "R    ",
    },
    {
      id_pelicula: 2,
      titulo: "Toy Story",
      ano_estreno: 1995,
      duracion_min: 81,
      clasificacion: "G    ",
    },
    {
      id_pelicula: 3,
      titulo: "Interstellar",
      ano_estreno: 2014,
      duracion_min: 169,
      clasificacion: "PG-13",
    },
    {
      id_pelicula: 4,
      titulo: "Parasite",
      ano_estreno: 2019,
      duracion_min: 132,
      clasificacion: "R    ",
    },
    {
      id_pelicula: 5,
      titulo: "Spirited Away",
      ano_estreno: 2001,
      duracion_min: 125,
      clasificacion: "PG   ",
    },
  ];

  const fetchMockData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockPeliculas });
      }, 500);
    });
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetchMockData();
      const peliculas = response.data;

      tableBody.innerHTML = "";
      statusMessage.style.display = "none";

      if (peliculas.length === 0) {
        statusMessage.textContent = "No se encontraron películas.";
        statusMessage.style.display = "block";
        return;
      }

      peliculas.forEach((pelicula) => {
        const row = document.createElement("tr");

        const videoLink = pelicula.enlaceVideo
          ? `<a href="${pelicula.enlaceVideo}" target="_blank" rel="noopener noreferrer">Ver Vídeo</a>`
          : "No disponible";

        row.innerHTML = `
                    <td>${pelicula?.id_pelicula}</td>
                    <td>${pelicula.titulo}</td>
                    <td>${pelicula.ano_estreno}</td>
                    <td>${pelicula.duracion_min}</td>
                    <td>${pelicula.clasificacion.trim()}</td>
                `;

        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error al obtener las películas (mock):", error);
      statusMessage.textContent = "Error al cargar los datos (mock).";
      statusMessage.style.color = "red";
    }
  };

  fetchPeliculas();
});
