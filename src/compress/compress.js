//takes a list of strings, and creates a compressed-but-readable representation
//
'use strict';
let fns = require('../fns.js');
let arr = []; //require('/Users/spencer/mountain/nlp/nlp_compromise/src/data/verbs.js');

let remaining = arr;
let final = {};

const suffix = function(str, size) {
  let len = str.length;
  if (size <= 0) {
    return null;
  }
  if (size > len) {
    return null;
  }
  return str.substr(len - size, len);
};

const make_prefixes = function(suffix) {
  let str = '';
  let reg = new RegExp(suffix + '$');
  remaining = remaining.filter((s) => {
    if (s.match(reg)) {
      str += s.replace(reg, '') + ',';
      return false;
    }
    return true;
  });
  return str.replace(/,$/, '');
};

for (let size = 5; size > 1; size--) {
  console.log(remaining.length);
  let suffixes = remaining.map((s) => suffix(s, size)).filter((f) => f !== null);
  let matches = fns.topkp(suffixes);
  //find which to use
  for (let i = 0; i < matches.length; i++) {
    let m = matches[i];
    if (m.percent < 1 || m.count < 4) {
      break;
    }
    final[m.value] = make_prefixes(m.value);
  }
}
console.log(final);
console.log(remaining);
