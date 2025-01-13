// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // For authentication
const bcrypt = require('bcrypt'); // For password hashing
const db = require('./db'); // Assume db is a configured connection to the PostgreSQL database

const app = express();
app.use(bodyParser.json());

// Middleware for verifying JWT tokens
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
    // jwt.sign(username,'pravi')
};

// Routes for User Management
const userRouter = express.Router();

// Signup
userRouter.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await db.query(
            'INSERT INTO Users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, hashedPassword, role]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(403).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Routes for Project and Task Management
const projectRouter = express.Router();

// Create a new project
projectRouter.post('/', authenticateToken, async (req, res) => {
    const { name, description, deadline } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO Projects (name, description, deadline, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, deadline, req.user.userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all projects
projectRouter.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Projects WHERE created_by = $1', [req.user.userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Routes for Task Management
const taskRouter = express.Router();

// Create a new task
taskRouter.post('/', authenticateToken, async (req, res) => {
    const { project_id, name, description, priority, due_date } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO Tasks (project_id, name, description, priority, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [project_id, name, description, priority, due_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Real-time Communication and Message Handling
const messageRouter = express.Router();

// Send a message
messageRouter.post('/', authenticateToken, async (req, res) => {
    const { project_id, content } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO Messages (sender_id, project_id, content) VALUES ($1, $2, $3) RETURNING *',
            [req.user.userId, project_id, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Notifications and Updates
const notificationRouter = express.Router();

// Get notifications for the user
notificationRouter.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Notifications WHERE user_id = $1', [req.user.userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mark notification as read
notificationRouter.put('/:id/read', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE Notifications SET is_read = TRUE WHERE notification_id = $1 AND user_id = $2', [id, req.user.userId]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Use routers
app.use('/users', userRouter);
app.use('/projects', projectRouter);
app.use('/tasks', taskRouter);
app.use('/messages', messageRouter);
app.use('/notifications', notificationRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
