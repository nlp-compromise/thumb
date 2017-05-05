var fs = require('fs');
var tags = require('./tags');

var XmlStream = require('xml-stream');
var file = '/home/spencer/nlp/de-compromise/tiger_release_aug07.corrected.16012013.xml';
var stream = fs.createReadStream(file);
var xml = new XmlStream(stream);

xml.collect('t');
xml.on('endElement: terminals', function(term) {
  let terms = term.t;
  let sentence = [];
  terms.forEach((t) => {
    let obj = t['$'];
    if (!obj.word || obj.pos[0] === '$') {
      return;
    }
    let res = {
      w: obj.word,
      tag: tags[obj.pos] || obj.pos,
    };
    //nouns
    if (obj.number !== '--') {
      res.num = obj.number;
    }
    if (obj.gender !== '--') {
      res.g = obj.gender;
    }
    //verbs
    if (obj.tense !== '--') {
      res.tense = obj.tense;
    }
    if (obj.mood !== '--') {
      res.mood = obj.mood;
    }
    sentence.push(res);
  });
  // console.log(sentence);
  console.log(JSON.stringify(sentence));
});
