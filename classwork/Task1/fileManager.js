const fs = require("fs");
const path = require("path");

const [, , command, ...args] = process.argv;

// Common error handler
function handleError(err) {
  if (err.code === "ENOENT") {
    console.error("Error: File or directory not found");
  } else if (err.code === "EACCES") {
    console.error("Error: Permission denied");
  } else {
    console.error("Error:", err.message);
  }
}

switch (command) {

  // Read a file
  case "read": {
    const filePath = args[0];
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return handleError(err);
      console.log(data);
    });
    break;
  }

  // Write to a file
  case "write": {
    const [filePath, ...content] = args;
    fs.writeFile(filePath, content.join(" "), (err) => {
      if (err) return handleError(err);
      console.log("File written successfully");
    });
    break;
  }

  // Append logs to a file
  case "append": {
    const [filePath, ...content] = args;
    fs.appendFile(filePath, content.join(" ") + "\n", (err) => {
      if (err) return handleError(err);
      console.log("Content appended successfully");
    });
    break;
  }

  // Copy a file
  case "copy": {
    const [source, destination] = args;
    fs.copyFile(source, destination, (err) => {
      if (err) return handleError(err);
      console.log("File copied successfully");
    });
    break;
  }

  // Delete a file
  case "delete": {
    const filePath = args[0];
    fs.unlink(filePath, (err) => {
      if (err) return handleError(err);
      console.log("File deleted successfully");
    });
    break;
  }

  // List files in a directory
  case "list": {
    const dirPath = args[0];
    fs.readdir(dirPath, (err, files) => {
      if (err) return handleError(err);
      files.forEach(file => console.log(file));
    });
    break;
  }

  default:
    console.log(`
Usage:
 node fileManager.js read <file>
 node fileManager.js write <file> <content>
 node fileManager.js append <file> <content>
 node fileManager.js copy <source> <destination>
 node fileManager.js delete <file>
 node fileManager.js list <directory>
    `);
}
