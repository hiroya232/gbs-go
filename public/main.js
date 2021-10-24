/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/copyMulti.ts":
/*!*****************************!*\
  !*** ./src/ts/copyMulti.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"copyMultiId\": () => (/* binding */ copyMultiId)\n/* harmony export */ });\nvar copyMultiId = function (multiInfoElement) {\n    navigator.clipboard\n        .writeText(multiInfoElement.multiIdElement.innerHTML)\n        .then(function () {\n        console.log('copied');\n        multiInfoElement.multiBoxElement.classList.add('-copied');\n        var copiedMessageElement = document.querySelector('.copiedMessage');\n        document.querySelector('.copiedMessage').classList.add('-on');\n        setTimeout(function () { return copiedMessageElement.classList.remove('-on'); }, 3000);\n    }, function () {\n        console.log('failed to copy');\n    });\n};\n\n\n//# sourceURL=webpack://gbs-go/./src/ts/copyMulti.ts?");

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _showMulti__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./showMulti */ \"./src/ts/showMulti.ts\");\n\nwindow.onload = function () {\n    var loc = window.location;\n    var uri = 'ws://' + loc.host + '/stream';\n    var ws;\n    var startGetMultiListButtons = document.querySelectorAll('[data-trigger=\"startGetMultiListButton\"]');\n    startGetMultiListButtons.forEach(function (startGetMultiListButton) {\n        startGetMultiListButton.addEventListener('click', function () {\n            ws = new WebSocket(uri);\n            ws.onopen = function () {\n                console.log('Connection start!!');\n                ws.send(startGetMultiListButton.getAttribute('value'));\n            };\n            ws.onmessage = function (event) {\n                (0,_showMulti__WEBPACK_IMPORTED_MODULE_0__.showMultiBox)(ws, event);\n            };\n            ws.onclose = function () {\n                console.log('Connection stop!!');\n            };\n        });\n    });\n    var stopGetMultiListButton = document.querySelector('[data-trigger=\"stopGetMultiListButton\"]');\n    stopGetMultiListButton.addEventListener('click', function () {\n        ws.close();\n    });\n};\n\n\n//# sourceURL=webpack://gbs-go/./src/ts/main.ts?");

/***/ }),

/***/ "./src/ts/showMulti.ts":
/*!*****************************!*\
  !*** ./src/ts/showMulti.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showMultiBox\": () => (/* binding */ showMultiBox)\n/* harmony export */ });\n/* harmony import */ var _copyMulti__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./copyMulti */ \"./src/ts/copyMulti.ts\");\n\nvar createMultiBox = function (recvMultiInfo) {\n    var multiInfoElement = {\n        multiBoxElement: document.createElement('div'),\n        multiIdElement: document.createElement('div'),\n        multiEnemyElement: document.createElement('div'),\n    };\n    multiInfoElement.multiIdElement.innerHTML = recvMultiInfo.multi_id;\n    multiInfoElement.multiEnemyElement.innerHTML = recvMultiInfo.enemy;\n    multiInfoElement.multiBoxElement.append(multiInfoElement.multiIdElement);\n    multiInfoElement.multiBoxElement.append(multiInfoElement.multiEnemyElement);\n    multiInfoElement.multiBoxElement.className = 'multiBox';\n    return multiInfoElement;\n};\nvar showMultiBox = function (ws, event) {\n    var recvMultiInfo = JSON.parse(event.data);\n    var multiInfoElement = createMultiBox(recvMultiInfo);\n    var multiList = document.getElementById('multiList');\n    if (multiList.childElementCount >= 20) {\n        multiList.lastChild.remove();\n    }\n    multiList.prepend(multiInfoElement.multiBoxElement);\n    multiInfoElement.multiBoxElement.addEventListener('click', function () {\n        (0,_copyMulti__WEBPACK_IMPORTED_MODULE_0__.copyMultiId)(multiInfoElement);\n    });\n};\n\n\n//# sourceURL=webpack://gbs-go/./src/ts/showMulti.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/main.ts");
/******/ 	
/******/ })()
;