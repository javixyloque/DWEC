const res = await fetch("http://localhost:3000/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "username": 'admin', "password": 'adminpassword' }),
});

const { token, userId } = await res.json();  // Ahora recibimos el userId
console.log("Token:", token);
console.log("UserID:", userId);

const resObj = await fetch("http://localhost:3000/object", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

const objects = await resObj.json();
console.log("Objetos:", objects);

async function addObject() {
    try {
        const response = await fetch("http://localhost:3000/object", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: "objeto1",
                value: "valor1",
                owner: userId  // Enviamos el ID del usuario autenticado
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${await response.text()}`);
        }

        const data = await response.json();
        console.log("Objeto creado:", data);
    } catch (error) {
        console.error("Error al agregar objeto:", error);
    }
}

// Llamar a la función
addObject();
