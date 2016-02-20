'use strict'
const findPatterns = require("./findPatterns.js")

const find_rules = function(inlist, outlist, options) {
  options = options || {}
  let rules = []
  let exceptions = []

  let signals = findPatterns(inlist, outlist, options)
  return {
    rules: rules,
    exceptions: exceptions
  }
}

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
console.log(find_rules(inlist))