'use strict';

/**
 * @Prototype("AncestorService")

 */
function AncestorService() {
    var instance = this;

    instance.service = null;

    instance.component = null;

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