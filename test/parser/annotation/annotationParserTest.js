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
    , sizeOf = require("object-sizeof")
    , ClassUnderTest = require(process.env.PWD+path.sep+"lib"+path.sep+"parser"+path.sep+"annotation"+path.sep+"instance"+path.sep+"Bean"+path.sep+"BeanAnnotationParser.js");


describe("AnnotationParserTest", function() {

    var instance = this;
    var annotationParser = null;

    var annotations = {};
    var annotationParserList = {};
    var tokenParserList = {};
    var mocks = {};

    var annotationPath = process.env.PWD + path.sep + "lib" + path.sep + "annotation" + path.sep;
    var annotationParserPath = process.env.PWD + path.sep + "lib" + path.sep + "parser" + path.sep+"annotation"+path.sep;

    var parserPath = process.env.PWD + path.sep + "lib" + path.sep + "parser" + path.sep + "member" + path.sep;

    var resourcesPath = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep;

    var loggerConfig = process.env.PWD + path.sep + "test" + path.sep + "config" + path.sep + "log4js.json";

    log4js.configure(loggerConfig);

    var logger = log4js.getLogger("classParser");

    before(function() {

        // Mocks
        var mockFiles = glob.sync(resourcesPath + "**/*.js");
        mockFiles.forEach(function (file) {
            var fileName = path.basename(file, path.extname(file));
            mocks[fileName] = file;
        });

        // Annotations
        var files = glob.sync(annotationPath + "**/*.js");
        files.forEach(function (file) {
            var annotation = require(file);
            annotations[annotation.name] = annotation;
        });

        logger.trace(annotations);

        // Token parser
        var tokeParserFiles = glob.sync(parserPath + "**/*.js");
        tokeParserFiles.forEach(function (file) {
            var TokenParserClass = require(file);

            var tokenParser = new TokenParserClass();

            tokenParser.annotations = annotations;
            tokenParser.expressionParser = tokenParserList;
            tokenParser.logger = logger;

            tokenParser.init();

            tokenParserList[TokenParserClass.name] = tokenParser;
        });

        logger.trace(tokenParserList);

        // AnnotationParser

        //var files = glob.sync(annotationParserPath + "**/*.js");
        /*
        files.forEach(function (file) {
            var AnnotationParser = require(file);
            var supports = AnnotationParser.SUPPORTS;
            supports.forEach(function(annotationName) {

                var annotationParser = new AnnotationParser();

                annotationParser.annotationParser = annotationParserList;
                annotationParser.tokenParser = tokenParserList;
                annotationParser.logger = logger;

                annotationParserList[annotationName] = annotationParser;
            });
        });

        logger.trace(annotationParserList);

        logger.trace(util.inspect(expressionParser, {depth: null}));
        */

    });

    describe("AnnotationParserInitTest", function() {
        it("Checks if the annotation parsers will be correctly initialized", function() {

            var BeanParserClass = require(process.env.PWD+path.sep+"lib"+path.sep+"parser"+path.sep+"annotation"+path.sep+"instance"+path.sep+"Bean"+path.sep+"BeanAnnotationParser.js");
            var beanParser = new BeanParserClass();

            beanParser.tokenParser = tokenParserList;
            beanParser.annotationParser = {};
            beanParser.init();
        });
    });
})