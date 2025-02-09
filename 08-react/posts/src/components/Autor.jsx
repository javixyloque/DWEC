"use strict";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Spinner} from 'react-spinner-toolkit';


function Autor () {
    // OBTENER ID DESDE LA URL
    const {id} = useParams();
    const [autor, setAutor] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAutor() {
            
            
            const autorFetch = await fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`);
            const datosAutor = await autorFetch.json();
            // DATOSAUTOR => ARRAY DE PROMESAS, COMO SOLO HAY 1 REGISTRO, ES LA POSICIÓN 0 DEL ARRAY
            setAutor(datosAutor[0]);
            
            setLoading(false);
            
        }
        fetchAutor();
    }, [id])


    if (loading) {
        // CARGANDO...
        // Aquí se puede poner un spinner o algo similar
        // Por ejemplo, un <div> con un spinner </div>
        return <Spinner shape="threeDots" color="white" loading speed={1} size={50} transition={true} />
    }
    
    return (
        
        
        <div>
            
            <h1>{autor.name}</h1>
            <p>Nombre de usuario: {autor.username}</p>
            <p>Email: {autor.email}</p>
            <p>Teléfono: {autor.phone}</p>

            <Link to={`/autor/tasks/${autor.id}`} ><h3>Tareas</h3></Link>
        
        
            <p>Web: <Link to={`http://${autor? autor.website: ''}`}>{autor? autor.website: ''}</Link></p>
            
            <p>Volver a la página principal: <Link to={"/"}>Volver</Link></p>
        </div>
    )
    

    
}

export {Autor};