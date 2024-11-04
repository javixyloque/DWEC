"use strict";

let turnoActual = 0;
let tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const CASILLAS_VALIDAS = ["1","2","3","4","5","6","7","8","9"]
const FICHAS = ["X","O"];

// const FILA_IZQUIERDA = [1,4,7]
// const FILA_DERECHA = [3, 6, 9];
// const DIAGONAL_PRINCIPAL = [1, 5, 9];
// const DIAGONAL_SECUNDARIA = [3, 5, 7];
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
    } 

}

function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent
    return CASILLAS_VALIDAS.includes(contenido);
    
}

function ejecutarTurno (casilla) {
    const numeroCasilla = casilla.id.split("-")[1];
    if (numeroCasilla<=3&&tablero[0][numeroCasilla-1]=='') {
        tablero[0][numeroCasilla-1] = FICHAS[turnoActual%2];
    }else if (numeroCasilla <= 6 && tablero[1][numeroCasilla-4]=='') {
        tablero[1][numeroCasilla-4] = FICHAS[turnoActual%2];
    } else if (numeroCasilla >= 7 && tablero[2][numeroCasilla-7]=='')  {
        tablero[2][numeroCasilla-7] = FICHAS[turnoActual%2];
    }
    casilla.textContent = FICHAS[ turnoActual  %  2  ] ;
    turnoActual++;
}
function comprobarTablero(tablero) {
    // let contador = 0;
    const combinacionesGanadoras = [
        // Pongo estos comentarios pq si no me vuelvo loco 
             // HORIZONTALES
            [tablero[0][0], tablero[0][1], tablero[0][2]],
            [tablero[1][0], tablero[1][1], tablero[1][2]],
            [tablero[2][0], tablero[2][1], tablero[2][2]],
            //DIAGONALES
            [tablero[0][0], tablero[1][1], tablero[2][2]],
            [tablero[2][0], tablero[1][1], tablero[0][2]],
            //VERTICALES
            [tablero[0][0], tablero[1][0], tablero[2][0]],
            [tablero[0][1], tablero[1][1], tablero[2][1]],
            [tablero[0][2], tablero[1][2], tablero[2][2]]
    ]
    

    for (let ganar of combinacionesGanadoras) {
        if (ganar[0]===ganar[1] && ganar[0] === ganar[2] && ganar[0] !== ''){
            victoria =  true;
            return victoria;
        } else {
            victoria = false;
        }
        
    }
    return victoria;
        



    
    
}



function comprobarTablas () {
    if (turnoActual == 9 && !comprobarTablero(tablero)) {
        alert("Empate")
    }
}

function comprobarFinJuego (casilla) {
    const numeroCasilla = casilla.id.split("-")[1];
    console.log(comprobarTablero(tablero));
    

    comprobarTablas();
    console.log(tablero)
    if  (comprobarTablero(tablero)) {
        // VICTORIA
        alert (`Gana el jugador ${FICHAS[ (turnoActual  %  2) -1  ]}`)
    }
    

    if (tablas) {
        alert("Tablas")
    }
}

main();