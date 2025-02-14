import { useState, useEffect } from 'react';

function App() {
  const [tareasCompletadas, setTareasCompletadas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [valor, setValor] = useState('');
  const [tareas, setTareas] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/object');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${await response.text()}`);
        }
        const data = await response.json();
        setTareas(data.filter((tarea) => tarea.value === "false"))
        setTareasCompletadas(data.filter((tarea) => tarea.value === 'true'));
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    }
    fetchData();
  }, []);

  // Funciones para agregar, eliminar y completar tareas
  async function agregarTarea() {
    try {
      const response = await fetch('http://localhost:3000/object', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nombre, value: "false" }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${await response.text()}`);
      }
      const data = await response.json();
      setTareas([...objetos, data]);
      await obtenerTareasCompletas();
      
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  }
  async function obtenerTareasCompletas() {
    try {
      const response = await fetch('http://localhost:3000/object');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${await response.text()}`);
      }
      let arrCompl = [];
      const data = await response.json();
      data.forEach(tarea => {
        if (tarea.value == "true") {
          arrCompl.push(tarea);
        }
      });
      setTareasCompletadas(arrCompl);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  }

  async function eliminarTarea(nombre) {
    try {
      const response = await fetch(`http://localhost:3000/object/${nombre}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${await response.text()}`);
      }
      setTareas(tareas.filter((tarea) => tarea.name !== nombre));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }

  async function completarTarea(nombre) {
    try {
      const response = await fetch(`http://localhost:3000/object/${nombre}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: true }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${await response.text()}`);
      }
      setTareasCompletadas([...tareasCompletadas, await response.json()]);
      setTareas(tareas.filter((tarea) => tarea.name !== nombre));
    } catch (error) {
      console.error('Error al completar la tarea:', error);
    }
  }

  // JSX para la aplicación
  return (
    <div>
      <h2>Gestión de tareas</h2>
      {/* Formulario para agregar tareas */}
      <form>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Título de la tarea" />
        <button onClick={agregarTarea}>Agregar</button>
      </form>

      {/* Tabla para mostrar las tareas completadas */}
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Completar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea._id}>
              <td>{tarea.name}</td>
              <td>No completada</td>
              <td>
                
                  <button onClick={() => completarTarea(tarea.name)}>Completar</button>
                
              </td>
              <td>
              <button onClick={() => eliminarTarea(tarea.name)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <caption>TAREAS COMPLETADAS</caption>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {tareasCompletadas.map((tarea) => (
            <tr key={tarea._id}>
              <td>{tarea.name}</td>
              <td>Completada</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export  {App};