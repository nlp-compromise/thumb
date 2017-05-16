const fs = require('fs');
const path = require('path');

const fileSize = function(src) {
  var stats = fs.statSync(src);
  console.log((stats['size'] / 1000.0).toFixed(2) + 'kb\n')
};

exports.printRules = function(suffArr) {
  let all = {}
  for (let i = 0; i < suffArr.length; i++) {
    if (!suffArr[i]) {
      continue
    }
    for (let o = 0; o < suffArr[i].length; o++) {
      let obj = suffArr[i][o]
      let tag = obj.tag
      all[tag] = all[tag] || []
      all[tag].push(obj.str)
    }
  }
  let src = path.join(__dirname, '../rules.json')
  fs.writeFileSync(src, JSON.stringify(all, null, 2))
  console.log('rules:')
  fileSize(src)
}

exports.printLexicon = function(lex) {
  // console.log(JSON.stringify(lex, null, 2))
  console.log('lexion:')
  let src = path.join(__dirname, '../lexicon.json')
  fs.writeFileSync(src, JSON.stringify(lex, null, 2))
  fileSize(src)
}
