import { useState, useEffect } from "react";

 function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editValue, setEditValue] = useState("");
    const [token] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");

    useEffect(() => {
        async function fetchTasks() {
            try {
                const res = await fetch("http://localhost:3000/tasks", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const data = await res.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    }, []);

    async function addTask() {
        try {
            const response = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ name, value, completed: false }),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const newTask = await response.json();
            setTasks([...tasks, newTask]);
            setName("");
            setValue("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    async function updateTask(id) {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ name: editName, value: editValue }),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const updatedTask = await response.json();
            setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    async function toggleComplete(id, completed) {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ completed: !completed }),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            setTasks(tasks.map(task => task._id === id ? { ...task, completed: !completed } : task));
        } catch (error) {
            console.error("Error toggling completion:", error);
        }
    }

    async function deleteTask(id) {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    return (
        <div>
            <h2>To-Do List</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task Name" />
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Task Value" />
            <button onClick={addTask}>Add Task</button>
            <table>
                <thead>
                    <tr>
                        <th>Completed</th>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={task.completed} 
                                    onChange={() => toggleComplete(task._id, task.completed)}
                                />
                            </td>
                            <td>
                                {editingId === task._id ? (
                                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                                ) : (
                                    task.name
                                )}
                            </td>
                            <td>
                                {editingId === task._id ? (
                                    <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                                ) : (
                                    task.value
                                )}
                            </td>
                            <td>
                                {editingId === task._id ? (
                                    <button onClick={() => updateTask(task._id)}>Save</button>
                                ) : (
                                    <button onClick={() => {
                                        setEditingId(task._id);
                                        setEditName(task.name);
                                        setEditValue(task.value);
                                    }}>Edit</button>
                                )}
                                <button onClick={() => deleteTask(task._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { TodoList };
