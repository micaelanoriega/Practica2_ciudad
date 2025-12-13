let climaChart = null;

function cargarGraficoClima() {
  const canvas = document.getElementById("climaBarras");
  if (!canvas) return;

  // 🔒 Si Chart.js no está cargado, no rompas toda la página
  if (typeof Chart === "undefined") {
    console.error("Chart.js no está cargado. Revisa el orden de scripts.");
    return;
  }

  // Si ya existía, destruir
  if (climaChart) {
    climaChart.destroy();
    climaChart = null;
  }

  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const tempMedia = [11, 12, 13, 13, 12, 11, 10, 11, 12, 13, 14, 12];
  const lluvia = [150, 140, 130, 60, 20, 5, 5, 10, 40, 80, 130, 160];

  climaChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: meses,
      datasets: [
        {
          type: "line",
          label: "Temperatura media (°C)",
          data: tempMedia,
          tension: 0.4,
          borderWidth: 3,
          borderColor: "rgba(145, 35, 23, 0.94)",
          pointRadius: 0,
          fill: { target: "origin", above: "rgba(162, 148, 112, 0.35)" },
          yAxisID: "y",
        },
        {
          type: "bar",
          label: "Precipitación (mm)",
          data: lluvia,
          backgroundColor: "rgba(243, 144, 144, 0.59)",
          borderRadius: 4,
          maxBarThickness: 18,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      layout: {
        padding: { top: 12, right: 18, bottom: 12, left: 18 },
      },

      plugins: {
        legend: {
          labels: {
            color: "#fefcf8",
            font: { size: 11 },
            padding: 18,
          },
        },
      },

      scales: {
        x: {
          offset: true,
          ticks: {
            color: "rgba(123, 91, 16, 0.46)",
            font: { size: 11 },
            padding: 10,
          },
          grid: { display: false },
        },
        y: {
          ticks: {
            color: "rgba(145, 35, 23, 0.94)",
            font: { size: 10 },
            padding: 10,
          },
          grid: { color: "rgba(111, 62, 62, 0.35)" },
        },
        y1: {
          position: "right",
          ticks: {
            color: "rgba(243, 144, 144, 0.59)",
            font: { size: 10 },
            padding: 10,
          },
          grid: { display: false },
        },
      },
    },
  });
}

function initMenuMovil() {
  const $logo = $(".site-header .logo").first();
  const $menu = $(".nav-links-bottom");

  $logo.on("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation();
      $menu.toggleClass("is-open");
    }
  });

  $(window).on("resize", function () {
    if (window.innerWidth > 768) $menu.removeClass("is-open");
  });
}
const TOTAL_ITEMS = $(".maleta-item").length;
const $modal = $("#viajeModal");

function initMaletaDragDrop() {
  if (
    typeof $.fn.draggable === "undefined" ||
    typeof $.fn.droppable === "undefined"
  ) {
    console.error(
      "jQuery UI no está cargado (draggable/droppable). Revisa scripts."
    );
    return;
  }

  const $items = $(".maleta-item");
  const $drop = $("#maletaDrop");
  const $packed = $(".maleta-packed");

  if (!$items.length || !$drop.length || !$packed.length) return;

  $items.draggable({
    helper: "clone",
    revert: "invalid",
    containment: "document",
    start: function () {
      if ($(this).hasClass("is-packed")) return false;
    },
  });

  $drop.droppable({
    accept: ".maleta-item:not(.is-packed)",
    tolerance: "pointer",
    over: function () {
      $drop.addClass("is-active");
    },
    out: function () {
      $drop.removeClass("is-active");
    },
    drop: function (event, ui) {
      $drop.removeClass("is-active");

      const $original = ui.draggable;
      const key = $original.data("item");
      const label = $original.find("span").text().trim();

      if (!key) return;
      if ($packed.find(`[data-packed="${key}"]`).length) return;

      $packed.append(
        `<span class="maleta-chip" data-packed="${key}">✅ ${label}</span>`
      );
      const packedCount = $packed.find(".maleta-chip").length;

      if (packedCount === TOTAL_ITEMS) {
        $modal.addClass("is-visible");
      }
      $(".viaje-ok").on("click", function () {
        $modal.removeClass("is-visible");
      });

      $original.addClass("is-packed");
    },
  });

  $(".maleta-reset").on("click", function () {
    $packed.empty();
    $items.removeClass("is-packed");
  });
}

$(function () {
  cargarGraficoClima();

  initMenuMovil();

  initMaletaDragDrop();

  $(window).on("resize", function () {
    if (climaChart) climaChart.resize();
  });
});
