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
        instance.traverse = null;
        instance.esprima = null;
        instance.beautify = null;
        instance.LogManager = null;
        instance.deepMerge = null;

        instance.Analyzer = [];
        instance.AnalyzerByAnnotationClazz = {};
        instance.AnnotationClasses = {};

        instance.waitInnerClazzAnalyze = [];

        instance.regEx = /@(.*)(\((.*)\)).*\n/gm;
        instance.regexAnnotation = null;
    }

    init() {

        const instance = this;
        const logger = instance.LogManager.getLogger(instance);

        instance.Analyzer.forEach(analyzer => {
            let annotation = analyzer.getAnnotation();

            for (let ClazzName in annotation) {
                let AnnotationClazz = annotation[ClazzName];
                let name = AnnotationClazz.prototype["constructor"]["name"]
                instance.AnalyzerByAnnotationClazz[name] = analyzer;
                instance.AnnotationClasses[name] = AnnotationClazz;
            }
        });

        const annotationKeys = Object.keys(instance.AnnotationClasses);
        const annotationString = annotationKeys.join("|");

        logger.trace(annotationString);

        // @\\b(type)\\b[\\s|\\S]*(\\(|\\{)\\\"?(\\b.*\\b)?\\\"?(\\)|\\})
        instance.regexAnnotation = new RegExp("@\\b(" + annotationString + ")\\b[\\s|\\S]*?(\\(|\\{)\\\"?(\\b.*\\b\\*?)?\\\"?(\\)|\\})*", "g");
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
        const logger = instance.LogManager.getLogger(instance);

        const beautify = instance.beautify;

        // Clean up javascript and prepare for processing

        let path = file.getPath();
        let data = file.getData();

        logger.info('Starting to analyze file "' + file.getPath() + ' ...');

        data = data.replace(/(^#!.*)/, "");
        data = beautify(data, {
            indent_size: 2
        });

        logger.debug('Starting to work on class "' + file.path + '"');

        return instance.analyzeClazz(data).then(fileMetaInformation => {
            fileMetaInformation.setFilePath(path);
            return fileMetaInformation;
        }, error => {
            instance.logger.error("Cannot finish analyzing due to error! Stopping work on this file ... ");
            instance.logger.error(error);
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
        const logger = instance.LogManager.getLogger(instance);

        const esprima = instance.esprima;
        const traverse = instance.traverse;
        const waitArr = [];
        const classMetaInformation = new instance.ClassMetaInformation();

        return new Promise(resolveClazz => {

            try {

                let tree = esprima.parse(data, { attachComment: true });

                traverse(tree).forEach(statement => {
                    try {
                        if (statement != null && typeof statement == "object" && statement.leadingComments) {
                            let wait = instance.analyzeStatement(statement);
                            waitArr.push(wait);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });

                return Promise.all(waitArr).then(result => {
                    try {
                        for (let name in result) {
                            let annotation = result[name];

                            // Member aware has to be checked before "BeanAware" due it is a child of "BeanAware"
                            if (annotation instanceof instance.PropertyAwareClazz) {
                                classMetaInformation.setPropert(annotation);
                            } else if (annotation instanceof instance.MemberAwareClazz) {
                                classMetaInformation.setMember(annotation);
                            } else if (annotation instanceof instance.BeanAwareClazz) {
                                classMetaInformation.setInformation(annotation);
                            }
                        }

                        resolveClazz(classMetaInformation);
                    } catch (e) {
                        console.log(e);
                    }
                });

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
        const logger = instance.LogManager.getLogger(instance);

        return new Promise(
            nodeResolve => {

                /**
                 * Get all annotations from leading comments if comments start line is lower than node start line
                 */

                let commentMaster = "";

                for (let name in node.leadingComments) {
                    const comment = node.leadingComments[name];
                    commentMaster += comment.value;
                }

                // Extract all annotation
                let mainAnnotation = null;
                if (typeof beanAnnotation !== "undefined") {
                    // We already have a bean aware bean and we are analyzing an inner clazz
                    mainAnnotation = beanAnnotation;
                } else {
                    // Normal processing
                    let mainAnnotationRes = instance._getAnnotation(commentMaster);
                    logger.trace("Got annotation ");
                    logger.trace(mainAnnotationRes);
                    mainAnnotation = mainAnnotationRes.pop(); // Get last element as main annotation
                }

                logger.debug('Calling asynchrous analyzer ... ');

                let mainAnnotationWait = new Promise(resolve => {
                    /**
                        // Process new inner class, Annotation describes it
                        if (mainAnnotation instanceof instance.BeanAwareClazz) {
 
                            let innerClassAnalyze = instance.analyzeClazz(node);
                            resolve(innerClassAnalyze);
 
                        } else {
                            */

                    // or continue with analyzing of the given clazz
                    let analyzer = instance.AnalyzerByAnnotationClazz[mainAnnotation.constructor.name];

                    let mainRes = analyzer.analyze(node, mainAnnotation);

                    // TODO: Check if this could not be simplified
                    resolve(mainRes);
                    //}
                }).catch(e => {
                    logger.error(e);
                    throw (e);
                });

                // Process support annotation
                let waitSupportCollection = [];

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
    _getAnnotation(comment) {

        let instance = this;
        let logger = instance.LogManager.getLogger(instance);
        let mainAnnotation = []; // Since we are working with order the use of a simple array is necessary
        let supportAnnotation = []; // Since we are working with order the use of a simple array is necessary
        let annotation = [];

        logger.debug("Analyzing comment for annotation ... ");

        // Check if we have an annotation
        if (comment.indexOf("@") > -1) {

            let singleLine = comment.split("\n");

            singleLine.forEach(function (singleComment) {

                let match = null;
                do {
                    try {
                        match = instance.regexAnnotation.exec(singleComment);

                        if (match && match[0]) {

                            let res = {};
                            let annotation = match[1];

                            if (typeof annotation !== "undefined" && annotation && annotation.trim() !== "") {

                                let annotationValue = match[3] || null;

                                logger.trace('Found annotation comment ...');
                                logger.trace(annotationValue);

                                let AnnotationClass = instance.AnnotationClasses[annotation];
                                //annotationValue = instance._matchAnnotationValue(comment, annotationValue);

                                let annotationObject = new AnnotationClass();
                                annotationObject.setValue(annotationValue);

                                logger.debug('Annotation object from comment ');
                                logger.debug(annotationObject);

                                if (annotationObject instanceof instance.SupportAwareClazz) {
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
            });
        }

        mainAnnotation.every(function (main) {
            main.setSupport(supportAnnotation);
            annotation.push(main);
        });

        return annotation;
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

    _matchAnnotationValue(annotationValue) {
        let instance = this;
        let regEx = /(\"|\')(.*)(\"|\')/gm;

        let match = regEx.exec(annotationValue);
        if (match[2]) {
            return match[2];
        } else {
            return null;
        }
    }
}

module.exports = exports = new ClazzStructAnalyzer();