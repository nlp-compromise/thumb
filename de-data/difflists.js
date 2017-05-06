var inf = require('./words/infinitives.json');
var verbs = require('./rules/verb-exceptions.json');

console.log(verbs.length, inf.length);
verbs = verbs.filter((vb) => {
  return inf.indexOf(vb) === -1;
});
console.log(JSON.stringify(verbs, null, 2));
