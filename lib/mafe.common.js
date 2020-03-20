module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fd77");
/******/ })
/************************************************************************/
/******/ ({

/***/ "5baf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
        return cloneIfNecessary(source, optionsArgument)
    } else if (sourceIsArray) {
        var arrayMerge = options.arrayMerge || defaultArrayMerge;
        return arrayMerge(target, source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "e67d":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fd77":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_@vue_cli-service@4.2.3@@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("e67d")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ada25750-vue-loader-template"}!./node_modules/_vue-loader@15.9.0@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.0@vue-loader/lib??vue-loader-options!./packages/components/demo/src/demo.vue?vue&type=template&id=002dbc0a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"demo"},[_vm._v(" 111111111111111 ")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/components/demo/src/demo.vue?vue&type=template&id=002dbc0a&

// CONCATENATED MODULE: ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.0@vue-loader/lib??vue-loader-options!./packages/components/demo/src/demo.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var demovue_type_script_lang_js_ = ({
  name: 'demo',
 
});

// CONCATENATED MODULE: ./packages/components/demo/src/demo.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_demovue_type_script_lang_js_ = (demovue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.0@vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/components/demo/src/demo.vue





/* normalize component */

var component = normalizeComponent(
  src_demovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var demo = (component.exports);
// CONCATENATED MODULE: ./packages/components/demo/index.js
// 导入组件，组件必须声明 name


// 为组件提供 install 安装方法，供按需引入
demo.install = function (Vue) {
  Vue.component(demo.name, demo)
}

// 默认导出组件
/* harmony default export */ var components_demo = (demo);
// CONCATENATED MODULE: ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ada25750-vue-loader-template"}!./node_modules/_vue-loader@15.9.0@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.0@vue-loader/lib??vue-loader-options!./packages/components/tabs/src/tabs.vue?vue&type=template&id=788f4f6b&
var tabsvue_type_template_id_788f4f6b_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mf-tabs"},[_c('div',{ref:"mf-tab-item",staticClass:"mf-tab-item",on:{"click":function($event){return _vm.change(0)}}},[_vm._v("听妈妈的话")]),_c('span',{ref:"mf-tips",attrs:{"id":"mf-tips"}})])}
var tabsvue_type_template_id_788f4f6b_staticRenderFns = []


// CONCATENATED MODULE: ./packages/components/tabs/src/tabs.vue?vue&type=template&id=788f4f6b&

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./src/locale/lang.js
// using with vue-i18n in CDN
/*eslint-disable */

const isServer = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$isServer;

/* harmony default export */ var lang = (function(lang) {
    if (!isServer) {
        if (typeof window.mafe !== 'undefined') {
            if (!('langs' in mafe)) {
                mafe.langs = {};
            }
            mafe.langs[lang.i.locale] = lang;
        }
    }
});;
// CONCATENATED MODULE: ./src/locale/lang/zh-CN.js


const zh_CN_lang = {
    m: {
        locale: 'zh-CN',
    }
};

lang(zh_CN_lang);
/* harmony default export */ var zh_CN = (zh_CN_lang);
// EXTERNAL MODULE: ./node_modules/_deepmerge@1.5.2@deepmerge/dist/cjs.js
var cjs = __webpack_require__("5baf");
var cjs_default = /*#__PURE__*/__webpack_require__.n(cjs);

// CONCATENATED MODULE: ./src/locale/format.js
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

/* harmony default export */ var format = (function() {
    // const { hasOwn } = Vue.util;
    function hasOwn(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }

    /**
     * template
     *
     * @param {String} string
     * @param {Array} ...args
     * @return {String}
     */

    function template(string, ...args) {
        if (args.length === 1 && typeof args[0] === 'object') {
            args = args[0];
        }

        if (!args || !args.hasOwnProperty) {
            args = {};
        }

        return string.replace(RE_NARGS, (match, prefix, i, index) => {
            let result;

            if (string[index - 1] === '{' &&
                string[index + match.length] === '}') {
                return i;
            } else {
                result = hasOwn(args, i) ? args[i] : null;
                if (result === null || result === undefined) {
                    return '';
                }

                return result;
            }
        });
    }
    return template;
});
// CONCATENATED MODULE: ./src/locale/index.js




const locale_format = format(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);
let locale_lang = zh_CN;
let merged = false;
let i18nHandler = function() {
    const vuei18n = Object.getPrototypeOf(this || external_commonjs_vue_commonjs2_vue_root_Vue_default.a).$t;
    if (typeof vuei18n === 'function' && !!external_commonjs_vue_commonjs2_vue_root_Vue_default.a.locale) {
        if (!merged) {
            merged = true;
            external_commonjs_vue_commonjs2_vue_root_Vue_default.a.locale(
                external_commonjs_vue_commonjs2_vue_root_Vue_default.a.config.lang,
                cjs_default()(locale_lang, external_commonjs_vue_commonjs2_vue_root_Vue_default.a.locale(external_commonjs_vue_commonjs2_vue_root_Vue_default.a.config.lang) || {}, { clone: true })
            );
        }
        return vuei18n.apply(this, arguments);
    }
};

const t = function(path, options) {
    let value = i18nHandler.apply(this, arguments);
    if (value !== null && value !== undefined) return value;

    const array = path.split('.');
    let current = locale_lang;

    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];
        if (i === j - 1) return locale_format(value, options);
        if (!value) return '';
        current = value;
    }
    return '';
};

