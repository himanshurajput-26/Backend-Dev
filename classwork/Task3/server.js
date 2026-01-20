const http = require("http");
const fs = require("fs");
const url = require("url");

let students = [
  { id: 1, name: "Amit", branch: "CSE" },
  { id: 2, name: "Riya", branch: "IT" }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;

  const log = `${new Date().toISOString()} | ${method} | ${path}\n`;
  fs.appendFile("log.txt", log, () => {});

  // GET all students
  if (method === "GET" && path === "/students") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(students));
  }

  // GET student by ID
  else if (method === "GET" && path.startsWith("/students/")) {
    const id = parseInt(path.split("/")[2]);
    const student = students.find(s => s.id === id);

    if (student) {
      res.end(JSON.stringify(student));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Student not found" }));
    }
  }

  // POST new student
  else if (method === "POST" && path === "/students") {
    let body = "";

    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const newStudent = JSON.parse(body);
      newStudent.id = students.length + 1;
      students.push(newStudent);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newStudent));
    });
  }

  // DELETE student
  else if (method === "DELETE" && path.startsWith("/students/")) {
    const id = parseInt(path.split("/")[2]);
    students = students.filter(s => s.id !== id);

    res.end(JSON.stringify({ message: "Student deleted" }));
  }

  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

server.listen(4000, () => {
  console.log("Student API running on port 4000");
});
