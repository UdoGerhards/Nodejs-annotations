'use strict';

var path = require("path")
    , fs = require("fs")
    , util = require("util")
    , _ = require("lodash")
    , propertiesReader = require("properties")
    , Promise = require("bluebird");

/**
 * Created by udogerhards on 07.12.18.
 */


class XMLPropertiesProcessor {

    static SUPPORTS() {
        return [".properties"];
    };

    process(path) {

        return new Promise(function(resolve, reject) {

            propertiesReader.parse (path, { path: true }, function (error, obj){
                if (error) return console.error (error);

                resolve(obj);
            });

        });
    }
}

module.exports = exports = XMLPropertiesProcessor;