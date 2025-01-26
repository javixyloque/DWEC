"use strict";

document.addEventListener("DOMContentLoaded", ()  => {
    
    //FORMULARIO DE MENSAJES
    let form = document.createElement("form");
    
    // INPUT
    let input = document.createElement("input");
    input.type="text";
    
    // BOTÓN SUBMIT
    let button = document.createElement("input");
    button.type="submit";
    
    // DIV PARA COLOCAR LOS MENSAJES
    let divMsg = document.createElement("div");
    
    // ARRAY => GUARDAR MENSAJES LOCALSTORAGE
    let arrMsg =[];

    // PARRAFO => MOSTRAR MENSAJES
    let parrafo;
    
    // COMPROBAR SI EXISTEN MENSAJES EN LOCALSTORAGE Y COLOCARLOS
    if (localStorage.getItem("chat")) {
        arrMsg = JSON.parse(localStorage.getItem("chat"));
        pintarDatosForm();
    }

    form.appendChild(input);
    form.appendChild(button);
    
    document.body.style.margin= "0px 20vw";
    document.body.style.background="#5C7285";
    
    form.style.display="flex";
    form.style.width="100%";
    form.style.marginTop="10vh";
    form.style.marginBottom="10vh";
    
    input.style.padding="2%";
    input.style.width="80%";


    button.style.width="20%";
    button.style.backgroundColor="#818C78";
    button.style.color="white";
    button.style.fontWeight = "600";
    button.value = "ENVIAR MENSAJE";
    button.style.cursor= "pointer";
    
    
    

    form.addEventListener("submit",recogerDatosForm);


    function recogerDatosForm (e) {
        e.preventDefault();

        // SI EXISTE TEXTO => PUSH
        let mensaje = input.value;
        if (mensaje !== "") {
            let fecha = new Date();
            arrMsg.push(fecha.toLocaleString()+" :   "+mensaje);
        }
        
        // BORRAR MENSAJES => EVITAR REPETIDOS
        divMsg.innerHTML = "";
        
        // GUARDAR MENSAJES EN LOCALSTORAGE
        localStorage.setItem("chat", JSON.stringify(arrMsg));
        input.value = "";
        
        // PINTAR MENSAJES
        pintarDatosForm();
    }


    function pintarDatosForm () {
        
        for (let i in arrMsg) {
            //COLOCAR CADA MENSAJE A UN LADO 
            if (i%2 ===0) {
                parrafo = document.createElement("p");
                parrafo.style.textAlign = "left";
                parrafo.style.backgroundColor = "#E2E0C8";
                parrafo.textContent = arrMsg[i];
                divMsg.appendChild(parrafo);
            } else {
                parrafo = document.createElement("p");
                parrafo.style.textAlign = "right";
                parrafo.style.backgroundColor = "#818C78";
                parrafo.textContent = arrMsg[i];
                divMsg.appendChild(parrafo);
            }
            parrafo.style.border = "1px solid";
            parrafo.style.borderRadius = "3px";
            parrafo.style.padding = "2%";
        }

        // DIV => PUSH AL DOCUMENTO
        document.body.appendChild(divMsg);
        document.body.appendChild(form);
    } 
    

})