const fs = require('fs');
const readline = require('readline');

const logFile = 'app.log';
let errorCount = 0;
let warningCount = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(logFile),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.toLowerCase().includes('error')) errorCount++;
  if (line.toLowerCase().includes('warning')) warningCount++;
});

rl.on('close', () => {
  console.log('Log Analysis Report');
  console.log('Errors:', errorCount);
  console.log('Warnings:', warningCount);
});
