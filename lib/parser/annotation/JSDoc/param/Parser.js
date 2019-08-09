'use strict';

let BaseParser = require("../../../annotation/Base/Base");

class parser extends BaseParser {

    constructor() {
        super();

        var instance = this;

        instance.doctrine = null;

        instance.ParamProxy = null;
    }

    init() {
        let instance = this;

        instance.logger = instance.LogManager.getLogger(instance);
        let logger = instance.logger;
        logger.info(instance.constructor.name + " initialized ...");
    }

    /**
     * Parses the bean structure during the different modes
     *
     * @param annotationInformation
     * @param beanStructure
     */
    parse(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;
        var stage = beanStructure.stage;

        // Normal behavior
        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._JSDOC_WIRE_:
                instance._jsdoc_wire(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        //

        return beanStructure;

    }

    /**
     * Stage the bean
     * @type annotationInformation
     * @type beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;

       // var fullComment
        //var declaration = annotationInformation.tokens[0].declarations[0].id.name;

        var funcName = annotationInformation.annotation.property;


        if (!beanStructure.jsDoc){
            beanStructure.jsDoc = {};
        }

        if (!beanStructure.jsDoc["params"]) {
            beanStructure.jsDoc["params"] = [];
        }

        var comment = "/**\n"+annotationInformation.comment+"\n*/";
        var jsDoc = instance.doctrine.parse(
            [
                "/**",
                annotationInformation.comment,
                "*/"
            ].join('\n'), { unwrap: true });



        var tags = jsDoc.tags;
        var parameterDesc = [];

        tags.forEach(function(type){
            var name = type.name;

            if (!type.type) {

                if (type.title == "param") {
                    var pType = type.name.replace(/^\w/, c => c.toUpperCase());
                    var paramType = {
                        name: type.name,
                        types: [pType]
                    };
                }

                parameterDesc.push(paramType);

            } else
            if (type.type.type == "UnionType") {

                var subTypes = [];
                type.type.elements.forEach(function(multiType) {
                    var pType = multiType.name.replace(/^\w/, c => c.toUpperCase());
                    subTypes.push(pType);
                })

                var paramType = {
                    name: type.name,
                    types: subTypes
                }

                parameterDesc.push(paramType);

            } else if (type.type.type == "NameExpression") {
                var pType = type.type.name.replace(/^\w/, c => c.toUpperCase());
                var paramType = {
                    name: type.name,
                    types: [pType]
                };

                parameterDesc.push(paramType);
            }

        });

        var func = {
            name: annotationInformation.property,
            parameters: parameterDesc
        };

        beanStructure.jsDoc["params"].push(func);

    }

    _jsdoc_wire(annotationInformation, beanStructure, applicationStructure) {

        let instance = this;

        if (beanStructure.jsDoc && beanStructure.jsDoc["params"].length > 0 && applicationStructure.JSDocSupport) {

            var paramProxy = new instance.ParamProxy(beanStructure._instance, applicationStructure.JSDocSupport);

            let proxiedInstance =  paramProxy.initParam(beanStructure.jsDoc["params"]);

            beanStructure._instance = proxiedInstance;
        }
    }
}

module.exports = exports = parser;