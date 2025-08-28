import { getComputadoras } from "../services/services.js"

const username = document.getElementById("username")
const contra = document.getElementById("contra")
const btnEntrar = document.getElementById("btnEntrar");

btnEntrar.addEventListener("click", async function () {

    const usuarios = {
        username: username.value,
        contra: contra.value,
        rol: rol.value
    }
    /*
    if (rol.value === "Administrador") {
      window.location.href = "/pages/admin.html"
    } else if (rol.value === "Estudiante") {
      window.location.href = "/pages/formulario.html"
    } else {
      window.location.href = "/pages/login.html"
    }
    */

     if (username.value.startsWith("admin")) {
      window.location.href = "/pages/admin.html"
    } else if (rol.value === "alumno") {
      window.location.href = "/pages/formulario.html"
    } else {
      window.location.href = "/pages/login.html"
    }
    
    const respuestaConfirmada = await getComputadoras(usuarios)
    console.log(respuestaConfirmada)
})