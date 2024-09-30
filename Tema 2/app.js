document.addEventListener ('DOMContentLoaded', () => {
    let nombre = "Pepe"
    let usuarios = [];
    let usuario = {
        nombre: "Josele",
        edad: 15,
        subnormal: true,
    }

    console.log(`Bienvenido ${nombre}` )
    const titulo = document.querySelector('h1');
    titulo.innerHTML = "Hola mundo";
    titulo.setAttribute('style', "font-size: 300%")

    titulo.addEventListener ('mouseover', () => {
        titulo.setAttribute('style', "font-size: 500%")
    })

    titulo.addEventListener ('mouseout', () => {
        titulo.setAttribute('style', "font-size: 300%")
    } )

    titulo.addEventListener ('click', () => {
        
    })
    
    usuario.hora = 15.56;
    console.log(`Nombre: ${usuario.nombre}. \nEdad: ${usuario.edad}`)
    console.log(usuario)
    usuarios.push(usuario)
    console.log(usuarios[0]);
})