let token ="";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add-button").addEventListener("click",addObject)
    main();
})


async function main() {
    // PROMESA => ESPERAR FUNCION DEVUELVE TOKEN
    token = await retrieveToken();
    const dObjects = await retrieveObjects();
    dObjects.forEach(object => {
        // DAMOS VALOR DE NAME Y VALUE AL OBJECT
        const {name, value} = object;
        //AÑADIMOS LOS VALORES DEL OBJECT A LA TABLA
        addTableRow(name, value);
    });
}


function addTableRow(name, value) {
    // CREAR HTML DE LA TABLA CON LOS VALORES DEL OBJECT
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${name}</td> <td>${value}</td>`;
    const tbody = document.querySelector("#tbody");
    tbody.appendChild(tr);
}


async function addObject(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const value = document.getElementById("value").value;

    if (!name) {
        console.log("Escribir un nombre para el valor name");
        return;
    }

    const dbObject = await fetch('http://localhost:5173/object', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, value }),
    })
    
    // VACIAR CAMPOS INPUT
    document.getElementById('name').value = '';
    document.getElementById('value').value = '';

    // AÑADIMOS UNA FILA CON LOS DATOS DEL OBJETO
    addTableRow(dbObject.name, dbObject.value)
}




async function retrieveToken() {

    // OBTENER TOKEN | SEGUNDO PARAMETRO => BODY REQUEST HTTP
    const res = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "username": 'admin',
            "password": 'adminpassword'
        }),
    })
    
    const {token} = await res.json();



}