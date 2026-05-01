const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;
let students = [];
let id = 1;

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  const { name, marks } = req.body;

  if (!name || marks < 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const student = { id: id++, name, marks };
  students.push(student);
  res.status(201).json(student);
});

app.put("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const { name, marks } = req.body;

  if (!name || marks < 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  student.name = name;
  student.marks = marks;
  res.json(student);
});

app.delete("/students/:id", (req, res) => {
  const index = students.findIndex((s) => s.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(index, 1);
  res.json({ message: "Student deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
