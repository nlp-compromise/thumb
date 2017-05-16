var data = require('../1-top-freq/data');
var makeSuffixes = require('./makeSuffixes');
var output = require('./output');
var makeLexicon = require('./makeLexicon');
var shrinkRules = require('./shrinkRules');
var printRules = output.printRules
var printLexicon = output.printLexicon

var findExceptions = function(suffArr, data, len) {
  for (let i = 0; i < suffArr.length; i++) {
    let exceptions = {}
    let count = 0
    suffArr[i].exceptionCount = 0
    for (let o = 0; o < data.length; o++) {
      if (data[o].w.length > suffArr[i].str.length && data[o].w.endsWith(suffArr[i].str) && data[o].tag !== suffArr[i].tag) {
        let tag = data[o].tag
        exceptions[tag] = exceptions[tag] || []
        exceptions[tag].push(data[o].w)
        count += 1
      }
    }
    suffArr[i].exceptions = exceptions
    suffArr[i].exceptionCount = count
  }
  return suffArr
}


const shrinkList = function(suffArr, data) {
  data = data.filter((o) => {
    for (let i = 0; i < suffArr.length; i++) {
      let suffix = suffArr[i].str
      if (o.w.length > suffix.length && o.w.endsWith(suffix)) {
        return false
      }
    }
    return true
  })
  return data
}

let original = data.length
let all = []
for (let len = 4; len >= 2; len -= 1) {
  let suffArr = makeSuffixes(len, data)
  suffArr = findExceptions(suffArr, data)
  let before = data.length
  data = shrinkList(suffArr, data)
  // console.log('(' + len + ') - ' + suffArr.length + ' suffixes capture ' + (before - data.length) + ' words')
  all[len] = suffArr
}

let lex = makeLexicon(all, data)
printLexicon(lex)

all = shrinkRules(all)
printRules(all)

//---output information---
// let rules = 0
// let exceptions = 0
// for (let i = 0; i < all.length; i++) {
//   if (!all[i]) {
//     continue
//   }
//   for (let o = 0; o < all[i].length; o++) {
//     rules += 1
//     exceptions += Object.values(all[i][o].exceptions).reduce((sum, arr) => {
//       return sum + arr.length
//     }, 0)
//   }
// }
// console.log('\n\n' + rules + ' rules  ' + exceptions + ' exceptions')
// let diff = original - data.length
// console.log('reduced list from ' + original + ' to ' + data.length + ' ' + parseInt((diff / original) * 100) + '%')
//
// for (let i = 0; i < all.length; i++) {
//   if (!all[i]) {
//     continue
//   }
//   for (let o = 0; o < all[i].length; o++) {
//     let arr = Object.keys(all[i][o].exceptions).reduce((arr, k) => {
//       arr = arr.concat(all[i][o].exceptions[k])
//       return arr
//     }, [])
//     console.log(all[i][o].str + '  -(' + all[i][o].tag + ') - - ' + all[i][o].count + '  ' + arr.join(', '))
//   }
// }

// console.log(JSON.stringify(all, null, 2))
