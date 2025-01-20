"use strict";

window.addEventListener("DOMContentLoaded", async () => {
    // ESTILOS DEL BODY BÁSICOS
    document.body.style.margin = "0 5%";
    document.body.style.fontFamily = "sans-serif";

    // OBTENER ARTICULOS EN UN ARRAY
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const datosArticulo = await respuesta.json();
    
    // PINTAR ARTICULOS
    pintarArticulo(datosArticulo);


    // FUNCION QUE PINTA ARTICULOS
    async function pintarArticulo(datos) {
        datos.forEach(async (articulo) => {
            const articuloDiv = document.createElement("div");
            document.body.appendChild(articuloDiv);

            const tituloArticulo = document.createElement("h1");
            articuloDiv.appendChild(tituloArticulo);
            tituloArticulo.textContent = articulo.title;

            const bodyArticulo = document.createElement("p");
            bodyArticulo.textContent = articulo.body;
            articuloDiv.appendChild(bodyArticulo);

            // OBTENER AUTOR DEL POST
            const autorRespuesta = await fetch(`https://jsonplaceholder.typicode.com/users/${articulo.userId}`);
            const autor = await autorRespuesta.json();


            // ENLACE => ACCEDER A LA INFORMACIÓN DEL AUTOR
            const printAutor = document.createElement("button");
            printAutor.classList.add("printAutor");
            printAutor.textContent = autor.name;
            printAutor.target = "_blank"; 
            articuloDiv.appendChild(printAutor);

            // BOTON => ESTILOS 
            printAutor.style.borderRadius = "5px";
            printAutor.style.backgroundColor = "limegreen";
            printAutor.style.padding = "10px";
            printAutor.style.cursor = "pointer";
            

            // BOTÓN => MOSTRAR COMENTARIOS
            const boton = document.createElement("button");
            boton.textContent = "Mostrar Comentarios";
            boton.id = `boton-${articulo.id}`;
            articuloDiv.appendChild(boton);

            boton.style.cursor = "pointer";

            // CONTENEDOR COMENTARIOS
            const comentariosDiv = document.createElement("div");
            comentariosDiv.id = `comentarios-${articulo.id}`;
            comentariosDiv.style.display = "none"; // Ocultar inicialmente
            articuloDiv.appendChild(comentariosDiv);

            // EVENTO BOTÓN 
            boton.addEventListener("click", () =>
                mostrarComentarios(articulo.id, comentariosDiv, boton)
            );
            printAutor.addEventListener("click", () => {
                pintarUsuario(articulo.userId);
            });

            

        });
    }

    // FUNCION => MOSTRAR / OCULTAR COMENTARIOS
    async function mostrarComentarios(postId, comentariosDiv, boton) {
        if (comentariosDiv.style.display === "none") {
            // Obtener y mostrar los comentarios
            const respuestaComentarios = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const datosComments = await respuestaComentarios.json();

            // PINTAR COMENTARIOS EN EL DIV
            pintarComentarios(datosComments, comentariosDiv);
            comentariosDiv.style.display = "block";
            boton.textContent = "Ocultar Comentarios";
        } else {
            // QUITAR DISPLAY COMENTARIOS
            comentariosDiv.style.display = "none";
            boton.textContent = "Mostrar Comentarios";
        }
    }

    // FUNCIÓN => PINTAR COMENTARIOS
    function pintarComentarios(datos, comentariosDiv) {
        comentariosDiv.innerHTML = ""; // Limpiar comentarios previos
        datos.forEach((comentario) => {
            const tituloComentario = document.createElement("h3");
            tituloComentario.textContent = comentario.name;
            comentariosDiv.appendChild(tituloComentario);

            const cuerpoComentario = document.createElement("p");
            cuerpoComentario.textContent = comentario.body;
            comentariosDiv.appendChild(cuerpoComentario);
        });
    }

    // FUNCION => PINTA DATOS USUARIO 
    // LLAMA A pintarAlbumsTareas
    async function pintarUsuario (idUsuario) {
        document.body.innerHTML = ""; // Limpiar coment
        
        // FETCH => GUARDAR DATOS USUARIO
        const usuario = await fetch(`https://jsonplaceholder.typicode.com/users/${parseInt(idUsuario)}`);
        const datosUser = await usuario.json();
        console.log(datosUser);


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

        // BOTON => VOLVER A LA PAGINA PRINCIPAL
        const volver = document.createElement('button');
        volver.textContent = "Volver";
        volver.style.cursor = 'pointer';
        volver.addEventListener('click', () => {
            document.body.innerHTML = "";
            pintarArticulo(datosArticulo);
        });
        document.body.appendChild(volver);

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
