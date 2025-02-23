'use strict';
import BaseParser from "../../Base/Base";

class PointCut extends BaseParser {

    constructor() {
        super();
        let instance = this;
        instance.wildcard = null;
        instance.md5 = null;
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
            case global.stages._AOP_INITIALIZE:
                instance._aop_initialize(annotationInformation, beanStructure, applicationStructure);
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

        var pointCutString = annotationInformation.annotationValue.replace("(","").replace(")", "").replace(/'/g, "").replace(/"/g, "").trim();
        annotationInformation.property = pointCutString;
    }

    _aop_initialize(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var logger = instance.logger;
        var wildcard = instance.wildcard;
        var md5 = instance.md5;

        var beans = applicationStructure.nameToNamespace;

        var pointCut = annotationInformation.property;
        var pointCutMD5Identifier = md5(pointCut);

        var _instance = beanStructure._instance;
        var aspectIdentifier = beanStructure.beanName;

        //if (_.isObject(beans)) {
        if (typeof beans == "object"  && !Array.isArray(beans)) {
            for (var beanIdentifier in beans) {

                var beanName = beans[beanIdentifier].beanName;

                if (beanIdentifier !== aspectIdentifier) {

                    if (!applicationStructure.aspects) {
                        applicationStructure.aspects = {};
                    }

                /**
                 Proceed if bean is not an aspect
                 **/
                if ((!applicationStructure.aspectsObjects[beanName] && applicationStructure.aspects[beanName] == null) || (typeof applicationStructure.aspects[beanName] == "undefined")) {

                    //var beanInstance = beans[beanIdentifier][0];

                    var beanInstance = beans[beanIdentifier]._instance;
                    var methods = beans[beanIdentifier]._methods;

                    /** Match point cut members **/
                    var pointCutTargets = wildcard(methods, pointCut);

                    /** Get all functions from bean **/
                    var beanPointCuts = [];
                    pointCutTargets.forEach(function (member) {
                        if (typeof beanInstance[member] === "function") {
                            beanPointCuts.push(member);
                        }
                    });

                    //if (!_.isEmpty(beanPointCuts)) {
                    if (beanPointCuts.length > 0) {
                        /**
                         * Save point cut information in bean structure
                         */
                        if (!beanStructure._pointCuts) {
                            beanStructure._pointCuts = {};
                        }

                        if (!beanStructure._pointCuts[pointCutMD5Identifier]) {
                            beanStructure._pointCuts[pointCutMD5Identifier] = {};
                        }

                        var pointCutObject = beanStructure._pointCuts[pointCutMD5Identifier];

                        pointCutObject._pointCut = pointCut;
                        if (!pointCutObject._beans) {
                            pointCutObject._beans = {};
                        }

                        //if (!_.isObject(pointCutObject._beans[beanIdentifier])) {
                        if (!pointCutObject._beans[beanIdentifier] ) {
                            pointCutObject._beans[beanIdentifier] = {};
                        }

                        pointCutObject._beans[beanIdentifier].pointCutTargets = pointCutTargets;

                        //console.log(pointCutTargets);

                        beanStructure._pointCuts[pointCutMD5Identifier] = pointCutObject;

                        /**
                         *  Save also in aspect information for application context (reference)
                         */
                        var aspectPointCutInformation = applicationStructure.aspects[aspectIdentifier];
                        if (!aspectPointCutInformation) {
                            applicationStructure.aspects[aspectIdentifier] = [];
                        } else {
                            var added = false;
                            var aspectPointCutObjects = applicationStructure.aspects[aspectIdentifier];

                            for (var index = 0; index < aspectPointCutObjects.length; index++) {
                                var savedPointCutObject = aspectPointCutObjects[index];

                                if (savedPointCutObject._pointCut == pointCutObject._pointCut) {
                                    for (var newBeanIdentifier in pointCutObject._beans) {
                                        applicationStructure.aspects[aspectIdentifier][index]._beans[newBeanIdentifier] = pointCutObject._beans[newBeanIdentifier];
                                    }
                                    added = true;
                                    break;
                                }
                            }

                            if (!added) {
                                applicationStructure.aspects[aspectIdentifier].push(pointCutObject);
                            }
                        }

                        //beanStructure.pointCuts = applicationStructure.aspects[aspectIdentifier];
                        //console.log(util.inspect(beanStructure, {depth:25}));
                    }
                }
            }
            }
            //logger.trace(util.inspect(applicationStructure.aspects, {depth:25}));
        }
    }
}

export default PointCut;