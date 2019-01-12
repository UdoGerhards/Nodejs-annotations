'use strict';

const Esprima_Base = require("../Base/Esprima_Base")

class Esprima_Property extends Esprima_Base {

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
        annotationInfo.descriptor.className = node.key.name;
        annotationInfo.descriptor.classType = node.value.type;

        return annotationInfo;
    }

    getBeanInformation(node, annotationInfo) {

        annotationInfo.property = node.name;
        annotationInfo.type = node.type;

        return annotationInfo;
    }
}

module.exports = exports = Esprima_Property;