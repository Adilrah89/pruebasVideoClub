document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-pelicula");
  const statusMessage = document.getElementById("status-message");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const peliculaInput = document.getElementById("pelicula");
      const peliculaNombre = peliculaInput.value || "la película";

      statusMessage.textContent = "Simulando la subida... por favor espere.";
      statusMessage.className = "";
      statusMessage.style.display = "block";

      setTimeout(() => {
        statusMessage.textContent = `¡Destino para '${peliculaNombre}' subido con éxito! (Simulación)`;
        statusMessage.className = "success";

        form.reset();
      }, 1500);
    });
  }
});