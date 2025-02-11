import { useEffect } from "react"
import { useState } from "react"

export default function Objetos() {
    const [objetos, setObjetos] = useState([])

    useEffect(() => {
        async function fetchObjetos() {
            const dbObjects = await fetch('http://localhost:3000/object', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }).then(res => res.json());
            setObjetos(dbObjects);
        }

        fetchObjetos();
    }, [])

    return <table></table>
}