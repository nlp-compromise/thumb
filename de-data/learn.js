var nlpThumb = require('../src');
var getWords = require('./getWords');

//adjectives
let adj = getWords('JJ');
adj = adj.filter((a) => a[1] > 1);
adj = adj.map((a) => a[0]);

let verb = getWords('VB');
verb = verb.filter((a) => a[1] > 1);
verb = verb.map((a) => a[0]);

// let nouns = getWords('NN');
// nouns = nouns.filter((a) => a[1] > 1);
// nouns = nouns.map((a) => a[0]);

// let rest = verb.concat(nouns);

//inlist, outlist
var rules = nlpThumb(adj, verb, {});
console.log(JSON.stringify(rules, null, 2));
