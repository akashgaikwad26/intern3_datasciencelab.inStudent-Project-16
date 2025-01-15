// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectDashboard, TaskBoard, ChatWindow } from './Components';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [messages, setMessages] = useState([]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/users/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const fetchRelevantData = async () => {
        try {
            const [projectsRes, tasksRes, messagesRes] = await Promise.all([
                axios.get('/api/projects'),
                axios.get('/api/tasks'),
                axios.get('/api/messages'),
            ]);

            setProjects(projectsRes.data);
            setTasks(tasksRes.data);
            setMessages(messagesRes.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchRelevantData();
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return (
            <LoginForm onLogin={login} />
        );
    }

    return (
        <div className="app">
            <h1>Welcome, {user?.username}</h1>
            <ProjectDashboard projects={projects} />
            <TaskBoard tasks={tasks} />
            <ChatWindow messages={messages} />
        </div>
    );
};

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default App;
