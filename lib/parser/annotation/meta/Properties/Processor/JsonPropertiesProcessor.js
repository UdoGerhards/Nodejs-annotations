'use strict';


var path = require("path")
    , fs = require("fs")
    , util = require("util")
    , _ = require("lodash")
    , Promise = require("bluebird");

/**
 * Created by udogerhards on 07.12.18.
 */

class JsonPropertiesProcessor {

    static SUPPORTS() {
        return [".json"];
    };

    process(path) {

        var properties = require(path);

        return new Promise(function(resolve, reject) {
            resolve(properties);
        });
    }
}

module.exports = exports = JsonPropertiesProcessor;

