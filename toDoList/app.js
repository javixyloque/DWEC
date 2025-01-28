"use strict";


document.addEventListener("DOMContentLoaded",() => {
    // VARIABLES => ELEMENTOS DEL DOM
    let form;
    let labelTarea;
    let inputTarea;
    let botonAgregar;
    let tareasTag;
    let completadasTag;

    //  VARIABLES => ÚTILES
    let tareas = [];
    let completadas = [];

    // botonAgregar.addEventListener("click", () => {})

    
    mostrarTareas();


    // FUNCION PARA MOSTRAR LAS TAREAS
    function mostrarTareas() {
        // REPINTAR EL BODY PARA EVITAR REPETICIONES
        document.body.innerHTML = "";
        // ARRAY => TAREAS DEL LOCALSTORAGE
        if (localStorage.getItem("tareas")) {
            tareas = JSON.parse(localStorage.getItem("tareas"));
        }

        if (localStorage.getItem("completadas")) {
            completadas = JSON.parse(localStorage.getItem("completadas"));
        }
        

        // ELIMINAR EL CONTENIDO DEL TAG TAREAS
        tareasTag = document.createElement("table");
        tareasTag.innerHTML = "";
        let caption = document.createElement("caption");

        //  BUCLE => IMPRIMIR TAREAS SIN HACER
        if (tareas) {
            tareas.forEach ((tarea)=> {
                let fila = document.createElement("tr");
                let columnaTarea = document.createElement("td");
                let columnaBorrar = document.createElement("td");
                let botonEliminar = document.createElement("button");
                let columnaConfirmar = document.createElement('td');
                let botonConfirmar = document.createElement('button');
                tareasTag.appendChild(fila);
                fila.appendChild(columnaTarea);
                fila.appendChild(columnaBorrar);
                fila.appendChild(columnaConfirmar);
                columnaBorrar.appendChild(botonEliminar);
                columnaConfirmar.appendChild(botonConfirmar);

                
    
                columnaTarea.textContent = tarea;
                botonEliminar.textContent = "Eliminar";
                botonConfirmar.textContent = "Confirmar";
                
                botonEliminar.addEventListener("click", () => eliminarTarea(tarea));
                botonConfirmar.addEventListener("click", () => confirmarTarea(tarea));
            })
        }

        if (completadas) {
            completadasTag = document.createElement("div");
            completadasTag.textContent = "Tareas completadas: ";

            completadas.forEach ((completada)=> {
                let parrafo = document.createElement("p");
                parrafo.textContent = completada;
                completadasTag.appendChild(parrafo);
            })

            


        }
        
        
        caption.textContent = "Tareas";
        tareasTag.appendChild(caption);

        document.body.appendChild(tareasTag);
        crearFormulario();
        document.body.appendChild(completadasTag);
    }



    //FUNCION PARA CREAR EL FORMULARIO 
    function crearFormulario() {
        
        form = document.createElement("form");
        labelTarea = document.createElement("label");
        inputTarea = document.createElement("input");
        botonAgregar = document.createElement("button");
    
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
        
        tareas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        mostrarTareas();
        inputTarea.value = "";
        
    }
    

    function eliminarTarea(tarea) {
        let index = tareas.indexOf(tarea);
        if (index > -1) {
            tareas.splice(index, 1);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            mostrarTareas();
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
        mostrarTareas();
        
    } 
} )