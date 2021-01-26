/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/sema-js-core/src/binding.js":
/*!**************************************************!*\
  !*** ./node_modules/sema-js-core/src/binding.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n   modelKeyByViewId,\r\n   ViewIdsByModelKey,\r\n   bind,\r\n   unbind,\r\n   clear\r\n};\r\n\r\nlet _bindings = {};\r\n\r\nfunction ViewIdsByModelKey(modelKey) {\r\n   if (_bindings[modelKey] == null) {\r\n      return [];\r\n   }\r\n   return _bindings[modelKey];\r\n}\r\n\r\nfunction modelKeyByViewId(id) {\r\n   return Object\r\n      .entries(_bindings)\r\n      .map(([modelKey, ids]) => {\r\n         if (ids.indexOf(id) >= 0) {\r\n            return modelKey;\r\n         }\r\n      }) || null;\r\n}\r\n\r\nfunction bind(modelKey, id) {\r\n   if (modelKey == null) {\r\n      return;\r\n   }\r\n   if (_bindings[modelKey] == null) {\r\n      _bindings[modelKey] = [];\r\n   }\r\n   _bindings[modelKey].push(id);\r\n}\r\n\r\nfunction unbind(modelKey, id) {\r\n   if (_bindings[modelKey] == null) {\r\n      return;\r\n   }\r\n   var index = _bindings[modelKey].indexOf(id);\r\n   if (index === -1) {\r\n      return;\r\n   }\r\n\r\n   _bindings[modelKey].splice(index, 1);\r\n}\r\n\r\nfunction clear() {\r\n   _bindings = { };\r\n}\n\n//# sourceURL=webpack:///./node_modules/sema-js-core/src/binding.js?");

/***/ }),

/***/ "./node_modules/sema-js-core/src/event.js":
/*!************************************************!*\
  !*** ./node_modules/sema-js-core/src/event.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\r\n   notify,\r\n   subscribe,\r\n   unsubscribe\r\n};\r\n\r\n\r\nvar _binding = __webpack_require__(/*! ./binding */ \"./node_modules/sema-js-core/src/binding.js\");\r\nvar _model = __webpack_require__(/*! ./model */ \"./node_modules/sema-js-core/src/model.js\");\r\nvar _view = __webpack_require__(/*! ./view */ \"./node_modules/sema-js-core/src/view.js\");\r\n\r\nlet id = 0;\r\nconst subscriptions = {};\r\nconst subscriptionsById = {};\r\n\r\ndocument.addEventListener('click', userEvent);\r\ndocument.addEventListener('dblclick', userEvent);\r\ndocument.addEventListener('focusout', userEvent);\r\ndocument.addEventListener('focusin', userEvent);\r\ndocument.addEventListener('change', userEvent);\r\ndocument.addEventListener('keydown', userEvent);\r\ndocument.addEventListener('keyup', userEvent);\r\ndocument.addEventListener('input', userEvent);\r\ndocument.addEventListener('mousedown', userEvent);\r\ndocument.addEventListener('mouseup', userEvent);\r\ndocument.addEventListener('mouseover', userEvent);\r\ndocument.addEventListener('mouseout', userEvent);\r\ndocument.addEventListener(\"touchstart\", userEvent);\r\ndocument.addEventListener(\"touchend\", userEvent);\r\n\r\n\r\ndocument.addEventListener('scroll', documentEvent);\r\ndocument.addEventListener('mousemove', documentEvent);\r\n\r\ndocument.addEventListener('mouseup', documentEvent);\r\ndocument.addEventListener('mousedown', documentEvent);\r\n\r\ndocument.addEventListener(\"touchmove\", documentEvent);\r\ndocument.addEventListener(\"touchend\", documentEvent);\r\ndocument.addEventListener(\"touchcancel\", documentEvent);\r\n\r\n\r\nwindow.addEventListener('resize', windowEvent);\r\n\r\nfunction unsubscribe(id) {\r\n   var item = subscriptionsById[id];\r\n   if (item == null) {\r\n      return;\r\n   }\r\n\r\n   delete subscriptions[item.event][item.id];\r\n}\r\n\r\nfunction userEvent(e) {\r\n\r\n   var id = getId(e);\r\n   if (id == null) {\r\n      documentEvent(e);\r\n      return;\r\n   }\r\n\r\n   const view = _view.get(id);\r\n   const model = _model.get(view.modelKey);\r\n\r\n   _view.onUserEvent(e, view, model);\r\n\r\n   // render all sibling views for the model\r\n   _binding\r\n      .ViewIdsByModelKey(model.key)\r\n      .filter(id => userEvent.id !== id)\r\n      .forEach(id => _view.render(_view.get(id), model));\r\n}\r\n\r\nfunction documentEvent(e) {\r\n   _view\r\n      .all()\r\n      .filter(item => item.hasDocumentEvent)\r\n      .forEach(view => {\r\n         const model = _model.get(view.modelKey);\r\n         _view.onDocumentEvent(e, view, model);\r\n      });\r\n}\r\n\r\nfunction windowEvent(e) {\r\n   _view\r\n      .all()\r\n      .filter(item => item.hasWindowEvent)\r\n      .forEach(view => {\r\n         const model = _model.get(view.modelKey);\r\n         _view.onWindowEvent(e, view, model);\r\n      });\r\n}\r\n\r\nfunction getId(e) {\r\n   var el = e.srcElement || e.target;\r\n   while (el != null && (el.id == null || el.id.indexOf('H') < 0)) {\r\n      el = el.parentElement;\r\n   }\r\n   if (el == null) {\r\n      return null;\r\n   }\r\n   return el.id;\r\n}\r\n\r\nfunction notify(event, data) {\r\n   if (subscriptions[event] == null) {\r\n      return;\r\n   }\r\n   for (var id in subscriptions[event]) {\r\n      subscriptions[event][id](data);\r\n   };\r\n}\r\n\r\nfunction subscribe(event, callback) {\r\n   if (subscriptions[event] == null) {\r\n      subscriptions[event] = {};\r\n   }\r\n   subscriptions[event][id] = callback;\r\n   subscriptionsById[id] = {\r\n      event: event,\r\n      id: id\r\n   };\r\n\r\n   return id++;\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/sema-js-core/src/event.js?");

