<<<<<<< HEAD

async function cargarPermisos() {
  try {
    const res = await fetch("http://localhost:3000/permisos");
    const permisos = await res.json();

    const tabla = document.getElementById("tablaPermisos");
    tabla.innerHTML = "";

    permisos.forEach(p => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>${p.fecha}</td>
        <td>${p.motivo}</td>
        <td>${p.computadora}</td>
      `;

      tabla.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar permisos:", error);
  }
}

// Ejecutar la carga al abrir la página
cargarPermisos();
=======
import { getComputadoras, eliminarComputadora } from "../services/services.js";

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

function mostrarTabla(lista) {
  tablaPermisos.innerHTML = "";

  lista.forEach(compu => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${compu.nombre || "—"}</td>
      <td>${compu.fechaSalida || "—"}</td>
      <td>${compu.fechaRegreso || "—"}</td>
      <td>${compu.codigoComputadora || "—"}</td>
      <td>
        <span class="badge ${
          compu.estado === "aprobada"  ? "bg-success" :
          compu.estado === "pendiente" ? "bg-warning text-dark" :
          compu.estado === "rechazada"? "bg-danger" :
          "bg-secondary"
        }">
          ${compu.estado || "desconocido"}
        </span>
      </td>
      <td>${compu.motivoRechazo || ""}</td>
      <td>
        <button 
          class="btn btn-sm btn-danger btn-eliminar"
          data-id="${compu.id}">
          Eliminar
        </button>
      </td>
    `;
    tablaPermisos.appendChild(fila);
  });
  
  //boton de Eliminar
  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.currentTarget.dataset.id;   
      try {
        await eliminarComputadora(id);
        await datosComputadoras();             
        alert("Solicitud eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar computadora:", error);
        alert("No se pudo eliminar la solicitud");
      }
    });
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

>>>>>>> Fiorella
