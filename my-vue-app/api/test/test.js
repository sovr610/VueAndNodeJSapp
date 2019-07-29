'use strict'

var assert = require('assert');
var db = require("../mysql");
var app = require('../server');
var util = require('../util');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});
