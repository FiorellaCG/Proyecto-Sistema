import { postComputadoras } from "../services/services.js";
const form = document.getElementById('loginForm');
const userInput = document.getElementById('userId');
const passInput = document.getElementById('password');
const errorBox = document.getElementById('error');
const guardarBtn = document.getElementById("guardarBtn");


// Estas funciones muestran el mensaje de error en pantalla
function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove('oculto');
}
function clearError() {
  errorBox.textContent = '';
  errorBox.classList.add('oculto');
}

// valida que el usuario y contraseña esten en la base de datos
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que la página se recargue
  clearError();       

  const userId = userInput.value.trim();
  const password = passInput.value;

  // se muestra un error si los camos estan vacios
  if (!userId || !password) {
    showError('Por favor, completa ambos campos.');
    return;
  }

  try {
    // se valida si el usuario existe
    const res = await fetch(`http://localhost:3000/usuarios?id=${userId}&password=${password}`);
    const data = await res.json();

    // Si se encuentra el usuario, se guarda y se lleva a otra pagina
    if (data.length > 0) {
      const user = data[0];
      sessionStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        role: user.role,
        loginAt: Date.now()
      }));
      window.location.href = 'formulario.html';
    } else {
      // Si no se encuentra, se muestra un mensaje de error
      showError('Credenciales incorrectas. Intenta de nuevo.');
    }
  } catch (err) {
    // Si hay un problema con el servidor, se muestra otro mensaje
    showError('No se pudo conectar con el servidor.');
    console.error(err);
  }
});

// Este bloque borra el mensaje de error
[userInput, passInput].forEach(input => {
  input.addEventListener('input', () => {
    if (!errorBox.classList.contains('oculto')) {
      clearError();
    }
  });
});


//EVENTO PARA GUARDAR

guardarBtn.addEventListener("click", async function () {
  const compus = {
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    precio: document.getElementById("precio").value
  };

  try {
    const respuestaConfirmada = await postComputadoras(compus);
    alert("Computadora agregada correctamente");
    console.log(respuestaConfirmada);
  } catch (error) {
    console.error("Error al guardar:", error);
  }
});
