'use strict';
const BeanParser = require("../instance/Bean/BeanAnnotationParser");

class typeParser extends BeanParser {

    constructor() {
        super();

        var instance = this;
        instance.expressionParser = null;
        instance.doctrine = null;
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
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        //super.parse(annotationInformation, beanStructure, applicationStructure);

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
        var doctrine = instance.doctrine;

       // var fullComment
        //var declaration = annotationInformation.tokens[0].declarations[0].id.name;

        var param = null;
        if (annotationInformation.tokens[0].object && annotationInformation.tokens[0].object.name == "instance") {
            param = annotationInformation.tokens[0].property.name;
        }

        if (!beanStructure.jsDoc){
            beanStructure.jsDoc = {};
        }

        if (!beanStructure.jsDoc["type"]) {
            beanStructure.jsDoc["type"] = [];
        }

        var comment = "/**\n"+annotationInformation.comment+"\n*/";
        var jsDoc = doctrine.parse(
            [
                "/**",
                annotationInformation.comment,
                "*/"
            ].join('\n'), { unwrap: true });

        console.log(jsDoc);

        if (jsDoc.tags && jsDoc.tags.length > 0) {
            var tagType = jsDoc.tags[0].type;

            var types = [];
            if (tagType.type == "UnionType") {
                tagType.elements.forEach(function(element){
                    var typeName = element.name.replace(/^\w/, c => c.toUpperCase());
                    types.push(typeName);
                })
            } else if (tagType.type == "NameExpression") {
                var typeName = tagType.name.replace(/^\w/, c => c.toUpperCase());
                types.push(typeName);
            }

            if (types.length > 0) {
                var typeObject = {
                    name: param,
                    types: types
                };

                beanStructure.jsDoc["type"].push(typeObject);
            }
        }
    }
}

module.exports = exports = typeParser;