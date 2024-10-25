"use strict";

let turnoActual = 0;
const CASILLAS_VALIDAS = ["1","2","3","4","5","6","7","8","9"]
const FICHAS = ["X","O"];
const combinacionesGanadoras = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
]
const FILA_IZQUIERDA = [1,4,7]
const FILA_DERECHA = [3, 6, 9];
const DIAGONAL_PRINCIPAL = [1, 5, 9];
const DIAGONAL_SECUNDARIA = [3, 5, 7];
let victoria = false;
let tablas = false;


function main() {
    for (let i = 1; i<=9; i++) {
        let casilla = document.getElementById(`casilla-${i}`);
        casilla.addEventListener("click", casillaOnClick);
    }
    

    
};

function casillaOnClick (e) {

    let casilla = e.target;

    if (comprobarCasillaValida(casilla)) {
        ejecutarTurno(casilla);
        comprobarFinJuego(casilla);
    } else {

    }

}

function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent
    return CASILLAS_VALIDAS.includes(contenido);
    
}

function ejecutarTurno (casilla) {
    const numeroCasilla = casilla.textContent; 
    casilla.textContent = FICHAS[ turnoActual  %  2  ] ;
    turnoActual++;
}
function comprobarTablero(numeroCasilla, casilla) {
    // let contador = 0;
    const letraAct = FICHAS[turnoActual%2];
    // NECESITARIA HACER UN TABLERO APARTE PARA HACER ESTO :')
    for (let ganar of combinacionesGanadoras) {
        victoria = ganar.every((i) => FICHAS[turnoActual%2] == casilla.textContent && numeroCasilla==i);
    }
        
    console.log(victoria);


    //     if (FICHAS[turno]) {

    //     }
    
    return victoria;
}



function comprobarTablas (casilla) {
    if (turnoActual ==9&&!victoria) {
        alert("Empate")
    }
}
function comprobarFinJuego (casilla) {
    const numeroCasilla = casilla.id.split("-")[1];
    comprobarTablero(numeroCasilla, casilla)
    // comprobarVertical(numeroCasilla);
    // if (DIAGONAL_SECUNDARIA.includes(numeroCasilla)) {
    //     comprobarDiagonalPrincipal`numeroCasilla`;
    // }
    // if (DIAGONAL_SECUNDARIA.includes(numeroCasilla)) {
    //     comprobarDiagonalSecundaria(numeroCasilla);
    // }

    comprobarTablas(casilla);

    if  (victoria) {
        //EMPATE
        alert (`Gana el jugador ${FICHAS[ turnoActual  %  2  ]}`)
    }
    

    if (tablas) {
        alert("Tablas")
    }
}

main();