'use strict';

const findExceptions = function(signals, outList) {
  return outList.filter((str) => {
    for (let i = 0; i < signals.length; i++) {
      if (str.endsWith(signals[i].gram)) {
        return true
      }
    }
    return false
  })
}

module.exports = findExceptions
