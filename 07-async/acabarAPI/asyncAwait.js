"use strict";
window.addEventListener("DOMContentLoaded", async () => {
    // Configuración del estilo básico
    document.body.style.margin = "0 5%";
    document.body.style.fontFamily = "sans-serif";

    // OBTENER ARTICULOS EN UN ARRAY
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const datosArticulo = await respuesta.json();

    // PINTAR ARTICULOS
    pintarArticulo(datosArticulo);

    // Función para pintar los artículos
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

            // Obtener y mostrar el autor
            const autorRespuesta = await fetch(`https://jsonplaceholder.typicode.com/users/${articulo.userId}`);
            const autor = await autorRespuesta.json();

            const printAutor = document.createElement("button");
            printAutor.classList.add("printAutor");
            // printAutor.href = `user.html/${autor.id}`;
            printAutor.textContent = autor.name;
            printAutor.target = "_blank"; 
            articuloDiv.appendChild(printAutor);

            // Botón para mostrar comentarios
            const boton = document.createElement("button");
            boton.textContent = "Mostrar Comentarios";
            boton.id = `boton-${articulo.id}`;
            articuloDiv.appendChild(boton);

            // CONTENEDOR COMENTARIOS
            const comentariosDiv = document.createElement("div");
            comentariosDiv.id = `comentarios-${articulo.id}`;
            comentariosDiv.style.display = "none"; // Ocultar inicialmente
            articuloDiv.appendChild(comentariosDiv);

            // Evento para el botón
            boton.addEventListener("click", () =>
                mostrarComentarios(articulo.id, comentariosDiv, boton)
            );

            printAutor.addEventListener("click", async () => {
                window.location.href = `./user.html?id=${articulo.userId}`;
                
                // const usuario = await fetch(`https://jsonplaceholder.typicode.com/users/${autor.id}`);
                // const datosUsuario = await usuario.json();
                // console.log(datosUsuario);
            })

        });
    }

    // Función para mostrar/ocultar comentarios
    async function mostrarComentarios(postId, comentariosDiv, boton) {
        if (comentariosDiv.style.display === "none") {
            // Obtener y mostrar los comentarios
            const respuestaComentarios = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
            );
            const datosComments = await respuestaComentarios.json();
            pintarComentarios(datosComments, comentariosDiv);
            comentariosDiv.style.display = "block";
            boton.textContent = "Ocultar Comentarios";
        } else {
            // Ocultar los comentarios
            comentariosDiv.style.display = "none";
            boton.textContent = "Mostrar Comentarios";
        }
    }

    // Función para pintar los comentarios
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
});
