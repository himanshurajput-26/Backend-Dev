const fs = require("fs").promises;
const path = require("path");

const SOURCE_DIR = process.argv[2];
const BACKUP_DIR = process.argv[3] || "backup";
const LOG_FILE = "backup.log";

const DAYS_7 = 7 * 24 * 60 * 60 * 1000;

// Logger
async function log(message) {
  const timestamp = new Date().toISOString();
  await fs.appendFile(LOG_FILE, `[${timestamp}] ${message}\n`);
}

// Ensure directory exists
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    await log(`Created directory: ${dir}`);
  }
}

// Backup & cleanup logic
async function processDirectory() {
  try {
    await ensureDir(SOURCE_DIR);
    await ensureDir(BACKUP_DIR);

    const files = await fs.readdir(SOURCE_DIR);

    for (const file of files) {
      const filePath = path.join(SOURCE_DIR, file);
      const stat = await fs.stat(filePath);

      if (stat.isFile()) {
        // Backup
        const timestamp = Date.now();
        const backupFile = path.join(
          BACKUP_DIR,
          `${timestamp}_${file}`
        );

        await fs.copyFile(filePath, backupFile);
        await log(`Backed up: ${file} -> ${backupFile}`);

        // Cleanup old files
        const age = Date.now() - stat.mtimeMs;
        if (age > DAYS_7) {
          await fs.unlink(filePath);
          await log(`Deleted old file: ${file}`);
        }
      }
    }

    console.log("Backup and cleanup completed successfully");
  } catch (err) {
    await log(`Error: ${err.message}`);
    console.error("Error:", err.message);
  }
}

// Run
if (!SOURCE_DIR) {
  console.error("Usage: node backupCleanup.js <sourceDir> [backupDir]");
  process.exit(1);
}

processDirectory();
