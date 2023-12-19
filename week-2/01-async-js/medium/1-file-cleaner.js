const fs = require('fs');

fs.readFile('./data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const cleandata = data.replace(/\s+/g, ' ');

    fs.writeFile("./data.txt", cleandata, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        else{
            console.log("File cleaned successfully!");
        }
    });

});