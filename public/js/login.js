import { getComputadoras } from "../services/services.js"

const username = document.getElementById("username")
const contra = document.getElementById("contra")
const btnEntrar = document.getElementById("btnEntrar");
btnEntrar.addEventListener("click", async function () {
  const usuarios = await getComputadoras("usuarios");
  const usuario = usuarios.find(
    (usuario) =>
      usuario.username === username.value &&
      usuario.contra === contra.value
  );

  if (!usuario) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  switch (usuario.rol) {
    case "admin":
      window.location.href = "/pages/admin.html";
      break;
    case "alumno":
      window.location.href = "/pages/formulario.html";
      break;
    case "profesor":
      window.location.href = "/pages/admin.html";
      break;
    default:
      alert("Rol no reconocido");
  }
});

