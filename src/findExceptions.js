'use strict';

//list the outgroups that fit these rules
// (ie. 'false-positives')
const findExceptions = function(signals, outList) {
  for (let i = 0; i < signals.length; i++) {
    for (let o = 0; o < outList.length; o++) {
      if (outList[o].endsWith(signals[i].suffix)) {
        signals[i].exceptions.push(outList[o])
      }
    }
  }
  return signals
}

module.exports = findExceptions
