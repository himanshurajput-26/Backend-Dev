// server.js
const express = require('express');
const app = express();

app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// In-memory users array
let users = [
    { id: 1, name: 'Himanshu', email: 'hemant@example.com', role: 'admin' },
    { id: 2, name: 'Riya', email: 'riya@example.com', role: 'user' }
];

// Validation Middleware
function validateUser(req, res, next) {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
        return res.status(400).json({ error: 'name, email, and role are required' });
    }
    next();
}

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// POST add user
app.post('/users', validateUser, (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT update user
app.put('/users/:id', validateUser, (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;

    res.json(user);
});

// DELETE user
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
});

// Start server
app.listen(3000, () => console.log('User Management API running on port 3000'));
