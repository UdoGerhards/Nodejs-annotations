"use strict";

const AbstractBaseAnalyzer = require("./base/AbstractBaseAnalyzer");

class BeanAnalyzer extend AbstractBaseAnalyzer {

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

            try {
                // Main class in script! This covers both "Class" and "function" definition
                if (parentNode.type == AbstractBaseAnalyzer.expressions.CLASS_DECLARATION || parentNode.type ==
                    AbstractBaseAnalyzer.expressions.FUNCTION_DECLARATION) {

                    node = parentNode;

                    annotation.setName(node.id.name);
                    resolve(annotation);

                } else if ((parentNode.type == AbstractBaseAnalyzer.expressions.ASSIGNMENT_EXPRESSION && parentNode.right
                        .type ==
                        AbstractBaseAnalyzer.expressions.CLASS_EXPRESSION) || (parentNode.type == AbstractBaseAnalyzer.expressions
                        .ASSIGNMENT_EXPRESSION && parentNode.right.type ==
                        AbstractBaseAnalyzer.expressions.FUNCTION_EXPRESSION)) {

                    resolve(annotation);

                } else {

                    annotation = null;
                    resolve(annotation);

                }
            } catch (e) {

                logger.error("Analyzing threw exception! Please see error below");
                logger.error(e);

                throw (e);
            }
        });
    }
}

module.exports = exports = new BeanAnalyzer();