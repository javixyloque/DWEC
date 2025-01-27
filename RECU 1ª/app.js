"use strict";

document.addEventListener("DOMContentLoaded",() => {
    // VARIABLES => ELEMENTOS DEL DOM
    let form = document.getElementById("form");
    let labelTarea = document.querySelector("label");
    let inputTarea = document.getElementById("tarea");
    let botonAgregar = document.getElementById("add-task");
    let tareasTag = document.getElementById("lista");

    //  VARIABLES => ÚTILES
    let tareas = [];
    let completadas = [];


    
    renderTareas();


    // FUNCION PARA MOSTRAR LAS TAREAS
    function renderTareas() {
        // REPINTAR EL BODY PARA EVITAR REPETICIONES
        document.body.innerHTML = "";
        // ARRAY => TAREAS DEL LOCALSTORAGE
        if (localStorage.getItem("tareas")) {
            tareas = JSON.parse(localStorage.getItem("tareas"));
        }

        if (localStorage.getItem("completadas")) {
            completadas = JSON.parse(localStorage.getItem("completadas"));
        }
        

        // ELIMINAR CONTENIDO REPETIDO
        tareasTag.innerHTML = "";

        //  BUCLE => IMPRIMIR TAREAS SIN HACER
        if (tareas) {
            tareas.forEach ((tarea)=> {
                renderTarea(tarea);
            })
        }

        // MOSTRAR HECHAS
        if (completadas) {
            completadas.forEach ((completada)=> {
                let parrafo = document.createElement("li");
                parrafo.classList.add("completada");
                parrafo.textContent = completada+" - COMPLETADA";
                tareasTag.appendChild(parrafo);
                let botonEliminar = document.createElement("button"); 
                botonEliminar.textContent = "Eliminar";
                botonEliminar.addEventListener("click", () => eliminarTarea(completada));
                parrafo.appendChild(botonEliminar)
            })

        }
        
        

        crearFormulario();
        document.body.appendChild(tareasTag);
    }

    function renderTarea(tarea) {
        

        let fila = document.createElement("li");
        
        let botonEliminar = document.createElement("button");
        let botonConfirmar = document.createElement('button');
        tareasTag.appendChild(fila);
        
        
        fila.textContent = tarea;
        botonEliminar.textContent = "Borrar tarea";
        botonConfirmar.textContent = "Confirmar";
        fila.appendChild (botonConfirmar);
        fila.appendChild (botonEliminar);
        
        
        botonEliminar.addEventListener("click", () => eliminarTarea(tarea));
        botonConfirmar.addEventListener("click", () => confirmarTarea(tarea));

        
    }



    //FUNCION PARA CREAR EL FORMULARIO 
    function crearFormulario() {
        
        labelTarea.textContent = "Agregar tarea: ";
        inputTarea.type = "text";
        botonAgregar.textContent = "Agregar tarea";
        form.appendChild(inputTarea);
        form.appendChild(botonAgregar);

        document.body.appendChild(form);
        botonAgregar.addEventListener("click", crearTarea);
    }
    
    function crearTarea(e) {
        e.preventDefault();
        let tarea = inputTarea.value;
        if (tarea!==null && tarea !=='') {

            tareas.push(tarea);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            renderTareas();
            inputTarea.value = "";
        } else {
            renderTareas();
            inputTarea.value = "";
        }
        
        
    }
    

    function eliminarTarea(tarea) {
        let index = tareas.indexOf(tarea);
        console.log(index);
        if (index > -1) {
            tareas.splice(index, 1);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            renderTareas();
        } else {
            let indice = completadas.indexOf(tarea);

            completadas.splice(indice, 1)
            localStorage.setItem("completadas", JSON.stringify(completadas));
            renderTareas();
        }
    }

    function confirmarTarea(tarea) {
        
        let index = tareas.indexOf(tarea);
            
        if (index > -1) {
            let completada = tareas.splice(index, 1);
            completadas.push(completada);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            localStorage.setItem("completadas", JSON.stringify(completadas));
        }
        renderTareas();
        
    } 

} )