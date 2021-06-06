'use strict';

require('events').EventEmitter.defaultMaxListeners = Infinity;

const mocha = require('mocha');
const util = require('util');
const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const esprima = require('esprima');
const assert = require('chai').assert;

describe("Member analyzer test", function () {

    const logger = log4js.getLogger();
    const timeout = 50000;

    const pos = __dirname.indexOf("/test");
    const libRoot = __dirname.substring(0, pos);
    
    const testRoot = path.join(libRoot, "test");
    const resourceRoot = path.join(testRoot, "resources");
    const JScriptTestRoot = path.join(resourceRoot, "JScript");

    logger.info("Bean amalyzer test ...");

    let LIBRARY = path.join(libRoot, "lib");
    const FileObjectClass = require(path.join(LIBRARY, "foundation",
        "context", "JScript", "module", "File.js"));

    // Lib resources
    const foundation = path.join(LIBRARY, "foundation");
    const annotation = path.join(foundation, "annotation");
    const initialize = path.join(annotation, "initialize");

    // Test resources
    const simplePath = path.join(JScriptTestRoot, "simple");
    const analyzePath = path.join(simplePath, "analyze");
    const astPath = path.join(analyzePath, "AST");
    const memberPath = path.join(astPath, "Member");

    const Init = require(path.join(initialize, "init", "InitAnnotationClass"));
    const bootstrap = require(path.join(LIBRARY, "bootstrap", "bootstrap.js"));

    it("Testing class based member AST ... ", function () {

        this.timeout(timeout);

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            throw new Error("Could not initialize environment ... ");
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;
            const tree = require(path.join(memberPath, "clazz_member_AST.json"));
            const initAnnotation = new Init();

            const memberAnalyzer = analyzer.AnalyzerByAnnotationClazz[initAnnotation.constructor.name];
            const node = tree;

            const success = annotation => {
                assert.exists(annotation,
                    "Annotation was not correctly set and is null or undefined ...");
                logger.info(util.inspect(annotation));
            };

            const fail = rejected => {
                logger.error("Test was not success full ...");
                return rejected;
            }

            const waitForAnnotation = memberAnalyzer.analyze(node, initAnnotation);
            return waitForAnnotation.then(success, fail);
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing function based member AST ... ", function () {

        this.timeout(timeout);

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            throw new Error("Could not initialize environment ... ");
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;
            const tree = require(path.join(memberPath, "function_member_AST.json"));
            const initAnnotation = new Init();

            const memberAnalyzer = analyzer.AnalyzerByAnnotationClazz[initAnnotation.constructor.name];
            const node = tree;

            const success = annotation => {
                assert.exists(annotation,
                    "Annotation was not correctly set and is null or undefined ...");
                logger.info(util.inspect(annotation));
            };

            const fail = rejected => {
                logger.error("Test was not success full ...");
                return rejected;
            }

            const waitForAnnotation = memberAnalyzer.analyze(node, initAnnotation);
            return waitForAnnotation.then(success, fail);
        }

        return waitAnalzyerInit.then(resolve, reject);

    });

    it("Testing prototype based member AST ... ", function () {

        this.timeout(timeout);

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            throw new Error("Could not initialize environment ... ");
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;
            const tree = require(path.join(memberPath, "prototyped_member_AST.json"));
            const initAnnotation = new Init();

            const memberAnalyzer = analyzer.AnalyzerByAnnotationClazz[initAnnotation.constructor.name];
            const node = tree;

            const success = annotation => {
                assert.exists(annotation,
                    "Annotation was not correctly set and is null or undefined ...");
                logger.info(util.inspect(annotation));
            };

            const fail = rejected => {
                logger.error("Test was not success full ...");
                return rejected;
            }

            const waitForAnnotation = memberAnalyzer.analyze(node, initAnnotation);
            return waitForAnnotation.then(success, fail);
        }

        return waitAnalzyerInit.then(resolve, reject);

    });
});