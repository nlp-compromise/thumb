'use strict';
const edgeGram = require("./edgegram")



//if "ing" and "ng" have the same count, remove "ng"
const removeSmaller = function(obj) {
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    //find suffixes of this rule, and see if they're redundant
    const options = {
      min: 2,
      max: keys[i].length - 1
    }
    let smaller = edgeGram.suffixes(keys[i], options)
    for (let o = 0; o < smaller.length; o++) {
      if (obj[smaller[o]] && obj[smaller[o]].count === obj[keys[i]].count) {
        // console.log("deleted " + smaller[o] + " because " + keys[i])
        delete obj[smaller[o]]
      }
    }
  }
  return obj
}

//if "ing" is stronger than "alking", remove it
const removeBigger = function(obj) {
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    for (let o = 0; o < i; o++) {
      if (keys[i].endsWith(keys[o])) {
        let smaller = keys[o]
        let bigger = keys[i]
        if (obj[smaller].count >= obj[bigger].count) {
          // console.log(bigger + " endswith " + smaller)
          delete obj[bigger]
          break
        }
      }
    }
  }
  return obj
}

const findRedundancies = function(obj) {
  //delete "ng" because of "ing" covers 100% same
  obj = removeSmaller(obj)
  obj = removeBigger(obj)
  return obj
}

module.exports = findRedundancies
