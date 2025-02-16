'use strict';

require('events').EventEmitter.defaultMaxListeners = Infinity;

const mocha = require('mocha');
const util = require('util');
const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const esprima = require('esprima');
const assert = require('chai').assert;

describe("Property analyzer test", function () {

    const logger = log4js.getLogger();
    const timeout = 50000;

    const pos = __dirname.indexOf("/test");
    const libRoot = __dirname.substring(0, pos);
    
    const testRoot = path.join(libRoot, "test");
    const resourceRoot = path.join(testRoot, "resources");
    const JScriptTestRoot = path.join(resourceRoot, "JScript");

    logger.info("Property analyzer test ...");

    let LIBRARY = path.join(libRoot, "lib");
    const FileObjectClass = require(path.join(LIBRARY, "foundation",
        "context", "JScript", "module", "File.js"));

    // Lib resources
    const foundation = path.join(LIBRARY, "foundation");
    const annotation = path.join(foundation, "annotation");
    const inject = path.join(annotation, "inject");

    // Test resources
    const simplePath = path.join(JScriptTestRoot, "simple");
    const analyzePath = path.join(simplePath, "analyze");
    const astPath = path.join(analyzePath, "AST");
    const propertyPath = path.join(astPath, "Property");

    const bootstrap = require(path.join(LIBRARY, "bootstrap", "bootstrap.cjs"));

    it("Testing property AST with empty annotation value ... ", function () {

        this.timeout(timeout);

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return resolve;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;
            const Property = require(path.join(inject, "Qualifier", "QualifierAnnotationClass"));

            const tree = require(path.join(propertyPath, "property_AST.json"));
            const propertyAnnotation = new Property();
            const propertyAnalyzer = analyzer.AnalyzerByAnnotationClazz[propertyAnnotation.constructor.name];

            const node = tree;

            const success = annotation => {
                logger.info("Testing class based AST with empty annotation value ... ");
                assert.exists(annotation,
                    "Annotation was not correctly set and is null or undefined ...");
                assert.isNotNull(annotation.getValue(), "Annotation value was not set correctly ...");
                logger.info(util.inspect(annotation));
            };

            const fail = rejected => {
                logger.error("Test was not success full ...");
                return rejected;
            }

            const waitForAnnotation = propertyAnalyzer.analyze(node, propertyAnnotation);
            return waitForAnnotation.then(success, fail);
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing property AST with preset annotation value ... ", function () {

        this.timeout(timeout);

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return resolve;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;
            const ANNOTATION_VALUE = "Service";
            const Property = require(path.join(inject, "Qualifier", "QualifierAnnotationClass"));

            const tree = require(path.join(propertyPath, "property_AST.json"));
            const node = tree;

            const propertyAnnotation = new Property();
            const propertyAnalyzer = analyzer.AnalyzerByAnnotationClazz[propertyAnnotation.constructor.name];

            propertyAnnotation.setValue(ANNOTATION_VALUE);

            const success = annotation => {
                logger.info("Testing class based AST with empty annotation value ... ");
                assert.exists(annotation,
                    "Annotation was not correctly set and is null or undefined ...");
                assert.isNotNull(annotation.getValue(), "Annotation value was not set correctly ...");
                assert.equal(annotation.getValue(), ANNOTATION_VALUE,
                    "Value was modified and is not equal to what was set ...");
                logger.info(util.inspect(annotation));
            };

            const fail = rejected => {
                logger.error("Test was not success full ...");
                return rejected;
            }

            const waitForAnnotation = propertyAnalyzer.analyze(node, propertyAnnotation);
            return waitForAnnotation.then(success, fail);
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing class property setter AST with preset annotation value ... ", function () {

        this.timeout(timeout);

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return resolve;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;
            const ANNOTATION_VALUE = "Service";
            const Property = require(path.join(inject, "Qualifier", "QualifierAnnotationClass"));

            const tree = require(path.join(propertyPath, "clazz_property_setter_AST.json"));
            const node = tree;

            const propertyAnnotation = new Property();
            const propertyAnalyzer = analyzer.AnalyzerByAnnotationClazz[propertyAnnotation.constructor.name];
            propertyAnnotation.setValue(ANNOTATION_VALUE);

            const success = annotation => {
                logger.info("Testing class based AST with empty annotation value ... ");
                assert.exists(annotation,
                    "Annotation was not correctly set and is null or undefined ...");
                assert.isNotNull(annotation.getValue(), "Annotation value was not set correctly ...");
                assert.equal(annotation.getValue(), ANNOTATION_VALUE,
                    "Value was modified and is not equal to what was set ...");
                logger.info(util.inspect(annotation));
            };

            const fail = rejected => {
                logger.error("Test was not success full ...");
                return rejected;
            }

            const waitForAnnotation = propertyAnalyzer.analyze(node, propertyAnnotation);
            return waitForAnnotation.then(success, fail);
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing function property setter AST with preset annotation value ... ", function () {

        this.timeout(timeout);

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return resolve;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;
            const ANNOTATION_VALUE = "Service";
            const Property = require(path.join(inject, "Qualifier", "QualifierAnnotationClass"));

            const tree = require(path.join(propertyPath, "function_property_setter_AST.json"));
            const node = tree;

            const propertyAnnotation = new Property();
            const propertyAnalyzer = analyzer.AnalyzerByAnnotationClazz[propertyAnnotation.constructor.name];
            propertyAnnotation.setValue(ANNOTATION_VALUE);

            const success = annotation => {
                logger.info("Testing class based AST with empty annotation value ... ");
                assert.exists(annotation,
                    "Annotation was not correctly set and is null or undefined ...");
                assert.isNotNull(annotation.getValue(), "Annotation value was not set correctly ...");
                assert.equal(annotation.getValue(), ANNOTATION_VALUE,
                    "Value was modified and is not equal to what was set ...");
                logger.info(util.inspect(annotation));
            };

            const fail = rejected => {
                logger.error("Test was not success full ...");
                return rejected;
            }

            const waitForAnnotation = propertyAnalyzer.analyze(node, propertyAnnotation);
            return waitForAnnotation.then(success, fail);
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing prototyped property setter AST with preset annotation value ... ", function () {

        this.timeout(timeout);

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return resolve;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;
            const ANNOTATION_VALUE = "Service";
            const Property = require(path.join(inject, "Qualifier", "QualifierAnnotationClass"));

            const tree = require(path.join(propertyPath, "prototype_property_setter_AST.json"));
            const node = tree;

            const propertyAnnotation = new Property();
            const propertyAnalyzer = analyzer.AnalyzerByAnnotationClazz[propertyAnnotation.constructor.name];
            propertyAnnotation.setValue(ANNOTATION_VALUE);

            const success = annotation => {
                logger.info("Testing class based AST with empty annotation value ... ");
                assert.exists(annotation,
                    "Annotation was not correctly set and is null or undefined ...");
                assert.isNotNull(annotation.getValue(), "Annotation value was not set correctly ...");
                assert.equal(annotation.getValue(), ANNOTATION_VALUE,
                    "Value was modified and is not equal to what was set ...");
                logger.info(util.inspect(annotation));
            };

            const fail = rejected => {
                logger.error("Test was not success full ...");
                return rejected;
            }

            const waitForAnnotation = propertyAnalyzer.analyze(node, propertyAnnotation);
            return waitForAnnotation.then(success, fail);
        }

        return waitAnalzyerInit.then(resolve, reject);
    });
});