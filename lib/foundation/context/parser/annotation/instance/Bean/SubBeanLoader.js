'use strict';

import MainBeanLoader from "./MainBeanLoader";
import util from "util";
class SubBeanLoader extends MainBeanLoader {

    constructor() {
        super();

        var instance = this;
        instance.parentProperty = null;
    }

    setParentProperty(parentProperty) {
        var instance = this;
        instance.parentProperty = parentProperty;
    }

    instantiate(parent) {
        var instance = this;
        var logger = instance.logger;

        var beanStructure = instance.beanStructure;
        var definition = parent[instance.parentProperty];

        logger.debug("    ... instantiating sub bean " + util.inspect(beanStructure.beanName) +", "+util.inspect(instance.namespace));

        if (definition != null) {
            if (typeof definition == "function") {
                instance.beanStructure._instance = new definition();
            } else if (typeof definition == "object") {
                //instance.beanStructure._instance = definition;
                instance.beanStructure._instance =  definition;
            }
        } else {
            let asset = instance.load();
            if (typeof asset == "function") {
                instance.beanStructure._instance = new asset();
            } else {
                instance.beanStructure._instance = asset;
            }
        }

        instance._emitParentNamespace()
    }
}

export default SubBeanLoader;