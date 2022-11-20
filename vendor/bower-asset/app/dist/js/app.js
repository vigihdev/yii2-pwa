// @ts-nocheck
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ClipboardJS"] = factory();
	else
		root["ClipboardJS"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 686:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ clipboard; }
});

// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
var tiny_emitter = __webpack_require__(279);
var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter);
// EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js
var listen = __webpack_require__(370);
var listen_default = /*#__PURE__*/__webpack_require__.n(listen);
// EXTERNAL MODULE: ./node_modules/select/src/select.js
var src_select = __webpack_require__(817);
var select_default = /*#__PURE__*/__webpack_require__.n(src_select);
;// CONCATENATED MODULE: ./src/common/command.js
/**
 * Executes a given operation type.
 * @param {String} type
 * @return {Boolean}
 */
function command(type) {
  try {
    return document.execCommand(type);
  } catch (err) {
    return false;
  }
}
;// CONCATENATED MODULE: ./src/actions/cut.js


/**
 * Cut action wrapper.
 * @param {String|HTMLElement} target
 * @return {String}
 */

var ClipboardActionCut = function ClipboardActionCut(target) {
  var selectedText = select_default()(target);
  command('cut');
  return selectedText;
};

/* harmony default export */ var actions_cut = (ClipboardActionCut);
;// CONCATENATED MODULE: ./src/common/create-fake-element.js
/**
 * Creates a fake textarea element with a value.
 * @param {String} value
 * @return {HTMLElement}
 */
function createFakeElement(value) {
  var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  var fakeElement = document.createElement('textarea'); // Prevent zooming on iOS

  fakeElement.style.fontSize = '12pt'; // Reset box model

  fakeElement.style.border = '0';
  fakeElement.style.padding = '0';
  fakeElement.style.margin = '0'; // Move element out of screen horizontally

  fakeElement.style.position = 'absolute';
  fakeElement.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

  var yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElement.style.top = "".concat(yPosition, "px");
  fakeElement.setAttribute('readonly', '');
  fakeElement.value = value;
  return fakeElement;
}
;// CONCATENATED MODULE: ./src/actions/copy.js



/**
 * Create fake copy action wrapper using a fake element.
 * @param {String} target
 * @param {Object} options
 * @return {String}
 */

var fakeCopyAction = function fakeCopyAction(value, options) {
  var fakeElement = createFakeElement(value);
  options.container.appendChild(fakeElement);
  var selectedText = select_default()(fakeElement);
  command('copy');
  fakeElement.remove();
  return selectedText;
};
/**
 * Copy action wrapper.
 * @param {String|HTMLElement} target
 * @param {Object} options
 * @return {String}
 */


var ClipboardActionCopy = function ClipboardActionCopy(target) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    container: document.body
  };
  var selectedText = '';

  if (typeof target === 'string') {
    selectedText = fakeCopyAction(target, options);
  } else if (target instanceof HTMLInputElement && !['text', 'search', 'url', 'tel', 'password'].includes(target === null || target === void 0 ? void 0 : target.type)) {
    // If input type doesn't support `setSelectionRange`. Simulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    selectedText = fakeCopyAction(target.value, options);
  } else {
    selectedText = select_default()(target);
    command('copy');
  }

  return selectedText;
};

/* harmony default export */ var actions_copy = (ClipboardActionCopy);
;// CONCATENATED MODULE: ./src/actions/default.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



/**
 * Inner function which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 * @param {Object} options
 */

var ClipboardActionDefault = function ClipboardActionDefault() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // Defines base properties passed from constructor.
  var _options$action = options.action,
      action = _options$action === void 0 ? 'copy' : _options$action,
      container = options.container,
      target = options.target,
      text = options.text; // Sets the `action` to be performed which can be either 'copy' or 'cut'.

  if (action !== 'copy' && action !== 'cut') {
    throw new Error('Invalid "action" value, use either "copy" or "cut"');
  } // Sets the `target` property using an element that will be have its content copied.


  if (target !== undefined) {
    if (target && _typeof(target) === 'object' && target.nodeType === 1) {
      if (action === 'copy' && target.hasAttribute('disabled')) {
        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
      }

      if (action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
      }
    } else {
      throw new Error('Invalid "target" value, use a valid Element');
    }
  } // Define selection strategy based on `text` property.


  if (text) {
    return actions_copy(text, {
      container: container
    });
  } // Defines which selection strategy based on `target` property.


  if (target) {
    return action === 'cut' ? actions_cut(target) : actions_copy(target, {
      container: container
    });
  }
};

/* harmony default export */ var actions_default = (ClipboardActionDefault);
;// CONCATENATED MODULE: ./src/clipboard.js
function clipboard_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { clipboard_typeof = function _typeof(obj) { return typeof obj; }; } else { clipboard_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return clipboard_typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */

function getAttributeValue(suffix, element) {
  var attribute = "data-clipboard-".concat(suffix);

  if (!element.hasAttribute(attribute)) {
    return;
  }

  return element.getAttribute(attribute);
}
/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */


var Clipboard = /*#__PURE__*/function (_Emitter) {
  _inherits(Clipboard, _Emitter);

  var _super = _createSuper(Clipboard);

  /**
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   * @param {Object} options
   */
  function Clipboard(trigger, options) {
    var _this;

    _classCallCheck(this, Clipboard);

    _this = _super.call(this);

    _this.resolveOptions(options);

    _this.listenClick(trigger);

    return _this;
  }
  /**
   * Defines if attributes would be resolved using internal setter functions
   * or custom functions that were passed in the constructor.
   * @param {Object} options
   */


  _createClass(Clipboard, [{
    key: "resolveOptions",
    value: function resolveOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
      this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
      this.text = typeof options.text === 'function' ? options.text : this.defaultText;
      this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
    }
    /**
     * Adds a click event listener to the passed trigger.
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     */

  }, {
    key: "listenClick",
    value: function listenClick(trigger) {
      var _this2 = this;

      this.listener = listen_default()(trigger, 'click', function (e) {
        return _this2.onClick(e);
      });
    }
    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */

  }, {
    key: "onClick",
    value: function onClick(e) {
      var trigger = e.delegateTarget || e.currentTarget;
      var action = this.action(trigger) || 'copy';
      var text = actions_default({
        action: action,
        container: this.container,
        target: this.target(trigger),
        text: this.text(trigger)
      }); // Fires an event based on the copy operation result.

      this.emit(text ? 'success' : 'error', {
        action: action,
        text: text,
        trigger: trigger,
        clearSelection: function clearSelection() {
          if (trigger) {
            trigger.focus();
          }

          window.getSelection().removeAllRanges();
        }
      });
    }
    /**
     * Default `action` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultAction",
    value: function defaultAction(trigger) {
      return getAttributeValue('action', trigger);
    }
    /**
     * Default `target` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultTarget",
    value: function defaultTarget(trigger) {
      var selector = getAttributeValue('target', trigger);

      if (selector) {
        return document.querySelector(selector);
      }
    }
    /**
     * Allow fire programmatically a copy action
     * @param {String|HTMLElement} target
     * @param {Object} options
     * @returns Text copied.
     */

  }, {
    key: "defaultText",

    /**
     * Default `text` lookup function.
     * @param {Element} trigger
     */
    value: function defaultText(trigger) {
      return getAttributeValue('text', trigger);
    }
    /**
     * Destroy lifecycle.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.listener.destroy();
    }
  }], [{
    key: "copy",
    value: function copy(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        container: document.body
      };
      return actions_copy(target, options);
    }
    /**
     * Allow fire programmatically a cut action
     * @param {String|HTMLElement} target
     * @returns Text cutted.
     */

  }, {
    key: "cut",
    value: function cut(target) {
      return actions_cut(target);
    }
    /**
     * Returns the support of the given action, or all actions if no action is
     * given.
     * @param {String} [action]
     */

  }, {
    key: "isSupported",
    value: function isSupported() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
      var actions = typeof action === 'string' ? [action] : action;
      var support = !!document.queryCommandSupported;
      actions.forEach(function (action) {
        support = support && !!document.queryCommandSupported(action);
      });
      return support;
    }
  }]);

  return Clipboard;
}((tiny_emitter_default()));

/* harmony default export */ var clipboard = (Clipboard);

/***/ }),

/***/ 828:
/***/ (function(module) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),

/***/ 438:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var closest = __webpack_require__(828);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),

/***/ 879:
/***/ (function(__unused_webpack_module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),

/***/ 370:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var is = __webpack_require__(879);
var delegate = __webpack_require__(438);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),

/***/ 817:
/***/ (function(module) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),

/***/ 279:
/***/ (function(module) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;
module.exports.TinyEmitter = E;


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(686);
/******/ })()
.default;
});
/**
 * easytimer.js
 * Generated: 2018-06-27
 * Version: 2.2.3
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Timer = factory());
}(this, (function () { 'use strict';

  function leftPadding(string, padLength, character) {
    var i = void 0;
    var characters = '';

    if (string.length > padLength) {
      return string;
    }

    for (i = 0; i < padLength; i = i + 1) {
      characters += String(character);
    }

    return (characters + string).slice(-characters.length);
  }

  function TimeCounter() {
    this.secondTenths = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.days = 0;

    /**
     * [toString convert the counted values on a string]
     * @param  {[array]} units           [array with the units to display]
     * @param  {[string]} separator       [separator of the units]
     * @param  {[integer]} leftZeroPadding [number of zero padding]
     * @return {[string]}                 [result string]
     */
    this.toString = function (units, separator, leftZeroPadding) {
      units = units || ['hours', 'minutes', 'seconds'];
      separator = separator || ':';
      leftZeroPadding = leftZeroPadding || 2;

      var stringTime = void 0;
      var arrayTime = [];
      var i = void 0;

      for (i = 0; i < units.length; i = i + 1) {
        if (this[units[i]] !== undefined) {
          if (units[i] === 'secondTenths') {
            arrayTime.push(this[units[i]]);
          } else {
            arrayTime.push(leftPadding(this[units[i]], leftZeroPadding, '0'));
          }
        }
      }
      stringTime = arrayTime.join(separator);

      return stringTime;
    };
  }

  /*
  * Polyfill por IE9, IE10 and IE11
  */
  var CustomEvent$1 = typeof window !== 'undefined' ? window.CustomEvent : undefined;

  if (typeof window !== 'undefined' && typeof CustomEvent$1 !== 'function') {
    CustomEvent$1 = function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    CustomEvent$1.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent$1;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  /*
   * General functions, variables and constants
   */
  var SECOND_TENTHS_PER_SECOND = 10;
  var SECONDS_PER_MINUTE = 60;
  var MINUTES_PER_HOUR = 60;
  var HOURS_PER_DAY = 24;

  var SECOND_TENTHS_POSITION = 0;
  var SECONDS_POSITION = 1;
  var MINUTES_POSITION = 2;
  var HOURS_POSITION = 3;
  var DAYS_POSITION = 4;

  var SECOND_TENTHS = 'secondTenths';
  var SECONDS = 'seconds';
  var MINUTES = 'minutes';
  var HOURS = 'hours';
  var DAYS = 'days';

  var unitsInMilliseconds = {
    secondTenths: 100,
    seconds: 1000,
    minutes: 60000,
    hours: 3600000,
    days: 86400000
  };

  var groupedUnits = {
    secondTenths: SECOND_TENTHS_PER_SECOND,
    seconds: SECONDS_PER_MINUTE,
    minutes: MINUTES_PER_HOUR,
    hours: HOURS_PER_DAY
  };

  var events = typeof module !== 'undefined' && module.exports && typeof require === 'function' ? require('events') : undefined;

  function hasDOM() {
    return typeof document !== 'undefined';
  }

  function hasEventEmitter() {
    return events;
  }

  function mod(number, module) {
    return (number % module + module) % module;
  }

  /**
   * [Timer Timer/Chronometer/Countdown compatible with AMD and NodeJS.
   * Can update time values with different time intervals: tenth of seconds,
   * seconds, minutes and hours.]
   */
  function Timer() {
    /*
    * PRIVATE variables and Functions
    */
    var counters = new TimeCounter();
    var totalCounters = new TimeCounter();

    var intervalId = void 0;
    var eventEmitter = hasDOM() ? document.createElement('span') : hasEventEmitter() ? new events.EventEmitter() : undefined;
    var running = false;
    var paused = false;
    var precision = void 0;
    var timerTypeFactor = void 0;
    var customCallback = void 0;
    var timerConfig = {};
    var currentParams = void 0;
    var targetValues = void 0;
    var startValues = void 0;
    var countdown = void 0;
    var startingDate = void 0;
    var targetDate = void 0;
    var eventData = {
      detail: {
        timer: this
      }
    };

    function updateCounters(precision, roundedValue) {
      totalCounters[precision] = roundedValue;

      if (precision === DAYS) {
        counters[precision] = roundedValue;
      } else if (roundedValue >= 0) {
        counters[precision] = mod(roundedValue, groupedUnits[precision]);
      } else {
        counters[precision] = groupedUnits[precision] - mod(roundedValue, groupedUnits[precision]);
      }
    }

    function updateDays(value) {
      return updateUnitByPrecision(value, DAYS);
    }

    function updateHours(value) {
      return updateUnitByPrecision(value, HOURS);
    }

    function updateMinutes(value) {
      return updateUnitByPrecision(value, MINUTES);
    }

    function updateSeconds(value) {
      return updateUnitByPrecision(value, SECONDS);
    }

    function updateSecondTenths(value) {
      return updateUnitByPrecision(value, SECOND_TENTHS);
    }

    function updateUnitByPrecision(value, precision) {
      var previousValue = totalCounters[precision];
      updateCounters(precision, calculateIntegerUnitQuotient(value, unitsInMilliseconds[precision]));

      return totalCounters[precision] !== previousValue;
    }

    function stopTimerAndResetCounters() {
      stopTimer();
      resetCounters();
    }

    function stopTimer() {
      clearInterval(intervalId);
      intervalId = undefined;
      running = false;
      paused = false;
    }

    function setParamsAndStartTimer(params) {
      if (!isPaused()) {
        setParams(params);
      } else {
        startingDate = calculateStartingDate();
        targetValues = setTarget(currentParams.target);
      }

      startTimer();
    }

    function startTimer() {
      var interval = unitsInMilliseconds[precision];

      if (isTargetAchieved(roundTimestamp(Date.now()))) {
        return;
      }

      intervalId = setInterval(updateTimerAndDispatchEvents, interval);

      running = true;
      paused = false;
    }

    function calculateStartingDate() {
      return roundTimestamp(Date.now()) - totalCounters.secondTenths * unitsInMilliseconds[SECOND_TENTHS] * timerTypeFactor;
    }

    function updateTimerAndDispatchEvents() {
      var currentTime = roundTimestamp(Date.now());
      var valuesUpdated = updateTimer();

      dispatchEvents(valuesUpdated);

      customCallback(eventData.detail.timer);
      if (isTargetAchieved(currentTime)) {
        stop();
        dispatchEvent('targetAchieved', eventData);
      }
    }

    function updateTimer() {
      var currentTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : roundTimestamp(Date.now());

      var ellapsedTime = timerTypeFactor > 0 ? currentTime - startingDate : startingDate - currentTime;
      var valuesUpdated = {};

      valuesUpdated[SECOND_TENTHS] = updateSecondTenths(ellapsedTime);
      valuesUpdated[SECONDS] = updateSeconds(ellapsedTime);
      valuesUpdated[MINUTES] = updateMinutes(ellapsedTime);
      valuesUpdated[HOURS] = updateHours(ellapsedTime);
      valuesUpdated[DAYS] = updateDays(ellapsedTime);

      return valuesUpdated;
    }

    function roundTimestamp(timestamp) {
      return Math.floor(timestamp / unitsInMilliseconds[precision]) * unitsInMilliseconds[precision];
    }

    function dispatchEvents(valuesUpdated) {
      if (valuesUpdated[SECOND_TENTHS]) {
        dispatchEvent('secondTenthsUpdated', eventData);
      }
      if (valuesUpdated[SECONDS]) {
        dispatchEvent('secondsUpdated', eventData);
      }
      if (valuesUpdated[MINUTES]) {
        dispatchEvent('minutesUpdated', eventData);
      }
      if (valuesUpdated[HOURS]) {
        dispatchEvent('hoursUpdated', eventData);
      }
      if (valuesUpdated[DAYS]) {
        dispatchEvent('daysUpdated', eventData);
      }
    }

    function isTargetAchieved(currentDate) {
      return targetValues instanceof Array && currentDate >= targetDate;
    }

    function resetCounters() {
      for (var counter in counters) {
        if (counters.hasOwnProperty(counter) && typeof counters[counter] === 'number') {
          counters[counter] = 0;
        }
      }

      for (var _counter in totalCounters) {
        if (totalCounters.hasOwnProperty(_counter) && typeof totalCounters[_counter] === 'number') {
          totalCounters[_counter] = 0;
        }
      }
    }

    function setParams(params) {
      params = params || {};

      precision = typeof params.precision === 'string' ? params.precision : SECONDS;

      customCallback = typeof params.callback === 'function' ? params.callback : function () {};

      countdown = params.countdown === true;

      timerTypeFactor = countdown === true ? -1 : 1;

      if (_typeof(params.startValues) === 'object') {
        setStartValues(params.startValues);
      } else {
        startValues = null;
      }

      startingDate = calculateStartingDate();

      updateTimer();

      if (_typeof(params.target) === 'object') {
        targetValues = setTarget(params.target);
      } else if (countdown) {
        params.target = { seconds: 0 };
        targetValues = setTarget(params.target);
      } else {
        targetValues = null;
      }

      timerConfig = {
        precision: precision,
        callback: customCallback,
        countdown: (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && params.countdown === true,
        target: targetValues,
        startValues: startValues
      };

      currentParams = params;
    }

    function configInputValues(inputValues) {
      var secondTenths = void 0,
          seconds = void 0,
          minutes = void 0,
          hours = void 0,
          days = void 0,
          values = void 0;
      if ((typeof inputValues === 'undefined' ? 'undefined' : _typeof(inputValues)) === 'object') {
        if (inputValues instanceof Array) {
          if (inputValues.length !== 5) {
            throw new Error('Array size not valid');
          }
          values = inputValues;
        } else {
          values = [inputValues.secondTenths || 0, inputValues.seconds || 0, inputValues.minutes || 0, inputValues.hours || 0, inputValues.days || 0];
        }
      }

      secondTenths = values[SECOND_TENTHS_POSITION];
      seconds = values[SECONDS_POSITION] + calculateIntegerUnitQuotient(secondTenths, SECOND_TENTHS_PER_SECOND);
      minutes = values[MINUTES_POSITION] + calculateIntegerUnitQuotient(seconds, SECONDS_PER_MINUTE);
      hours = values[HOURS_POSITION] + calculateIntegerUnitQuotient(minutes, MINUTES_PER_HOUR);
      days = values[DAYS_POSITION] + calculateIntegerUnitQuotient(hours, HOURS_PER_DAY);

      values[SECOND_TENTHS_POSITION] = secondTenths % SECOND_TENTHS_PER_SECOND;
      values[SECONDS_POSITION] = seconds % SECONDS_PER_MINUTE;
      values[MINUTES_POSITION] = minutes % MINUTES_PER_HOUR;
      values[HOURS_POSITION] = hours % HOURS_PER_DAY;
      values[DAYS_POSITION] = days;

      return values;
    }

    function calculateIntegerUnitQuotient(unit, divisor) {
      var quotient = unit / divisor;

      return quotient < 0 ? Math.ceil(quotient) : Math.floor(quotient);
    }

    function setTarget(inputTarget) {
      if (!inputTarget) {
        return;
      }

      targetValues = configInputValues(inputTarget);
      var targetCounter = calculateTotalCounterFromValues(targetValues);
      targetDate = startingDate + targetCounter.secondTenths * unitsInMilliseconds[SECOND_TENTHS] * timerTypeFactor;

      return targetValues;
    }

    function setStartValues(inputStartValues) {
      startValues = configInputValues(inputStartValues);
      counters.secondTenths = startValues[SECOND_TENTHS_POSITION];
      counters.seconds = startValues[SECONDS_POSITION];
      counters.minutes = startValues[MINUTES_POSITION];
      counters.hours = startValues[HOURS_POSITION];
      counters.days = startValues[DAYS_POSITION];

      totalCounters = calculateTotalCounterFromValues(startValues, totalCounters);
    }

    function calculateTotalCounterFromValues(values, outputCounter) {
      var total = outputCounter || {};

      total.days = values[DAYS_POSITION];
      total.hours = total.days * HOURS_PER_DAY + values[HOURS_POSITION];
      total.minutes = total.hours * MINUTES_PER_HOUR + values[MINUTES_POSITION];
      total.seconds = total.minutes * SECONDS_PER_MINUTE + values[SECONDS_POSITION];
      total.secondTenths = total.seconds * SECOND_TENTHS_PER_SECOND + values[[SECOND_TENTHS_POSITION]];

      return total;
    }

    /*
     * PUBLIC functions
     */

    /**
     * [stop stops the timer and resets the counters. Dispatch stopped event]
     */
    function stop() {
      stopTimerAndResetCounters();
      dispatchEvent('stopped', eventData);
    }

    /**
     * [stop stops and starts the timer. Dispatch stopped event]
     */
    function reset() {
      stopTimerAndResetCounters();
      setParamsAndStartTimer(currentParams);
      dispatchEvent('reset', eventData);
    }

    /**
     * [start starts the timer configured by the params object. Dispatch started event]
     * @param  {[object]} params [Configuration parameters]
     */
    function start(params) {
      if (isRunning()) {
        return;
      }

      setParamsAndStartTimer(params);
      dispatchEvent('started', eventData);
    }

    /**
     * [pause stops the timer without resetting the counters. The timer it can be restarted with start function.
     * Dispatch paused event]
     * @return {[type]} [description]
     */
    function pause() {
      stopTimer();
      paused = true;
      dispatchEvent('paused', eventData);
    }

    /**
     * [addEventListener Adds event listener to the timer]
     * @param {[string]} event      [event to listen]
     * @param {[function]} listener   [the event listener function]
     */
    function addEventListener(event, listener) {
      if (hasDOM()) {
        eventEmitter.addEventListener(event, listener);
      } else if (hasEventEmitter()) {
        eventEmitter.on(event, listener);
      }
    }

    /**
     * [removeEventListener Removes event listener to the timer]
     * @param  {[string]} event    [event to remove listener]
     * @param  {[function]} listener [listener to remove]
     */
    function removeEventListener(event, listener) {
      if (hasDOM()) {
        eventEmitter.removeEventListener(event, listener);
      } else if (hasEventEmitter()) {
        eventEmitter.removeListener(event, listener);
      }
    }

    /**
     * [dispatchEvent dispatchs an event]
     * @param  {string} event [event to dispatch]
     */
    function dispatchEvent(event, data) {
      if (hasDOM()) {
        eventEmitter.dispatchEvent(new CustomEvent(event, data));
      } else if (hasEventEmitter()) {
        eventEmitter.emit(event, data);
      }
    }

    /**
     * [isRunning return true if the timer is running]
     * @return {Boolean}
     */
    function isRunning() {
      return running;
    }

    /**
     * [isPaused returns true if the timer is paused]
     * @return {Boolean}
     */
    function isPaused() {
      return paused;
    }

    /**
     * [getTimeValues returns the counter with the current timer values]
     * @return {[TimeCounter]}
     */
    function getTimeValues() {
      return counters;
    }
    /**
     * [getTotalTimeValues returns the counter with the current timer total values]
     * @return {[TimeCounter]}
     */
    function getTotalTimeValues() {
      return totalCounters;
    }
    /**
     * [getConfig returns the configuration paramameters]
     * @return {[type]}
     */
    function getConfig() {
      return timerConfig;
    }
    /**
     * Public API
     * Definition of Timer instance public functions
     */
    if (typeof this !== 'undefined') {
      this.start = start;

      this.pause = pause;

      this.stop = stop;

      this.reset = reset;

      this.isRunning = isRunning;

      this.isPaused = isPaused;

      this.getTimeValues = getTimeValues;

      this.getTotalTimeValues = getTotalTimeValues;

      this.getConfig = getConfig;

      this.addEventListener = addEventListener;

      this.removeEventListener = removeEventListener;
    }
  }

  return Timer;

})));