/***/ }),

/***/ "./node_modules/sema-js-core/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/sema-js-core/src/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const _model = __webpack_require__(/*! ./model */ \"./node_modules/sema-js-core/src/model.js\");\r\nconst _view = __webpack_require__(/*! ./view */ \"./node_modules/sema-js-core/src/view.js\");\r\nconst _binding = __webpack_require__(/*! ./binding */ \"./node_modules/sema-js-core/src/binding.js\");\r\nconst _event = __webpack_require__(/*! ./event */ \"./node_modules/sema-js-core/src/event.js\");\r\n\r\n\r\nmodule.exports = {\r\n   init,\r\n   onLoad,\r\n   events: {\r\n      notify : _event.notify,\r\n      subscribe:  _event.subscribe,\r\n      unsubscribe :  _event.unsubscribe\r\n   }\r\n}\r\n\r\nlet _viewId = 1;\r\n\r\nfunction init(components) {\r\n   _view.init(components);\r\n}\r\n\r\nfunction onLoad(data) {\r\n   _model.load(data.models);\r\n\r\n   data.views\r\n      .forEach(view => {\r\n         view.id = 'H' + (_viewId++).toString(16);\r\n         const model = _model.get(view.modelKey);\r\n         _view.insert(view, model);\r\n         _binding.bind(model.key, view.id);\r\n      });\r\n}\n\n//# sourceURL=webpack:///./node_modules/sema-js-core/src/index.js?");

/***/ }),

/***/ "./node_modules/sema-js-core/src/model.js":
/*!************************************************!*\
  !*** ./node_modules/sema-js-core/src/model.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n   load,\r\n   get,\r\n   all,\r\n   update,\r\n   insert,\r\n   remove,\r\n   clear\r\n};\r\n\r\nconst _models = {};\r\n\r\nfunction all() {\r\n   return Object\r\n      .values(_models);\r\n}\r\n\r\nfunction load(models) {\r\n   if (models == null) {\r\n      return;\r\n   }\r\n   models.forEach(function (item) {\r\n      if (_models[item.key] == null) {\r\n         _models[item.key] = {\r\n            key: item.key\r\n         };\r\n      }\r\n      _models[item.key].value = item.value;\r\n      _models[item.key].dbValue = item.value;\r\n   });\r\n}\r\n\r\nfunction get(key) {\r\n   if (_models[key] == null) {\r\n      console.log('model not found:', key);\r\n      return null;\r\n   }\r\n\r\n   return _models[key];\r\n}\r\n\r\nfunction update(data) {\r\n   var model = _models[data.key];\r\n\r\n   for (var key in data.data) {\r\n      model.isDirty = model.isDirty || (model.dbValue[key] !== data.data[key]);\r\n      model.value[key] = data.data[key];\r\n   }\r\n}\r\n\r\nfunction remove(key) {\r\n   _models[key].removed = true;\r\n}\r\n\r\nfunction insert(model) {\r\n   _models[model.key] = model;\r\n}\r\n\r\nfunction clear() {\r\n   for (let key in _models) {\r\n         delete _models[key];\r\n   }\r\n}\n\n//# sourceURL=webpack:///./node_modules/sema-js-core/src/model.js?");

/***/ }),

