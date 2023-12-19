const fs = require('fs');

fs.writeFile('./data.txt', 'Hello World!', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    else {
        console.log('File written successfully!');
    }
});