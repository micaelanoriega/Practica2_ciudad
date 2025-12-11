const ctx = document.getElementById("climaBarras").getContext("2d");

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

// Temperatura media aproximada Cusco (ejemplo)
const tempMedia = [11, 12, 13, 13, 12, 11, 10, 11, 12, 13, 14, 12];
// Lluvia aproximada (mm) solo para la parte “relleno”
const lluvia = [150, 140, 130, 60, 20, 5, 5, 10, 40, 80, 130, 160];

new Chart(ctx, {
  type: "line",
  data: {
    labels: meses,
    datasets: [
      {
        label: "Temperatura media (°C)",
        data: tempMedia,
        tension: 0.4,
        borderWidth: 3,
        borderColor: "#ff2e78",
        pointRadius: 0,
        fill: {
          target: "origin",
          above: "rgba(255, 206, 86, 0.25)",
        },
      },
      {
        type: "bar",
        label: "Precipitación (mm)",
        data: lluvia,
        backgroundColor: "rgba(0, 0, 0, 0.18)",
        borderRadius: 4,
        maxBarThickness: 20,
        yAxisID: "y1",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // <- clave para usar la altura del contenedor
    plugins: {
      legend: {
        labels: {
          color: "#fefcf8",
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 10,
        titleFont: { size: 12 },
        bodyFont: { size: 11 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255,255,255,0.7)",
          font: { size: 11 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        position: "left",
        ticks: {
          color: "rgba(255,255,255,0.7)",
          font: { size: 10 },
        },
        grid: {
          color: "rgba(0,0,0,0.35)",
        },
        title: {
          display: true,
          text: "Temperatura (°C)",
          color: "rgba(255,255,255,0.7)",
          font: { size: 11 },
        },
      },
      y1: {
        position: "right",
        ticks: {
          color: "rgba(255,255,255,0.5)",
          font: { size: 10 },
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Precipitación (mm)",
          color: "rgba(255,255,255,0.6)",
          font: { size: 11 },
        },
      },
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  cargarGraficoClima();
});
// ===============================
//  LOGO COMO BURGER EN MÓVIL
//  (abre/cierra .nav-links-bottom)
// ===============================
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
