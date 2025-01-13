// window.addEventListener("DOMContentLoaded", async () => {
//     // Configuración del estilo básico
//     document.body.style.margin = '0 5%';
//     document.body.style.fontFamily = 'sans-serif';

//     // Obtener los artículos
//     const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/");
//     const datosArticulo = await respuesta.json();
//     // Pintar el artículo
//     pintarArticulo(datosArticulo);

//     // Función para pintar los artículos
//     async function pintarArticulo(datos) {
//        datos.forEach(articulo => {
//             const articuloDiv = document.createElement('div');
//             document.body.appendChild(articuloDiv);

//             const tituloArticulo = document.createElement("h1");
//             articuloDiv.appendChild(tituloArticulo);
//             tituloArticulo.textContent = articulo.title;

//             const bodyArticulo = document.createElement("p");
//             bodyArticulo.textContent = articulo.body;
//             articuloDiv.appendChild(bodyArticulo);

//             const boton = document.createElement("button");
//             boton.textContent = "Mostrar Comentarios";
//             boton.id = articulo.id;
//             articuloDiv.appendChild(boton);

//             // Crear un contenedor para los comentarios
//             const comentariosDiv = document.createElement("div");
//             comentariosDiv.id = `comentarios-${articulo.id}`;
//             articuloDiv.appendChild(comentariosDiv);

//             // Asociar el evento del botón con la función de mostrar comentarios
//             document.addEventListener ('click', () => mostrarComentarios(articulo.id, comentariosDiv));
//         }
//     });

//     // Función para mostrar los comentarios
//     async function mostrarComentarios(postId, comentariosDiv) {
//         // Verificar si ya se han mostrado los comentarios
//         const respuestaComentarios = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
//             const datosComments = await respuestaComentarios.json();
//             //SI NO ESTAN ACTIVOS ACTIVA LA DISPLAY
//         if (comentariosDiv.style.display != "none") {
//             comentariosDiv.style.display = "none";
//         } else {
                
//             pintarComentarios(datosComments, comentariosDiv);
//         }

        
//     }

//     // Función para pintar los comentarios
//     function pintarComentarios(datos, comentariosDiv) {
//         datos.forEach(comentario => {
//             const tituloComentario = document.createElement("h3");
//             tituloComentario.textContent = comentario.name;
//             comentariosDiv.appendChild(tituloComentario);

//             const cuerpoComentario = document.createElement("p");
//             cuerpoComentario.textContent = comentario.body;
//             comentariosDiv.appendChild(cuerpoComentario);
//             comentariosDiv.style.display = "block";
//         });
//     }


// });




window.addEventListener("DOMContentLoaded", () => {
    // Configuración del estilo básico
    document.body.style.margin = '0 5%';
    document.body.style.fontFamily = 'sans-serif';

    // Obtener los artículos
    fetch("https://jsonplaceholder.typicode.com/posts/")
        .then(respuesta => respuesta.json())
        .then(datosArticulo => {
            // Pintar el artículo
            pintarArticulo(datosArticulo);
        })
        .catch(error => {
            console.error("Error al obtener los artículos:", error);
        });

    // Función para pintar los artículos
    function pintarArticulo(datos) {
        datos.forEach(articulo => {
            const articuloDiv = document.createElement('div');
            document.body.appendChild(articuloDiv);

            const tituloArticulo = document.createElement("h1");
            articuloDiv.appendChild(tituloArticulo);
            tituloArticulo.textContent = articulo.title;

            const bodyArticulo = document.createElement("p");
            bodyArticulo.textContent = articulo.body;
            articuloDiv.appendChild(bodyArticulo);

            const boton = document.createElement("button");
            boton.textContent = "Mostrar Comentarios";
            boton.id = articulo.id;
            articuloDiv.appendChild(boton);

            // Crear un contenedor para los comentarios
            const comentariosDiv = document.createElement("div");
            comentariosDiv.id = `comentarios-${articulo.id}`;
            articuloDiv.appendChild(comentariosDiv);

            // Asociar el evento del botón con la función de mostrar comentarios
            boton.addEventListener('click', () => mostrarComentarios(articulo.id, comentariosDiv));
        });
    }

    // Función para mostrar los comentarios
    function mostrarComentarios(postId, comentariosDiv) {
        // Verificar si ya se han mostrado los comentarios
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(respuestaComentarios => respuestaComentarios.json())
            .then(datosComments => {
                // Si no están visibles, los muestra
                if (comentariosDiv.style.display !== "none") {
                    comentariosDiv.style.display = "none";
                } else {
                    pintarComentarios(datosComments, comentariosDiv);
                }
            })
    }

    // Función para pintar los comentarios
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

    // Función para quitar los comentarios (si lo deseas)
    function quitarComentarios(comentariosDiv) {
        comentariosDiv.style.display = "none";
    }
});





