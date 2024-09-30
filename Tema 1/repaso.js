
// // DEVUELVE LOS NUMEROS PRIMIOS, Y CUANDO UN NUMERO NO ES PRIMO DEVUELVE FALSE
// const esPrimo = primo => {
//     let contador = 0;

//     if (primo<2){
//         return false;
//     }
    
//     for (let i = 1; i<=primo; i++){
//         if (primo%i===0) {
//             contador++;
//         }
//     }
    
//     if (contador>2) {
//         return false;
//     } else {
//         return primo;
//     }
// }

// const deboSumar = () =>  {
//     return esPrimo();
// }

// let suma = 0;
// // FUNCION QUE SUMA TODOS LOS PRIMOS, COMPROBANDO CON LA FUNCION ESPRIMO
// const sumando = param => {
//     for (i = 0; i <= param; i++) {
//         if (esPrimo(i) && i !=1) {     
//             suma += i;
//         }
//     };
//     return suma;
// }


// console.log("La suma es: "+sumando(10));


// DEVUELVE UN BOOLEANO TRUE SI ES DIVISOR DE 3 Y FALSE SI NO LO ES
// EN EL BUCLE DE ARRIBA LLAMAMOS A LA FUNCIÓN DE ABAJO,
// Y COMPROBAMOS SI ES DIVISIBLE
// const sumar = numero => { return (numero%3===0) };


let notas = [["Fulanito", 6, 7, 8],
["Menganito", 7, 3, 5],
["Agapito", 2, 5, 3]];
let media = 0;
const sacarMedia = () => {
    for (let i = 0; i< notas.length; i++) {
        for (let j = 1; j<notas[i].length; j++) {
            media += notas[i][j];
    
        }
        media = media/3;
        console.log(`la media de ${notas[i][0]} es ${media}`)
    }
}



/*
Escribir un programa que genere una matriz unidad de N x N
Matriz unidad es una que tiene por entradas todo 0 salvo
la diagonal, que son 1
*/



const matrizUnidad = (n) => {
    
            let arr = new Array(n);
        for (let i = 0; i < n; i++) {
                arr[i] = new Array(n);
                arr[i].fill(0);
            for (let j = 0; j < n; j++) {
                if (i===j){
                    arr[i][j]+=1;
                } else {
                    arr[i][j]+=0;
                }
            }arr.join("\n");
        }
    
    return arr;
        
}    

    


console.log(matrizUnidad(6));