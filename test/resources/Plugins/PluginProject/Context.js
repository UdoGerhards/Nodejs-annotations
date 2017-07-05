'use strict';


/**
 * @Plugin("Plugin")
 */
var Plugin = function() {

    var instance = this;

    /*
     * @Qualifier("Bean")
     */
    instance.bean = null;

    /*
     * @Qualifier("Controller")
     */
    instance.controller= null;

    /*
     * @Qualifier("ServiceBean")
     */
    instance.service = null;

    /*
     * @Qualifier("ComponentBean")
     */
    instance.component = null;

    /*
     * @Qualifier("AnnotationFactory")
     */
    instance.factory = null;

    /*
     * @Qualifier("AnnotationContextBuilder")
     */
    instance.contextBuilder = null;

    /*
     * @Qualifier("AnnotationDependencyBuilder")
     */
    instance.dependencyBuilder = null;

    /*
     * @Qualifier("AnnotationStructureParser")
     */
    instance.structurParser = null;

    instance.initFlag = null;

}

/**
 *  @Init()
 */
Plugin.prototype.init = function() {

    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");

}

/**
 * @Run()
 * @type {Plugin}
 */
Plugin.prototype.run = function() {
    var instance = this;
}


module.exports = exports = Plugin;
