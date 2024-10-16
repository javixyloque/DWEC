let tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let ganador;

let turno = 1;
let simbolo = '';
let movimiento;
let pos;
let casilla = undefined;

// alert ("Saludos, jugador, este es el TIC TAC TOE (version alpha para humanos)")




//BUCLE PARA EJECUCION PROGRAMA

while (true){
    
    movimiento = prompt(`Escribe el siguiente movimiento, jugador ${turno}`);
    casilla = document.querySelector('.c'+movimiento);
    actualizar(casilla);
    pos = parseInt(movimiento);
    
    hacerMov(pos);
    if (compruebaTabla(ganador)) {
        alert(`FELICIDADES ${simbolo}, has ganado`)
        break;
        
    }
    console.log(tablero);
    
} 











//  FUNCIONES


function hacerMov (mov)  {
    
    simbolo = turno == 1 ? 'x' : 'o';

        if (mov<=3&&tablero[0][mov-1]=='') {
            tablero[0][mov-1] = simbolo;
        }else if (mov <= 6 && tablero[1][mov-4]=='') {
            tablero[1][mov-4] = simbolo;
        } else if (mov >= 7 && tablero[2][mov-7]=='')  {
            tablero[2][mov-7] = simbolo;
        } else {
            alert('La posicion seleccionada no es valida o ya esta ocupada, pruebe otra vez');
            turno = turno == 1 ? 1 : 2;
            return tablero;
        }        
    
    turno = turno==1 ? 2 : 1; 
    return tablero;
}


function actualizar (casilla) {
    if (turno===1) {
        casilla.setAttribute("style", "background:red"); 
    } else if (turno===2) {
        casilla.setAttribute('style','background: green')
    }
    
    console.log(casilla);
}




function compruebaTabla () {
    ganador = [
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

    // BUCLE QUE RECORRE EL ARRAY DE LAS POSICIONES GANADORAS Y COMPARA
    for (let ganar of ganador) {
        if (ganar[0] != '' && ganar[0]==ganar[1] && ganar[1]==ganar[2]) {
            return true;
        }
    }
    return false;
}





