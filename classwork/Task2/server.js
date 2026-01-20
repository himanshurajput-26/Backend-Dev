const http = require("http");
const url = require("url");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === "GET") {
    if (parsedUrl.pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to Node.js Server");
    }

    else if (parsedUrl.pathname === "/about") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>About Page</h1><p>Simple HTML Response</p>");
    }

    else if (parsedUrl.pathname === "/user") {
      const { name, age } = parsedUrl.query;

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        name: name || "Unknown",
        age: age || "Not provided"
      }));
    }

    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Page Not Found");
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
