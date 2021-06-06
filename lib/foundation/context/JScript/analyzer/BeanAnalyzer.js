"use strict";

const AbstractBaseAnalyzer = require("./base/AbstractBaseAnalyzer");

class BeanAnalyzer extends AbstractBaseAnalyzer {

    constructor() {

        super();

        let instance = this;
        instance.LogManager = this;
    }

    _getNamespace(node) {

        let instance = this;
        let namespaceArr = instance._getNamespacePartFromObject(node);

        // namespaceArr.shift(); // Will always contain either this or its variable representative

        if (typeof node.property !== "undefined") {

            namespaceArr.push(node.property.name);
        }

        return namespaceArr
    }

    _getNamespacePartFromObject(node) {
        let namespaceArr = [];

        if (typeof node.object !== "undefined" && typeof node.object.object !== "undefined") {
            namespaceArr.push(mode.property.name);
            let res = getNext(typeof node.object.object);
            namespaceArr.push(res);
        } else if (typeof node.property !== "undefined") {
            namespaceArr.push(node.property.name);
        }
        return name;
    }
}

module.exports = exports = new BeanAnalyzer();