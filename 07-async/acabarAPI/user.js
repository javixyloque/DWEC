"use strict";


document.addEventListener("DOMContentLoaded", async () => {
    const idUser = new URLSearchParams(window.location.search);
    const id = parseInt(idUser.get("id"));

    console.log(id);
    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${parseInt(id)}`);
    const userData = await user.json();
    

    
    pintarUsuario(userData);
    function pintarUsuario (userData) {
         
        const h1 = document.createElement('h1');
        h1.textContent = userData.name;
        document.body.appendChild(h1);
        
        const direccion = document.createElement('div');
        const parrafoDireccion = document.createElement('p');
        parrafoDireccion.innerHTML = `<strong>Ciudad</strong>: ${userData.address.city}<br><strong>Calle</strong>: ${userData.address.street}<br><strong>Vivienda</strong> ${userData.address.suite}<br><strong>Código postal</strong>: ${userData.address.zipcode}`;
        document.body.appendChild(direccion);
        direccion.appendChild(parrafoDireccion);

        const email = document.createElement('p');
        email.textContent = `Email: ${userData.email}`;
        document.body.appendChild(p);
    }
});