/*let permisos = [];

// 🔹 Cargar permisos desde JSON Server
async function cargarPermisos() {
  try {
    const res = await fetch("http://localhost:3000/permisos");
    permisos = await res.json(); 
    mostrarPermisos(permisos);
  } catch (error) {
    console.error("Error al cargar permisos:", error);
  }
}

// 🔹 Mostrar permisos en la tabla
function mostrarPermisos(lista) {
  const tabla = document.getElementById("tablaPermisos");
  tabla.innerHTML = "";

  if (lista.length === 0) {
    tabla.innerHTML = `
      <tr>
        <td colspan="6" class="text-muted">⚠ No se encontraron permisos</td>
      </tr>
    `;
    return;
  }

  lista.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.fechaSalida || "-"}</td>
      <td>${p.fechaRegreso || "-"}</td>
      <td>${p.computadora}</td>
      <td>
        <span class="badge ${p.estado === "Aprobado" ? "bg-success" : p.estado === "Rechazado" ? "bg-danger" : "bg-warning text-dark"}">
          ${p.estado || "Pendiente"}
        </span>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// 🔹 Filtrar permisos con la barra de búsqueda
document.getElementById("busqueda").addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = permisos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.motivo.toLowerCase().includes(texto) ||
    p.computadora.toLowerCase().includes(texto)
  );
  mostrarPermisos(filtrados);
});

// 🔹 Ejecutar la carga al abrir la página
cargarPermisos();
*/

import { getComputadoras } from "../services/services.js";

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






