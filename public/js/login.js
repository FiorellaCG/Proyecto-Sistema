import { getComputadoras } from "../services/services.js"

const username = document.getElementById("username")
const contra = document.getElementById("contra")
const btnEntrar = document.getElementById("btnEntrar");

btnEntrar.addEventListener("click", async function () {

     if (username.value.startsWith ("admin")) {
      window.location.href = "/pages/historial.html"
    } else if (username.value.startsWith ("alumno")) {
      window.location.href = "/pages/formulario.html"
    } else {
      window.location.href = "/pages/login.html"
    }
    
    const respuestaConfirmada = await getComputadoras(usuarios)
    console.log(respuestaConfirmada)
})