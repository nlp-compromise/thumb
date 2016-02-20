'use strict'
const findPatterns = require("./findPatterns.js")
const findExceptions = require("./findExceptions.js")
const smartTruncate = require("./smart_truncate.js")

const find_rules = function(inlist, outlist, options) {
  options = options || {}

  let signals = findPatterns(inlist, outlist, "suffix", options)
  //truncate at a reasonable point..
  let strengths = signals.map((o) => o.strength)
  strengths = smartTruncate(strengths)
  signals = signals.slice(0, strengths.length)

  //find the exceptions to these rules
  let exceptions = findExceptions(signals, outlist)
  return {
    rules: signals,
    exceptions: exceptions
  }
}
module.exports = find_rules

// let inlist = [
//   "walking",
//   "talking",
//   "sleeping",
//   "jumping"
// ]
// let outlist = [
//   "king",
//   "peanut butter",
//   "salad",
//   "hot potato",
//   "daryl sutter",
//   "jamaica",
// ]
// console.log(find_rules(inlist, outlist, {}))