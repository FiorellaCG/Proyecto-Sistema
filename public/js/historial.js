
/*import { getComputadoras } from "../services/services.js";

const tablaPermisos = document.getElementById("tablaPermisos");

async function datosComputadoras() {

    const datosComputadorasRecibidas = await getComputadoras("computadoras")

    for (let index = 0; index < datosComputadorasRecibidas.length; index++) {
        let parrafoNombre = document.createElement("p")
        let parrafoSalida = document.createElement("p")
        let parrafoRegreso = document.createElement("p")
        let parrafoComputadora = document.createElement("p")
        let parrafoEstado = document.createElement("p")
        
        parrafoNombre.textContent = datosComputadorasRecibidas[index].nombre
        parrafoSalida.textContent = datosComputadorasRecibidas[index].fechaSalida
        parrafoRegreso.textContent = datosComputadorasRecibidas[index].fechaRegreso
        parrafoComputadora.textContent = datosComputadorasRecibidas[index].computadora
        parrafoEstado.textContent = datosComputadorasRecibidas[index].estado

        tablaPermisos.appendChild(parrafoNombre)
        tablaPermisos.appendChild(parrafoSalida)
        tablaPermisos.appendChild(parrafoRegreso)
        tablaPermisos.appendChild(parrafoComputadora)
        tablaPermisos.appendChild(parrafoEstado)
        
    }
    console.log(datosComputadorasRecibidas)
}
datosComputadoras()

*/
import { getComputadoras } from "../services/services.js";

const tablaPermisos = document.getElementById("tablaPermisos");
const inputBusqueda = document.getElementById("busqueda");

let datosComputadorasRecibidas = [];

// Cargar datos
async function datosComputadoras() {
  try {
    datosComputadorasRecibidas = await getComputadoras("computadoras");
    mostrarTabla(datosComputadorasRecibidas);
    console.log(datosComputadorasRecibidas);
  } catch (error) {
    console.error("Error al cargar computadoras:", error);
  }
}

// 🔹 Mostrar datos en la tabla
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

// Filtro de búsqueda
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

// Inicializar
datosComputadoras();
