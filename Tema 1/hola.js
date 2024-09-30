document.addEventListener ('DOMContentLoaded', ()=> {
    
    const boton = document.querySelector('.button');
    const saludo = boton.appendChild('p');
    saludo.innerHTML("hola buenbas")

    boton.addEventListener ('click',evento());

    const evento = () => {
        saludo.setAttribute("style", "text-color: aquamarine");
    }
});