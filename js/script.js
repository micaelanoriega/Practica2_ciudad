//  EFECTO BLANCO Y NEGRO -> COLOR //
window.addEventListener("load", () => {
  if (document.body.classList.contains("pagina-inicio")) {
    setTimeout(() => {
      document.body.classList.add("color");
    }, 1000); // ajusta el tiempo si quieres
  }
});

//  LOGO COMO BURGER EN MÓVIL //
const logoLink = document.querySelector(".logo");
const bottomNav = document.querySelector(".nav-links-bottom");

if (logoLink && bottomNav) {
  logoLink.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      bottomNav.classList.toggle("is-open");
    }
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    bottomNav.classList.remove("is-open");
  }
});

// ===============================
//  TOURS: desplegar info al click
// ===============================
if (window.jQuery) {
  $(function () {
    // Aseguramos que empiecen cerradas
    $(".tour-body").hide();

    $(".tour-card-header").on("click", function () {
      const $card = $(this).closest(".tour-card");
      const $body = $card.find(".tour-body");

      // 1) Cerrar todas las demás
      $(".tour-card")
        .not($card)
        .removeClass("is-open")
        .find(".tour-body")
        .stop(true, true)
        .slideUp(250);

      // 2) Alternar solo la clicada
      $card.toggleClass("is-open");
      $body.stop(true, true).slideToggle(250);
    });
  });
}

// ===== Filtros en lugares.html =====
if ($(".lugares-grid").length) {
  const $cards = $(".lugar-card");

  function applyFilters() {
    const text = $("#search").val().toLowerCase();
    const category = $("#category").val();

    $cards.each(function () {
      const $card = $(this);
      const title = ($card.data("title") || "").toLowerCase();
      const cat = $card.data("category");

      const matchText = !text || title.includes(text);
      const matchCategory = category === "all" || category === cat;

      $card.toggle(matchText && matchCategory);
    });
  }

  $("#search").on("input", applyFilters);
  $("#category").on("change", applyFilters);
}
