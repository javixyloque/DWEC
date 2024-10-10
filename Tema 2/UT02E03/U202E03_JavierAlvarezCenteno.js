"use strict";

const compruebaCuenta = numT => {
    let sum = 0;
    let cadena = numT.toString();
    let temp;

    let arrNums = cadena.split('');
    console.log(arrNums)



    let arrOrd = arrNums.map((element, index) => {
        if (index%2!==0) {
            temp = parseInt(element*2);
            if (temp>=10) {
                temp -= 9;
            }
            sum += temp;
            return temp;
        } else {
            sum+=parseInt(element);
            return parseInt(element);
        }
        
        
    });

    console.log(arrOrd);

    console.log(`La suma total de los numeros de la cuenta es ${sum}`);
    return sum % 10 === 0;

    
}
let numT = 4934311931109585;
    if (compruebaCuenta(numT)) {
        console.log(`El numero de cuenta es valido`);
    } else {
        console.log(`El numero de cuenta no es valido`);
    }



let bool =  compruebaCuenta(numT);
