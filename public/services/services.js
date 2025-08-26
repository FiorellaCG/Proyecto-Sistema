

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