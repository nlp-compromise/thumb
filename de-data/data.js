var fs = require('fs');
var data = fs.readFileSync('./build/tiger-data.json').toString().split('\n');

var have = {};
for (let i = 0; i < data.length; i++) {

}
console.log(data[2300]);
