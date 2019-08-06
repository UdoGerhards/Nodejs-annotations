class TypeConverter {

    constructor(namedTypes, mode) {

        let instance = this;


        instance.property = namedTypes.name;
        instance.namedTypes = namedTypes.types;

        // Converters
        instance.converters =  {
            "Number": Number
            , "Integer":parseInt
            , "Float": parseFloat
            , "Boolean": Boolean
        };

        instance.mode = mode;
    }

    convert(value) {

        var instance = this;

        var retVal = null;

        var valueType = typeof value;

        var usable = instance.namedTypes.indexOf(valueType) > -1?true:false;

        /**
         * Strict mode selected; no conversion allowed
         */
        if (!usable && instance.mode == 0x99) {
            throw new TypeError("Wrong assignment to variable '"+instance.property+" ...!")
        }

        /**
         * Convertsion mode selected
         */
        if (!usable && instance.mode == 0x10) {

            if (valueType == "String") {



            } else {

                /**
                 * Target type is a native data type; convert to this type
                 */
                var convertToType = instance.namedTypes[0];     // We use always the first converter type

                if (convertToType == "String") {

                    /**
                     * Target type is a string; convert to string
                     */
                    retVal = value.toString();

                } else {

                    var converterName = (convertToType.charAt(0).toUpperCase() + convertToType.slice(1));

                    var nativeConverter = instance.converters[converterName];

                    if (nativeConverter) {

                        retVal = nativeConverter(value);

                    } else {

                        /**
                         * Give type is a custom object; only check if value and target have the same type
                         */
                        if (typeof value == "object") {

                            if (value.constructor.name !== "Object") {

                                let pos = instance.namedTypes.indexOf(value.constructor.name);

                                // Type not found throw error
                                if (pos == -1) {

                                    throw new TypeError("Wrong assignment to variable '" + prop + " ...!");

                                }

                            }

                        }

                        /**
                         * Something custom
                         */
                        retVal = value;
                    }
                }

            }

        } else {

            retVal = value;
        }

        return retVal;

    }
}

module.exports = exports = TypeConverter;