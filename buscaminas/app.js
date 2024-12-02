"use strict";
let body = document.querySelector("body");
body.setAttribute('style', 'background-color: #379c7d ; display: flex; flex-direction:column; align-items: center;');
let tabla = document.createElement('table');
tabla.setAttribute('style','border:1px solid; cellspacing: 0;margin: 5%');
let formulario = document.getElementById('formulario');
formulario.setAttribute('style', 'display: flex; justify-content: center;flex-direction: column');


formulario.addEventListener ('submit', comprobar)
let contador = document.createElement('h2');
let minas = document.querySelectorAll('.mina').length;
let celdasMarcadas = document.querySelectorAll('.mina.marcada').length;
body.appendChild(contador);

function comprobar(e) {
    e.preventDefault();
    let numeroFilas = document.getElementById('size').value.trim(); 
    if (!isFinite(numeroFilas) || numeroFilas == '') {
        alert('ESCRIBE UN NUMERO POR LO MENOS NO? Y QUE NO LLEVE LETRAS');
    } else {
        pintar(numeroFilas);
    }
}


function pintar(numeroFilas) {
    tabla.innerHTML = "";

    // Crear una matriz bidimensional para almacenar las celdas
    let arrCeldas = Array.from({ length: numeroFilas }, () => []);

    for (let i = 0; i < numeroFilas; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < numeroFilas; j++) {
        let celda = document.createElement("td");

        // Añadir mina aleatoria
        if (Math.random() < 0.2) { // 20% de probabilidad de mina
            celda.classList.add("mina");
        }

        celda.setAttribute(
            "style",
            "border: 1px solid; text-align: center; width: 50px; height: 50px; border-collapse: collapse"
        );

        fila.appendChild(celda);
        arrCeldas[i][j] = celda; // Guardar la celda en la matriz
        }
        tabla.appendChild(fila);
    }

    // Añadir eventos a cada celda
    arrCeldas.flat().forEach((celda) => {
        celda.addEventListener("click", minar);
        celda.addEventListener("contextmenu", marcar);
    });

    formulario.appendChild(tabla);

    // Actualizar marcador inicial
    let minas = document.querySelectorAll(".mina").length;
    let celdasMarcadas = document.querySelectorAll(".mina.marcada").length;
    actualizarMarcador(minas, celdasMarcadas, contador);
}
  
function minar() {
    if (this.classList.contains("mina")) {
        this.setAttribute("style", "background-color: red");
        alert("¡Has perdido!");
        location.reload();
    } else {
        this.setAttribute("style", "background-color: beige");
        this.removeEventListener("click", minar);
        let contador = 0;
        


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // for (let i  = 0 ; i<; i++) {
        //     for (let j = 0; j < arrCeldas[i].length; j++) {
        //         if (arrCeldas[i][j].classList.contains("mina")) {
        //             contador++;
        //         }
        //     }
        // }
    }
}

// function pintar(numeroFilas) {
//     tabla.innerHTML ="";
//     let arrCeldas = new Array(numeroFilas);
    
//     for (let i = 1; i <= numeroFilas; i++) {
//         let fila = document.createElement('tr');
//         arrCeldas[i] = new Array(numeroFilas);
//         let numMinas = Math.floor(Math.random()*numeroFilas);
//         for (let j  = 0; j < numeroFilas; j++) {
            
//             let celda = document.createElement('td');
//             if (numMinas % i == 0) {
//                 celda.setAttribute("class", "mina");
//             }
            
//             celda.setAttribute("style", "border: 1px solid; text-align: center; width: 50px; height: 50px; border-collapse: collapse");
//             fila.appendChild(celda);
//             arrCeldas[i][j] = celda;
//         }
//         tabla.appendChild(fila);
//     }

//     arrCeldas.forEach(celda => {
//         celda.addEventListener('click', minar);
//     });
//     arrCeldas.forEach(celda =>{ 
//         celda.addEventListener('contextmenu', marcar);
//     })
    
//     formulario.appendChild(tabla);
//     console.log(arrCeldas);
//     minas = document.querySelectorAll('.mina').length;
//     celdasMarcadas = document.querySelectorAll('.mina.marcada').length;
//     actualizarMarcador(minas, celdasMarcadas, contador);
//     if (minas === celdasMarcadas) {
//         alert('Has ganado!');
//         location.reload();
//     }
        
// }




// function minar() {

//     //SI LA CASILLA TIENE MINA, REINICIAR EL JUEGO
//     if (this.classList.contains('mina')) {
//         this.setAttribute("style", "background-color: red"); 
//         alert('Has perdido!');
//         location.reload();
//     } else {
//         this.setAttribute("style", "background-color: beige"); 
//         this.removeEventListener('click', minar);
        
                
//     }
// }


function marcar(e) {
    e.preventDefault();
    this.classList.toggle('marcada');
    // actualizarMarcador(minas, celdasMarcadas, contador);
    this.removeEventListener('click', minar);
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16"><path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001"/></svg>';
}

function actualizarMarcador(minas, celdasMarcadas, contador) {
    contador.textContent = '';
    console.log(minas)
    console.log(celdasMarcadas)
    contador.setAttribute('style', 'text-align: center; margin-top: 20px; font-size: 24px; font-family: system-ui');
    contador.innerHTML = 'Marcadas: '+ celdasMarcadas+"<br>"+"Restantes: "+(minas-celdasMarcadas)+"<br>";

    
}