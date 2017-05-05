var nlpThumb = require('../src');
var getWords = require('./getWords');

const fmtRules = function(obj) {
  let rules = obj.rules.reduce((arr, o) => {
    let num = o.suffix.length;
    arr[num] = arr[num] || {};
    arr[num][o.suffix] = 1; //o.exceptions;
    return arr;
  }, []);
  for (let i = 0; i < rules.length; i++) {
    if (!rules[i]) {
      rules[i] = {};
    }
  }
  return rules;
};

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
var rules = nlpThumb(verb, adj, {});
// rules = fmtRules(rules);

let exceptions = [];
rules.rules.map((o) => {
  exceptions = exceptions.concat(o.exceptions);
});

console.log(JSON.stringify(exceptions, null, 2));
