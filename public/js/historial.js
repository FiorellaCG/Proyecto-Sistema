
async function cargarPermisos() {
  try {
    const res = await fetch("http://localhost:3000/permisos");
    const permisos = await res.json();

    const tabla = document.getElementById("tablaPermisos");
    tabla.innerHTML = "";

    permisos.forEach(p => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>${p.fecha}</td>
        <td>${p.motivo}</td>
        <td>${p.computadora}</td>
      `;

      tabla.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar permisos:", error);
  }
}

// Ejecutar la carga al abrir la página
cargarPermisos();
