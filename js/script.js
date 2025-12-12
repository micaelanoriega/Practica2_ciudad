//  EFECTO BLANCO Y NEGRO -> COLOR //
window.addEventListener("load", () => {
  if (document.body.classList.contains("pagina-inicio")) {
    setTimeout(() => {
      document.body.classList.add("color");
    }, 1000);
  }
});

const menuBtn = document.querySelector(".logo");
const menu = document.querySelector(".nav-links-bottom");

if (menuBtn && menu) {
  const toggleMenu = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.toggle("is-open");
    }
  };

  const closeMenu = () => menu.classList.remove("is-open");

  menuBtn.addEventListener("click", toggleMenu);
  menu.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("click", closeMenu);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
}
