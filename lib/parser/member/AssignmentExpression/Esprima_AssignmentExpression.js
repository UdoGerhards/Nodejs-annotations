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

        return annotationInfo;
    }

    getBeanInformation(node, annotationInfo) {

        annotationInfo.property = node.left.property.name;
        annotationInfo.type = node.left.property.type;

        return annotationInfo;
    }
}

module.exports= exports = Esprima_AssignmentExpression;