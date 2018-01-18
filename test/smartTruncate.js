'use strict';
let tape = require('tape');
const smart_truncate = require("../suffix/thumb/smartTruncate.js")

tape('smartTruncate', function(t) {

  [
    {
      long: [100, 99, 98, 1, 1, 1],
      short: [100, 99, 98]
    },
    {
      long: [10, 10, 10, 10, 1],
      short: [10, 10, 10, 10]
    },
    {
      long: [10, 9, 9, 9, 8, 7, 2, 1, 1, 1, 1],
      short: [10, 9, 9, 9, 8, 7]
    },
    {
      long: [100, 9, 9, 9, 8, 7, 2, 1, 1, 1, 1],
      short: [100, 9]
    },
    {
      long: [100, 50],
      short: [100, 50]
    },
  ].forEach(function(o, i) {
    let shorter = smart_truncate(o.long)
    t.deepEqual(shorter, o.short, String(i))
  });
  t.end()
});
