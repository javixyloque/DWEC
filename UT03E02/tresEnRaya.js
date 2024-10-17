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
            pos = parseInt(movimiento);
            casilla = document.querySelector('.c'+movimiento);
            if (hacerMov(pos)) {
                
                    actualizar(casilla);
                    // FORZAR REFLUJO DEL DOM SISGUE SIN FUNCIONAR
                    casilla.offsetHeight;
                if (compruebaTabla(ganador)) {
                    alert(`FELICIDADES ${simbolo}, has ganado`)
                    break;
                    
                } 
            } else {
                continue;
            };

            turno = turno==1 ? 2 : 1;
        
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
            
            return false;
        }        
    return true;
}


function actualizar (casilla) {

    casilla.style.fontSize = 'large';
    casilla.style.textAlign = 'center';
    casilla.textContent = simbolo;
    

    if (turno === 1) {
        casilla.style.backgroundColor = "red";
    } else {
        casilla.style.backgroundColor = "green";
    }
    
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
    let contadorEmpate = 0;
    for (let fila of tablero) {
        if (fila[0] !== '' && fila[1] !== '' && fila[2] !== '') {
            contadorEmpate++;

        }
        
    }
    console.log(contadorEmpate)
    if (contadorEmpate===3) {
        alert("Esto es un empate tecnico, vaya dos patas pa un banco");
        location.reload();
    }
    return false;
}





