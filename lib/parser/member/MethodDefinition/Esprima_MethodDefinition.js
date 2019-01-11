'use strict';


const Esprima_Base = require("../Base/Esprima_Base");

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

    cleanUp(node, annotationInfo) {
        let instance = this;

        annotationInfo = super.parseEsprimaToken(node, annotationInfo);

        let annotation = annotationInfo.annotation;
        if (!annotation) {
            try {
                // In case of sub bean
                annotation = annotationInfo.descriptor.annotation;
            } catch (e) {
                console.log(annotationInfo);
            }
        }

        annotationInfo.property = node.key.name;
        annotationInfo.type = node.value.type;

        return annotationInfo;
    }
}

module.exports= exports = Esprima_MethodDefinition;