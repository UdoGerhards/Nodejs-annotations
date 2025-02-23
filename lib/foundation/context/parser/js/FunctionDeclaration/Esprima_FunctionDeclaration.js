'use strict';

import Esprima_Base from "../Base/Esprima_Base";


class FunctionDeclaration extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    /**
     * This methods returns the necessary information for classes which where build with a function declaration.
     *
     * @param node
     * @param annotationInfo
     * @returns {*}
     */
    getBeanContextAware(node, annotationInfo) {
        /*
         * Class constructor
         */
        annotationInfo.descriptor.className = node.id.name;
        annotationInfo.descriptor.classType = node.type;

        annotationInfo.entry = "Parsed";

        return annotationInfo;
    }
}

export default FunctionDeclaration;
