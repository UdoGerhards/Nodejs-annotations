'use strict';

/**
 * @Prototype("AncestorService")
 * @constructor
 */
function AncestorService() {
    var instance = this;

    instance.serviceBean = null;

    instance.componentBean = null;

    instance.initFlag = null;
}

/**
 * @Init()
 */
AncestorService.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = AncestorService;