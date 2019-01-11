'use strict';

/**
 * @Bean("Object")
 * @Namespace()
 * @type {Object}
 */
var objectBean = Object;

/**
 * @Qualifier("Property")
 * @type {null}
 */
objectBean.prototype.property = null;

/**
 * @Init();
 * @type {Object}
 */
objectBean.prototype.init = function() {};

module.exports = exports = objectBean;
