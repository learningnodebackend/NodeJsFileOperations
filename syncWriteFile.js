const fs = require('fs');
try {
    fs.writeFileSync('output.txt', 'Hello, Node.js!');
    console.log('File has been written successfully.');
} catch (err) {
    console.error('Error writing file:', err);
}


console.log("this line will run after write the file")

