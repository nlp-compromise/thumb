var data = require('../1-top-freq/data');

let suffixes = {}
for (let len = 4; len >= 2; len -= 1) {
  data.forEach((o) => {
    let word = o.w
    if (word.length < len + 2) {
      return
    }
    let suff = word.substr(word.length - len, word.length - 1)
    if (/[ 0-9]/.test(suff) === true) {
      return
    }
    suffixes[suff] = suffixes[suff] || {}
  // suffixes[suff] += 1
  })
}

// let arr = []
// Object.keys(suffixes).forEach((k) => {
//   if (suffixes[k] > 1) {
//     arr.push({
//       str: k,
//       count: suffixes[k],
//       size: k.length
//     })
//   }
// })
// arr = arr.sort((a, b) => {
//   if (a.size < b.size) {
//     return 1
//   }
//   if (a.count < b.count) {
//     return 1
//   }
//   return -1
// })
// console.log(arr)
