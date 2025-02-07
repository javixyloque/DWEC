import { useState, useEffect } from 'react';
import {Comentarios} from './Comentarios.jsx';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-spinner-toolkit';

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
            setLoading(false); // DESPUES DE OBTENER LOS POSTS, CARGANDO ES FALSE
        }
        fetchAll();
        // DEPENDENCIA POSTS => CADA VEZ QUE CAMBIA SE LLAMA A ESTA FUNCIÓN 
    },); 

    useEffect(() => {
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
            setLoading(false);// DESPUES DE OBTENER LOS USUARIOS, CARGANDO ES false
        }
        fetchUserNames();
    }, [posts]);

    if (loading) {
        // CARGANDO...
        // Aquí se puede poner un spinner o algo similar
        // Por ejemplo, un <div> con un spinner </div>
        return <Spinner shape="threeDots" color="white" loading speed={1} size={50} transition={true} />
    } 

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
                            <p>Autor: <Link to={author ? `/autor/${author.id}`:"#"}>{author ? author.name : 'Sin autor'}</Link></p> 
                            {<Comentarios postId={post.id}/> }
                        </div>
                        
                    );
                })}
            </div>

        </>
    );
}


export { Posts };
