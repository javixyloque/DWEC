"use strict";

// class Empleado {
//     #nombre
//     #apellido
//     #nacimiento
//     #sueldo;

//     constructor(nombre, apellido, nacimiento, sueldo) {
//         this.#nombre = nombre;
//         this.#apellido = apellido;
//         this.#nacimiento = nacimiento;
//         this.#sueldo = sueldo;
//     }

//     toString() {
//         return `<tr> <td class="nombre"> ${this.#nombre}</td> <td class="apellido"> ${this.#apellido}</td> <td class="nacimiento"> ${this.#nacimiento}</td> <td class="sueldo"> ${this.#sueldo}</td></tr>`;
//     }
//     getNombre() {
//         return this.#nombre;
//     }
//     getApellido() {
//         return this.#apellido;
//     }
//     getNacimiento() {
//         return this.#nacimiento;
//     }
//     getSueldo() {
//         return this.#sueldo;
//     }
// }


// let empleados = [
//     new Empleado("John", "Doe", "1985-05-15", 5000),
//     new Empleado("Jane", "Smith", "1990-07-20", 3000),
//     new Empleado("Bob", "Johnson", "1988-12-05", 12098),
//     new Empleado("Alice", "Williams", "1995-03-10", 7500),
//     new Empleado("David", "Brown", "1980-11-25", 4500)
// ];

// let tabla = document.getElementById("tabla-empleados");



// tabla.setAttribute("style", "border:solid 1px black; border-collapse: collapse; align-self:center", );
// tabla.setAttribute("align", "center");

// empleados.forEach(empleado => {
//     tabla.innerHTML += empleado.toString();
// });

// let fila = document.querySelectorAll("td");
// fila.forEach  (fila => {
//     fila.setAttribute("style", "border: solid 1px black; padding: 10px; text-align: center");
// }
// )
// function encabezados () {
//     const encabezado= '<th id="nombre">Nombre</th><th id="apellido">Apellido</th><th id="nacimiento">Nacimiento</th><th id="sueldo">Sueldo</th>';
//     tabla.innerHTML += encabezado;

// }


// function rellenarTabla(matriz) {
//     tabla.innerHTML = '<th id="nombre">Nombre</th><th id="apellido">Apellido</th><th id="nacimiento">Nacimiento</th><th id="sueldo">Sueldo</th>';
    
//     matriz.forEach(empleado => {
//         tabla.innerHTML += empleado.toString();
//     });
//     fila = document.querySelectorAll("td");
//     fila.forEach  (fila => {
//         fila.setAttribute("style", "border: solid 1px black; padding: 10px; text-align: center");
//     }
//     )
// }

// let nombre = document.querySelector("#nombre");
// let apellido = document.querySelector("#apellido");
// let nacimiento = document.querySelector("#nacimiento");
// let sueldo = document.querySelector("#sueldo");



// document.getElementById("nombre").onclick = () => {
//     empleados.sort((a, b) => {a.getNombre().localeCompare(b.getNombre())})
// }

// nombre.addEventListener("click", ()=> {
//     let nuevoArr = empleados.sort((a, b) => {
//         return a.getNombre().localeCompare(b.getNombre());
//     });

//     rellenarTabla(nuevoArr);
// });

// apellido.addEventListener("click", ()=> {
//     let nuevoArr = empleados.sort((a, b) => {
//         return a.getApellido().localeCompare(b.getApellido());
//     });
//     rellenarTabla(nuevoArr);
// });

// nacimiento.addEventListener("click", ()=> {
//     let nuevoArr = empleados.sort((a, b) => {
//         return a.getNacimiento().localeCompare(b.getNacimiento());
//     });
//     rellenarTabla(nuevoArr);
// });



// function filtrarPorNombre(empleados) {

//     let nuevoArr = empleados.sort((a, b) => {
//         return a.nombre.localCompare(b.nombre);
//     });

//     rellenarTabla(nuevoArr);
// }

"use strict";

class Empleado {
    #nombre;
    #apellido;
    #nacimiento;
    #sueldo;

    constructor(nombre, apellido, nacimiento, sueldo) {
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#nacimiento = nacimiento;
        this.#sueldo = sueldo;
    }

    toString() {
        return `<tr> 
            <td class="nombre">${this.#nombre}</td> 
            <td class="apellido">${this.#apellido}</td> 
            <td class="nacimiento">${this.#nacimiento}</td> 
            <td class="sueldo">${this.#sueldo}</td>
        </tr>`;
    }

    getNombre() {
        return this.#nombre;
    }

    getApellido() {
        return this.#apellido;
    }

    getNacimiento() {
        return this.#nacimiento;
    }

    getSueldo() {
        return this.#sueldo;
    }
}

let empleados = [
    new Empleado("John", "Doe", "1985-05-15", 5000),
    new Empleado("Jane", "Smith", "1990-07-20", 3000),
    new Empleado("Bob", "Johnson", "1988-12-05", 12098),
    new Empleado("Alice", "Williams", "1995-03-10", 7500),
    new Empleado("David", "Brown", "1980-11-25", 4500)
];

let tabla = document.getElementById("tabla-empleados");

tabla.setAttribute("style", "border:solid 1px black; border-collapse: collapse; align-self:center;");
tabla.setAttribute("align", "center");

// Crear encabezados una sola vez
function crearEncabezados() {
    tabla.innerHTML = `
        <thead>
            <tr>
                <th id="nombre">Nombre</th>
                <th id="apellido">Apellido</th>
                <th id="nacimiento">Nacimiento</th>
                <th id="sueldo">Sueldo</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    // Asociar eventos a los encabezados
    document.querySelector("#nombre").addEventListener("click", () => {
        empleados.sort((a, b) => a.getNombre().localeCompare(b.getNombre()));
        actualizarFilas();
    });

    document.querySelector("#apellido").addEventListener("click", () => {
        empleados.sort((a, b) => a.getApellido().localeCompare(b.getApellido()));
        actualizarFilas();
    });

    document.querySelector("#nacimiento").addEventListener("click", () => {
        empleados.sort((a, b) => a.getNacimiento().localeCompare(b.getNacimiento()));
        actualizarFilas();
    });

    document.querySelector("#sueldo").addEventListener("click", () => {
        empleados.sort((a, b) => a.getSueldo() - b.getSueldo());
        actualizarFilas();
    });
}

function actualizarFilas() {
    const tbody = tabla.querySelector("tbody");
    tbody.innerHTML = "";

    empleados.forEach(empleado => {
        tbody.innerHTML += empleado.toString();
    });

    const filas = document.querySelectorAll("td");
    filas.forEach(fila => {
        fila.setAttribute("style", "border: solid 1px black; padding: 10px; text-align: center");
    });
}

crearEncabezados();
actualizarFilas();
