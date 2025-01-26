import { useState, useEffect } from 'react';

function Posts() {
    // STATE PARA GUARDAR LOS POSTS Y LOS USUARIOS 
    // SETSTATE PARA ACTUALIZAR LOS VALORES DE LOS STATES (POSTS Y USERS)
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchAll() {
            const resPost = await fetch('https://jsonplaceholder.typicode.com/posts');
            const postList = await resPost.json();

            const resUser = await fetch('https://jsonplaceholder.typicode.com/users');
            const userList = await resUser.json();

            setUsers(userList);
            setPosts(postList);
        }
        fetchAll();
        // DEPENDENCIA POSTS => CADA VEZ QUE CAMBIA SE LLAMA A ESTA FUNCIÓN 
    }, [posts]); 

    return (
        //NO HACE FALTA PERO PARA TENER UN ELEMENTO RAIZ
        <>
            <div className="post-list">
                {posts.map(post => {
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
