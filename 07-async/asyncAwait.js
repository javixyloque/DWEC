"use strict";
window.addEventListener("DOMContentLoaded", async () => {
    // Configuración del estilo básico
    document.body.style.margin = '0 5%';
    document.body.style.fontFamily = 'sans-serif';

    // OBTENER ARTICULOS EN UN ARRAY
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const datosArticulo = await respuesta.json();

    // PINTAR ARTICULOS
    pintarArticulo(datosArticulo);

    // Función para pintar los artículos
    async function pintarArticulo(datos) {
        datos.forEach( async articulo => {

            const articuloDiv = document.createElement('div');
            document.body.appendChild(articuloDiv);

            const tituloArticulo = document.createElement("h1");
            articuloDiv.appendChild(tituloArticulo);
            tituloArticulo.textContent = articulo.title;

            const bodyArticulo = document.createElement("p");
            bodyArticulo.textContent = articulo.body;
            articuloDiv.appendChild(bodyArticulo);


            const autor = await fetch (`https://jsonplaceholder.typicode.com/users/${articulo.userId}`);
            const printAutor = document.createElement('p');
            articuloDiv.appendChild(printAutor);
            autor.textContent = autor.name;

            const boton = document.createElement("button");
            boton.textContent = "Mostrar Comentarios";
            boton.id = articulo.id;
            articuloDiv.appendChild(boton);

            // Crear un contenedor para los comentarios
            const comentariosDiv = document.createElement("div");
            comentariosDiv.id = `comentarios-${articulo.id}`;
            articuloDiv.appendChild(comentariosDiv);

            // Asociar el evento del botón con la función de mostrar comentarios
            document.addEventListener ('click', () => mostrarComentarios(articulo.id, comentariosDiv));
        })
    };

    // MOSTRAR LOS COMENTARIOS
    async function mostrarComentarios(postId, comentariosDiv) {
        // Verificar si ya se han mostrado los comentarios
        const respuestaComentarios = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const datosComments = await respuestaComentarios.json();
            //SI NO ESTAN ACTIVOS ACTIVA LA DISPLAY
        if (comentariosDiv.style.display != "none") {
            comentariosDiv.style.display = "none";
        } else {
                
            pintarComentarios(datosComments, comentariosDiv);
        }

        
    }

    // PINTAR LOS COMENTARIOS (SIN QUE SE VEAN)
    function pintarComentarios(datos, comentariosDiv) {
        datos.forEach(comentario => {
            const tituloComentario = document.createElement("h3");
            tituloComentario.textContent = comentario.name;
            comentariosDiv.appendChild(tituloComentario);

            const cuerpoComentario = document.createElement("p");
            cuerpoComentario.textContent = comentario.body;
            comentariosDiv.appendChild(cuerpoComentario);
            comentariosDiv.style.display = "block";
        });
    }


});










