'use strict';
const accumulate = require("./parseList/accumulate.js");
const findSignal = require("./findSignal");
const findExceptions = require("./findExceptions");
const findCoverage = require("./findCoverage");

const thumb = function(inlist, outlist, edge, options) {
  options = options || {};

  //create an obj with the frequency of each gram
  let inObj = accumulate(inlist, options);
  let outObj = accumulate(outlist, options);
  let rules = findSignal(inObj, outObj);
  //find exceptions to each rule
  rules = findExceptions(rules, outlist);
  //find how well we've done
  var coverage = findCoverage(rules, inlist);
  return {
    rules: rules,
    coverage: coverage
  };
};

module.exports = thumb;
//
// let inlist = [
//   "walking",
//   "talking",
//   "sleeping",
//   "jumping",
//   "juice"
// ]
// let outlist = [
//   "king",
//   "peanut butter",
//   "salad",
//   "hot potato",
//   "jamaica",
// ]
// console.log(thumb(inlist, outlist, {}))
