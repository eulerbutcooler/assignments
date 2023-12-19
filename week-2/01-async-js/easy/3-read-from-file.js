const fs = require('fs');

fs.readFile('./data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    else {
        console.log(data);
    }
});

sum=0;

for(let i=0; i<1000000000; i++){
    sum+=i;
}
