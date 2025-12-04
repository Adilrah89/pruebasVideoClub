document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "theme-toggle";
  toggleBtn.className = "theme-toggle-btn";
  toggleBtn.setAttribute("aria-label", "Cambiar a modo oscuro");

  toggleBtn.innerHTML = `
        <svg class="theme-icon moon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
        <svg class="theme-icon sun" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" style="display:none;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
    `;

  const nav = document.querySelector(".peliculas-nav");
  if (nav) {
    nav.appendChild(toggleBtn);
  } else {
    document.body.appendChild(toggleBtn);
  }

  const body = document.body;
  const moonIcon = toggleBtn.querySelector(".moon");
  const sunIcon = toggleBtn.querySelector(".sun");

  const updateIcons = (isDark) => {
    if (isDark) {
      moonIcon.style.display = "none";
      sunIcon.style.display = "block";
      toggleBtn.setAttribute("aria-label", "Cambiar a modo claro");
    } else {
      moonIcon.style.display = "block";
      sunIcon.style.display = "none";
      toggleBtn.setAttribute("aria-label", "Cambiar a modo oscuro");
    }
  };

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    body.classList.add("dark-mode");
    updateIcons(true);
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateIcons(isDark);

    toggleBtn.style.transform = "scale(0.9) rotate(15deg)";
    setTimeout(() => (toggleBtn.style.transform = ""), 200);
  });
});
