'use strict';

class BaseAnnotationParser {

    static get SUPPORTS() {return null;};

    constructor() {

        var instance = this;
        var annotationParser = {};
        var tokenParser = {};

    }

    init() {

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

    _getSingleBeanStructureFromApplicationStack(namespaceSeq, applicationStack) {
        var instance = this;

        var mainBeanNamespace = namespaceSeq[0];
        //console.log(mainBeanNamespace)
        var concerningBeanNamespace = namespaceSeq[namespaceSeq.length-2];

        //console.log(mainBeanNamespace);
        //console.log(concerningBeanNamespace);
        var beanStack = applicationStack[mainBeanNamespace];
        var beanStructure = beanStack[concerningBeanNamespace];

        return beanStructure;
    }
}

module.exports = exports = BaseAnnotationParser;