const use = function(l) {
    locale_lang = l || locale_lang;
};

const i18n = function(fn) {
    i18nHandler = fn || i18nHandler;
};

/* harmony default export */ var locale = ({ use, t, i18n });
// CONCATENATED MODULE: ./src/locale/locale.js

/* harmony default export */ var locale_locale = ({
    methods: {
        t(...args) {
            return t.apply(this, args);
        }
    }
});
// CONCATENATED MODULE: ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.0@vue-loader/lib??vue-loader-options!./packages/components/tabs/src/tabs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var tabsvue_type_script_lang_js_ = ({
    name: 'tabs',
    mixins: [locale_locale],
    props: {
        tabs: Array
    },
    methods: {
        change(index) {
            let itemWidth = this.$refs['mf-tab-item'].offsetWidth;
            let tips = this.$refs['mf-tips'];
            //自身div的一半 - 滑块的一半
            tips.style.left = itemWidth * index + itemWidth / 2 - tips.offsetWidth / 2 + 'px';
        }
    },
    mounted() {
        this.change(0)
    }
});

// CONCATENATED MODULE: ./packages/components/tabs/src/tabs.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tabsvue_type_script_lang_js_ = (tabsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/components/tabs/src/tabs.vue





/* normalize component */

var tabs_component = normalizeComponent(
  src_tabsvue_type_script_lang_js_,
  tabsvue_type_template_id_788f4f6b_render,
  tabsvue_type_template_id_788f4f6b_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tabs = (tabs_component.exports);
// CONCATENATED MODULE: ./packages/components/tabs/index.js
// 导入组件，组件必须声明 name


// 为组件提供 install 安装方法，供按需引入
tabs.install = function(Vue) {
    Vue.component(tabs.name, tabs)
}

// 默认导出组件
/* harmony default export */ var components_tabs = (tabs);
// CONCATENATED MODULE: ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ada25750-vue-loader-template"}!./node_modules/_vue-loader@15.9.0@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.0@vue-loader/lib??vue-loader-options!./packages/components/button/src/button.vue?vue&type=template&id=7a501b79&
var buttonvue_type_template_id_7a501b79_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mf-button"},[_c('button',{class:[_vm.type?'mf-button-'+_vm.type:'',_vm.plain?'mf-button-border':'',_vm.round?'mf-button-round':'']},[_vm._t("default")],2)])}
var buttonvue_type_template_id_7a501b79_staticRenderFns = []


// CONCATENATED MODULE: ./packages/components/button/src/button.vue?vue&type=template&id=7a501b79&

// CONCATENATED MODULE: ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.0@vue-loader/lib??vue-loader-options!./packages/components/button/src/button.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var buttonvue_type_script_lang_js_ = ({
  name: 'Button',
  props:{
//	size:String,
//	disabled: Boolean,
	type:String,
	plain:Boolean,
	round:Boolean,
  },
 
});

// CONCATENATED MODULE: ./packages/components/button/src/button.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_buttonvue_type_script_lang_js_ = (buttonvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/components/button/src/button.vue





/* normalize component */

var button_component = normalizeComponent(
  src_buttonvue_type_script_lang_js_,
  buttonvue_type_template_id_7a501b79_render,
  buttonvue_type_template_id_7a501b79_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_button = (button_component.exports);
// CONCATENATED MODULE: ./packages/components/button/index.js
// 导入组件，组件必须声明 name


// 为组件提供 install 安装方法，供按需引入
src_button.install = function(Vue) {
    Vue.component(src_button.name, src_button)
}

// 默认导出组件
/* harmony default export */ var components_button = (src_button);
// CONCATENATED MODULE: ./packages/index.js
// 导入日期选择器组件





// 存储组件列表
// const components = [
//     demo,
//     tabs
// ]
const packages_mafe = {
    'mf-demo': components_demo,
    'mf-tabs': components_tabs,
    'mf-button': components_button,
}

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue, opts = {}) {
    locale.use(opts.locale);
    locale.i18n(opts.i18n);
    if (install.installed) return
        // 遍历注册全局组件
        // components.map(component => Vue.component(component.name, component))
    Object.keys(packages_mafe).forEach(key => {
        Vue.component(key, packages_mafe[key]);
    });
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
const API = {
    // version: process.env.VERSION, // eslint-disable-line no-undef
    locale: locale.use,
    i18n: locale.i18n,
    install,
    ...packages_mafe
};

API.lang = (code) => {
    const langObject = window['mafe/locale'].default;
    if (code === langObject.m.locale) locale.use(langObject);
    else console.log(`The ${code} language pack is not loaded.`); // eslint-disable-line no-console
};
/* harmony default export */ var packages_0 = (API); // eslint-disable-line no-undef
// export default {
//     // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
//     install,
//     locale: locale.use,
//     i18n: locale.i18n,
//     lang,
//     // 以下是具体的组件列表
//     ...components
// }
// CONCATENATED MODULE: ./node_modules/_@vue_cli-service@4.2.3@@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ })

/******/ });
//# sourceMappingURL=mafe.common.js.map