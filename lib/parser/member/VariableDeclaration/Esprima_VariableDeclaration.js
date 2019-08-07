'use strict';
const Esprima_Base = require("../Base/Esprima_Base");
const util = require("util");

class Esprima_VariableDeclaration extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    isValid(node) {
        return !(node.declarations[0].init.type == "ThisExpression");
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

    getBeanContextAwareInformation(node, annotationInfo) {

        annotationInfo = super.getBeanContextAwareInformation(node, annotationInfo);

        if (node.property) {
            annotationInfo.descriptor.property = node.property.name;
        }

        annotationInfo.descriptor.property = node.declarations[0].id.name;
        annotationInfo.descriptor.className = node.declarations[0].id.name;
        annotationInfo.descriptor.classType = node.declarations[0].init.type;

        return annotationInfo;
    }
}

module.exports = exports = Esprima_VariableDeclaration;