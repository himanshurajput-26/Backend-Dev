const fs = require("fs");
const readline = require("readline");

const logFilePath = process.argv[2];
const reportFilePath = process.argv[3] || "summary_report.txt";

if (!logFilePath) {
  console.error("Usage: node logAnalyzer.js <logfile> [reportfile]");
  process.exit(1);
}

// Counters
let totalLines = 0;
let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

// Create read stream
const readStream = fs.createReadStream(logFilePath, {
  encoding: "utf8"
});

// Handle stream errors
readStream.on("error", (err) => {
  if (err.code === "ENOENT") {
    console.error("Error: Log file not found");
  } else if (err.code === "EACCES") {
    console.error("Error: Permission denied");
  } else {
    console.error("Error:", err.message);
  }
});

// Read line-by-line using readline
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

rl.on("line", (line) => {
  totalLines++;

  if (line.includes("ERROR")) errorCount++;
  else if (line.includes("WARNING")) warningCount++;
  else if (line.includes("INFO")) infoCount++;
});

rl.on("close", () => {
  const report = `
Log File Analysis Report
------------------------
Total Lines   : ${totalLines}
ERROR Count   : ${errorCount}
WARNING Count : ${warningCount}
INFO Count    : ${infoCount}
`;

  fs.writeFile(reportFilePath, report.trim(), (err) => {
    if (err) {
      console.error("Error writing report:", err.message);
    } else {
      console.log("Summary report generated:", reportFilePath);
    }
  });
});
