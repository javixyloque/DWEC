"use strict";

let body = document.querySelector("body");
body.setAttribute(
  "style",
  "background-color: #379c7d ; display: flex; flex-direction:column; align-items: center;"
);
let tabla = document.createElement("table");
tabla.setAttribute("style", "border:1px solid; cellspacing: 0;margin: 5%;");
let formulario = document.getElementById("formulario");
formulario.setAttribute(
  "style",
  "display: flex; justify-content: center;flex-direction: column"
);

formulario.addEventListener("submit", comprobar);
let contador = document.createElement("h2");
body.appendChild(contador);

let arrCeldas; // Matriz para celdas
let numeroMinas = 0; // Total de minas

function comprobar(e) {
  e.preventDefault();
  let numeroFilas = document.getElementById("size").value.trim();
  if (!isFinite(numeroFilas) || numeroFilas === "") {
    alert("ESCRIBE UN NÚMERO POR LO MENOS, Y QUE NO LLEVE LETRAS.");
  } else {
    pintar(parseInt(numeroFilas, 10));
  }
}

function pintar(numeroFilas) {
  tabla.innerHTML = "";

  // Crear una matriz bidimensional para almacenar las celdas
  arrCeldas = Array.from({ length: numeroFilas }, () =>
    Array(numeroFilas).fill(null)
  );

  for (let i = 0; i < numeroFilas; i++) {
    let fila = document.createElement("tr");
    for (let j = 0; j < numeroFilas; j++) {
      let celda = document.createElement("td");

      // Añadir mina aleatoria
      if (Math.random() < 0.2) { // 20% probabilidad de mina
        celda.classList.add("mina");
        numeroMinas++;
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

  // Calcular números adyacentes a minas
  calcularNumeros();

  // Añadir eventos a cada celda
  arrCeldas.flat().forEach((celda) => {
    celda.addEventListener("click", revelarCelda);
    celda.addEventListener("contextmenu", marcar);
  });

  formulario.appendChild(tabla);

  // Actualizar marcador inicial
  actualizarMarcador(numeroMinas, 0, contador);
}

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

        // Guardar el número de minas adyacentes como un atributo
        if (minasAdyacentes > 0) {
          arrCeldas[i][j].dataset.numero = minasAdyacentes;
        }
      }
    }
  }
}

function revelarCelda() {
  if (this.classList.contains("mina")) {
    this.setAttribute("style", "background-color: red");
    alert("¡Has perdido!");
    location.reload();
  } else {
    this.setAttribute("style", "background-color: beige");
    this.removeEventListener("click", revelarCelda);

    // Mostrar el número si tiene minas alrededor
    if (this.dataset.numero) {
      this.textContent = this.dataset.numero;
      this.style.fontWeight = "bold";
    }

    // Si no hay minas alrededor, revela las celdas vecinas
    if (!this.dataset.numero) {
      revelarAdyacentes(this);
    }
  }
}

function revelarAdyacentes(celda) {
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
    let imagen = document.createElement('img')
    this.appendChild(imagen);
    imagen.setAttribute("style", 'background-image: url("data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-life-preserver" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m6.43-5.228a7.03 7.03 0 0 1-3.658 3.658l-1.115-2.788a4 4 0 0 0 1.985-1.985zM5.228 14.43a7.03 7.03 0 0 1-3.658-3.658l2.788-1.115a4 4 0 0 0 1.985 1.985zm9.202-9.202-2.788 1.115a4 4 0 0 0-1.985-1.985l1.115-2.788a7.03 7.03 0 0 1 3.658 3.658m-8.087-.87a4 4 0 0 0-1.985 1.985L1.57 5.228A7.03 7.03 0 0 1 5.228 1.57zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>"); background-color: transparent');
  }
  let celdasMarcadas = document.querySelectorAll(".mina.marcada").length;
  actualizarMarcador(numeroMinas, celdasMarcadas, contador);

  if (numeroMinas === celdasMarcadas) {
    alert("¡Has ganado!");
    location.reload();
  }
}

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
