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

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n    var loc = window.location;\n    var uri = \"ws:\";\n    if (loc.protocol === \"https:\") {\n        uri = \"wss:\";\n    }\n    uri += \"//\" + loc.host;\n    uri += loc.pathname + \"stream\";\n    var ws = new WebSocket(uri);\n    ws.onopen = function () {\n        console.log(\"Connected\");\n    };\n    ws.onmessage = function (evt) {\n        var out = document.getElementById(\"output\");\n        out.innerHTML += evt.data + \"<br>\";\n    };\n    var btn = document.querySelector(\".btn\");\n    btn.addEventListener(\"click\", function () {\n        ws.send(document.getElementById(\"input\").value);\n    });\n});\n\n\n//# sourceURL=webpack://gbs-go/./src/ts/main.ts?");

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