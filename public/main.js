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

eval("window.onload = function () {\n    var startGetMultiListButtons = document.querySelectorAll('[data-trigger=\"startGetMultiListButton\"]');\n    var stopGetMultiListButton = document.querySelector('[data-trigger=\"stopGetMultiListButton\"]');\n    startGetMultiListButtons.forEach(function (startGetMultiListButton) {\n        startGetMultiListButton.addEventListener('click', function () {\n            var loc = window.location;\n            var uri = 'ws://' + loc.host + '/stream';\n            var ws = new WebSocket(uri);\n            ws.onmessage = function (event) {\n                var multiInfo = JSON.parse(event.data);\n                var multiBox = document.createElement('div');\n                var multiId = document.createElement('div');\n                var multiEnemy = document.createElement('div');\n                multiId.append(multiInfo.multi_id);\n                multiEnemy.append(multiInfo.enemy);\n                multiBox.append(multiId);\n                multiBox.append(multiEnemy);\n                multiBox.className = 'multiBox';\n                var multiList = document.getElementById('multiList');\n                if (multiList.childElementCount >= 20) {\n                    multiList.lastChild.remove();\n                }\n                multiList.prepend(multiBox);\n                multiBox.addEventListener('click', function () {\n                    navigator.clipboard.writeText(multiId.innerHTML).then(function () {\n                        multiBox.classList.add('-copied');\n                        var copiedMessageElement = document.querySelector('.copiedMessage');\n                        copiedMessageElement.classList.add('-on');\n                        setTimeout(function () {\n                            return copiedMessageElement.classList.remove('-on');\n                        }, 3000);\n                        console.log('copied');\n                    }, function () {\n                        console.log('failed to copy');\n                    });\n                });\n            };\n            stopGetMultiListButton.addEventListener('click', function () {\n                ws.close();\n            });\n            ws.onopen = function () {\n                console.log('Connection start!!');\n                ws.send(startGetMultiListButton.getAttribute('value'));\n            };\n            ws.onclose = function () {\n                console.log('Connection stop!!');\n            };\n        });\n    });\n};\n\n\n//# sourceURL=webpack://gbs-go/./src/ts/main.ts?");

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