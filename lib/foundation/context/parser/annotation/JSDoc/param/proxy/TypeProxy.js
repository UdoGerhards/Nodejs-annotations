var TypeConverter = require("../../type/proxy/TypeConverter")

class TypeProxy {

    constructor(beanInstance, mode) {

        let instance = this;

        instance.mode = mode;
        instance.beanInstance = beanInstance;
        instance.converters = {};
    }

    initParam(paramInformation) {

        var instance = this;

        //instance.methods = {};

        paramInformation.forEach(function(pInformation) {

            /**
             * Create proxied method
             */

            let methodName = pInformation.name;
            let methodProxy = new Proxy(instance.beanInstance[methodName], instance);

            instance.beanInstance[methodName]= methodProxy;

            Object.defineProperty(instance.beanInstance[methodName], 'name', {
                writable: true
            });

            instance.beanInstance[methodName].name = methodName;

            Object.defineProperty(instance.beanInstance[methodName], 'name', {
                writable: false
            });

            /**
             * Define convertion types
             */

            let params = pInformation.parameters;
            params.forEach(function(parameter){

                let typeConverter = new TypeConverter(parameter, instance.mode);

                let paramName = parameter.name;

                if (!Array.isArray(instance.converters[methodName])) {
                    instance.converters[methodName] = [];
                }

                instance.converters[methodName].push(typeConverter);
            })

        });

        return instance.beanInstance;
    }

    apply(target, thisArg, argumentsList) {

        let instance = this;

        let methodName = target.name;

        let parameterConverter = instance.converters[methodName];

        let convertedValues = [];
        if (parameterConverter && Array.isArray(parameterConverter)) {

            let index = 0;
            argumentsList.forEach(function(arg, index){

                let convertedArg = parameterConverter[index].convert(arg);
                convertedValues[index] = convertedArg;

            })
        }

        target.apply(thisArg, convertedValues);
    }
}

module.exports = exports = TypeProxy;
