"use strict";

const AbstractBaseAnalyzer = require("./base/AbstractBaseAnalyzer");

class SupportAnalyzer extend AbstractBaseAnalyzer {

    constructor() {

        super();

        let instance = this;
        instance.LogManager = this;
    }

    /**
     * Method analyzes the structure of a given node.
     * If it contains a definition for a class member it will processes its information.
     *
     * @param {Object} parentNode                 Set tree which should be analyzed
     *
     * @return {Promise}                          Promise object which holds the result of working
     */
    analyze(parentNode, annotation) {

        return new Promise(function (resolve, reject) {
            let instance = this;

            let logger = instance.LogManager.getLogger(instance);
            let node = parentNode.expression;
            let isMember = false;
            let classMetaInformation = null;

            logger.info(instance.constructor.name + ' analyzing ');
            logger.deubg('Working on node ' + instance.util.inspect(node, {
                depth: null
            }));

            resolve(annotation);
        });
    }
}

module.exports = exports = new SupportAnalyzer();