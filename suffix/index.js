const thumb = require('./thumb')
const fs = require('fs')
let wordList = require('../words')
const init = wordList.length
const MIN_CARE = 3
//uses nlp-thumb to decide which list of suffixes best captures these words

const isMostly = (obj, tag) => {
  let f = obj.tags.find((t) => t[0] === tag)
  if (!f || f[1] <= 75) {
    return false
  }
  return true
}

const getBoth = (words, tag, max_exception) => {
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
  // console.log(both.yes.length, ' - ', both.no.length)
  return thumb(both.yes, both.no, max_exception)
}

//get words we care about as exceptions
const careAbout = {}
wordList.forEach((o) => {
  if (o.count > MIN_CARE) {
    careAbout[o.w] = true
  }
})

//build-up exceptions list
const getExceptions = (suffixes, lexicon) => {
  let exceptions = {}
  suffixes.forEach((o) => {
    o.exceptions = o.exceptions.filter((w) => careAbout.hasOwnProperty(w))
    o.exceptions.forEach(w => exceptions[w] = true)
  })
  console.log('exceptions: ' + Object.keys(exceptions).length)
  lexicon = Object.assign(lexicon, exceptions)
  return lexicon
}


let lexicon = {}
let result = {}

//remove found-words from wordlist..
const removeFound = (wordlist, suffixes) => {
  let start = wordlist.length
  console.log('suffixes: ', suffixes.length)
  wordlist = wordlist.filter((o) => {
    if (lexicon.hasOwnProperty(o.w)) {
      return false
    }
    for (let i = 0; i < suffixes.length; i += 1) {
      if (o.w.endsWith(suffixes[i])) {
        return false
      }
    }
    return true
  })
  console.log('removed ', start - wordlist.length, ' words of ' + start, '\n\n')
  return wordlist
}


let tag,
  suffixes;

tag = 'RB'
console.log('---', tag, '--')
suffixes = getBoth(wordList, tag, 100).rules
lexicon = getExceptions(suffixes, lexicon)
result[tag] = suffixes.map((o) => o.suffix)
wordList = removeFound(wordList, result[tag])

tag = 'VB'
console.log('---', tag, '--')
suffixes = getBoth(wordList, tag, 70).rules
lexicon = getExceptions(suffixes, lexicon)
result[tag] = suffixes.map((o) => o.suffix)
wordList = removeFound(wordList, result[tag])

tag = 'JJ'
console.log('---', tag, '--')
suffixes = getBoth(wordList, tag, 100).rules
lexicon = getExceptions(suffixes, lexicon)
result[tag] = suffixes.map((o) => o.suffix)
wordList = removeFound(wordList, result[tag])

// tag = 'NN'
// console.log('---', tag, '--')
// suffixes = getBoth(wordList, tag, 100).rules
// lexicon = getExceptions(suffixes, lexicon)
// result[tag] = suffixes.map((o) => o.suffix)
// wordList = removeFound(wordList, result[tag])

console.log('\n\n - ' + Object.keys(lexicon).length + ' exceptions total - ')
console.log('removed ' + (init - wordList.length) + ' words')
// fs.writeFileSync('../suffixes.json', JSON.stringify(done, null, 2))
