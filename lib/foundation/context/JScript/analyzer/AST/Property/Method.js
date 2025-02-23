'use strict';

import BaseAST from "../Base/BaseAST";

class Method extends BaseAST {

    constructor() {
        super();
        let instance = this;
    }

    analyze(parentNode, annotation) {

        let instance = this;
        const logger = instance.LogManager.getLogger(instance);

            try {
                if (parentNode.type == BaseAST.expressions.METHOD_DEFINITION && parentNode.value.type ==
                    BaseAST.expressions.FUNCTION_EXPRESSION) {

                    let classMember = parentNode.key.name;
                    annotation.setMember(classMember);

                    if (!annotation.getValue()) {
                        // TODO: Check if property can be dedected and set instead
                        logger.error("No target given in annotation! ...")
                        throw new Error("Annotation used on setters need to name also a target component");
                    }
                
                    return annotation;

                } else  {
                    return null;
                }
                
            } catch (e) {

                logger.error("Analyzing threw exception! Please see error below");
                logger.error(e);
                throw(e);

            }
    }
}

export default new Method();