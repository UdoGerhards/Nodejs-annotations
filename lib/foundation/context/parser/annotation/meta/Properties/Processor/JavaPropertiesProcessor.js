'use strict';

/**
 * Created by udogerhards on 07.12.18.
 */
class JavaPropertiesProcessor {

    static SUPPORTS() {
        return [".properties"];
    };

    constructor() {
        var instance = this;

        //instance.Promise = null;
        instance.propertiesReader = null;
        instance.fs = null;
    }

    process(path) {
        var instance = this;
        //var Promise = instance.Promise;
        var propertiesReader = instance.propertiesReader;


        let file = instance.fs.readFileSync(path);

        let paramObj = propertiesReader.parse(file.toString());

        return paramObj;

        /*
        return new Promise(function(resolve, reject) {

            propertiesReader.parse (path, { path: true }, function (error, obj){
                if (error) return console.error (error);

                obj.__PATH__ = path;

                resolve(obj);
            });

        });
        */
    }
}

module.exports = exports = JavaPropertiesProcessor;