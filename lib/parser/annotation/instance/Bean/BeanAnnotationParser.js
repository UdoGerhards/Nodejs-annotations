'use strict';

const BaseParser = require("../../Base/BaseAnnotationParser");

class BeanParser extends BaseParser {

    constructor() {

        super();

        var instance = this;
        instance.MainBeanLoader = null;
        instance.SubBeanLoader = null;
        instance.uuidV4 = null;
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
        super.parse(annotationInformation, beanStructure, applicationStructure);

        return beanStructure;

    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        let instance = this;
        let logger = instance.logger;
        let util = instance.util;
        let MainBeanLoader = instance.MainBeanLoader;
        let SubBeanLoader = instance.SubBeanLoader;


        // TODO: Beautify
        let clazz = annotationInformation.className;

        // Get a dedicated bean name if set as parameter in the annotation
        let beanName = annotationInformation.annotationValue;

        beanStructure.beanName = beanName || clazz;         // Either we have dedicated descriptor or we take the property name as bean name
        applicationStructure.nameToNamespace[beanStructure.beanName] = beanStructure;

        // Prepare loader
        let path = beanStructure.path;
        let namespace = beanStructure.namespace.split(String.fromCharCode(12));

        if (namespace.length === 1) {

            let loader = new MainBeanLoader();

            loader.setBeanStructure(beanStructure);
            loader.setPath(path);
            loader.setNamespace(namespace[0]);
            loader.logger = logger;
            beanStructure.loader = loader;

        } else {

                let namespaceSeq = namespace;

                try {
                    let parentBeanStructure = instance._getSingleBeanStructureFromApplicationStack(namespaceSeq, applicationStructure);

                    let parentBeanLoader = parentBeanStructure.loader;

                    let parentNamespace = namespaceSeq[namespaceSeq.length - 2];
                    let beanNamespace = namespaceSeq[namespaceSeq.length - 1];

                    let loader = new SubBeanLoader();

                    if (!clazz) {
                        let parentStructure = parentBeanStructure.structure;

                        parentStructure.forEach(function (struct) {
                            if (struct.sourceBean && struct.sourceBean.endsWith(beanNamespace)) {
                                clazz = struct.property;
                                return false;
                            }
                        })
                    }

                    loader.setParentProperty(clazz);
                    loader.setBeanStructure(beanStructure);
                    loader.setPath(path);
                    loader.setNamespace(beanNamespace);
                    loader.logger = logger;
                    beanStructure.loader = loader;

                    try {
                        let listenerCount = parentBeanLoader.listenerCount(parentNamespace);
                        let maxListenerCount = listenerCount + 1;
                        parentBeanLoader.setMaxListeners(maxListenerCount);

                        parentBeanLoader.once(parentNamespace, loader.instantiate.bind(loader));

                        beanStructure.loader = loader;
                    } catch (error) {

                        logger.error(error);

                    }
                } catch(e) {
                    logger.error(e);
                }

        }
    }

    /**
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _instantiate(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var logger = instance.logger;
        let util = instance.util;

        if (typeof beanStructure.loader != "undefined" && beanStructure.loader.constructor.name == "MainBeanLoader") {
            beanStructure.loader.instantiate();

            var _instance = beanStructure._instance;
            let className =  null;
            try {
                className = _instance.constructor.name;
            } catch(e) {
                console.log(util.inspect(beanStructure, {depth:25}));
            }

            beanStructure._className = className;

            if (!applicationStructure.classToBean) {
                applicationStructure.classToBean = {};
            }

            if (!applicationStructure.classToBean[className]) {
                applicationStructure.classToBean[className] = [];
            }

            /**
             * Detect instance methods
             */

            beanStructure._methods = [];
            var obj = beanStructure._instance;
            var props = [];

            do {
                props = props.concat(Object.getOwnPropertyNames(obj));
            } while (obj = Object.getPrototypeOf(obj));

            beanStructure._methods = props.sort().filter(function(e, i, arr) {
                if (e!=arr[i+1] && typeof beanStructure._instance[e] == 'function') return true;
            });

