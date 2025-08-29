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

async function putComputadoras(endpoint, computadoras) {
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(computadoras)
        })

        const compu = await response.json()
        return compu

    } catch (error) {
        console.error("Hay un error ", error);
        throw error
    }
}


export { getComputadoras, postComputadoras, putComputadoras }