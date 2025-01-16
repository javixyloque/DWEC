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
            const printAutor = document.createElement("a");
            printAutor.classList.add("printAutor");
            printAutor.href = `./user.html?id=${autor.id}`;
            printAutor.textContent = autor.name;
            printAutor.target = "_blank"; 
            articuloDiv.appendChild(printAutor);

            // BOTÓN => MOSTRAR COMENTARIOS
            const boton = document.createElement("button");
            boton.textContent = "Mostrar Comentarios";
            boton.id = `boton-${articulo.id}`;
            articuloDiv.appendChild(boton);

            // CONTENEDOR COMENTARIOS
            const comentariosDiv = document.createElement("div");
            comentariosDiv.id = `comentarios-${articulo.id}`;
            comentariosDiv.style.display = "none"; // Ocultar inicialmente
            articuloDiv.appendChild(comentariosDiv);

            // EVENTO BOTÓN
            boton.addEventListener("click", () =>
                mostrarComentarios(articulo.id, comentariosDiv, boton)
            );

            

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
});
