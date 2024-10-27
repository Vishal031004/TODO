import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import './toDo.css';


export default Todo

function Todo(){
    //state to re render the list of the todos initially its just an object with one element and that element has an id and a value
    let [todo,setTodo]=useState([{task:"sample-task",id:uuidv4(),isDone:false}])
    //this state variable is used to take the input from the input box and add it to the array of objects
    let [newTodo,setNewTodo]=useState("")

    let addTask = () =>{
        // setTodo([...todo,{task:newTodo,id:uuidv4()}]);
        setTodo((prevTodo)=>{
            return [...prevTodo,{task:newTodo,id:uuidv4(),isDone:false}]
        })
        setNewTodo("")
    }

    let updateNewTodoValue = (event) =>{
        setNewTodo(event.target.value)  
    }

    let deleteTodo = (id) =>{
        setTodo(todo.filter((todo)=> todo.id!=id));
    }

    let upperCaseAll =()=>{
        setTodo((prevTasks) =>
        prevTasks.map((todo) =>{
            return{
                ...todo,
                task:todo.task.toUpperCase(),
            }
        }))
    }

    let upperCaseOne =(id)=>{
        setTodo((prevTasks) =>
        prevTasks.map((todo) =>{
            if(todo.id==id){
                return{
                    ...todo,
                    task:todo.task.toUpperCase(),
                }
            }
            else{
                return todo
            }
            
        }))
    }

    let markAllDone =()=>{
        setTodo((prevTasks) =>
        prevTasks.map((todo) =>{
            return{
                ...todo,
                isDone:true
            }
        }))
    }

    let markAsDone =(id)=>{
        setTodo((prevTasks) =>
        prevTasks.map((todo) =>{
           
            if(todo.id==id){
                return{
                    ...todo,
                    isDone:true,
                }
            }
            else{
                return todo
            }
            
        }))
    }

    return(
        <div>
            <h2 style={{color:"white"}}>YOUR TODO LIST</h2>
            <div className='inputContainer'>
                <input placeholder="Add new task" value={newTodo} onChange={updateNewTodoValue}></input>
                    &nbsp;&nbsp;&nbsp;
                <button onClick={addTask} style={{color:"orange"}}>Add</button>
            </div>
            <br/>
            <h3 style={{color:"white"}}>TODO TASKS</h3>
            <ul>
                {todo.map((x)=>(
                    <li key={x.id}>
                      <span style={x.isDone ? {textDecoration:"line-through"}:{}} > {x.task}</span> &nbsp;&nbsp;&nbsp;
                      <button style={{color:"red"}} onClick={() => deleteTodo(x.id)}>Delete</button>&nbsp;&nbsp;&nbsp;
                      <button style={{color:"green"}} onClick={() => upperCaseOne(x.id)}>Make Uppercase</button>
                      &nbsp;&nbsp;&nbsp;
                      <button style={{color:"yellow "}} onClick={() => markAsDone(x.id)}>Mark as done</button>
                    </li>
                
                ))}
            </ul>
            <br/>
            <div className='allApplier'>
                <button style={{color:"blue"}} onClick={upperCaseAll}>Change to uppercase</button>
                    &nbsp;&nbsp;&nbsp;
                <button style={{color:"purple"}} onClick={markAllDone}>Mark all as done</button>
            </div>

        </div>  
    )
}