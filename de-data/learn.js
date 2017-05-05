var nlpThumb = require('../src');
var getWords = require('./getWords');

//adjectives
let adj = getWords('JJ');
adj = adj.filter((a) => a[1] > 1);
adj = adj.map((a) => a[0]);

let verb = getWords('VB');
verb = verb.filter((a) => a[1] > 1);
verb = verb.map((a) => a[0]);

let nouns = mostFrequent('NN');
nouns = nouns.filter((a) => a[1] > 1);
nouns = nouns.map((a) => a[0]);

// console.log(adj.length, verb.length, noun.length);

//inlist, outlist
console.log(nlpThumb(adj, verb.concat(nouns), {}));
// console.log(nlpThumb(verb, adj, {}));
