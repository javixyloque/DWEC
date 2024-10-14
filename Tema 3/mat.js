

const matrizIdentidad = () => {
    let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];    
    let nuevoarray = [];
    for (let i = 0; i < arr[0].length; i++) {
        nuevoarray[i] = [];
    }
    
    
    // RECORREMOS CADA ARRAY DE CADA POSICION DE ARRAY
    // Y AL NUEVO LE ASIGNAMOS LA POSICION CONTRARIA
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) { 
            nuevoarray[j][i] = arr[i][j];
        }
    }
    return nuevoarray;
}

// CREACION DEL NUEVO ARRAY CON SUBARRAYS EN POSICION I

console.log(matrizIdentidad());


const eliminarElemento = () => {
    let arr = ["jose", "Ander","Caspio", "Lorena"];
    arr.filter((element) => {
        if( element =="jose") {
            return "";
        } 
        return element;
    })

    return arr;
}
console.log(eliminarElemento());


// OBTENER CUENTA DE LOS ELEMENTOS QUE HAY
let nums = [2,3,2,2] 

for  (let i = 0; i < nums.length; i++) {

}

const repetidos = (nums) => {
    const contObj = {
    }; 

    for (let num of nums) {
        if (contObj[num]!=0) {
            contObj[num]+=1;
        } else {
            contObj[num] = 1;
        }
    }
    return contObj;

}
console.log(repetidos(nums));