// @ts-nocheck
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
}(this, function() {
    "use strict";
    var e, t;

    function n() {
        return e.apply(null, arguments)
    }

    function s(e) {
        return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
    }

    function i(e) {
        return null != e && "[object Object]" === Object.prototype.toString.call(e)
    }

    function r(e) {
        return void 0 === e
    }

    function a(e) {
        return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
    }

    function o(e) {
        return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    }

    function u(e, t) {
        var n, s = [];
        for (n = 0; n < e.length; ++n) s.push(t(e[n], n));
        return s
    }

    function l(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function d(e, t) {
        for (var n in t) l(t, n) && (e[n] = t[n]);
        return l(t, "toString") && (e.toString = t.toString), l(t, "valueOf") && (e.valueOf = t.valueOf), e
    }

    function h(e, t, n, s) {
        return bt(e, t, n, s, !0).utc()
    }

    function c(e) {
        return null == e._pf && (e._pf = {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1
        }), e._pf
    }

    function f(e) {
        if (null == e._isValid) {
            var n = c(e),
                s = t.call(n.parsedDateParts, function(e) {
                    return null != e
                }),
                i = !isNaN(e._d.getTime()) && n.overflow < 0 && !n.empty && !n.invalidMonth && !n.invalidWeekday && !n.weekdayMismatch && !n.nullInput && !n.invalidFormat && !n.userInvalidated && (!n.meridiem || n.meridiem && s);
            if (e._strict && (i = i && 0 === n.charsLeftOver && 0 === n.unusedTokens.length && void 0 === n.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return i;
            e._isValid = i
        }
        return e._isValid
    }

    function m(e) {
        var t = h(NaN);
        return null != e ? d(c(t), e) : c(t).userInvalidated = !0, t
    }
    t = Array.prototype.some ? Array.prototype.some : function(e) {
        for (var t = Object(this), n = t.length >>> 0, s = 0; s < n; s++)
            if (s in t && e.call(this, t[s], s, t)) return !0;
        return !1
    };
    var _ = n.momentProperties = [];

    function y(e, t) {
        var n, s, i;
        if (r(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), r(t._i) || (e._i = t._i), r(t._f) || (e._f = t._f), r(t._l) || (e._l = t._l), r(t._strict) || (e._strict = t._strict), r(t._tzm) || (e._tzm = t._tzm), r(t._isUTC) || (e._isUTC = t._isUTC), r(t._offset) || (e._offset = t._offset), r(t._pf) || (e._pf = c(t)), r(t._locale) || (e._locale = t._locale), _.length > 0)
            for (n = 0; n < _.length; n++) r(i = t[s = _[n]]) || (e[s] = i);
        return e
    }
    var g = !1;

    function p(e) {
        y(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === g && (g = !0, n.updateOffset(this), g = !1)
    }

    function v(e) {
        return e instanceof p || null != e && null != e._isAMomentObject
    }

    function w(e) {
        return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
    }

    function M(e) {
        var t = +e,
            n = 0;
        return 0 !== t && isFinite(t) && (n = w(t)), n
    }

    function k(e, t, n) {
        var s, i = Math.min(e.length, t.length),
            r = Math.abs(e.length - t.length),
            a = 0;
        for (s = 0; s < i; s++)(n && e[s] !== t[s] || !n && M(e[s]) !== M(t[s])) && a++;
        return a + r
    }

    function S(e) {
        !1 === n.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
    }

    function D(e, t) {
        var s = !0;
        return d(function() {
            if (null != n.deprecationHandler && n.deprecationHandler(null, e), s) {
                for (var i, r = [], a = 0; a < arguments.length; a++) {
                    if (i = "", "object" == typeof arguments[a]) {
                        for (var o in i += "\n[" + a + "] ", arguments[0]) i += o + ": " + arguments[0][o] + ", ";
                        i = i.slice(0, -2)
                    } else i = arguments[a];
                    r.push(i)
                }
                S(e + "\nArguments: " + Array.prototype.slice.call(r).join("") + "\n" + (new Error).stack), s = !1
            }
            return t.apply(this, arguments)
        }, t)
    }
    var Y, O = {};

    function T(e, t) {
        null != n.deprecationHandler && n.deprecationHandler(e, t), O[e] || (S(t), O[e] = !0)
    }

    function b(e) {
        return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
    }

    function x(e, t) {
        var n, s = d({}, e);
        for (n in t) l(t, n) && (i(e[n]) && i(t[n]) ? (s[n] = {}, d(s[n], e[n]), d(s[n], t[n])) : null != t[n] ? s[n] = t[n] : delete s[n]);
        for (n in e) l(e, n) && !l(t, n) && i(e[n]) && (s[n] = d({}, s[n]));
        return s
    }

    function P(e) {
        null != e && this.set(e)
    }
    n.suppressDeprecationWarnings = !1, n.deprecationHandler = null, Y = Object.keys ? Object.keys : function(e) {
        var t, n = [];
        for (t in e) l(e, t) && n.push(t);
        return n
    };
    var W = {};

    function H(e, t) {
        var n = e.toLowerCase();
        W[n] = W[n + "s"] = W[t] = e
    }

    function L(e) {
        return "string" == typeof e ? W[e] || W[e.toLowerCase()] : void 0
    }

    function C(e) {
        var t, n, s = {};
        for (n in e) l(e, n) && (t = L(n)) && (s[t] = e[n]);
        return s
    }
    var R = {};

    function F(e, t) {
        R[e] = t
    }

    function U(e, t, n) {
        var s = "" + Math.abs(e),
            i = t - s.length;
        return (e >= 0 ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + s
    }
    var N = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        G = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        V = {},
        E = {};

    function A(e, t, n, s) {
        var i = s;
        "string" == typeof s && (i = function() {
            return this[s]()
        }), e && (E[e] = i), t && (E[t[0]] = function() {
            return U(i.apply(this, arguments), t[1], t[2])
        }), n && (E[n] = function() {
            return this.localeData().ordinal(i.apply(this, arguments), e)
        })
    }

    function I(e, t) {
        return e.isValid() ? (t = j(t, e.localeData()), V[t] = V[t] || function(e) {
            var t, n, s, i = e.match(N);
            for (t = 0, n = i.length; t < n; t++) E[i[t]] ? i[t] = E[i[t]] : i[t] = (s = i[t]).match(/\[[\s\S]/) ? s.replace(/^\[|\]$/g, "") : s.replace(/\\/g, "");
            return function(t) {
                var s, r = "";
                for (s = 0; s < n; s++) r += b(i[s]) ? i[s].call(t, e) : i[s];
                return r
            }
        }(t), V[t](e)) : e.localeData().invalidDate()
    }

    function j(e, t) {
        var n = 5;

        function s(e) {
            return t.longDateFormat(e) || e
        }
        for (G.lastIndex = 0; n >= 0 && G.test(e);) e = e.replace(G, s), G.lastIndex = 0, n -= 1;
        return e
    }
    var Z = /\d/,
        z = /\d\d/,
        J = /\d{3}/,
        $ = /\d{4}/,
        q = /[+-]?\d{6}/,
        B = /\d\d?/,
        Q = /\d\d\d\d?/,
        K = /\d\d\d\d\d\d?/,
        X = /\d{1,3}/,
        ee = /\d{1,4}/,
        te = /[+-]?\d{1,6}/,
        ne = /\d+/,
        se = /[+-]?\d+/,
        ie = /Z|[+-]\d\d:?\d\d/gi,
        re = /Z|[+-]\d\d(?::?\d\d)?/gi,
        ae = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        oe = {};

    function ue(e, t, n) {
        oe[e] = b(t) ? t : function(e, s) {
            return e && n ? n : t
        }
    }

    function le(e, t) {
        return l(oe, e) ? oe[e](t._strict, t._locale) : new RegExp(de(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, s, i) {
            return t || n || s || i
        })))
    }

    function de(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    var he = {};

    function ce(e, t) {
        var n, s = t;
        for ("string" == typeof e && (e = [e]), a(t) && (s = function(e, n) {
                n[t] = M(e)
            }), n = 0; n < e.length; n++) he[e[n]] = s
    }

    function fe(e, t) {
        ce(e, function(e, n, s, i) {
            s._w = s._w || {}, t(e, s._w, s, i)
        })
    }

    function me(e, t, n) {
        null != t && l(he, e) && he[e](t, n._a, n, e)
    }
    var _e = 0,
        ye = 1,
        ge = 2,
        pe = 3,
        ve = 4,
        we = 5,
        Me = 6,
        ke = 7,
        Se = 8;

    function De(e) {
        return Ye(e) ? 366 : 365
    }

    function Ye(e) {
        return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
    }
    A("Y", 0, 0, function() {
        var e = this.year();
        return e <= 9999 ? "" + e : "+" + e
    }), A(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }), A(0, ["YYYY", 4], 0, "year"), A(0, ["YYYYY", 5], 0, "year"), A(0, ["YYYYYY", 6, !0], 0, "year"), H("year", "y"), F("year", 1), ue("Y", se), ue("YY", B, z), ue("YYYY", ee, $), ue("YYYYY", te, q), ue("YYYYYY", te, q), ce(["YYYYY", "YYYYYY"], _e), ce("YYYY", function(e, t) {
        t[_e] = 2 === e.length ? n.parseTwoDigitYear(e) : M(e)
    }), ce("YY", function(e, t) {
        t[_e] = n.parseTwoDigitYear(e)
    }), ce("Y", function(e, t) {
        t[_e] = parseInt(e, 10)
    }), n.parseTwoDigitYear = function(e) {
        return M(e) + (M(e) > 68 ? 1900 : 2e3)
    };
    var Oe, Te = be("FullYear", !0);

    function be(e, t) {
        return function(s) {
            return null != s ? (Pe(this, e, s), n.updateOffset(this, t), this) : xe(this, e)
        }
    }

    function xe(e, t) {
        return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
    }

    function Pe(e, t, n) {
        e.isValid() && !isNaN(n) && ("FullYear" === t && Ye(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](n, e.month(), We(n, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n))
    }

    function We(e, t) {
        if (isNaN(e) || isNaN(t)) return NaN;
        var n, s = (t % (n = 12) + n) % n;
        return e += (t - s) / 12, 1 === s ? Ye(e) ? 29 : 28 : 31 - s % 7 % 2
    }
    Oe = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
        var t;
        for (t = 0; t < this.length; ++t)
            if (this[t] === e) return t;
        return -1
    }, A("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }), A("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e)
    }), A("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e)
    }), H("month", "M"), F("month", 8), ue("M", B), ue("MM", B, z), ue("MMM", function(e, t) {
        return t.monthsShortRegex(e)
    }), ue("MMMM", function(e, t) {
        return t.monthsRegex(e)
    }), ce(["M", "MM"], function(e, t) {
        t[ye] = M(e) - 1
    }), ce(["MMM", "MMMM"], function(e, t, n, s) {
        var i = n._locale.monthsParse(e, s, n._strict);
        null != i ? t[ye] = i : c(n).invalidMonth = e
    });
    var He = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        Le = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
    var Ce = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");

    function Re(e, t) {
        var n;
        if (!e.isValid()) return e;
        if ("string" == typeof t)
            if (/^\d+$/.test(t)) t = M(t);
            else if (!a(t = e.localeData().monthsParse(t))) return e;
        return n = Math.min(e.date(), We(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e
    }

    function Fe(e) {
        return null != e ? (Re(this, e), n.updateOffset(this, !0), this) : xe(this, "Month")
    }
    var Ue = ae;
    var Ne = ae;

    function Ge() {
        function e(e, t) {
            return t.length - e.length
        }
        var t, n, s = [],
            i = [],
            r = [];
        for (t = 0; t < 12; t++) n = h([2e3, t]), s.push(this.monthsShort(n, "")), i.push(this.months(n, "")), r.push(this.months(n, "")), r.push(this.monthsShort(n, ""));
        for (s.sort(e), i.sort(e), r.sort(e), t = 0; t < 12; t++) s[t] = de(s[t]), i[t] = de(i[t]);
        for (t = 0; t < 24; t++) r[t] = de(r[t]);
        this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")
    }

    function Ve(e) {
        var t;
        if (e < 100 && e >= 0) {
            var n = Array.prototype.slice.call(arguments);
            n[0] = e + 400, t = new Date(Date.UTC.apply(null, n)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)
        } else t = new Date(Date.UTC.apply(null, arguments));
        return t
    }

    function Ee(e, t, n) {
        var s = 7 + t - n;
        return -((7 + Ve(e, 0, s).getUTCDay() - t) % 7) + s - 1
    }

    function Ae(e, t, n, s, i) {
        var r, a, o = 1 + 7 * (t - 1) + (7 + n - s) % 7 + Ee(e, s, i);
        return o <= 0 ? a = De(r = e - 1) + o : o > De(e) ? (r = e + 1, a = o - De(e)) : (r = e, a = o), {
            year: r,
            dayOfYear: a
        }
    }

    function Ie(e, t, n) {
        var s, i, r = Ee(e.year(), t, n),
            a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
        return a < 1 ? s = a + je(i = e.year() - 1, t, n) : a > je(e.year(), t, n) ? (s = a - je(e.year(), t, n), i = e.year() + 1) : (i = e.year(), s = a), {
            week: s,
            year: i
        }
    }

    function je(e, t, n) {
        var s = Ee(e, t, n),
            i = Ee(e + 1, t, n);
        return (De(e) - s + i) / 7
    }
    A("w", ["ww", 2], "wo", "week"), A("W", ["WW", 2], "Wo", "isoWeek"), H("week", "w"), H("isoWeek", "W"), F("week", 5), F("isoWeek", 5), ue("w", B), ue("ww", B, z), ue("W", B), ue("WW", B, z), fe(["w", "ww", "W", "WW"], function(e, t, n, s) {
        t[s.substr(0, 1)] = M(e)
    });

    function Ze(e, t) {
        return e.slice(t, 7).concat(e.slice(0, t))
    }
    A("d", 0, "do", "day"), A("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e)
    }), A("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e)
    }), A("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e)
    }), A("e", 0, 0, "weekday"), A("E", 0, 0, "isoWeekday"), H("day", "d"), H("weekday", "e"), H("isoWeekday", "E"), F("day", 11), F("weekday", 11), F("isoWeekday", 11), ue("d", B), ue("e", B), ue("E", B), ue("dd", function(e, t) {
        return t.weekdaysMinRegex(e)
    }), ue("ddd", function(e, t) {
        return t.weekdaysShortRegex(e)
    }), ue("dddd", function(e, t) {
        return t.weekdaysRegex(e)
    }), fe(["dd", "ddd", "dddd"], function(e, t, n, s) {
        var i = n._locale.weekdaysParse(e, s, n._strict);
        null != i ? t.d = i : c(n).invalidWeekday = e
    }), fe(["d", "e", "E"], function(e, t, n, s) {
        t[s] = M(e)
    });
    var ze = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
    var Je = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
    var $e = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    var qe = ae;
    var Be = ae;
    var Qe = ae;

    function Ke() {
        function e(e, t) {
            return t.length - e.length
        }
        var t, n, s, i, r, a = [],
            o = [],
            u = [],
            l = [];
        for (t = 0; t < 7; t++) n = h([2e3, 1]).day(t), s = this.weekdaysMin(n, ""), i = this.weekdaysShort(n, ""), r = this.weekdays(n, ""), a.push(s), o.push(i), u.push(r), l.push(s), l.push(i), l.push(r);
        for (a.sort(e), o.sort(e), u.sort(e), l.sort(e), t = 0; t < 7; t++) o[t] = de(o[t]), u[t] = de(u[t]), l[t] = de(l[t]);
        this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")
    }

    function Xe() {
        return this.hours() % 12 || 12
    }

    function et(e, t) {
        A(e, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), t)
        })
    }

    function tt(e, t) {
        return t._meridiemParse
    }
    A("H", ["HH", 2], 0, "hour"), A("h", ["hh", 2], 0, Xe), A("k", ["kk", 2], 0, function() {
        return this.hours() || 24
    }), A("hmm", 0, 0, function() {
        return "" + Xe.apply(this) + U(this.minutes(), 2)
    }), A("hmmss", 0, 0, function() {
        return "" + Xe.apply(this) + U(this.minutes(), 2) + U(this.seconds(), 2)
    }), A("Hmm", 0, 0, function() {
        return "" + this.hours() + U(this.minutes(), 2)
    }), A("Hmmss", 0, 0, function() {
        return "" + this.hours() + U(this.minutes(), 2) + U(this.seconds(), 2)
    }), et("a", !0), et("A", !1), H("hour", "h"), F("hour", 13), ue("a", tt), ue("A", tt), ue("H", B), ue("h", B), ue("k", B), ue("HH", B, z), ue("hh", B, z), ue("kk", B, z), ue("hmm", Q), ue("hmmss", K), ue("Hmm", Q), ue("Hmmss", K), ce(["H", "HH"], pe), ce(["k", "kk"], function(e, t, n) {
        var s = M(e);
        t[pe] = 24 === s ? 0 : s
    }), ce(["a", "A"], function(e, t, n) {
        n._isPm = n._locale.isPM(e), n._meridiem = e
    }), ce(["h", "hh"], function(e, t, n) {
        t[pe] = M(e), c(n).bigHour = !0
    }), ce("hmm", function(e, t, n) {
        var s = e.length - 2;
        t[pe] = M(e.substr(0, s)), t[ve] = M(e.substr(s)), c(n).bigHour = !0
    }), ce("hmmss", function(e, t, n) {
        var s = e.length - 4,
            i = e.length - 2;
        t[pe] = M(e.substr(0, s)), t[ve] = M(e.substr(s, 2)), t[we] = M(e.substr(i)), c(n).bigHour = !0
    }), ce("Hmm", function(e, t, n) {
        var s = e.length - 2;
        t[pe] = M(e.substr(0, s)), t[ve] = M(e.substr(s))
    }), ce("Hmmss", function(e, t, n) {
        var s = e.length - 4,
            i = e.length - 2;
        t[pe] = M(e.substr(0, s)), t[ve] = M(e.substr(s, 2)), t[we] = M(e.substr(i))
    });
    var nt, st = be("Hours", !0),
        it = {
            calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            longDateFormat: {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            invalidDate: "Invalid date",
            ordinal: "%d",
            dayOfMonthOrdinalParse: /\d{1,2}/,
            relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            months: Le,
            monthsShort: Ce,
            week: {
                dow: 0,
                doy: 6
            },
            weekdays: ze,
            weekdaysMin: $e,
            weekdaysShort: Je,
            meridiemParse: /[ap]\.?m?\.?/i
        },
        rt = {},
        at = {};

    function ot(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }

    function ut(e) {
        var t = null;
        if (!rt[e] && "undefined" != typeof module && module && module.exports) try {
            t = nt._abbr, require("./locale/" + e), lt(t)
        } catch (e) {}
        return rt[e]
    }

    function lt(e, t) {
        var n;
        return e && ((n = r(t) ? ht(e) : dt(e, t)) ? nt = n : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), nt._abbr
    }

    function dt(e, t) {
        if (null !== t) {
            var n, s = it;
            if (t.abbr = e, null != rt[e]) T("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), s = rt[e]._config;
            else if (null != t.parentLocale)
                if (null != rt[t.parentLocale]) s = rt[t.parentLocale]._config;
                else {
                    if (null == (n = ut(t.parentLocale))) return at[t.parentLocale] || (at[t.parentLocale] = []), at[t.parentLocale].push({
                        name: e,
                        config: t
                    }), null;
                    s = n._config
                }
            return rt[e] = new P(x(s, t)), at[e] && at[e].forEach(function(e) {
                dt(e.name, e.config)
            }), lt(e), rt[e]
        }
        return delete rt[e], null
    }

    function ht(e) {
        var t;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return nt;
        if (!s(e)) {
            if (t = ut(e)) return t;
            e = [e]
        }
        return function(e) {
            for (var t, n, s, i, r = 0; r < e.length;) {
                for (t = (i = ot(e[r]).split("-")).length, n = (n = ot(e[r + 1])) ? n.split("-") : null; t > 0;) {
                    if (s = ut(i.slice(0, t).join("-"))) return s;
                    if (n && n.length >= t && k(i, n, !0) >= t - 1) break;
                    t--
                }
                r++
            }
            return nt
        }(e)
    }

    function ct(e) {
        var t, n = e._a;
        return n && -2 === c(e).overflow && (t = n[ye] < 0 || n[ye] > 11 ? ye : n[ge] < 1 || n[ge] > We(n[_e], n[ye]) ? ge : n[pe] < 0 || n[pe] > 24 || 24 === n[pe] && (0 !== n[ve] || 0 !== n[we] || 0 !== n[Me]) ? pe : n[ve] < 0 || n[ve] > 59 ? ve : n[we] < 0 || n[we] > 59 ? we : n[Me] < 0 || n[Me] > 999 ? Me : -1, c(e)._overflowDayOfYear && (t < _e || t > ge) && (t = ge), c(e)._overflowWeeks && -1 === t && (t = ke), c(e)._overflowWeekday && -1 === t && (t = Se), c(e).overflow = t), e
    }

    function ft(e, t, n) {
        return null != e ? e : null != t ? t : n
    }

    function mt(e) {
        var t, s, i, r, a, o = [];
        if (!e._d) {
            for (i = function(e) {
                    var t = new Date(n.now());
                    return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
                }(e), e._w && null == e._a[ge] && null == e._a[ye] && function(e) {
                    var t, n, s, i, r, a, o, u;
                    if (null != (t = e._w).GG || null != t.W || null != t.E) r = 1, a = 4, n = ft(t.GG, e._a[_e], Ie(xt(), 1, 4).year), s = ft(t.W, 1), ((i = ft(t.E, 1)) < 1 || i > 7) && (u = !0);
                    else {
                        r = e._locale._week.dow, a = e._locale._week.doy;
                        var l = Ie(xt(), r, a);
                        n = ft(t.gg, e._a[_e], l.year), s = ft(t.w, l.week), null != t.d ? ((i = t.d) < 0 || i > 6) && (u = !0) : null != t.e ? (i = t.e + r, (t.e < 0 || t.e > 6) && (u = !0)) : i = r
                    }
                    s < 1 || s > je(n, r, a) ? c(e)._overflowWeeks = !0 : null != u ? c(e)._overflowWeekday = !0 : (o = Ae(n, s, i, r, a), e._a[_e] = o.year, e._dayOfYear = o.dayOfYear)
                }(e), null != e._dayOfYear && (a = ft(e._a[_e], i[_e]), (e._dayOfYear > De(a) || 0 === e._dayOfYear) && (c(e)._overflowDayOfYear = !0), s = Ve(a, 0, e._dayOfYear), e._a[ye] = s.getUTCMonth(), e._a[ge] = s.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = o[t] = i[t];
            for (; t < 7; t++) e._a[t] = o[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            24 === e._a[pe] && 0 === e._a[ve] && 0 === e._a[we] && 0 === e._a[Me] && (e._nextDay = !0, e._a[pe] = 0), e._d = (e._useUTC ? Ve : function(e, t, n, s, i, r, a) {
                var o;
                return e < 100 && e >= 0 ? (o = new Date(e + 400, t, n, s, i, r, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, n, s, i, r, a), o
            }).apply(null, o), r = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[pe] = 24), e._w && void 0 !== e._w.d && e._w.d !== r && (c(e).weekdayMismatch = !0)
        }
    }
    var _t = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        yt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        gt = /Z|[+-]\d\d(?::?\d\d)?/,
        pt = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
            ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
            ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
            ["YYYY-DDD", /\d{4}-\d{3}/],
            ["YYYY-MM", /\d{4}-\d\d/, !1],
            ["YYYYYYMMDD", /[+-]\d{10}/],
            ["YYYYMMDD", /\d{8}/],
            ["GGGG[W]WWE", /\d{4}W\d{3}/],
            ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
            ["YYYYDDD", /\d{7}/]
        ],
        vt = [
            ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
            ["HH:mm:ss", /\d\d:\d\d:\d\d/],
            ["HH:mm", /\d\d:\d\d/],
            ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
            ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
            ["HHmmss", /\d\d\d\d\d\d/],
            ["HHmm", /\d\d\d\d/],
            ["HH", /\d\d/]
        ],
        wt = /^\/?Date\((\-?\d+)/i;

    function Mt(e) {
        var t, n, s, i, r, a, o = e._i,
            u = _t.exec(o) || yt.exec(o);
        if (u) {
            for (c(e).iso = !0, t = 0, n = pt.length; t < n; t++)
                if (pt[t][1].exec(u[1])) {
                    i = pt[t][0], s = !1 !== pt[t][2];
                    break
                }
            if (null == i) return void(e._isValid = !1);
            if (u[3]) {
                for (t = 0, n = vt.length; t < n; t++)
                    if (vt[t][1].exec(u[3])) {
                        r = (u[2] || " ") + vt[t][0];
                        break
                    }
                if (null == r) return void(e._isValid = !1)
            }
            if (!s && null != r) return void(e._isValid = !1);
            if (u[4]) {
                if (!gt.exec(u[4])) return void(e._isValid = !1);
                a = "Z"
            }
            e._f = i + (r || "") + (a || ""), Ot(e)
        } else e._isValid = !1
    }
    var kt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function St(e) {
        var t = parseInt(e, 10);
        return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t
    }
    var Dt = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480
    };

    function Yt(e) {
        var t, n, s, i, r, a, o, u = kt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
        if (u) {
            var l = (t = u[4], n = u[3], s = u[2], i = u[5], r = u[6], a = u[7], o = [St(t), Ce.indexOf(n), parseInt(s, 10), parseInt(i, 10), parseInt(r, 10)], a && o.push(parseInt(a, 10)), o);
            if (! function(e, t, n) {
                    return !e || Je.indexOf(e) === new Date(t[0], t[1], t[2]).getDay() || (c(n).weekdayMismatch = !0, n._isValid = !1, !1)
                }(u[1], l, e)) return;
            e._a = l, e._tzm = function(e, t, n) {
                if (e) return Dt[e];
                if (t) return 0;
                var s = parseInt(n, 10),
                    i = s % 100;
                return (s - i) / 100 * 60 + i
            }(u[8], u[9], u[10]), e._d = Ve.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), c(e).rfc2822 = !0
        } else e._isValid = !1
    }

    function Ot(e) {
        if (e._f !== n.ISO_8601)
            if (e._f !== n.RFC_2822) {
                e._a = [], c(e).empty = !0;
                var t, s, i, r, a, o = "" + e._i,
                    u = o.length,
                    l = 0;
                for (i = j(e._f, e._locale).match(N) || [], t = 0; t < i.length; t++) r = i[t], (s = (o.match(le(r, e)) || [])[0]) && ((a = o.substr(0, o.indexOf(s))).length > 0 && c(e).unusedInput.push(a), o = o.slice(o.indexOf(s) + s.length), l += s.length), E[r] ? (s ? c(e).empty = !1 : c(e).unusedTokens.push(r), me(r, s, e)) : e._strict && !s && c(e).unusedTokens.push(r);
                c(e).charsLeftOver = u - l, o.length > 0 && c(e).unusedInput.push(o), e._a[pe] <= 12 && !0 === c(e).bigHour && e._a[pe] > 0 && (c(e).bigHour = void 0), c(e).parsedDateParts = e._a.slice(0), c(e).meridiem = e._meridiem, e._a[pe] = function(e, t, n) {
                    var s;
                    if (null == n) return t;
                    return null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? ((s = e.isPM(n)) && t < 12 && (t += 12), s || 12 !== t || (t = 0), t) : t
                }(e._locale, e._a[pe], e._meridiem), mt(e), ct(e)
            } else Yt(e);
        else Mt(e)
    }

    function Tt(e) {
        var t = e._i,
            l = e._f;
        return e._locale = e._locale || ht(e._l), null === t || void 0 === l && "" === t ? m({
            nullInput: !0
        }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), v(t) ? new p(ct(t)) : (o(t) ? e._d = t : s(l) ? function(e) {
            var t, n, s, i, r;
            if (0 === e._f.length) return c(e).invalidFormat = !0, void(e._d = new Date(NaN));
            for (i = 0; i < e._f.length; i++) r = 0, t = y({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[i], Ot(t), f(t) && (r += c(t).charsLeftOver, r += 10 * c(t).unusedTokens.length, c(t).score = r, (null == s || r < s) && (s = r, n = t));
            d(e, n || t)
        }(e) : l ? Ot(e) : function(e) {
            var t = e._i;
            r(t) ? e._d = new Date(n.now()) : o(t) ? e._d = new Date(t.valueOf()) : "string" == typeof t ? function(e) {
                var t = wt.exec(e._i);
                null === t ? (Mt(e), !1 === e._isValid && (delete e._isValid, Yt(e), !1 === e._isValid && (delete e._isValid, n.createFromInputFallback(e)))) : e._d = new Date(+t[1])
            }(e) : s(t) ? (e._a = u(t.slice(0), function(e) {
                return parseInt(e, 10)
            }), mt(e)) : i(t) ? function(e) {
                if (!e._d) {
                    var t = C(e._i);
                    e._a = u([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(e) {
                        return e && parseInt(e, 10)
                    }), mt(e)
                }
            }(e) : a(t) ? e._d = new Date(t) : n.createFromInputFallback(e)
        }(e), f(e) || (e._d = null), e))
    }

    function bt(e, t, n, r, a) {
        var o, u = {};
        return !0 !== n && !1 !== n || (r = n, n = void 0), (i(e) && function(e) {
            if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
            var t;
            for (t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }(e) || s(e) && 0 === e.length) && (e = void 0), u._isAMomentObject = !0, u._useUTC = u._isUTC = a, u._l = n, u._i = e, u._f = t, u._strict = r, (o = new p(ct(Tt(u))))._nextDay && (o.add(1, "d"), o._nextDay = void 0), o
    }

    function xt(e, t, n, s) {
        return bt(e, t, n, s, !1)
    }
    n.createFromInputFallback = D("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
    }), n.ISO_8601 = function() {}, n.RFC_2822 = function() {};
    var Pt = D("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var e = xt.apply(null, arguments);
            return this.isValid() && e.isValid() ? e < this ? this : e : m()
        }),
        Wt = D("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var e = xt.apply(null, arguments);
            return this.isValid() && e.isValid() ? e > this ? this : e : m()
        });

    function Ht(e, t) {
        var n, i;
        if (1 === t.length && s(t[0]) && (t = t[0]), !t.length) return xt();
        for (n = t[0], i = 1; i < t.length; ++i) t[i].isValid() && !t[i][e](n) || (n = t[i]);
        return n
    }
    var Lt = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

    function Ct(e) {
        var t = C(e),
            n = t.year || 0,
            s = t.quarter || 0,
            i = t.month || 0,
            r = t.week || t.isoWeek || 0,
            a = t.day || 0,
            o = t.hour || 0,
            u = t.minute || 0,
            l = t.second || 0,
            d = t.millisecond || 0;
        this._isValid = function(e) {
            for (var t in e)
                if (-1 === Oe.call(Lt, t) || null != e[t] && isNaN(e[t])) return !1;
            for (var n = !1, s = 0; s < Lt.length; ++s)
                if (e[Lt[s]]) {
                    if (n) return !1;
                    parseFloat(e[Lt[s]]) !== M(e[Lt[s]]) && (n = !0)
                }
            return !0
        }(t), this._milliseconds = +d + 1e3 * l + 6e4 * u + 1e3 * o * 60 * 60, this._days = +a + 7 * r, this._months = +i + 3 * s + 12 * n, this._data = {}, this._locale = ht(), this._bubble()
    }

    function Rt(e) {
        return e instanceof Ct
    }

    function Ft(e) {
        return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
    }

    function Ut(e, t) {
        A(e, 0, 0, function() {
            var e = this.utcOffset(),
                n = "+";
            return e < 0 && (e = -e, n = "-"), n + U(~~(e / 60), 2) + t + U(~~e % 60, 2)
        })
    }
    Ut("Z", ":"), Ut("ZZ", ""), ue("Z", re), ue("ZZ", re), ce(["Z", "ZZ"], function(e, t, n) {
        n._useUTC = !0, n._tzm = Gt(re, e)
    });
    var Nt = /([\+\-]|\d\d)/gi;

    function Gt(e, t) {
        var n = (t || "").match(e);
        if (null === n) return null;
        var s = ((n[n.length - 1] || []) + "").match(Nt) || ["-", 0, 0],
            i = 60 * s[1] + M(s[2]);
        return 0 === i ? 0 : "+" === s[0] ? i : -i
    }

    function Vt(e, t) {
        var s, i;
        return t._isUTC ? (s = t.clone(), i = (v(e) || o(e) ? e.valueOf() : xt(e).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + i), n.updateOffset(s, !1), s) : xt(e).local()
    }

    function Et(e) {
        return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
    }

    function At() {
        return !!this.isValid() && (this._isUTC && 0 === this._offset)
    }
    n.updateOffset = function() {};
    var It = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
        jt = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function Zt(e, t) {
        var n, s, i, r = e,
            o = null;
        return Rt(e) ? r = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : a(e) ? (r = {}, t ? r[t] = e : r.milliseconds = e) : (o = It.exec(e)) ? (n = "-" === o[1] ? -1 : 1, r = {
            y: 0,
            d: M(o[ge]) * n,
            h: M(o[pe]) * n,
            m: M(o[ve]) * n,
            s: M(o[we]) * n,
            ms: M(Ft(1e3 * o[Me])) * n
        }) : (o = jt.exec(e)) ? (n = "-" === o[1] ? -1 : 1, r = {
            y: zt(o[2], n),
            M: zt(o[3], n),
            w: zt(o[4], n),
            d: zt(o[5], n),
            h: zt(o[6], n),
            m: zt(o[7], n),
            s: zt(o[8], n)
        }) : null == r ? r = {} : "object" == typeof r && ("from" in r || "to" in r) && (i = function(e, t) {
            var n;
            if (!e.isValid() || !t.isValid()) return {
                milliseconds: 0,
                months: 0
            };
            t = Vt(t, e), e.isBefore(t) ? n = Jt(e, t) : ((n = Jt(t, e)).milliseconds = -n.milliseconds, n.months = -n.months);
            return n
        }(xt(r.from), xt(r.to)), (r = {}).ms = i.milliseconds, r.M = i.months), s = new Ct(r), Rt(e) && l(e, "_locale") && (s._locale = e._locale), s
    }

    function zt(e, t) {
        var n = e && parseFloat(e.replace(",", "."));
        return (isNaN(n) ? 0 : n) * t
    }

    function Jt(e, t) {
        var n = {};
        return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
    }

    function $t(e, t) {
        return function(n, s) {
            var i;
            return null === s || isNaN(+s) || (T(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), i = n, n = s, s = i), qt(this, Zt(n = "string" == typeof n ? +n : n, s), e), this
        }
    }

    function qt(e, t, s, i) {
        var r = t._milliseconds,
            a = Ft(t._days),
            o = Ft(t._months);
        e.isValid() && (i = null == i || i, o && Re(e, xe(e, "Month") + o * s), a && Pe(e, "Date", xe(e, "Date") + a * s), r && e._d.setTime(e._d.valueOf() + r * s), i && n.updateOffset(e, a || o))
    }
    Zt.fn = Ct.prototype, Zt.invalid = function() {
        return Zt(NaN)
    };
    var Bt = $t(1, "add"),
        Qt = $t(-1, "subtract");

    function Kt(e, t) {
        var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
            s = e.clone().add(n, "months");
        return -(n + (t - s < 0 ? (t - s) / (s - e.clone().add(n - 1, "months")) : (t - s) / (e.clone().add(n + 1, "months") - s))) || 0
    }

    function Xt(e) {
        var t;
        return void 0 === e ? this._locale._abbr : (null != (t = ht(e)) && (this._locale = t), this)
    }
    n.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", n.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var en = D("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        return void 0 === e ? this.localeData() : this.locale(e)
    });

    function tn() {
        return this._locale
    }
    var nn = 1e3,
        sn = 60 * nn,
        rn = 60 * sn,
        an = 3506328 * rn;

    function on(e, t) {
        return (e % t + t) % t
    }

    function un(e, t, n) {
        return e < 100 && e >= 0 ? new Date(e + 400, t, n) - an : new Date(e, t, n).valueOf()
    }

    function ln(e, t, n) {
        return e < 100 && e >= 0 ? Date.UTC(e + 400, t, n) - an : Date.UTC(e, t, n)
    }

    function dn(e, t) {
        A(0, [e, e.length], 0, t)
    }

    function hn(e, t, n, s, i) {
        var r;
        return null == e ? Ie(this, s, i).year : (t > (r = je(e, s, i)) && (t = r), function(e, t, n, s, i) {
            var r = Ae(e, t, n, s, i),
                a = Ve(r.year, 0, r.dayOfYear);
            return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this
        }.call(this, e, t, n, s, i))
    }
    A(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }), A(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }), dn("gggg", "weekYear"), dn("ggggg", "weekYear"), dn("GGGG", "isoWeekYear"), dn("GGGGG", "isoWeekYear"), H("weekYear", "gg"), H("isoWeekYear", "GG"), F("weekYear", 1), F("isoWeekYear", 1), ue("G", se), ue("g", se), ue("GG", B, z), ue("gg", B, z), ue("GGGG", ee, $), ue("gggg", ee, $), ue("GGGGG", te, q), ue("ggggg", te, q), fe(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, s) {
        t[s.substr(0, 2)] = M(e)
    }), fe(["gg", "GG"], function(e, t, s, i) {
        t[i] = n.parseTwoDigitYear(e)
    }), A("Q", 0, "Qo", "quarter"), H("quarter", "Q"), F("quarter", 7), ue("Q", Z), ce("Q", function(e, t) {
        t[ye] = 3 * (M(e) - 1)
    }), A("D", ["DD", 2], "Do", "date"), H("date", "D"), F("date", 9), ue("D", B), ue("DD", B, z), ue("Do", function(e, t) {
        return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
    }), ce(["D", "DD"], ge), ce("Do", function(e, t) {
        t[ge] = M(e.match(B)[0])
    });
    var cn = be("Date", !0);
    A("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), H("dayOfYear", "DDD"), F("dayOfYear", 4), ue("DDD", X), ue("DDDD", J), ce(["DDD", "DDDD"], function(e, t, n) {
        n._dayOfYear = M(e)
    }), A("m", ["mm", 2], 0, "minute"), H("minute", "m"), F("minute", 14), ue("m", B), ue("mm", B, z), ce(["m", "mm"], ve);
    var fn = be("Minutes", !1);
    A("s", ["ss", 2], 0, "second"), H("second", "s"), F("second", 15), ue("s", B), ue("ss", B, z), ce(["s", "ss"], we);
    var mn, _n = be("Seconds", !1);
    for (A("S", 0, 0, function() {
            return ~~(this.millisecond() / 100)
        }), A(0, ["SS", 2], 0, function() {
            return ~~(this.millisecond() / 10)
        }), A(0, ["SSS", 3], 0, "millisecond"), A(0, ["SSSS", 4], 0, function() {
            return 10 * this.millisecond()
        }), A(0, ["SSSSS", 5], 0, function() {
            return 100 * this.millisecond()
        }), A(0, ["SSSSSS", 6], 0, function() {
            return 1e3 * this.millisecond()
        }), A(0, ["SSSSSSS", 7], 0, function() {
            return 1e4 * this.millisecond()
        }), A(0, ["SSSSSSSS", 8], 0, function() {
            return 1e5 * this.millisecond()
        }), A(0, ["SSSSSSSSS", 9], 0, function() {
            return 1e6 * this.millisecond()
        }), H("millisecond", "ms"), F("millisecond", 16), ue("S", X, Z), ue("SS", X, z), ue("SSS", X, J), mn = "SSSS"; mn.length <= 9; mn += "S") ue(mn, ne);

    function yn(e, t) {
        t[Me] = M(1e3 * ("0." + e))
    }
    for (mn = "S"; mn.length <= 9; mn += "S") ce(mn, yn);
    var gn = be("Milliseconds", !1);
    A("z", 0, 0, "zoneAbbr"), A("zz", 0, 0, "zoneName");
    var pn = p.prototype;

    function vn(e) {
        return e
    }
    pn.add = Bt, pn.calendar = function(e, t) {
        var s = e || xt(),
            i = Vt(s, this).startOf("day"),
            r = n.calendarFormat(this, i) || "sameElse",
            a = t && (b(t[r]) ? t[r].call(this, s) : t[r]);
        return this.format(a || this.localeData().calendar(r, this, xt(s)))
    }, pn.clone = function() {
        return new p(this)
    }, pn.diff = function(e, t, n) {
        var s, i, r;
        if (!this.isValid()) return NaN;
        if (!(s = Vt(e, this)).isValid()) return NaN;
        switch (i = 6e4 * (s.utcOffset() - this.utcOffset()), t = L(t)) {
            case "year":
                r = Kt(this, s) / 12;
                break;
            case "month":
                r = Kt(this, s);
                break;
            case "quarter":
                r = Kt(this, s) / 3;
                break;
            case "second":
                r = (this - s) / 1e3;
                break;
            case "minute":
                r = (this - s) / 6e4;
                break;
            case "hour":
                r = (this - s) / 36e5;
                break;
            case "day":
                r = (this - s - i) / 864e5;
                break;
            case "week":
                r = (this - s - i) / 6048e5;
                break;
            default:
                r = this - s
        }
        return n ? r : w(r)
    }, pn.endOf = function(e) {
        var t;
        if (void 0 === (e = L(e)) || "millisecond" === e || !this.isValid()) return this;
        var s = this._isUTC ? ln : un;
        switch (e) {
            case "year":
                t = s(this.year() + 1, 0, 1) - 1;
                break;
            case "quarter":
                t = s(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case "month":
                t = s(this.year(), this.month() + 1, 1) - 1;
                break;
            case "week":
                t = s(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case "isoWeek":
                t = s(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case "day":
            case "date":
                t = s(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case "hour":
                t = this._d.valueOf(), t += rn - on(t + (this._isUTC ? 0 : this.utcOffset() * sn), rn) - 1;
                break;
            case "minute":
                t = this._d.valueOf(), t += sn - on(t, sn) - 1;
                break;
            case "second":
                t = this._d.valueOf(), t += nn - on(t, nn) - 1
        }
        return this._d.setTime(t), n.updateOffset(this, !0), this
    }, pn.format = function(e) {
        e || (e = this.isUtc() ? n.defaultFormatUtc : n.defaultFormat);
        var t = I(this, e);
        return this.localeData().postformat(t)
    }, pn.from = function(e, t) {
        return this.isValid() && (v(e) && e.isValid() || xt(e).isValid()) ? Zt({
            to: this,
            from: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }, pn.fromNow = function(e) {
        return this.from(xt(), e)
    }, pn.to = function(e, t) {
        return this.isValid() && (v(e) && e.isValid() || xt(e).isValid()) ? Zt({
            from: this,
            to: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }, pn.toNow = function(e) {
        return this.to(xt(), e)
    }, pn.get = function(e) {
        return b(this[e = L(e)]) ? this[e]() : this
    }, pn.invalidAt = function() {
        return c(this).overflow
    }, pn.isAfter = function(e, t) {
        var n = v(e) ? e : xt(e);
        return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = L(t) || "millisecond") ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf())
    }, pn.isBefore = function(e, t) {
        var n = v(e) ? e : xt(e);
        return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = L(t) || "millisecond") ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf())
    }, pn.isBetween = function(e, t, n, s) {
        var i = v(e) ? e : xt(e),
            r = v(t) ? t : xt(t);
        return !!(this.isValid() && i.isValid() && r.isValid()) && ("(" === (s = s || "()")[0] ? this.isAfter(i, n) : !this.isBefore(i, n)) && (")" === s[1] ? this.isBefore(r, n) : !this.isAfter(r, n))
    }, pn.isSame = function(e, t) {
        var n, s = v(e) ? e : xt(e);
        return !(!this.isValid() || !s.isValid()) && ("millisecond" === (t = L(t) || "millisecond") ? this.valueOf() === s.valueOf() : (n = s.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()))
    }, pn.isSameOrAfter = function(e, t) {
        return this.isSame(e, t) || this.isAfter(e, t)
    }, pn.isSameOrBefore = function(e, t) {
        return this.isSame(e, t) || this.isBefore(e, t)
    }, pn.isValid = function() {
        return f(this)
    }, pn.lang = en, pn.locale = Xt, pn.localeData = tn, pn.max = Wt, pn.min = Pt, pn.parsingFlags = function() {
        return d({}, c(this))
    }, pn.set = function(e, t) {
        if ("object" == typeof e)
            for (var n = function(e) {
                    var t = [];
                    for (var n in e) t.push({
                        unit: n,
                        priority: R[n]
                    });
                    return t.sort(function(e, t) {
                        return e.priority - t.priority
                    }), t
                }(e = C(e)), s = 0; s < n.length; s++) this[n[s].unit](e[n[s].unit]);
        else if (b(this[e = L(e)])) return this[e](t);
        return this
    }, pn.startOf = function(e) {
        var t;
        if (void 0 === (e = L(e)) || "millisecond" === e || !this.isValid()) return this;
        var s = this._isUTC ? ln : un;
        switch (e) {
            case "year":
                t = s(this.year(), 0, 1);
                break;
            case "quarter":
                t = s(this.year(), this.month() - this.month() % 3, 1);
                break;
            case "month":
                t = s(this.year(), this.month(), 1);
                break;
            case "week":
                t = s(this.year(), this.month(), this.date() - this.weekday());
                break;
            case "isoWeek":
                t = s(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case "day":
            case "date":
                t = s(this.year(), this.month(), this.date());
                break;
            case "hour":
                t = this._d.valueOf(), t -= on(t + (this._isUTC ? 0 : this.utcOffset() * sn), rn);
                break;
            case "minute":
                t = this._d.valueOf(), t -= on(t, sn);
                break;
            case "second":
                t = this._d.valueOf(), t -= on(t, nn)
        }
        return this._d.setTime(t), n.updateOffset(this, !0), this
    }, pn.subtract = Qt, pn.toArray = function() {
        var e = this;
        return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
    }, pn.toObject = function() {
        var e = this;
        return {
            years: e.year(),
            months: e.month(),
            date: e.date(),
            hours: e.hours(),
            minutes: e.minutes(),
            seconds: e.seconds(),
            milliseconds: e.milliseconds()
        }
    }, pn.toDate = function() {
        return new Date(this.valueOf())
    }, pn.toISOString = function(e) {
        if (!this.isValid()) return null;
        var t = !0 !== e,
            n = t ? this.clone().utc() : this;
        return n.year() < 0 || n.year() > 9999 ? I(n, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : b(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", I(n, "Z")) : I(n, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
    }, pn.inspect = function() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var e = "moment",
            t = "";
        this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z");
        var n = "[" + e + '("]',
            s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
            i = t + '[")]';
        return this.format(n + s + "-MM-DD[T]HH:mm:ss.SSS" + i)
    }, pn.toJSON = function() {
        return this.isValid() ? this.toISOString() : null
    }, pn.toString = function() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, pn.unix = function() {
        return Math.floor(this.valueOf() / 1e3)
    }, pn.valueOf = function() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }, pn.creationData = function() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }, pn.year = Te, pn.isLeapYear = function() {
        return Ye(this.year())
    }, pn.weekYear = function(e) {
        return hn.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }, pn.isoWeekYear = function(e) {
        return hn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
    }, pn.quarter = pn.quarters = function(e) {
        return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
    }, pn.month = Fe, pn.daysInMonth = function() {
        return We(this.year(), this.month())
    }, pn.week = pn.weeks = function(e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d")
    }, pn.isoWeek = pn.isoWeeks = function(e) {
        var t = Ie(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d")
    }, pn.weeksInYear = function() {
        var e = this.localeData()._week;
        return je(this.year(), e.dow, e.doy)
    }, pn.isoWeeksInYear = function() {
        return je(this.year(), 1, 4)
    }, pn.date = cn, pn.day = pn.days = function(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e ? (e = function(e, t) {
            return "string" != typeof e ? e : isNaN(e) ? "number" == typeof(e = t.weekdaysParse(e)) ? e : null : parseInt(e, 10)
        }(e, this.localeData()), this.add(e - t, "d")) : t
    }, pn.weekday = function(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == e ? t : this.add(e - t, "d")
    }, pn.isoWeekday = function(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        if (null != e) {
            var t = function(e, t) {
                return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
            }(e, this.localeData());
            return this.day(this.day() % 7 ? t : t - 7)
        }
        return this.day() || 7
    }, pn.dayOfYear = function(e) {
        var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add(e - t, "d")
    }, pn.hour = pn.hours = st, pn.minute = pn.minutes = fn, pn.second = pn.seconds = _n, pn.millisecond = pn.milliseconds = gn, pn.utcOffset = function(e, t, s) {
        var i, r = this._offset || 0;
        if (!this.isValid()) return null != e ? this : NaN;
        if (null != e) {
            if ("string" == typeof e) {
                if (null === (e = Gt(re, e))) return this
            } else Math.abs(e) < 16 && !s && (e *= 60);
            return !this._isUTC && t && (i = Et(this)), this._offset = e, this._isUTC = !0, null != i && this.add(i, "m"), r !== e && (!t || this._changeInProgress ? qt(this, Zt(e - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, n.updateOffset(this, !0), this._changeInProgress = null)), this
        }
        return this._isUTC ? r : Et(this)
    }, pn.utc = function(e) {
        return this.utcOffset(0, e)
    }, pn.local = function(e) {
        return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Et(this), "m")), this
    }, pn.parseZone = function() {
        if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
        else if ("string" == typeof this._i) {
            var e = Gt(ie, this._i);
            null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
        }
        return this
    }, pn.hasAlignedHourOffset = function(e) {
        return !!this.isValid() && (e = e ? xt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0)
    }, pn.isDST = function() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }, pn.isLocal = function() {
        return !!this.isValid() && !this._isUTC
    }, pn.isUtcOffset = function() {
        return !!this.isValid() && this._isUTC
    }, pn.isUtc = At, pn.isUTC = At, pn.zoneAbbr = function() {
        return this._isUTC ? "UTC" : ""
    }, pn.zoneName = function() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, pn.dates = D("dates accessor is deprecated. Use date instead.", cn), pn.months = D("months accessor is deprecated. Use month instead", Fe), pn.years = D("years accessor is deprecated. Use year instead", Te), pn.zone = D("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
        return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
    }), pn.isDSTShifted = D("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
        if (!r(this._isDSTShifted)) return this._isDSTShifted;
        var e = {};
        if (y(e, this), (e = Tt(e))._a) {
            var t = e._isUTC ? h(e._a) : xt(e._a);
            this._isDSTShifted = this.isValid() && k(e._a, t.toArray()) > 0
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    });
    var wn = P.prototype;

    function Mn(e, t, n, s) {
        var i = ht(),
            r = h().set(s, t);
        return i[n](r, e)
    }

    function kn(e, t, n) {
        if (a(e) && (t = e, e = void 0), e = e || "", null != t) return Mn(e, t, n, "month");
        var s, i = [];
        for (s = 0; s < 12; s++) i[s] = Mn(e, s, n, "month");
        return i
    }

    function Sn(e, t, n, s) {
        "boolean" == typeof e ? (a(t) && (n = t, t = void 0), t = t || "") : (n = t = e, e = !1, a(t) && (n = t, t = void 0), t = t || "");
        var i, r = ht(),
            o = e ? r._week.dow : 0;
        if (null != n) return Mn(t, (n + o) % 7, s, "day");
        var u = [];
        for (i = 0; i < 7; i++) u[i] = Mn(t, (i + o) % 7, s, "day");
        return u
    }
    wn.calendar = function(e, t, n) {
        var s = this._calendar[e] || this._calendar.sameElse;
        return b(s) ? s.call(t, n) : s
    }, wn.longDateFormat = function(e) {
        var t = this._longDateFormat[e],
            n = this._longDateFormat[e.toUpperCase()];
        return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
            return e.slice(1)
        }), this._longDateFormat[e])
    }, wn.invalidDate = function() {
        return this._invalidDate
    }, wn.ordinal = function(e) {
        return this._ordinal.replace("%d", e)
    }, wn.preparse = vn, wn.postformat = vn, wn.relativeTime = function(e, t, n, s) {
        var i = this._relativeTime[n];
        return b(i) ? i(e, t, n, s) : i.replace(/%d/i, e)
    }, wn.pastFuture = function(e, t) {
        var n = this._relativeTime[e > 0 ? "future" : "past"];
        return b(n) ? n(t) : n.replace(/%s/i, t)
    }, wn.set = function(e) {
        var t, n;
        for (n in e) b(t = e[n]) ? this[n] = t : this["_" + n] = t;
        this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
    }, wn.months = function(e, t) {
        return e ? s(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || He).test(t) ? "format" : "standalone"][e.month()] : s(this._months) ? this._months : this._months.standalone
    }, wn.monthsShort = function(e, t) {
        return e ? s(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[He.test(t) ? "format" : "standalone"][e.month()] : s(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
    }, wn.monthsParse = function(e, t, n) {
        var s, i, r;
        if (this._monthsParseExact) return function(e, t, n) {
            var s, i, r, a = e.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s) r = h([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[s] = this.months(r, "").toLocaleLowerCase();
            return n ? "MMM" === t ? -1 !== (i = Oe.call(this._shortMonthsParse, a)) ? i : null : -1 !== (i = Oe.call(this._longMonthsParse, a)) ? i : null : "MMM" === t ? -1 !== (i = Oe.call(this._shortMonthsParse, a)) ? i : -1 !== (i = Oe.call(this._longMonthsParse, a)) ? i : null : -1 !== (i = Oe.call(this._longMonthsParse, a)) ? i : -1 !== (i = Oe.call(this._shortMonthsParse, a)) ? i : null
        }.call(this, e, t, n);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
            if (i = h([2e3, s]), n && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(i, "").replace(".", "") + "$", "i"), this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$", "i")), n || this._monthsParse[s] || (r = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[s] = new RegExp(r.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[s].test(e)) return s;
            if (n && "MMM" === t && this._shortMonthsParse[s].test(e)) return s;
            if (!n && this._monthsParse[s].test(e)) return s
        }
    }, wn.monthsRegex = function(e) {
        return this._monthsParseExact ? (l(this, "_monthsRegex") || Ge.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (l(this, "_monthsRegex") || (this._monthsRegex = Ne), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
    }, wn.monthsShortRegex = function(e) {
        return this._monthsParseExact ? (l(this, "_monthsRegex") || Ge.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (l(this, "_monthsShortRegex") || (this._monthsShortRegex = Ue), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }, wn.week = function(e) {
        return Ie(e, this._week.dow, this._week.doy).week
    }, wn.firstDayOfYear = function() {
        return this._week.doy
    }, wn.firstDayOfWeek = function() {
        return this._week.dow
    }, wn.weekdays = function(e, t) {
        var n = s(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
        return !0 === e ? Ze(n, this._week.dow) : e ? n[e.day()] : n
    }, wn.weekdaysMin = function(e) {
        return !0 === e ? Ze(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin
    }, wn.weekdaysShort = function(e) {
        return !0 === e ? Ze(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort
    }, wn.weekdaysParse = function(e, t, n) {
        var s, i, r;
        if (this._weekdaysParseExact) return function(e, t, n) {
            var s, i, r, a = e.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s) r = h([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(r, "").toLocaleLowerCase();
            return n ? "dddd" === t ? -1 !== (i = Oe.call(this._weekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Oe.call(this._shortWeekdaysParse, a)) ? i : null : -1 !== (i = Oe.call(this._minWeekdaysParse, a)) ? i : null : "dddd" === t ? -1 !== (i = Oe.call(this._weekdaysParse, a)) ? i : -1 !== (i = Oe.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Oe.call(this._minWeekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Oe.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Oe.call(this._weekdaysParse, a)) ? i : -1 !== (i = Oe.call(this._minWeekdaysParse, a)) ? i : null : -1 !== (i = Oe.call(this._minWeekdaysParse, a)) ? i : -1 !== (i = Oe.call(this._weekdaysParse, a)) ? i : -1 !== (i = Oe.call(this._shortWeekdaysParse, a)) ? i : null
        }.call(this, e, t, n);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
            if (i = h([2e3, 1]).day(s), n && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(i, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[s] || (r = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[s] = new RegExp(r.replace(".", ""), "i")), n && "dddd" === t && this._fullWeekdaysParse[s].test(e)) return s;
            if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e)) return s;
            if (n && "dd" === t && this._minWeekdaysParse[s].test(e)) return s;
            if (!n && this._weekdaysParse[s].test(e)) return s
        }
    }, wn.weekdaysRegex = function(e) {
        return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Ke.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (l(this, "_weekdaysRegex") || (this._weekdaysRegex = qe), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }, wn.weekdaysShortRegex = function(e) {
        return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Ke.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (l(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Be), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }, wn.weekdaysMinRegex = function(e) {
        return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Ke.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (l(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Qe), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }, wn.isPM = function(e) {
        return "p" === (e + "").toLowerCase().charAt(0)
    }, wn.meridiem = function(e, t, n) {
        return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    }, lt("en", {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 === M(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        }
    }), n.lang = D("moment.lang is deprecated. Use moment.locale instead.", lt), n.langData = D("moment.langData is deprecated. Use moment.localeData instead.", ht);
    var Dn = Math.abs;

    function Yn(e, t, n, s) {
        var i = Zt(t, n);
        return e._milliseconds += s * i._milliseconds, e._days += s * i._days, e._months += s * i._months, e._bubble()
    }

    function On(e) {
        return e < 0 ? Math.floor(e) : Math.ceil(e)
    }

    function Tn(e) {
        return 4800 * e / 146097
    }

    function bn(e) {
        return 146097 * e / 4800
    }

    function xn(e) {
        return function() {
            return this.as(e)
        }
    }
    var Pn = xn("ms"),
        Wn = xn("s"),
        Hn = xn("m"),
        Ln = xn("h"),
        Cn = xn("d"),
        Rn = xn("w"),
        Fn = xn("M"),
        Un = xn("Q"),
        Nn = xn("y");

    function Gn(e) {
        return function() {
            return this.isValid() ? this._data[e] : NaN
        }
    }
    var Vn = Gn("milliseconds"),
        En = Gn("seconds"),
        An = Gn("minutes"),
        In = Gn("hours"),
        jn = Gn("days"),
        Zn = Gn("months"),
        zn = Gn("years");
    var Jn = Math.round,
        $n = {
            ss: 44,
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        };
    var qn = Math.abs;

    function Bn(e) {
        return (e > 0) - (e < 0) || +e
    }

    function Qn() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var e, t, n = qn(this._milliseconds) / 1e3,
            s = qn(this._days),
            i = qn(this._months);
        e = w(n / 60), t = w(e / 60), n %= 60, e %= 60;
        var r = w(i / 12),
            a = i %= 12,
            o = s,
            u = t,
            l = e,
            d = n ? n.toFixed(3).replace(/\.?0+$/, "") : "",
            h = this.asSeconds();
        if (!h) return "P0D";
        var c = h < 0 ? "-" : "",
            f = Bn(this._months) !== Bn(h) ? "-" : "",
            m = Bn(this._days) !== Bn(h) ? "-" : "",
            _ = Bn(this._milliseconds) !== Bn(h) ? "-" : "";
        return c + "P" + (r ? f + r + "Y" : "") + (a ? f + a + "M" : "") + (o ? m + o + "D" : "") + (u || l || d ? "T" : "") + (u ? _ + u + "H" : "") + (l ? _ + l + "M" : "") + (d ? _ + d + "S" : "")
    }
    var Kn = Ct.prototype;
    return Kn.isValid = function() {
        return this._isValid
    }, Kn.abs = function() {
        var e = this._data;
        return this._milliseconds = Dn(this._milliseconds), this._days = Dn(this._days), this._months = Dn(this._months), e.milliseconds = Dn(e.milliseconds), e.seconds = Dn(e.seconds), e.minutes = Dn(e.minutes), e.hours = Dn(e.hours), e.months = Dn(e.months), e.years = Dn(e.years), this
    }, Kn.add = function(e, t) {
        return Yn(this, e, t, 1)
    }, Kn.subtract = function(e, t) {
        return Yn(this, e, t, -1)
    }, Kn.as = function(e) {
        if (!this.isValid()) return NaN;
        var t, n, s = this._milliseconds;
        if ("month" === (e = L(e)) || "quarter" === e || "year" === e) switch (t = this._days + s / 864e5, n = this._months + Tn(t), e) {
            case "month":
                return n;
            case "quarter":
                return n / 3;
            case "year":
                return n / 12
        } else switch (t = this._days + Math.round(bn(this._months)), e) {
            case "week":
                return t / 7 + s / 6048e5;
            case "day":
                return t + s / 864e5;
            case "hour":
                return 24 * t + s / 36e5;
            case "minute":
                return 1440 * t + s / 6e4;
            case "second":
                return 86400 * t + s / 1e3;
            case "millisecond":
                return Math.floor(864e5 * t) + s;
            default:
                throw new Error("Unknown unit " + e)
        }
    }, Kn.asMilliseconds = Pn, Kn.asSeconds = Wn, Kn.asMinutes = Hn, Kn.asHours = Ln, Kn.asDays = Cn, Kn.asWeeks = Rn, Kn.asMonths = Fn, Kn.asQuarters = Un, Kn.asYears = Nn, Kn.valueOf = function() {
        return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * M(this._months / 12) : NaN
    }, Kn._bubble = function() {
        var e, t, n, s, i, r = this._milliseconds,
            a = this._days,
            o = this._months,
            u = this._data;
        return r >= 0 && a >= 0 && o >= 0 || r <= 0 && a <= 0 && o <= 0 || (r += 864e5 * On(bn(o) + a), a = 0, o = 0), u.milliseconds = r % 1e3, e = w(r / 1e3), u.seconds = e % 60, t = w(e / 60), u.minutes = t % 60, n = w(t / 60), u.hours = n % 24, a += w(n / 24), o += i = w(Tn(a)), a -= On(bn(i)), s = w(o / 12), o %= 12, u.days = a, u.months = o, u.years = s, this
    }, Kn.clone = function() {
        return Zt(this)
    }, Kn.get = function(e) {
        return e = L(e), this.isValid() ? this[e + "s"]() : NaN
    }, Kn.milliseconds = Vn, Kn.seconds = En, Kn.minutes = An, Kn.hours = In, Kn.days = jn, Kn.weeks = function() {
        return w(this.days() / 7)
    }, Kn.months = Zn, Kn.years = zn, Kn.humanize = function(e) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var t = this.localeData(),
            n = function(e, t, n) {
                var s = Zt(e).abs(),
                    i = Jn(s.as("s")),
                    r = Jn(s.as("m")),
                    a = Jn(s.as("h")),
                    o = Jn(s.as("d")),
                    u = Jn(s.as("M")),
                    l = Jn(s.as("y")),
                    d = i <= $n.ss && ["s", i] || i < $n.s && ["ss", i] || r <= 1 && ["m"] || r < $n.m && ["mm", r] || a <= 1 && ["h"] || a < $n.h && ["hh", a] || o <= 1 && ["d"] || o < $n.d && ["dd", o] || u <= 1 && ["M"] || u < $n.M && ["MM", u] || l <= 1 && ["y"] || ["yy", l];
                return d[2] = t, d[3] = +e > 0, d[4] = n,
                    function(e, t, n, s, i) {
                        return i.relativeTime(t || 1, !!n, e, s)
                    }.apply(null, d)
            }(this, !e, t);
        return e && (n = t.pastFuture(+this, n)), t.postformat(n)
    }, Kn.toISOString = Qn, Kn.toString = Qn, Kn.toJSON = Qn, Kn.locale = Xt, Kn.localeData = tn, Kn.toIsoString = D("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Qn), Kn.lang = en, A("X", 0, 0, "unix"), A("x", 0, 0, "valueOf"), ue("x", se), ue("X", /[+-]?\d+(\.\d{1,3})?/), ce("X", function(e, t, n) {
        n._d = new Date(1e3 * parseFloat(e, 10))
    }), ce("x", function(e, t, n) {
        n._d = new Date(M(e))
    }), n.version = "2.24.0", e = xt, n.fn = pn, n.min = function() {
        return Ht("isBefore", [].slice.call(arguments, 0))
    }, n.max = function() {
        return Ht("isAfter", [].slice.call(arguments, 0))
    }, n.now = function() {
        return Date.now ? Date.now() : +new Date
    }, n.utc = h, n.unix = function(e) {
        return xt(1e3 * e)
    }, n.months = function(e, t) {
        return kn(e, t, "months")
    }, n.isDate = o, n.locale = lt, n.invalid = m, n.duration = Zt, n.isMoment = v, n.weekdays = function(e, t, n) {
        return Sn(e, t, n, "weekdays")
    }, n.parseZone = function() {
        return xt.apply(null, arguments).parseZone()
    }, n.localeData = ht, n.isDuration = Rt, n.monthsShort = function(e, t) {
        return kn(e, t, "monthsShort")
    }, n.weekdaysMin = function(e, t, n) {
        return Sn(e, t, n, "weekdaysMin")
    }, n.defineLocale = dt, n.updateLocale = function(e, t) {
        if (null != t) {
            var n, s, i = it;
            null != (s = ut(e)) && (i = s._config), (n = new P(t = x(i, t))).parentLocale = rt[e], rt[e] = n, lt(e)
        } else null != rt[e] && (null != rt[e].parentLocale ? rt[e] = rt[e].parentLocale : null != rt[e] && delete rt[e]);
        return rt[e]
    }, n.locales = function() {
        return Y(rt)
    }, n.weekdaysShort = function(e, t, n) {
        return Sn(e, t, n, "weekdaysShort")
    }, n.normalizeUnits = L, n.relativeTimeRounding = function(e) {
        return void 0 === e ? Jn : "function" == typeof e && (Jn = e, !0)
    }, n.relativeTimeThreshold = function(e, t) {
        return void 0 !== $n[e] && (void 0 === t ? $n[e] : ($n[e] = t, "s" === e && ($n.ss = t - 1), !0))
    }, n.calendarFormat = function(e, t) {
        var n = e.diff(t, "days", !0);
        return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
    }, n.prototype = pn, n.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm",
        TIME_SECONDS: "HH:mm:ss",
        TIME_MS: "HH:mm:ss.SSS",
        WEEK: "GGGG-[W]WW",
        MONTH: "YYYY-MM"
    }, n
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? t(require("../moment")) : "function" == typeof define && define.amd ? define(["../moment"], t) : t(e.moment)
}(this, function(e) {
    "use strict";
    return e.defineLocale("id", {
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),
        weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
        weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|siang|sore|malam/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "pagi" === t ? e : "siang" === t ? e >= 11 ? e : e + 12 : "sore" === t || "malam" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, n) {
            return e < 11 ? "pagi" : e < 15 ? "siang" : e < 19 ? "sore" : "malam"
        },
        calendar: {
            sameDay: "[Hari ini pukul] LT",
            nextDay: "[Besok pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kemarin pukul] LT",
            lastWeek: "dddd [lalu pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lalu",
            s: "beberapa detik",
            ss: "%d detik",
            m: "semenit",
            mm: "%d menit",
            h: "sejam",
            hh: "%d jam",
            d: "sehari",
            dd: "%d hari",
            M: "sebulan",
            MM: "%d bulan",
            y: "setahun",
            yy: "%d tahun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    })
});
/**
 * @popperjs/core v2.11.2 - MIT License
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Popper = {}));
}(this, (function (exports) { 'use strict';

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function getBoundingClientRect(element, includeScale) {
    if (includeScale === void 0) {
      includeScale = false;
    }

    var rect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;

    if (isHTMLElement(element) && includeScale) {
      var offsetHeight = element.offsetHeight;
      var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
      // Fallback to 1 in case both values are `0`

      if (offsetWidth > 0) {
        scaleX = round(rect.width) / offsetWidth || 1;
      }

      if (offsetHeight > 0) {
        scaleY = round(rect.height) / offsetHeight || 1;
      }
    }

    return {
      width: rect.width / scaleX,
      height: rect.height / scaleY,
      top: rect.top / scaleY,
      right: rect.right / scaleX,
      bottom: rect.bottom / scaleY,
      left: rect.left / scaleX,
      x: rect.left / scaleX,
      y: rect.top / scaleY
    };
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
    var isIE = navigator.userAgent.indexOf('Trident') !== -1;

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function format(str) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return [].concat(args).reduce(function (p, c) {
      return p.replace(/%s/, c);
    }, str);
  }

  var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
  var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
  var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
  function validateModifiers(modifiers) {
    modifiers.forEach(function (modifier) {
      [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
      .filter(function (value, index, self) {
        return self.indexOf(value) === index;
      }).forEach(function (key) {
        switch (key) {
          case 'name':
            if (typeof modifier.name !== 'string') {
              console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
            }

            break;

          case 'enabled':
            if (typeof modifier.enabled !== 'boolean') {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
            }

            break;

          case 'phase':
            if (modifierPhases.indexOf(modifier.phase) < 0) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
            }

            break;

          case 'fn':
            if (typeof modifier.fn !== 'function') {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
            }

            break;

          case 'effect':
            if (modifier.effect != null && typeof modifier.effect !== 'function') {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
            }

            break;

          case 'requires':
            if (modifier.requires != null && !Array.isArray(modifier.requires)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
            }

            break;

          case 'requiresIfExists':
            if (!Array.isArray(modifier.requiresIfExists)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
            }

            break;

          case 'options':
          case 'data':
            break;

          default:
            console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
              return "\"" + s + "\"";
            }).join(', ') + "; but \"" + key + "\" was provided.");
        }

        modifier.requires && modifier.requires.forEach(function (requirement) {
          if (modifiers.find(function (mod) {
            return mod.name === requirement;
          }) == null) {
            console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
          }
        });
      });
    });
  }

  function uniqueBy(arr, fn) {
    var identifiers = new Set();
    return arr.filter(function (item) {
      var identifier = fn(item);

      if (!identifiers.has(identifier)) {
        identifiers.add(identifier);
        return true;
      }
    });
  }

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  function getViewportRect(element) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
    // can be obscured underneath it.
    // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
    // if it isn't open, so if this isn't available, the popper will be detected
    // to overflow the bottom of the screen too early.

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
      // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
      // errors due to floating point numbers, so we need to check precision.
      // Safari returns a number <= 0, usually < -1 when pinch-zoomed
      // Feature detection fails in mobile emulation mode in Chrome.
      // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
      // 0.001
      // Fallback here: "Not Safari" userAgent

      if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element) {
    var rect = getBoundingClientRect(element);
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
  var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          }); // Validate the provided modifiers so that the consumer will get warned
          // if one of the modifiers is invalid for any reason

          {
            var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
              var name = _ref.name;
              return name;
            });
            validateModifiers(modifiers);

            if (getBasePlacement(state.options.placement) === auto) {
              var flipModifier = state.orderedModifiers.find(function (_ref2) {
                var name = _ref2.name;
                return name === 'flip';
              });

              if (!flipModifier) {
                console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
              }
            }

            var _getComputedStyle = getComputedStyle(popper),
                marginTop = _getComputedStyle.marginTop,
                marginRight = _getComputedStyle.marginRight,
                marginBottom = _getComputedStyle.marginBottom,
                marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
            // cause bugs with positioning, so we'll warn the consumer


            if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
              return parseFloat(margin);
            })) {
              console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
            }
          }

          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            {
              console.error(INVALID_ELEMENT_ERROR);
            }

            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          var __debug_loops__ = 0;

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            {
              __debug_loops__ += 1;

              if (__debug_loops__ > 100) {
                console.error(INFINITE_LOOP_ERROR);
                break;
              }
            }

            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        {
          console.error(INVALID_ELEMENT_ERROR);
        }

        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref3) {
          var name = _ref3.name,
              _ref3$options = _ref3.options,
              options = _ref3$options === void 0 ? {} : _ref3$options,
              effect = _ref3.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }

  var passive = {
    passive: true
  };

  function effect$2(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect$2,
    data: {}
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref) {
    var x = _ref.x,
        y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets,
        isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
        x = _offsets$x === void 0 ? 0 : _offsets$x,
        _offsets$y = offsets.y,
        y = _offsets$y === void 0 ? 0 : _offsets$y;

    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
        offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
        offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref4.x;
    y = _ref4.y;

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref5) {
    var state = _ref5.state,
        options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

    {
      var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || '';

      if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
        return transitionProperty.indexOf(property) >= 0;
      })) {
        console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
      }
    }

    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration,
      isFixed: state.options.strategy === 'fixed'
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$1(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$1,
    requires: ['computeStyles']
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;

      {
        console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
      }
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var _offsetModifierState$;

      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = offset + overflow[mainSide];
      var max$1 = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _offsetModifierState$2;

      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _len = altAxis === 'y' ? 'height' : 'width';

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    {
      if (!isHTMLElement(arrowElement)) {
        console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {
      {
        console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
      }

      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers$1
  }); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  exports.applyStyles = applyStyles$1;
  exports.arrow = arrow$1;
  exports.computeStyles = computeStyles$1;
  exports.createPopper = createPopper;
  exports.createPopperLite = createPopper$1;
  exports.defaultModifiers = defaultModifiers;
  exports.detectOverflow = detectOverflow;
  exports.eventListeners = eventListeners;
  exports.flip = flip$1;
  exports.hide = hide$1;
  exports.offset = offset$1;
  exports.popperGenerator = popperGenerator;
  exports.popperOffsets = popperOffsets$1;
  exports.preventOverflow = preventOverflow$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

// @ts-nocheck
/*!
  * Bootstrap v4.5.3 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bootstrap = {}, global.jQuery));
}(this, (function (exports, $) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($__default['default'](event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined;
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $__default['default'](this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $__default['default'].fn.emulateTransitionEnd = transitionEndEmulator;
    $__default['default'].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (_) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $__default['default'](element).css('transition-duration');
      var transitionDelay = $__default['default'](element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $__default['default'](element).trigger(TRANSITION_END);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $__default['default'] === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $__default['default'].fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.5.3';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default['default'].fn[NAME];
  var SELECTOR_DISMISS = '[data-dismiss="alert"]';
  var EVENT_CLOSE = "close" + EVENT_KEY;
  var EVENT_CLOSED = "closed" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_ALERT = 'alert';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = /*#__PURE__*/function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $__default['default'](element).closest("." + CLASS_NAME_ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $__default['default'].Event(EVENT_CLOSE);
      $__default['default'](element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $__default['default'](element).removeClass(CLASS_NAME_SHOW);

      if (!$__default['default'](element).hasClass(CLASS_NAME_FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $__default['default'](element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $__default['default'](element).detach().trigger(EVENT_CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {

      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }

      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME] = Alert._jQueryInterface;
  $__default['default'].fn[NAME].Constructor = Alert;

  $__default['default'].fn[NAME].noConflict = function () {
    $__default['default'].fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };



  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.5.3';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $__default['default'].fn[NAME$1];
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_BUTTON = 'btn';
  var CLASS_NAME_FOCUS = 'focus';
  var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
  var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
  var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
  var SELECTOR_INPUT = 'input:not([type="hidden"])';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_BUTTON = '.btn';
  var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
  var EVENT_FOCUS_BLUR_DATA_API = "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1);
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$1 + DATA_API_KEY$1;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function () {
    function Button(element) {
      this._element = element;
      this.shouldAvoidTriggerChange = false;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $__default['default'](this._element).closest(SELECTOR_DATA_TOGGLES)[0];

      if (rootElement) {
        var input = this._element.querySelector(SELECTOR_INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(SELECTOR_ACTIVE);

              if (activeElement) {
                $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE);
            }

            if (!this.shouldAvoidTriggerChange) {
              $__default['default'](input).trigger('change');
            }
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE));
        }

        if (triggerChangeEvent) {
          $__default['default'](this._element).toggleClass(CLASS_NAME_ACTIVE);
        }
      }
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config, avoidTriggerChange) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $element.data(DATA_KEY$1, data);
        }

        data.shouldAvoidTriggerChange = avoidTriggerChange;

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;
    var initialButton = button;

    if (!$__default['default'](button).hasClass(CLASS_NAME_BUTTON)) {
      button = $__default['default'](button).closest(SELECTOR_BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    } else {
      var inputBtn = button.querySelector(SELECTOR_INPUT);

      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      }

      if (initialButton.tagName === 'INPUT' || button.tagName !== 'LABEL') {
        Button._jQueryInterface.call($__default['default'](button), 'toggle', initialButton.tagName === 'INPUT');
      }
    }
  }).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = $__default['default'](event.target).closest(SELECTOR_BUTTON)[0];
    $__default['default'](button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
  });
  $__default['default'](window).on(EVENT_LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i];
      var input = button.querySelector(SELECTOR_INPUT);

      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        button.classList.remove(CLASS_NAME_ACTIVE);
      }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i];

      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        _button.classList.remove(CLASS_NAME_ACTIVE);
      }
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$1] = Button._jQueryInterface;
  $__default['default'].fn[NAME$1].Constructor = Button;

  $__default['default'].fn[NAME$1].noConflict = function () {
    $__default['default'].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.5.3';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $__default['default'].fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY$2;
  var EVENT_SLID = "slid" + EVENT_KEY$2;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
  var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
  var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = /*#__PURE__*/function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      var $element = $__default['default'](this._element); // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible

      if (!document.hidden && $element.is(':visible') && $element.css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(SELECTOR_NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $__default['default'](this._element).one(EVENT_SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $__default['default'](this._element).off(EVENT_KEY$2);
      $__default['default'].removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $__default['default'](this._element).on(EVENT_KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $__default['default'](this._element).on(EVENT_MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(EVENT_MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $__default['default'](this._element.querySelectorAll(SELECTOR_ITEM_IMG)).on(EVENT_DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $__default['default'](this._element).on(EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        $__default['default'](this._element).on(EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        $__default['default'](this._element).on(EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        $__default['default'](this._element).on(EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        $__default['default'](this._element).on(EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM));

      var slideEvent = $__default['default'].Event(EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $__default['default'](this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE$1));
        $__default['default'](indicators).removeClass(CLASS_NAME_ACTIVE$1);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $__default['default'](nextIndicator).addClass(CLASS_NAME_ACTIVE$1);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && $__default['default'](nextElement).hasClass(CLASS_NAME_ACTIVE$1)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $__default['default'].Event(EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($__default['default'](this._element).hasClass(CLASS_NAME_SLIDE)) {
        $__default['default'](nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $__default['default'](activeElement).addClass(directionalClassName);
        $__default['default'](nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $__default['default'](activeElement).one(Util.TRANSITION_END, function () {
          $__default['default'](nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(CLASS_NAME_ACTIVE$1);
          $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$1 + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $__default['default'](_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$1);
        $__default['default'](nextElement).addClass(CLASS_NAME_ACTIVE$1);
        this._isSliding = false;
        $__default['default'](this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$2);

        var _config = _extends({}, Default, $__default['default'](this).data());

        if (typeof config === 'object') {
          _config = _extends({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $__default['default'](this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $__default['default'](selector)[0];

      if (!target || !$__default['default'](target).hasClass(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _extends({}, $__default['default'](target).data(), $__default['default'](this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($__default['default'](target), config);

      if (slideIndex) {
        $__default['default'](target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler);
  $__default['default'](window).on(EVENT_LOAD_DATA_API$1, function () {
    var carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $__default['default'](carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$2] = Carousel._jQueryInterface;
  $__default['default'].fn[NAME$2].Constructor = Carousel;

  $__default['default'].fn[NAME$2].noConflict = function () {
    $__default['default'].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.5.3';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $__default['default'].fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW = "show" + EVENT_KEY$3;
  var EVENT_SHOWN = "shown" + EVENT_KEY$3;
  var EVENT_HIDE = "hide" + EVENT_KEY$3;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
  var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
  var CLASS_NAME_SHOW$1 = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var DIMENSION_WIDTH = 'width';
  var DIMENSION_HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$1));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $__default['default'](actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $__default['default'].Event(EVENT_SHOW);
      $__default['default'](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($__default['default'](actives).not(this._selector), 'hide');

        if (!activesData) {
          $__default['default'](actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $__default['default'](this._element).removeClass(CLASS_NAME_COLLAPSE).addClass(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $__default['default'](this._triggerArray).removeClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $__default['default'](_this._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $__default['default'](_this._element).trigger(EVENT_SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var startEvent = $__default['default'].Event(EVENT_HIDE);
      $__default['default'](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $__default['default'](this._element).addClass(CLASS_NAME_COLLAPSING).removeClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $__default['default']([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(CLASS_NAME_SHOW$1)) {
              $__default['default'](trigger).addClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $__default['default'](_this2._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE).trigger(EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $__default['default'](this._element).hasClass(DIMENSION_WIDTH);
      return hasWidth ? DIMENSION_WIDTH : DIMENSION_HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $__default['default'](children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $__default['default'](element).hasClass(CLASS_NAME_SHOW$1);

      if (triggerArray.length) {
        $__default['default'](triggerArray).toggleClass(CLASS_NAME_COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$3);

        var _config = _extends({}, Default$1, $element.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $element.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $__default['default'](this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $__default['default'](selectors).each(function () {
      var $target = $__default['default'](this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$3] = Collapse._jQueryInterface;
  $__default['default'].fn[NAME$3].Constructor = Collapse;

  $__default['default'].fn[NAME$3].noConflict = function () {
    $__default['default'].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  var timeoutDuration = function () {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */
  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends$1({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop);
      var marginLeft = parseFloat(styles.marginLeft);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends$1({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends$1({}, attributes, data.attributes);
    data.styles = _extends$1({}, styles, data.styles);
    data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

      // flips variation if reference element overflows boundaries
      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      // flips variation if popper content overflows boundaries
      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

      var flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends$1({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends$1({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends$1({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.5.3';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $__default['default'].fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
  var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
  var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
  var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
  var EVENT_CLICK = "click" + EVENT_KEY$4;
  var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_SHOW$2 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPRIGHT = 'dropright';
  var CLASS_NAME_DROPLEFT = 'dropleft';
  var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  var CLASS_NAME_POSITION_STATIC = 'position-static';
  var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  var SELECTOR_FORM_CHILD = '.dropdown form';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = 'top-start';
  var PLACEMENT_TOPEND = 'top-end';
  var PLACEMENT_BOTTOM = 'bottom-start';
  var PLACEMENT_BOTTOMEND = 'bottom-end';
  var PLACEMENT_RIGHT = 'right-start';
  var PLACEMENT_LEFT = 'left-start';
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var isActive = $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      this.show(true);
    };

    _proto.show = function show(usePopper) {
      if (usePopper === void 0) {
        usePopper = false;
      }

      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED) || $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $__default['default'].Event(EVENT_SHOW$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $__default['default'](parent).addClass(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $__default['default'](parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
        $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $__default['default'](parent).toggleClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_SHOWN$1, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED) || !$__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $__default['default'].Event(EVENT_HIDE$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $__default['default'](parent).toggleClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_HIDDEN$1, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$4);
      $__default['default'](this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $__default['default'](this._element).on(EVENT_CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, $__default['default'](this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(SELECTOR_MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $__default['default'](this._element.parentNode);
      var placement = PLACEMENT_BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
        placement = $__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT) ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if ($__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $__default['default'](this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _extends({}, popperConfig, this._config.popperConfig);
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $__default['default'](this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$2));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $__default['default'](toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$__default['default'](parent).hasClass(CLASS_NAME_SHOW$2)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $__default['default'].contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $__default['default'].Event(EVENT_HIDE$1, relatedTarget);
        $__default['default'](parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $__default['default'](dropdownMenu).removeClass(CLASS_NAME_SHOW$2);
        $__default['default'](parent).removeClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_HIDDEN$1, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $__default['default'](event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      if (this.disabled || $__default['default'](this).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $__default['default'](parent).hasClass(CLASS_NAME_SHOW$2);

      if (!isActive && event.which === ESCAPE_KEYCODE) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (!isActive || event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE) {
        if (event.which === ESCAPE_KEYCODE) {
          $__default['default'](parent.querySelector(SELECTOR_DATA_TOGGLE$2)).trigger('focus');
        }

        $__default['default'](this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS)).filter(function (item) {
        return $__default['default'](item).is(':visible');
      });

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown._dataApiKeydownHandler).on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler).on(EVENT_CLICK_DATA_API$4 + " " + EVENT_KEYUP_DATA_API, Dropdown._clearMenus).on(EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($__default['default'](this), 'toggle');
  }).on(EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$4] = Dropdown._jQueryInterface;
  $__default['default'].fn[NAME$4].Constructor = Dropdown;

  $__default['default'].fn[NAME$4].noConflict = function () {
    $__default['default'].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.5.3';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $__default['default'].fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
  var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
  var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
  var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
  var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
  var CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
  var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_SHOW$3 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
  var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = /*#__PURE__*/function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(SELECTOR_DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$1)) {
        this._isTransitioning = true;
      }

      var showEvent = $__default['default'].Event(EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });
      $__default['default'](this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default['default'](this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $__default['default'](this._dialog).on(EVENT_MOUSEDOWN_DISMISS, function () {
        $__default['default'](_this._element).one(EVENT_MOUSEUP_DISMISS, function (event) {
          if ($__default['default'](event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$2);
      $__default['default'](this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default['default'](document).off(EVENT_FOCUSIN);
      $__default['default'](this._element).removeClass(CLASS_NAME_SHOW$3);
      $__default['default'](this._element).off(EVENT_CLICK_DISMISS);
      $__default['default'](this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $__default['default'](htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */

      $__default['default'](document).off(EVENT_FOCUSIN);
      $__default['default'].removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      if (this._config.backdrop === 'static') {
        var hideEventPrevented = $__default['default'].Event(EVENT_HIDE_PREVENTED);
        $__default['default'](this._element).trigger(hideEventPrevented);

        if (hideEventPrevented.isDefaultPrevented()) {
          return;
        }

        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!isModalOverflowing) {
          this._element.style.overflowY = 'hidden';
        }

        this._element.classList.add(CLASS_NAME_STATIC);

        var modalTransitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $__default['default'](this._element).off(Util.TRANSITION_END);
        $__default['default'](this._element).one(Util.TRANSITION_END, function () {
          _this3._element.classList.remove(CLASS_NAME_STATIC);

          if (!isModalOverflowing) {
            $__default['default'](_this3._element).one(Util.TRANSITION_END, function () {
              _this3._element.style.overflowY = '';
            }).emulateTransitionEnd(_this3._element, modalTransitionDuration);
          }
        }).emulateTransitionEnd(modalTransitionDuration);

        this._element.focus();
      } else {
        this.hide();
      }
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1);
      var modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      if ($__default['default'](this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $__default['default'](this._element).addClass(CLASS_NAME_SHOW$3);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $__default['default'].Event(EVENT_SHOWN$2, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        }

        _this4._isTransitioning = false;
        $__default['default'](_this4._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $__default['default'](this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $__default['default'](document).off(EVENT_FOCUSIN) // Guard against infinite focus loop
      .on(EVENT_FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && $__default['default'](_this5._element).has(event.target).length === 0) {
          _this5._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $__default['default'](this._element).on(EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this6.hide();
          } else if (!_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            _this6._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $__default['default'](this._element).off(EVENT_KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $__default['default'](window).on(EVENT_RESIZE, function (event) {
          return _this7.handleUpdate(event);
        });
      } else {
        $__default['default'](window).off(EVENT_RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $__default['default'](document.body).removeClass(CLASS_NAME_OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $__default['default'](_this8._element).trigger(EVENT_HIDDEN$2);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $__default['default'](this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1) ? CLASS_NAME_FADE$1 : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $__default['default'](this._backdrop).appendTo(document.body);
        $__default['default'](this._element).on(EVENT_CLICK_DISMISS, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this9._triggerBackdropTransition();
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $__default['default'](this._backdrop).addClass(CLASS_NAME_SHOW$3);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $__default['default'](this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $__default['default'](this._backdrop).removeClass(CLASS_NAME_SHOW$3);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$1)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $__default['default'](this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT)); // Adjust fixed content padding

        $__default['default'](fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $__default['default'](element).css('padding-right');
          $__default['default'](element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $__default['default'](stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $__default['default'](element).css('margin-right');
          $__default['default'](element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $__default['default'](document.body).css('padding-right');
        $__default['default'](document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $__default['default'](document.body).addClass(CLASS_NAME_OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
      $__default['default'](fixedContent).each(function (index, element) {
        var padding = $__default['default'](element).data('padding-right');
        $__default['default'](element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + SELECTOR_STICKY_CONTENT));
      $__default['default'](elements).each(function (index, element) {
        var margin = $__default['default'](element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $__default['default'](element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $__default['default'](document.body).data('padding-right');
      $__default['default'](document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$5);

        var _config = _extends({}, Default$3, $__default['default'](this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $__default['default'](this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $__default['default'](target).data(DATA_KEY$5) ? 'toggle' : _extends({}, $__default['default'](target).data(), $__default['default'](this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $__default['default'](target).one(EVENT_SHOW$2, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(EVENT_HIDDEN$2, function () {
        if ($__default['default'](_this11).is(':visible')) {
          _this11.focus();
        }
      });
    });

    Modal._jQueryInterface.call($__default['default'](target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$5] = Modal._jQueryInterface;
  $__default['default'].fn[NAME$5].Constructor = Modal;

  $__default['default'].fn[NAME$5].noConflict = function () {
    $__default['default'].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.3): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.5.3';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $__default['default'].fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var Event = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$4 = 'show';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var SELECTOR_ARROW = '.arrow';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = /*#__PURE__*/function () {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $__default['default'](event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $__default['default'](event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($__default['default'](this.getTipElement()).hasClass(CLASS_NAME_SHOW$4)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $__default['default'].removeData(this.element, this.constructor.DATA_KEY);
      $__default['default'](this.element).off(this.constructor.EVENT_KEY);
      $__default['default'](this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $__default['default'](this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($__default['default'](this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $__default['default'].Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $__default['default'](this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $__default['default'].contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $__default['default'](tip).addClass(CLASS_NAME_FADE$2);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $__default['default'](tip).data(this.constructor.DATA_KEY, this);

        if (!$__default['default'].contains(this.element.ownerDocument.documentElement, this.tip)) {
          $__default['default'](tip).appendTo(container);
        }

        $__default['default'](this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        $__default['default'](tip).addClass(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $__default['default'](_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };

        if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$2)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $__default['default'](this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $__default['default'].Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $__default['default'](_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $__default['default'](this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $__default['default'](tip).removeClass(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$2)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $__default['default'](tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($__default['default'](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
      $__default['default'](tip).removeClass(CLASS_NAME_FADE$2 + " " + CLASS_NAME_SHOW$4);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$__default['default'](content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($__default['default'](content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: SELECTOR_ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends({}, defaultBsConfig, this.config.popperConfig);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $__default['default'](this.config.container);
      }

      return $__default['default'](document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $__default['default'](_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $__default['default'](_this5.element).on(eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          }).on(eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      $__default['default'](this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if ($__default['default'](context.getTipElement()).hasClass(CLASS_NAME_SHOW$4) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $__default['default'](this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default['default'](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $__default['default'](tip).removeClass(CLASS_NAME_FADE$2);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $element.data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$6] = Tooltip._jQueryInterface;
  $__default['default'].fn[NAME$6].Constructor = Tooltip;

  $__default['default'].fn[NAME$6].noConflict = function () {
    $__default['default'].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.5.3';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $__default['default'].fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = /*#__PURE__*/function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $__default['default'](this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(SELECTOR_CONTENT), content);
      $tip.removeClass(CLASS_NAME_FADE$3 + " " + CLASS_NAME_SHOW$5);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default['default'](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $__default['default'](this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$7] = Popover._jQueryInterface;
  $__default['default'].fn[NAME$7].Constructor = Popover;

  $__default['default'].fn[NAME$7].noConflict = function () {
    $__default['default'].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.5.3';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $__default['default'].fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
  var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
  var EVENT_LOAD_DATA_API$2 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + "," + (this._config.target + " " + SELECTOR_LIST_ITEMS + ",") + (this._config.target + " " + SELECTOR_DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $__default['default'](this._scrollElement).on(EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$__default['default'](target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$8);
      $__default['default'](this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && Util.isElement(config.target)) {
        var id = $__default['default'](config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $__default['default'](config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $__default['default']([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN).find(SELECTOR_DROPDOWN_TOGGLE).addClass(CLASS_NAME_ACTIVE$2);
        $link.addClass(CLASS_NAME_ACTIVE$2);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE$2); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).addClass(CLASS_NAME_ACTIVE$2); // Handle special case when .nav-link is inside .nav-item

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE$2);
      }

      $__default['default'](this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$2);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$2);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $__default['default'](this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](window).on(EVENT_LOAD_DATA_API$2, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $__default['default'](scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$8] = ScrollSpy._jQueryInterface;
  $__default['default'].fn[NAME$8].Constructor = ScrollSpy;

  $__default['default'].fn[NAME$8].noConflict = function () {
    $__default['default'].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.5.3';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $__default['default'].fn[NAME$9];
  var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
  var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
  var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
  var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
  var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var CLASS_NAME_DISABLED$1 = 'disabled';
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_SHOW$6 = 'show';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_ACTIVE$2 = '.active';
  var SELECTOR_ACTIVE_UL = '> li > .active';
  var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $__default['default'](this._element).hasClass(CLASS_NAME_ACTIVE$3) || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED$1)) {
        return;
      }

      var target;
      var previous;
      var listElement = $__default['default'](this._element).closest(SELECTOR_NAV_LIST_GROUP$1)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$2;
        previous = $__default['default'].makeArray($__default['default'](listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$3, {
        relatedTarget: this._element
      });
      var showEvent = $__default['default'].Event(EVENT_SHOW$3, {
        relatedTarget: previous
      });

      if (previous) {
        $__default['default'](previous).trigger(hideEvent);
      }

      $__default['default'](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $__default['default'].Event(EVENT_HIDDEN$3, {
          relatedTarget: _this._element
        });
        var shownEvent = $__default['default'].Event(EVENT_SHOWN$3, {
          relatedTarget: previous
        });
        $__default['default'](previous).trigger(hiddenEvent);
        $__default['default'](_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $__default['default'](container).find(SELECTOR_ACTIVE_UL) : $__default['default'](container).children(SELECTOR_ACTIVE$2);
      var active = activeElements[0];
      var isTransitioning = callback && active && $__default['default'](active).hasClass(CLASS_NAME_FADE$4);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $__default['default'](active).removeClass(CLASS_NAME_SHOW$6).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $__default['default'](active).removeClass(CLASS_NAME_ACTIVE$3);
        var dropdownChild = $__default['default'](active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $__default['default'](dropdownChild).removeClass(CLASS_NAME_ACTIVE$3);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $__default['default'](element).addClass(CLASS_NAME_ACTIVE$3);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$4)) {
        element.classList.add(CLASS_NAME_SHOW$6);
      }

      if (element.parentNode && $__default['default'](element.parentNode).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = $__default['default'](element).closest(SELECTOR_DROPDOWN$1)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE$1));
          $__default['default'](dropdownToggleList).addClass(CLASS_NAME_ACTIVE$3);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $__default['default'](this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($__default['default'](this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$9] = Tab._jQueryInterface;
  $__default['default'].fn[NAME$9].Constructor = Tab;

  $__default['default'].fn[NAME$9].noConflict = function () {
    $__default['default'].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.5.3';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $__default['default'].fn[NAME$a];
  var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
  var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
  var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
  var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
  var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
  var CLASS_NAME_FADE$5 = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW$7 = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast = /*#__PURE__*/function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $__default['default'].Event(EVENT_SHOW$4);
      $__default['default'](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE$5);
      }

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);

        _this._element.classList.add(CLASS_NAME_SHOW$7);

        $__default['default'](_this._element).trigger(EVENT_SHOWN$4);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      Util.reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        return;
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$4);
      $__default['default'](this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    };

    _proto.dispose = function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        this._element.classList.remove(CLASS_NAME_SHOW$7);
      }

      $__default['default'](this._element).off(EVENT_CLICK_DISMISS$1);
      $__default['default'].removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$7, $__default['default'](this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $__default['default'](this._element).on(EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this2.hide();
      });
    };

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(CLASS_NAME_HIDE);

        $__default['default'](_this3._element).trigger(EVENT_HIDDEN$4);
      };

      this._element.classList.remove(CLASS_NAME_SHOW$7);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$a] = Toast._jQueryInterface;
  $__default['default'].fn[NAME$a].Constructor = Toast;

  $__default['default'].fn[NAME$a].noConflict = function () {
    $__default['default'].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true });

})));


// @ts-nocheck
/**
 * Yii JavaScript module.
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */

/**
 * yii is the root module for all Yii JavaScript modules.
 * It implements a mechanism of organizing JavaScript code in modules through the function "yii.initModule()".
 *
 * Each module should be named as "x.y.z", where "x" stands for the root module (for the Yii core code, this is "yii").
 *
 * A module may be structured as follows:
 *
 * ```javascript
 * window.yii.sample = (function($) {
 *     var pub = {
 *         // whether this module is currently active. If false, init() will not be called for this module
 *         // it will also not be called for all its child modules. If this property is undefined, it means true.
 *         isActive: true,
 *         init: function() {
 *             // ... module initialization code goes here ...
 *         },
 *
 *         // ... other public functions and properties go here ...
 *     };
 *
 *     // ... private functions and properties go here ...
 *
 *     return pub;
 * })(window.jQuery);
 * ```
 *
 * Using this structure, you can define public and private functions/properties for a module.
 * Private functions/properties are only visible within the module, while public functions/properties
 * may be accessed outside of the module. For example, you can access "yii.sample.isActive".
 *
 * You must call "yii.initModule()" once for the root module of all your modules.
 */
window.yii = (function ($) {
    var pub = {
        /**
         * List of JS or CSS URLs that can be loaded multiple times via AJAX requests.
         * Each item may be represented as either an absolute URL or a relative one.
         * Each item may contain a wildcard matching character `*`, that means one or more
         * any characters on the position. For example:
         *  - `/css/*.css` will match any file ending with `.css` in the `css` directory of the current web site
         *  - `http*://cdn.example.com/*` will match any files on domain `cdn.example.com`, loaded with HTTP or HTTPS
         *  - `/js/myCustomScript.js?realm=*` will match file `/js/myCustomScript.js` with defined `realm` parameter
         */
        reloadableScripts: [],
        /**
         * The selector for clickable elements that need to support confirmation and form submission.
         */
        clickableSelector: 'a, button, input[type="submit"], input[type="button"], input[type="reset"], ' +
            'input[type="image"]',
        /**
         * The selector for changeable elements that need to support confirmation and form submission.
         */
        changeableSelector: 'select, input, textarea',

        /**
         * @return string|undefined the CSRF parameter name. Undefined is returned if CSRF validation is not enabled.
         */
        getCsrfParam: function () {
            return $('meta[name=csrf-param]').attr('content');
        },

        /**
         * @return string|undefined the CSRF token. Undefined is returned if CSRF validation is not enabled.
         */
        getCsrfToken: function () {
            return $('meta[name=csrf-token]').attr('content');
        },

        /**
         * Sets the CSRF token in the meta elements.
         * This method is provided so that you can update the CSRF token with the latest one you obtain from the server.
         * @param name the CSRF token name
         * @param value the CSRF token value
         */
        setCsrfToken: function (name, value) {
            $('meta[name=csrf-param]').attr('content', name);
            $('meta[name=csrf-token]').attr('content', value);
        },

        /**
         * Updates all form CSRF input fields with the latest CSRF token.
         * This method is provided to avoid cached forms containing outdated CSRF tokens.
         */
        refreshCsrfToken: function () {
            var token = pub.getCsrfToken();
            if (token) {
                $('form input[name="' + pub.getCsrfParam() + '"]').val(token);
            }
        },

        /**
         * Displays a confirmation dialog.
         * The default implementation simply displays a js confirmation dialog.
         * You may override this by setting `yii.confirm`.
         * @param message the confirmation message.
         * @param ok a callback to be called when the user confirms the message
         * @param cancel a callback to be called when the user cancels the confirmation
         */
        confirm: function (message, ok, cancel) {
            if (window.confirm(message)) {
                !ok || ok();
            } else {
                !cancel || cancel();
            }
        },


        //===== AJUST FORM
        ajaxSubmitLoader:function(){
        	var self = this;
        	var $form = $('form[data-ajax-submit-loader]')
        	var $body = $('body')

        	$form
        	.on('afterValidate',function(e){})
        	.on('beforeSubmit',function(e){
        		var loader = $form.closest('.modal-dialog').length > 0 ? 
        			self.loaders().show({modal:'true'}).message('Wait ..........')
        			: self.loaders().show().message('Wait ..........');

        		var client = self.ajax($form).done(function(r){
        			if (r.hasOwnProperty('error')) {
        				self.addError($form,r.error)
        				loader.delay(1000).then(() => {loader.message('Error .........').delay(1000).then(() => {loader.hide()})})
        				return false;
        			}
        			if (r.hasOwnProperty('code')) {
        				var code = r.code,d = r.data
        				
        				if ( code === 200 ) {
        					loader.delay(1000).then(() => {
        						loader.message('Success .........').delay(1000).then(() => {
		        					if (d.hasOwnProperty('returnUrl')) {
		        						return self.redirect(d.returnUrl)
		        					}
        							loader.hide();
        						})
        					})
        				}

        				if ( code === 201 ) { // SET ERRORS ALERT
        					if ( d.hasOwnProperty('context')) {
	        					loader.delay(1000).then(() => {
	        						loader.message(r.message).delay(1000).then(() => {
	        							loader.hide();
        								$body.append($(d.context))
	        						})
	        					})
        					}
        				}
        			}
        			loader.delay(25000).then(() => {loader.hide()})
        		})
        		return false;
        	})
        },

        loaders:function(){
        	var $body = $('body')
        	var c = {
        		spinner:function(){
        			return $('<div/>').addClass('form-loader centerXY w-100');
        		},
        		message:function(message){
        			$body.find('.form-loader .text-message').empty().text(message)
        			return this;
        		},
        		backdrop:function(){
        			return $('<div/>').addClass('form-backdrop modal-backdrop fade show')
        		},
			  	delay: function(ms) {
			  		return new Promise(resolve => setTimeout(resolve, ms));
			    },
        		$:function(){
        			return this.spinner().addClass('d-flex justify-content-center flex-column align-items-center').css({zIndex:'1060'})
	        					.append([
	        						$('<div/>').addClass('spinner-border text-secondary').attr({role:"status"})
	        						,$('<div/>').addClass('text-message text-white bold')
	        					])
	        				       					
        		},			    
        		show:function(option){
        			var opt = typeof option === 'undefined' ? {} : option;
        			if ( opt.hasOwnProperty('modal')) {
        				$body.find('.modal.show .modal-dialog').append([
        						this.$().css({background:'rgba(255,255,255,.7)',height:'100vh',width:'100%'})

        					])
        				$body.find('.text-message').addClass('text-secondary')
        				return this;
        			}
        			$body.append([this.$(),this.backdrop()])
        			return this;
        		},
        		hide:function(){
        			$body.find('.form-loader').remove()
        			$body.find('.form-backdrop').remove()
        		},
        	};
        	return c;
        },

        ajax:function($form){
		    var ajax = $.ajax({
	            type: $form.attr('method'),
	            url: $form.attr('action'),
	            data: $form.serializeArray(),
		    });
		    return ajax;      	
        },

        ajaxs:function(url,data,method){
        	var method = typeof method === 'undefined' ? 'POST' : method;
        	var data = $.extend({},data,{_csrf : this.getCsrfToken()});
		    var ajax = $.ajax({
	            type: method,
	            url: url,
	            data: data,
		    });
		    return ajax;      	
        },

        finds:function(id){
        	var $form = $(this);
        	var $input = $form.find('input#' + id)
        	var $field = $form.find('.field-' + id)
        	return {$field:$field,$input:$input}
        },
        attributeArray:function(){
        	var attributes = $(this).data('yiiActiveForm').attributes
        	var result = []
        	$.each(attributes,function(i,attr){
        		result.push(attr.id)
        	})
        	return result;
        },

        addError:function($form,error){
        	var self = this
        	var attributes = $form.data('yiiActiveForm').attributes
        	var arrAttribute = this.attributeArray.call($form);
        	if ( error.hasOwnProperty('validation') ) {
        		$form.yiiActiveForm('updateMessages', error.validation, true);

	        		$.each(error.validation,function(attribute,errors){
	        			if ( errors.length > 0 ) {
        					$('#' + attribute ).on('change keydown focusin',function(e){
        						$(this).closest('.field-' + attribute).removeClass('has-error').find('.help-block-error').empty()
    						})
	        			}
	        			if ( $.inArray(attribute,arrAttribute) < 0 && errors.length > 0 ) {
        					var $find = self.finds.call($form,attribute);

        					$find.$field.addClass('has-error')
        						.find('.help-block-error').empty().text(errors[0])

        					$find.$input.on('change keydown',function(){
        						$find.$field.removeClass('has-error').find('.help-block-error').empty()
    						})
	        			}
	        		})
        		return;
        	}

        	if ( error.hasOwnProperty('inputId') ) {
        		var $input = $('#' + error.inputId)
        		var $field = $input.closest('.field-' + error.inputId);
        		
    			$field.removeClass('has-success').addClass('has-error')
    				.find('.help-block-error').empty().text(error.message)

    			$input.on('change keydown',function(){
        			$field.removeClass('has-error').find('.help-block-error').empty()
    			})
        	}
        }, 

        redirect:function(url){
        	return window.location.href = url;
        },

        form:function($form){
        	return {
        		btnSubmit:function(){
        			return $form.find('button[type="submit"]')
        		},
        		btnSubmitId:function(){
        			return $form.find('button#submit')
        		},        		
        		disabled:function(){
        			var _this = this;
        			var o = {
        				submit:function(){
        					return _this.btnSubmit().attr({disabled:'disabled'})
        				},
        				input:function(){}
        			}
        			return o;
        		},
        		enabled:function(){
        			var _this = this;
        			var o = {
        				submit:function(){
        					return _this.btnSubmit().removeAttr('disabled')
        				},

        				input:function(){}
        			}
        			return o;
        		},
        	};
        },

        loader:function(){
        	var $body = $('body')
        	var $backdrop = $('<div/>').addClass('form-backdrop modal-backdrop fade show')
        	var $loader = $('<div/>').addClass('d-flex justify-content-center flex-column align-items-center form-loader')
        					.css({
        						position:'absolute',
        						top:'50%',
        						left:'50%',
        						zIndex:'1060',
        						transform: 'translate(-50%, -50%)'
        					})
        					.append([
        						$('<div/>').addClass('spinner-border text-secondary').attr({role:"status"})
        						,$('<div/>').addClass('text-message text-white bold').text('Wait ...........')
        					])
        	var c = {
        		message:function(message){
        			$body.find('.form-loader .text-message').empty().text(message)
        			return this;
        		},
			  	delay: function(ms) {
			  		var self = this
			  		return new Promise(resolve => setTimeout(resolve, ms));
			    },		
        		show:function(){
        			$body.find('.form-backdrop').remove()
        			$body.find('.form-loader').remove()
        			$body.append($backdrop)
        			$body.append($loader)
        			return this;
        		},
        		hide:function(){
        			$body.find('.form-backdrop').remove()
        			$body.find('.form-loader').remove()
        		},
        	};
        	return c;
        },

        //===== END AJUST FORM

        /**
         * Handles the action triggered by user.
         * This method recognizes the `data-method` attribute of the element. If the attribute exists,
         * the method will submit the form containing this element. If there is no containing form, a form
         * will be created and submitted using the method given by this attribute value (e.g. "post", "put").
         * For hyperlinks, the form action will take the value of the "href" attribute of the link.
         * For other elements, either the containing form action or the current page URL will be used
         * as the form action URL.
         *
         * If the `data-method` attribute is not defined, the `href` attribute (if any) of the element
         * will be assigned to `window.location`.
         *
         * Starting from version 2.0.3, the `data-params` attribute is also recognized when you specify
         * `data-method`. The value of `data-params` should be a JSON representation of the data (name-value pairs)
         * that should be submitted as hidden inputs. For example, you may use the following code to generate
         * such a link:
         *
         * ```php
         * use yii\helpers\Html;
         * use yii\helpers\Json;
         *
         * echo Html::a('submit', ['site/foobar'], [
         *     'data' => [
         *         'method' => 'post',
         *         'params' => [
         *             'name1' => 'value1',
         *             'name2' => 'value2',
         *         ],
         *     ],
         * ]);
         * ```
         *
         * @param $e the jQuery representation of the element
         * @param event Related event
         */
        handleAction: function ($e, event) {
            var $form = $e.attr('data-form') ? $('#' + $e.attr('data-form')) : $e.closest('form'),
                method = !$e.data('method') && $form ? $form.attr('method') : $e.data('method'),
                action = $e.attr('href'),
                isValidAction = action && action !== '#',
                params = $e.data('params'),
                areValidParams = params && $.isPlainObject(params),
                pjax = $e.data('pjax'),
                usePjax = pjax !== undefined && pjax !== 0 && $.support.pjax,
                pjaxContainer,
                pjaxOptions = {},
                conflictParams = ['submit', 'reset', 'elements', 'length', 'name', 'acceptCharset',
                    'action', 'enctype', 'method', 'target'];

            // Forms and their child elements should not use input names or ids that conflict with properties of a form,
            // such as submit, length, or method.
            $.each(conflictParams, function (index, param) {
                if (areValidParams && params.hasOwnProperty(param)) {
                    console.error("Parameter name '" + param + "' conflicts with a same named form property. " +
                        "Please use another name.");
                }
            });

            if (usePjax) {
                pjaxContainer = $e.data('pjax-container');
                if (pjaxContainer === undefined || !pjaxContainer.length) {
                    pjaxContainer = $e.closest('[data-pjax-container]').attr('id')
                        ? ('#' + $e.closest('[data-pjax-container]').attr('id'))
                        : '';
                }
                if (!pjaxContainer.length) {
                    pjaxContainer = 'body';
                }
                pjaxOptions = {
                    container: pjaxContainer,
                    push: !!$e.data('pjax-push-state'),
                    replace: !!$e.data('pjax-replace-state'),
                    scrollTo: $e.data('pjax-scrollto'),
                    pushRedirect: $e.data('pjax-push-redirect'),
                    replaceRedirect: $e.data('pjax-replace-redirect'),
                    skipOuterContainers: $e.data('pjax-skip-outer-containers'),
                    timeout: $e.data('pjax-timeout'),
                    originalEvent: event,
                    originalTarget: $e
                };
            }

            if (method === undefined) {
                if (isValidAction) {
                    usePjax ? $.pjax.click(event, pjaxOptions) : window.location.assign(action);
                } else if ($e.is(':submit') && $form.length) {
                    if (usePjax) {
                        $form.on('submit', function (e) {
                            $.pjax.submit(e, pjaxOptions);
                        });
                    }
                    $form.trigger('submit');
                }
                return;
            }

            var oldMethod,
                oldAction,
                newForm = !$form.length;
            if (!newForm) {
                oldMethod = $form.attr('method');
                $form.attr('method', method);
                if (isValidAction) {
                    oldAction = $form.attr('action');
                    $form.attr('action', action);
                }
            } else {
                if (!isValidAction) {
                    action = pub.getCurrentUrl();
                }
                $form = $('<form/>', {method: method, action: action});
                var target = $e.attr('target');
                if (target) {
                    $form.attr('target', target);
                }
                if (!/(get|post)/i.test(method)) {
                    $form.append($('<input/>', {name: '_method', value: method, type: 'hidden'}));
                    method = 'post';
                    $form.attr('method', method);
                }
                if (/post/i.test(method)) {
                    var csrfParam = pub.getCsrfParam();
                    if (csrfParam) {
                        $form.append($('<input/>', {name: csrfParam, value: pub.getCsrfToken(), type: 'hidden'}));
                    }
                }
                $form.hide().appendTo('body');
            }

            var activeFormData = $form.data('yiiActiveForm');
            if (activeFormData) {
                // Remember the element triggered the form submission. This is used by yii.activeForm.js.
                activeFormData.submitObject = $e;
            }

            if (areValidParams) {
                $.each(params, function (name, value) {
                    $form.append($('<input/>').attr({name: name, value: value, type: 'hidden'}));
                });
            }

            if (usePjax) {
                $form.on('submit', function (e) {
                    $.pjax.submit(e, pjaxOptions);
                });
            }

            $form.trigger('submit');

            $.when($form.data('yiiSubmitFinalizePromise')).done(function () {
                if (newForm) {
                    $form.remove();
                    return;
                }

                if (oldAction !== undefined) {
                    $form.attr('action', oldAction);
                }
                $form.attr('method', oldMethod);

                if (areValidParams) {
                    $.each(params, function (name) {
                        $('input[name="' + name + '"]', $form).remove();
                    });
                }
            });
        },

        getQueryParams: function (url) {
            var pos = url.indexOf('?');
            if (pos < 0) {
                return {};
            }

            var pairs = $.grep(url.substring(pos + 1).split('#')[0].split('&'), function (value) {
                return value !== '';
            });
            var params = {};

            for (var i = 0, len = pairs.length; i < len; i++) {
                var pair = pairs[i].split('=');
                var name = decodeURIComponent(pair[0].replace(/\+/g, '%20'));
                var value = decodeURIComponent(pair[1].replace(/\+/g, '%20'));
                if (!name.length) {
                    continue;
                }
                if (params[name] === undefined) {
                    params[name] = value || '';
                } else {
                    if (!$.isArray(params[name])) {
                        params[name] = [params[name]];
                    }
                    params[name].push(value || '');
                }
            }

            return params;
        },

        initModule: function (module) {
            if (module.isActive !== undefined && !module.isActive) {
                return;
            }
            if ($.isFunction(module.init)) {
                module.init();
            }
            $.each(module, function () {
                if ($.isPlainObject(this)) {
                    pub.initModule(this);
                }
            });
        },

        init: function () {
        	var self = this;
            initCsrfHandler();
            initRedirectHandler();
            initAssetFilters();
            initDataMethods();

            this.ajaxSubmitLoader();          
            $(document).on('show.bs.modal',function(e) {
            	setTimeout(function(){
            	self.ajaxSubmitLoader();

            	},1000)
            });
        },

        /**
         * Returns the URL of the current page without params and trailing slash. Separated and made public for testing.
         * @returns {string}
         */
        getBaseCurrentUrl: function () {
            return window.location.protocol + '//' + window.location.host;
        },

        /**
         * Returns the URL of the current page. Used for testing, you can always call `window.location.href` manually
         * instead.
         * @returns {string}
         */
        getCurrentUrl: function () {
            return window.location.href;
        }
    };

    function initCsrfHandler() {
        // automatically send CSRF token for all AJAX requests
        $.ajaxPrefilter(function (options, originalOptions, xhr) {
            if (!options.crossDomain && pub.getCsrfParam()) {
                xhr.setRequestHeader('X-CSRF-Token', pub.getCsrfToken());
            }
        });
        pub.refreshCsrfToken();
    }

    function initRedirectHandler() {
        // handle AJAX redirection
        $(document).ajaxComplete(function (event, xhr) {
            var url = xhr && xhr.getResponseHeader('X-Redirect');
            if (url) {
                window.location.assign(url);
            }
        });
    }

    function initAssetFilters() {
        /**
         * Used for storing loaded scripts and information about loading each script if it's in the process of loading.
         * A single script can have one of the following values:
         *
         * - `undefined` - script was not loaded at all before or was loaded with error last time.
         * - `true` (boolean) -  script was successfully loaded.
         * - object - script is currently loading.
         *
         * In case of a value being an object the properties are:
         * - `xhrList` - represents a queue of XHR requests sent to the same URL (related with this script) in the same
         * small period of time.
         * - `xhrDone` - boolean, acts like a locking mechanism. When one of the XHR requests in the queue is
         * successfully completed, it will abort the rest of concurrent requests to the same URL until cleanup is done
         * to prevent possible errors and race conditions.
         * @type {{}}
         */
        var loadedScripts = {};

        $('script[src]').each(function () {
            var url = getAbsoluteUrl(this.src);
            loadedScripts[url] = true;
        });

        $.ajaxPrefilter('script', function (options, originalOptions, xhr) {
            if (options.dataType == 'jsonp') {
                return;
            }

            var url = getAbsoluteUrl(options.url),
                forbiddenRepeatedLoad = loadedScripts[url] === true && !isReloadableAsset(url),
                cleanupRunning = loadedScripts[url] !== undefined && loadedScripts[url]['xhrDone'] === true;

            if (forbiddenRepeatedLoad || cleanupRunning) {
                xhr.abort();
                return;
            }

            if (loadedScripts[url] === undefined || loadedScripts[url] === true) {
                loadedScripts[url] = {
                    xhrList: [],
                    xhrDone: false
                };
            }

            xhr.done(function (data, textStatus, jqXHR) {
                // If multiple requests were successfully loaded, perform cleanup only once
                if (loadedScripts[jqXHR.yiiUrl]['xhrDone'] === true) {
                    return;
                }

                loadedScripts[jqXHR.yiiUrl]['xhrDone'] = true;

                for (var i = 0, len = loadedScripts[jqXHR.yiiUrl]['xhrList'].length; i < len; i++) {
                    var singleXhr = loadedScripts[jqXHR.yiiUrl]['xhrList'][i];
                    if (singleXhr && singleXhr.readyState !== XMLHttpRequest.DONE) {
                        singleXhr.abort();
                    }
                }

                loadedScripts[jqXHR.yiiUrl] = true;
            }).fail(function (jqXHR, textStatus) {
                if (textStatus === 'abort') {
                    return;
                }

                delete loadedScripts[jqXHR.yiiUrl]['xhrList'][jqXHR.yiiIndex];

                var allFailed = true;
                for (var i = 0, len = loadedScripts[jqXHR.yiiUrl]['xhrList'].length; i < len; i++) {
                    if (loadedScripts[jqXHR.yiiUrl]['xhrList'][i]) {
                        allFailed = false;
                    }
                }

                if (allFailed) {
                    delete loadedScripts[jqXHR.yiiUrl];
                }
            });
            // Use prefix for custom XHR properties to avoid possible conflicts with existing properties
            xhr.yiiIndex = loadedScripts[url]['xhrList'].length;
            xhr.yiiUrl = url;

            loadedScripts[url]['xhrList'][xhr.yiiIndex] = xhr;
        });

        $(document).ajaxComplete(function () {
            var styleSheets = [];
            $('link[rel=stylesheet]').each(function () {
                var url = getAbsoluteUrl(this.href);
                if (isReloadableAsset(url)) {
                    return;
                }

                $.inArray(url, styleSheets) === -1 ? styleSheets.push(url) : $(this).remove();
            });
        });
    }

    function initDataMethods() {
        var handler = function (event) {
            var $this = $(this),
                method = $this.data('method'),
                message = $this.data('confirm'),
                form = $this.data('form');

            if (method === undefined && message === undefined && form === undefined) {
                return true;
            }

            if (message !== undefined && message !== false && message !== '') {
                $.proxy(pub.confirm, this)(message, function () {
                    pub.handleAction($this, event);
                });
            } else {
                pub.handleAction($this, event);
            }
            event.stopImmediatePropagation();
            return false;
        };

        // handle data-confirm and data-method for clickable and changeable elements
        $(document).on('click.yii', pub.clickableSelector, handler)
            .on('change.yii', pub.changeableSelector, handler);
    }

    function isReloadableAsset(url) {
        for (var i = 0; i < pub.reloadableScripts.length; i++) {
            var rule = getAbsoluteUrl(pub.reloadableScripts[i]);
            var match = new RegExp("^" + escapeRegExp(rule).split('\\*').join('.+') + "$").test(url);
            if (match === true) {
                return true;
            }
        }

        return false;
    }

    // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    /**
     * Returns absolute URL based on the given URL
     * @param {string} url Initial URL
     * @returns {string}
     */
    function getAbsoluteUrl(url) {
        return url.charAt(0) === '/' ? pub.getBaseCurrentUrl() + url : url;
    }

    return pub;
})(jQuery);

window.jQuery(function () {
    window.yii.initModule(window.yii);
});

/**
 * Yii form widget.
 *
 * This is the JavaScript widget used by the yii\widgets\ActiveForm widget.
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
(function ($) {

    $.fn.yiiActiveForm = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.yiiActiveForm');
            return false;
        }
    };

    var events = {
        /**
         * beforeValidate event is triggered before validating the whole form.
         * The signature of the event handler should be:
         *     function (event, messages, deferreds)
         * where
         *  - event: an Event object.
         *  - messages: an associative array with keys being attribute IDs and values being error message arrays
         *    for the corresponding attributes.
         *  - deferreds: an array of Deferred objects. You can use deferreds.add(callback) to add a new deferred validation.
         *
         * If the handler returns a boolean false, it will stop further form validation after this event. And as
         * a result, afterValidate event will not be triggered.
         */
        beforeValidate: 'beforeValidate',
        /**
         * afterValidate event is triggered after validating the whole form.
         * The signature of the event handler should be:
         *     function (event, messages, errorAttributes)
         * where
         *  - event: an Event object.
         *  - messages: an associative array with keys being attribute IDs and values being error message arrays
         *    for the corresponding attributes.
         *  - errorAttributes: an array of attributes that have validation errors. Please refer to attributeDefaults for the structure of this parameter.
         */
        afterValidate: 'afterValidate',
        /**
         * beforeValidateAttribute event is triggered before validating an attribute.
         * The signature of the event handler should be:
         *     function (event, attribute, messages, deferreds)
         * where
         *  - event: an Event object.
         *  - attribute: the attribute to be validated. Please refer to attributeDefaults for the structure of this parameter.
         *  - messages: an array to which you can add validation error messages for the specified attribute.
         *  - deferreds: an array of Deferred objects. You can use deferreds.add(callback) to add a new deferred validation.
         *
         * If the handler returns a boolean false, it will stop further validation of the specified attribute.
         * And as a result, afterValidateAttribute event will not be triggered.
         */
        beforeValidateAttribute: 'beforeValidateAttribute',
        /**
         * afterValidateAttribute event is triggered after validating the whole form and each attribute.
         * The signature of the event handler should be:
         *     function (event, attribute, messages)
         * where
         *  - event: an Event object.
         *  - attribute: the attribute being validated. Please refer to attributeDefaults for the structure of this parameter.
         *  - messages: an array to which you can add additional validation error messages for the specified attribute.
         */
        afterValidateAttribute: 'afterValidateAttribute',
        /**
         * beforeSubmit event is triggered before submitting the form after all validations have passed.
         * The signature of the event handler should be:
         *     function (event)
         * where event is an Event object.
         *
         * If the handler returns a boolean false, it will stop form submission.
         */
        beforeSubmit: 'beforeSubmit',
        /**
         * ajaxBeforeSend event is triggered before sending an AJAX request for AJAX-based validation.
         * The signature of the event handler should be:
         *     function (event, jqXHR, settings)
         * where
         *  - event: an Event object.
         *  - jqXHR: a jqXHR object
         *  - settings: the settings for the AJAX request
         */
        ajaxBeforeSend: 'ajaxBeforeSend',
        /**
         * ajaxComplete event is triggered after completing an AJAX request for AJAX-based validation.
         * The signature of the event handler should be:
         *     function (event, jqXHR, textStatus)
         * where
         *  - event: an Event object.
         *  - jqXHR: a jqXHR object
         *  - textStatus: the status of the request ("success", "notmodified", "error", "timeout", "abort", or "parsererror").
         */
        ajaxComplete: 'ajaxComplete',
        /**
         * afterInit event is triggered after yii activeForm init.
         * The signature of the event handler should be:
         *     function (event)
         * where
         *  - event: an Event object.
         */
        afterInit: 'afterInit'
    };

    // NOTE: If you change any of these defaults, make sure you update yii\widgets\ActiveForm::getClientOptions() as well
    var defaults = {
        // whether to encode the error summary
        encodeErrorSummary: true,
        // the jQuery selector for the error summary
        errorSummary: '.error-summary',
        // whether to perform validation before submitting the form.
        validateOnSubmit: true,
        // the container CSS class representing the corresponding attribute has validation error
        errorCssClass: 'has-error',
        // the container CSS class representing the corresponding attribute passes validation
        successCssClass: 'has-success',
        // the container CSS class representing the corresponding attribute is being validated
        validatingCssClass: 'validating',
        // the GET parameter name indicating an AJAX-based validation
        ajaxParam: 'ajax',
        // the type of data that you're expecting back from the server
        ajaxDataType: 'json',
        // the URL for performing AJAX-based validation. If not set, it will use the the form's action
        validationUrl: undefined,
        // whether to scroll to first visible error after validation.
        scrollToError: true,
        // offset in pixels that should be added when scrolling to the first error.
        scrollToErrorOffset: 0,
        // where to add validation class: container or input
        validationStateOn: 'container'
    };

    // NOTE: If you change any of these defaults, make sure you update yii\widgets\ActiveField::getClientOptions() as well
    var attributeDefaults = {
        // a unique ID identifying an attribute (e.g. "loginform-username") in a form
        id: undefined,
        // attribute name or expression (e.g. "[0]content" for tabular input)
        name: undefined,
        // the jQuery selector of the container of the input field
        container: undefined,
        // the jQuery selector of the input field under the context of the form
        input: undefined,
        // the jQuery selector of the error tag under the context of the container
        error: '.help-block',
        // whether to encode the error
        encodeError: true,
        // whether to perform validation when a change is detected on the input
        validateOnChange: true,
        // whether to perform validation when the input loses focus
        validateOnBlur: true,
        // whether to perform validation when the user is typing.
        validateOnType: false,
        // number of milliseconds that the validation should be delayed when a user is typing in the input field.
        validationDelay: 500,
        // whether to enable AJAX-based validation.
        enableAjaxValidation: false,
        // function (attribute, value, messages, deferred, $form), the client-side validation function.
        validate: undefined,
        // status of the input field, 0: empty, not entered before, 1: validated, 2: pending validation, 3: validating
        status: 0,
        // whether the validation is cancelled by beforeValidateAttribute event handler
        cancelled: false,
        // the value of the input
        value: undefined,
        // whether to update aria-invalid attribute after validation
        updateAriaInvalid: true
    };


    var submitDefer;

    var setSubmitFinalizeDefer = function($form) {
        submitDefer = $.Deferred();
        $form.data('yiiSubmitFinalizePromise', submitDefer.promise());
    };

    // finalize yii.js $form.submit
    var submitFinalize = function($form) {
        if(submitDefer) {
            submitDefer.resolve();
            submitDefer = undefined;
            $form.removeData('yiiSubmitFinalizePromise');
        }
    };

    var methods = {
        init: function (attributes, options) {
            return this.each(function () {
                var $form = $(this);
                if ($form.data('yiiActiveForm')) {
                    return;
                }

                var settings = $.extend({}, defaults, options || {});
                if (settings.validationUrl === undefined) {
                    settings.validationUrl = $form.attr('action');
                }

                $.each(attributes, function (i) {
                    attributes[i] = $.extend({value: getValue($form, this)}, attributeDefaults, this);
                    watchAttribute($form, attributes[i]);
                });

                $form.data('yiiActiveForm', {
                    settings: settings,
                    attributes: attributes,
                    submitting: false,
                    validated: false,
                    options: getFormOptions($form)
                });


                /**
                 * Clean up error status when the form is reset.
                 * Note that $form.on('reset', ...) does work because the "reset" event does not bubble on IE.
                 */
                $form.on('reset.yiiActiveForm', methods.resetForm);

                if (settings.validateOnSubmit) {
                    $form.on('mouseup.yiiActiveForm keyup.yiiActiveForm', ':submit', function () {
                        $form.data('yiiActiveForm').submitObject = $(this);
                    });
                    $form.on('submit.yiiActiveForm', methods.submitForm);
                }
                var event = $.Event(events.afterInit);
                $form.trigger(event);

                if ( typeof $form.data('ajaxSubmit') !== 'undefined' && $form.data('ajaxSubmit')  ) {
        			methods.ajaxSubmited($form);
                }

            });

        },

        ajaxSubmited:function($form){
        	$form
        	.on('beforeSubmit',function(e){
        		var client = yii.ajax($form);

        		client.done(function(r){
        			if (r.hasOwnProperty('error')) {
        				yii.addError($form,r.error);
        				return false;
        			}
        			return true;
        		})
        		return false;
        	})
        },

        // add a new attribute to the form dynamically.
        // please refer to attributeDefaults for the structure of attribute
        add: function (attribute) {
            var $form = $(this);
            attribute = $.extend({value: getValue($form, attribute)}, attributeDefaults, attribute);
            $form.data('yiiActiveForm').attributes.push(attribute);
            watchAttribute($form, attribute);
        },

        // remove the attribute with the specified ID from the form
        remove: function (id) {
            var $form = $(this),
                attributes = $form.data('yiiActiveForm').attributes,
                index = -1,
                attribute = undefined;
            $.each(attributes, function (i) {
                if (attributes[i]['id'] == id) {
                    index = i;
                    attribute = attributes[i];
                    return false;
                }
            });
            if (index >= 0) {
                attributes.splice(index, 1);
                unwatchAttribute($form, attribute);
            }

            return attribute;
        },

        // manually trigger the validation of the attribute with the specified ID
        validateAttribute: function (id) {
            var attribute = methods.find.call(this, id);
            if (attribute != undefined) {
                validateAttribute($(this), attribute, true);
            }
        },

        // find an attribute config based on the specified attribute ID
        find: function (id) {
            var attributes = $(this).data('yiiActiveForm').attributes,
                result = undefined;
            $.each(attributes, function (i) {
                if (attributes[i]['id'] == id) {
                    result = attributes[i];
                    return false;
                }
            });
            return result;
        },

        destroy: function () {
            return this.each(function () {
                $(this).off('.yiiActiveForm');
                $(this).removeData('yiiActiveForm');
            });
        },

        data: function () {
            return this.data('yiiActiveForm');
        },

        // validate all applicable inputs in the form
        validate: function (forceValidate) {
            if (forceValidate) {
                $(this).data('yiiActiveForm').submitting = true;
            }

            var $form = $(this),
                data = $form.data('yiiActiveForm'),
                needAjaxValidation = false,
                messages = {},
                deferreds = deferredArray(),
                submitting = data.submitting;

            if (submitting) {
                var event = $.Event(events.beforeValidate);
                $form.trigger(event, [messages, deferreds]);

                if (event.result === false) {
                    data.submitting = false;
                    submitFinalize($form);
                    return;
                }
            }

            // client-side validation
            $.each(data.attributes, function () {
                this.$form = $form;
                var $input = findInput($form, this);

                if ($input.is(":disabled")) {
                    return true;
                }
                // pass SELECT without options
                if ($input.length && $input[0].tagName.toLowerCase() === 'select') {
                    if (!$input[0].options.length) {
                        return true;
                    } else if (($input[0].options.length === 1) && ($input[0].options[0].value === '')) {
                        return true;
                    }
                }
                this.cancelled = false;
                // perform validation only if the form is being submitted or if an attribute is pending validation
                if (data.submitting || this.status === 2 || this.status === 3) {
                    var msg = messages[this.id];
                    if (msg === undefined) {
                        msg = [];
                        messages[this.id] = msg;
                    }

                    var event = $.Event(events.beforeValidateAttribute);
                    $form.trigger(event, [this, msg, deferreds]);
                    if (event.result !== false) {
                        if (this.validate) {
                            this.validate(this, getValue($form, this), msg, deferreds, $form);
                        }
                        if (this.enableAjaxValidation) {
                            needAjaxValidation = true;
                        }
                    } else {
                        this.cancelled = true;
                    }
                }
            });

            // ajax validation
            $.when.apply(this, deferreds).always(function() {
                // Remove empty message arrays
                for (var i in messages) {
                    if (0 === messages[i].length) {
                        delete messages[i];
                    }
                }
                if (needAjaxValidation && ($.isEmptyObject(messages) || data.submitting)) {
                    var $button = data.submitObject,
                        extData = '&' + data.settings.ajaxParam + '=' + $form.attr('id');
                    if ($button && $button.length && $button.attr('name')) {
                        extData += '&' + $button.attr('name') + '=' + $button.attr('value');
                    }
                    $.ajax({
                        url: data.settings.validationUrl,
                        type: $form.attr('method'),
                        data: $form.serialize() + extData,
                        dataType: data.settings.ajaxDataType,
                        complete: function (jqXHR, textStatus) {
                            $form.trigger(events.ajaxComplete, [jqXHR, textStatus]);
                        },
                        beforeSend: function (jqXHR, settings) {
                            $form.trigger(events.ajaxBeforeSend, [jqXHR, settings]);
                        },
                        success: function (msgs) {
                            if (msgs !== null && typeof msgs === 'object') {
                                $.each(data.attributes, function () {
                                    if (!this.enableAjaxValidation || this.cancelled) {
                                        delete msgs[this.id];
                                    }
                                });
                                updateInputs($form, $.extend(messages, msgs), submitting);
                            } else {
                                updateInputs($form, messages, submitting);
                            }
                        },
                        error: function () {
                            data.submitting = false;
                            submitFinalize($form);
                        }
                    });
                } else if (data.submitting) {
                    // delay callback so that the form can be submitted without problem
                    window.setTimeout(function () {
                        updateInputs($form, messages, submitting);
                    }, 200);
                } else {
                    updateInputs($form, messages, submitting);
                }
            });
        },

        submitForm: function () {
            var $form = $(this),
                data = $form.data('yiiActiveForm');

            if (data.validated) {
                // Second submit's call (from validate/updateInputs)
                data.submitting = false;
                var event = $.Event(events.beforeSubmit);
                $form.trigger(event);
                if (event.result === false) {
                    data.validated = false;
                    submitFinalize($form);
                    return false;
                }
                updateHiddenButton($form);
                return true;   // continue submitting the form since validation passes
            } else {
                // First submit's call (from yii.js/handleAction) - execute validating
                setSubmitFinalizeDefer($form);

                if (data.settings.timer !== undefined) {
                    clearTimeout(data.settings.timer);
                }
                data.submitting = true;
                methods.validate.call($form);
                return false;
            }
        },

        resetForm: function () {
            var $form = $(this);
            var data = $form.data('yiiActiveForm');
            // Because we bind directly to a form reset event instead of a reset button (that may not exist),
            // when this function is executed form input values have not been reset yet.
            // Therefore we do the actual reset work through setTimeout.
            window.setTimeout(function () {
                $.each(data.attributes, function () {
                    // Without setTimeout() we would get the input values that are not reset yet.
                    this.value = getValue($form, this);
                    this.status = 0;
                    var $container = $form.find(this.container),
                        $input = findInput($form, this),
                        $errorElement = data.settings.validationStateOn === 'input' ? $input : $container;

                    $errorElement.removeClass(
                      data.settings.validatingCssClass + ' ' +
                      data.settings.errorCssClass + ' ' +
                      data.settings.successCssClass
                    );
                    $container.find(this.error).html('');
                });
                $form.find(data.settings.errorSummary).hide().find('ul').html('');
            }, 1);
        },

        /**
         * Updates error messages, input containers, and optionally summary as well.
         * If an attribute is missing from messages, it is considered valid.
         * @param messages array the validation error messages, indexed by attribute IDs
         * @param summary whether to update summary as well.
         */
        updateMessages: function (messages, summary) {
            var $form = $(this);
            var data = $form.data('yiiActiveForm');
            $.each(data.attributes, function () {
                updateInput($form, this, messages);
            });
            if (summary) {
                updateSummary($form, messages);
            }
        },

        /**
         * Updates error messages and input container of a single attribute.
         * If messages is empty, the attribute is considered valid.
         * @param id attribute ID
         * @param messages array with error messages
         */
        updateAttribute: function(id, messages) {
            var attribute = methods.find.call(this, id);
            if (attribute != undefined) {
                var msg = {};
                msg[id] = messages;
                updateInput($(this), attribute, msg);
            }
        }
    };

    var watchAttribute = function ($form, attribute) {
        var $input = findInput($form, attribute);
        if (attribute.validateOnChange) {
            $input.on('change.yiiActiveForm', function () {
                validateAttribute($form, attribute, false);
            });
        }
        if (attribute.validateOnBlur) {
            $input.on('blur.yiiActiveForm', function () {
                if (attribute.status == 0 || attribute.status == 1) {
                    validateAttribute($form, attribute, true);
                }
            });
        }
        if (attribute.validateOnType) {
            $input.on('keyup.yiiActiveForm', function (e) {
                if ($.inArray(e.which, [16, 17, 18, 37, 38, 39, 40]) !== -1 ) {
                    return;
                }
                if (attribute.value !== getValue($form, attribute)) {
                    validateAttribute($form, attribute, false, attribute.validationDelay);
                }
            });
        }
    };

    var unwatchAttribute = function ($form, attribute) {
        findInput($form, attribute).off('.yiiActiveForm');
    };

    var validateAttribute = function ($form, attribute, forceValidate, validationDelay) {
        var data = $form.data('yiiActiveForm');

        if (forceValidate) {
            attribute.status = 2;
        }
        $.each(data.attributes, function () {
            if (!isEqual(this.value, getValue($form, this))) {
                this.status = 2;
                forceValidate = true;
            }
        });
        if (!forceValidate) {
            return;
        }

        if (data.settings.timer !== undefined) {
            clearTimeout(data.settings.timer);
        }
        data.settings.timer = window.setTimeout(function () {
            if (data.submitting || $form.is(':hidden')) {
                return;
            }
            $.each(data.attributes, function () {
                if (this.status === 2) {
                    this.status = 3;
                    $form.find(this.container).addClass(data.settings.validatingCssClass);
                }
            });
            methods.validate.call($form);
        }, validationDelay ? validationDelay : 200);
    };

    /**
     * Compares two value whatever it objects, arrays or simple types
     * @param val1
     * @param val2
     * @returns boolean
     */
    var isEqual = function(val1, val2) {
        // objects
        if (val1 instanceof Object) {
            return isObjectsEqual(val1, val2)
        }

        // arrays
        if (Array.isArray(val1)) {
            return isArraysEqual(val1, val2);
        }

        // simple types
        return val1 === val2;
    };

    /**
     * Compares two objects
     * @param obj1
     * @param obj2
     * @returns boolean
     */
    var isObjectsEqual = function(obj1, obj2) {
        if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
            return false;
        }

        var keys1 = Object.keys(obj1);
        var keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }

        for (var i = 0; i < keys1.length; i += 1) {
            if (!obj2.hasOwnProperty(keys1[i])) {
                return false;
            }
            if (obj1[keys1[i]] !== obj2[keys1[i]]) {
                return false;
            }
        }

        return true;
    };

    /**
     * Compares two arrays
     * @param arr1
     * @param arr2
     * @returns boolean
     */
    var isArraysEqual = function(arr1, arr2) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
            return false;
        }

        if (arr1.length !== arr2.length) {
            return false;
        }
        for (var i = 0; i < arr1.length; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    };

    /**
     * Returns an array prototype with a shortcut method for adding a new deferred.
     * The context of the callback will be the deferred object so it can be resolved like ```this.resolve()```
     * @returns Array
     */
    var deferredArray = function () {
        var array = [];
        array.add = function(callback) {
            this.push(new $.Deferred(callback));
        };
        return array;
    };

    var buttonOptions = ['action', 'target', 'method', 'enctype'];

    /**
     * Returns current form options
     * @param $form
     * @returns object Object with button of form options
     */
    var getFormOptions = function ($form) {
        var attributes = {};
        for (var i = 0; i < buttonOptions.length; i++) {
            attributes[buttonOptions[i]] = $form.attr(buttonOptions[i]);
        }

        return attributes;
    };

    /**
     * Applies temporary form options related to submit button
     * @param $form the form jQuery object
     * @param $button the button jQuery object
     */
    var applyButtonOptions = function ($form, $button) {
        for (var i = 0; i < buttonOptions.length; i++) {
            var value = $button.attr('form' + buttonOptions[i]);
            if (value) {
                $form.attr(buttonOptions[i], value);
            }
        }
    };

    /**
     * Restores original form options
     * @param $form the form jQuery object
     */
    var restoreButtonOptions = function ($form) {
        var data = $form.data('yiiActiveForm');

        for (var i = 0; i < buttonOptions.length; i++) {
            $form.attr(buttonOptions[i], data.options[buttonOptions[i]] || null);
        }
    };

    /**
     * Updates the error messages and the input containers for all applicable attributes
     * @param $form the form jQuery object
     * @param messages array the validation error messages
     * @param submitting whether this method is called after validation triggered by form submission
     */
    var updateInputs = function ($form, messages, submitting) {
        var data = $form.data('yiiActiveForm');

        if (data === undefined) {
            return false;
        }

        var errorAttributes = [], $input;
        $.each(data.attributes, function () {
            var hasError = (submitting && updateInput($form, this, messages)) || (!submitting && attrHasError($form, this, messages));
            $input = findInput($form, this);

            if (!$input.is(":disabled") && !this.cancelled && hasError) {
                errorAttributes.push(this);
            }
        });

        $form.trigger(events.afterValidate, [messages, errorAttributes]);

        if (submitting) {
            updateSummary($form, messages);
            if (errorAttributes.length) {
                if (data.settings.scrollToError) {
                    var top = $form.find($.map(errorAttributes, function(attribute) {
                        return attribute.input;
                    }).join(',')).first().closest(':visible').offset().top - data.settings.scrollToErrorOffset;
                    if (top < 0) {
                        top = 0;
                    } else if (top > $(document).height()) {
                        top = $(document).height();
                    }
                    var wtop = $(window).scrollTop();
                    if (top < wtop || top > wtop + $(window).height()) {
                        $(window).scrollTop(top);
                    }
                }
                data.submitting = false;
            } else {
                data.validated = true;
                if (data.submitObject) {
                    applyButtonOptions($form, data.submitObject);
                }
                $form.submit();
                if (data.submitObject) {
                    restoreButtonOptions($form);
                }
            }
        } else {
            $.each(data.attributes, function () {
                if (!this.cancelled && (this.status === 2 || this.status === 3)) {
                    updateInput($form, this, messages);
                }
            });
        }
        submitFinalize($form);
    };

    /**
     * Updates hidden field that represents clicked submit button.
     * @param $form the form jQuery object.
     */
    var updateHiddenButton = function ($form) {
        var data = $form.data('yiiActiveForm');
        var $button = data.submitObject || $form.find(':submit:first');
        // TODO: if the submission is caused by "change" event, it will not work
        if ($button.length && $button.attr('type') == 'submit' && $button.attr('name')) {
            // simulate button input value
            var $hiddenButton = $('input[type="hidden"][name="' + $button.attr('name') + '"]', $form);
            if (!$hiddenButton.length) {
                $('<input>').attr({
                    type: 'hidden',
                    name: $button.attr('name'),
                    value: $button.attr('value')
                }).appendTo($form);
            } else {
                $hiddenButton.attr('value', $button.attr('value'));
            }
        }
    };

    /**
     * Updates the error message and the input container for a particular attribute.
     * @param $form the form jQuery object
     * @param attribute object the configuration for a particular attribute.
     * @param messages array the validation error messages
     * @return boolean whether there is a validation error for the specified attribute
     */
    var updateInput = function ($form, attribute, messages) {
        var data = $form.data('yiiActiveForm'),
            $input = findInput($form, attribute),
            hasError = attrHasError($form, attribute, messages);

        if (!$.isArray(messages[attribute.id])) {
            messages[attribute.id] = [];
        }

        attribute.status = 1;
        if ($input.length) {
            var $container = $form.find(attribute.container);
            var $error = $container.find(attribute.error);
            updateAriaInvalid($form, attribute, hasError);

            var $errorElement = data.settings.validationStateOn === 'input' ? $input : $container;

            if (hasError) {
                if (attribute.encodeError) {
                    $error.text(messages[attribute.id][0]);
                } else {
                    $error.html(messages[attribute.id][0]);
                }
                $errorElement.removeClass(data.settings.validatingCssClass + ' ' + data.settings.successCssClass)
                  .addClass(data.settings.errorCssClass);
            } else {
                $error.empty();
                $errorElement.removeClass(data.settings.validatingCssClass + ' ' + data.settings.errorCssClass + ' ')
                  .addClass(data.settings.successCssClass);
            }
            attribute.value = getValue($form, attribute);
        }

        $form.trigger(events.afterValidateAttribute, [attribute, messages[attribute.id]]);

        return hasError;
    };

    /**
     * Checks if a particular attribute has an error
     * @param $form the form jQuery object
     * @param attribute object the configuration for a particular attribute.
     * @param messages array the validation error messages
     * @return boolean whether there is a validation error for the specified attribute
     */
    var attrHasError = function ($form, attribute, messages) {
        var $input = findInput($form, attribute),
            hasError = false;

        if (!$.isArray(messages[attribute.id])) {
            messages[attribute.id] = [];
        }

        if ($input.length) {
            hasError = messages[attribute.id].length > 0;
        }

        return hasError;
    };

    /**
     * Updates the error summary.
     * @param $form the form jQuery object
     * @param messages array the validation error messages
     */
    var updateSummary = function ($form, messages) {
        var data = $form.data('yiiActiveForm'),
            $summary = $form.find(data.settings.errorSummary),
            $ul = $summary.find('ul').empty();

        if ($summary.length && messages) {
            $.each(data.attributes, function () {
                if ($.isArray(messages[this.id]) && messages[this.id].length) {
                    var error = $('<li/>');
                    if (data.settings.encodeErrorSummary) {
                        error.text(messages[this.id][0]);
                    } else {
                        error.html(messages[this.id][0]);
                    }
                    $ul.append(error);
                }
            });
            $summary.toggle($ul.find('li').length > 0);
        }
    };

    var getValue = function ($form, attribute) {
        var $input = findInput($form, attribute);
        var type = $input.attr('type');
        if (type === 'checkbox' || type === 'radio') {
            var $realInput = $input.filter(':checked');
            if ($realInput.length > 1) {
                var values = [];
                $realInput.each(function(index) {
                    values.push($($realInput.get(index)).val());
                });
                return values;
            }

            if (!$realInput.length) {
                $realInput = $form.find('input[type=hidden][name="' + $input.attr('name') + '"]');
            }

            return $realInput.val();
        } else {
            return $input.val();
        }
    };

    var findInput = function ($form, attribute) {
        var $input = $form.find(attribute.input);
        if ($input.length && $input[0].tagName.toLowerCase() === 'div') {
            // checkbox list or radio list
            return $input.find('input');
        } else {
            return $input;
        }
    };

    var updateAriaInvalid = function ($form, attribute, hasError) {
        if (attribute.updateAriaInvalid) {
            $form.find(attribute.input).attr('aria-invalid', hasError ? 'true' : 'false');
        }
    }
})(jQuery);

/**
 * Yii Captcha widget.
 *
 * This is the JavaScript widget used by the yii\captcha\Captcha widget.
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
(function ($) {
    $.fn.yiiCaptcha = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist in jQuery.yiiCaptcha');
            return false;
        }
    };

    var defaults = {
        refreshUrl: undefined,
        hashKey: undefined
    };

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $e = $(this);
                var settings = $.extend({}, defaults, options || {});
                $e.data('yiiCaptcha', {
                    settings: settings
                });

                $e.on('click.yiiCaptcha', function () {
                    methods.refresh.apply($e);
                    return false;
                });
            });
        },

        refresh: function () {
            var $e = this,
                settings = this.data('yiiCaptcha').settings;
            $.ajax({
                url: $e.data('yiiCaptcha').settings.refreshUrl,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    $e.attr('src', data.url);
                    $('body').data(settings.hashKey, [data.hash1, data.hash2]);
                }
            });
        },

        destroy: function () {
            this.off('.yiiCaptcha');
            this.removeData('yiiCaptcha');
            return this;
        },

        data: function () {
            return this.data('yiiCaptcha');
        }
    };
})(jQuery);

/**
 * Yii GridView widget.
 *
 * This is the JavaScript widget used by the yii\grid\GridView widget.
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
(function ($) {
    $.fn.yiiGridView = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist in jQuery.yiiGridView');
            return false;
        }
    };

    var defaults = {
        filterUrl: undefined,
        filterSelector: undefined,
        filterOnFocusOut: true
    };

    var gridData = {};

    var gridEvents = {
        /**
         * beforeFilter event is triggered before filtering the grid.
         * The signature of the event handler should be:
         *     function (event)
         * where
         *  - event: an Event object.
         *
         * If the handler returns a boolean false, it will stop filter form submission after this event. As
         * a result, afterFilter event will not be triggered.
         */
        beforeFilter: 'beforeFilter',
        /**
         * afterFilter event is triggered after filtering the grid and filtered results are fetched.
         * The signature of the event handler should be:
         *     function (event)
         * where
         *  - event: an Event object.
         */
        afterFilter: 'afterFilter'
    };

    /**
     * Used for storing active event handlers and removing them later.
     * The structure of single event handler is:
     *
     * {
     *     gridViewId: {
     *         type: {
     *             event: '...',
     *             selector: '...'
     *         }
     *     }
     * }
     *
     * Used types:
     *
     * - filter, used for filtering grid with elements found by filterSelector
     * - checkRow, used for checking single row
     * - checkAllRows, used for checking all rows with according "Check all" checkbox
     *
     * event is the name of event, for example: 'change.yiiGridView'
     * selector is a jQuery selector for finding elements
     *
     * @type {{}}
     */
    var gridEventHandlers = {};

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $e = $(this);
                var settings = $.extend({}, defaults, options || {});
                var id = $e.attr('id');
                if (gridData[id] === undefined) {
                    gridData[id] = {};
                }

                gridData[id] = $.extend(gridData[id], {settings: settings});

                var filterEvents = 'change.yiiGridView keydown.yiiGridView';
                var enterPressed = false;
                initEventHandler($e, 'filter', filterEvents, settings.filterSelector, function (event) {
                    if (event.type === 'keydown') {
                        if (event.keyCode !== 13) {
                            return; // only react to enter key
                        } else {
                            enterPressed = true;
                        }
                    } else {
                        // prevent processing for both keydown and change events
                        if (enterPressed) {
                            enterPressed = false;
                            return;
                        }
                    }
                    if (!settings.filterOnFocusOut && event.type !== 'keydown') {
                        return false;
                    }

                    methods.applyFilter.apply($e);

                    return false;
                });
            });
        },

        applyFilter: function () {
            var $grid = $(this);
            var settings = gridData[$grid.attr('id')].settings;
            var data = {};
            $.each($(settings.filterSelector).serializeArray(), function () {
                if (!(this.name in data)) {
                    data[this.name] = [];
                }
                data[this.name].push(this.value);
            });

            var namesInFilter = Object.keys(data);

            $.each(yii.getQueryParams(settings.filterUrl), function (name, value) {
                if (namesInFilter.indexOf(name) === -1 && namesInFilter.indexOf(name.replace(/\[\d*\]$/, '')) === -1) {
                    if (!$.isArray(value)) {
                        value = [value];
                    }
                    if (!(name in data)) {
                        data[name] = value;
                    } else {
                        $.each(value, function (i, val) {
                            if ($.inArray(val, data[name])) {
                                data[name].push(val);
                            }
                        });
                    }
                }
            });

            var pos = settings.filterUrl.indexOf('?');
            var url = pos < 0 ? settings.filterUrl : settings.filterUrl.substring(0, pos);
            var hashPos = settings.filterUrl.indexOf('#');
            if (pos >= 0 && hashPos >= 0) {
                url += settings.filterUrl.substring(hashPos);
            }

            $grid.find('form.gridview-filter-form').remove();
            var $form = $('<form/>', {
                action: url,
                method: 'get',
                'class': 'gridview-filter-form',
                style: 'display:none',
                'data-pjax': ''
            }).appendTo($grid);
            $.each(data, function (name, values) {
                $.each(values, function (index, value) {
                    $form.append($('<input/>').attr({type: 'hidden', name: name, value: value}));
                });
            });

            var event = $.Event(gridEvents.beforeFilter);
            $grid.trigger(event);
            if (event.result === false) {
                return;
            }

            $form.submit();

            $grid.trigger(gridEvents.afterFilter);
        },

        setSelectionColumn: function (options) {
            var $grid = $(this);
            var id = $(this).attr('id');
            if (gridData[id] === undefined) {
                gridData[id] = {};
            }
            gridData[id].selectionColumn = options.name;
            if (!options.multiple || !options.checkAll) {
                return;
            }
            var checkAll = "#" + id + " input[name='" + options.checkAll + "']";
            var inputs = options['class'] ? "input." + options['class'] : "input[name='" + options.name + "']";
            var inputsEnabled = "#" + id + " " + inputs + ":enabled";
            initEventHandler($grid, 'checkAllRows', 'click.yiiGridView', checkAll, function () {
                $grid.find(inputs + ":enabled").prop('checked', this.checked).change();
            });
            initEventHandler($grid, 'checkRow', 'click.yiiGridView', inputsEnabled, function () {
                var all = $grid.find(inputs).length == $grid.find(inputs + ":checked").length;
                $grid.find("input[name='" + options.checkAll + "']").prop('checked', all).change();
            });
        },

        getSelectedRows: function () {
            var $grid = $(this);
            var data = gridData[$grid.attr('id')];
            var keys = [];
            if (data.selectionColumn) {
                $grid.find("input[name='" + data.selectionColumn + "']:checked").each(function () {
                    keys.push($(this).parent().closest('tr').data('key'));
                });
            }

            return keys;
        },

        destroy: function () {
            var events = ['.yiiGridView', gridEvents.beforeFilter, gridEvents.afterFilter].join(' ');
            this.off(events);

            var id = $(this).attr('id');
            $.each(gridEventHandlers[id], function (type, data) {
                $(document).off(data.event, data.selector);
            });

            delete gridData[id];

            return this;
        },

        data: function () {
            var id = $(this).attr('id');
            return gridData[id];
        }
    };

    /**
     * Used for attaching event handler and prevent of duplicating them. With each call previously attached handler of
     * the same type is removed even selector was changed.
     * @param {jQuery} $gridView According jQuery grid view element
     * @param {string} type Type of the event which acts like a key
     * @param {string} event Event name, for example 'change.yiiGridView'
     * @param {string} selector jQuery selector
     * @param {function} callback The actual function to be executed with this event
     */
    function initEventHandler($gridView, type, event, selector, callback) {
        var id = $gridView.attr('id');
        var prevHandler = gridEventHandlers[id];
        if (prevHandler !== undefined && prevHandler[type] !== undefined) {
            var data = prevHandler[type];
            $(document).off(data.event, data.selector);
        }
        if (prevHandler === undefined) {
            gridEventHandlers[id] = {};
        }
        $(document).on(event, selector, callback);
        gridEventHandlers[id][type] = {event: event, selector: selector};
    }
})(window.jQuery);

/**
 * Yii validation module.
 *
 * This JavaScript module provides the validation methods for the built-in validators.
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */

yii.validation = (function ($) {
    var pub = {
        isEmpty: function (value) {
            return value === null || value === undefined || ($.isArray(value) && value.length === 0) || value === '';
        },

        addMessage: function (messages, message, value) {
            messages.push(message.replace(/\{value\}/g, value));
        },

        required: function (value, messages, options) {
            var valid = false;
            if (options.requiredValue === undefined) {
                var isString = typeof value == 'string' || value instanceof String;
                if (options.strict && value !== undefined || !options.strict && !pub.isEmpty(isString ? $.trim(value) : value)) {
                    valid = true;
                }
            } else if (!options.strict && value == options.requiredValue || options.strict && value === options.requiredValue) {
                valid = true;
            }

            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        // "boolean" is a reserved keyword in older versions of ES so it's quoted for IE < 9 support
        'boolean': function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }
            var valid = !options.strict && (value == options.trueValue || value == options.falseValue)
                || options.strict && (value === options.trueValue || value === options.falseValue);

            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        string: function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            if (typeof value !== 'string') {
                pub.addMessage(messages, options.message, value);
                return;
            }

            if (options.is !== undefined && value.length != options.is) {
                pub.addMessage(messages, options.notEqual, value);
                return;
            }
            if (options.min !== undefined && value.length < options.min) {
                pub.addMessage(messages, options.tooShort, value);
            }
            if (options.max !== undefined && value.length > options.max) {
                pub.addMessage(messages, options.tooLong, value);
            }
        },

        file: function (attribute, messages, options) {
            var files = getUploadedFiles(attribute, messages, options);
            $.each(files, function (i, file) {
                validateFile(file, messages, options);
            });
        },

        image: function (attribute, messages, options, deferredList) {
            var files = getUploadedFiles(attribute, messages, options);
            $.each(files, function (i, file) {
                validateFile(file, messages, options);

                // Skip image validation if FileReader API is not available
                if (typeof FileReader === "undefined") {
                    return;
                }

                var deferred = $.Deferred();
                pub.validateImage(file, messages, options, deferred, new FileReader(), new Image());
                deferredList.push(deferred);
            });
        },

        validateImage: function (file, messages, options, deferred, fileReader, image) {
            image.onload = function() {
                validateImageSize(file, image, messages, options);
                deferred.resolve();
            };

            image.onerror = function () {
                messages.push(options.notImage.replace(/\{file\}/g, file.name));
                deferred.resolve();
            };

            fileReader.onload = function () {
                image.src = this.result;
            };

            // Resolve deferred if there was error while reading data
            fileReader.onerror = function () {
                deferred.resolve();
            };

            fileReader.readAsDataURL(file);
        },

        number: function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            if (typeof value === 'string' && !options.pattern.test(value)) {
                pub.addMessage(messages, options.message, value);
                return;
            }

            if (options.min !== undefined && value < options.min) {
                pub.addMessage(messages, options.tooSmall, value);
            }
            if (options.max !== undefined && value > options.max) {
                pub.addMessage(messages, options.tooBig, value);
            }
        },

        range: function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            if (!options.allowArray && $.isArray(value)) {
                pub.addMessage(messages, options.message, value);
                return;
            }

            var inArray = true;

            $.each($.isArray(value) ? value : [value], function (i, v) {
                if ($.inArray(v, options.range) == -1) {
                    inArray = false;
                    return false;
                } else {
                    return true;
                }
            });

            if (options.not === undefined) {
                options.not = false;
            }

            if (options.not === inArray) {
                pub.addMessage(messages, options.message, value);
            }
        },

        regularExpression: function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            if (!options.not && !options.pattern.test(value) || options.not && options.pattern.test(value)) {
                pub.addMessage(messages, options.message, value);
            }
        },

        email: function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            var valid = true,
                regexp = /^((?:"?([^"]*)"?\s)?)(?:\s+)?(?:(<?)((.+)@([^>]+))(>?))$/,
                matches = regexp.exec(value);

            if (matches === null) {
                valid = false;
            } else {
                var localPart = matches[5],
                    domain = matches[6];

                if (options.enableIDN) {
                    localPart = punycode.toASCII(localPart);
                    domain = punycode.toASCII(domain);

                    value = matches[1] + matches[3] + localPart + '@' + domain + matches[7];
                }

                if (localPart.length > 64) {
                    valid = false;
                } else if ((localPart + '@' + domain).length > 254) {
                    valid = false;
                } else {
                    valid = options.pattern.test(value) || (options.allowName && options.fullPattern.test(value));
                }
            }

            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        url: function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            if (options.defaultScheme && !/:\/\//.test(value)) {
                value = options.defaultScheme + '://' + value;
            }

            var valid = true;

            if (options.enableIDN) {
                var matches = /^([^:]+):\/\/([^\/]+)(.*)$/.exec(value);
                if (matches === null) {
                    valid = false;
                } else {
                    value = matches[1] + '://' + punycode.toASCII(matches[2]) + matches[3];
                }
            }

            if (!valid || !options.pattern.test(value)) {
                pub.addMessage(messages, options.message, value);
            }
        },

        trim: function ($form, attribute, options, value) {
            var $input = $form.find(attribute.input);
            if ($input.is(':checkbox, :radio')) {
                return value;
            }

            value = $input.val();
            if (!options.skipOnEmpty || !pub.isEmpty(value)) {
                value = $.trim(value);
                $input.val(value);
            }

            return value;
        },

        captcha: function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            // CAPTCHA may be updated via AJAX and the updated hash is stored in body data
            var hash = $('body').data(options.hashKey);
            hash = hash == null ? options.hash : hash[options.caseSensitive ? 0 : 1];
            var v = options.caseSensitive ? value : value.toLowerCase();
            for (var i = v.length - 1, h = 0; i >= 0; --i) {
                h += v.charCodeAt(i);
            }
            if (h != hash) {
                pub.addMessage(messages, options.message, value);
            }
        },

        compare: function (value, messages, options, $form) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            var compareValue,
                valid = true;
            if (options.compareAttribute === undefined) {
                compareValue = options.compareValue;
            } else {
                var $target = $('#' + options.compareAttribute);
                if (!$target.length) {
                    $target = $form.find('[name="' + options.compareAttributeName + '"]');
                }
                compareValue = $target.val();
            }

            if (options.type === 'number') {
                value = value ? parseFloat(value) : 0;
                compareValue = compareValue ? parseFloat(compareValue) : 0;
            }
            switch (options.operator) {
                case '==':
                    valid = value == compareValue;
                    break;
                case '===':
                    valid = value === compareValue;
                    break;
                case '!=':
                    valid = value != compareValue;
                    break;
                case '!==':
                    valid = value !== compareValue;
                    break;
                case '>':
                    valid = value > compareValue;
                    break;
                case '>=':
                    valid = value >= compareValue;
                    break;
                case '<':
                    valid = value < compareValue;
                    break;
                case '<=':
                    valid = value <= compareValue;
                    break;
                default:
                    valid = false;
                    break;
            }

            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        ip: function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            var negation = null,
                cidr = null,
                matches = new RegExp(options.ipParsePattern).exec(value);
            if (matches) {
                negation = matches[1] || null;
                value = matches[2];
                cidr = matches[4] || null;
            }

            if (options.subnet === true && cidr === null) {
                pub.addMessage(messages, options.messages.noSubnet, value);
                return;
            }
            if (options.subnet === false && cidr !== null) {
                pub.addMessage(messages, options.messages.hasSubnet, value);
                return;
            }
            if (options.negation === false && negation !== null) {
                pub.addMessage(messages, options.messages.message, value);
                return;
            }

            var ipVersion = value.indexOf(':') === -1 ? 4 : 6;
            if (ipVersion == 6) {
                if (!(new RegExp(options.ipv6Pattern)).test(value)) {
                    pub.addMessage(messages, options.messages.message, value);
                }
                if (!options.ipv6) {
                    pub.addMessage(messages, options.messages.ipv6NotAllowed, value);
                }
            } else {
                if (!(new RegExp(options.ipv4Pattern)).test(value)) {
                    pub.addMessage(messages, options.messages.message, value);
                }
                if (!options.ipv4) {
                    pub.addMessage(messages, options.messages.ipv4NotAllowed, value);
                }
            }
        }
    };

    function getUploadedFiles(attribute, messages, options) {
        // Skip validation if File API is not available
        if (typeof File === "undefined") {
            return [];
        }

        var fileInput = $(attribute.input, attribute.$form).get(0);

        // Skip validation if file input does not exist
        // (in case file inputs are added dynamically and no file input has been added to the form)
        if (typeof fileInput === "undefined") {
            return [];
        }

        var files = fileInput.files;
        if (!files) {
            messages.push(options.message);
            return [];
        }

        if (files.length === 0) {
            if (!options.skipOnEmpty) {
                messages.push(options.uploadRequired);
            }

            return [];
        }

        if (options.maxFiles && options.maxFiles < files.length) {
            messages.push(options.tooMany);
            return [];
        }

        return files;
    }

    function validateFile(file, messages, options) {
        if (options.extensions && options.extensions.length > 0) {
            var index = file.name.lastIndexOf('.');
            var ext = !~index ? '' : file.name.substr(index + 1, file.name.length).toLowerCase();

            if (!~options.extensions.indexOf(ext)) {
                messages.push(options.wrongExtension.replace(/\{file\}/g, file.name));
            }
        }

        if (options.mimeTypes && options.mimeTypes.length > 0) {
            if (!validateMimeType(options.mimeTypes, file.type)) {
                messages.push(options.wrongMimeType.replace(/\{file\}/g, file.name));
            }
        }

        if (options.maxSize && options.maxSize < file.size) {
            messages.push(options.tooBig.replace(/\{file\}/g, file.name));
        }

        if (options.minSize && options.minSize > file.size) {
            messages.push(options.tooSmall.replace(/\{file\}/g, file.name));
        }
    }

    function validateMimeType(mimeTypes, fileType) {
        for (var i = 0, len = mimeTypes.length; i < len; i++) {
            if (new RegExp(mimeTypes[i]).test(fileType)) {
                return true;
            }
        }

        return false;
    }

    function validateImageSize(file, image, messages, options) {
        if (options.minWidth && image.width < options.minWidth) {
            messages.push(options.underWidth.replace(/\{file\}/g, file.name));
        }

        if (options.maxWidth && image.width > options.maxWidth) {
            messages.push(options.overWidth.replace(/\{file\}/g, file.name));
        }

        if (options.minHeight && image.height < options.minHeight) {
            messages.push(options.underHeight.replace(/\{file\}/g, file.name));
        }

        if (options.maxHeight && image.height > options.maxHeight) {
            messages.push(options.overHeight.replace(/\{file\}/g, file.name));
        }
    }

    return pub;
})(jQuery);

// @ts-nocheck
(function($){
    'use strict';
var VghCheckBoxs = function(){
	this.classChecked = 'checkbox-checked rippleed';
	var self = this;
	var $element = $('.vgh-checkbox');

	$element.each(function(i,checkbox){
		var $checkbox = $(checkbox);
		var $input = $checkbox.find('input[type="checkbox"]');

		if ( $input.length > 0 ) {
			var ID = $input.attr('id')
			$checkbox.attr({for:ID}).find('.checkbox-label').attr({for:ID});

			$input.on('change',function(e){
				// e.preventDefault();
				// e.stopImmediatePropagation();

				if ( $input.is(':checked') ) {
					self.add($checkbox).checkeds().rippleed()
					self.delay().then(() => self.remove($checkbox).rippleed());
					$(this).attr({checked:true,value:'1'})				
					return;
				}

				$(this).attr({checked:false,value:'0'})				
				self.add($checkbox).rippleed()
				self.remove($checkbox).checkeds()
				self.delay().then(() => self.remove($checkbox).rippleed());					

			});
		}

		if ( $input.is(':checked')) {
			$input.attr({value:'1'})
			self.add($checkbox).checkeds().rippleed();
			self.delay().then(() => self.remove($checkbox).rippleed());	
		}

		$checkbox.find('.checkbox-label').on('click',function(e){
		}).on('hover',function(e){})

	});

}

var _proto = VghCheckBoxs.prototype;
_proto.init = function(){}

_proto.delay = function(ms){
	var _ms = typeof ms === 'undefined' ? 1000 : ms;
	return new Promise(resolve => setTimeout(resolve, _ms));	
}

_proto.add = function($checkbox){
	var self = this;
	var $input = $checkbox.find('input[type="checkbox"]')
	var options = {
		checkeds:function(){
			$checkbox.addClass('checkbox-checked')
			$input.attr({checked:true})
			return this;
		},
		rippleed:function(){
			$checkbox.addClass('rippleed')
			return this
		}
	};
	return options
}

_proto.remove = function($checkbox){
	var self = this;
	var $input = $checkbox.find('input[type="checkbox"]')
	var options = {
		checkeds:function(){
			$checkbox.removeClass('checkbox-checked');
			$input.removeAttr('checked');
			return this;
		},
		rippleed:function(){
			$checkbox.removeClass('rippleed')
			return this;
		}
	};
	return options
}

var vghCheckboxs = new VghCheckBoxs();
$(document).on('show.bs.modal',function(e){
	vghCheckboxs.delay(1000).then(() => { var vghCheckboxs = new VghCheckBoxs() })
})
//=============== END VGHCHECKBOXS
//=================================================
var SwitchSlideToggles = function(){
	var self = this;
	var $element = $('.toggle-switch');

	$element.each(function(i,checkbox){
		var $toggle = $(checkbox);
		var $input = $toggle.find('input[type="checkbox"]');
		var slide = self.get.call(checkbox)

		if ( $input.length > 0 ) {
			var ID = $input.attr('id')
			$toggle.find('.slide-toggle-thumb').attr({for:ID});
			$toggle.find('.toggle-switch-label').attr({for:ID});

			$input.on('change',function(e){
				// e.preventDefault();
				// e.stopImmediatePropagation();

				if ( $input.is(':checked') ) {
					slide.$element().addClass('checked');
					slide.container().addClass('checked');
					slide.thumb().addClass('checked');
					slide.ripple().css({opacity:'.4'}).addClass('mouseover');
					slide.input().attr({checked:true,value:'1'});
					self.delay().then(() => {slide.ripple().removeAttr('style').removeClass('mouseover') });					
					return;
				}
				slide.$element().removeClass('checked');
				slide.container().removeClass('checked');
				slide.thumb().removeClass('checked');
				slide.ripple().css({opacity:'.4'}).addClass('mouseover');
				slide.input().attr({checked:false,value:'0'});
				self.delay().then(() => {slide.ripple().removeAttr('style').removeClass('mouseover') });
			});
		}

		if ( $input.is(':checked')) {

			slide.$element().addClass('checked');
			slide.container().addClass('checked');
			slide.thumb().addClass('checked');
			slide.ripple().css({opacity:'.4'}).addClass('mouseover');
			slide.input().attr({checked:true,value:'1'});
			self.delay().then(() => {slide.ripple().removeAttr('style').removeClass('mouseover') });
		}

	});
}

var _proto = SwitchSlideToggles.prototype;
_proto.init = function(){}
_proto.delay = function(ms){
	var _ms = typeof ms === 'undefined' ? 1000 : ms;
	return new Promise(resolve => setTimeout(resolve, _ms));	
}

_proto.get = function(){
	var _this = $(this)
	var o = {
		$element : function(){
			return _this;
		},
		container : function(){
			return _this.find('.slide-toggle-thumb-container');
		},
		thumb : function(){
			return _this.find('.slide-toggle-thumb');
		},
		ripple : function(){
			return _this.find('.slide-toggle-ripple')
		},
		input : function(){
			var name = _this.find('input[type="checkbox"]').attr('name')
			return _this.find('input[type="checkbox"],input[type="hidden"][name=\"'+name+'\"]')
		}
	}
	return o;
}

var slideToggle = new SwitchSlideToggles();
$(document).on('show.bs.modal',function(e){
	slideToggle.delay(1000).then(() => { var slideToggle = new SwitchSlideToggles() })
})
//=============== END SWITCHSLIDETOGGLES
//=================================================
})(window.jQuery); 
(function($){
    'use strict';

	var delay = function(ms){
		var _ms = typeof ms === 'undefined' ? 700 : ms;
		return new Promise(resolve => setTimeout(resolve, _ms));
	};

	var MaskMoneyOption = function($element,option){
		this.$element = $element
		this.option = typeof option !== 'object' ? {} : option
		this.$field = $element.closest('.field-' + $element.attr('id'))
		this.init();
	}

	MaskMoneyOption.prototype = {
		constructor:MaskMoneyOption,

		init:function(){
			var self = this
			this.$element.maskMoney(this.option)
			this.field();
		},

		field:function(){
			var self = this

			this.$element
			.on('click.maskMoney',function(e){
				if ( self.$field.hasClass('has-error') ) {
					self.$field.removeClass('has-error').find('.help-block-error').empty()
				}
			})
			.on('blur.maskMoney',function(e){
				if ( $(this).val().length == 0 ) {
					self.$field.find('.textfield').removeClass('textfield-floating-label-completed')
				}
			})
		},
	};

	function initialize(){
		$('.form-control.maskmoney').each(function(i,input){
			var $input = $(input);
			var data = $input.data();
			var maskMoney = new MaskMoneyOption($input,data)
		}); 
	}
	// initialize();

	// delay(1000).then(() => {})
	// $(document).on('show.bs.modal',function(e){
	// 	delay(1000).then(() => {initialize() })
	// })
})(window.jQuery); 
// @ts-nocheck

(function($){

"use strict";

var TAG = 'Modal';

function nullOrEmpty(value){
	return value == undefined || value.length == 0;
}

function delay(ms){
	var _ms = typeof ms === 'undefined' ? 700 : ms;
	return new Promise(resolve => setTimeout(resolve, _ms));
}

class ModalData{
    constructor(options){
    	this.data = options;
    }

    own(name){
    	return this.data.hasOwnProperty(name) ? this.data[name] : null;
    }

    get target(){
    	return this.own('target');
    }

    get title(){
    	return this.own('title');
    }

    get url(){
    	return this.own('url');
    }

    get icon(){
    	return this.own('icon');
    }

}

class ModalButtonCLose{
    constructor(){}
}

class ModalHeader{
    constructor($modal){
    	this.$title = $modal.find('.modal-header .header-title')
    }
}

class Event{
    constructor(){}

    static afterShow(options){
    	$(document).trigger('afterShow.bs.modal',[options])
    }

    static afterHide(options){
    	$(document).trigger('afterHide.bs.modal',[options])
    }

    static beforeShow(options){
    	$(document).trigger('beforeShow.bs.modal',[options])
    }
}

//
class ModalCenterStatic {
    constructor($element){
    	this.$element = $element;
    	this.$data = new ModalData($element.data());
    	this.$modal = $('#modal-center-static')
    	this.$header = new ModalHeader(this.$modal);
    	this.$body = this.$modal.find('.modal-body');

    	var self = this;
    	this.$element.get(0).addEventListener('click',(e) => {
    		e.preventDefault();
    		Event.beforeShow(self.$data);
    		self.onShow();
    		delay(500).then(() => {
    			Event.afterShow(self.$data);
    		})
    	})
    }

    onShow(){
        var self = this;

        console.log(this.$modal);
        this.$header.$title.text(this.$data.title)
        this.$body.load(this.$data.url)
        this.$modal.modal('show');
        this.onHide();
    }

    onHide(){
    	var self = this;
	    this.$modal.on('hidden.bs.modal',function(e){
	        self.$header.$title.empty()
	        self.$body.empty();
	        Event.afterHide(self.$data);
	    }) 
    }

    static validate(){
    	return true;
    }

    static instance(){
    	if (ModalCenterStatic.validate()) {
    		$('[data-toggle="modal"][data-target="modal-center-static"]').each(function(i, element) {
    			var self = new ModalCenterStatic($(element));
    		});
    	}
    }
}
ModalCenterStatic.instance();
//

class ModalStatics {
    constructor($element){
    	this.$element = $element;
    	this.$data = new ModalData($element.data());
    	this.$modal = $('#modal-bottom-static')
    	this.$header = new ModalHeader(this.$modal);
    	this.$body = this.$modal.find('.modal-body');

    	var self = this;
    	this.$element.get(0).addEventListener('click',(e) => {
    		e.preventDefault();
    		Event.beforeShow(self.$data);
    		self.onShow();
    		delay(500).then(() => {
    			Event.afterShow(self.$data);
    		})
    	})
    }

    onShow(){
        var self = this;
        this.$header.$title.text(this.$data.title)
        this.$body.load(this.$data.url)
        this.$modal.modal('show');
        this.onHide();
    }

    onHide(){
    	var self = this;
	    this.$modal.on('hidden.bs.modal',function(e){
	        self.$header.$title.empty()
	        self.$body.empty();
	        Event.afterHide(self.$data);
	    }) 
    }

    static validate(){
    	return true;
    }

    static instance(){
    	if (ModalStatics.validate()) {
    		$('[data-toggle="modal"][data-target="modal-bottom-static"]').each(function(i, element) {
    			var self = new ModalStatics($(element));
    		});
    	}
    }
}

ModalStatics.instance();
})(jQuery); 



(function($){

"use strict";

var TAG = 'MoneyInput';
var ELEMENT = $('.form-control.money-input');

var delay = function(ms,cb){
    var _ms = typeof ms === 'undefined' ? 700 : ms;
    var fn = new Promise(resolve => setTimeout(resolve, _ms));
    return fn.then(cb)
};

class Attribute{

}

Number.prototype.numberFormat = function(decimals, dec_point, thousands_sep) {
    dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
    thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

    var parts = this.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

    return parts.join(dec_point);
}

class Events{
    constructor() {}

    onCreate(){
    	var self = this;
        
    	this.$element
            .on('keydown',function(e){
                delay(500,() => {
                    var val1,val2,val3;
                    val1 = $(this).val().replace(/[^\d]/g, "");
                    val2 = isNaN(parseInt(val1)) ? '' : parseInt(val1).numberFormat(0)
                    $(this).val(val2 );
                    self.onComplete();

                })                
            })
            .on('change',function(e){
                delay(500,() => {
                    self.onComplete();
                })
        	})
            .on('completed',function(){
        		self.onComplete();
            });
    }

    onComplete(){
    	var value,textfield,values;
    	value = this.$element.val().replace(/[^0-9]/g, '');
    	textfield = this.$element.closest('.textfield')
    	textfield.find('input[type="hidden"][name]').val(value);
    }
}

class MoneyInput extends Events {
    constructor() {
        super();
        this.$element = $('.form-control.money-input');
        super.onCreate();
        this.runElement();
        // console.log(TAG);
    }

    runElement(){
    	var self = this;
        if (this.$element.val().length > 0 ) {
        	self.$element.trigger('keydown')
        }
    }

    static validate(){
        var exist = $(ELEMENT).length > 0;
        var exist2 = $('body .form-control.money-input').length > 0;
    	return exist || exist2;
    }

    static instance(){

    	if (MoneyInput.validate()) {

    		var self = new MoneyInput();
    		return self;
    	}
    }
}

MoneyInput.instance();
$(document).on('afterShow.bs.modal',function(e,data){
    MoneyInput.instance();
});

})(window.jQuery); 


(function ($) {
    'use strict';

var TAG = 'PasswordVisibility';

class ModelPasswordVisibility {
    constructor(){

    }

    get $element(){
        return $('input.form-control[type="password"]').closest('.input-group').find('.password-visibility')
    }

    onVisibility($element){
    	$element.closest('.input-group').find('input.form-control[type="text"]')
    		.attr({
    			type:'password',
    		})
    	$element.find('.material-icons').text('visibility')
    }

    onNoVisibility($element){
    	$element.closest('.input-group').find('input.form-control[type="password"]')
    		.attr({
    			type:'text',
    		})
    	$element.find('.material-icons').text('visibility_off')    	
    }

}

class PasswordVisibility extends ModelPasswordVisibility {

    constructor(){
        super();
        this.init();
        var self = this;
        $(document).on('afterShow.bs.modal',function(e){
            self.init()
        })
        // console.log(TAG)
    }

    init(){
    	var self = this;
        this.$element.each(function(i,element){
            var $element = $(element)
            $element.on('click',function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                $(this).toggleClass('visibility')

            	if ($(this).hasClass('visibility')) {
            		self.onVisibility($(this))

            	}else {
            		self.onNoVisibility($(this))
            	}

            });
        })    	
    }
}
var passwordvisibility = new PasswordVisibility();

})(window.jQuery);
(function($){
    'use strict';

var VghRadioButton = function(){
	var self = this;
	var $element = $('.vgh-radio');
	$element.each(function(i,radio){
		var $radio = $(radio);
		var $input = $radio.find('input[type="radio"][id]');

		if ( $input.length > 0 ) {
			$input
			.on('change',function(e){
				self.onChange($(this))
			})
		}

		if ( $input.is(':checked')) {
			self.onChange($input)
		}

		$radio.find('.checkbox-label').on('click',function(e){
			self.onChange($input)
			self.radioHovered($input)
		})

	});

}

var _proto = VghRadioButton.prototype;
_proto.init = function(){}

_proto.delay = function(ms){
	var _ms = typeof ms === 'undefined' ? 700 : ms;
	return new Promise(resolve => setTimeout(resolve, _ms));	
}
_proto.onReset = function($input){
}
_proto.onChange = function($inputTarget){
	var $radio = $('input[type="radio"][name=\"'+$inputTarget.attr('name')+'\"]')
	$inputTarget.prop("checked", true);
	if ( typeof $radio == 'object' && $radio.length > 0 ) {

		$radio.each(function(i,input){
			var $input = $(input)
			if ( $input.val() != $inputTarget.val() ) {
				$input.prop("checked",false);
				$input.closest('.vgh-radio').removeClass('radio-checked');
			}
		});
	}

	this.ripple($inputTarget)
	this.onChecked($inputTarget)
}

_proto.radioHovered = function($input){
	var hovered = 'radio-hovered';
	var $ripple = $input.closest('.vgh-radio').find('.radio-ripple');
	$ripple.addClass(hovered)
	this.delay(2000).then(() => $ripple.removeClass(hovered) );
}

_proto.onChecked = function($input,param){
	var $radio = typeof param == 'undefined' ? $input.closest('.vgh-radio').addClass('radio-checked') : $input.closest('.vgh-radio').removeClass('radio-checked');
}

_proto.ripple = function($input){
	var focused = 'radio-focused';
	var $ripple = $input.closest('.vgh-radio').find('.radio-ripple');
	$ripple.addClass(focused)
	this.delay().then(() => $ripple.removeClass(focused) )
}

var vghradio = new VghRadioButton();

$(document).on('show.bs.modal',function(e){
	vghradio.delay(1000).then(() => { var vghradio = new VghRadioButton() })
})
})(window.jQuery);
// @ts-nocheck
"use strict";
// ater remove only completion "/Users/thrubus/@types/index.ts"

var TAG = 'RadioCheckbox';
const ELEMENT = '.radio-checkbox';
function delay(ms){
	var _ms = typeof ms === 'undefined' ? 700 : ms;
	return new Promise(resolve => setTimeout(resolve, _ms));
}
const svgWrap = ''
    + '<div class="svg-wrap">'
    + '    <svg class="radio-svg-outer" focusable="false" viewBox="0 0 24 24" aria-hidden="true"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path> </svg>'
    + '    <svg class="radio-svg-inner" focusable="false" viewBox="0 0 24 24" aria-hidden="true"> <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path> </svg>'
    + '</div>';

class RadioCheckbox {

    constructor($element,option){
    	this.$element = $element;
        this.option = option;
        this.$element.find('.radio-checkbox-container').append(svgWrap)
        this.$element.find('input[type="checkbox"]').on('change',(e) => {
            const input = e.target;
            this.#onChangeInput(input)
        })
    }

    #onChangeInput(input){
        const $input = $(input);
        if($(input).prop('checked')){
            $input.closest(ELEMENT).addClass('checked');
            this.#setRadioRipple(input);
        }
        else
        {
            $input.closest(ELEMENT).removeClass('checked');
            this.#setRadioRipple(input);
        }
        
    }

    #setRadioRipple(input){
        const className = 'ripple';
        $(input).closest(ELEMENT).addClass(className);
        delay(500).then(() => {
            $(input).closest(ELEMENT).removeClass(className);
        })
    }

    static validate(){
        return $(ELEMENT).length > 0;
    }

    static intance(){ 
        if(RadioCheckbox.validate()){
            $(ELEMENT).each((i,element) => {
                new RadioCheckbox($(element),$(element).data())
            });
        }
    }

}
RadioCheckbox.intance();
(function($, window, document) {'use strict';

	var Selector = {
        PARENT_SELECTOR: '',
        RIPPLE_EFFECT: ".ripple-effect",
        INK: '.ink'
    };
    
	var ClassName = {
        ANIMATE: "animate"
    };
    
	var Event = {
        MOUSEDOWN: 'mousedown',
        TOUCHSTART: 'touchstart',
    };
    
	var Template = {
        SPAN: "<span class='ink'></span>"
    };

	/**
	 * ------------------------------------------------------------------------
	 * Functions
	 * ------------------------------------------------------------------------
	 */

	function onMouseDown(e) {
		var rippler = $(e.target);
		$(Selector.INK).remove();
		// create .ink element if it doesn't exist
		if (rippler.find(Selector.INK).length === 0) {
			rippler.append(Template.SPAN);
		}
		var ink = rippler.find(Selector.INK);
		// prevent quick double clicks
		ink.removeClass(ClassName.ANIMATE);
		// set .ink diametr
		if (!ink.height() && !ink.width()) {
			var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
			ink.css({ height: d, width: d });
		}
		// get click coordinates
		var x = e.pageX - rippler.offset().left - ink.width() / 2;
		var y = e.pageY - rippler.offset().top - ink.height() / 2;
		// set .ink position and add class .animate
		ink.css({
			top: y + 'px',
			left: x + 'px'
		}).addClass(ClassName.ANIMATE);

		setTimeout(function () {
			ink.remove();
		}, 1500);
	}

	$(document).on(Event.MOUSEDOWN+" "+Event.TOUCHSTART, Selector.RIPPLE_EFFECT,onMouseDown);
})(jQuery, window, document);

(function($){

"use strict";

var TAG = 'TextCustomPlaceholder';

let $StopEvent = function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
}

function delay(ms){
    var _ms = typeof ms === 'undefined' ? 1000 : ms;
    return new Promise((resolve, reject) => {setTimeout(() => {resolve(this); }, _ms); });
}

class TextCustomPlaceholder{

    constructor($element){
    	this.$element = $element;
    	this.$textfield = this.$element.closest('.textfield');
    	this.$input = this.$textfield.find('input[id][name]');
    	this.init();
    	// console.log(TAG)
    }

    init(){
    	var self = this;

    	this.$input
    	.on('focusin',function(e){
    		self.onfocus();
    	})
    	.on('keydown keypress',function(e){
    		self.onkeydown();
    	})    	
    	.on('focusout',function(e){
    		self.onfocusout();
    	});    	
    }

    onfocus(){
    	if (this.$input.val().length == 0 ) {
    		this.$element.show()
    	}
    }

    onfocusout(){
    	this.$element.hide()
    }

    onkeydown(){
		delay(300).then(() => {
			if (this.$input.val().length > 0 ) {
    			this.$element.hide()
			}else{
    			this.$element.show()
			}
		});    	
    }

    static instance(){
   		var $textCustom = $('#text-custom-placeholder');
    	$textCustom.each(function(i, element) {
    		var textCustom = new TextCustomPlaceholder($(element));
    	});
    }

}

TextCustomPlaceholder.instance();

$(document).on('afterShow.bs.modal',function(e){
	TextCustomPlaceholder.instance();
})

})(jQuery); 



// @ts-nocheck
(function($){
    'use strict';
	var delay = function(ms){
		var _ms = typeof ms === 'undefined' ? 700 : ms;
		return new Promise(resolve => setTimeout(resolve, _ms));
	};

	var Textfields = function($element,option){
		this.perfix = 'textfield-floating-label-';
		this.$element = $element
		this.option = option;
		this.init()
	}

	var _proto = Textfields.prototype;

	_proto.init = function(){
		var self = this;

		self.textfieldComplete().init();
		this.$element.on('focus',function(){
			self.textfieldMouseover().init()
			self.textfieldActive().add()
			self.textfieldComplete().add()
		}).on('focusout',function(){
			self.textfieldActive().remove()
			self.textfieldComplete().init()
		})

		this.formGroup().on('mouseout',function(){
			$(this).removeClass('mouseover')
		}).on('mouseover',function(){
			$(this).addClass('mouseover')
		})

		this.cleared()
	}

	_proto.textfieldMouseover = function(){
		var self = this;
		var options = {
			init : function(){
				self.formGroup().addClass('mouseover');
				delay(500).then(() => {
					self.formGroup().removeClass('mouseover')
				})
			},
		}
		return options;		
	}

	_proto.textfieldActive = function(){
		var self = this;
		var options = {
			add : function(){
				self.formGroup().addClass(self.perfix + 'active');
				return this;
			},
			remove : function(){
				self.formGroup().removeClass(self.perfix + 'active');
				return this;
			},
		}
		return options;
	}

	_proto.textfieldComplete = function(){
		var self = this;
		var options = {
			add : function(){
				self.formGroup().addClass(self.perfix + 'completed');
				return this;
			},
			remove : function(){
				self.formGroup().removeClass(self.perfix + 'completed');
				return this;
			},
			init : function(){
				var _this = this;
				setTimeout(function(){
					if ( self.$element.val().length > 0 ) {
						_this.add();
						return;
					}
					_this.remove();
				},1000);
				
			},
		}
		return options;		
	}

	_proto.formGroup = function(){
		return this.$element.closest('.form-group.textfield')
	}

	_proto.cleared = function(){
		var self = this;
		var cleared = this.formGroup().find('.textfield-cleared');

		if ( cleared.length == 0) {
			return;
		}
		var inputValue = function(){
			return self.$element.val(); 
		}

		cleared.hide();

		cleared.on('click',function(){
			cleared.hide('slow');
			self.$element.val(null)
			self.$element.typeahead('val','')
			self.$element.focus()
		});

		if ( this.formGroup().length > 0 ) {
			this.formGroup()
			.on('mouseover',function(e){
				if ( inputValue().length > 2 ) {
					cleared.show('slow');
				}				
			})
			.on('mouseout',function(e){
				
			});
		}

		this.$element.on('keydown change focus',function(e){
			if ( inputValue().length > 2 ) {
				cleared.show('slow');
			}
		})

		this.$element.on('focusout',function(){
			if ( self.$element.val().length > 0 ) {
				cleared.show('slow');
				delay(2000).then(() => cleared.hide('slow') );
			}
		})	
	}

	var initialize = function(){
		var selector = $('input.form-control[name]')
		var textArea = $('textarea.form-control[name]')

		selector.each(function(i,element){
			var $element = $(element);
			new Textfields($element,$element.data())

		});

		textArea.each(function(i,element){
			var $element = $(element);
			new Textfields($element,$element.data())
		});	
				
	}

	var afterShowBsModal = function(options){

		if (typeof options != 'object' || options.target == 'undefined' ) {
			return;
		}
		var $form = $('#' + options.target).find('form')
		var selector = $form.find('input.form-control[name]')
		var textArea = $form.find('textarea.form-control[name]')

		selector.each(function(i,element){
			var $element = $(element);
			new Textfields($element,$element.data())

		});

		textArea.each(function(i,element){
			var $element = $(element);
			new Textfields($element,$element.data())
		});					
	}

	initialize();
	$(document).on('afterShow.bs.modal',function(e,options){
		afterShowBsModal(options);
	})
	
})(window.jQuery);








(function($){

"use strict";

var TAG = 'FooterMenu';

class Request {
    constructor(){
    	this.location = window.document.location
    }

    get(name){
    	return this.location.hasOwnProperty(name) ? this.location[name] : null;
    }

	get hash(){}

	get host(){
		return this.get('host');
	}

	get hostname(){
		return this.get('hostname');
	}

	get href(){
		return this.get('href');
	}

	get origin(){
		return this.get('origin');
	}

	get pathname(){
		return this.get('pathname');
	}

	get protocol(){
		return this.get('protocol');
	}
}

class ModelFooterMenu {
    constructor(){
    }

    get $element(){
        return $('.footer-menu .list-menu .list-menu-item')
    }

    hrefMenu($element){
    	return $element.find('a').attr('href')
    }

    hasMatchPathname($element){
    	var param = this.hrefMenu($element);
    	return (new Request()).pathname.match(param) != null;
    }

    hasMatchHome($element){
    	var param = this.hrefMenu($element);
    	return (new Request()).pathname == '/';
    }
}

class FooterMenu extends ModelFooterMenu{
	static FOOTER_MENU_ACTIVE = 'footer-menu-active';

    constructor(){
        super();
        this.request = new Request();
        this.init();
    }

    init(){
        var self = this;
        this.$element.each(function(i,element){
            var $element = $(element)
        	if (!self.activeMenuHome($element)) {
            	self.activeMenuByPathname($element)
        	}
        })
    }

    activeMenuHome($element){
        var self = this;

    	if ( this.request.pathname === '/') {
	        this.$element.each(function(i,element){
	            var $element = $(element)
	            var origin = self.hrefMenu($element);
	            if (origin === self.request.origin) {
    				$element.addClass(FooterMenu.FOOTER_MENU_ACTIVE) 
	            }
	        })
	        return true;
    	}
    	return false;
    }

    activeMenuByPathname($element){
        var self = this;

    	$element.removeClass(FooterMenu.FOOTER_MENU_ACTIVE)
    	if ( self.hasMatchPathname($element)) {
    		$element.addClass(FooterMenu.FOOTER_MENU_ACTIVE) 
    	}
    }

    delay(ms){
        var _ms = typeof ms === 'undefined' ? 1000 : ms;
        return new Promise((resolve, reject) => {setTimeout(() => {resolve(this); }, _ms); });
    }

}

let footer = new FooterMenu();
})(window.jQuery); 

