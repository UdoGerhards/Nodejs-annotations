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
        annotationInfo.descriptor.property = node.id.name;
        annotationInfo.descriptor.className = node.id.name;
        annotationInfo.descriptor.classType = node.type;
        annotationInfo.descriptor.start = node.loc.start.line;
        annotationInfo.descriptor.end = node.loc.end.line;

        return annotationInfo;
    }
}

module.exports = exports = Esprima_FunctionDeclaration;
