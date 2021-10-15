/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/***/ (() => {

eval("window.onload = function () {\n    var getMultiListButton = document.querySelector('[data-trigger=\"getMultiListButton\"]');\n    getMultiListButton.addEventListener('click', function () {\n        var loc = window.location;\n        var uri = 'ws://' + loc.host + '/stream';\n        var ws = new WebSocket(uri);\n        ws.onmessage = function (evt) {\n            var out = document.getElementById('multiList');\n            out.innerHTML += evt.data + '<br>';\n        };\n    });\n};\n\n\n//# sourceURL=webpack://gbs-go/./src/ts/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/ts/main.ts"]();
/******/ 	
/******/ })()
;