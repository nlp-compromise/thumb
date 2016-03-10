'use strict';

//sort an array of objects by a specific field
exports.sortBy = function(arr, field) {
  arr = arr.sort((a, b) => {
    if (a[field] < b[field]) {
      return 1
    } else if (a[field] === b[field]) {
      return 0
    } else {
      return -1
    }
  })
  return arr
}

//frequency sorting
exports.topk = function(arr) {
  var length = arr.length || 1;
  var freq = {};
  var i = arr.length - 1;
  while (i > -1) {
    if (freq[arr[i]] == null) {
      freq[arr[i]] = 1;
    } else {
      freq[arr[i]]++;
    }
    i--;
  }
  var top = Object.keys(freq).sort(function(a, b) {
    return freq[b] - freq[a];
  });
  return top.map(function(v) {
    return {
      value: v,
      count: freq[v]
    };
  });
}

//topk with percentages instead of counts
exports.topkp = function(arr) {
  var l = arr.length
  arr = exports.topk(arr);
  return arr.map(function(o) {
    o.percentage = parseInt((o.count / l) * 100)
    return o
  })
}