const fs = require('fs').promises;
const path = require('path');

// Folder to explore
const directoryPath = path.join(__dirname, 'testFolder');

// Convert bytes to KB/MB
function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

async function exploreDirectory(dir, level = 0) {
    try {
        const files = await fs.readdir(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stats = await fs.stat(fullPath);

            const indent = " ".repeat(level * 2);

            if (stats.isDirectory()) {
                console.log(`${indent}📁 ${file}  [Folder]`);
                await exploreDirectory(fullPath, level + 1); // recursion
            } else {
                console.log(`${indent}📄 ${file}  (${formatSize(stats.size)})`);
            }
        }

    } catch (err) {
        console.error("Error reading directory:", err.message);
    }
}

// Start exploring
console.log("🔍 Directory Explorer\n");
exploreDirectory(directoryPath);
