var sentences = require('../sentences')
var fs = require('fs')

var percent = function(n, all) {
  let num = (n / all) * 100
  num = Math.round(num * 100) / 100
  return num
}

var topk = function(arr) {
  let obj = {}
  arr.forEach((tag) => {
    obj[tag] = obj[tag] || 0
    obj[tag] += 1
  })
  let list = Object.keys(obj).map((k) => {
    return [k, percent(obj[k], arr.length)]
  })
  list = list.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1
    }
    return 1
  })
  return list
}

//do it by-word too
let words = {}
sentences.forEach((s) => {
  s.forEach((w) => {
    let str = w.w.toLowerCase()
    if (str && words.hasOwnProperty(str) === false) {
      words[str] = []
    }
    words[str].push(w.tag)
  })
})
let keys = Object.keys(words)
let len = keys.length
let arr = keys.map((k) => {
  return {
    w: k,
    count: words[k].length,
    tags: topk(words[k])
  }
})
arr = arr.sort((a, b) => {
  if (a.count > b.count) {
    return -1
  }
  return 1
})
console.log('writing words file..')
fs.writeFileSync('./de-words.json', JSON.stringify(arr, null, 1))
console.log('done.')
