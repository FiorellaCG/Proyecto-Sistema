import { getComputadoras } from "../services/services.js";
// Elementos del DOM
const tablaPermisos = document.getElementById("tablaPermisos");
const inputBusqueda = document.getElementById("busqueda");
// Arreglo para almacenar los datos recibidos
let datosComputadorasRecibidas = [];
// Función para cargar los datos desde el servidor
async function datosComputadoras() {
  try {
    datosComputadorasRecibidas = await getComputadoras("computadoras");
    mostrarTabla(datosComputadorasRecibidas);
    console.log(datosComputadorasRecibidas);
  } catch (error) {
    console.error("Error al cargar computadoras:", error);
  }
}
// Función para mostrar los datos en la tabla
function mostrarTabla(lista) {
  tablaPermisos.innerHTML = ""; // Limpiar la tabla antes de pintar
  lista.forEach(compu => {
    const fila = document.createElement("tr");
    // Construcción de la fila con datos
    fila.innerHTML = `
      <td>${compu.nombre}</td>
      <td>${compu.fechaSalida}</td>
      <td>${compu.fechaRegreso}</td>
      <td>${compu.codigoComputadora}</td>
      <td>
      <span class="badge 
      ${compu.estado === "aprobada" ? "bg-success" :
        compu.estado === "pendiente" ? "bg-warning text-dark" :
        compu.estado === "rechazada" ? "bg-danger" : "bg-secondary"}">
        ${compu.estado}
      </span>
      </td>
      <td>${compu.motivoRechazo || ""}</td>
    `;
    tablaPermisos.appendChild(fila);
  });
}
// Filtro de búsqueda por nombre, código, fechas o estado
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
// Inicializar la carga de datos
datosComputadoras();
