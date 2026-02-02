const fs = require('fs').promises;
const path = require('path');

const sourceDir = './source';
const backupDir = './backup';

// Function to create timestamp
function getTimestamp() {
    const now = new Date();

    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS

    return `${date}_${time}`;
}

async function backupFiles() {
    try {
        // Ensure backup folder exists
        await fs.mkdir(backupDir, { recursive: true });

        // Read files in source directory
        const files = await fs.readdir(sourceDir);

        if (files.length === 0) {
            console.log("No files to backup.");
            return;
        }

        for (const file of files) {
            const sourcePath = path.join(sourceDir, file);

            // Check if it's a file
            const stats = await fs.stat(sourcePath);
            if (!stats.isFile()) continue;

            const ext = path.extname(file);         // .txt
            const name = path.basename(file, ext);  // file name without extension

            const timestamp = getTimestamp();
            const newFileName = `${name}_${timestamp}${ext}`;

            const destPath = path.join(backupDir, newFileName);

            await fs.copyFile(sourcePath, destPath);

            console.log(`Backed up: ${file} → ${newFileName}`);
        }

        console.log("✅ Backup completed successfully!");
    } catch (err) {
        console.error("❌ Error during backup:", err.message);
    }
}

backupFiles();
