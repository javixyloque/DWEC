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
});

// EXPRESION REGULAR

const REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

//^ - PRINCIPIO DEL STRING
//(?=.*[a-z]) - MINIMO UNA MINUSCULA
//(?=.*[A-Z]) - MINIMO UNA MAYUSCULA
//(?=.*\d) - MINIMO UN DIGITO (NUMERO)
//[a-zA-Z\d]{6,} - AL MENOS 6 CARACTERES (LETRAS Y NUMEROS) 
// $ - CONCLUSION DEL STRING

// console.log(REGEXP.test('Abc123')); // true
// console.log(REGEXP.test('Abc123!')); // false
// console.log(REGEXP.test('ABC123!')); // false
// console.log(REGEXP.test('abc123!')); // false
// console.log(REGEXP.test('abc123')); // false


