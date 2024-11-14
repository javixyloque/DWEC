"use strict";

// Vehiculo
function Vehiculo (marca, matricula, potencia) {
    this.marca = marca;
    this.matricula = matricula;
    this.potencia = potencia;
}

// Moto
function Moto (marca, matricula, potencia, cilindrada) {
    Vehiculo.call(this,marca, matricula, potencia);
    this.cilindrada = cilindrada;
}

// Coche
function Coche (marca, matricula, potencia, tipo) {
    Vehiculo.call(this, marca, matricula, potencia);
    this.tipo = tipo;
    
}


// Locomotora 
function Locomotora (marca, matricula, potencia, capacidadPasajeros) {
    Vehiculo.call(this, marca, matricula, potencia);
    this.capacidadPasajeros = capacidadPasajeros;
}
let loc = new Locomotora("Volkswagen", "23456789", 200, 20);

for (let k in loc)  {
    console.log(k);
}