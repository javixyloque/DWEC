import { useState, useEffect } from 'react';

function Posts () {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        //NO PUEDES PASAR UNA FUNCION ASINCRONA A USEEFFECT, POR ESO SE CREA LA ASÍNCRONA DENTRO
        async function fetchPosts() {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            // NO LE PONEMOS POSTS PARA NO ENMASCARAR LA VARIABLE DE ARRIBA POR SI LA NECESITAMOS
            const postList = await res.json();
            setPosts(postList);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    return  (
        <>
            <div className='post-list'>
                {/* PARA INYECTAR CODIGO JS EN JSX NECESITAMOS LLAVES  */}
                {
                    // PARA OBTENER UN ARRAY NECESITAMOS UN .MAP
                    posts.map(post => {
                        return (
                            <div className='post' key={post.id}>
                                <h1>{post.title}</h1>
                                <p>{post.body}</p>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )

    
}


export {Posts}