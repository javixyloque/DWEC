"use strict";

import { Spinner } from "react-spinner-toolkit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Tasks () {
    const {id} = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [autor, setAutor] = useState([]);

    // if (loading) {
    //     return <Spinner shape="threeDots" color="white" loading speed={1} size={50} transition={true} />
    // }

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

    return (
        <div>
            <h1>Tareas de {autor.name}</h1>
            <ul>
                {// BUCLE IMPRIMIR TAREAS
                    tasks.map(task => {
                        if (task.completed) {
                            return <button></button>
                            return <li style={{background: ""}} key={task.id}>{task.title}</li>;
                        } else {
                            return <li style={{background: "red"}} key={task.id}>{task.title}</li>;
                        }
                    })
                }
            </ul>
        </div>
    );
 
}


export {Tasks};
