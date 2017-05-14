'use strict'

const suffix = function(str, size) {
  let len = str.length
  if (size <= 0) {
    return null
  }
  if (typeof str !== 'string') {
    return null
  }
  if (size > len) {
    return null
  }
  return str.substr(len - size, len)
}

const prefix = function(str, size) {
  let len = str.length
  if (size <= 0) {
    return null
  }
  if (size > len) {
    return null
  }
  return str.substr(0, size)
}

const suffixes = function(str, options) {
  options = options || {}
  options.max = options.max || 6
  options.min = options.min || 2
  let arr = []
  //get all sizes of gram
  for (let n = options.min; n <= options.max; n++) {
    arr.push(suffix(str, n))
  }
  //avoid nulls
  arr = arr.filter((a) => a !== null)
  return arr
}

const prefixes = function(str, options) {
  options = options || {}
  options.max = options.max || 6
  options.min = options.min || 2
  let arr = []
  //get all sizes of gram
  for (let n = options.min; n <= options.max; n++) {
    arr.push(prefix(str, n))
  }
  //avoid nulls
  arr = arr.filter((a) => a !== null)
  return arr
}

module.exports = {
  prefixes: prefixes,
  suffixes: suffixes
}

// console.log(suffixes("taiwan", {}))
// console.log(prefixes("taiwan", {}))
