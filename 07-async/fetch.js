"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let respuesta = {}

    let promesaPost = fetch("https://jsonplaceholder.typicode.com/posts/1");
        
    // SI FUNCIONA EL FETCH HACE ESTO (THEN DO)
    promesaPost.then(res =>{
       res.json();
       
    } )
    .then (json => {
        respuesta.post = json;
        console.log(respuesta);
      })

})