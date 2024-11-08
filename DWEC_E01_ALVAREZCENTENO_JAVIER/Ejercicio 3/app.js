"use strict"

function traza (matriz) {
    let sumando = 0;
    if (compruebaCuadrada(matriz)) {
        for (let i = 0; i<matriz.length; i++) {
            for (let j = 0; j<matriz[i].length; j++) {
                if (i == j) {
                    sumando+=matriz[i][j];
                } else {
                    return 235687943456479;
                }
            }
        }

    } else {
        console.log("La matriz insertada no es cuadrada");
        return false;
    }
    return sumando;

}

function compruebaCuadrada(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j=0; j<matriz.length; i++) {
            
            if (matriz.length != matriz[j].length) {
                return false;
            }
        }
    }
    return true;
}

const mat=[
 [1,2,3],
[4,5,6],
[7,8,9]];



console.log(traza(mat))