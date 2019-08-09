'use strict';
const BaseParser = require("../../Base/BaseAnnotationParser");


class AutowireAnnotationParser extends BaseParser {

    constructor() {
        super();
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

        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._INSTANTIATE_:
                beanStructure = instance._instantiate(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
                instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        //super.parse(annotationInformation, beanStructure);
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        applicationStructure._allertMissingBeans = true;
        applicationStructure._autowire = true;
    }

    // TODO: Delete if processing is not impacted
    _instantiate(annotationInformation, beanStructure, applicationStructure) {

        var instance = beanStructure._instance;

        var obj = instance;
        var props = [];

        do {
            Object.getOwnPropertyNames(obj).forEach(function (prop) {
                if (props.indexOf(prop) === -1) {
                    if(typeof obj[prop] === "object" && prop !== "__proto__") {
                        props.push(prop);
                    }

                }
            });
        } while (obj = Object.getPrototypeOf(obj));

        var structure = beanStructure.structure;

        structure.forEach(function(struct){

            var index = props.indexOf(struct.property)
            if (index > -1) {
                props.splice(index, 1);
            }

        });

        props.forEach(function(propName){
            var instance = this;
            var camelcase = intance.camelcase;
            var QualifierAnnotation = instance.QualifierAnnotation;

            var capitalProName = camelcase(propName);
            capitalProName = (capitalProName[0].toUpperCase() + capitalProName.slice(1));

            var struct = {
                "annotationValue": "(\""+propName+"\")",
                "annotation": QualifierAnnotation,
                "injector": true,
                "sourceBean": capitalProName,
                "property": propName,
                "autowired": true
            };

            beanStructure.structure.push(struct);
        });
    }

}

module.exports = exports = AutowireAnnotationParser;