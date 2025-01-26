"use strict";

document.addEventListener("DOMContentLoaded", () => {
    
    let container = document.createElement("div");
    let body = document.querySelector("body");
    let form = document.createElement("form");
    let input = document.createElement("input");
    let button = document.createElement("button");
    let divprinc = document.createElement("div");
    let chat = "";
    let contador = 0;
    
    
    input.type = "text";
    container.id = "container";
    button.type = "submit";
    button.textContent = "ENVIAR MENSAJE";
    

    for (let i = 0; i < localStorage.length; i++) {
        // VARIABLE => KEY DEL LOCALSTORAGE (chat0, chat1, chat2)
        let key = localStorage.key(i);
        if (key.startsWith("chat")) {
            // VARIABLE => MENSAJE DEL LOCALSTORAGE (MENSAJES)
        chat += localStorage.getItem(key);
        contador++;
        }
    }

    button.onclick = (e) => {
        divprinc.textContent = "";
        let fecha = new Date();
        e.preventDefault();
        // VARIABLE => RECOGER MENSAJE DEL INPUT
        let item = input.value;
        if (item === "") {
            alert("El mensaje no puede estar vacío");
            return;
        }

        if (localStorage.getItem(`chat${contador}`)) {
            form.reset();
        }
        
        if (contador %2 ===0) {
            
        }
        
        localStorage.setItem(`chat${contador}`, fecha.toLocaleString()+" : "+item+"<br>");
        chat += localStorage.getItem(`chat${contador}`);
        
        console.log(chat);

        let mensaje = `${fecha.toLocaleString()} : ${item}<br>`;
        localStorage.setItem(`chat${contador}`, mensaje);

        let div = document.createElement("div");
        div.innerHTML = chat;
        // div.style.textAlign = contador % 2 == 0 ? "left" : "right";
        divprinc.appendChild(div);
        contador++;
        input.value = "";
    

    };


    body.appendChild(form);
    body.appendChild(container);
    form.appendChild(input);
    form.appendChild(button);
    body.appendChild(divprinc);

    divprinc.style.margin="20vh";
    divprinc.style.border="2px solid";

    


});