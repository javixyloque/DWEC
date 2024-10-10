

let arr = [[1,2,3], [4, 5, 6], [7, 8, 9]];

let nuevoarray = [];

for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr[i].length; i++) {
        if (i == j) {
            nuevoarray.push(arr[i][j]);
        }
    }
    
}
console.log(nuevoarray);

