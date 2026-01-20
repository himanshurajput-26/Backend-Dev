const http = require("http");
const fs = require("fs");

const PORT = 8000;

const server = http.createServer((req, res) => {
  let responseMessage = "";

  switch (req.url) {
    case "/":
      responseMessage = "This is Home Page";
      res.end(responseMessage);
      break;

    case "/about":
      responseMessage = "This is About Page";
      res.end(responseMessage);
      break;

    case "/contact":
      responseMessage = "This is Contact Page";
      res.end(responseMessage);
      break;

    default:
      responseMessage = "404 Page Not Found";
      res.statusCode = 404;
      res.end(responseMessage);
  }

  const log = `${new Date().toISOString()} | ${req.url} | ${responseMessage}\n`;

  fs.appendFile("log.txt", log, (err) => {
    if (err) console.error("Logging error");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
