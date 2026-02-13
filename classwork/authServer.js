// authServer.js
const express = require('express');
const app = express();
app.use(express.json());

// Predefined users
const users = [
    { email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
    { email: 'user@example.com', password: 'user123', name: 'Regular User' }
];

// Dummy token storage (for simplicity)
const validTokens = new Set();

// POST /login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const token = `token-${Math.random().toString(36).substr(2)}`;
    validTokens.add(token);

    res.json({ message: 'Login successful', token });
});

// Authentication Middleware
function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token || !validTokens.has(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// Protected Routes
app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to Dashboard' });
});

app.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Here is your profile info' });
});

app.listen(3001, () => console.log('Auth API running on port 3001'));
