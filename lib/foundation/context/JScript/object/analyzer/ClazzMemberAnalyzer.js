"use strict";

const AbstractBaseAnalyzer = require("./base/AbstractBaseAnalyzer");

class ClazzMemberAnalyzer extend AbstractBaseAnalyzer {

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
    analyze(parentNode) {

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

            if (parentNode.type == ClazzMemberAnalyzer.expressions.EXPRESSION_STATEMENT && node.type ==
                ClazzMemberAnalyzer.expressions.ASSIGNMENT_EXPRESSION &&
                node.right == ClazzMemberAnalyzer.expressions.FUNCTION_EXPRESSION) {

                try {

                    classMember = instance._getClassMember(node);
                    annotation.setMember(classMember);
                    annotation.isFunc(true);
                    resolve(annotation);

                } catch (e) {

                    logger.error("Analyzing threw exception! Please see error below");
                    logger.error(e);

                    reject(e);
                }
            }
        });
    }

    /**
     * Method processes the information from a given member definition node.
     *
     * @param(node)
     */
    _getClassMember(node) {

        if (node.type == ClazzMemberAnalyzer.expressions.MEMBER_EXPRESSION) {

            // Then we use the property name expression from expression
            let memberName = null;
            if (node.property.name) {
                return node.property.name;
            }
        }
    }
}

module.exports = exports = new ClazzMemberAnalyzer();