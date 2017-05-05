var nlpThumb = require('../src');
var getWords = require('./getWords');

//adjectives
let adj = mostFrequent('JJ');
adj = adj.filter((a) => a[1] > 1);
adj = adj.map((a) => a[0]);

let verb = mostFrequent('VB');
verb = verb.filter((a) => a[1] > 1);
verb = verb.map((a) => a[0]);

// let noun = mostFrequent('NN');
// noun = noun.filter((a) => a[1] > 1);
// noun = noun.map((a) => a[0]);

// console.log(adj.length, verb.length, noun.length);

//inlist, outlist
console.log(nlpThumb(adj, verb, {}));
