'use strict';
//
const makeLexicon = (suffArr, data) => {
  let lex = {}
  for (let i = 0; i < suffArr.length; i++) {
    if (!suffArr[i]) {
      continue
    }
    for (let o = 0; o < suffArr[i].length; o++) {
      let obj = suffArr[i][o]
      Object.keys(obj.exceptions).forEach((k) => {
        lex[k] = lex[k] || []
        lex[k] = lex[k].concat(obj.exceptions[k])
      })
    }
  }
  //include missed-ones
  data.forEach((o) => {
    if (o.count > 24) {
      lex[o.tag] = lex[o.tag] || []
      lex[o.tag].push(o.w)
    }
  })
  return lex
}
module.exports = makeLexicon
