'use strict';
//takes two lists of words, and finds the patterns
const edgegrams = require("./edgegram")

//turn a list of words into a edgegram-frequency object
const accumulate = function(list, getGrams, options) {
  let hash = list.reduce((h, word) => {
    getGrams(word).forEach((s) => {
      h[s] ? h[s] += 1 : h[s] = 1
    })
    return h
  }, {})
  //turn values into their percentages
  let total = list.length
  Object.keys(hash).forEach((k) => {
    //1-case doesn't qualify as a pattern,
    //it's better as an exception list
    if (hash[k] <= 1) {
      delete hash[k]
    } else {
      hash[k] = hash[k] / total
    }
  })
  return hash
}

const compare = function(inObj, outObj) {
  let difference = {}
  //unique union of all keys
  let keys = Object.keys(Object.assign({}, inObj, outObj))
  keys.forEach((k) => {
    difference[k] = (inObj[k] || 0) - (outObj[k] || 0)
  })
  //turn it into an array (for sorting)
  let signals = []
  Object.keys(difference).forEach((k) => {
    signals.push({
      gram: k,
      strength: k.length * difference[k]
    })
  })
  //sort it
  signals.sort((a, b) => {
    if (a.strength < b.strength) {
      return 1
    } else if (a.strength === b.strength) {
      return 0
    } else {
      return -1
    }
  })
  console.log(signals)
}

const findPatterns = function(inlist, outlist, edge, options) {
  options = options || {}
  //leftGram or rightGrams?
  let ngram_method = edgegrams.suffixes
  if (edge === "prefix" || edge === "prefixes") {
    ngram_method = edgegrams.prefixes
  }
  //create an obj with the frequency of each gram
  let inObj = accumulate(inlist, ngram_method, options)
  let outObj = accumulate(outlist, ngram_method, options)
  compare(inObj, outObj)
  return
}

module.exports = findPatterns

let inlist = [
  "walking",
  "talking",
  "sleeping",
  "jumping"
]
let outlist = [
  "king",
  "peanut butter",
  "salad",
  "hot potato",
  "daryl sutter",
  "jamaica",
]
console.log(findPatterns(inlist, outlist, "suffix", {}))