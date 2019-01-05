'use strict';
const BaseParser = require("../../Base/BaseAnnotationParser");

class QualifierParser extends BaseParser {

    constructor() {
        super();

        var instance = this;
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

        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._INJECT_:
                instance._inject(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
                instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        super.parse(annotationInformation, beanStructure);

    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        // Get name of the class or property name of according constructor and set it as bean name
        var sourceBeanName = null;

        // Get property on bean

        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var propertyResult = parser.parse(leadingToken);
        var targetProperty = propertyResult.id;

        // Source bean name
        var paramText = annotationInformation.annotationValue.trim();
        var parameterMatch = new RegExp("\([\"|\'](\\w.*\\w)[\"|\']\)", "g");
        var match = parameterMatch.exec(paramText);

        if (match && match.length > 2) {
            // Extra source bean name
            sourceBeanName = match[2].trim();
        }

        annotationInformation.injector = true;

        annotationInformation.sourceBean = sourceBeanName || targetProperty;
        annotationInformation.property = targetProperty;
    }

    /**
     * Inject the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _inject(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var logger = instance.logger;
        var util = instance.util;

        var targetBeanName = annotationInformation.sourceBean;
        var targetProperty = annotationInformation.property;

        logger.debug("    ...  processing qualifier for " + targetBeanName);

        // We only inject in objects!!!
        if (targetProperty && beanStructure._instance && (typeof beanStructure._instance == "object" || beanStructure.virtual)) {

            // Search by name
            try {

                var injectable = null;

                if (applicationStructure.nameToNamespace[targetBeanName] && typeof applicationStructure.nameToNamespace[targetBeanName].virtual == "function") {
                    // console.log(applicationStructure.nameToNamespace[targetBeanName].beanName);
                    injectable = applicationStructure.nameToNamespace[targetBeanName].virtual;
                } else {
                    injectable = applicationStructure.nameToNamespace[targetBeanName]._instance || null;
                }

                var injectable = applicationStructure.nameToNamespace[targetBeanName]._instance || null;
            } catch (error) {
                logger.error("Missing bean " + util.inspect(targetBeanName));
            }

            if (!injectable) {

                // Scan for according classes by class name
                for (var name in applicationStructure.nameToNamespace) {
                    if (applicationStructure.nameToNamespace[name].constructor.name === targetBeanName) {
                        injectable = applicationStructure.nameToNamespace[name];
                        break;
                    }
                }

            }

            var target = null;
            try {
                target = beanStructure._instance[targetProperty];
            } catch (error) {
                logger.log(beanStructure);
                logger.error(error);
            }

            if (injectable) {
                if (target && Array.isArray(target)) {
                    // Array
                    beanStructure._instance[targetProperty].push(injectable);                                   // Add to array
                } else if (target && typeof target === "object") {
                    // Object
                    var beanName = applicationStructure.nameToNamespace[targetBeanName].beanName;
                    beanStructure._instance[targetProperty][beanName] = injectable;                             // Add as property to the target object
                } else if (target && typeof target === "function") {
                    try {
                        // Function
                        try {
                            var args = [injectable];
                            beanStructure._instance[targetProperty].apply(beanStructure._instance, args);         // function call
                        } catch(error) {
                            //logger.info(error);
                        }
                    } catch (error) {
                        logger.log(error);
                    }

                } else if (target !== "undefined") {
                    try {
                        // Property
                        beanStructure._instance[targetProperty] = injectable; // Normal assignment
                    } catch (error) {
                        // console.log(beanStructure);
                        //logger.info(error);
                    }
                }
            }
        }
    }


    parseOpenXMLTag(currentTag, propertyStack, namespaceStack, context, applicationStack, beanStructure) {

        let instance = this;
        let annotation = instance.annotation;
        let attributes = currentTag.attributes;
        let propertyName = attributes.name;
        let value = attributes.value;

        if (currentTag.name == "Property") {

            let masterUuidV4 = namespaceStack[0];
            let currentStructure = namespaceStack.join(":");
            let structCount = 0;

            if (applicationStack[masterUuidV4][currentStructure].structure) {
                structCount = applicationStack[masterUuidV4][currentStructure].structure.length;
            }

            if (!propertyName) {
                propertyName = structCount;
            }

            propertyStack.push(propertyName);

            if (value != null) {

                let currentProperty = propertyStack[propertyStack.length-1];
                currentTag.attributes.property = currentProperty;

                if (!applicationStack[masterUuidV4][currentStructure].structure) {
                    applicationStack[masterUuidV4][currentStructure].structure = [];
                }

                let valueMapper = instance.xmlMapper["Value"];
                beanStructure = valueMapper.parseOpenXMLTag(currentTag, annotation, beanStructure);

                let structCount = applicationStack[masterUuidV4][currentStructure].structure.length;
                applicationStack[masterUuidV4][currentStructure].structure[structCount] = beanStructure;
            }
        }

        if (currentTag.name == "Entry") {

            let masterUuidV4 = namespaceStack[0];
            let currentStructure = namespaceStack.join(":");
            let structCount = 0;

            if (applicationStack[masterUuidV4][currentStructure].structure) {
                structCount = applicationStack[masterUuidV4][currentStructure].structure.length;
            }

            if (!propertyName) {
                propertyName = structCount;
            }

            propertyStack.push(propertyName);

            if (value != null) {

                let currentProperty = propertyStack[propertyStack.length-1];
                currentTag.attributes.property = currentProperty;

                if (!applicationStack[masterUuidV4][currentStructure].structure) {
                    applicationStack[masterUuidV4][currentStructure].structure = [];
                }

                let valueMapper = instance.xmlMapper["Value"];
                beanStructure = valueMapper.parseOpenXMLTag(currentTag, annotation, beanStructure);

                applicationStack[masterUuidV4][currentStructure].structure[structCount] = beanStructure;
            }
        }

        if (currentTag.name == "Reference") {
            let referenceMapper = instance.xmlMapper["Reference"];

            let currProperty = propertyStack[propertyStack.length-1];
            currentTag.attributes.property = currProperty;
            let structEntry = referenceMapper.parseOpenXMLTag(currentTag, annotation, beanStructure);

            if (beanStructure) {

                let masterUuidV4 = namespaceStack[0];
                let targetBeanNamespace = namespaceStack.join(":");

                if (!applicationStack[masterUuidV4][targetBeanNamespace].structure) {
                    applicationStack[masterUuidV4][targetBeanNamespace].structure = [];
                }
                applicationStack[masterUuidV4][targetBeanNamespace].structure.push(structEntry);
            } else {
                beanStructure = referenceMapper.parseOpenXMLTag(currentTag, annotation, beanStructure);
            }
        }

        return beanStructure;
    }

    parseText(currentTag, propertyStack, namespaceStack, context, applicationStack, beanStructure) {

        let instance = this;
        let annotation = instance.annotation;

        let currentProperty = propertyStack[propertyStack.length-1];
        currentTag.attributes.property = currentProperty;

        let masterUuidV4 = namespaceStack[0];
        let currentStructure = namespaceStack.join(":");

        let structCount = 0;

        if (applicationStack[masterUuidV4][currentStructure].structure) {
            structCount = applicationStack[masterUuidV4][currentStructure].structure.length;
        }

        if (!applicationStack[masterUuidV4][currentStructure].structure) {
            applicationStack[masterUuidV4][currentStructure].structure = [];
        }

        let valueMapper = instance.xmlMapper["Value"];
        beanStructure = valueMapper.parseOpenXMLTag(currentTag, annotation, beanStructure);

        applicationStack[masterUuidV4][currentStructure].structure[structCount] = beanStructure;

    }

    parseCloseXMLTag(currentTag, propertyStack, namespaceString, context, applicationStack, beanStructure) {
        let instance = this;

        if (currentTag.name == "Property") {
            propertyStack.splice(propertyStack.length-1,1);
        } else if (currentTag.name == "Entry") {
            propertyStack.splice(propertyStack.length-1,1);
        }

        return beanStructure;
    }
}

module.exports = exports = QualifierParser;