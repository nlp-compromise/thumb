var sentences = require('../sentences.json') //.slice(0, 200)

const blackList = {
  TRUNC: true,
  APPO: true,
  PROAV: true,
  XY: true,
}

const doSequences = (num) => {
  var chains = {}
  sentences.forEach((sentence) => {
    for (let i = num; i < sentence.length; i += 1) {
      let term = sentence[i]
      if (blackList[sentence[i - 3].tag] || blackList[sentence[i - 2].tag] || blackList[sentence[i - 1].tag]) {
        continue
      }
      let key = [sentence[i - 3].tag, sentence[i - 2].tag, sentence[i - 1].tag].join(',')
      chains[key] = chains[key] || {
        count: 0,
        after: {}
      }
      chains[key].after[term.tag] = chains[key].after[term.tag] || 0
      chains[key].count += 1
      chains[key].after[term.tag] += 1
    }
  })


  let result = {}
  Object.keys(chains).forEach((k) => {
    if (chains[k].count > 30) {
      Object.keys(chains[k].after).forEach((tag) => {
        let percent = (chains[k].after[tag] / chains[k].count) * 100
        if (percent > 70) {
          result[k] = tag
        }
      })
    }
  })
  console.log(result)
}
doSequences(3)