           applicationStructure.classToBean[className].push(beanStructure._instance);
        }

        return beanStructure;
    }

    /**
     * Finish bean setup by sorting
     */
    _finishSetup(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        //console.log(beanStructure);

        if (!applicationStructure.instanceTypes) {
            applicationStructure.instanceTypes = {};
        }

        var type = annotationInformation.annotation.name;

        if (!Array.isArray(applicationStructure.instanceTypes[type])) {
            applicationStructure.instanceTypes[type] = [];
        }

        applicationStructure.instanceTypes[type].push(beanStructure._instance);

        return beanStructure;
    }

    /**
     * Creates a bean for the application stack
     *
     * @param currentTag
     * @param propertyStack
     * @param context
     * @param stack
     * @param beanStructure
     * @returns {*}
     */
    parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure) {
        let instance = this;
        let logger = instance.logger;
        let path = instance.path;

        let uuidV4 = instance.uuidV4;
        let uniqueId = uuidV4();
        let annotation = instance.annotation;

        let attributes = currentTag.attributes;
        let xmlMapper = instance._getXMLMapper(currentTag.name);

        if (currentTag.attributes.src) {
            let tmpSrc = path.normalize(path.join(moduleDir, currentTag.attributes.src));
            currentTag.attributes.src = tmpSrc;
        }

        namespaceStack.push(uniqueId);

        let beanId = currentTag.attributes.id;

        logger.debug("\tCreating: '"+annotation.name.replace(/^\w/, c => c.toUpperCase())+"' => '"+beanId+"'");

        beanStructure = xmlMapper.parseOpenXMLTag(currentTag, annotation, beanStructure);

        if (!beanStructure.descriptor.annotationValue) {
            beanStructure.descriptor.annotationValue = "(\"" + uniqueId + "\")",
                beanStructure.descriptor.comment = annotation.name + "(\"" + uniqueId + "\")"
        }

        if (attributes.inherits) {
            let namespaceMapper = instance.annotationParser["Inherits"];
            beanStructure = namespaceMapper.parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure);
        }

        /*
         * Namespace
         */
        if (attributes.namespace) {
            let namespaceMapper = instance.annotationParser["Namespace"];
            beanStructure = namespaceMapper.parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure);
        }

        /*
         * Init function
         */
        if (attributes.init) {
            let initMapper = instance.annotationParser["Init"];
            beanStructure = initMapper.parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure);
        }

        /*
         * Run
         */
        if (attributes.run) {
            let runMapper = instance.annotationParser["Run"];
            beanStructure = runMapper.parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure);
        }

        let masterUuidV4 = namespaceStack[0];
        let namespaceString = null;

        if (namespaceStack.length > 1) {
            namespaceString = namespaceStack.join(String.fromCharCode(12));
        } else {
            namespaceString = namespaceStack[0];
        }

        if (!applicationStack[masterUuidV4]) {
            applicationStack[masterUuidV4] = {};
        }

        logger.trace("\tNamespace: '" + namespaceString+"'");

        beanStructure.namespace = namespaceString;

        applicationStack[masterUuidV4][namespaceString] = beanStructure;

        return beanStructure;

    }

    parseCloseXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, context, applicationStack, beanStructure) {
        let instance = this;
        let namespaceString = null;
        let annotation = instance.annotation;
        let logger = instance.logger;

        /* if we have a sub bean */
        if (namespaceStack.length > 1) {
            namespaceString = namespaceStack.join(String.fromCharCode(12));
        } else {
            namespaceString = namespaceStack[0];
        }

        if (propertyStack.length > 0) {

            let masterUuidV4 = namespaceStack[0];

            let propertyMapper = instance.annotationParser["Reference"];

            let masterId = applicationStack[masterUuidV4][masterUuidV4].descriptor.annotationValue.replace("(","").replace(")","").replace(/\"/g, "");
            let currentTag = {
                name: "Reference",
                attributes: {
                    id: masterId+"#"+propertyStack.join(":")
                }
            };

            let strucktEntry = propertyMapper.parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, null);

            // Get new descriptor for sub bean
            let currentBeanKey =  namespaceStack.slice(0,namespaceStack.length).join(String.fromCharCode(12));
            applicationStack[masterUuidV4][currentBeanKey].descriptor.annotationValue = "(\""+masterId+"#"+propertyStack.join(":")+"\")";
            applicationStack[masterUuidV4][currentBeanKey].descriptor.comment = "@"+annotation.name+"(\""+masterId+"#"+propertyStack.join(":")+"\")";

            /* Get the parent beanStructure */
            let nextUpperKeyArr = namespaceStack.slice(0,namespaceStack.length-1);
            let nextUpperBeanStructure = nextUpperKeyArr.join(String.fromCharCode(12));

            if (nextUpperBeanStructure != "") {
                if (!applicationStack[masterUuidV4][nextUpperBeanStructure].structure) {
                    applicationStack[masterUuidV4][nextUpperBeanStructure].structure = [];
                }

                let structCount = applicationStack[masterUuidV4][nextUpperBeanStructure].structure.length;
                applicationStack[masterUuidV4][nextUpperBeanStructure].structure[structCount] = strucktEntry;

            }
        }

        namespaceStack.splice(namespaceStack.length-1,1);

        return beanStructure;
    }
}

module.exports = exports = BeanParser;