$(function () {
  const $slides = $(".plato-slide");
  const $dots = $(".platos-dot");
  const total = $slides.length;
  let current = 0;
  let autoInterval = null;

  function goToSlide(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;

    $slides.removeClass("is-active");
    $slides.eq(current).addClass("is-active");

    $dots.removeClass("is-active");
    $dots.eq(current).addClass("is-active");
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function prevSlide() {
    goToSlide(current - 1);
  }

  // Flechas
  $(".plato-next").on("click", function () {
    nextSlide();
  });

  $(".plato-prev").on("click", function () {
    prevSlide();
  });

  // Dots
  $dots.on("click", function () {
    const index = $(this).data("index");
    goToSlide(index);
  });

  // Auto-play
  function startAuto() {
    if (autoInterval) return;
    autoInterval = setInterval(nextSlide, 2500);
  }

  function stopAuto() {
    clearInterval(autoInterval);
    autoInterval = null;
  }

  startAuto();

  // Pausar al pasar el mouse
  $(".gastro-platos").on("mouseenter", stopAuto).on("mouseleave", startAuto);
});
