import { useState, useEffect } from 'react';

function Posts() {
    // STATE PARA GUARDAR LOS POSTS Y LOS USUARIOS 
    // SETSTATE PARA ACTUALIZAR LOS VALORES DE LOS STATES (POSTS Y USERS)
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        async function fetchAll() {
            const resPost = await fetch('https://jsonplaceholder.typicode.com/posts');
            const postList = await resPost.json();

            
            setPosts(postList);
            setLoading(false);
        }
        fetchAll();
        // DEPENDENCIA POSTS => CADA VEZ QUE CAMBIA SE LLAMA A ESTA FUNCIÓN 
    }, [posts]); 

    useEffect(() => {
        // SI CAMBIA LA CANTIDAD DE POSTS, LIMPIAR EL STATE DE ALBUMS
        async function fetchUserNames() {
            
            let uniqueUserIds = [...new Set(posts.map ( post => post.userId ))];
            // LOS 3 PUNTOS EXPANDEN EL ITERABLE, LO COPIAN POR ASÍ DECIRLO¡
            // PETICIONES ASINCRONAS A LOS USUARIOS
            let resUser =  uniqueUserIds.map (async idUser => {

                const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users/${idUser}`);
                const devolver = await respuesta.json();
                return devolver;

            });
            const autores = await Promise.all(resUser);
            // const nombresAutores = autores.map(autor =>autor.name)
            setUsers(autores);
            setLoading(false);
        }
        fetchUserNames();
    }, []);

    return (
        //NO HACE FALTA PERO PARA TENER UN ELEMENTO RAIZ
        <>
            <div className="post-list">
                {
                
                posts.map(post => {
                    // FIND => DEVUELVE EL USUARIO CON EL ID = POST.USERID
                    const author = users.find(user => /*return implicito*/ user.id === post.userId ); 

                    return (
                        <div className="post" key={post.id}>
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                            {/* SI EXISTE AUTOR => NOMBRE, SI NO => SIN AUTOR */}
                            <p>Autor: {author ? author.name : 'Sin autor'}</p> 
                        </div>
                    );
                })}
            </div>
        </>
    );
}


export { Posts };