/***/ "./node_modules/sema-js-core/src/view.js":
/*!***********************************************!*\
  !*** ./node_modules/sema-js-core/src/view.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n   init,\r\n   add,\r\n   remove,\r\n   insert,\r\n   get,\r\n   getByModelKey: getModelViews,\r\n   all,\r\n   render,\r\n   onUserEvent,\r\n   onDocumentEvent,\r\n   onWindowEvent,\r\n   clear\r\n};\r\n\r\nlet _views = {};\r\nlet components = {\r\n   get: function(){\r\n      throw error(\"Components factory is missing\");\r\n   }\r\n}\r\n\r\nfunction init(componentsFactory) {\r\n   components = componentsFactory;\r\n}\r\n\r\nfunction onUserEvent(e, view, model) {\r\n   const component = components.get(view.component);\r\n   if (!component.onUserEvent) {\r\n      return;\r\n   }\r\n   component.onUserEvent(e, view, model);\r\n}\r\n\r\nfunction onWindowEvent(e, view, model) {\r\n   const component = components.get(view.component);\r\n   component.onWindowEvent( e,view, model);\r\n}\r\n\r\nfunction onDocumentEvent(e, view, model) {\r\n   const component = components.get(view.component);\r\n   component.onDocumentEvent(e, view, model);\r\n}\r\n\r\nfunction all() {\r\n   return Object.values(_views);\r\n}\r\n\r\nfunction clear() {\r\n   for (let key in _views) {\r\n      if (types.indexOf(_views[key].component) >= 0) {\r\n         delete _views[key];\r\n      }\r\n   }\r\n}\r\n\r\n\r\nfunction render(view, model) {\r\n   const component = components.get(view.component);\r\n   if (!component.render) {\r\n      return;\r\n   }\r\n   component.render(view, model);\r\n}\r\n\r\nfunction add(view) {\r\n   _views[view.id] = view;\r\n}\r\n\r\nfunction remove(view) {\r\n   _removed[view.id] = view;\r\n\r\n   delete _views[view.id];\r\n}\r\n\r\nfunction insert(view, model) {\r\n   const component = components.get(view.component);\r\n   if (component == null) {\r\n      return;\r\n   }\r\n\r\n   const html = component.create(view, model);\r\n   const container = document.getElementById(view.containerId);\r\n   container.innerHTML += html;\r\n   container.lastElementChild.id = view.id;\r\n   container.lastElementChild.classList.add(view.component);\r\n\r\n   component.init(view, model);\r\n\r\n   view.hasWindowEvent = component.onWindowEvent != null;\r\n   view.hasDocumentEvent = component.onDocumentEvent != null;\r\n\r\n   add(view);\r\n}\r\n\r\nfunction get(id) {\r\n   return _views[id];\r\n}\r\n\r\n\r\nfunction getModelViews(key) {\r\n   return Object\r\n      .values(_views)\r\n      .filter(i => i.modelKey === key);\r\n}\n\n//# sourceURL=webpack:///./node_modules/sema-js-core/src/view.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var app = __webpack_require__(/*! sema-js-core */ \"./node_modules/sema-js-core/src/index.js\");\r\nvar components = __webpack_require__(/*! ./components/components.generated */ \"./src/components/components.generated.js\");\r\napp.init(components);\r\n\r\nvar data = {\r\n   views: [\r\n      view(\"TextInput\"),\r\n      view(\"H1\"),\r\n      view(\"H2\"),\r\n      view(\"H3\"),\r\n      view(\"H4\"),\r\n      view(\"H5\"),\r\n      view(\"H6\"),\r\n      view(\"H7\"),\r\n      view(\"Paragraph\")\r\n   ],\r\n   models: [\r\n      model(\"textMdl\", \"Text Binding Example\")\r\n   ]\r\n}\r\n\r\napp.onLoad(data);\r\n\r\nfunction view(component) {\r\n   return {\r\n      \"modelKey\": \"textMdl\",\r\n      \"containerId\": \"content\",\r\n      \"component\": component\r\n   }\r\n}\r\n\r\nfunction model(key, value) {\r\n   return {\r\n      \"key\": key,\r\n      \"value\": value\r\n   }\r\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/components/Text/H1/H1.js":
