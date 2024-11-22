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

let empleados = [
    new Empleado("Paco", "Fiestas", 1997, 27000, "71954030W", "paco.fiestas@example.com"),
    new Empleado("Elsa", "Polindo", 1994, 4500, "71954030A", "elsa.polindo@example.com"),
];

let tabla = document.getElementById("lista-empleados");
empleados.forEach(empleado => tabla.appendChild(empleado.render()));

const campos = ["nombre", "apellidos", "nacimiento", "sueldo", "dni", "email"];
campos.forEach(campo => {

    document.getElementById(campo).addEventListener("blur", function () {
        let valor = this.value.trim();

        if (!valor) {
            alert(`El campo ${campo} no puede estar vacío.`);
            this.style.border = "2px solid red";
            return;
        }
        if(campo === "nacimiento" && !validarFecha(valor)){
            alert(`el campo ${campo} tiene que tene este formato: DD/MM/YYYY`);
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
    tabla.appendChild(empleado.render());
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
    // Expresión regular para el formato DD/MM/YYYY
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    // Verificar si la fecha coincide con el formato
    const match = fecha.match(regex);
    if (!match) {
        return false; // No cumple con el formato
    }

    // Extraer día, mes y año
    const dia = parseInt(match[1], 10); // Primer grupo
    const mes = parseInt(match[2], 10); // Segundo grupo
    const anio = parseInt(match[3], 10); // Tercer grupo

    // Validar rango del día y mes
    if (mes < 1 || mes > 12 || dia < 1 || dia > 31) {
        return false;
    }

    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0) {
        diasPorMes[1] = 29; // Febrero tiene 29 días en años bisiestos
    }

    // Validar que el día no exceda el máximo permitido para el mes
    if (dia > diasPorMes[mes - 1]) {
        return false;
    }
    
    return true;
}