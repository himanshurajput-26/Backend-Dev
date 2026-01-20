// fileOperations.js
const fs = require('fs');

// Read file
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Count words
  const wordCount = data.split(/\s+/).filter(Boolean).length;

  // Write count to new file
  fs.writeFile('wordCount.txt', `Word count: ${wordCount}`, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Word count saved to wordCount.txt');
  });
});
