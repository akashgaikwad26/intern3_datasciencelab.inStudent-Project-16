// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Assume basic styles for layout

// ProjectDashboard Component
const ProjectDashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('/api/projects')
            .then(response => setProjects(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="dashboard">
            <h1>Project Dashboard</h1>
            {projects.map(project => (
                <div className="project-card" key={project.project_id}>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                    <p>Deadline: {project.deadline}</p>
                </div>
            ))}
        </div>
    );
};

// TaskBoard Component (Kanban Board)
const TaskBoard = () => {
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], completed: [] });

    useEffect(() => {
        axios.get('/api/tasks')
            .then(response => {
                const groupedTasks = {
                    todo: [],
                    inProgress: [],
                    completed: []
                };
                response.data.forEach(task => {
                    groupedTasks[task.status.replace('-', '')].push(task);
                });
                setTasks(groupedTasks);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="kanban-board">
            {['todo', 'inProgress', 'completed'].map(status => (
                <div className="kanban-column" key={status}>
                    <h2>{status.toUpperCase()}</h2>
                    {tasks[status].map(task => (
                        <div className="task-card" key={task.task_id}>
                            <h3>{task.name}</h3>
                            <p>{task.description}</p>
                            <p>Priority: {task.priority}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

// ChatWindow Component
const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios.get('/api/messages')
            .then(response => setMessages(response.data))
            .catch(error => console.error(error));
    }, []);

    const sendMessage = () => {
        if (newMessage.trim()) {
            axios.post('/api/messages', { content: newMessage })
                .then(response => setMessages([...messages, response.data]))
                .catch(error => console.error(error));
            setNewMessage('');
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-history">
                {messages.map(message => (
                    <div className="message" key={message.message_id}>
                        <p><strong>User {message.sender_id}:</strong> {message.content}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

// Export Components
export { ProjectDashboard, TaskBoard, ChatWindow };
