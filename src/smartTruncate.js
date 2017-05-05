'use strict';

//takes a sorted list of numbers, and finds the most suitable cut-off point
const smartTruncate = function(arr, options) {
  options = options || {};
  if (!arr) {
    return [];
  }
  if (arr.length <= 1) {
    return arr;
  }
  arr.sort((a, b) => {
    return (a < b) ? 1 : -1;
  });
  let top = arr[0];
  //where it's at vs a linear decline
  for (let i = 0; i < arr.length; i++) {
    let percent_done = parseInt((i / arr.length) * 100);
    let reduction = 100 - parseInt((arr[i] / top) * 100);
    //if it's linear, it will all be 0
    let plusMinus = percent_done - reduction;

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

module.exports = smartTruncate;

// let options = {}
// let arr = [100, 90, 80, 10, 10, 1]
// let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// console.log(smart_truncate(arr, options))
