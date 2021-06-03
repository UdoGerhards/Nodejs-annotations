"use strict";

class ClazzStructAnalyzer {

    constructor() {
        let intstance = this;

        instance.SupportAwareClazz = null;
        instance.BeanAware = null;
        instance.ClassMetaInformation = null;

        instance.util = null;
        instance.esprima = null;
        instance.LogManager = null;
        instance.deepMerge = null;

        instance.Analyzer = [];
        instance.AnalyzerByAnnotationClazz = {};
        instance.AnnotationClasses = {};

        instance.waitInnerClazzAnalyze = [];
    }

    init() {

        let instance = this;

        instance.Analyzer.forEach(analyzer => {
            let annotation = analyzer.getAnnotation();
            annotation.foreach(AnnotationClazz => {
                instance.AnalyzerByAnnotationClazz[AnnotationClazz.constructor.name] = analyzer;
            });
        });
    }

    analyze(file) {

        let instance = this;
        const util = instance.util;
        const logger = instance.LogManager(instance);

        // Clean up javascript and prepare for processing

        let path = file.getPath();
        let data = file.getData();

        logger.info('Starting to analyze file "' + file.getPath() + ' ...');

        data = data.replace(/(^#!.*)/, "");
        data = beautify(data, {
            indent_size: 2
        });

        logger.debug('Starting to work on class "' + file.path + '"');

        let analyzeWait = instance.analyzeClazz(data);

        return analyzeWait.then(metaInformation => {

            resolve(metaInformation);

        }).catch(error => {

            instance.logger.error("Cannot finish analyzing due to error! Stopping work on this file ... ");

        });

    }

    /**
     * Analyzes a given class for its annotation information and its related structure.
     * Create a bean which can be used within the context.
     *
     * @param {fileObject}                        The class as a file object
     *
     * @return {Promise}                          Promise object which holds the result of working
     */
    analyzeClazz(data, beanAnnotation) {

        return new Promise(function (resolve, reject) {

            let instance = this;
            const util = instance.util;
            const logger = instance.LogManager(instance);
            const beautify = instance.beautify;
            const esprima = instance.esprima;
            const deepMerge = instance.deepMerge;

            try {
                astTree = esprima.parse(data, {
                    sourceType: 'module',
                    comment: true,
                    tokens: false,
                    loc: true,
                    range: false
                }, function (node) {

                    /**
                     * Get all annotations from trailing comments
                     */
                    //if (typeof node.directive == "undefined" && node.trailingComments) {

                    if (node.trailingComments) {

                        // Extract all annotation
                        let mainAnnotation = null;
                        if (typeof beanAnnotation !== "undefined") {
                            // We already have a bean aware bean and we are analyzing an inner clazz
                            mainAnnotation = beanAnnotation;
                        } else {
                            // Normal processing
                            let mainAnnotationRes = instance._getAnnotation(node.trailingComments, instance.regEx);
                            let mainAnnotation = mainAnnotationRes.pop(); // Get last element as main annotation
                        }

                        logger.deubg('Calling asynchrous analyzer ... ');

                        let mainAnnotationWait = new Promise(resolve => {
                            // Process new inner class, Annotation describes it
                            if (!beanAnnotation && mainAnnotation instanceof instance.BeanAware) {

                                let innerClassAnalyzeWait = instance.analyzeClazz(node, mainAnnotation);

                                // Delegate the inner class analysing result to final working
                                instance.innerClazzAnalyze.push(innerClassAnalyzeWait);

                            } else {

                                beanAnnotation = null;

                                // or continue with analyzing of the given clazz
                                let analyzer = instance.AnalyzerByAnnotationClazz[mainAnnotation.constructor.name];

                                let mainRes = analyzer.analyze(node, mainAnnotation);

                                // TODO: Check if this could not be simplified
                                resolve(mainRes);
                            }
                        }).catch(err => {
                            throw (e);
                        });

                        // Process support annotation
                        let waitSupportCollection = [];
                        let waitSupportProcessing = [];
                        let metaInformation = new instance.ClassMetaInformation();

                        mainAnnotationWait.then(function (mainAnnotation) {

                            if (mainAnnotation) {

                                let waitPromise = new Promise(function (resolve, reject) {
                                    let support = mainAnnotation.getSupport();
                                    support.every(function (supportAnnotation) {
                                        let analyzer = instance.AnalyzerByAnnotationClazz[supportAnnotation.constructor
                                            .name];
                                        let supportRes = analyzer.analyze(node, supportAnnotation);
                                        waitSupportCollection.push(supportRes);
                                    });

                                    // Reset all saved suppoert annotation in main annotation and wait for processing results of given support annotation
                                    // TODO: Check if it works and delete if valid
                                    let oldSupport = mainAnnotation.getSupport();
                                    mainAnnotation.setSuppoert(null);

                                    Promise.all(waitSupportCollection).then(function (supportRes) {
                                        mainAnnotation.add(supportRes);
                                    });
                                });

                                waitSupportProcessing.push(waitPromise);
                            }

                        }).then(mainAnnotation => {

                            if (mainAnnotation) {
                                if (mainAnnotation instanceof instance.BeanAware) {



                                } else {

                                    if (typeof mainAnnotation.isFunc == "function" && mainAnnotation.isFunc) {
                                        // Method information
                                        metaInformation.addMethod(mainAnnotation);
                                    } else if (typeof mainAnnotation.isFunc == "function" && !mainAnnotation.isFunc) {
                                        // Property information
                                        metaInformation.addPropert(mainAnnotation);
                                    } else {
                                        // anything own (other, not build in)
                                        metaInformation.addAdditional(mainAnnotation);
                                    }
                                }
                            }
                        });
                    }

                    let i = 0;
                    metaInformation.addFilePath(file);
                    let res = [];
                    res.push(metaInformation);
                    Promise.all(instance.innerClazzAnalyze).then(allInnerClazzRes => {
                        allInnerClazzRes.foreach(innertClassMetaInformation => {
                            res.push(innertClassMetaInformation)
                        });
                        resolve(res);
                    });
                });
            } catch (e) {
                logger.error(e);
                reject(e);
            }
        });
    }

    /**
     * Extracts annotation information and its value from a given comment string.
     * Creates the according annotation class and sets the found value to the annotation object
     *
     * @param {string}                     The comment string
     * @return {object} || null            The created annnotation or null
     *
     * @throws {Error} if (condition)      Throws an Error object if there are problems in parsing the comment
     */
    _getAnnotation(commment, regEx) {

        let instance = this;
        let logger = instance.LogManager;
        let regEx = instance.annotationRegex;
        let mainAnnotation = []; // Since we are working with order the use of a simple array is necessary
        let supportAnnotation = []; // Since we are working with order the use of a simple array is necessary
        let results = [];

        // Check if we have an annotation
        if (comment.indexOf("@") > -1) {

            let singleLine = comment.split("\n");

            singleLine.forEach(function (singleComment) {

                let match = null;
                do {
                    try {
                        match = regEx.exec(singleComment);

                        if (match && match[0]) {

                            let res = {};
                            let annotation = match[1];

                            if (typeof annotation !== "undefined" && annotation && annotation.trim() !== "") {

                                let annotationValue = match[3];

                                let AnnotationClass = instance.AnnotationClasses[annotation];
                                annotationValue = instance._matchAnnotationValue(comment, annotationValue);

                                let annotationObject = new AnnotationClass();
                                annotationObject.setValue(annotationValue);

                                if (!annotationObject.isPrototypeOf(instance.SupportAwareClazz)) {
                                    supportAnnotation[] = annotationObject;
                                } else {
                                    mainAnnotation[] = annotationObject;
                                }
                            }

                        }

                    } catch (e) {
                        throw e;
                    }

                }
                while (match);

                mainAnnotation.every(function (main) {
                    main.setSupport(supportAnnotation);
                    results.push(main);
                });
            });
        }

        return results;
    }

    /**
     * Gets the annotation value from a given comment.
     *
     * @param {string}                The comment string
     * @param {annotationValue}       Possible annotation value which was found by RegExp
     *
     * @return {string}               Either null, a new value extracted from the comment string or a previous found annotation
     *                                value handed to this method
     */
    /
    _matchAnnotationValue(comment, annotationValue) {
        let instance = this;

        // Alternativ annotattion value due to regex sometimes failing
        let valMatch = singleComment.split("(");

        if (valMatch[1]) {
            let alternativeValue = valMatch[1].replace(")", "").trim();

            // TODO: Check if this works
            value = alternativeValue || value;
        }

        return annotationValue;
    }
}

module.exports = exports = new ClazzStructAnalyzer();