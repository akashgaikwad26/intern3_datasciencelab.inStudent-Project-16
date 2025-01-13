// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// ProjectManager Component
const ProjectManager = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
            .then(response => setTeamMembers(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleCreateProject = () => {
        axios.post('/api/projects', {
            name,
            description,
            deadline,
            teamMembers: selectedMembers,
        })
            .then(response => alert('Project created successfully!'))
            .catch(error => console.error(error));
    };

    return (
        <div className="project-manager">
            <h1>Create Project</h1>
            <input
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <div className="team-selection">
                <h2>Assign Team Members</h2>
                {teamMembers.map(member => (
                    <label key={member.user_id}>
                        <input
                            type="checkbox"
                            value={member.user_id}
                            onChange={(e) => {
                                const memberId = parseInt(e.target.value);
                                setSelectedMembers(e.target.checked
                                    ? [...selectedMembers, memberId]
                                    : selectedMembers.filter(id => id !== memberId));
                            }}
                        />
                        {member.username}
                    </label>
                ))}
            </div>
            <button onClick={handleCreateProject}>Create Project</button>
        </div>
    );
};

// TeamOverview Component
const TeamOverview = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="team-overview">
            <h1>Team Overview</h1>
            {tasks.map(task => (
                <div className="task-card" key={task.task_id}>
                    <h2>{task.name}</h2>
                    <p>Assigned To: {task.assigned_to}</p>
                    <p>Status: {task.status}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Due Date: {task.due_date}</p>
                </div>
            ))}
        </div>
    );
};

// AnalyticsDashboard Component
const AnalyticsDashboard = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        axios.get('/api/analytics')
            .then(response => setAnalytics(response.data))
            .catch(error => console.error(error));
    }, []);

    if (!analytics) return <div>Loading analytics...</div>;

    return (
        <div className="analytics-dashboard">
            <h1>Team Performance Analytics</h1>
            <div>
                <h2>Task Completion Rate</h2>
                <p>{analytics.taskCompletionRate}%</p>
            </div>
            <div>
                <h2>Overdue Tasks</h2>
                <p>{analytics.overdueTasks}</p>
            </div>
            <div>
                <h2>Average Task Completion Time</h2>
                <p>{analytics.avgCompletionTime} hours</p>
            </div>
        </div>
    );
};

// Export Components
export { ProjectManager, TeamOverview, AnalyticsDashboard };
