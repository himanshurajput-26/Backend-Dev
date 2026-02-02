const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, 'sourceFolder');
const backupDir = path.join(__dirname, 'backupFolder');
const errorLogPath = path.join(__dirname, 'error.log');

// Write errors to error.log
async function logError(error) {
    const message = `[${new Date().toISOString()}] ${error}\n`;
    await fs.appendFile(errorLogPath, message);
}

// Ensure backup directory exists
async function ensureBackupDir() {
    try {
        await fs.mkdir(backupDir, { recursive: true });
    } catch (err) {
        await logError("Error creating backup directory: " + err.message);
        throw err;
    }
}

// Backup files
async function backupFiles() {
    try {
        console.log("🔄 Starting backup...");

        const files = await fs.readdir(sourceDir);

        if (files.length === 0) {
            console.log("No files to backup.");
            return;
        }

        for (const file of files) {
            const sourcePath = path.join(sourceDir, file);
            const backupPath = path.join(backupDir, file);

            try {
                const stats = await fs.stat(sourcePath);

                if (stats.isFile()) {
                    await fs.copyFile(sourcePath, backupPath);
                    console.log("✅ Backed up:", file);
                }

            } catch (err) {
                await logError(`Error backing up file ${file}: ${err.message}`);
            }
        }

        console.log("✨ Backup completed.");

    } catch (err) {
        await logError("Critical error during backup: " + err.message);
        console.error("Backup failed. Check error.log");
    }
}

// Run
(async () => {
    await ensureBackupDir();
    await backupFiles();
})();
