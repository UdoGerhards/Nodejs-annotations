'use strict';
var InheritsAnnotation = require("../../../../annotation/inherits/Inherits/InheritsAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
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

            logger.info("... inherit from bean "+util.inspect(parentBeanName));

            var parentBeanName = annotationInformation.sourceBean;
            var parentBeanStructure = applicationStructure.nameToNamespace[parentBeanName];

            var parentBeanChilds = parentBeanStructure.descriptor.childs || null;

            // Process further inherit annotation in parent bean, if it owns one
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

                /*
                var Target = require(beanStructure.path);
                var Parent = parentBeanStructure.virtual || null;

                if (!Parent){
                    Parent = require(parentStructure.path);
                }

                util.inherits(Target, Parent);
                beanStructure.virtual = Target;

                */

                // Override previous loader

                beanStructure.virtual = function() {
                    var targetPath = beanStructure.path;

                    var Target = require(targetPath);
                    var Parent = null;
                    if (parentBeanStructure.virtual) {
                        Parent = parentBeanStructure.virtual() || null;
                    } else {
                        Parent = require(parentBeanStructure.path);
                    }

                    util.inherits(Target, Parent);
                    return Target;
                };

                beanStructure.loader = function() {

                    var instance = this;

                    // Process inherits
                    var Bean = instance.virtual();

                    // and return it as object
                    return new Bean();
                };

            } else {

                // TODO: Enable also inner bean inheritance

                /*
                var leadingToken = annotationInformation.tokens[0];
                var parser = instance.tokenParser[leadingToken.type];

                var result = parser.parse(leadingToken);
                var property = result.id;

                var innerBeanStructure = instance._getSingleBeanStructureFromApplicationStack(namespace, applicationStructure);

                */

                throw new Error("Inner beans are not supported by Inherits annotation currently");
            }

            var structureProperties = [];

            logger.info("Creating bean structure information for new class ... ");
            beanStructure.structure.forEach(function(structureInformation) {
                var property = structureInformation.property;
                logger.info("    ... processing own property "+util.inspect(property));
                structureProperties.push(property);
            });

            var parentStructure = parentBeanStructure.structure;
            parentStructure.forEach(function(structureInformation) {
                // Add properties from parent if they are not already in the target structure
                var property = structureInformation.property || null;
                if (property && !structureProperties.includes(property)) {
                    logger.info("    ... processing parent property "+util.inspect(property));
                    beanStructure.structure.push(structureInformation);
                }
            });

            annotationInformation.processed = true;
        }
    }
}

module.exports = exports = InheritsAnnotationParser;