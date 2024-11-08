"use strict"

function esBisiesto(anio) {
    if (anio < 0 ) {
        // Chequea que el usuario no haya puesto un menos.
        console.log( "El año que has dado no existe crack");
        return false;
    } else {
        //condicionales (al final solo son 3 condiciones como para usar un switch)
        if (anio%4==0 && anio%100!=0) {
            return true;
        } else if (anio%100 == 0) {
            if (anio%400==0) {
                return true;
            }
        }
    }
    return false;
}

console.log(esBisiesto(2000))