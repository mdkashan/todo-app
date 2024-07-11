import React, {useEffect, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import Login from './components/LOgin.jsx';
import Signup from './components/Signup.jsx';
import TodoList from './components/TodoList';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from './store/authState.js';
import Loader from './components/Loader.jsx';
import './App.css'

function App() {
    return (
        <RecoilRoot>
          <Suspense fallback={<Loader />}>
              <Router>
                <InitState />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/todos' element={<TodoList />} />
                    <Route path='/' element={<Login />} />
                </Routes>
            </Router>
          </Suspense>
        </RecoilRoot>
    );
}

function InitState() {
    const setAuth = useSetRecoilState(authState);
    const navigate = useNavigate();

    const init = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('http://localhost:3000/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.username) {
                setAuth({ token: data.token, username: data.username });
                navigate("/todos");
            } else {
                navigate("/login");
            }
        } catch (e) {
            navigate("/login");
        }
    }
    useEffect(() => {
        init();
    }, [])
    return <></>
}

export default App;