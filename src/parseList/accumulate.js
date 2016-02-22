'use strict';
//takes two lists of words, and finds the patterns
const edgegrams = require("./edgegram")
const findRedundancies = require("./findRedundancies")
const fns = require("../fns")

//turn a list of words into a frequency obj of edgegrams
const accumulate = function(list, options) {
  //leftGram or rightGrams?
  let ngram_method = edgegrams.suffixes
  if (options.edge === "prefix") {
    ngram_method = edgegrams.prefixes
  }
  //begin,
  let hash = list.reduce((h, word) => {
    ngram_method(word).forEach((s) => {
      h[s] = h[s] || 0
      h[s] += 1
    })
    return h
  }, {})
  //turn values into their percentages
  let total = list.length
  Object.keys(hash).forEach((k) => {
    //1-case doesn't qualify as a pattern,
    // it's better as an exception list
    if (hash[k] <= 1) {
      delete hash[k]
    } else {
      hash[k] = {
        count: hash[k],
        percent: hash[k] / total
      }
    }
  })
  hash = findRedundancies(hash)
  return hash
}

module.exports = accumulate
