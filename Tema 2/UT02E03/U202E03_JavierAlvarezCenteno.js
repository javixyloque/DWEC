"use strict";

const compruebaCuenta = numT => {
    let sum = 0;
    let cadena = numT.toString();
    let temp;

    let arrNums = cadena.split('');
    console.log(arrNums)


    // DE VERDAD QUE NO SE ME OCURRIA OTRA FORMA DE HACERLO,
    // CON FOREACH NO ME DEJABA HACERLO

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

    let numT = 4532015112830366;
    if (sum % 10 === 0) {
        console.log(`El numero de cuenta ${numT} es valido`);
    } else {
        console.log(`El numero de cuenta ${numT} no es valido`);
    }
}



compruebaCuenta(numT);
