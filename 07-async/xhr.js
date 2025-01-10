"use strict";

document.addEventListener("DOMContentLoaded", () =>{
    let respuesta = {}
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
    xhr.onload = () => {
        console.log(xhr.responseText);
    }

});