'use strict';

import BaseAST from "../Base/BaseAST";

class Prototype extends BaseAST {

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
                     * Component.prototyp.setService = function(service) ...
                     * ...
                     */
                     if (node.right && node.right.type == BaseAST.expressions.FUNCTION_EXPRESSION && node.left &&
                        node.left.type == BaseAST.expressions.MEMBER_EXPRESSION && node.left.object &&
                        node.left.object.type == BaseAST.expressions.MEMBER_EXPRESSION && node.left.object.property &&
                        node.left.object.property.name == "prototype") {

                        let classMember = node.left.property.name;
                        annotation.setMember(classMember);

                        if (!annotation.getValue()) {
                            // TODO: Check if property can be dedected and set instead
                            logger.error("No target given in annotation! ...")
                            throw new Error("Annotation used on setters need to name also a target component");
                        }

                        return annotation;  

                    }  else {
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

export default new Prototype();