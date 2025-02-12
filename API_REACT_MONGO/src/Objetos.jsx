import { useState, useEffect } from "react";

export default function Objetos() {
    const [objetos, setObjetos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [valor, setValor] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editNombre, setEditNombre] = useState("");
    const [editValor, setEditValor] = useState("");
    const [token] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM5MzcyNDA3LCJleHAiOjE3Mzk0NTg4MDd9.MujQ2p2Y6ApJk05XReb1tdK84R08AGTQ9hSoTeq2P68");

    useEffect(() => {
        async function fetchObjetos() {
            try {
                const res = await fetch("http://localhost:3000/object", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} - ${await res.text()}`);
                }

                const dbObjects = await res.json();
                setObjetos(dbObjects);
            } catch (error) {
                console.error("Error al obtener los objetos:", error);
            }
        }

        fetchObjetos();
    }, [objetos]);

    async function addObject() {
        try {
            const response = await fetch("http://localhost:3000/object", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: nombre,
                    value: valor
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${await response.text()}`);
            }

            const data = await response.json();
            setObjetos([...objetos, data]);
            setNombre("");
            setValor("");
            console.log("Objeto creado:", data);
        } catch (error) {
            console.error("Error al agregar objeto:", error);
        }
    }

    async function updateObjeto(id) {
        try {
            const response = await fetch(`http://localhost:3000/object/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ name: editNombre, value: editValor }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${await response.text()}`);
            }

            const updatedObject = await response.json();
            setObjetos(objetos.map(obj => (obj._id === id ? updatedObject : obj)));
            setEditingId(null);
        } catch (error) {
            console.error("Error al actualizar objeto:", error);
        }
    }

    async function deleteObjeto(id) {
        try {
            const response = await fetch(`http://localhost:3000/object/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${await response.text()}`);
            }

            setObjetos(objetos.filter(obj => obj._id !== id));
            
            console.log(`Objeto con ID ${id} eliminado.`);
        } catch (error) {
            console.error("Error al eliminar objeto:", error);
        }
    }

    return (
        <div>
            <h2>Gestión de Objetos</h2>
            
            {/* Formulario para agregar objetos */}
            <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Nombre del objeto" 
            />
            <input 
                type="text" 
                value={valor} 
                onChange={(e) => setValor(e.target.value)} 
                placeholder="Valor del objeto" 
            />
            <button onClick={addObject}>Añadir</button>
            
            {/* Tabla para mostrar los objetos */}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Valor</th>
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
                                        value={editNombre} 
                                        onChange={(e) => setEditNombre(e.target.value)} 
                                    />
                                ) : (
                                    obj.name
                                )}
                            </td>
                            <td>
                                {editingId === obj._id ? (
                                    <input 
                                        type="text" 
                                        value={editValor} 
                                        onChange={(e) => setEditValor(e.target.value)} 
                                    />
                                ) : (
                                    obj.value
                                )}
                            </td>
                            <td>
                                {editingId === obj._id ? (
                                    <button onClick={() => updateObjeto(obj._id)}>Guardar</button>
                                ) : (
                                    <button onClick={() => {
                                        setEditingId(obj._id);
                                        setEditNombre(obj.name);
                                        setEditValor(obj.value);
                                    }}>Editar</button>
                                )}
                                <button onClick={() => deleteObjeto(obj._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { Objetos };
