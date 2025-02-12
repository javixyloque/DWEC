import { useState, useEffect } from "react";

function Objetos () {
    const [objetos, setObjetos] = useState([]);

    useEffect (() => {
        async function getObjetos () {
            const res = await fetch('http://localhost:3000/object', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            setObjetos(data);
        }
    }, []) 
        

    return <table>
        <thead>
            <th>Name</th>
            <th>Value</th>
        </thead>
        <tbody>
            {objetos.forEach(objeto => {
                return <tr key={objeto.id}>
                    <td>{objeto.name}</td>
                    <td>{objeto.value}</td>
                </tr>  
            })}
        </tbody>
    </table>
}


export {Objetos}