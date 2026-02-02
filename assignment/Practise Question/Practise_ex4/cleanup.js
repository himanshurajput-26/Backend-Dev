const fs = require('fs').promises;
const path = require('path');

// 📂 Directory to clean
const directoryPath = path.join(__dirname, 'uploads');

// ⏳ 7 days in milliseconds
const DAYS_7 = 7 * 24 * 60 * 60 * 1000;

async function cleanupOldFiles() {
    try {
        console.log("🔍 Scanning directory:", directoryPath);

        const files = await fs.readdir(directoryPath);

        if (files.length === 0) {
            console.log("No files found.");
            return;
        }

        const now = Date.now();

        for (const file of files) {
            const filePath = path.join(directoryPath, file);

            try {
                const stats = await fs.stat(filePath);

                // Skip if it's a folder
                if (!stats.isFile()) continue;

                const fileAge = now - stats.mtimeMs;

                if (fileAge > DAYS_7) {
                    await fs.unlink(filePath);
                    console.log("🗑 Deleted old file:", file);
                } else {
                    console.log("✅ Kept recent file:", file);
                }

            } catch (err) {
                console.error("Error checking file:", file, err.message);
            }
        }

        console.log("✨ Cleanup finished!");

    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log("Directory does not exist.");
        } else {
            console.error("Error reading directory:", err.message);
        }
    }
}

cleanupOldFiles();
