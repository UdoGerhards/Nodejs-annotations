var TypeConverter = require("./TypeConverter")

class TypeProxy {

    constructor(mode) {

        let instance = this;

        instance.mode = mode;
    }

    initTypes(namedProperties) {

        var instance = this;

        instance.properties = {};

        namedProperties.forEach(function(nameProperty) {

            instance.properties[nameProperty.name] = new TypeConverter(nameProperty, instance.mode);
        });
    }

    set(target, prop, value) {

        var instance = this;

        if (instance.properties[prop]) {
            var converted = instance.properties[prop].convert(value);

            target[prop] = converted;
        } else {
            target[prop] = value;
        }

        return true;

    }
}

module.exports = exports = TypeProxy;
