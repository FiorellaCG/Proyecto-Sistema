import { postComputadoras } from "../services/services.js"

const userId = document.getElementById("userId");
const contra = document.getElementById("contra");
const guardarBtn = document.getElementById("guardarBtn");

guardarBtn.addEventListener("click", async function () {

    const usuarios = {
        id: id.value,
        contra: contra.value
          
    }
    const respuestaConfirmada = await postComputadoras(usuarios)

    alert("Usuario agregada correctamente", respuestaConfirmada)

    console.log(respuestaConfirmada)
})