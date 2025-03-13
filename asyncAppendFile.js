const fs = require('fs');
fs.appendFile('output.txt', '\nThis is an additional line.', (err) => {
    if (err) console.error('Error appending to file:', err);
    else console.log('Text appended successfully.');
});
