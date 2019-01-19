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
}

module.exports = exports = Esprima_ClassDeclaration;
