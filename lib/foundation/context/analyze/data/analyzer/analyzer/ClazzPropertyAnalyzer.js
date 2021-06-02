"use strict";

const AbstractBaseAnalyzer = require("./Base/AbstractBaseAnalyzer");

class ClazzPropertyAnalyzer {

    constructor() {

        super();

        let instance = this;
        instance.LogManager = this;

        instance.annotaton = {};
    }

    /**
     * Method analyzes the structure of a given node.
     * If it contains a definition for a class property it will processes its information.
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

            logger.info(instance.constructor.name + ' analyzing ');
            logger.deubg('Working on node ' + instance.util.inspect(node, {
                depth: null
            }));

            try {

                let classMember = null;
                if (parentNode.type == AbstractBaseAnalyzer.expressions.EXPRESSION_STATEMENT && node.type ==
                    AbstractBaseAnalyzer.expressions.ASSIGNMENT_EXPRESSION &&
                    node.right == AbstractBaseAnalyzer.expressions.LITERAL) {

                    classMember = instance._getClassMember(node);
                    annotation.setMember(classMember);
                    resolve(annotation);

                } else if (parentNode.type == AbstractBaseAnalyzer.expressions.EXPRESSION_STATEMENT && node.type ==
                    AbstractBaseAnalyzer.expressions.ASSIGNMENT_EXPRESSION &&
                    node.right == AbstractBaseAnalyzer.expressions.FUNCTION_EXPRESSION) {

                    classMember = instance._getClassMember(node);
                    annotation.setMember(classMember);
                    annotation.isFunc(true);
                    resolve(annotation);

                }
            } catch (e) {

                logger.error("Analyzing threw exception! Please see error below");
                logger.error(e);

                reject(e);
            }
        });
    }

    /**
     * Method processes the information from a given member definition node.
     *
     * @param(node)
     */
    _getClassMember(node) {

        if (node.type == ClazzPropertyAnalyzer.expressions.MEMBER_EXPRESSION) {

            // Then we use the property name expression from expression
            let memberName = null;
            if (node.property.name) {
                return node.property.name;
            }
        }
    }
}

module.exports = exports = new ClazzPropertyAnalyzer();