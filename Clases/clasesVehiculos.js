"use strict"

class Vehiculo {
    // UN ATRIBUTO PRIVADO ES NECESARIO DECLARARLO 
    // ANTES DE USARLO EN EL CONSTRUCTOR
    // AUNQUE NO SE INICIALICEN
    #marca;
    #modelo;
    #color;
    constructor(marca, modelo, color) {
        // CON LA BARRA BAJA INDICAMOS AL PROGRAMADOR QUE
        // ESTA VARIABLE ES, PREFERIBLEMENTE, PRIVADA
    this.#marca = marca;
    this.#modelo = modelo;
    this.#color = color;
    }
    // get marca() {
    //     return this.#marca;
    // }
    // set marca(marca) {
    //     this.#marca = marca;
    // }  
    getMarca() {
        return this.#marca;
    }
    setMarca(marca) {
        this.#marca = marca;
    }
    getModelo() { return this.#modelo; }
    getColor() { return this.#color; }  
}




class Coche extends Vehiculo {
    constructor(marca, modelo, color, puertas) {
        super(marca, modelo, color);
        this.puertas = puertas;
    }
    
    descripcion() {
        console.log(`El ${this.marca} ${this.modelo} es un coche de ${this.puertas} puertas`);
    }

}


class Moto extends Vehiculo {
    constructor(marca, modelo, color, cilindrada) {
        super(marca, modelo, color);
        this.cilindrada = cilindrada;
    }
    
    descripcion() {
        console.log(`La ${this.marca} ${this.modelo} es una delicia con un motor de ${this.cilindrada} cc`);
    }

}

let c1 = new Coche("Citröen", "Saxo", "Rojo", 3);
c1.descripcion();

let m1 = new Moto("Honda", "CBF", "Negro", 650);
m1.descripcion();

c1.marca = "Ford";
c1.descripcion();



