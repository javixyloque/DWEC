let tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let ganador = [
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

let turno = 1;


// alert ("Saludos, jugador, este es el TIC TAC TOE (version alpha para humanos)")




//BUCLE PARA EJECUCION PROGRAMA

while (compruebaTabla(ganador)) {
    let movimiento = parseInt(5);
    hacerMov(movimiento);
    console.log(tablero)
}








//  FUNCIONES


function hacerMov (mov)  {
    
    let simbolo = turno == 1 ? 'x' : 'o';

        if (mov<=3&&tablero[0][mov-1]=='') {
            tablero[0][mov-1] = simbolo;
        }else if (mov <= 6 && tablero[1][mov-4]=='') {
            tablero[1][mov-4] = simbolo;
        } else if (mov >= 7 && tablero[2][mov-7]=='')  {
            tablero[2][mov-7] = simbolo;
        }         
    
    turno = turno==1 ? 2 : 1; 
    return tablero;
}

function compruebaTabla (combis) {
    for (let ganar of combis) {
        if (ganar[0] !== '' && ganar[0]===ganar[1] && ganar[0]===ganar[2]) {
            return false;
        }
    }
    return true;
}





