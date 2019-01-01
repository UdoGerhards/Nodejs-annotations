'use strict';

class InitParser {

    static get SUPPORTS() {
        return [InitAnnotation.name]
    };

    constructor() {

        var instance = this;
    }

    test() {
        var instance = this;

        console.log(instance.util.inspect(this));

    }

    /**
     * Parses the bean structure during the different modes
     *
     * @param annotationInformation
     * @param beanStructure
     */
    parse(annotationInformation, beanStructure, applicationStructure) {


        var instance = this;
        var stage = beanStructure.stage;

        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._INITIALIZE_:
                instance._initialize(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
                instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        super.parse(annotationInformation, beanStructure);
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var propertyResult = parser.parse(leadingToken);
        var property = propertyResult.id;

        annotationInformation.property = property;
    }

    _initialize(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var logger = instance.logger;
        var util = instance.util;

        var property = annotationInformation.property;
        if (typeof beanStructure._instance === "object") {
            logger.info("    ... initializing bean "+util.inspect(beanStructure.beanName));
            try {
                // TODO: Refactor to variable property
                beanStructure._instance[property].apply(beanStructure._instance);
            } catch(error) {
                logger.error(error);
            }

        }
    }
}

module.exports = exports = InitParser;