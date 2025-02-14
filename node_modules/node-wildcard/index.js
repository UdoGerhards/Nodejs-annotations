var forEach = require('lodash.foreach'),
    includes = require('lodash.includes'),
    wildcardMatcher = require('wildcard2'),
    itypeof = require('itypeof'),
    allowedNonStringTypes = ['number', 'boolean', 'regexp'],
    matchers = {};

var normalize = function(value, options){
  if(itypeof(value) !== 'string' &&
      itypeof(options) === 'object' &&
      itypeof(options.include) === 'array' &&
      includes(allowedNonStringTypes, itypeof(value)) &&
      includes(options.include, itypeof(value))){
    value = value.toString();
  }
  return value;
};

matchers.number =
matchers.boolean =
matchers.regexp =
matchers.string = function(value, wildcard, options){
  return wildcardMatcher(normalize(value, options), wildcard);
};

matchers.object = function(obj, wildcard, options){
  var result = {};
  forEach(obj, function(value, key){
    if(matchers.string(normalize(key, options), wildcard)){
      result[key] = value;
    }
  });
  return result;
};

matchers.array = function(array, wildcard, options){
  var result = [];
  forEach(array, function(value, key){
    if(matchers.string(normalize(value, options), wildcard)){
      result.push(value);
    }
  });
  return result;
};

module.exports = function(value, wildcard, options){
  var type = itypeof(value);
  var result = false;
  if(matchers[type]){
    result = matchers[type](value, wildcard, options);
  }
  return result;
};
