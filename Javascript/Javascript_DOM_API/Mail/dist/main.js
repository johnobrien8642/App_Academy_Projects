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

/***/ "./src/compose.js":
/*!************************!*\
  !*** ./src/compose.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MessageStore = __webpack_require__(/*! ./message_store.js */ \"./src/message_store.js\") \n\nmodule.exports = {\n  renderForm () {\n    const draft = MessageStore.getMessageDraft();\n    const form = `\n    <p class=\"new-message-header\">New Message</p>\n    <form class=\"compose-form\">\n      <input placeholder=\"Recipient\" name=\"to\" type=\"text\" value=\"${draft.to}\"></input>\n      \n      <input placeholder=\"Subject\" name=\"subject\" type=\"text\" value=\"${draft.subject}\"></input>\n      \n      <textarea name=\"body\" rows=\"20\">${draft.body}</textarea>\n      \n      <button type=\"submit\" class=\"btn btn-primary submit-message\">Send</button>\n    </form>`\n\n    return form\n  },\n  \n  render () {\n    const container = document.createElement('div');\n    container.className = 'new-message';\n    container.innerHTML = this.renderForm();\n    container.addEventListener('change', function(e){\n      let target = e.target;\n      MessageStore.updateDraftField(target.name, target.value)\n    })\n\n    container.addEventListener('submit', function(e){\n      e.preventDefault();\n      MessageStore.sendDraft();\n      location.hash = 'inbox';\n    })\n    \n    return container;\n  }\n}\n\n//# sourceURL=webpack://Mail/./src/compose.js?");

/***/ }),

/***/ "./src/inbox.js":
/*!**********************!*\
  !*** ./src/inbox.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MessageStore = __webpack_require__(/*! ./message_store.js */ \"./src/message_store.js\")\n\nmodule.exports = {\n  renderMessage(msg) {\n    const li = document.createElement('li');\n    li.className = 'message';\n    li.innerHTML = `\n    <span class=\"from\">${msg.from}</span>\n    <span class=\"subject\">${msg.subject}</span>\n    <span class=\"body\">${msg.body}</span>`;\n    return li;\n  },\n\n  render () {\n    const messages = MessageStore.getInboxMessages();\n    const ul = document.createElement('ul');\n    ul.className = 'messages';\n    let that = this\n    messages.forEach(function(msg){\n      const rendered = that.renderMessage(msg);\n      ul.appendChild(rendered) \n    })\n    return ul;\n  }\n};\n\n\n\n//# sourceURL=webpack://Mail/./src/inbox.js?");

/***/ }),

/***/ "./src/message_store.js":
/*!******************************!*\
  !*** ./src/message_store.js ***!
  \******************************/
/***/ ((module) => {

eval("const user = \"meyerbriggs@icecream.com\"\n\nclass Message {\n  constructor (from = user, to = \"\", subject = \"\", body = \"\") {\n    this.from = from;\n    this.to = to;\n    this.subject = subject;\n    this.body = body;\n  }\n}\n\nlet messages = JSON.parse(localStorage.getItem('messages'));\nlet messageDraft = new Message();\n\nif(!messages) {\n  messages = {\n  sent: [\n    {\n      to: \"friend@mail.com\",\n      subject: \"Check this out\",\n      body: \"It's so cool\"\n    },\n    { to: \"person@mail.com\", subject: \"zzz\", body: \"so booring\" }\n  ],\n  inbox: [\n    {\n      from: \"grandma@mail.com\",\n      subject: \"Fwd: Fwd: Fwd: Check this out\",\n      body:\n        \"Stay at home mom discovers cure for leg cramps. Doctors hate her\"\n    },\n    {\n      from: \"person@mail.com\",\n      subject: \"Questionnaire\",\n      body: \"Take this free quiz win $1000 dollars\"\n    }\n  ]\n    };\n}\n\nconst MessageStore = {\n  getInboxMessages () {\n    return messages.inbox.slice();\n  },\n  getSentMessages () {\n    return messages.sent.slice();\n  },\n  getMessageDraft () {\n    return messageDraft;\n  },\n  sendDraft () {\n    messages.sent.unshift(messageDraft);\n    messageDraft = new Message();\n    localStorage.setItem('messages', JSON.stringify(messages));\n  }, \n  updateDraftField(field, value) {\n    messageDraft[field] = value;\n  }\n}\n\nmodule.exports = MessageStore;\n\n//# sourceURL=webpack://Mail/./src/message_store.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((module) => {

eval("class Router {\n  constructor (node, routes) {\n    this.node = node;\n    this.routes = routes;\n  }\n  \n  start() {\n    this.render();\n    let that = this\n    window.addEventListener('hashchange', function () {\n      that.render()\n    });\n  }\n  \n  render () {\n    this.node.innerHTML = '';\n    let component = this.activeRoute();\n    if(component) {\n      this.node.appendChild(component.render())\n    }\n  }\n\n  activeRoute() {\n    let hash = window.location.hash.substr(1);\n    let component = this.routes[hash]\n    return component\n  } \n}\n\nmodule.exports = Router;\n\n\n\n\n\n//# sourceURL=webpack://Mail/./src/router.js?");

/***/ }),

/***/ "./src/sent.js":
/*!*********************!*\
  !*** ./src/sent.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MessageStore = __webpack_require__(/*! ./message_store.js */ \"./src/message_store.js\")\n\nmodule.exports = {\n  renderMessage(msg) {\n    const li = document.createElement('li');\n    li.className = 'message';\n    li.innerHTML = `\n    <span class=\"to\">To: ${msg.to}</span>\n    <span class=\"subject\">${msg.subject}</span>\n    <span class=\"body\">${msg.body}</span>`;\n    return li;\n  },\n\n  render() {\n    const messages = MessageStore.getSentMessages();\n    const ul = document.createElement('ul');\n    ul.className = 'messages';\n    let that = this\n    messages.forEach(function (msg) {\n      const rendered = that.renderMessage(msg);\n      ul.appendChild(rendered)\n    })\n    return ul;\n  }\n};\n\n//# sourceURL=webpack://Mail/./src/sent.js?");

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
eval("const Router = __webpack_require__(/*! ./router.js */ \"./src/router.js\")\nlet Inbox = __webpack_require__(/*! ./inbox.js */ \"./src/inbox.js\")\nlet Sent = __webpack_require__(/*! ./sent.js */ \"./src/sent.js\")\nlet Compose = __webpack_require__(/*! ./compose.js */ \"./src/compose.js\")\n\nlet routes = {\n  inbox: Inbox,\n  sent: Sent,\n  compose: Compose\n}\n\ndocument.addEventListener('DOMContentLoaded', function(){\n  const content = document.querySelector('.content');\n  const router = new Router(content, routes);\n  router.start();\n\n  window.location.hash = \"#inbox\";\n  const sidebarLis = Array.from(document.querySelectorAll('.sidebar-nav li'));\n  sidebarLis.forEach(function(navLi){\n    navLi.addEventListener('click', function(){\n      let hashText = navLi.textContent.toLowerCase();\n      location.hash = hashText;\n    })\n  })\n})\n\n\n\n\n\n//# sourceURL=webpack://Mail/./src/index.js?");
})();

/******/ })()
;