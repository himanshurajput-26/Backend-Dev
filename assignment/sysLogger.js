// sysLogger.js
const fs = require('fs');
const os = require('os');

setInterval(() => {
  const sysInfo = `
Time: ${new Date().toISOString()}
Platform: ${os.platform()}
CPU: ${os.cpus()[0].model}
Cores: ${os.cpus().length}
Total Memory: ${os.totalmem()} bytes
Free Memory: ${os.freemem()} bytes
-------------------------------
`;

  fs.appendFile('system.log', sysInfo, (err) => {
    if (err) console.error('Error logging system info:', err);
  });
}, 5000);
