'use strict';

require('events').EventEmitter.defaultMaxListeners = Infinity;

const mocha = require('mocha');
const util = require('util');
const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const esprima = require('esprima');
const assert = require('chai').assert;

describe("Support amalyzer test", function () {

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
    const meta = path.join(annotation, "meta");

    const CNamespaceAnnotationClazz = require(path.join(meta, "Namespace", "NamespaceAnnotationClass"));

    // Test resources
    const simplePath = path.join(JScriptTestRoot, "simple");
    const analyzePath = path.join(simplePath, "analyze");
    const astPath = path.join(analyzePath, "AST");
    const commentPath = path.join(astPath, "comment");

    const bootstrap = require(path.join(LIBRARY, "bootstrap", "bootstrap.cjs"));

    it("Testing simple comment to get back according annotation ... ", function () {

        const testPromise = new Promise(resolve => {
            return resolve
        }, reject => {
            return reject;
        });
        this.timeout(timeout);

        // class based Bean
        const beanAnalyzer = null;

        var contextInfo = {
            "scan": []
        };

        const waitAnalzyerInit = bootstrap(contextInfo);

        const resolve = resolve => {
            throw new Error("Could not initialize environment ... ");
        };
        const reject = reject => {

            const analyzer = reject.classStructAnalyzer;
            const tree = require(path.join(commentPath, "namespace_comment_AST.json"));
            const namespaceAnnotation = new CNamespaceAnnotationClazz();

            const beanAnalyzer = analyzer.AnalyzerByAnnotationClazz[namespaceAnnotation.constructor.name];
            const node = tree[0];

            const success = annotation => {
                logger.info("Testing class based AST with empty annotation value ... ");
                assert.exists(annotation,
                    "Annotation was not correctly set and is null or undefined ...");
                logger.info(util.inspect(annotation));
            };

            const fail = rejected => {
                logger.error("Test was not success full ...");
                logger.error(rejected);
                return rejected;
            }

            const waitForAnnotation = beanAnalyzer.analyze(node, namespaceAnnotation);
            return waitForAnnotation.then(success, fail);
        }

        return waitAnalzyerInit.then(resolve, reject);
    });
});