'use strict';
const Esprima_Base = require("../Base/Esprima_Base");
const util = require("util");

class Esprima_AssignmentExpression extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    isValid(node) {

        return!(node.directive) && !(node.left && node.left.property && node.left.property.name == "exports") && !(node.left.name == "exports");
    }

    getBeanContextAwareInformation(node, annotationInfo) {

        annotationInfo = super.getBeanContextAwareInformation(node, annotationInfo);
        annotationInfo.expressionStatement = "ExpressionStatement";
        annotationInfo.descriptor.property = node.left.property.name;
        annotationInfo.descriptor.className = node.left.property.name;
        annotationInfo.descriptor.classType = node.right.type;
        annotationInfo.descriptor.start = node.loc.start.line;
        annotationInfo.descriptor.end = node.loc.end.line;

        return annotationInfo;
    }

    getBeanInformation(node, annotationInfo) {
        let instance = this;

        let propertyPath = null;

        // Prototype bean
        if (node.left.object && node.left.object.property && node.left.object.property.name == "prototype") {
            propertyPath = instance._checkPrototypePath(node);
            propertyPath.push(node.left.property.name);
        }

        annotationInfo.prototypePath = propertyPath;
        annotationInfo.property = node.left.property.name;
        annotationInfo.type = node.left.property.type;

        return annotationInfo;
    }


    _checkPrototypePath(node) {

        node = node.left;

        let propertyPath = [];

        do {
            try {
                if (node && node.object && node.object.property && node.object.property.name != "prototype") {
                    propertyPath.push(node.object.property.name);
                    node = node.object;
                } else if (node && node.object && node.object.property) {
                    node = node.object;
                } else {
                    node = null;
                }
            } catch (e) {

                console.log(e);
                throw e;

            }
        } while (node)

        return propertyPath;
    }
}

module.exports= exports = Esprima_AssignmentExpression;