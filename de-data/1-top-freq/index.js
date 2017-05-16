var sentences = require('../data')
// console.log(sentences.length)
// sentences = sentences.slice(10, 500)

const normalize = function(str) {
  str = str.toLowerCase()
  str = str.replace(/-/g, ' ')
  str = str.replace(/[\.,:\?]/g, '')
  return str
}

//accumulate them all
let words = {}
sentences.forEach((sen) => {
  sen.forEach((o) => {
    if (o.tag === null) {
      return
    }
    let word = normalize(o.w)
    if (words[word] === undefined) {
      words[word] = {}
    }
    let tag = o.tag
    words[word][tag] = words[word][tag] || 0
    words[word][tag] += 1
  })
})

//decide the best tag
let arr = []
Object.keys(words).forEach((k) => {
  let o = words[k]
  let sum = Object.values(o).reduce((sum, int) => {
    return sum + int
  }, 0)
  if (sum <= 2) {
    return
  }
  let tags = Object.keys(o)
  for (let i = 0; i < tags.length; i++) {
    let percent = o[tags[i]] / sum
    if (percent > 0.7) { // 2/3rds of the time
      arr.push({
        w: k,
        count: o[tags[i]],
        tag: tags[i]
      })
      return
    }
  }
})
arr = arr.sort((a, b) => {
  if (a.count < b.count) {
    return 1
  }
  return -1
})
console.log(JSON.stringify(arr, null, 2))
