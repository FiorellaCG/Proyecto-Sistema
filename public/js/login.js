// Importa la función que obtiene datos del servidor
import { getComputadoras } from "../services/services.js"

// Captura los elementos del formulario de login
const username = document.getElementById("username")
const contra = document.getElementById("contra")
const btnEntrar = document.getElementById("btnEntrar");

// Evento al hacer clic en "Entrar"
btnEntrar.addEventListener("click", async function () {

  // Obtiene la lista de usuarios desde el servidor
  const usuarios = await getComputadoras("usuarios");

  // Busca si el usuario y contraseña coinciden con alguno en la lista
  const usuario = usuarios.find(
    (usuario) =>
      usuario.username === username.value &&
      usuario.contra === contra.value
  );

  // Si no existe, muestra error
  if (!usuario) {
    alert("Usuario o contraseña incorrectos");
    return;

  }
  // Redirección según el rol del usuario encontrado
  switch (usuario.rol) {
    case "Administrador":
      window.location.href = "/pages/admin.html";
      break;
    case "Alumno":
      window.location.href = "/pages/formulario.html";
      break;
    case "Profesor":
      window.location.href = "/pages/historial.html";
      break;
    default:
      alert("Rol no reconocido");
  }
});