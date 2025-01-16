"use strict";


document.addEventListener("DOMContentLoaded", async () => {

    // DIRECCION => OBTENER ID DEL GET
    const idUser = new URLSearchParams(window.location.search);
    const id = parseInt(idUser.get("id"));

    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${parseInt(id)}`);
    const datosUser = await user.json();
    

    
    pintarUsuario(datosUser);


    // FUNCION => PINTA DATOS USUARIO
    function pintarUsuario (datosUser) {

        // TITULO => NOMBRE USUARIO
        const h1 = document.createElement('h1');
        h1.textContent = datosUser.name;
        document.body.appendChild(h1);
        
        // DIV =>  DIRECCION
        const direccion = document.createElement('div');
        const parrafoDireccion = document.createElement('p');
        parrafoDireccion.innerHTML = `<strong>Ciudad</strong>: ${datosUser.address.city}<br><strong>Calle</strong>: ${datosUser.address.street}<br><strong>Vivienda</strong> ${datosUser.address.suite}<br><strong>Código postal</strong>: ${datosUser.address.zipcode}`;
        document.body.appendChild(direccion);
        direccion.appendChild(parrafoDireccion);


        // PARRAFO => EMAIL
        const email = document.createElement('p');
        email.textContent = `Email: ${datosUser.email}`;
        document.body.appendChild(email);


        // PARRAFO => TELEFONO
        const telefono = document.createElement('p');
        telefono.textContent = `Teléfono: ${datosUser.phone}`;
        document.body.appendChild(telefono);


        // LINK => PAGINA WEB 
        const web = document.createElement('a');
        web.href = `http://www.${datosUser.website}`;
        web.textContent = datosUser.website;
        document.body.appendChild(web);

        // LLAMADA FUNCIÓN QUE PINTA TAREAS Y ALBUMES
        pintarAlbumsTareas(datosUser);
    }


    async function pintarAlbumsTareas (datosUser) {
        // FETCH => ÁLBUMES DEL USUARIO
        const fetchAlbums = await fetch (`https://jsonplaceholder.typicode.com/users/${datosUser.id}/albums`);
        const albums = await fetchAlbums.json();
        const albumDiv = document.createElement('div');
        albumDiv.textContent = "Albums: ";
        document.body.appendChild(albumDiv);
        

        // ESTILOS DIV ALBUM
        albumDiv.style.display = "block";
        albumDiv.style.marginTop = "20px";
        albumDiv.style.border = "1px solid";
        albumDiv.style.backgroundColor = 'lightblue';

        // BUCLE => IMPRIMIR ALBUMES
        albums.forEach(elemento => {
            const album = document.createElement('p');
            album.textContent = elemento.title;
            albumDiv.appendChild(album);

            album.style.border = "1px solid";
        });

        // FETCH => TAREAS USUARIO
        const fetchTareas = await fetch (`https://jsonplaceholder.typicode.com/users/${datosUser.id}/todos`);
        const tareas = await fetchTareas.json();
        const tareasDiv = document.createElement('div');
        tareasDiv.textContent = "Tareas: ";
        document.body.appendChild(tareasDiv);
        
        tareasDiv.style.display = "block";
        tareasDiv.style.backgroundColor = 'aquamarine';
        tareasDiv.style.marginTop = "20px";
        tareasDiv.style.border = "1px solid";

        // BUCLE => IMPRIMIR TAREAS
        tareas.forEach(elemento => {
            const tarea = document.createElement('p');

            //                   TITULO TAREA          TERNARIO => IMPRIMIR TAREAS Y ESTADO
            tarea.textContent = `${elemento.title} - ${elemento.completed ? "Completada" : "Pendiente"}`;
            tareasDiv.appendChild(tarea);


            tarea.style.border = "1px solid";
            // TERNARIO => CAMBIAR COLOR TAREAS COMPLETADAS
            elemento.completed ? tarea.style.backgroundColor = 'lightgreen' : tarea.style.backgroundColor = 'transparent';
        });
    }



});