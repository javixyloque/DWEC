const p1 = "Hola buenas tardes"
const p2 = "Hola buenas noches"

const comparar = (p1, p2) => {
    let contador = 0;
    if (p1.length===p2.length) {
        for (let i = 0; i<p1.length; i++) {
            if (p1[i] ===p2[i])
                contador++;
        }
        return "La distancia Hamming entre las dos frases es: "+(p1.length-contador);
    } else {
        return -1;
    }

}
console.log(comparar(p1, p2))
console.log(comparar("hola", "halo"))