'use strict';

const accumulate = function(len, data) {
  let suffixes = {}
  data.forEach((o) => {
    let word = o.w
    if (word.length < len + 2) {
      return
    }
    let suff = word.substr(word.length - len, word.length - 1)
    if (/[ 0-9]/.test(suff) === true) {
      return
    }
    suffixes[suff] = suffixes[suff] || {
      sum: 0
    }
    suffixes[suff][o.tag] = suffixes[suff][o.tag] || 0
    suffixes[suff][o.tag] += 1
    suffixes[suff].sum += 1
  })
  return suffixes
}

const filterBest = function(suffixes) {
  let arr = []
  Object.keys(suffixes).forEach((k) => {
    let sum = suffixes[k].sum
    if (sum > 1) {
      let keys = Object.keys(suffixes[k]).filter((tag) => tag !== 'sum')
      for (let i = 0; i < keys.length; i++) {
        if (suffixes[k][keys[i]] / sum > 0.7) {
          arr.push({
            str: k,
            tag: keys[i],
            exceptions: sum - suffixes[k][keys[i]],
            // old: suffixes[k],
            count: suffixes[k][keys[i]],
            size: k.length
          })
          break
        }
      }
    }
  })
  arr = arr.sort((a, b) => {
    if (a.size < b.size) {
      return 1
    }
    if (a.count < b.count) {
      return 1
    }
    return -1
  })
  return arr
}

//
const makeSuffixes = (len, data) => {
  let suffixes = accumulate(len, data)
  let arr = filterBest(suffixes)
  return arr
}
module.exports = makeSuffixes
