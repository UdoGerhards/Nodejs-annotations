'use strict';

import BaseAST from "../Base/BaseAST";

class Literal extends BaseAST {

    constructor() {
        super();
        let instance = this;
    }

    analyze(parentNode, annotation) {

        let instance = this;
        const logger = instance.LogManager.getLogger(instance);

        try {
            const node = parentNode.expression;
            if (parentNode.type == BaseAST.expressions.EXPRESSION_STATEMENT && node.type ==
                BaseAST.expressions.ASSIGNMENT_EXPRESSION) {

                /**
                 * ...
                 *  instance.service = null;
                 * ...
                 */
                if (node.right && node.right.type == BaseAST.expressions.LITERAL) {

                    let classMember = node.left.property.name;

                    annotation.setProperty(classMember);

                    if (!annotation.getValue()) {
                        annotation.setValue(classMember);
                    }

                    return annotation;
                    
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (e) {

            logger.error("Analyzing threw exception! Please see error below");
            logger.error(e);
            throw(e);

        }
    }
}

export default new Literal();