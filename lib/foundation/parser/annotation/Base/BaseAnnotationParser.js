'use strict';

class BaseAnnotationParser {

    static get SUPPORTS() {return null;};

    constructor() {

        var instance = this;

        instance.LogManager = null;
        instance.logger = null;

        instance.annotation = null;
        instance.util = null;
    }

    init() {
        var instance = this;

        instance.logger = instance.logManager.getLogger(instance.constructor.name);

        var logger = instance.logger;
        logger.info(instance.constructor.name+" initialized ...");
    }

    parse(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;

        // Process childs
        var childs = annotationInformation.childs;
        if (childs && childs.length > 0) {
            for (var childIndex = 0; childIndex < childs.length; childIndex++) {
                var child = childs[childIndex];
                // TODO: Check if this is not causing to hang the process; alterntively only hand over parent annotation information;
                //child.parent = annotationInformation.annotation;
                var childAnnotationParser = instance.annotationParser[child.annotation.name];

                try {
                    childAnnotationParser.parse(child, beanStructure, applicationStructure);
                } catch(error) {
                    //console.log(child.annotation.name);
                    //console.log(instance.annotationParser);
                    throw error;
                }

            }
        }

        return beanStructure;

    }

    /**
     * Finish bean setup
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _finishSetup(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        annotationInformation.tokens = null;
        delete annotationInformation.tokens;
    }

    _getSingleBeanStructureFromApplicationStack(namespaceSeq, applicationStack, debug) {

        var mainBeanNamespace = namespaceSeq[0];
        var mainBeanStructure = applicationStack[mainBeanNamespace];

        //if (debug) {
        //console.log(mainBeanNamespace);
        //console.log(mainBeanStructure);
        //}

        var subBeanNamespaceArr = namespaceSeq.slice(0, namespaceSeq.length-1);
        var subBeanNamespace = subBeanNamespaceArr.join(":");
        var subBeanStructure = mainBeanStructure[subBeanNamespace];

        /*
        if (debug) {
            console.log("\n");
            console.log(subBeanNamespaceArr);
            console.log(subBeanNamespace);
            console.log(subBeanStructure);
        }
        */

        return subBeanStructure;
    }


}

module.exports = exports = BaseAnnotationParser;