import { getComputadoras, postComputadoras } from "../services/services.js";

const username = document.getElementById("username");
const contra = document.getElementById("contra");
const rol = document.getElementById("rol");

const btnCrear = document.getElementById("btnCrear");

//EVENTO PARA GUARDAR
btnCrear.addEventListener("click", async function (event) {
    event.preventDefault();

    // Objeto de usuario
    const usuario = {
        username: username.value,
        contra: contra.value,
        rol: rol.value
    };

    // Guardas en la colección usuarios
    const respuestaConfirmada = await postComputadoras("usuarios", usuario);

    alert("La creación ha sido exitosa");
    console.log(respuestaConfirmada);
});
