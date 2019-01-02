'use strict';

/**
 * Created by udogerhards on 07.12.18.
 */
class XMLPropertiesProcessor {

    static SUPPORTS() {
        return [".properties"];
    };

    constructor() {
        var instance = this;

        instance.Promise = null;
        instance.propertiesReader = null;
    }

    process(path) {
        var instance = this;
        var Promise = instance.Promise;
        var propertiesReader = instance.propertiesReader;

        return new Promise(function(resolve, reject) {

            propertiesReader.parse (path, { path: true }, function (error, obj){
                if (error) return console.error (error);

                obj.__PATH__ = path;

                resolve(obj);
            });

        });
    }
}

module.exports = exports = XMLPropertiesProcessor;