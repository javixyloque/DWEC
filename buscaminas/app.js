"use strict";
let tabla = document.createElement('table');
let fila = document.createElement('tr');
let celda = document.createElement('td'); 
tabla.setAttribute('id','tabla');
tabla.setAttribute('style','border:1px solid; cellspacing: 0');
let formulario = document.getElementById('formulario');



formulario.addEventListener ('submit', comprobar)

function comprobar(e) {
    e.preventDefault();
    let numeroFilas = document.getElementById('size').value.trim(); 
    // let numeroFilas = prompt('TU MATRIZ VA A SER CUADRADA, DIME CUANTAS CELDAS QUIERES POR LADO');
    // console.log(numeroFilas);
    if (!parseInt(numeroFilas)) {
        alert('ESCRIBE UN NUMERO POR LO MENOS NO? Y QUE NO LLEVE LETRAS');
        
    } else {
        pintar(numeroFilas);
    }
}



function pintar(numeroFilas) {
    tabla.innerHTML ="";
    for (let i = 1; i <= numeroFilas; i++) {
        tabla.appendChild(fila);
    }
    let filas = document.querySelectorAll('tr');
    console.log( filas);
    filas.forEach(element => {
        element.appendChild(celda);
        celda.setAttribute("width", "20px");
        
    });
    formulario.append(tabla);
        


}
