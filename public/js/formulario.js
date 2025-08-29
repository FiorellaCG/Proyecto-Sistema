import { postComputadoras } from "../services/services.js";
//Utilizado para Bootstrap
(() => {
      'use strict';
      const forms = document.querySelectorAll('.needs-validation');
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          // regla simple: fecha regreso >= fecha salida
          const salida = form.querySelector('#fechaSalida').value;
          const regreso = form.querySelector('#fechaRegreso').value;
          if (salida && regreso && new Date(regreso) < new Date(salida)) {
            event.preventDefault();
            event.stopPropagation();
            form.querySelector('#fechaRegreso').setCustomValidity('La fecha de regreso no puede ser anterior a la de salida.');
          } else {
            form.querySelector('#fechaRegreso').setCustomValidity('');
          }

          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    })();

const usuario = document.getElementById("usuario");
const sede = document.getElementById("sede");
const fechaSalida = document.getElementById("fechaSalida");
const fechaRegreso = document.getElementById("fechaRegreso");
const codigoComputadora = document.getElementById("codigoComputadora");
const aceptoCondiciones = document.getElementById("aceptoCondiciones");
//EVENTO PARA GUARDAR
const btnGuardar = document.getElementById("btnGuardar");

btnGuardar.addEventListener("click", async function (event) {
  event.preventDefault(); 

  
  if (!aceptoCondiciones.checked) {
    alert("Debes aceptar las condiciones de uso antes de continuar.");
    return; // detiene la ejecución
  }

  const computadoras = {
    nombre: usuario.value,                
    sede: sede.value,
    fechaSalida: fechaSalida.value,        
    fechaRegreso: fechaRegreso.value,      
    aceptoCondiciones: aceptoCondiciones.checked,
    codigoComputadora: codigoComputadora.value,
    estado: estado.value
  };

  const respuestaConfirmada = await postComputadoras("computadoras", computadoras);

  alert("La solicitud ha sido exitosa");
  console.log(respuestaConfirmada);
});

