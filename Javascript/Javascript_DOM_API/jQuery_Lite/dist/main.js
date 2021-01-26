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

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/***/ ((module) => {

eval("class DOMNodeCollection {\n  constructor (nodes) {\n    this.nodes = nodes\n  }\n\n  on(eventName, callback) {\n    this.nodes.forEach(function(node) {\n      node.addEventListener(eventName, callback);\n      const eventKey = `jsqliteEvents-${eventName}`;\n      if (typeof node[eventKey] === 'undefined') {\n        node[eventKey] = [];\n      }\n      node[eventKey].push(callback);\n    })\n  }\n\n  off(eventName){\n    this.nodes.forEach(function(node){\n      const eventKey = `jqliteEvents-${eventName}`;\n      if (node[eventKey]) {\n        node[eventKey].forEach(function(callback){\n          node.removeEventListener(eventName, callback);\n        })\n      }\n      node[eventKey] = [];\n    })\n  }\n  \n  html (arg) {\n    if (typeof arg === 'string') {\n      this.arr.forEach(function(node){\n        node.innerHTML = arg\n      })\n    } else if (this.nodes.length > 0) {\n      return this.arr[0].innerHTML\n    }\n  }\n\n  empty () {\n    this.html('')\n  }\n\n  append (children) {\n    if (this.nodes.length === 0) return;\n\n    if (typeof children === 'object' &&\n        !(children instanceof DOMNodeCollection)) {\n      \n      children = $l(children);\n    }\n\n    if (typeof children === 'string') {\n      this.nodes.forEach(function(node){\n        node.innerHTML += children;\n      })\n    } else if (children instanceof DOMNodeCollection) {\n      this.nodes.forEach(function(node){\n\n        children.forEach(function(childNode){\n          node.appendChild(childNode.cloneNode(true));\n        }) \n      })\n    }\n  }\n\n  attr (key, val) {\n    if (typeof val === 'string') {\n      this.forEach(function(node){\n        node.setAttribute(key, val)\n      })\n    } else {\n      return this.nodes[0].getAttribute(key);\n    }\n  }\n\n  addClass (newClass) {\n    this.nodes.forEach(function(node) { node.classList.add(newClass) })\n  }\n\n  removeClass(oldClass) {\n    this.nodes.forEach(function (node) { node.classList.remove(removeClass) })\n  }\n\n  children () {\n    const children = []\n    this.nodes.forEach(function(node){\n      const childNodes = node.children;\n      children = childNodes.concat(Array.from(childNodes))\n    })\n    return new DOMNodeCollection(children)\n  }\n\n  parent () {\n    const parents = []\n    this.nodes.forEach(function (node) {\n      if (!node.parentNode.visited) {\n        parents.push(node.parentNode)\n        node.parentNode.visited = true;\n      }\n    })\n\n    parents.forEach(function(node){\n      node.visited = false;\n    })\n    return new DOMNodeCollection(parents)\n  }\n\n  find (selector) {\n    let foundNodes = [];\n    this.forEach(function(node){\n      const nodeList = node.querySelectorAll(selector);\n      foundNodes = foundNodes.concat(Array.from(nodeList));\n    })\n    return new DOMNodeCollection(foundNodes);\n  }\n\n  remove () {\n    this.nodes.forEach(function(node) { node.parentNode.removeChild(node) })\n  }\n}\n\nmodule.exports = DOMNodeCollection\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nconst _docReadyCallbacks = [];\nlet _docReady = false;\n\nwindow.$l = function (arg) {\n  if (typeof(arg) === 'object') {\n    return new DOMNodeCollection([arg])\n  } else if (typeof(arg) === 'string') {\n    const nodes = document.querySelectorAll(arg)\n    const nodesArray = Array.from(nodes)\n    return new DOMNodeCollection(nodesArray)\n  } else if (typeof(arg) === 'function') {\n    return registerDocReadyCallback(arg);\n  }\n}\n\n$l.extend = function (base, ...otherObjs) {\n  otherObjs.forEach(function(obj){  \n    for (const prop in obj) {\n      base[prop] = obj[prop];\n    }\n  })\n  return base\n}\n\n// couldn't get this working, had to move on 1/28/21 645pm\n// $l.ajax = function (options) {\n//   const request = new XMLHttpRequest();\n//   const defaults = {\n//     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n//     method: 'GET',\n//     url: '',\n//     success: function(){},\n//     error: function(){},\n//     data: {},\n//   }\n\n//   options = $l.extend(defaults, options);\n//   options.method = options.method.toUpperCase();\n\n//   if (options.method === 'GET') {\n//     options.url += `?${new URLSearchParams(options.data).toString()}`\n//   }\n\n//   request.open(options.method, options.url, true);\n//   request.onload = function(e){\n//     if (request.status === 200) {\n//       options.success(request.response);\n//     } else {\n//       options.error(request.response);\n//     }\n//   };\n\n//   request.send(JSON.stringify(options.data))\n// }\n\n\n\n\nfunction registerDocReadyCallback () {\n  if (document.readyState !== 'complete') {\n    _docReadyCallbacks.push(func);\n  } else {\n    func();\n  }\n}\n\ndocument.addEventListener('DOMContentLoaded', function(){\n  if (document.readyState === 'complete') {\n    _docReadyCallbacks.forEach(function (func) { \n      func(); \n    })\n  }\n})\n\n//# sourceURL=webpack:///./src/index.js?");
})();

/******/ })()
;