const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// In-memory student data
let students = [
    { id: 1, name: 'Hemant', marks: 85, grade: 'A' },
    { id: 2, name: 'Riya', marks: 55, grade: 'C' }
];

// GET all students
app.get('/students', (req, res) => {
    res.render('students', { students });
});

// GET student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.send('Student not found');
    res.render('student', { student });
});

// GET add-student form
app.get('/add-student', (req, res) => {
    res.render('add-student');
});

// POST add student
app.post('/add-student', (req, res) => {
    const { name, marks } = req.body;
    const grade = marks >= 50 ? 'Pass' : 'Fail';
    const newStudent = {
        id: students.length + 1,
        name,
        marks: parseInt(marks),
        grade
    };
    students.push(newStudent);
    res.redirect('/students');
});

app.listen(3002, () => console.log('Student Portal running on port 3002'));
