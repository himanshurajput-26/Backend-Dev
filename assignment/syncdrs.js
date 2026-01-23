const fs = require('fs').promises;
const path = require('path');

async function syncDirs(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });

    const srcFiles = await fs.readdir(src);
    const destFiles = await fs.readdir(dest);

    for (const file of srcFiles) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);

      if (!destFiles.includes(file)) {
        await fs.copyFile(srcPath, destPath);
        console.log('Copied:', file);
      }
    }
  } catch (err) {
    console.error('Sync error:', err.message);
  }
}

syncDirs('sourceDir', 'backupDir');
