'use strict';

var mocha = require("mocha")
    , assert = require("chai").assert
    , expect = require("chai").expect
    , estraverse = require("estraverse")
    , esprima = require("esprima")
    , log4js = require("log4js")
    , fs = require("fs-extra")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , glob = require("glob")
    , ClassUnderTest = require(process.env.PWD + path.sep +"lib"+path.sep+"factory"+path.sep+"Factory.js");

describe("FactoryTestSuite", function () {

    var factory = null;

    var loggerConfig = process.env.PWD + path.sep + "test" + path.sep + "config" + path.sep + "log4js.json";

    log4js.configure(loggerConfig);
    var logger = log4js.getLogger("factory");
    logger.setLevel("INFO");

    beforeEach(function () {

        factory = ClassUnderTest;
        factory.logger = logger;

    });

    afterEach(function () {

    });

    describe("FactoryInit", function() {

        it("Tests the initializtation of the factory object", function() {
            factory.init();
        })
    })

})