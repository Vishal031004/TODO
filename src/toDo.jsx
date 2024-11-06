import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import './toDo.css';

function Todo() {
    const [todo, setTodo] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [newTodoDesc, setNewTodoDesc] = useState(""); 
    const [newTodoDate, setNewTodoDate] = useState(""); 
    const [completed, setCompleted] = useState(0); 
    const [editingId, setEditingId] = useState(null);

    const addTask = () => {
        if (newTodo && newTodoDesc && newTodoDate) {
            if (editingId) {
                setTodo(prevTodo =>
                    prevTodo.map(todo => 
                        todo.id === editingId
                            ? { ...todo, task: newTodo, description: newTodoDesc, date: newTodoDate }
                            : todo
                    )
                );
                setEditingId(null);
            } else {
                setTodo(prevTodo => [
                    ...prevTodo,
                    { task: newTodo, description: newTodoDesc, date: newTodoDate, id: uuidv4(), isDone: false }
                ]);
            }
            setNewTodo("");
            setNewTodoDesc("");
            setNewTodoDate("");
        }
    };

    const deleteTodo = (id) => {
        setTodo(prevTodo => {
            return prevTodo.filter(todo => todo.id !== id);
        });
    };

    const deleteAllTodo = () => {
        setTodo([]);
    };

    const edit = (id) => {
        const taskToEdit = todo.find(todo => todo.id === id);
        if (taskToEdit) {
            setNewTodo(taskToEdit.task);
            setNewTodoDesc(taskToEdit.description);
            setNewTodoDate(taskToEdit.date);
            setEditingId(id);
        }
    };

    const markAllDone = () => {
        setTodo(prevTasks => prevTasks.map(todo => ({ ...todo, isDone: true })));
    };

    const handleCheckboxChange = (id) => {
        setTodo(prevTasks => 
            prevTasks.map(todo => {
                if (todo.id === id) {
                    const newIsDone = !todo.isDone;
                    return { ...todo, isDone: newIsDone };
                }
                return todo;
            })
        );
    };

    // Update the completed count whenever the todo list changes
    useEffect(() => {
        const completedTasks = todo.filter(task => task.isDone).length;
        setCompleted(completedTasks);
    }, [todo]); // This effect runs whenever the 'todo' list is updated

    return (
        <div>
            <h2 style={{ color: "white" }}>YOUR TODO LIST</h2>
            <div className='inputContainer'>
                <input placeholder="Task Name" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                <input placeholder="Task Description" value={newTodoDesc} onChange={(e) => setNewTodoDesc(e.target.value)} />
                <input type="date" value={newTodoDate} onChange={(e) => setNewTodoDate(e.target.value)} />
                <button onClick={addTask} style={{ color: "orange" }}>
                    {editingId ? "Update Task" : "Add Task"}
                </button>
            </div>
            <br />
            <h3 style={{ color: "white" }}>TODO TASKS</h3>
            <ul>
                {todo.map((x) => (
                    <li key={x.id}>
                        <span style={x.isDone ? { textDecoration: "line-through", color: "red" } : {}} >
                            <b>{x.task}</b> <br /> {x.description} <br /> {x.date} <br/>
                            {x.isDone ? <p>Status: Completed</p> : <p>Status: Scheduled</p>}
                        </span>
                        <input 
                              type="checkbox" 
                               className="small-checkbox"
                                  checked={x.isDone} 
                                 onChange={() => handleCheckboxChange(x.id)}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <button style={{ color: "red" }} onClick={() => deleteTodo(x.id)}>Delete</button>
                        &nbsp;&nbsp;&nbsp;
                        <button style={{ color: "green" }} onClick={() => edit(x.id)}>Edit</button>
                    </li>
                ))}
            </ul>
            <br />
            <div className='allApplier'>
                <button style={{ color: "blue" }} onClick={deleteAllTodo}>Delete All</button>
                &nbsp;&nbsp;&nbsp;
                <button style={{ color: "purple" }} onClick={markAllDone}>Mark all as done</button>
            </div>
            <h3>Completed: {completed}</h3>
        </div>
    );
}

export default Todo;
