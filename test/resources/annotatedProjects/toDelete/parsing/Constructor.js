'use strict';

/**
 * @Bean("TestFunction1")
 * @constructor
 */
function TestFunction1() {}

/**
 * @Bean("TestFunction2")
 * @constructor
 */
let TestFunction2 = function() {};

/**
 * @Bean("TestClass")
 * @constructor
 */
class TestClass {};

/**
 * @Bean("TestObject")
 * @constructor
 */
let TestObject = Object();

/**
 * @Bean("TestBrackets")
 * @constructor
 */
let TestBrackets = {};

/**
 * @Bean("TestSquareBrackets")
 * @constructor
 */
let TestSquareBrackets = [];

/**
 * @Bean()
 * @constructor
 */
let TestObject = new Object();
