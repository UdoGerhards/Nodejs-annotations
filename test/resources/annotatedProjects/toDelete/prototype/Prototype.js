'use strict';

/**
 * @Bean("PrototypeFunction")
 *
 * @Namespace()
 * @Inherits()
 *
 * @constructor
 */
var PrototypeBean = function() {

    let instance = this;
};

/*
 * @Qualifier("Controller")
 */
PrototypeBean.prototype.controller = null;

/*
 * @Qualifier("ServiceBean")
 */
PrototypeBean.prototype.service = null;

/*
 * @Qualifier("ComponentBean")
 */
PrototypeBean.prototype.component = null;

/*
 * @Bean("InnerBean1")
 */
PrototypeBean.prototype.innerBean1 = function() {

};

/*
 * @Bean("InnerBean2")
 */
PrototypeBean.prototype.innerBean1.prototype.innerBean2 = function() {

};

/*
 * @Init()
 */
PrototypeBean.prototype.innerBean1.prototype.innerBean2.prototype.init2 = function() {

};

/*
 * @Qualifier("initFlag1")
 */
PrototypeBean.prototype.innerBean1.prototype.initFlag = null;

/*
 * @Init()
 */
PrototypeBean.prototype.innerBean1.prototype.init1 = function() {};

PrototypeBean.prototype.initFlag = null;

/*
 * @Init()
 */
PrototypeBean.prototype.init = function() {};

module.exports = exports = PrototypeBean;