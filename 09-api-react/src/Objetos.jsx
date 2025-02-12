import { useState, useEffect } from "react";

export default function Objetos() {
    const [objetos, setObjetos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [token] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM5MzcyNDA3LCJleHAiOjE3Mzk0NTg4MDd9.MujQ2p2Y6ApJk05XReb1tdK84R08AGTQ9hSoTeq2P68");

    useEffect(() => {
        async function fetchObjetos() {
            const dbObjects = await fetch("http://localhost:3000/object", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }).then(res => res.json());
            setObjetos(dbObjects);
        }

        fetchObjetos();
    }, []);


    async function addObject() {
        try {
            const response = await fetch("http://localhost:3000/object", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: "objeto1",
                    value: "valor1",
                    owner: userId  // Enviamos el ID del usuario autenticado
                })
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${await response.text()}`);
            }
    
            const data = await response.json();
            console.log("Objeto creado:", data);
        } catch (error) {
            console.error("Error al agregar objeto:", error);
        }
    }
    

    async function updateObjeto(id, newNombre) {
        const updatedObject = await fetch(`http://localhost:3000/object/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newNombre }),
        }).then(res => res.json());
        setObjetos(objetos.map(obj => (obj._id === id ? updatedObject : obj)));
        setEditingId(null);
    }

    async function deleteObjeto(id) {
        await fetch(`http://localhost:3000/object/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        setObjetos(objetos.filter(obj => obj._id !== id));
    }

    return (
        <div>
            <h2>Gestión de Objetos</h2>
            <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Nuevo objeto" 
            />
            <button onClick={addObject}>Añadir</button>
            
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {objetos.map(obj => (
                        <tr key={obj._id}>
                            <td>
                                {editingId === obj._id ? (
                                    <input 
                                        type="text" 
                                        defaultValue={obj.nombre} 
                                        onBlur={(e) => updateObjeto(obj._id, e.target.value)}
                                    />
                                ) : (
                                    obj.nombre
                                )}
                            </td>
                            <td>
                                <button onClick={() => setEditingId(obj._id)}>Editar</button>
                                <button onClick={() => deleteObjeto(obj._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
