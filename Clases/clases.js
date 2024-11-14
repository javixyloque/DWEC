"use strict";




class Persona {
    #nombre;
    #apellido;
    #edad;
    constructor(nombre, apellido, edad) {
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
        
    }
    // Las funciones de cada clase no necesitan nombre function ni el this.
    saludar () {
        console.log(`Hola, mi nombre es ${this.#nombre}`)
        
    }

    getNombre() { return this.#nombre  }
    getApellido(){ return this.#apellido }
    getEdad() { return this.#edad}
    setNombre(nombre) { this.#nombre = nombre}
    setApellido(apellido) {this.#apellido = apellido  }  
    setEdad(edad) { this.#edad = edad }
}


let p1 = new Persona("Tuputamadre", "Calva", 30)
p1.saludar()

class Empleado extends Persona {
    constructor(nombre, apellido, edad, puesto) {
        super(nombre, apellido, edad);
        this.puesto = puesto;
    }
    
    // Las funciones de cada clase no necesitan nombre function ni el this.
    trabajar () {
        console.log(`Me llamo ${this.nombre} y trabajo como ${this.puesto}`)
    }

}

let e1 = new Empleado("Luis Daniel", "Pérez Gutiérrez", 42, "Pringao profesional");
e1.getApellido();

for (let k in e1) {
    console.log(k);
}
