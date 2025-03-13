const fs = require('fs');
fs.appendFileSync('output.txt', '\nThis is an additional line.');
console.log('Text appended successfully.');
