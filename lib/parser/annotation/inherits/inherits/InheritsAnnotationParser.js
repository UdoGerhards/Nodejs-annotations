'use strict';
var InheritsAnnotation = require("../../../../annotation/inherits/Inherits/InheritsAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , MainBeanLoader = require("../../instance/Bean/MainBeanLoader.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash");


class InheritsAnnotationParser extends BaseAnnotationParser{

    static get SUPPORTS() {return [InheritsAnnotation.name]};

    /**
     * Parses the bean structure during the different modes
     *
     * @param annotationInformation
     * @param beanStructure
     */
    parse(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;
        var stage = beanStructure.stage;

        switch(stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._INHERIT_:
                instance._inherit(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
                beanStructure = instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        super.parse(annotationInformation, beanStructure, applicationStructure);
    }

    _stage(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;

        // Get a dedicated bean name if set as parameter in the annotation
        var paramText = annotationInformation.annotationValue;

        var parameterMatch = new RegExp("\([\"|\'](\\w.*\\w)[\"|\']\)", "g");;
        var match = parameterMatch.exec(paramText);

        var parentBeanName = null;
        if (match && match.length > 2) {
            parentBeanName = match[2];
            annotationInformation.sourceBean = parentBeanName
        } else {
            throw new Error("Inherits needs a bean name to mark source bean!");
        }
    }

    /**
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _inherit(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var logger = instance.logger;

        logger.info("Processing inheritance for bean "+util.inspect(beanStructure.beanName));

        if (typeof annotationInformation.processed == "undefined" || !annotationInformation.processed) {

            var parentBeanName = annotationInformation.sourceBean;
            var parentBeanStructure = applicationStructure.nameToNamespace[parentBeanName];

            logger.info("... inherit from bean "+util.inspect(parentBeanName));

            if (!parentBeanStructure) {
                return null;
            }

            var parentBeanChilds = parentBeanStructure.descriptor.childs || null;

            // Process further inherit annotation in parent bean, if it owns one
            //TODO: Check if this prevents from errors if no parent exists.
            if (parentBeanChilds) {
                var parentStructure = parentBeanStructure;
                for (var childIndex = 0; childIndex < parentBeanChilds.length; childIndex++) {
                    var childAnnotation = parentBeanChilds[childIndex];
                    if (childAnnotation.annotation.name == InheritsAnnotation.name) {
                        instance._inherit(childAnnotation, parentStructure, applicationStructure);
                        // only the first one
                        break;
                    }
                }
            }

            var namespace = beanStructure.namespace.split(":");

            if (namespace.length === 1) {

                beanStructure.parent = null;

                beanStructure.virtual = function() {
                    var targetPath = beanStructure.path;

                    var Parent = null;

                    if (parentBeanStructure.virtual) {
                        Parent = parentBeanStructure.virtual() || null;
                    } else {
                        Parent = require(parentBeanStructure.path);
                    }

                    var parentName = Parent.name;

                    // runInNewContext is not working at all; it serves always the same context like we have here and additional vars are not set :( ; Bad hack here
                    global[parentName] = Parent;

                    var Target = require(targetPath);

                    beanStructure.parent = Parent;

                    // runInNewContext is not working at all; it serves always the same context like we have here and additional vars are not set :( ; Bad hack here
                    global[parentName] = null;
                    delete global[parentName];

                    // Exclusive check if we have a "function"-declaration
                    if (typeof Target === "function") {
                        util.inherits(Target, Parent);
                    }

                    return Target;
                };

                var loader = new MainBeanLoader();

                loader.setBeanStructure(beanStructure);
                loader.setNamespace(namespace[0]);
                loader.logger = logger;
                beanStructure.loader = loader;

            } else {
                throw new Error("Inner beans are not supported by Inherits annotation currently");
            }

            var structureProperties = [];

            logger.debug("Creating bean structure information for new class ... ");
            beanStructure.structure.forEach(function(structureInformation) {
                var property = structureInformation.property;
                logger.debug("    ... processing own property "+util.inspect(property));
                structureProperties.push(property);
            });

            var parentStructure = parentBeanStructure.structure;
            if (parentStructure) {
                parentStructure.forEach(function (structureInformation) {
                    // Add properties from parent if they are not already in the target structure
                    var property = structureInformation.property || null;
                    if (property && !structureProperties.includes(property)) {
                        logger.debug("    ... processing parent property " + util.inspect(property));
                        beanStructure.structure.push(structureInformation);
                    }
                });
            }

            annotationInformation.processed = true;
        }
    }
}

module.exports = exports = InheritsAnnotationParser;