// EFECTO BLANCO Y NEGRO -> COLOR
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.add("color");
  }, 1000);
});
const header = document.querySelector(".site-header");
const sticky = header.offsetTop; // posición original del header en la página

window.addEventListener("scroll", () => {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});
