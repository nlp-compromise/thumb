'use strict';
let mocha = require('mocha');
let should = require('should');

const smart_truncate = require("../../src/smart_truncate.js")

describe('smartTruncate', function() {

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
  ].forEach(function(o) {
    let shorter = smart_truncate(o.long)
    it(o.long, function(done) {
      shorter.should.deepEqual(o.short);
      done();
    });
  });

});
