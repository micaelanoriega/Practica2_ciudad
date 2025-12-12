$(function () {
  if (!$(".tour-card").length) return;

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

$(function () {
  if (!$(".lugares-grid").length) return;

  const $cards = $(".lugar-card");
  const $search = $("#search");
  const $category = $("#category");

  function applyFilters() {
    const text = ($search.val() || "").toLowerCase();
    const category = $category.val();

    $cards.each(function () {
      const $card = $(this);
      const title = String($card.data("title") || "").toLowerCase();
      const cat = $card.data("category");

      const matchText = !text || title.includes(text);
      const matchCategory = category === "all" || category === cat;

      $card.toggle(matchText && matchCategory);
    });
  }
  // Cerrar tours al hacer click fuera
  $(document).on("click", function (e) {
    // Si el click NO ocurre dentro de un tour-card...
    if (!$(e.target).closest(".tour-card").length) {
      $(".tour-card").removeClass("is-open");
      $(".tour-body").slideUp(200);
    }
  });
  // Eventos
  $search.on("input", applyFilters);
  $category.on("change", applyFilters);

  applyFilters();
});
