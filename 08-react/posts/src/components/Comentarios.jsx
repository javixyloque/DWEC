import { useEffect, useState } from "react"

const Comentarios = ({ postId }) => {
    const [comentarios, setComentarios] = useState([])
    const [cargado, setCargado] = useState(false)

    async function onToggle(e) {
        if(!cargado) {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            const data = await res.json()
            setComentarios(data)
            setCargado(true);
        }
    }

    return <details onToggle={onToggle}>
        <summary>Comentarios</summary>
        {comentarios.map(comentario => <div key={comentario.id}>
            <h3>{comentario.name}</h3>
            <p>{comentario.body}</p>
        </div>)}
    </details>
}

export {Comentarios} 