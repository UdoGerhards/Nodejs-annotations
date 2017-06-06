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
    , applicationConstants = require("../../../lib/helper/constants")
    , ClassUnderTest = require(process.env.PWD + path.sep + "lib" + path.sep + "parser" + path.sep + "structure" + path.sep + "StructureParser.js");


describe("ClassParserTest", function () {

    var parser = null;
    var annotations = {};
    var expressionParser = {};
    var mocks = {};

    var annotationPath = process.env.PWD + path.sep + "lib" + path.sep + "annotation" + path.sep;
    var annotationParserPath = process.env.PWD + path.sep + "lib" + path.sep + "parser" + path.sep + "annotation" + path.sep;

    var parserPath = process.env.PWD + path.sep + "lib" + path.sep + "parser" + path.sep + "member" + path.sep;

    var resourcesPath = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep;

    var loggerConfig = process.env.PWD + path.sep + "test" + path.sep + "config" + path.sep + "log4js.json";
    log4js.configure(loggerConfig);

    var logger = log4js.getLogger("classParser");

    beforeEach(function () {

        // Load mocks

        var mockFiles = glob.sync(resourcesPath + "**/*.js");
        mockFiles.forEach(function (file) {
            var fileName = path.basename(file, path.extname(file));
            mocks[fileName] = file;
        });

        parser = ClassUnderTest;

        var files = glob.sync(annotationPath + "**/*.js");
        files.forEach(function (file) {
            var annotation = require(file);
            annotations[annotation.name] = annotation;
        });

        logger.trace(annotations);

        var ePFiles = glob.sync(parserPath + "**/*.js");
        ePFiles.forEach(function (file) {
            var eP = require(file);

            var expressionP = new eP();

            expressionP.annotations = annotations;
            expressionP.expressionParser = expressionParser;
            expressionP.logger = logger;

            expressionP.init();

            expressionParser[eP.name] = expressionP;
        });

        // AnnotationParser

        var annotationParserList = {};
        var files = glob.sync(annotationParserPath + "**/*.js");

        files.forEach(function (file) {
            var AnnotationParser = require(file);
            var supports = AnnotationParser.SUPPORTS;
            if (supports && supports.length > 0) {
                supports.forEach(function (annotationName) {

                    var annotationParser = new AnnotationParser();

                    annotationParser.annotationParser = annotationParserList;
                    annotationParser.tokenParser = expressionParser;
                    annotationParser.logger = logger;

                    annotationParserList[annotationName] = annotationParser;
                });
            }
        });

        logger.trace(annotationParserList);

        parser.expressionParser = expressionParser;

        logger.trace(util.inspect(parser.expressionParser, {depth: null}));

        parser.logger = logger;
    });

    afterEach(function () {

    });

    describe("InitTest", function () {
        it("Will initialize the parser", function () {

            parser.removeTokens = ['ExpressionStatement', 'AssignmentExpression', 'FunctionDeclaration'];
            parser.init();
            assert.typeOf(parser.regexAnnotation, 'regexp', "Regexpression could not be created!");

            assert.isObject(parser.expressionParser, "Expression parser are missing!");
        });
    });

    describe("SingleLineCommentToken", function () {
        it("Gets back the annotation from a single comment line", function () {

            var data = fs.readFileSync(mocks["SingleLineToken"]).toString();

            var fileInfo = [
                mocks["SingleLineToken"],
                data
            ];

            parser.init();
            var beanStack = parser.parse(fileInfo);

            logger.info(util.inspect(beanStack, {depth: 3}));


        });
    })

    describe("InnerBeansTestFunction", function () {

        it("Gets extracts all annotations from all comments from a target", function () {

            var data = fs.readFileSync(mocks["component2"]).toString();

            var fileInfo = [
                mocks["component2"],
                data
            ];

            parser.removeTokens = ['BlockStatement', 'AssignmentExpression', 'Identifier', 'Literal', 'FunctionExpression'];
            parser.init();
            var beanStack = parser.parse(fileInfo);
            assert.isNotNull(beanStack);
            assert.isObject(beanStack);

            logger.info(sizeOf(beanStack));
            logger.info(util.inspect(beanStack, {depth: 3}));

        });

    });

    describe("InnerBeansTestObject", function () {

        it("Gets extracts all annotations from all comments from a target", function () {

            var data = fs.readFileSync(mocks["ComponentWithObject"]).toString();

            var fileInfo = [
                mocks["ComponentWithObject"],
                data
            ];

            parser.removeTokens = ['BlockStatement', 'AssignmentExpression', 'Identifier', 'Literal']
            parser.init();
            var beanStack = parser.parse(fileInfo);
            assert.isNotNull(beanStack);
            assert.isObject(beanStack);
            //expect(beanStack).to.have.lengthOf(2);

            logger.info(sizeOf(beanStack));
            logger.info(util.inspect(beanStack, {depth: 3}));

        });

    });

    describe("ObjectWithInnerBeans", function () {

        it("Gets extracts all annotations from all comments from a target", function () {

            var data = fs.readFileSync(mocks["ObjectBean"]).toString();

            var fileInfo = [
                mocks["ObjectBean"],
                data
            ];

            parser.removeTokens = ['BlockStatement', 'AssignmentExpression', 'Identifier', 'Literal']
            parser.init();
            var beanStack = parser.parse(fileInfo);
            assert.isNotNull(beanStack);
            assert.isObject(beanStack);
            //expect(beanStack).to.have.lengthOf(2);

            logger.info(sizeOf(beanStack));
            logger.info(util.inspect(beanStack, {depth: 5}));

        });

    });

    describe("ClassWithInnerBeans", function () {

        it("Gets extracts all annotations from all comments from a target", function () {

            var data = fs.readFileSync(mocks["Class"]).toString();

            var fileInfo = [
                mocks["Class"],
                data
            ];

            parser.removeTokens = ['BlockStatement', 'AssignmentExpression', 'Identifier', 'Literal', 'ClassBody', 'ClassExpression']
            parser.init();
            var beanStack = parser.parse(fileInfo);
            assert.isNotNull(beanStack);
            assert.isObject(beanStack);
            //expect(beanStack).to.have.lengthOf(2);

            logger.info(sizeOf(beanStack));
            logger.info(util.inspect(beanStack, {depth: 3}));

        });

    });

});
