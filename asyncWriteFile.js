const fs = require('fs');

fs.writeFile('output.txt', 'Hello, Node.js! Good Morning....', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File has been written successfully.');
});
console.log("Non-blocking (other code executes while writing the file) ")