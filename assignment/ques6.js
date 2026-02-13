const express = require('express');
const app = express();

// Middleware to parse form data 
app.use(express.urlencoded({ extended: true }));

// Mock database for blog posts
let posts = [
    { id: 1, title: 'Getting Started with Express', content: 'Express is a minimal and flexible framework... [cite: 11]' },
    { id: 2, title: 'Using EJS', content: 'EJS lets you generate HTML with plain JavaScript[cite: 252].' }
];

// A. List all posts [cite: 385]
app.get('/posts', (req, res) => {
    res.render('posts', { title: 'Blog Home', posts: posts });
});

// B. View individual post using Route Parameters [cite: 77, 385]
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        res.render('post-detail', { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});

// C. Create new post via POST [cite: 385]
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/posts'); // Redirect back to the blog list
});