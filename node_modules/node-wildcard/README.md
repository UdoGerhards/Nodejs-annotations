# node-wildcard
simple wildcard matcher for string, arrays and objects, ... etc.

[![Build Status](https://travis-ci.org/lwhiteley/node-wildcard.svg?branch=master)](https://travis-ci.org/lwhiteley/node-wildcard)

This module has the ability to pass in options to include non string values to be tested as well.

Allowed non-string types for inclusion are: `number`, `boolean`, `regexp`

There are also special non-string types that return `filtered collections` instead of a `boolean`.

Special non-string types: `array`, `object`

NB. Special types don't need to be included via the options.

see examples below.

eg.
```js
var wildcard = require('node-wildcard');
var testObj = {
  'a.b': {},
  'a': {}
}
var testArray = ['a.b', 'a']

// ways to use
console.log(wildcard('a', 'a.*' )) // => false
console.log(wildcard('a.', 'a.*' )) // => true
console.log(wildcard(testObj, 'a.*' )) // => { 'a.b': {} }
console.log(wildcard(testArray, 'a.*' )) // => [ 'a.b' ]
console.log(wildcard(1233, '123*')) // => false
console.log(wildcard(false, 'fal*')) // => false
console.log(wildcard(/false/, '*fal*')) // => false

// with options
// include property must be an array
var options = {include: ['number', 'boolean', 'regexp']}

console.log(wildcard(143, '123*', options)) // => false
console.log(wildcard(1233, '123*' , options)) // => true
console.log(wildcard(false, 'fal*' , options)) // => true
console.log(wildcard(/false/, '*fal*' , options)) // => true
```

Better Docs Coming Soon


pull requests are encouraged.
