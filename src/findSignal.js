'use strict';
const fns = require("./fns.js");
const smartTruncate = require("./smartTruncate");


//truncate rules at a reasonable point..
const truncate = function(signals) {
  let strengths = signals.map((o) => o.strength);
  strengths = smartTruncate(strengths);
  return signals.slice(0, strengths.length);
};


const findSignal = function(inObj, outObj) {
  let difference = {};
  //unique union of all keys
  let keys = Object.keys(Object.assign({}, inObj, outObj));
  keys.forEach((k) => {
    outObj[k] = outObj[k] || {};
    inObj[k] = inObj[k] || {};
    let diff = (inObj[k].percent || 0) - (outObj[k].percent || 0);
    difference[k] = {
      diff: diff,
      inCount: inObj[k].count
    };
  });
  //turn it into an array (for sorting)
  let signals = [];
  Object.keys(difference).forEach((k) => {
    //remove negative signals(for now...)
    if (difference[k].diff > 0) {
      signals.push({
        suffix: k,
        count: difference[k].inCount,
        exceptions: [],
        strength: difference[k].diff.toFixed(4)
      });
    }
  });
  //sort it
  signals = fns.sortBy(signals, 'strength');
  //stop the long-tail at a good point
  // signals = truncate(signals);
  return signals;
};


module.exports = findSignal;
