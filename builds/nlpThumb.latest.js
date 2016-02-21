(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nlpThumb = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var suffix = function suffix(str, size) {
  var len = str.length;
  if (size <= 0) {
    return null;
  }
  if (size > len) {
    return null;
  }
  return str.substr(len - size, len);
};

var prefix = function prefix(str, size) {
  var len = str.length;
  if (size <= 0) {
    return null;
  }
  if (size > len) {
    return null;
  }
  return str.substr(0, size);
};

var suffixes = function suffixes(str, options) {
  options = options || {};
  options.max = options.max || 6;
  options.min = options.min || 2;
  var arr = [];
  //get all sizes of gram
  for (var n = options.min; n <= options.max; n++) {
    arr.push(suffix(str, n));
  }
  //avoid nulls
  arr = arr.filter(function (a) {
    return a !== null;
  });
  return arr;
};

var prefixes = function prefixes(str, options) {
  options = options || {};
  options.max = options.max || 6;
  options.min = options.min || 2;
  var arr = [];
  //get all sizes of gram
  for (var n = options.min; n <= options.max; n++) {
    arr.push(prefix(str, n));
  }
  //avoid nulls
  arr = arr.filter(function (a) {
    return a !== null;
  });
  return arr;
};

module.exports = {
  prefixes: prefixes,
  suffixes: suffixes
};

// console.log(suffixes("taiwan", {}))
// console.log(prefixes("taiwan", {}))

},{}],2:[function(require,module,exports){
'use strict';

var findExceptions = function findExceptions(signals, outList) {
  return outList.filter(function (str) {
    for (var i = 0; i < signals.length; i++) {
      if (str.endsWith(signals[i].gram)) {
        return true;
      }
    }
    return false;
  });
};

module.exports = findExceptions;

},{}],3:[function(require,module,exports){
'use strict';
//takes two lists of words, and finds the patterns

var edgegrams = require("./edgegram");

//turn a list of words into a edgegram-frequency object
var accumulate = function accumulate(list, getGrams, options) {
  var hash = list.reduce(function (h, word) {
    getGrams(word).forEach(function (s) {
      h[s] ? h[s] += 1 : h[s] = 1;
    });
    return h;
  }, {});
  //turn values into their percentages
  var total = list.length;
  Object.keys(hash).forEach(function (k) {
    //1-case doesn't qualify as a pattern,
    // it's better as an exception list
    if (hash[k] <= 1) {
      delete hash[k];
    } else {
      hash[k] = hash[k] / total;
    }
  });
  return hash;
};

//"ng" is redundant if "ing" is equal/stronger
var removeRedundancies = function removeRedundancies(signals) {
  //remove negative signals(for now...)
  signals = signals.filter(function (a) {
    return a.strength > 0;
  });
  return signals;
};

var compare = function compare(inObj, outObj) {
  var difference = {};
  //unique union of all keys
  var keys = Object.keys(Object.assign({}, inObj, outObj));
  keys.forEach(function (k) {
    difference[k] = (inObj[k] || 0) - (outObj[k] || 0);
  });
  //turn it into an array (for sorting)
  var signals = [];
  Object.keys(difference).forEach(function (k) {
    signals.push({
      gram: k,
      length: k.length,
      signal: difference[k],
      //this is a subjective combination of signal+length:
      strength: k.length * difference[k]
    });
  });
  //sort it
  signals.sort(function (a, b) {
    if (a.strength < b.strength) {
      return 1;
    } else if (a.strength === b.strength) {
      return 0;
    } else {
      return -1;
    }
  });
  //if "ing" and "ng" have the same signal, remove "ng"
  signals = removeRedundancies(signals);
  return signals;
};

var findPatterns = function findPatterns(inlist, outlist, edge, options) {
  options = options || {};
  //leftGram or rightGrams?
  var ngram_method = edgegrams.suffixes;
  if (edge === "prefix" || edge === "prefixes") {
    ngram_method = edgegrams.prefixes;
  }
  //create an obj with the frequency of each gram
  var inObj = accumulate(inlist, ngram_method, options);
  var outObj = accumulate(outlist, ngram_method, options);
  return compare(inObj, outObj);
};

module.exports = findPatterns;

},{"./edgegram":1}],4:[function(require,module,exports){
'use strict';

var findPatterns = require("./findPatterns.js");
var findExceptions = require("./findExceptions.js");
var smartTruncate = require("./smart_truncate.js");

var find_rules = function find_rules(inlist, outlist, options) {
  options = options || {};

  var signals = findPatterns(inlist, outlist, "suffix", options);
  //truncate at a reasonable point..
  var strengths = signals.map(function (o) {
    return o.strength;
  });
  strengths = smartTruncate(strengths);
  signals = signals.slice(0, strengths.length);

  //find the exceptions to these rules
  var exceptions = findExceptions(signals, outlist);
  return {
    rules: signals,
    exceptions: exceptions
  };
};
module.exports = find_rules;

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

},{"./findExceptions.js":2,"./findPatterns.js":3,"./smart_truncate.js":5}],5:[function(require,module,exports){
'use strict';

//takes a sorted list of numbers, and finds the most suitable cut-off point

var smart_truncate = function smart_truncate(arr, options) {
  options = options || {};
  if (!arr) {
    return [];
  }
  if (arr.length <= 1) {
    return arr;
  }
  arr.sort(function (a, b) {
    return a < b ? 1 : -1;
  });
  var top = arr[0];
  //where it's at vs a linear decline
  for (var i = 0; i < arr.length; i++) {
    var percent_done = parseInt(i / arr.length * 100);
    var reduction = 100 - parseInt(arr[i] / top * 100);
    //if it's linear, it will all be 0
    var plusMinus = percent_done - reduction;

    //begin our 'soft' truncation rules
    if (percent_done > 10 && plusMinus < -40) {
      return arr.slice(0, i);
    }
    if (percent_done > 30 && plusMinus < -20) {
      return arr.slice(0, i);
    }
    if (percent_done > 50 && plusMinus < 0) {
      return arr.slice(0, i);
    }
    if (percent_done > 70 && plusMinus < 20) {
      return arr.slice(0, i);
    }
    if (percent_done > 90 && plusMinus < 40) {
      return arr.slice(0, i);
    }
  }
  return arr;
};

module.exports = smart_truncate;

// let options = {}
// let arr = [100, 90, 80, 10, 10, 1]
// let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// console.log(smart_truncate(arr, options))

},{}]},{},[4])(4)
});