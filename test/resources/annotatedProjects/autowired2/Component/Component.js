'use strict';

/**
 * @Component("Component")
 * @Autowire()
 * @Inherits("AncestorComponent")
 * @constructor
 */
function Component() {
    var instance = this;

    instance.bean = null;
}

module.exports = exports = Component;