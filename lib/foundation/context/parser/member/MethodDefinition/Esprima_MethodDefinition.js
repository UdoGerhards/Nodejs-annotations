'use strict';


import Esprima_Base from "../Base/Esprima_Base";

/**
 * Created by udogerhards on 2019-01-11.
 */
class Esprima_MethodDefinition extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    isValid(node) {
        return (node.kind == "method");
    }

    getBeanContextAwareInformation(node, annotationInfo) {

        annotationInfo = super.getBeanContextAwareInformation(node, annotationInfo);

        return annotationInfo;
    }

    getBeanInformation(node, annotationInfo) {

        annotationInfo.property = node.key.name;
        annotationInfo.type = node.value.type;

        return annotationInfo;
    }

}

export default Esprima_MethodDefinition;