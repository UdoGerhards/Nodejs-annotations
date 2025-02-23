"use strict";

class AbstractBaseAnalyzer {

    constructor() {

        let instance = this;

        instance.util = null;

        instance.annotation = {};
        instance.ASTAnalyzer = [];
        instance.regExp = null;

        // Reference to ClassMetaInformation class
        instance.ClassMetaInformation = null;
    }

    getAnnotation() {
        let instance = this;
        return instance.annotation
    }

    init() {

        let instance = this;

        let annotationString = Object.keys(instance.annotation);
        instance.regExp = new RegExp("@\\b(" + annotationString +
            ")\\b[\\s|\\S]*?(\\(|\\{)\\\"?(\\b.*\\b\\*?)?\\\"?(\\)|\\})*", "g");

    }

    analyze(parentNode, annotation) {
        let instance = this;
        return new Promise(function (resolve, reject) {

            let logger = instance.LogManager.getLogger(instance);
            const analyzer = instance.ASTAnalyzer;

            logger.info(instance.constructor.name + ' analyzing ');
            logger.debug('Working on node ' + instance.util.inspect(parentNode, {
                depth: null
            }));

            if (analyzer && analyzer.length > 0) {
                analyzer.every(ASTWorker => {
                    let res = ASTWorker.analyze(parentNode, annotation);
                    if (res) {
                        resolve(res)
                    } else {
                        return true;
                    }
                });

                // if an according worker could not be found
                resolve(annotation);
            } else{
                resolve(annotation);
            }
        });
    }
}
export default AbstractBaseAnalyzer;