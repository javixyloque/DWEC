"use strict";

// Factoria
function crearPersona(nombre, apellido, edad){
    return {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
    }
}
 
let p1=crearPersona("juan","garcia","33");
 
 
//Constructor
//no hay que llamar al constructor como funcion
//siempre se usa la palabra new antes del constructor
 
//si es constructor con mayuscula
function Persona(nombre,apellido,edad){
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad=edad;
 
    this.saludar=function(){
        console.log(`hola, mi nombre es ${this.nombre}`);
        console.log("hola, mi nombre es "+this.nombre);
 
    }
}
 
let p2=new Persona("alebt","martinez","15");
console.log(p2);
 

 
//herencia

function Empleado(nombre, apellido, edad, puesto){
    Persona.call(this, nombre, apellido, edad);
    this.puesto=puesto;
    

    //ES LA MISMA QUE EL PROTOTYPE
    this.trabajar = function(){
        console.log(`Trabajo como ${this.puesto}`);
    }
}


Empleado.prototype.toString = function(){

    return(`Empleado ${this.nombre} trabaja como ${this.puesto}`);
}

let e1=new Empleado("alberto","perez",30,"desarrollador");
console.log(e1);
e1.saludar();
e1.trabajar();
e1.toString();

let e2=new Empleado("Eloy","Garcia",25,"tester");
