'use strict'

var assert = require('assert');
var db = require("../mysqlDB");
var app = require('../server');
var util = require('../util');
var chai = require('chai');
var chai_http = require('chai-http');

chai.use(chai_http);
chai.should();

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});