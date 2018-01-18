const thumb = require('./thumb')

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
    } else if (obj.count > 3) {
      both.no.push(obj.w)
    }
  })
  console.log('from ' + both.yes.length + ' words:') //, ' - -  - ', both.no.length)
  return thumb(both.yes, both.no, max_exception)
}


//build-up exceptions list
const getExceptions = (suffixes, careAbout, lexicon) => {
  let exceptions = {}
  suffixes.forEach((o) => {
    o.exceptions = o.exceptions.filter((w) => careAbout.hasOwnProperty(w))
    o.exceptions.forEach(w => exceptions[w] = true)
  })
  console.log('exceptions: ' + Object.keys(exceptions).length)
  lexicon = Object.assign(lexicon, exceptions)
  return lexicon
}


//remove found-words from wordlist..
const removeFound = (wordlist, suffixes, lexicon) => {
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
  console.log('removed ', start - wordlist.length, '\n\n')
  return wordlist
}
module.exports = {
  getExceptions: getExceptions,
  removeFound: removeFound,
  isMostly: isMostly,
  getBoth: getBoth
}
