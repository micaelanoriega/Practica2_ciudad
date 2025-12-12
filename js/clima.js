let climaChart = null;

function cargarGraficoClima() {
  const canvas = document.getElementById("climaBarras");
  if (!canvas) return;

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

  const datos = {
    labels: meses,
    datasets: [
      {
        type: "line",
        label: "Temperatura media (°C)",
        data: tempMedia,
        tension: 0.4,
        borderWidth: 3,
        borderColor: "#ff2e78",
        pointRadius: 0,
        fill: { target: "origin", above: "rgba(255, 206, 86, 0.25)" },
        yAxisID: "y",
      },
      {
        type: "bar",
        label: "Precipitación (mm)",
        data: lluvia,
        backgroundColor: "rgba(0, 0, 0, 0.18)",
        borderRadius: 4,
        maxBarThickness: 18,
        yAxisID: "y1",
      },
    ],
  };

  const config = {
    data: datos,
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
            color: "rgba(255,255,255,0.7)",
            font: { size: 11 },
            padding: 10,
          },
          grid: { display: false },
        },
        y: {
          ticks: {
            color: "rgba(255,255,255,0.7)",
            font: { size: 10 },
            padding: 10,
          },
          grid: { color: "rgba(0,0,0,0.35)" },
        },
        y1: {
          ticks: {
            color: "rgba(255,255,255,0.5)",
            font: { size: 10 },
            padding: 10,
          },
          grid: { display: false },
        },
      },
    },
  };

  climaChart = new Chart(canvas, {
    type: "bar",
    ...config,
  });
}

$(function () {
  cargarGraficoClima();

  $(window).on("resize", function () {
    if (climaChart) climaChart.resize();
  });

  const $logo = $(".site-header .logo").first();
  const $menu = $(".nav-links-bottom");

  $logo.on("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation();
      $menu.toggleClass("is-open");
    }
  });

  // Click fuera pa cerrar
  $(document).on("click", function (e) {
    if (window.innerWidth > 768) return;
    if (!$menu.hasClass("is-open")) return;

    const clickedInsideMenu =
      $(e.target).closest(".nav-links-bottom").length > 0;
    const clickedLogo = $(e.target).closest(".site-header .logo").length > 0;

    if (!clickedInsideMenu && !clickedLogo) {
      $menu.removeClass("is-open");
    }
  });

  // Click dentro del menú no lo cierra
  $menu.on("click", function (e) {
    e.stopPropagation();
  });

  $(window).on("resize", function () {
    if (window.innerWidth > 768) $menu.removeClass("is-open");
  });
});
