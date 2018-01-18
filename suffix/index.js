
const fs = require('fs')
const fns = require('./fns')
let wordList = require('../words')
const allWords = JSON.parse(JSON.stringify(wordList))
const init = wordList.length
const MIN_CARE = 6
//uses nlp-thumb to decide which list of suffixes best captures these words

let tag,
  suffixes;

//get words we care about as exceptions
const careAbout = {}
wordList.forEach((o) => {
  if (o.count > MIN_CARE) {
    careAbout[o.w] = true
  }
})

let lexicon = {}
let result = {}

tag = 'RB'
console.log('---', tag, '--')
suffixes = fns.getBoth(wordList, tag, 70).rules
lexicon = fns.getExceptions(suffixes, careAbout, lexicon)
result[tag] = suffixes.map((o) => o.suffix)
wordList = fns.removeFound(wordList, result[tag], lexicon)

tag = 'VB'
console.log('---', tag, '--')
suffixes = fns.getBoth(wordList, tag, 70).rules
lexicon = fns.getExceptions(suffixes, careAbout, lexicon)
result[tag] = suffixes.map((o) => o.suffix)
wordList = fns.removeFound(wordList, result[tag], lexicon)

tag = 'JJ'
console.log('---', tag, '--')
suffixes = fns.getBoth(wordList, tag, 70).rules
lexicon = fns.getExceptions(suffixes, careAbout, lexicon)
result[tag] = suffixes.map((o) => o.suffix)
wordList = fns.removeFound(wordList, result[tag], lexicon)

tag = 'NN'
console.log('---', tag, '--')
suffixes = fns.getBoth(wordList, tag, 30).rules
lexicon = fns.getExceptions(suffixes, careAbout, lexicon) //important
result[tag] = suffixes.map((o) => o.suffix)
wordList = fns.removeFound(wordList, result[tag], lexicon)

console.log('\n\n - ' + Object.keys(lexicon).length + ' exceptions total - ')
console.log('removed ' + (init - wordList.length) + ' words')

//lastly, post-process them into a good shape
Object.keys(lexicon).forEach((w) => {
  let obj = allWords.find((o) => o.w === w)
  if (!obj) {
    console.log(w)
  }
  lexicon[w] = obj.tags[0][0]
})
//re-format suffix-list
let allSuffix = [{}, {}, {}, {}, {}, {}, {}]
Object.keys(result).forEach((tag) => {
  result[tag].forEach((w) => {
    allSuffix[w.length][w] = tag
  })
})
fs.writeFileSync('./result/suffixes.json', JSON.stringify(allSuffix, null, 1))

//ok, finally add remaining top-n words to the lexicon
//(unless they're nouns)
let ambiguous = []
for (let i = 0; i < wordList.length; i += 1) {
  let w = wordList[i]
  if (w.tags[0][1] < 60) {
    ambiguous.push(w)
  }
  let tag = w.tags[0][0]
  if (w.count < 5 || i > 5000) {
    break
  }
  lexicon[w.w] = tag
}
console.log('\n\n' + ambiguous.length + ' ambiguous words')
console.log(Object.keys(lexicon).length + ' words in lexicon')
fs.writeFileSync('./result/lexicon.json', JSON.stringify(lexicon, null, 1))
fs.writeFileSync('./result/ambiguous.json', JSON.stringify(ambiguous, null, 1))
