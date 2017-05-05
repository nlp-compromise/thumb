var fs = require('fs');
var data = fs.readFileSync('./build/tiger-data.json').toString().split('\n');

const normalize = (str) => {
  str = str.toLowerCase();
  // ä, ö and ü, ß
  str = str.replace(/ä/u, 'ae');
  str = str.replace(/ö/u, 'oe');
  str = str.replace(/ü/u, 'ue');
  str = str.replace(/ß/u, 'ss');
  str = str.replace(/[0-9\.\.]/g, '');
  return str;
};

const mostFrequent = function(tag) {
  var have = {};
  for (let i = 0; i < data.length; i++) {
    try {
      let arr = JSON.parse(data[i]);
      for (let o = 0; o < arr.length; o++) {
        let w = normalize(arr[o].w);
        //positive pos-use indicator
        if (arr[o].tag === tag) {
          if (w !== '') {
            have[w] = have[w] || 0;
            have[w] += 1;
          }
        } else if (have[w]) { //negative pos-use indicator
          have[w] -= 1;
        }
      }
    } catch (e) {}
  }
  let result = Object.keys(have).map((k) => [k, have[k]]);
  result = result.sort((a, b) => {
    if (a[1] < b[1]) {
      return 1;
    }
    return -1;
  });
  return result;
};
module.exports = mostFrequent;

//adverbs
// let all = mostFrequent('RB');
// all = all.filter((a) => a[1] > 0);
// all = all.map((a) => a[0]);
// console.log(JSON.stringify(all));

//conjunctions, determiners, pronouns, auxillaries
// let all = mostFrequent('Aux');
// all = all.filter((a) => a[1] > 1);
// all = all.map((a) => a[0]);
// console.log(JSON.stringify(all));

//infinitive verbs
// let all = mostFrequent('Inf');
// all = all.filter((a) => a[1] > 1);
// all = all.map((a) => a[0]);
// console.log(JSON.stringify(all));
