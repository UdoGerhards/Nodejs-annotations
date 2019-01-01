'use strict';

var _ = require("lodash");

/**
 * Created by udogerhards on 07.12.18.
 */
class PropertiesContainer {

    constructor(properties) {

        var instance = this;

        instance.properties = properties;

    }

    set(parameter, value) {

        var instance = this;

        if (typeof instance.properties === "undefined" || instance.properties == null) {
            throw new Error("Empty properties object or not defined!");
        }

        if (_.isArray(instance.properties)) {
            instance.properties[parameter].push(value);
        } else {
            instance.properties[parameter] = value;
        }
    }

    get(parameter) {

        var instance = this;

        if (typeof instance.properties === "undefined" || instance.properties == null) {
            throw new Error("Empty properties object or not defined!");
        }

        if (_.isArray(instance.properties)) {
            return instance.properties[parameter];
        } else {
            return instance.properties(parameter);
        }
    }

    toString() {

        var instance = this;

        return instance.toFastProperties;
    }
}

module.exports = exports = PropertiesContainer;