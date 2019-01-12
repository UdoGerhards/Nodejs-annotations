'use strict';

const Esprima_Base = require("../Base/Esprima_Base")

class Esprima_FunctionDeclaration extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    getBeanContextAwareInformation(node, annotationInfo) {

        annotationInfo = super.getBeanContextAwareInformation(node, annotationInfo);

        /*
         * Class constructor
         */
        annotationInfo.descriptor.className = node.id.name;
        annotationInfo.descriptor.classType = node.type;

        return annotationInfo;
    }

    cleanUp(node, annotationInfo) {
        let instance = this;

        let annotation = annotationInfo.descriptor.annotation;

        /*
         * Class constructor
         */
        if (annotation.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE) {
            annotationInfo.descriptor.className = node.id.name;
            /*
              FunctionExpression => ... = function() {...}
             */
            annotationInfo.descriptor.classType = node.type
        }

        return annotationInfo;
    }
}

module.exports = exports = Esprima_FunctionDeclaration;
