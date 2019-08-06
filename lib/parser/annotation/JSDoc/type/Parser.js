'use strict';

let BaseParser = require("../../../annotation/Base/BaseAnnotationParser");

class parser extends BaseParser {

    constructor() {
        super();

        var instance = this;

        instance.doctrine = null;

        instance.TypeProxy = null;
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

        if (!beanStructure.jsDoc){
            beanStructure.jsDoc = {};
        }

        if (!beanStructure.jsDoc["types"]) {
            beanStructure.jsDoc["types"] = [];
        }

        var comment = "/**\n"+annotationInformation.comment+"\n*/";
        var jsDoc = instance.doctrine.parse(
            [
                "/**",
                annotationInformation.comment,
                "*/"
            ].join('\n'), { unwrap: true });

        if (jsDoc.tags && jsDoc.tags.length > 0) {
            var tagType = jsDoc.tags[0].type;

            var types = [];

            if (tagType) {
                if (tagType.type == "UnionType") {
                    tagType.elements.forEach(function (element) {
                        var typeName = element.name.replace(/^\w/, c => c.toUpperCase());
                        types.push(typeName);
                    })
                } else if (tagType.type == "NameExpression") {
                    var typeName = tagType.name.replace(/^\w/, c => c.toUpperCase());
                    types.push(typeName);
                }

                if (types.length > 0) {
                    var typeObject = {
                        name: annotationInformation.property,
                        types: types
                    };

                    beanStructure.jsDoc["types"].push(typeObject);
                }
            }
        }


    }

    _jsdoc_wire(annotationInformation, beanStructure, applicationStructure) {

        let instance = this;

        if (beanStructure.jsDoc && beanStructure.jsDoc["types"].length > 0 && applicationStructure.JSDocSupport) {

            var typeProxy = beanStructure._typeProxy || new instance.TypeProxy(applicationStructure.JSDocSupport);

            typeProxy.initTypes(beanStructure.jsDoc["types"]);

            if(!beanStructure._typeProxy) {

                /**
                 * Bind proxy to instance if not already done
                 */
                beanStructure._instance = new Proxy(beanStructure._instance, typeProxy);

            }
        }
    }
}

module.exports = exports = parser;