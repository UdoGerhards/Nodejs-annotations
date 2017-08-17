'use strict';
var InheritsAnnotation = require("../../../../annotation/inherits/Inherits/InheritsAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , MainBeanLoader = require("../../instance/Bean/MainBeanLoader.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash");


class InheritsAnnotationParser extends BaseAnnotationParser{

    static get SUPPORTS() {return [InheritsAnnotation.name]};

    constructor() {
        super();
        var instance = this;
        instance.globals = [];
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
            annotationInformation.parentBeanName = parentBeanName
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

        if (typeof annotationInformation.processed == "undefined" || !annotationInformation.processed) {

            logger.info("Processing inheritance for bean "+util.inspect(beanStructure.beanName));

            var parentBeanName = annotationInformation.parentBeanName;
            var parentBeanStructure = applicationStructure.nameToNamespace[parentBeanName];

            logger.info("... inherit from bean "+util.inspect(parentBeanName));

            if (!parentBeanStructure) {
                return null;
            }

            var parentBeanChilds = parentBeanStructure.descriptor.childs || null;

            // Process further inherit annotation in parent bean, if it owns one
            // TODO: Check if this prevents from errors if no parent exists.
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

                var targetPath = beanStructure.path;

                var Parent = null;

                /*
                 * Process parent inheritance for not inherited parents
                 */
                var parentInherits = instance._findParentInheritance(parentBeanStructure);
                if (parentInherits) {
                    instance._inherit(parentInherits, parentBeanStructure, applicationStructure);
                    var ParentParent = parentBeanStructure.loader.load();
                    global[ParentParent.name] = ParentParent;
                    //console.log(ParentParent.name);
                }

                /*
                 * Register parent global
                 */
                if (parentBeanStructure.virtual) {
                    Parent = parentBeanStructure.virtual || null;
                } else {
                    Parent = require(parentBeanStructure.path);
                }

                var parentName = Parent.name;

                // runInNewContext is not working at all; it serves always the same context like we have here and additional vars are not set :( ; Bad hack here
                global[parentName] = Parent;
                //console.log(parentName);

                // save for later deletion
                instance.globals.push(parentName);

                var Target = require(targetPath);

                beanStructure.parent = Parent;

                // Exclusive check if we have a "function"-declaration
                if (typeof Target === "function") {
                    util.inherits(Target, Parent);
                }

                /*
                 * Save extended version
                 */
                beanStructure.virtual = Target;

                var loader = new MainBeanLoader();

                loader.setBeanStructure(beanStructure);
                loader.setNamespace(namespace[0]);
                loader.logger = logger;
                beanStructure.loader = loader;

            } else {
                throw new Error("Inner beans are not supported by Inherits annotation currently");
            }

            /*
             * Copy over all properties from parent
             */
            var structureProperties = [];
            logger.debug("Creating bean structure information for new class ... ");
            beanStructure.structure.forEach(function(structureInformation) {
                var property = structureInformation.property;
                logger.debug("    ... processing own property "+util.inspect(property));
                structureProperties.push(property);
            });

            var parentStructure = parentBeanStructure.structure;
            if (parentStructure) {

                // Structure information
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

    _findParentInheritance(parentBeanStructure) {
        var instance = this;

        var parentChilds = parentBeanStructure.descriptor.childs;

        var inherits = null;
        if (parentChilds && parentChilds.length > 0) {
            for (var index=0; index < parentChilds.length; index++) {
                var childAnnotation = parentChilds[index].annotation;
                if (childAnnotation.name == InheritsAnnotation.name && !parentChilds.processed) {
                    inherits = parentChilds[index];
                    break;
                }
            }
        }

        return inherits;
    }

    _finishBeanSetup(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        // runInNewContext is not working at all; it serves always the same context like we have here and additional vars are not set :( ; Bad hack here
        instance.globals.forEach(function(parentName){
            global[parentName] = null;
            delete global[parentName];

        });
        instance.globals = [];
    }
}

module.exports = exports = InheritsAnnotationParser;