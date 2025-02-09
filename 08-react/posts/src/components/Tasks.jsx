"use strict";

import { Spinner } from "react-spinner-toolkit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Hola } from "./scripts/tasks";


function Tasks () {
    const {id} = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [autor, setAutor] = useState([]);


    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
            const data = await response.json();
            setTasks(data);
            setLoading(false);
        }
        fetchTasks();
    },[tasks]);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const dataAutor = await res.json();
            setAutor(dataAutor);
            setLoading(false);
        }
        fetchUser();
    }, [])

    if (loading) {
        return <Spinner shape="threeDots" color="white" loading speed={1} size={50} transition={true} />;
    }

    return (
        <div>
            <h1>Tareas de {autor.name}</h1>
            <ul style={{display: "flex", flexDirection: "column", justifyItems:"left"}}>
                    <h2>Tareas Completadas</h2>
                <div id="completadas">
                    {// BUCLE IMPRIMIR TAREAS
                    tasks.map(task => {
                        if (task.completed) {
                            return <li style={{background: "#004930", listStyle: "none", textAlign: "start", borderRadius: "5px", marginBottom: "0.5em", padding: "2%"}} key={task.id}>{task.title} - COMPLETA</li>;
                        }
                    })
                }
                </div>
                <div id="incompletas">
                    <h2>Tareas Incompletas</h2>

                    {// BUCLE IMPRIMIR TAREAS
                    tasks.map(task => {
                        if (!task.completed) {
                            return <li style={{background: "#330b00", listStyle: "none", textAlign: "start", borderRadius: "5px", marginBottom: "0.5em", padding: "2%",}} key={task.id}>{task.title} - INCOMPLETA</li>;
                        }
                    })
                    }   
                </div>
            </ul>
            <Hola/>
        </div>
    );
 
}


export {Tasks};
