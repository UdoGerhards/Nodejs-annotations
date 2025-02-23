'use strict';

/**
 * Created by udogerhards on 07.12.18.
 */
class JsonPropertiesProcessor {

    static SUPPORTS() {
        return [".json"];
    };

    constructor() {
        var instance = this;

        //instance.Promise = null;
    }

    process(path) {
        var instance = this;
        //var Promise = instance.Promise;

        var properties = require(path);

        return properties;

        /*
        return new Promise(function(resolve, reject) {
            properties.__PATH__ = path;
            resolve(properties);
        });
        */
    }
}

export default JsonPropertiesProcessor;

