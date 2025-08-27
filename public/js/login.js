import { postComputadoras } from "../services/services.js";

//REALIZAR LOS GET ELEMENT

//EVENTO PARA GUARDAR

guardarBtn.addEventListener("click", async function () {

    const compus = {
          
    }
    const respuestaConfirmada = await postPeliculas(compus)

    alert("Usuario agregada correctamente", respuestaConfirmada)

    console.log(respuestaConfirmada)
})