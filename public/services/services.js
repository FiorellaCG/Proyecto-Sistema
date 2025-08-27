

//REALIZAR CAMBIOS AL PUT Y DEMAS 


async function getComputadoras() {
    try {
        const response = await fetch('http://localhost:3001/computadoras', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const pelicula = await response.json()
        return pelicula

    } catch (error) {
        console.error('Hay un error al obtener peliculas:', error);
        throw error;
    }
}

async function postComputadoras(compus) {
    try {
        const response = await fetch("http://localhost:3001/computadoras", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(compus)
        })

        const computadora = await response.json()
        return computadora

    } catch (error) {
        console.error("Hay un error al crear la pelicula ", error);
        throw error
    }
}

async function putComputadoras(compus) {
    try {
        const response = await fetch("http://localhost:3001/computadoras", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(compus)
        })

        const computadora = await response.json()
        return computadora

    } catch (error) {
        console.error("Hay un error ", error);
        throw error
    }
}


export { getComputadoras, postComputadoras, putComputadoras }

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

async function postComputadoras(endpoint,computadoras) {
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(computadoras)
        })

        const compu = await response.json()
        return compu

    } catch (error) {
        console.error("Hay un error al crear la computadora ", error);
        throw error
    }
}
export { getComputadoras, postComputadoras }