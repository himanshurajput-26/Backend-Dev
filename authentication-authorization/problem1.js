const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const users = [];

// Password validation
function validatePassword(password) {
  const errors = [];

  if (password.length < 8) errors.push("Min 8 chars required");
  if (!/[A-Z]/.test(password)) errors.push("Must include uppercase");
  if (!/[a-z]/.test(password)) errors.push("Must include lowercase");
  if (!/\d/.test(password)) errors.push("Must include number");
  if (!/[!@#$%^&*]/.test(password)) errors.push("Must include special char");

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Register API
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  const validation = validatePassword(password);
  if (!validation.isValid)
    return res.status(400).json({ error: validation.errors });

  if (users.find(u => u.email === email))
    return res.status(409).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = { id: users.length + 1, username, email, password: hashed };
  users.push(user);

  res.status(201).json({ message: "Registered successfully" });
});

app.listen(3000);