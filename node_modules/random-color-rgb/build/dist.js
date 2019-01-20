module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var getRandom = function getRandom() {
	  var max = arguments.length <= 0 || arguments[0] === undefined ? 999999999999 : arguments[0];
	  var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	  return min + Math.floor(Math.random() * (max - min));
	};

	var getColor = function getColor() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$max = _ref.max;
	  var max = _ref$max === undefined ? 255 : _ref$max;
	  var _ref$min = _ref.min;
	  var min = _ref$min === undefined ? 0 : _ref$min;
	  var opacity = _ref.opacity;

	  var first = getRandom(max, min);
	  var second = getRandom(max, min);
	  var third = getRandom(max, min);
	  var result = '';

	  if (opacity) {
	    result = 'rgba(' + first + ',' + second + ',' + third + ',' + opacity + ')';
	  } else {
	    result = 'rgb(' + first + ',' + second + ',' + third + ')';
	  }

	  return result;
	};

	module.exports = getColor;

/***/ }
/******/ ]);