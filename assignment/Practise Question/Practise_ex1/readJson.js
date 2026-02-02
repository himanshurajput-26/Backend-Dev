const fs = require('fs');   // File system module

// Read JSON file
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }

    try {
        // Convert JSON string → JavaScript object
        const obj = JSON.parse(data);

        console.log("Full Object:", obj);
        console.log("Name:", obj.name);
        console.log("Course:", obj.course);
        console.log("Skills:", obj.skills);
    } catch (parseError) {
        console.log("Invalid JSON format:", parseError);
    }
});
