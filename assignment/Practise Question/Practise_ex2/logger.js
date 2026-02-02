const fs = require('fs');

function logMessage(message) {
    const timestamp = new Date().toISOString(); // Current date & time
    const log = `[${timestamp}] ${message}\n`;

    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        } else {
            console.log("Log saved successfully");
        }
    });
}

// Export function (so other files can use it)
module.exports = logMessage;
