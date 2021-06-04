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

    it("Testing simple the setup of entity", function () {
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
        }

        let workPromise = bootstrap(contextInfo);
        return workPromise.then(resolve, reject);
    });

    it("Test simple analyzing of class based AST nodes", function () {
        logger.info("Test: Detect simple class");

        // Lib resources
        const foundation = path.join(LIBRARY, "foundation");
        const annotation = path.join(foundation, "annotation");
        const instance = path.join(annotation, "instance");

        const ClazzComponent = require(path.join(instance, "Component", "ComponentAnnotationClass"));

        // Test resources
        const simplePath = path.join(JScriptTestRoot, "simple");
        const analyzePath = path.join(simplePath, "analyze");
        const astPath = path.join(analyzePath, "AST");
        const classBeanPath = path.join(astPath, "clazz");

        const clazzBasedAST = require(path.join(classBeanPath, "clazz_Bean_AST.json"));
        const functionBasedAST = require(path.join(classBeanPath, "function_Bean_AST.json"));

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

            /**
             * Start to analyze Bean AST
             */

            // class based Bean
            const componentAnnotation0 = new ClazzComponent();
            const node0 = clazzBasedAST.body[0];
            const waitForAnnotation0 = beanAnalyzer.analyze(node0, componentAnnotation0);
            waitForAnnotation0.then(annotationWithValue => {
                logger.info("Testing class based AST with empty annotation value ... ");
                assert.exists(annotationWithValue,
                    "Annotation was not correctly set and is null or undefined ...");
                logger.info(util.inspect(annotationWithValue));
            });


            const componentAnnotation1 = new ClazzComponent();
            const node1 = clazzBasedAST.body[0];
            const ANNOTATION_VALUE1 = "ClazzBean";
            componentAnnotation1.setValue(ANNOTATION_VALUE1);
            const waitForAnnotation1 = beanAnalyzer.analyze(node1, componentAnnotation1);
            waitForAnnotation1.then(annotationWithValue => {
                logger.info("Testing class based AST with preset annotation value ... ");
                assert.exists(annotationWithValue,
                    "Annotation was not correctly set and is null or undefined ...");
                assert.equal(annotationWithValue.getValue(), ANNOTATION_VALUE1,
                    "Value of annotation does not match preset value ...");
                logger.info(util.inspect(annotationWithValue));
            });

            // Function based Bean
            const componentAnnotation2 = new ClazzComponent();
            const node2 = functionBasedAST.body[0];
            const waitForAnnotation2 = beanAnalyzer.analyze(node2, componentAnnotation2);
            waitForAnnotation2.then(annotationWithValue => {
                logger.info("Testing function based AST with empty annotation value ... ");
                assert.exists(annotationWithValue,
                    "Annotation was not correctly set and is null or undefined ...");
                logger.info(util.inspect(annotationWithValue));
            });


            const ANNOTATION_VALUE2 = "FunctionBean";
            const componentAnnotation3 = new ClazzComponent();
            componentAnnotation3.setValue(ANNOTATION_VALUE2);
            const node3 = functionBasedAST.body[0];
            const waitForAnnotation3 = beanAnalyzer.analyze(node3, componentAnnotation3);
            waitForAnnotation3.then(annotationWithValue => {
                logger.info("Testing function based AST with preset annotation value ... ");
                assert.exists(annotationWithValue,
                    "Annotation was not correctly set and is null or undefined ...");
                assert.equal(annotationWithValue.getValue(), ANNOTATION_VALUE2,
                    "Value of annotation does not match preset value ...");
                logger.info(util.inspect(annotationWithValue));
            });

        }

        let workPromise = bootstrap(contextInfo);
        return workPromise.then(resolve, reject);
    });
});