/*!**************************************!*\
  !*** ./src/components/Text/H1/H1.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var template = __webpack_require__(/*! ./template.generated */ \"./src/components/Text/H1/template.generated.js\");\r\nmodule.exports = __webpack_require__(/*! ../text */ \"./src/components/Text/text.js\")(template);\n\n//# sourceURL=webpack:///./src/components/Text/H1/H1.js?");

/***/ }),

/***/ "./src/components/Text/H1/template.generated.js":
/*!******************************************************!*\
  !*** ./src/components/Text/H1/template.generated.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// auto generated by build/views.js\n\nmodule.exports = {\n   create\n};\n\nfunction create(view, model, data) {\n   return `<h1>${model.value}</h1>`;\n}\n\n//# sourceURL=webpack:///./src/components/Text/H1/template.generated.js?");

/***/ }),

/***/ "./src/components/Text/H2/H2.js":
/*!**************************************!*\
  !*** ./src/components/Text/H2/H2.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var template = __webpack_require__(/*! ./template.generated */ \"./src/components/Text/H2/template.generated.js\");\r\nmodule.exports = __webpack_require__(/*! ../text */ \"./src/components/Text/text.js\")(template);\n\n//# sourceURL=webpack:///./src/components/Text/H2/H2.js?");

/***/ }),

/***/ "./src/components/Text/H2/template.generated.js":
/*!******************************************************!*\
  !*** ./src/components/Text/H2/template.generated.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// auto generated by build/views.js\n\nmodule.exports = {\n   create\n};\n\nfunction create(view, model, data) {\n   return `<h2>${model.value}</h2>`;\n}\n\n//# sourceURL=webpack:///./src/components/Text/H2/template.generated.js?");

/***/ }),

/***/ "./src/components/Text/H3/H3.js":
/*!**************************************!*\
  !*** ./src/components/Text/H3/H3.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var template = __webpack_require__(/*! ./template.generated */ \"./src/components/Text/H3/template.generated.js\");\r\nmodule.exports = __webpack_require__(/*! ../text */ \"./src/components/Text/text.js\")(template);\n\n//# sourceURL=webpack:///./src/components/Text/H3/H3.js?");

/***/ }),

/***/ "./src/components/Text/H3/template.generated.js":
/*!******************************************************!*\
  !*** ./src/components/Text/H3/template.generated.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// auto generated by build/views.js\n\nmodule.exports = {\n   create\n};\n\nfunction create(view, model, data) {\n   return `<h3>${model.value}</h3>`;\n}\n\n//# sourceURL=webpack:///./src/components/Text/H3/template.generated.js?");

/***/ }),

/***/ "./src/components/Text/H4/H4.js":
/*!**************************************!*\
  !*** ./src/components/Text/H4/H4.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var template = __webpack_require__(/*! ./template.generated */ \"./src/components/Text/H4/template.generated.js\");\r\nmodule.exports = __webpack_require__(/*! ../text */ \"./src/components/Text/text.js\")(template);\n\n//# sourceURL=webpack:///./src/components/Text/H4/H4.js?");

/***/ }),

/***/ "./src/components/Text/H4/template.generated.js":
/*!******************************************************!*\
  !*** ./src/components/Text/H4/template.generated.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// auto generated by build/views.js\n\nmodule.exports = {\n   create\n};\n\nfunction create(view, model, data) {\n   return `<h4>${model.value}</h4>`;\n}\n\n//# sourceURL=webpack:///./src/components/Text/H4/template.generated.js?");

/***/ }),

