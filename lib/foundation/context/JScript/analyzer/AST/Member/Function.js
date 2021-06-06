'use strict';

const BaseAST = require("../Base/BaseAST.js");

class Function extends BaseAST {

    constructor() {
        super();
        let instance = this;
    }

    analyze(parentNode, annotation) {

        let instance = this;
        const logger = instance.LogManager.getLogger(instance);

        try {
            /**
             * ...
             *  instance.init = function (service) ...
             * ...
             */
            const node = parentNode.expression;

            if (parentNode.type == BaseAST.expressions.EXPRESSION_STATEMENT && node.left.type == BaseAST.expressions.MEMBER_EXPRESSION && node.right && node.right.type == BaseAST.expressions.FUNCTION_EXPRESSION) {

                let node = parentNode.expression;

                let classMember = node.left.property.name;
                annotation.setMember(classMember);

                return annotation;

            } else {
                return null;
            }
        } catch (e) {

            logger.error("Analyzing threw exception! Please see error below");
            logger.error(e);
            throw (e);

        }
    }
}

module.exports = exports = new Function();