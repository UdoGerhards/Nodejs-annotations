'use strict';
var InitAnnotation = require("../../../../annotation/initialize/Init/InitAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , wildcard = require("wildcard")
    , _ = require("lodash")
    , md5 = require("MD5")
    , Promise = require("bluebird");

class PointCutParser extends BaseAnnotationParser {

    static get SUPPORTS() {
        return [InitAnnotation.name]
    };

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
            case global.stages._AOP_INITIALIZE_:
                instance._aop_initialize(annotationInformation, beanStructure, applicationStructure);
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

        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var propertyResult = parser.parse(leadingToken);
        var property = propertyResult.id;

        annotationInformation.property = property;
    }

    _aop_initialize(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var logger = instance.logger;

        var beans = applicationStructure.classToBean;
        var pointCut = annotationInformation.property;
        var pointCutMD5Identifier = md5(pointCut);

        var _instance = beanStructure._instance;
        var aspectIdentifier = _instance.constructor.name;

        if (_.isArray(beans)) {

            for (var beanIdentifier in beans) {
                /**
                    Proceed if bean is not an aspect
                 **/
                if (!applicationStructure.aspects.includes(beanIdentifier)) {

                    var beanInstance = beans[beanIdentifier]._instance;
                    var beanKeys = Object.keys(beanInstance);

                    /** Match point cut members **/
                    var pointCutTargets = wildcard(pointCut, beanKeys);

                    /** Get all functions from bean **/
                    var beanPointCuts = [];
                    pointCutTargets.forEach(function(member) {
                        if (typeof beanInstance[member] === "function") {
                            beanPointCuts.push(member);
                        }
                    });
                }

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
                pointCutObject._beans[beanIdentifier].pointCutTargets = pointCutTargets;

                beanStructure._pointCuts[pointCutMD5Identifier] = pointCutObject;

                /**
                 *  Save also in aspect information for application context (reference)
                 */
                var aspectPointCutInformation = applicationStructure.aspects[aspectIdentifier];
                if (!aspectPointCutInformation) {
                    applicationStructure.aspects[aspectIdentifier] = [];
                }
                applicationStructure.aspects[aspectIdentifier].push(pointCutObject);
            }
        }
    }
}

module.exports = exports = PointCutParser;