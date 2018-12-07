'use strict';

var path = require("path")
    , fs = require("fs")
    , util = require("util")
    , _ = require("lodash")
    , xml2js = require("xml2js")
    , Promise = require("bluebird");

/**
 * Created by udogerhards on 07.12.18.
 */


class XMLPropertiesProcessor {

    static SUPPORTS() {
        return [".xml"];
    };

    process(path) {

        var options = {
            explicitArray: false
        }
        return new Promise(function(resolve, reject) {

            var filePromise = fs.readFile(path, function(err, data) {

                if (err) {
                    throw new Error(err);
                }

                var parser = new xml2js.Parser(options);
                parser.parseString(data, function (err, result) {

                    if (err) {

                        reject(err);
                    }

                    resolve(result["properties"]);
                });
            });

        });
    }
}

module.exports = exports = XMLPropertiesProcessor;