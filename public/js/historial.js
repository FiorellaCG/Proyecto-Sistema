import { getComputadoras } from "../services/services.js";

const tablaPermisos = document.getElementById("tablaPermisos");
const inputBusqueda = document.getElementById("busqueda");
let datosComputadorasRecibidas = [];

//  Cargar datos
async function datosComputadoras() {
  try {
    datosComputadorasRecibidas = await getComputadoras("computadoras");
    mostrarTabla(datosComputadorasRecibidas);
    console.log(datosComputadorasRecibidas);
  } catch (error) {
    console.error("Error al cargar computadoras:", error);
  }
}
//  Mostrar datos en la tabla
function mostrarTabla(lista) {
  tablaPermisos.innerHTML = ""; 
  lista.forEach(compu => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${compu.nombre}</td>
      <td>${compu.fechaSalida}</td>
      <td>${compu.fechaRegreso}</td>
      <td>${compu.codigoComputadora}</td>
      <td>
        <span class="badge ${compu.estado === "Activo" ? "bg-success" : "bg-danger"}">
          ${compu.estado}
        </span>
      </td>
    `;
    tablaPermisos.appendChild(fila);
  });
}
// Filtro de búsqueda
inputBusqueda.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();

  const filtrados = datosComputadorasRecibidas.filter(compu =>
    (compu.nombre?.toLowerCase().includes(texto)) ||
    (compu.codigoComputadora?.toLowerCase().includes(texto)) ||
    (compu.fechaSalida?.toLowerCase().includes(texto)) ||
    (compu.fechaRegreso?.toLowerCase().includes(texto)) ||
    (compu.estado?.toLowerCase().includes(texto))
  );

  mostrarTabla(filtrados);
});

//: Inicializar
datosComputadoras();