/***/ "./src/components/Text/H5/H5.js":
/*!**************************************!*\
  !*** ./src/components/Text/H5/H5.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var template = __webpack_require__(/*! ./template.generated */ \"./src/components/Text/H5/template.generated.js\");\r\nmodule.exports = __webpack_require__(/*! ../text */ \"./src/components/Text/text.js\")(template);\n\n//# sourceURL=webpack:///./src/components/Text/H5/H5.js?");

/***/ }),

/***/ "./src/components/Text/H5/template.generated.js":
/*!******************************************************!*\
  !*** ./src/components/Text/H5/template.generated.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// auto generated by build/views.js\n\nmodule.exports = {\n   create\n};\n\nfunction create(view, model, data) {\n   return `<h5>${model.value}</h5>`;\n}\n\n//# sourceURL=webpack:///./src/components/Text/H5/template.generated.js?");

/***/ }),

/***/ "./src/components/Text/H6/H6.js":
/*!**************************************!*\
  !*** ./src/components/Text/H6/H6.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var template = __webpack_require__(/*! ./template.generated */ \"./src/components/Text/H6/template.generated.js\");\r\nmodule.exports = __webpack_require__(/*! ../text */ \"./src/components/Text/text.js\")(template);\n\n//# sourceURL=webpack:///./src/components/Text/H6/H6.js?");

/***/ }),

/***/ "./src/components/Text/H6/template.generated.js":
/*!******************************************************!*\
  !*** ./src/components/Text/H6/template.generated.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// auto generated by build/views.js\n\nmodule.exports = {\n   create\n};\n\nfunction create(view, model, data) {\n   return `<h6>${model.value}</h6>`;\n}\n\n//# sourceURL=webpack:///./src/components/Text/H6/template.generated.js?");

/***/ }),

/***/ "./src/components/Text/H7/H7.js":
/*!**************************************!*\
  !*** ./src/components/Text/H7/H7.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var template = __webpack_require__(/*! ./template.generated */ \"./src/components/Text/H7/template.generated.js\");\r\nmodule.exports = __webpack_require__(/*! ../text */ \"./src/components/Text/text.js\")(template);\n\n//# sourceURL=webpack:///./src/components/Text/H7/H7.js?");

/***/ }),

/***/ "./src/components/Text/H7/template.generated.js":
/*!******************************************************!*\
  !*** ./src/components/Text/H7/template.generated.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// auto generated by build/views.js\n\nmodule.exports = {\n   create\n};\n\nfunction create(view, model, data) {\n   return `<h7>${model.value}</h7>`;\n}\n\n//# sourceURL=webpack:///./src/components/Text/H7/template.generated.js?");

/***/ }),

/***/ "./src/components/Text/Paragraph/Paragraph.js":
/*!****************************************************!*\
  !*** ./src/components/Text/Paragraph/Paragraph.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var template = __webpack_require__(/*! ./template.generated */ \"./src/components/Text/Paragraph/template.generated.js\");\r\nmodule.exports = __webpack_require__(/*! ../text */ \"./src/components/Text/text.js\")(template);\n\n//# sourceURL=webpack:///./src/components/Text/Paragraph/Paragraph.js?");

/***/ }),

/***/ "./src/components/Text/Paragraph/template.generated.js":
/*!*************************************************************!*\
  !*** ./src/components/Text/Paragraph/template.generated.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// auto generated by build/views.js\n\nmodule.exports = {\n   create\n};\n\nfunction create(view, model, data) {\n   return `<h7>${model.value}</h7>`;\n}\n\n//# sourceURL=webpack:///./src/components/Text/Paragraph/template.generated.js?");

/***/ }),

/***/ "./src/components/Text/Text.js":
/*!*************************************!*\
  !*** ./src/components/Text/Text.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(template) {\r\n\r\n   function create(view, model) {\r\n    \r\n      return template.create(view, model);\r\n   }\r\n\r\n   function init(view, model) {\r\n\r\n   }\r\n\r\n   function render(view, model) {\r\n      var el = document.getElementById(view.id);\r\n      el.textContent = model.value;\r\n   }\r\n\r\n   return {\r\n      create,\r\n      init,\r\n      render\r\n   };\r\n}\n\n//# sourceURL=webpack:///./src/components/Text/Text.js?");

/***/ }),

