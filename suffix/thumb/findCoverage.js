'use strict';
const hasMatch = function(str, suffixes) {
  for (let o = 0; o < suffixes.length; o++) {
    if (str.endsWith(suffixes[o])) {
      return true;
    }
  }
  return false;
};
//
const findCoverage = (rules, inlist) => {
  var found = 0;
  var suffixes = rules.map((o) => o.suffix);
  for (let i = 0; i < inlist.length; i++) {
    if (hasMatch(inlist[i], suffixes)) {
      found += 1;
    }
  }
  return (found / inlist.length).toFixed(2);
};
module.exports = findCoverage;
