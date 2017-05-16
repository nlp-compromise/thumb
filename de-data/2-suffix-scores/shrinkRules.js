'use strict';
//reduce redundant suffixes
const shrinkIf = function(big, small) {
  return big.filter((b) => {
    for (let i = 0; i < small.length; i++) {
      if (b.str.endsWith(small[i].str) && small[i].tag === b.tag) {
        return false
      }
    }
    return true
  })
}

const shrinkRules = (rules) => {
  let arr = []
  rules[4] = shrinkIf(rules[4], rules[3])
  rules[4] = shrinkIf(rules[4], rules[2])

  rules[3] = shrinkIf(rules[3], rules[2])
  return rules
}
module.exports = shrinkRules
