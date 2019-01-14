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


/*
 * @Bean("InnerBean")
 */
objectBean.prototype.innerBean = function() {};

/*
 * @Qualifier("InnerProperty")
 */
objectBean.prototype.innerBean.innerProperty = null;

/**
 * @Init();
 * @type {Object}
 */
objectBean.prototype.init = function() {};

module.exports = exports = objectBean;
