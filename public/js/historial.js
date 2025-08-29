import { getComputadoras } from "../services/services.js";

const tablaPermisos = document.getElementById("tablaPermisos");
const inputBusqueda = document.getElementById("busqueda");
let datosComputadorasRecibidas = [];

// :diamante_azul_pequeño: Cargar datos
async function datosComputadoras() {
  try {
    datosComputadorasRecibidas = await getComputadoras("computadoras");
    mostrarTabla(datosComputadorasRecibidas);
    console.log(datosComputadorasRecibidas);
  } catch (error) {
    console.error("Error al cargar computadoras:", error);
  }
}
// :diamante_azul_pequeño: Mostrar datos en la tabla
function mostrarTabla(lista) {
  tablaPermisos.innerHTML = ""; // limpiar antes de volver a pintar
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
// :diamante_azul_pequeño: Filtro de búsqueda
inputBusqueda.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = datosComputadorasRecibidas.filter(compu =>
    compu.nombre.toLowerCase().includes(texto) ||
    compu.computadora.toLowerCase().includes(texto) ||
    (compu.motivo ? compu.motivo.toLowerCase().includes(texto) : false) ||
    compu.estado.toLowerCase().includes(texto)
  );
  mostrarTabla(filtrados);
});
// :diamante_azul_pequeño: Inicializar
datosComputadoras();