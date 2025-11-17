document.addEventListener("DOMContentLoaded", function () {
  // pathname: /sobre.html, /programas.html, /contactos.html, etc.
  const currentPath = window.location.pathname;

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");

    // Garante que funciona mesmo que o site esteja dentro de uma pasta
    if (currentPath.endsWith(href)) {
      link.classList.add("active-nav");
    }
  });
});
