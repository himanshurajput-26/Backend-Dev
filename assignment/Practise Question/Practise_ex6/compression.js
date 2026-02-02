const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// File to compress
const inputFile = path.join(__dirname, 'bigfile.txt');

// Output compressed file
const outputFile = path.join(__dirname, 'bigfile.txt.gz');

// Create streams
const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

// Create gzip transform stream
const gzip = zlib.createGzip();

console.log("📦 Starting compression...");

// Pipe streams together
readStream
    .pipe(gzip)        // Compress data
    .pipe(writeStream) // Write compressed data
    .on('finish', () => {
        console.log("✅ File compressed successfully!");
    })
    .on('error', (err) => {
        console.error("❌ Compression failed:", err.message);
    });