/***/ "./src/components/Text/text.js":
/*!*************************************!*\
  !*** ./src/components/Text/text.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(template) {\r\n\r\n   function create(view, model) {\r\n    \r\n      return template.create(view, model);\r\n   }\r\n\r\n   function init(view, model) {\r\n\r\n   }\r\n\r\n   function render(view, model) {\r\n      var el = document.getElementById(view.id);\r\n      el.textContent = model.value;\r\n   }\r\n\r\n   return {\r\n      create,\r\n      init,\r\n      render\r\n   };\r\n}\n\n//# sourceURL=webpack:///./src/components/Text/text.js?");

/***/ }),

/***/ "./src/components/TextInput/TextInput/TextInput.js":
/*!*********************************************************!*\
  !*** ./src/components/TextInput/TextInput/TextInput.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var template = __webpack_require__(/*! ./template.generated */ \"./src/components/TextInput/TextInput/template.generated.js\");\r\nvar api = __webpack_require__(/*! ../../text/text */ \"./src/components/text/text.js\")(template);\r\napi.onUserEvent = onUserEvent;\r\n\r\nmodule.exports = api;\r\n\r\nfunction onUserEvent(e, view, model) {\r\n   switch (e.type) {\r\n         case 'input':\r\n            var el = document.getElementById(view.id);\r\n            model.value = el.value;\r\n            break;\r\n   }\r\n}\n\n//# sourceURL=webpack:///./src/components/TextInput/TextInput/TextInput.js?");

/***/ }),

/***/ "./src/components/TextInput/TextInput/template.generated.js":
/*!******************************************************************!*\
  !*** ./src/components/TextInput/TextInput/template.generated.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// auto generated by build/views.js\n\nmodule.exports = {\n   create\n};\n\nfunction create(view, model, data) {\n   return `<input type=\"text\" value=\"${model.value}\"/>`;\n}\n\n//# sourceURL=webpack:///./src/components/TextInput/TextInput/template.generated.js?");

/***/ }),

/***/ "./src/components/components.generated.js":
/*!************************************************!*\
  !*** ./src/components/components.generated.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// auto generated by build/components.js\n\nmodule.exports = {\n   get: get\n};\n\nconst components = {\n   H1: __webpack_require__(/*! ../components/Text/H1/H1.js */ \"./src/components/Text/H1/H1.js\"),\n\tH2: __webpack_require__(/*! ../components/Text/H2/H2.js */ \"./src/components/Text/H2/H2.js\"),\n\tH3: __webpack_require__(/*! ../components/Text/H3/H3.js */ \"./src/components/Text/H3/H3.js\"),\n\tH4: __webpack_require__(/*! ../components/Text/H4/H4.js */ \"./src/components/Text/H4/H4.js\"),\n\tH5: __webpack_require__(/*! ../components/Text/H5/H5.js */ \"./src/components/Text/H5/H5.js\"),\n\tH6: __webpack_require__(/*! ../components/Text/H6/H6.js */ \"./src/components/Text/H6/H6.js\"),\n\tH7: __webpack_require__(/*! ../components/Text/H7/H7.js */ \"./src/components/Text/H7/H7.js\"),\n\tParagraph: __webpack_require__(/*! ../components/Text/Paragraph/Paragraph.js */ \"./src/components/Text/Paragraph/Paragraph.js\"),\n\tText: __webpack_require__(/*! ../components/Text/Text.js */ \"./src/components/Text/Text.js\"),\n\tTextInput: __webpack_require__(/*! ../components/TextInput/TextInput/TextInput.js */ \"./src/components/TextInput/TextInput/TextInput.js\")\n};\n\nfunction get(type) {\n   if (components[type] == null) {\n      console.log('component not found for ', type);\n   }\n\n   return components[type];\n}\n\n//# sourceURL=webpack:///./src/components/components.generated.js?");

/***/ }),

/***/ "./src/components/text/text.js":
/*!*************************************!*\
  !*** ./src/components/text/text.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(template) {\r\n\r\n   function create(view, model) {\r\n    \r\n      return template.create(view, model);\r\n   }\r\n\r\n   function init(view, model) {\r\n\r\n   }\r\n\r\n   function render(view, model) {\r\n      var el = document.getElementById(view.id);\r\n      el.textContent = model.value;\r\n   }\r\n\r\n   return {\r\n      create,\r\n      init,\r\n      render\r\n   };\r\n}\n\n//# sourceURL=webpack:///./src/components/text/text.js?");

/***/ })

/******/ });