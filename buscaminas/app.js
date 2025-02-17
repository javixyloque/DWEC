"use strict";

let body = document.querySelector("body");
body.setAttribute("style", "background-color: #379c7d ; display: flex; flex-direction:column; align-items: center;");
let tabla = document.createElement("table");
tabla.setAttribute("style", "border:1px solid; cellspacing: 0;margin: 5%;");
let formulario = document.getElementById("formulario");
formulario.setAttribute("style","display: flex; justify-content: center;flex-direction: column");

formulario.addEventListener("submit", comprobar);
let contador = document.createElement("h2");
body.appendChild(contador);

let arrCeldas; 
let numeroMinas = 0; 

function comprobar(e) {
  e.preventDefault();
  let numeroFilas = document.getElementById("size").value.trim();
  if (!isFinite(numeroFilas) || numeroFilas === "") {
    alert("ESCRIBE UN NÚMERO POR LO MENOS, Y QUE NO LLEVE LETRAS.");
  } else {
    pintar(parseInt(numeroFilas, 10));
  }
}

/**
 * @description Pinta la tabla de juego con las celdas y las minas, y las guarda en un array bidimensional.
 * @param {number} numeroFilas 
 */
function pintar(numeroFilas) {
  tabla.innerHTML = "";

  // CREAR ARRAY BIDIMENSIONAL CON CELDAS VACÍAS (ES NECESARIO CREARLO ANTES DE LOS BUCLES PARA AÑADIR LOS DATOS)
  arrCeldas = new Array(numeroFilas).fill(null).map(() => new Array(numeroFilas).fill(null));

  // BUCLE FILAS
  for (let i = 0; i < numeroFilas; i++) {
    let fila = document.createElement("tr");
    // BUCLE COLUMNAS
    for (let j = 0; j < numeroFilas; j++) {
      let celda = document.createElement("td");

      // MINAS ALEATORIAS (20%)
      if (Math.random() < 0.2) {
        celda.classList.add("mina");
        numeroMinas++;
      }

      celda.setAttribute("style","border: 1px solid; text-align: center; width: 50px; height: 50px; border-collapse: collapse");

      fila.appendChild(celda);
      arrCeldas[i][j] = celda; // GUARDA LA CELDA EN EL ARRAY DE CELDAS
    }
    tabla.appendChild(fila);
  }

  // CALCULAR NUMERO DE MINAS ALREDEDOR
  calcularNumeros();

  // AÑADIR EVENTO A CADA CELDA. FLAT() PARA PODER RECORRER EL ARRAY EN UN SOLO BUCLE
  arrCeldas.flat().forEach((celda) => {
    celda.addEventListener("click", pisar);
    celda.addEventListener("contextmenu", marcar);
  });

  formulario.appendChild(tabla);

  // ACTUALIZAR CONTADOR DE MINAS
  actualizarMarcador(numeroMinas, 0, contador);
}


/**
 * @description Calcula el número de minas en una celda y lo guarda en el dataset de la etiqueta HTML
 * 
 */
function calcularNumeros() {
  const direcciones = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  for (let i = 0; i < arrCeldas.length; i++) {
    for (let j = 0; j < arrCeldas[i].length; j++) {
      if (!arrCeldas[i][j].classList.contains("mina")) {
        let minasAdyacentes = 0;

        direcciones.forEach(([dx, dy]) => {
          const x = i + dx;
          const y = j + dy;

          if (
            x >= 0 &&
            y >= 0 &&
            x < arrCeldas.length &&
            y < arrCeldas[i].length &&
            arrCeldas[x][y].classList.contains("mina")
          ) {
            minasAdyacentes++;
          }
        });

        // GUARDA EL NUMERO DE MINAS ADYACENTES EN EL DATASET DE LA PROPIA ETIQUETA HTML
        if (minasAdyacentes > 0) {
          arrCeldas[i][j].dataset.numero = minasAdyacentes;
        }
      }
    }
  }
}

function pisar() {
  if (this.classList.contains("mina")) {
    this.setAttribute("style", "background-color: red");
    alert("¡Has perdido!");
    location.reload();
  } else {
    this.setAttribute("style", "background-color: beige");
    this.removeEventListener("click", pisar);

    // SI TIENE MINAS ALREDEDOR, MUESTRA EL NUMERO
    if (this.dataset.numero) {
      this.textContent = this.dataset.numero;
      this.style.fontWeight = "bold";
    }

    // SI NO HAY MINAS ALREDEDOR, REVELA LAS CELDAS QUE RODEAN
    if (!this.dataset.numero) {
      revelarLados(this);
    }
  }
}

function revelarLados(celda) {
  const direcciones = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  let fila = Array.from(tabla.children).indexOf(celda.parentElement);
  let columna = Array.from(celda.parentElement.children).indexOf(celda);

  direcciones.forEach(([dx, dy]) => {
    const x = fila + dx;
    const y = columna + dy;

    if (
      x >= 0 &&
      y >= 0 &&
      x < arrCeldas.length &&
      y < arrCeldas[x].length
    ) {
      let vecina = arrCeldas[x][y];
      if (!vecina.classList.contains("mina") && vecina.style.backgroundColor !== "beige") {
        vecina.click(); // Simula un clic para revelar
      }
    }
  });
}

function marcar(e) {
  e.preventDefault();
  this.classList.toggle("marcada");
    if (this.classList.contains("marcada")) {
        let imagen = document.createElement("img");
        imagen.src ="data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001"/></svg>`);
        imagen.style.width = "16px";
        imagen.style.height = "16px";
        this.appendChild(imagen);
    } else {
    // Si desmarcas, elimina el contenido de la celda
    this.innerHTML = "";
  }
  let celdasMarcadas = document.querySelectorAll(".mina.marcada").length;
  actualizarMarcador(numeroMinas, celdasMarcadas, contador);

  if (numeroMinas === celdasMarcadas) {
    alert("¡Has ganado!");
    location.reload();
  }
}



/**
 * 
 * @param {*} minas 
 * @param {*} celdasMarcadas 
 * @param {*} contador 
 */

function actualizarMarcador(minas, celdasMarcadas, contador) {
  contador.textContent = "";
  contador.setAttribute(
    "style",
    "text-align: center; margin-top: 20px; font-size: 24px; font-family: system-ui"
  );
  contador.innerHTML =
    "Marcadas: " +
    celdasMarcadas +
    "<br>" +
    "Restantes: " +
    (minas - celdasMarcadas) +
    "<br>";
}
