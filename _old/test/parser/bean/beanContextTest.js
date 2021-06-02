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
    , _ = require("lodash");


describe("EstraversTest", function() {

    var example = null;
    var data = null;

    var loggerConfig = process.env.PWD+path.sep+"test"+path.sep+"config"+path.sep+"log4js.json";
    log4js.configure(loggerConfig);

    var logger = log4js.getLogger("estraverse");

    var regexAnnotation = new RegExp("@\\b(Service|Controller|Bean|Component|Qualifier)\\b[\s|\S]*\((.*)\)", "g");

    beforeEach(function() {

        example = process.env.PWD+path.sep+"test"+path.sep+"resources"+path.sep+"tokens"+path.sep+"ObjectExpression.js";
        data = fs.readFileSync(example).toString();

    });

    afterEach(function() {

    });

    describe("CommentMatchTest", function() {
        it("Extracts all comments from the given source code", function(){

            var instance = this;

            logger.trace(data);

            var astTree = esprima.parse(data, { sourceType: 'module', comment: true, loc: true, range: false});

            var flat = {};

            estraverse.traverse(astTree, {
                enter: function (node, parent) {
                    if (!flat[node.loc.start.line] && node.type !== "Program") {
                        var information = node;
                        flat[node.loc.start.line] = information;
                    }
                },
                leave: function (node, parent) {
                }
            });


            astTree.comments.forEach(function(node) {

                    flat[node.loc.start.line] = node;

            });

            var saveNextStatement = true;

            // Clean out rest
            var cleaned = {};
            _.forEach(flat, function(node, key) {

                    if (node.type === "Block" || node.type === "Line") {
                        saveNextStatement = true;
                        //cleaned[key] = node;
                    } else if (saveNextStatement || (node.type === "VariableDeclaration" && node.declarations[0].init.type === "ThisExpression")) {

                        // Constructor: We only need the declaration not the whole body of the function
                        if (node.type === "FunctionDeclaration") {
                            node.body = null;
                        }

                        // Member assignments (prototype)
                        if (node.type === "ExpressionStatement") {
                            node.expression.right = null;
                        }

                        //cleaned[key] = node;
                        saveNextStatement = false;
                    }

                cleaned[key] = node;
            });

            return logger.info(util.inspect(cleaned,  {depth:null}));

        });
    });
})

