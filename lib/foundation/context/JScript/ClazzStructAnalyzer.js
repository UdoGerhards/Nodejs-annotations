"use strict";

class ClazzStructAnalyzer {

    constructor() {
        let instance = this;

        instance.SupportAwareClazz = null;
        instance.MemberAwareClazz = null;
        instance.PropertyAwareClazz = null;
        instance.BeanAwareClazz = null;
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

            for (let ClazzName in annotation) {
                let AnnotationClazz = annotation[ClazzName];
                let name = AnnotationClazz.prototype["constructor"]["name"]
                instance.AnalyzerByAnnotationClazz[name] = analyzer;
                instance.AnnotationClasses[name] = AnnotationClazz;
            }
        });
    }

    /**
     * Thie method will analyze a given file and build meta information from it
     * 
     * @param {FileObject} file                 The file object 
     * @returns                                 The file meta information 
     * 
     * @throws {Error}                           In case the analyzation has to be stopped due to issues
     */
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

        return instance.analyzeClazz(data).catch(error => {
            instance.logger.error("Cannot finish analyzing due to error! Stopping work on this file ... ");
            instance.logger.error(error.message);
            throw (error);
        });
    }

    /**
     * This method will analyze the data from the given file with esprima and create the meta information object from analyzing process 
     * 
     * @param {*} data                          The read javascript file data
     * @returns                                 The meta informaton object
     * 
     * @throws {Error}                           In case the analyzation has to be stopped due to issues
     */
    analyzeClazz(data) {

        const instance = this;
        const logger = instance.LogManager(instance.logger);

        const esprima = instance.esprima;
        const waitArr = [];
        const classMetaInformation = new instance.ClassMetaInformation();

        return new Promise(resolveClazz => {

            try {
                esprima.parse(data, {
                    sourceType: 'module',
                    comment: true,
                    tokens: false,
                    loc: true,
                    range: false
                }, function (node) {
                    let wait = instance.analyzeStatement(node);
                    wait.then(
                        resolve => {

                        },
                        reject => {


                        });

                    waitArr.push(wait);
                });

                Promise.all(waitArr).then(
                    result => {

                        result.foreach(annotation => {

                            // Member aware has to be checked before "BeanAware" due it is a child of "BeanAware"
                            if (annotation.isPrototypeOf(instance.PropertyAwareClazz)) {
                                metaInformation.addPropert(mainAnnotation);
                            } else if (annotation.isPrototypeOf(instance.MemberAwareClazz)) {
                                metaInformation.addMethod(mainAnnotation);
                            } else if (annotation.isPrototypeOf(instance.BeanAwareClazz)) {

                            }
                        });


                        resolveClazz(classMetaInformation);
                    }
                )

            } catch (e) {
                logger.error("Can not analyz script ... an error occured during analyze process: ");
                logger.error / (e);
                throw (e);
            }

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
    analyzeStatement(node) {

        const instance = this;
        const logger = instance.LogManager(instance.logger);

        return new Promsise(
            nodeResolve => {

                /**
                 * Get all annotations from trailing comments if comments start line is lower than node start line
                 */

                let loc = node.loc;
                if (node.trailingComments && loc.start.line < node.trailingComments.loc.start.line) {

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
                        if (mainAnnotation instanceof instance.BeanAwareClazz) {

                            let innerClassAnalyze = instance.analyzeClazz(node);
                            resolve(innerClassAnalyze);

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
                        }
                        nodeResolve(mainAnnotation);
                    });
                } else {
                    nodeResolve(null);
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
                                    supportAnnotation.push(annotationObject);
                                } else {
                                    mainAnnotation.push(annotationObject);
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