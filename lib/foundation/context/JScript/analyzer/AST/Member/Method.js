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

export default new Method();