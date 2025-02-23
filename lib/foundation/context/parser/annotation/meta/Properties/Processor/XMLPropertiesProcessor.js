'use strict';

/**
 * Created by udogerhards on 07.12.18.
 */
class XMLPropertiesProcessor {

    static SUPPORTS() {
        return [".xml"];
    };

    constructor() {
        var instance = this;

        //instance.Promise = null;
        instance.xml2js = null;
        instance.fs = null;
    }

    process(path) {
        var instance = this;
        //var Promise = instance.Promise;
        var xml2js = instance.xml2js;
        var fs = instance.fs;

        var options = {
            explicitArray: false
        };

        let file = fs.readFileSync(path);

        let parser = new xml2js.Parser(options);
        let paramObj = null;
        parser.parseString(file.toString(), function (err, result) {

            if (err) {

                reject(err);
            }

            paramObj = result["properties"];
            paramObj.__PATH__ = path;
        });

        return paramObj;

        /*
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

                    var obj = result["properties"];
                    obj.__PATH__ = path;

                    resolve(obj);
                });
            });

        });

        */
    }
}

export default XMLPropertiesProcessor;