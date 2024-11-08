"use strict";



function factorizar(num) {
    
    let arrNums = [];
    let numero;
    let contador = 1;
    for (let p = 0; p < num; p++) {
        if (num%p == 0 && esPrimo(p)) {
            while (num%p != 0) {
                arrNums.push(p);
                numero= num/p;
            }
            
            
        } 
        for (let i in arrNums) {
            contador = contador * i;
            if (contador >=num) {
                return arrNums;
            } else {
                factorizar(numero);
            }
        }
        
    }
    
    return arrNums;
    
    // if (esPrimo(num)) {
    //     arrNums.push(num);
    // } else {
    //     if (numero = undefined) {
    //         numero = dividir(num);
    //         return;
    //     }
    // }

    
    

    
}


function esPrimo(primo) {
    let contador = 0;

    if (primo<2){
        return false;
    }
    
    for (let i = 1; i<=primo; i++){
        if (primo%i===0) {
            contador++;
        }
    }
    
    if (contador>2) {
        return false;
    } else {
        return primo;
    }
}



console.log(factorizar(1970));
console.log(factorizar(99));
console.log(factorizar(16));

