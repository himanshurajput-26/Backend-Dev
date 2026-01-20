// todoAPI.js
const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let idCounter = 1;

// Create
app.post('/tasks', (req, res) => {
  const task = { id: idCounter++, ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

// Read all
app.get('/tasks', (req, res) => res.json(tasks));

// Update
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).send('Task not found');
  Object.assign(task, req.body);
  res.json(task);
});

// Delete
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.send('Task deleted');
});

app.listen(3000, () => console.log('TODO API running on port 3000'));
