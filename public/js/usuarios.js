import { getComputadoras, eliminarUsuario } from "../services/services.js";

// Elementos del DOM
const tablaUsuarios = document.getElementById("tablaUsuarios");
const inputBuscarUsuario = document.getElementById("busqueda");

// Arreglo para almacenar los usuarios recibidos
let listaUsuarios = [];

// Función para cargar los usuarios desde el servidor
async function cargarUsuarios() {
  try {
    listaUsuarios = await getComputadoras("usuarios");
    mostrarUsuarios(listaUsuarios);
    console.log("Usuarios cargados:", listaUsuarios);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}

// Función para mostrar los usuarios en la tabla
function mostrarUsuarios(usuarios) {
  tablaUsuarios.innerHTML = ""; 

  usuarios.forEach((usuario) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${usuario.id ?? ""}</td>
      <td>${usuario.username ?? ""}</td>
      <td>${usuario.rol ?? ""}</td>
      <td>
        <button class="btn-eliminar btn btn-danger" data-id="${usuario.id}">
          Eliminar
        </button>
      </td>
    `;
    tablaUsuarios.appendChild(fila);
  });

  // Botones de eliminar
  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.currentTarget.dataset.id;   
      try {
        await eliminarUsuario(id);
        await cargarUsuarios();             
        alert("Usuario eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("No se pudo eliminar el usuario");
      }
    });
  });
}

// Filtro de búsqueda por nombre o rol
inputBuscarUsuario.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = listaUsuarios.filter((usuario) =>
    usuario.username?.toLowerCase().includes(texto) ||
    usuario.rol?.toLowerCase().includes(texto)
  );
  mostrarUsuarios(filtrados);
});

// Inicializar la carga de usuarios
cargarUsuarios();
