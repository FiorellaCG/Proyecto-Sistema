// Importa helpers del servicio para hacer peticiones al servidor
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

// Evento para crear usuario cuando se da clic en el botón
btnCrear.addEventListener("click", async (event) => {
  event.preventDefault(); // Evita recargar la página

  // Construir objeto con la información del formulario
  const usuario = {
    username: username.value.trim(),
    contra:   contra.value.trim(),
    rol:      rol.value,
  };

  // Validar que los campos no estén vacíos
  if (!usuario.username || !usuario.contra || !usuario.rol) {
    alert("Completa usuario, contraseña y rol.");
    return;
  }

  try {
    // Enviar usuario al servidor
    const resp = await postComputadoras("usuarios", usuario);
    console.log("Usuario creado:", resp);
    alert("La creación ha sido exitosa");

    // Limpiar formulario
    username.value = "";
    contra.value   = "";
    rol.value      = "";
  } catch (err) {
    console.error("Error al crear usuario:", err);
    alert("No se pudo crear el usuario. Revisa la consola.");
  }
});

// Elementos de la tabla de solicitudes pendientes
const tablaPendientesBody = document.querySelector("#tablaPendientes tbody");
const sinPendientesMsg    = document.getElementById("sinPendientes");

let solicitudes = [];

// Cargar solicitudes desde el servidor
async function cargarSolicitudes() {
  try {
    solicitudes = await getComputadoras("computadoras");

    // Filtrar solo las que están en estado pendiente
    const pendientes = solicitudes.filter((s) => s.estado === "pendiente");
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

// Función que pinta la tabla con los datos
function pintarTabla(lista) {
  tablaPendientesBody.innerHTML = "";

  // Si no hay elementos en la lista, mostrar mensaje
  if (!Array.isArray(lista) || lista.length === 0) {
    if (sinPendientesMsg) sinPendientesMsg.classList.remove("d-none");
    return;
  }
  if (sinPendientesMsg) sinPendientesMsg.classList.add("d-none");

  // Crear filas de la tabla con la información de cada computadora
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

// Función para aceptar la solicitud
async function aceptarSolicitud(id, boton) {
  try {
    if (boton) {
      boton.disabled = true;
      boton.textContent = "Guardando…";
    }

    // Actualizar en el servidor el estado de la solicitud
    await putComputadoras("computadoras", id, {
      estado: "aprobada",
      fechaDecision: new Date().toISOString(),
      motivoRechazo: null,
    });

    // Eliminar la fila de la tabla
    const fila = boton.closest("tr");
    if (fila) fila.remove();

    verificarPendientesVacios();
  } catch (err) {
    console.error("Error al aprobar:", err);
    alert("No se pudo aprobar. Revisa la consola.");
  }
}

// Función para rechazar la solicitud
async function rechazarSolicitud(id, motivo, boton) {
  try {
    if (boton) {
      boton.disabled = true;
      boton.textContent = "Guardando…";
    }

    // Actualizar en el servidor el estado a rechazada
    await putComputadoras("computadoras", id, {
      estado: "rechazada",
      fechaDecision: new Date().toISOString(),
      motivoRechazo: motivo || "Sin especificar",
    });

    // Eliminar la fila de la tabla
    const fila = boton.closest("tr");
    if (fila) fila.remove();

    verificarPendientesVacios();
  } catch (err) {
    console.error("Error al rechazar:", err);
    alert("No se pudo rechazar. Revisa la consola.");
  }
}

// Si ya no quedan filas en la tabla, mostrar mensaje "No hay pendientes"
function verificarPendientesVacios() {
  if (tablaPendientesBody.children.length === 0) {
    if (sinPendientesMsg) sinPendientesMsg.classList.remove("d-none");
  }
}

// Delegación de eventos para los botones de la tabla
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

// Llamar a la carga inicial de solicitudes
cargarSolicitudes();
