// UT03E01: Contar elementos repetidos de un array
/* Escribe una función repetidos() que tome un array y devuelva otro array especificando el número de veces que se repite cada elemento del primer array.

Por ejemplo:
Si la entrada es [2, 3, 2, 2] la salida debe ser [3, 1]
Si la entrada es [1, 1, 1] la salida debe ser [3]
Si la entrada es [2, 3, 3, 2] la salida debe ser [2, 2]
Entregar como enlace al repositorio en Github.*/
let nums = [2,3,2,2] 

for  (let i = 0; i < nums.length; i++) {

}

const repetidos = (nums) => {
    let counts = [];
    let contados = [];
    for (let num of nums) {
        if (contados.includes(num) === false) {
            let contInd = 0;
            for (let numero of nums) {
                if (numero == num) {
                    contInd++;
                } 
            }
        counts.push(contInd);
        contados.push(num)
        }
    }
    return counts;
}

console.log(repetidos(nums));