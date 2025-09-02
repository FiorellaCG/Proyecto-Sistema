//Get
async function getComputadoras(endpoint) {
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const compu = await response.json()
        return compu

    } catch (error) {
        console.error('Hay un error al obtener computadoras:', error);
        throw error;
    }
}

//Post
async function postComputadoras(endpoint, datos) {
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })

        if (!response.ok) throw new Error("Error en POST: " + response.status);

        return await response.json();

    } catch (error) {
        console.error("Hay un error al crear en "+ endpoint, error);
        throw error
    }
}
//PUT
async function putComputadoras(endpoint, id, datos) {
  try {
    // 1) Obtener el registro actual
    const getRes = await fetch(`http://localhost:3001/${endpoint}/${id}`);
    if (!getRes.ok) throw new Error("Error al leer el recurso actual");
    const actual = await getRes.json();
<<<<<<< HEAD
    // 2) Combinar los datos nuevos con los existentes
    const cuerpo = { ...actual, ...datos };
=======

    // 2) Combinar los datos nuevos con los existentes
    const cuerpo = { ...actual, ...datos };

>>>>>>> 72a6d2796ed2a8984405316f69365f04a28e3f5a
    // 3) Enviar PUT con el objeto completo
    const response = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    });

    if (!response.ok) throw new Error("Error al actualizar");
    return await response.json();

  } catch (error) {
    console.error("Hay un error al actualizar en putComputadoras:", error);
    throw error;
  }
}

//DELETE
async function eliminarComputadora(id) {
  try {
    const respuesta = await fetch(`http://localhost:3001/computadoras/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (respuesta.ok) {
      datosComputadoras(); 
      alert("Solicitud eliminada correctamente");
    } else {
      alert("Error al eliminar la solicitud");
    }
  } catch (error) {
    console.error("Error al eliminar computadora:", error);
  }
}

//DELETE USUARIO
async function eliminarUsuario(id) {
  try {
    const respuesta = await fetch(`http://localhost:3001/usuarios/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar usuario");
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
}

export { getComputadoras, postComputadoras, putComputadoras, eliminarComputadora, eliminarUsuario };
