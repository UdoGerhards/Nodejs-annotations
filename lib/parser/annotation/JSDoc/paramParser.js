'use strict';

class paramParser {
    static get SUPPORTS() {
        return [paramAnnotation.name]
    };

    constructor() {
        var instance = this;
        instance.expressionParser = null;
        instance.doctrine = null;
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
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        //super.parse(annotationInformation, beanStructure, applicationStructure);

        return beanStructure;

    }

    getAnnotation(annotationInfo, bean, beanStack) {
        //console.log(annotationInfo);
        //console.log(bean);
        //console.log(beanStack);
    }

    /**
     * Stage the bean
     * @type annotationInformation
     * @type beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;
        var doctrine = instance.doctrine;

       // var fullComment
        //var declaration = annotationInformation.tokens[0].declarations[0].id.name;

        var funcName = null;
        if (annotationInformation.tokens[0].object) {
            funcName = annotationInformation.tokens[0].property.name;



        }

        if (!beanStructure.jsDoc){
            beanStructure.jsDoc = {};
        }

        if (!beanStructure.jsDoc["param"]) {
            beanStructure.jsDoc["param"] = [];
        }

        var comment = "/**\n"+annotationInformation.comment+"\n*/";
        var jsDoc = doctrine.parse(
            [
                "/**",
                annotationInformation.comment,
                "*/"
            ].join('\n'), { unwrap: true });



        var tags = jsDoc.tags;
        var parameterDesc = [];

        tags.forEach(function(type){
            var name = type.name;

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
                    types: pType
                };

                parameterDesc.push(paramType);
            }

        });

        var func = {
            name: funcName,
            parameters: parameterDesc
        }

        beanStructure.jsDoc["param"].push(func);
    }
}

module.exports = exports = paramParser;