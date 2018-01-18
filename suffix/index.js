let words = require('../words')
const thumb = require('./thumb')
const fs = require('fs')
//uses nlp-thumb to decide which list of suffixes best captures these words

const isMostly = (obj, tag) => {
  let f = obj.tags.find((t) => t[0] === tag)
  if (!f || f[1] <= 75) {
    return false
  }
  return true
}

const getBoth = (tag) => {
  let both = {
    yes: [],
    no: []
  }
  words.forEach((obj) => {
    if (isMostly(obj, tag) === true) {
      both.yes.push(obj.w)
    } else {
      both.no.push(obj.w)
    }
  })
  console.log(both.yes.length, ' - ', both.no.length)
  return thumb(both.yes, both.no)
}

let done = getBoth('NN')
// suffixes = {
//   suffixes: [],
//   exceptions: []
// }
fs.writeFileSync('../suffixes.json', JSON.stringify(done, null, 2))
console.log(done)
