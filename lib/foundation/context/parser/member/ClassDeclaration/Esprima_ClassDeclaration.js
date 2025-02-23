'use strict';

import Esprima_Base from "../Base/Esprima_Base";

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
        annotationInfo.descriptor.start = node.loc.start.line;
        annotationInfo.descriptor.end = node.loc.end.line;

        return annotationInfo;
    }
}

export default Esprima_ClassDeclaration;
