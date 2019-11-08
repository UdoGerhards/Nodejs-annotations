'use strict';
const Esprima_Base = require("../Base/Esprima_Base");
const util = require("util");

class VariableDeclaration extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    getBeanContextAware(node, annotationInfo) {

        if (node.property) {
            annotationInfo.descriptor.property = node.property.name;
        }

        annotationInfo.descriptor.className = node.declarations[0].id.name;
        annotationInfo.descriptor.classType = node.declarations[0].init.type;

        return annotationInfo;
    }

    cleanUp(node, annotationInfo) {
        let instance = this;

        annotationInfo = super.parseEsprimaToken(node, annotationInfo);

        let annotation = annotationInfo.annotation;
        if (!annotation) {
            try {
                // In case of bean constructor
                annotation = annotationInfo.descriptor.annotation;
            } catch (e) {
                console.error(annotationInfo);
                throw e;
            }
        }

        /*
         * Class constructor
         */
         if (annotation.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE) {
                 /* In case of property */
                if (annotationInfo.descriptor ) {
                    try {
                        if (node.property) {
                            annotationInfo.descriptor.property = node.property.name;
                        }

                        annotationInfo.descriptor.className = node.declarations[0].id.name;
                        /* Either "NewExpression", ObjectExpression (for ...= {}), ArrayExpression
                            NewExpression => ... = new Object()
                            ObjectExpression => ... = {}
                            ArrayExpression => ... = []
                         */
                        annotationInfo.descriptor.classType = node.declarations[0].init.type;
                    } catch(e) {
                        console.log(util.inspect(node, {depth:25}));
                        console.log(e);
                        throw e;
                    }
                } else if (annotationInfo.annotation) {
                    annotationInfo.property = node.property.name;
                    annotationInfo.className = node.declarations[0].id.name;
                    /* Either "NewExpression", ObjectExpression (for ...= {}), ArrayExpression
                        NewExpression => ... = new Object()
                        ObjectExpression => ... = {}
                        ArrayExpression => ... = []
                     */
                    annotationInfo.descriptor.classType = node.declarations[0].init.type;
                }
        }

        return annotationInfo;
    }

    parse(node) {

        var matcher = new VariableDecorationStaticMemberExpressionIdentifierMatch();
        var initializer = node.declarations[0];

        var info = matcher.parse(initializer);

        var result = {
            type: node.type,
            init: info.init,
            id: info.property[0]
        }

        return result;
    }
}

module.exports = exports = VariableDeclaration;