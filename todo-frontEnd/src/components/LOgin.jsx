import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            window.location = "/todos";
        } else {
            alert("invalid credentials");
        }
    };

    return (
        <div className="container login-container">
            <div className='form'>
                <h2>Login - ToDo App</h2>
                <input className="inp" type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input className="inp" type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                New here? <Link to="/signup">Signup</Link>
                <button className='btn' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};




{/* <section className="container login-container">
<form className="form" onSubmit={handleSubmit}>
    <h1>Login To Fitness</h1>
    <input className="inp" required type="email" onChange={handleInput}
    placeholder="Enter Email" name="email" value={userCreds.email}/>
    <input className="inp" maxLength={8} type="password" onChange={handleInput} 
    placeholder="Enter Password" name="password" value={userCreds.password}/>
    <button className="btn">Login</button>
    <p>Don't Have a Account ? <Link to="/register">Register Now</Link></p>
    <p className={message.type}>{message.text}</p>
</form>
</section> */}
export default Login;