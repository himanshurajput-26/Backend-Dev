const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());

app.use(session({ secret: 'auth-secret', resave: false, saveUninitialized: false }));

const users = [
  { id: 1, username: 'user', role: 'user' },
  { id: 2, username: 'mod', role: 'moderator' },
  { id: 3, username: 'admin', role: 'admin' }
];

const posts = [];

// Auth middleware
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) return res.status(401).json({ error: "Login required" });
  req.user = users.find(u => u.id === req.session.userId);
  next();
};

// Role middleware
const requireRole = role => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ error: "Access denied" });
  next();
};

// Owner or moderator
const isOwnerOrModerator = (req, res, next) => {
  const post = posts.find(p => p.id == req.params.id);

  if (!post) return res.status(404).json({ error: "Not found" });

  if (req.user.role === 'moderator' || req.user.role === 'admin' || post.userId === req.user.id) {
    req.post = post;
    return next();
  }

  res.status(403).json({ error: "Not allowed" });
};

// Create post
app.post('/posts', isAuthenticated, (req, res) => {
  const post = { id: posts.length + 1, content: req.body.content, userId: req.user.id };
  posts.push(post);
  res.json(post);
});

// Update post
app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
  req.post.content = req.body.content;
  res.json(req.post);
});

// Delete post
app.delete('/posts/:id', isAuthenticated, requireRole('moderator'), (req, res) => {
  res.json({ message: "Deleted" });
});

app.listen(3000);