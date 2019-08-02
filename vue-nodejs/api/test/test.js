"use strict"

var assert = require('assert');
var db = require("../mysqlDB");
var app = require("../server");
var util = require('../util');
var chai = require('chai');
var chai_http = require('chai-http');

chai.use(chai_http);
chai.should();

describe("Users in MySQL", () => {
    describe("GET /user", () => {
        // Test to get all students record
        it("should get all users record", (done) => {
            chai.request(app)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // Test to get single student record
        it("should get a single student record", (done) => {
            const id = 1;
            chai.request(app)
                .get(`/user?id=${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});