"use strict";

const AbstractBaseAnalyzer = require("./base/AbstractBaseAnalyzer");

class ClazzMemberAnalyzer extends AbstractBaseAnalyzer {

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
        let instance = this;
        return new Promise(function (resolve, reject) {

            let logger = instance.LogManager.getLogger(instance);
            let node = parentNode.expression;

            logger.info(instance.constructor.name + ' analyzing ');
            logger.debug('Working on node ' + instance.util.inspect(node, {
                depth: null
            }));

            try {

                let classMember = null;
                if (parentNode.type == AbstractBaseAnalyzer.expressions.EXPRESSION_STATEMENT && node.type ==
                    AbstractBaseAnalyzer.expressions.ASSIGNMENT_EXPRESSION) {

                    /**
                     * ...
                     *  instance.init = function (service) ...
                     * ...
                     */
                    if (node.left.type == AbstractBaseAnalyzer.expressions.MEMBER_EXPRESSION && node.right && node.right.type ==
                        AbstractBaseAnalyzer.expressions.FUNCTION_EXPRESSION) {

                        let classMember = node.left.property.name;
                        annotation.setMember(classMember);
                        resolve(annotation);
                    }

                    /**
                     * ...
                     * Component.prototyp.init = function(service) ...
                     * ...
                     */
                    if (node.right && node.right.type == AbstractBaseAnalyzer.expressions.FUNCTION_EXPRESSION && node.left &&
                        node.left.type == AbstractBaseAnalyzer.expressions.MEMBER_EXPRESSION && node.left.object &&
                        node.left.object.type == AbstractBaseAnalyzer.expressions.MEMBER_EXPRESSION && node.left.object.property &&
                        node.left.object.property.name == "prototype") {

                        let classMember = node.left.property.name;
                        annotation.setMember(classMember);
                        resolve(annotation);
                    }

                } else if (parentNode.type == AbstractBaseAnalyzer.expressions.METHOD_DEFINITION && parentNode.value.type ==
                    AbstractBaseAnalyzer.expressions.FUNCTION_EXPRESSION) {

                    let classMember = parentNode.key.name;
                    annotation.setMember(classMember);
                    resolve(annotation);

                } else {
                    annotation = null;
                    resolve(annotation);
                }
            } catch (e) {

                logger.error("Analyzing threw exception! Please see error below");
                logger.error(e);

                reject(e);
            }
        });
    }
}

module.exports = exports = new ClazzMemberAnalyzer();