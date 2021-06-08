'use strict';

require('events').EventEmitter.defaultMaxListeners = Infinity;

const mocha = require('mocha');
const util = require('util');
const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const assert = require('chai').assert;

describe("Class struct amalyzer test", function () {

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
    const instance = path.join(annotation, "instance");
    const ClazzComponent = require(path.join(instance, "Component", "ComponentAnnotationClass"));

    const  context = path.join(foundation, "context");
    const  JScript = path.join(context, "JScript");
    const  module = path.join(JScript, "module");
    

    // Test resources
    const simplePath = path.join(JScriptTestRoot, "simple");
    const analyzePath = path.join(simplePath, "analyze");
    const astPath = path.join(analyzePath, "AST");
    const classBeanPath = path.join(astPath, "clazz");
    const testFilePath = path.join(analyzePath, "files");
    const clazzFilePath = path.join(testFilePath, "clazz");

    const bootstrap = require(path.join(LIBRARY, "bootstrap", "bootstrap.js"));

    it("Testing comment function: Getting value from annotation commment ... ", function () {

        const testPromise = new Promise(resolve => {
            return resolve
        }, reject => {
            return reject;
        });
        this.timeout(timeout);

        // class based Bean
        const beanAnalyzer = null;
        const value = "*\n * @Component(\"ComponentBean\")\n";

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return true;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;

            let annotationValue = analyzer._matchAnnotationValue(value);

            assert.isNotNull(annotationValue, 'Annotation value is "null" ...');
            assert.isString(annotationValue, 'Annotation value is not a string ...');
            assert.equal(annotationValue, 'ComponentBean', 'Annotation value is not equal to what was expected ... ');

            return  annotationValue;
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing comment function: Getting annotation from commment ... ", function () {

        const testPromise = new Promise(resolve => {
            return resolve
        }, reject => {
            return reject;
        });
        this.timeout(timeout);

        // class based Bean
        const beanAnalyzer = null;
        const value = "*\n * @Component(\"ComponentBean\")\n";

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return true;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;

            let annotationArr = analyzer._getAnnotation(value);


            assert.isArray(annotationArr, 'Annotation is not an array ...');
            assert.lengthOf(annotationArr, 1, 'Annotatoion array has not the length of "3"');

            const annotation = annotationArr[0];
            assert.isNotNull(annotation, 'Annotation is "null" ...');
            assert.equal(annotation.constructor.name, 'Component', 'Annotation is not equal to what was expected ... ');

            return  annotation;
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing comment function: Getting annotation with according support annotation from commment ... ", function () {

        const testPromise = new Promise(resolve => {
            return resolve
        }, reject => {
            return reject;
        });
        this.timeout(timeout);

        // class based Bean
        const beanAnalyzer = null;
        const value = "*\n * @Component(\"ComponentBean\")\n * @Namespace()\n";

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return true;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;

            let annotationArr = analyzer._getAnnotation(value);


            assert.isArray(annotationArr, 'Annotation is not an array ...');
            assert.lengthOf(annotationArr, 1, 'Annotatoion array has not the length of "3"');

            const annotation = annotationArr[0];
            assert.isNotNull(annotation, 'Annotation is "null" ...');
            assert.equal(annotation.constructor.name, 'Component', 'Annotation is not equal to what was expected ... ');
            assert.isNotNull(annotation.getValue(), 'Value of main annotation is "null" ...');

            const supportArr = annotation.getSupport();
            const supportAnnotation = supportArr[0];
            assert.isNotNull(supportAnnotation, 'Support anntation is "null" ...');
            assert.equal(supportAnnotation.constructor.name, 'Namespace', 'Support anntation is not equal to what was expected ... ');

            return  annotation;
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing comment function: Getting annotation with multiple support annotation from commment ... ", function () {

        const testPromise = new Promise(resolve => {
            return resolve
        }, reject => {
            return reject;
        });
        this.timeout(timeout);

        // class based Bean
        const beanAnalyzer = null;
        const value = "*\n * @Component(\"ComponentBean\")\n * @Namespace()\n * @Inherits(\"Service\")\n";

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return true;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;

            let annotationArr = analyzer._getAnnotation(value);


            assert.isArray(annotationArr, 'Annotation is not an array ...');
            assert.lengthOf(annotationArr, 1, 'Annotatoion array has not the length of "3"');

            const annotation = annotationArr[0];
            assert.isNotNull(annotation, 'Annotation is "null" ...');
            assert.equal(annotation.constructor.name, 'Component', 'Annotation is not equal to what was expected ... ');
            assert.isNotNull(annotation.getValue(), 'Value of main annotation is "null" ...');

            const supportArr = annotation.getSupport();
            let supportAnnotation = supportArr[0];
            assert.isNotNull(supportAnnotation, '1. Support anntation is "null" ...');
            assert.equal(supportAnnotation.constructor.name, 'Namespace', '1. Support anntation is not equal to what was expected ... ');
            assert.isNull(supportAnnotation.getValue(), 'Value of 1. support annotation is not "null" ...');

            supportAnnotation = supportArr[1];
            assert.isNotNull(supportAnnotation, '2. Support anntation is "null" ...');
            assert.equal(supportAnnotation.constructor.name, 'Inherits', '2. Support anntation is not equal to what was expected ... ');
            assert.isNotNull(supportAnnotation.getValue(), 'Value of 2. support annotation is "null" ...');

            return  annotation;
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing simple class struct with one bean annotation ... ", function () {

        const testPromise = new Promise(resolve => {
            return resolve
        }, reject => {
            return reject;
        });
        this.timeout(timeout);

        // class based Bean
        const beanAnalyzer = null;
        const tree = require(path.join(classBeanPath, "clazz_Bean_AST.json"));
        const node = tree.body[0];

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return true;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;

            const waitForAnalyze = analyzer.analyzeStatement(node);

            const successAnalyze = annotation => {
                assert.isNotNull(annotation, 'Annotation is "null" ...');
                assert.equal(annotation.constructor.name, 'Component', 'Annotation is not equal to what was expected ... ');
                assert.isNotNull(annotation.getValue(), 'Value of main annotation is "null" ...');

                let support = annotation.getSupport();
                assert.lengthOf(support, 0, "Support arr is not empty as expected! ...");
            };

            const rejectAnalyze = reject => {
                console.log(reject);
            };

            return  waitForAnalyze.then(successAnalyze, rejectAnalyze);
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing simple class struct with one bean annotation and support annotation ... ", function () {

        const testPromise = new Promise(resolve => {
            return resolve
        }, reject => {
            return reject;
        });
        this.timeout(timeout);

        // class based Bean
        const beanAnalyzer = null;
        const tree = require(path.join(classBeanPath, "clazz_Bean_with_Support_AST.json"));
        const node = tree.body[0];

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return true;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;

            const waitForAnalyze = analyzer.analyzeStatement(node);

            const successAnalyze = annotation => {
                assert.isNotNull(annotation, 'Annotation is "null" ...');
                assert.equal(annotation.constructor.name, 'Component', 'Annotation is not equal to what was expected ... ');
                assert.isNotNull(annotation.getValue(), 'Value of main annotation is "null" ...');

                const supportArr = annotation.getSupport();
                assert.lengthOf(supportArr, 1, "Length of support array is not equal to what is exepcted! ...");

                let supportAnnotation = supportArr[0];
                assert.isNotNull(supportAnnotation, '1. Support anntation is "null" ...');
                assert.equal(supportAnnotation.constructor.name, 'Namespace', '1. Support anntation is not equal to what was expected ... ');
                assert.isNull(supportAnnotation.getValue(), 'Value of 1. support annotation is not "null" ...');
            };

            const rejectAnalyze = reject => {
                console.log(reject);
            };

            return  waitForAnalyze.then(successAnalyze, rejectAnalyze);
        }

        return waitAnalzyerInit.then(resolve, reject);
    });

    it("Testing simple class struct with one bean annotation and support annotation ... ", function () {

        const testPromise = new Promise(resolve => {
            return resolve
        }, reject => {
            return reject;
        });
        this.timeout(timeout);

        // class based Bean
        const beanAnalyzer = null;
        const file = fs.readFileSync(path.join(clazzFilePath, "clazz_simple.js"), 'utf8');
        const FileInfoClazz = require(path.join(module, "File.js"));
        const fileInfo = new FileInfoClazz();

        fileInfo.setData(file);
        fileInfo.setPath (path.join(clazzFilePath, "clazz_simple.js"));

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            return true;
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;

            const waitForAnalyze = analyzer.analyze(fileInfo);

            const successAnalyze = resolve => {
                return resolve;
            };

            const rejectAnalyze = reject => {
                return rejected;
            };

            return  waitForAnalyze.then(successAnalyze, rejectAnalyze);
        }

        return waitAnalzyerInit.then(resolve, reject);
    });
});