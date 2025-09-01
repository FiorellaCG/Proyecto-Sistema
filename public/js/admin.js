// Importacion de servicios
import {
  getComputadoras,
  postComputadoras,
  putComputadoras,
} from "../services/services.js";

// Sección: Crear usuario
const username = document.getElementById("username");
const contra   = document.getElementById("contra");
const rol      = document.getElementById("rol");
const btnCrear = document.getElementById("btnCrear");

btnCrear.addEventListener("click", async (event) => {
  event.preventDefault();

  const usuario = {
    username: username.value.trim(),
    contra:   contra.value.trim(),
    rol:      rol.value,
  };

  if (!usuario.username || !usuario.contra || !usuario.rol) {
    alert("Completa usuario, contraseña y rol.");
    return;
  }

  try {
    const resp = await postComputadoras("usuarios", usuario);
    console.log("Usuario creado:", resp);
    alert("La creación ha sido exitosa");
    // Limpia formulario
    username.value = "";
    contra.value   = "";
    rol.value      = "";
  } catch (err) {
    console.error("Error al crear usuario:", err);
    alert("No se pudo crear el usuario. Revisa la consola.");
  }
});
// Sección: Aprobación de Solicitudes

const tablaPendientesBody = document.querySelector("#tablaPendientes tbody");
const sinPendientesMsg    = document.getElementById("sinPendientes");

let solicitudes = [];


async function cargarSolicitudes() {
  try {
    solicitudes = await getComputadoras("computadoras");

    // Filtrar solo pendientes
    const pendientes = solicitudes.filter(s => s.estado === "pendiente");
    pintarTabla(pendientes);
  } catch (error) {
    console.error("Error al cargar computadoras:", error);
    tablaPendientesBody.innerHTML = "";
    if (sinPendientesMsg) {
      sinPendientesMsg.classList.remove("d-none");
      sinPendientesMsg.textContent = "Error al cargar solicitudes.";
    }
  }
}


function pintarTabla(lista) {
  tablaPendientesBody.innerHTML = "";

  if (!Array.isArray(lista) || lista.length === 0) {
    if (sinPendientesMsg) sinPendientesMsg.classList.remove("d-none");
    return;
  }
  if (sinPendientesMsg) sinPendientesMsg.classList.add("d-none");

  lista.forEach((compu) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${compu.id ?? ""}</td>
      <td>${compu.nombre ?? ""}</td>
      <td>${compu.sede ?? ""}</td>
      <td>${compu.codigoComputadora ?? ""}</td>
      <td>${compu.fechaSalida ?? ""}</td>
      <td>${compu.fechaRegreso ?? ""}</td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-success btn-sm btn-aceptar"  data-id="${compu.id}">Aceptar</button>
          <button class="btn btn-danger  btn-sm btn-rechazar" data-id="${compu.id}">Rechazar</button>
        </div>
      </td>
    `;
    tablaPendientesBody.appendChild(fila);
  });
}

/**
 * Aceptar: actualiza estado en db.json y elimina la fila de la tabla.
 */
async function aceptarSolicitud(id, boton) {
  try {
    if (boton) {
      boton.disabled = true;
      boton.textContent = "Guardando…";
    }

    await putComputadoras("computadoras", id, {
      estado: "aprobada",
      fechaDecision: new Date().toISOString(),
      motivoRechazo: null,
    });

    // 🔹 Eliminar fila de la tabla directamente
    const fila = boton.closest("tr");
    if (fila) fila.remove();

    verificarPendientesVacios();
  } catch (err) {
    console.error("Error al aprobar:", err);
    alert("No se pudo aprobar. Revisa la consola.");
  }
}

/**
 * Rechazar: actualiza estado en db.json y elimina la fila de la tabla.
 */
async function rechazarSolicitud(id, motivo, boton) {
  try {
    if (boton) {
      boton.disabled = true;
      boton.textContent = "Guardando…";
    }

    await putComputadoras("computadoras", id, {
      estado: "rechazada",
      fechaDecision: new Date().toISOString(),
      motivoRechazo: motivo || "Sin especificar",
    });

    // 🔹 Eliminar fila de la tabla directamente
    const fila = boton.closest("tr");
    if (fila) fila.remove();

    verificarPendientesVacios();
  } catch (err) {
    console.error("Error al rechazar:", err);
    alert("No se pudo rechazar. Revisa la consola.");
  }
}


function verificarPendientesVacios() {
  if (tablaPendientesBody.children.length === 0) {
    if (sinPendientesMsg) sinPendientesMsg.classList.remove("d-none");
  }
}


tablaPendientesBody.addEventListener("click", async (e) => {
  const btnAceptar  = e.target.closest(".btn-aceptar");
  const btnRechazar = e.target.closest(".btn-rechazar");

  if (btnAceptar) {
    const id = btnAceptar.getAttribute("data-id");
    await aceptarSolicitud(id, btnAceptar);
  }

  if (btnRechazar) {
    const id = btnRechazar.getAttribute("data-id");
    const motivo = (prompt("Indica el motivo de rechazo:") || "").trim();
    await rechazarSolicitud(id, motivo, btnRechazar);
  }
});
cargarSolicitudes();
