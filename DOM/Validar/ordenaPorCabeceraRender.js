"use strict";

// Declaramos la clase Empleado
class Empleado {
    #nombre;         
    #apellidos;
    #nacimiento;
    #sueldo;
    #dni;
    #email;

    constructor(nombre, apellidos, nacimiento, sueldo, dni, email) {
        this.#nombre = nombre;
        this.#apellidos = apellidos;
        this.#nacimiento = nacimiento;
        this.#sueldo = sueldo;
        this.#dni = dni;
        this.#email = email;
    }

    render() {
        let fila = document.createElement("tr");
        let tdNombre = document.createElement("td");
        let tdApellido = document.createElement("td");
        let tdNacimiento = document.createElement("td");
        let tdSueldo = document.createElement("td");
        let tdDni = document.createElement("td");
        let tdEmail = document.createElement("td");

        tdNombre.textContent = this.#nombre;
        tdApellido.textContent = this.#apellidos;
        tdNacimiento.textContent = this.#nacimiento;
        tdSueldo.textContent = this.#sueldo;
        tdDni.textContent = this.#dni;
        tdEmail.textContent = this.#email;

        fila.appendChild(tdNombre);
        fila.appendChild(tdApellido);
        fila.appendChild(tdNacimiento);
        fila.appendChild(tdSueldo);
        fila.appendChild(tdDni);
        fila.appendChild(tdEmail);

        return fila;
    }
}

// Creamos un array de empleados
let empleados = [
    new Empleado("Paco", "Fiestas", 1997, 27000, "71954030w", "acbc.d@hotmail.es"),
    new Empleado("Chidas", "Vinto", 1991, 1800, "71954030w", "acbc.d@hotmail.es"),
    new Empleado("Juan", "Cruz", 1998, 700, "71954030w", "acbc.d@hotmail.es"),
    new Empleado("Misty", "Perez", 1990, 3000, "71954030w", "acbc.d@hotmail.es"),
    new Empleado("Joan", "Laporta", 1987, 1200, "71954030w", "acbc.d@hotmail.es"),
    new Empleado("Elsa", "Polindo", 1994, 4500, "71954030w", "acbc.d@hotmail.es"),
    new Empleado("Eulalio", "Fernandez", 1996, 3000, "71954030w", "acbc.d@hotmail.es"),
];

let tabla = document.getElementById("lista-empleados");

// Renderizamos los empleados iniciales en la tabla
empleados.forEach(empleado => {
    let fila = empleado.render();
    tabla.appendChild(fila);
});

// Evento para agregar un nuevo empleado desde el formulario
let boton = document.getElementById("envia_formulario");
boton.addEventListener('click', event => {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value.trim();
    let apellidos = document.getElementById('apellidos').value.trim();
    let nacimiento = document.getElementById('nacimiento').value.trim();
    let sueldo = document.getElementById('sueldo').value.trim();
    let dni = document.getElementById('dni').value.trim();
    let email = document.getElementById('email').value.trim();

    if (!nombre || !apellidos || isNaN(parseInt(nacimiento)) || isNaN(parseFloat(sueldo)) || !validarDNI(dni) || !validarEmail(email)) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    let empleado = new Empleado(nombre, apellidos, nacimiento, sueldo, dni, email);
    empleados.push(empleado);

    let fila = empleado.render();
    tabla.appendChild(fila);
});


function validarDNI(dni) {
    // Array de letras válidas para el DNI
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

    // Comprobamos si el DNI tiene exactamente 8 números seguidos de 1 letra mayúscula
    if (dni.length !== 9 || !/^\d{8}[A-Z]$/.test(dni)) {
        return false; // Formato incorrecto
    }

    // Extraemos los números y la letra del DNI
    const numeros = parseInt(dni.substring(0, 8), 10); // Los primeros 8 caracteres
    const letra = dni.charAt(8); // El último carácter

    // Calculamos la letra que debería corresponder
    const letraCalculada = letras[numeros % 23];

    // Comparamos la letra del DNI con la calculada
    if (letra === letraCalculada) {
        return true; // DNI válido
    } else {
        return false; // DNI inválido
    }
}


