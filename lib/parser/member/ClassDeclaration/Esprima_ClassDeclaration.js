'use strict';

const Esprima_Base = require("../Base/Esprima_Base");

class Esprima_ClassDeclaration extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    getBeanContextAwareInformation(node, annotationInfo) {

        annotationInfo = super.getBeanContextAwareInformation(node, annotationInfo);

        annotationInfo.descriptor.property = node.id.name;
        annotationInfo.descriptor.className = node.id.name;;
        annotationInfo.descriptor.classType = node.type;

        return annotationInfo;
    }

    cleanUp(node, annotationInfo) {
        let instance = this;

        annotationInfo = super.parseEsprimaToken(node, annotationInfo);

        let annotation = annotationInfo.descriptor.annotation;

        /*
         * Class constructor
         */
        if (annotation.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE) {
            annotationInfo.descriptor.className = node.id.name;
            /*
            ClassExpression => ... = class () {...}
            */
            annotationInfo.descriptor.classType = node.type;
        }

        return annotationInfo;
    }
}

module.exports = exports = Esprima_ClassDeclaration;
