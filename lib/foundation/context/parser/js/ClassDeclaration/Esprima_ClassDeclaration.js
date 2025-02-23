'use strict';

import Esprima_Base from "../Base/Esprima_Base";

class ClassDeclaration extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    getBeanContextAware(node, annotationInfo) {

        annotationInfo.descriptor.className = node.id.name;;
        annotationInfo.descriptor.classType = node.type;

        return annotationInfo;
    }
}

export default ClassDeclaration;
