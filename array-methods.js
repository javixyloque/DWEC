let empleados = [
    {nombre: "Pepe", apellido:"Pepez", sueldo: 5000},
    {nombre: "Paca", apellido:"Garla", sueldo: 3000},
    {nombre: "Habib", apellido:"Amil", sueldo: 12098}
]

let sueldoAlto = empleados.reduce((acum, empleado)=> {
    return empleado.sueldo > acum.sueldo ? empleado : acum;
}, 0)

let arrayOrd = empleados.sort((a, b) => {
    return b.sueldo - a.sueldo;
});



console.log(sueldoAlto);
console.log(arrayOrd);