'use strict';

require('events').EventEmitter.defaultMaxListeners = Infinity;

const mocha = require('mocha');
const util = require('util');
const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const esprima = require('esprima');
const assert = require('chai').assert;

describe("ECMAScript test", function () {

    const logger = log4js.getLogger();
    const timeout = 50000;

    const pos = process.env.PWD.indexOf("/test");
    let libRoot = "";
    if (pos > -1) {
        libRoot = process.env.PWD.substring(0, pos);
    } else {
        libRoot = process.env.PWD;
    }
    const testRoot = path.join(libRoot, "test");
    const resourceRoot = path.join(testRoot, "resources");
    const JScriptTestRoot = path.join(resourceRoot, "JScript");

    logger.info("ECMAScript testing ...");

    let LIBRARY = path.join(libRoot, "lib");
    const FileObjectClass = require(path.join(LIBRARY, "foundation",
        "context", "JScript", "module", "File.js"));

    it("Testing the setup of entity", function () {
        logger.info("Test: Detect simple class");

        /*
         * Test preparation
         */
        const bootstrap = require(path.join(LIBRARY, "bootstrap", "bootstrap.js"));

        var contextInfo = {
            "scan": []
        };

        this.timeout(timeout);

        let resolve = function (resolve) {
            logger.info("Processing was resolved ... ");
            logger.info(util.inspect(resolve, {
                depth: null
            }));
        }

        let reject = function (reject) {
            logger.info(
                "Processing was rejected ... result was expected ... checking object if setup was successfull! ");

            let analyzer = reject.classStructAnalyzer;

            // Start test_service

            assert.exists(analyzer.util, "Util is not defined ...");
            assert.exists(analyzer.esprima, "Esprima is not defined ... ");
            assert.exists(analyzer.LogManager, "LogManager is not defined ...");
            assert.exists(analyzer.deepMerge, "DeepMerge is not defined ...");
            assert.exists(analyzer.SupportAwareClazz, "SupportAwareClazz is not defined ... ");
            assert.exists(analyzer.BeanAwareClazz, "BeanAwareClazz is not defined ... ");
            assert.exists(analyzer.Analyzer, "Analyzer is not defined ... ");
            assert.isArray(analyzer.Analyzer, "Analyzer is not an array ...");
            assert.exists(analyzer.AnalyzerByAnnotationClazz, "AnalyzerByAnnotationClazz is not defined ...");
            assert.exists(analyzer.AnnotationClasses, "Annotation classes are not defined ...");

            // Get the right analyzer: BeanAware

            let beanAnalyzer = null;
            let propertyAnalyzer = null;
            let memberAnalyzer = null;
            let supportAnalyzer = null;

            analyzer.Analyzer.forEach(analyzer => {
                if (analyzer.constructor.name == "BeanAnalyzer") {
                    beanAnalyzer = analyzer;
                } else if (analyzer.constructor.name == "ClazzPropertyAnalyzer") {
                    propertyAnalyzer = analyzer;
                } else if (analyzer.constructor.name == "ClazzMemberAnalyzer") {
                    memberAnalyzer = analyzer;
                } else if (analyzer.constructor.name == "SupportAnalyzer") {
                    supportAnalyzer = analyzer;
                }
            });

            assert.exists(beanAnalyzer, "Bean analyzer is null or is undefined ... ");
            assert.exists(propertyAnalyzer, "Property analyzer is null or is undefined ... ");
            assert.exists(memberAnalyzer, "Member analyzer is null or is undefined ... ");
            assert.exists(supportAnalyzer, "Support analyzer is null or is undefined ... ");
        }

        let workPromise = bootstrap(contextInfo);
        return workPromise.then(resolve, reject);
    });
});