function validarEmail(email) {
    // Dividimos el email en partes usando el símbolo @ como separador
    const partes = email.split("@");

    // Verificamos que haya exactamente dos partes (antes y después del @)
    if (partes.length !== 2) {
        return false; // No es válido si no hay un solo @
    }

    // Comprobamos que ambas partes no estén vacías
    const usuario = partes[0]; // Parte antes del @
    const dominio = partes[1]; // Parte después del @
    if (usuario === "" || dominio === "") {
        return false; // No es válido si alguna parte está vacía
    }

    // Verificamos que el dominio contenga al menos un punto
    if (!dominio.includes(".")) {
        return false; // No es válido si no tiene un punto en el dominio
    }

    // Verificamos que el punto no esté al principio o al final del dominio
    if (dominio.startsWith(".") || dominio.endsWith(".")) {
        return false; // No es válido si el punto está mal ubicado
    }

    // Si pasa todas las comprobaciones, es válido
    return true;
}













let clickNombre = 0;
let clickapellidos = 0;
let clickNacimiento = 0;
let clickSueldo = 0;


function ordenaNombre() {
    clickNombre ++;

    if (clickNombre % 2 != 0) {
        empleados.sort((a, b) => {
            if (a.getNombre() > b.getNombre() ) return 1; // Si a.nombre es mayor, coloca b antes
            if (a.getNombre()  < b.getNombre() ) return -1; // Si a.nombre es menor, coloca a antes
            return 0; // Si son iguales, no cambia el orden
        });
    
        tabla.innerHTML = ""; //se vacia el contenido de la casilla pra que no se duplique
    
        empleados.forEach(
            empleado => {
                tabla.innerHTML += empleado.toString();
            }
        );
    }else{
        empleados.reverse();

        tabla.innerHTML = "";

        empleados.forEach(
            empleado => {
                tabla.innerHTML += empleado.toString();
            }
        );
    }
}


function ordenaApellidos() {
    clickapellidos ++;

    if (clickapellidos % 2 != 0) {
        empleados.sort((a, b) =>{
            if (a.getApellidos() > b.getApellidos() ) return 1; // Si a.nombre es mayor, coloca b antes
            if (a.getApellidos()  < b.getApellidos() ) return -1; // Si a.nombre es menor, coloca a antes
            return 0; // Si son iguales, no cambia el orden
        });
    
        tabla.innerHTML = "";
    
        empleados.forEach(
            empleado => {
                tabla.innerHTML += empleado.toString();
            }
        );
    }else{
        empleados.reverse();

        tabla.innerHTML = "";

        empleados.forEach(
            empleado => {
                tabla.innerHTML += empleado.toString();
            }
        );
    }
}


function ordenaAnno() {
    clickNacimiento ++;


    if (clickNacimiento % 2 != 0) {
        empleados.sort((a, b) => a.getNacimiento() - b.getNacimiento());

        tabla.innerHTML = "";
    
        empleados.forEach(
            empleado => {
                tabla.innerHTML += empleado.toString();
            }
        );
    }else{
        empleados.reverse();

        tabla.innerHTML = "";

        empleados.forEach(
            empleado => {
                tabla.innerHTML += empleado.toString();
            }
        )
    }

}


function ordenaSueldo() {
    clickSueldo ++;
    tabla = document.getElementById("lista-empleados");


    if (clickSueldo % 2 != 0) {
        empleados.sort((a, b) => a.getSueldo() -b.getSueldo()); //ordenar  numericamente

        tabla.innerHTML = "";

        empleados.forEach(
            empleado => {
                tabla.innerHTML += empleado.toString();
            }
        )
        
    } else {
        
        empleados.reverse();

        tabla.innerHTML = "";

        empleados.forEach(
            empleado => {
                tabla.innerHTML += empleado.toString();
            }
        );
        
    }
    
}