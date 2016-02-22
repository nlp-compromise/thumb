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
