'use strict';

import BaseAST from "../Base/BaseAST";

/**
 * Function 
 * 
 * This class analyzes a given ast node for class definition.
 */

class Function extends BaseAST {

    constructor() {
        super();
        let instance = this;
    }

    analyze(parentNode, annotation) {

        let instance = this;
        const logger = instance.LogManager.getLogger(instance);

            try {
                // Main class in script! This covers both "Class" and "function" definition
                if (parentNode.type == BaseAST.expressions.FUNCTION_DECLARATION) {

                    // If component was not matched from comment use class name
                    if (!annotation.getValue()) {
                        annotation.setValue(parentNode.id.name);
                    }
                    
                    return annotation;

                }  else {
                    return null;
                }
            } catch (e) {

                logger.error("Analyzing threw exception! Please see error below");
                logger.error(e);
                throw(e);

            }
    }
}

export default new Function();