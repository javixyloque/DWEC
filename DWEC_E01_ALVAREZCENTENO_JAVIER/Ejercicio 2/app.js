"use strict"

function fizzBuzz (n) {
    let strOper = n.toString();
    let strFin = "";

    for (let i = 1; i<=strOper; i++) {
        //Que entre primero a la condicion mas restrictiva (sino entrará en 
        // una de esas condiciones antes de llegar a esta)
        if (i%3==0 && i%5==0) {
            strFin+= "fizzbuzz\n"; 
        } else if (i%3 == 0) {
            strFin += "fizz \n";
        } else if (i%5 == 0) {
            strFin += "buzz \n";
        } else {
            strFin+= i+"\n";
        }
    }
    return strFin;
    
}


// console.log(fizzBuzz(25))