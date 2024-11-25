"use strict";

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
        fila.innerHTML = `
            <td>${this.#nombre}</td>
            <td>${this.#apellidos}</td>
            <td>${this.#nacimiento}</td>
            <td>${this.#sueldo}</td>
            <td>${this.#dni}</td>
            <td>${this.#email}</td>
        `;
        return fila;
    }
}

// FORMULARIO
const formulario = document.createElement("form");
formulario.id = "form-empleados";
formulario.innerHTML = `
    <label for="nombre">Nombre:</label>
    <input type="text" name="nombre" id="nombre" placeholder="Introduce el nombre"><br>

    <label for="apellidos">Apellidos:</label>
    <input type="text" name="apellidos" id="apellidos" placeholder="Introduce los apellidos"><br>

    <label for="nacimiento">Año de nacimiento:</label>
    <input type="text" name="nacimiento" id="nacimiento" placeholder="1990"><br>

    <label for="sueldo">Sueldo:</label>
    <input type="text" name="sueldo" id="sueldo" placeholder="3000"><br>

    <label for="dni">DNI:</label>
    <input type="text" name="dni" id="dni" placeholder="12345678A"><br>

    <label for="email">Email:</label>
    <input type="text" name="email" id="email" placeholder="correo@ejemplo.com"><br>
`;
document.body.appendChild(formulario);

// TABLA
const tabla = document.createElement("table");
tabla.innerHTML = `
    <thead>
        <tr>
            <th onclick="ordenaNombre()" style="cursor: pointer;">Nombre</th>
            <th onclick="ordenaApellidos()" style="cursor: pointer;">Apellidos</th>
            <th onclick="ordenaAnno()" style="cursor: pointer;">Año nacimiento</th>
            <th onclick="ordenaSueldo()" style="cursor: pointer;">Sueldo</th>
            <th>DNI</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody id="lista-empleados">
    </tbody>
`;
document.body.appendChild(tabla);

let empleados = [
    new Empleado("Paco", "Fiestas", 1997, 27000, "71954030W", "paco.fiestas@example.com"),
    new Empleado("Elsa", "Polindo", 1994, 4500, "71954030A", "elsa.polindo@example.com"),
];

let listaEmpleados = document.getElementById("lista-empleados");
empleados.forEach(empleado => listaEmpleados.appendChild(empleado.render()));

const campos = ["nombre", "apellidos", "nacimiento", "sueldo", "dni", "email"];
campos.forEach(campo => {

    document.getElementById(campo).addEventListener("blur", function () {
        let valor = this.value.trim();

        if (!valor) {
            alert(`El campo ${campo} no puede estar vacío.`);
            this.style.border = "2px solid red";
            return;
        }
        if (campo === "nacimiento" && !validarFecha(valor)) {
            alert(`El campo ${campo} tiene que tener este formato: DD/MM/YYYY`);
            this.style.border = "2px solid red";
            return;
        }
        if (campo === "dni" && !validarDNI(valor)) {
            alert("El DNI ingresado no es válido.");
            this.style.border = "2px solid red";
            return;
        }
        if (campo === "email" && !validarEmail(valor)) {
            alert("El Email ingresado no es válido.");
            this.style.border = "2px solid red";
            return;
        }
        this.style.border = "2px solid green";
        if (campo === "email") {
            agregarEmpleado();
        }
    });
});

function agregarEmpleado() {
    let [nombre, apellidos, nacimiento, sueldo, dni, email] = campos.map(campo =>
        document.getElementById(campo).value.trim()
    );

    let empleado = new Empleado(nombre, apellidos, nacimiento, sueldo, dni, email);
    empleados.push(empleado);
    listaEmpleados.appendChild(empleado.render());
}

function validarDNI(dni) {
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    if (!/^\d{8}[A-Z]$/.test(dni)) return false;
    const numero = parseInt(dni.slice(0, -1), 10);
    const letra = dni.slice(-1);
    return letras[numero % 23] === letra;
}

function validarEmail(email) {
    const partes = email.split("@");
    if (partes.length !== 2 || !partes[1].includes(".")) return false;
    return !partes[1].startsWith(".") && !partes[1].endsWith(".");
}

function validarFecha(fecha) {
    const fechaReg = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = fecha.match(fechaReg);
    if (!match) return false;

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const anio = parseInt(match[3], 10);

    if (mes < 1 || mes > 12 || dia < 1 || dia > 31) return false;

    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0) {
        diasPorMes[1] = 29;
    }

    return dia <= diasPorMes[mes - 1];
}
