"use strict";

const AbstractBaseAnalyzer = require("./base/AbstractBaseAnalyzer");

class BeanAnalyzer extends AbstractBaseAnalyzer {

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

            let logger = instance.LogManager.getLogger(instance.constructor.name);
            let isMember = false;
            let classMetaInformation = null;

            logger.info(instance.constructor.name + ' analyzing ');
            logger.debug('Working on node ' + instance.util.inspect(parentNode, {
                depth: null
            }));

            try {
                // Main class in script! This covers both "Class" and "function" definition
                if (parentNode.type == AbstractBaseAnalyzer.expressions.CLASS_DECLARATION || parentNode.type ==
                    AbstractBaseAnalyzer.expressions.FUNCTION_DECLARATION) {

                    // If component was not matched from comment use class name
                    if (!annotation.getValue()) {
                        annotation.setValue(parentNode.id.name);
                    }
                    resolve(annotation);

                } else if ((parentNode.type == AbstractBaseAnalyzer.expressions.ASSIGNMENT_EXPRESSION && parentNode.right
                        .type ==
                        AbstractBaseAnalyzer.expressions.CLASS_EXPRESSION) || (parentNode.type == AbstractBaseAnalyzer.expressions
                        .ASSIGNMENT_EXPRESSION && parentNode.right.type ==
                        AbstractBaseAnalyzer.expressions.FUNCTION_EXPRESSION)) {

                    let left = parentNode.left;

                    let namespace = instance.getNamespaceForInnerClazz(left);

                    annotation.setNamespace(namespace);

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
    _getNamespace(node) {

        let instance = this;
        let namespaceArr = instance._getNamespacePartFromObject(node);

        // namespaceArr.shift(); // Will always contain either this or its variable representative

        if (typeof node.property !== "undefined") {

            namespaceArr.push(node.property.name);
        }

        return namespaceArr
    }

    _getNamespacePartFromObject(node) {
        let namespaceArr = [];

        if (typeof node.object !== "undefined" && typeof node.object.object !== "undefined") {
            namespaceArr.push(mode.property.name);
            let res = getNext(typeof node.object.object);
            namespaceArr.push(res);
        } else if (typeof node.property !== "undefined") {
            namespaceArr.push(node.property.name);
        }
        return name;
    }
}

module.exports = exports = new BeanAnalyzer();