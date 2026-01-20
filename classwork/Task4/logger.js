const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "system-log.txt");

function logData(data) {
  const log = `${new Date().toISOString()} | ${JSON.stringify(data)}\n`;

  fs.appendFile(logPath, log, (err) => {
    if (err) console.error("Log error");
  });
}

module.exports = logData;
