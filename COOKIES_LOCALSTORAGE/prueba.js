"use strict";

document.addEventListener('DOMContentLoaded', () => {
   

    localStorage.setItem("persona", "Angelillo");
    let persona = localStorage.getItem("persona");
    console.log(persona);
    sessionStorage.setItem("Sesión", "guajín");
    
    let sesion = sessionStorage.getItem("Sesión"); // METEMOS A "SESIÓN": "JUANOLO" EN UN OBJETO 
    console.log(sesion); // DEVUELVE JUANOLO
    let body = document.querySelector('body');
    let div = document.createElement('div');
    body.appendChild(div);
    body.setAttribute('style', 'display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #190933; transition: background-color 1s ease-in-out');
    div.setAttribute('style', 'color: #F5F0F6; font-size: 24px; font-family: sans-serif; text-align: center; justify-self: center');
    div.textContent = `Saludos, ${sesion}`;

    // div.textContent = sessionStorage.getItem("Sesión");
})


