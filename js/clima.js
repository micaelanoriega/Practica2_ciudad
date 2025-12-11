function cargarGraficoClima() {
  let canvas = document.getElementById("climaBarras");
  if (!canvas) return;

  let datos = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Temperatura media (°C)",
        data: [12, 12, 13, 13, 12, 11, 11, 12, 13, 13, 13, 12],
        borderColor: "#D81E5B",
        backgroundColor: "rgba(216, 30, 91, 0.32)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  let config = {
    type: "line",
    data: datos,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#374151",
          },
        },
        y: {
          min: 0,
          max: 20,
          grid: {
            color: "rgba(0,0,0,0.06)",
          },
          ticks: {
            color: "#374151",
          },
          title: {
            display: true,
            text: "Temperatura (°C)",
          },
        },
      },
    },
  };

  new Chart(canvas, config);
}

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
