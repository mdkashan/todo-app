import React, { useContext, useState, useEffect } from 'react';
import { authState } from '../store/authState.js';
import {useRecoilValue} from "recoil";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const authStateValue = useRecoilValue(authState);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('http://localhost:3000/todo/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            // Todo: Create a type for the response that you get back from the server
            const data = await response.json();
            setTodos(data);
        };
        getTodos();
    }, [authState.token]);

    const addTodo = async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
    };

    const markDone = async (id) => {
        const response = await fetch(`http://localhost:3000/todo/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };

    const deleteTodo = async(id)=>{
        const response = await fetch(`http://localhost:3000/todo/delete/${id}`, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
        window.reload
    }
    return (
        <div className="main-container">
            <div className='navbar'>
                <h2>Welcome {authStateValue.username}</h2>  
                <div>
                    <button className="btn" style={{padding:'8px 10px'}} onClick={() => {
                        localStorage.removeItem("token");
                        window.location = "/login";
                    }}>Logout</button>
                </div>
            </div>
            <div className='todo-inp'>
            <h2>Todo List</h2>
            <input style={{width:"72%"}} className="inp" type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <input style={{width:"72%"}} className="inp" type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <button className="btn" onClick={addTodo}>Add Todo</button>
            </div>

            <section className="todos-container">
            {todos.map((todo) => (
                <div key={todo._id} className='todos'>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <div>
                    <button style={{padding:"8px 10px", fontSize:".6rem"}} className="btn" onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
                    <button style={{padding:"8px 10px",  fontSize:".6rem"}} className="btn" onClick={() => deleteTodo(todo._id)}>{'Delete'}</button>
                    </div>
                </div>
            ))}

            </section>
  
        </div>
    );
};

export default TodoList;