const API_URL = "https://mindicador.cl/api";
let indicadores = {};
let chartInstance = null;

const montoInput = document.getElementById("monto-clp");
const tipoMonedaSelect = document.getElementById("tipo-moneda");
const btnConvertir = document.getElementById("btn-convertir");
const resultadoParrafo = document.getElementById("resultado");

// Función para obtener los datos de la API
async function obtenerDatos() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    indicadores = data;

    // Llenar el select con las monedas disponibles
    const monedasDisponibles = {
      dolar: "Dólar",
      euro: "Euro",
      bitcoin: "Bitcoin",
      tpm: "TPM",
    };

    Object.entries(monedasDisponibles).forEach(([codigo, nombre]) => {
      if (indicadores[codigo]) {
        const option = document.createElement("option");
        option.value = codigo;
        option.textContent = nombre;
        tipoMonedaSelect.appendChild(option);
      }
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
    alert("Error al cargar los datos. Por favor, intente más tarde.");
  }
}

// Función para convertir el monto
function convertirMonto() {
  const monto = parseFloat(montoInput.value);
  const monedaSeleccionada = tipoMonedaSelect.value;

  if (!monto || monto <= 0) {
    montoInput.classList.add("is-invalid");
    return;
  }

  montoInput.classList.remove("is-invalid");
  const valorMoneda = indicadores[monedaSeleccionada].valor;
  let resultado;

  if (monedaSeleccionada === "bitcoin") {
    const valorDolar = indicadores.dolar.valor;
    resultado = monto / valorDolar / valorMoneda;
    resultadoParrafo.textContent = `$${monto.toLocaleString(
      "es-CL"
    )} CLP = ${resultado.toFixed(8)} BTC`;
  } else {
    resultado = monto / valorMoneda;
    resultadoParrafo.textContent = `$${monto.toLocaleString(
      "es-CL"
    )} CLP = ${resultado.toFixed(2)} ${monedaSeleccionada.toUpperCase()}`;
  }

  obtenerHistorico(monedaSeleccionada);
}

// Función para obtener datos históricos
async function obtenerHistorico(moneda) {
  try {
    const response = await fetch(`https://mindicador.cl/api/${moneda}`);
    const data = await response.json();
    const ultimos10Dias = data.serie.slice(0, 10);
    drawChart(ultimos10Dias);
  } catch (error) {
    console.error("Error al obtener datos históricos:", error);
    alert("Error al cargar el gráfico. Por favor, intente más tarde.");
  }
}

// Función para dibujar el gráfico (usando tu estructura)
function drawChart(data) {
  const contentChart = document.querySelector(".content-chart");
  if (contentChart) {
    contentChart.style.display = "block";
  }

  let canvas = document.getElementById("graficaMoneda");
  if (!canvas) {
    console.error("Canvas no encontrado");
    return;
  }
  let ctx = canvas.getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  let labels = data.map((d) => new Date(d.fecha).toLocaleDateString());
  let values = data.map((d) => d.valor);

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels.reverse(),
      datasets: [
        {
          label: "Historial últimos 10 días",
          data: values.reverse(),
          borderColor: "#008f7a",
          fill: true,
          backgroundColor: "rgba(0, 143, 122, 0.1)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", obtenerDatos);
btnConvertir.addEventListener("click", convertirMonto);
montoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    convertirMonto();
  }
});

// Validación de input
montoInput.addEventListener("input", () => {
  if (montoInput.value < 0) {
    montoInput.value = 0;
  }
});
