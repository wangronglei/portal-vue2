import Vue from 'vue';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var _excluded = ["containerRender"];

/**
 * 模板容器默认渲染函数
 */
var defaultContainerRender = function defaultContainerRender(_ref) {
  var h = _ref.h,
    template = _ref.template,
    props = _ref.props;
  return h('div', {
    class: {
      'portal-instance-container': true
    }
  }, [h(template, {
    props: props
  })]);
};

/**
 * 存储传入的vue实例属性，通过initVueInstanceProps初始化
 */
var vueInstanceProps = {};

/**
 * initVueInstanceProps 用于初始化，可以传入store、i18n等
 * @param {Object} params vue实例对象属性,如store、i18n、router等，container表示模板文件最外层包裹
 */
var initVueInstanceProps = function initVueInstanceProps() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return vueInstanceProps = params;
};

/**
 * detectPortalInstances 用于检测portal是否在callback后正确销毁
 * @param {Object} params 参数对象
 * @param {String} params.selectors 查询的css选择器，默认值.portal-instance-container
 */
var detectPortalInstances = function detectPortalInstances() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref2$selectors = _ref2.selectors,
    selectors = _ref2$selectors === void 0 ? '.portal-instance-container' : _ref2$selectors;
  var hide = function hide() {
    var dom = document.querySelector('#portal-instances-detector');
    if (dom) {
      document.body.removeChild(dom);
    }
  };
  var show = function show(value) {
    var dom = document.createElement('div');
    dom.id = 'portal-instances-detector';
    dom.style = 'position:fixed; top: 0; right: 0; color: red; font-size: 14px; z-index: 999;';
    dom.innerHTML = "\u68C0\u6D4B\u5230\u672A\u9500\u6BC1\u7684portal\u5B9E\u4F8B <b>".concat(value, "</b> \u4E2A\uFF0C\u8BF7\u786E\u4FDDportal\u7EC4\u4EF6\u6B63\u786E\u4F7F\u7528resolve/reject\u6765\u7ED3\u675F\u8C03\u7528");
    document.body.appendChild(dom);
  };
  var prev = 0;
  var detect = function detect() {
    var count = document.querySelectorAll(selectors).length;
    if (count === 0) {
      hide();
    } else if (count > 0 && count !== prev) {
      hide();
      show(count);
    }
    prev = count;
    window.requestAnimationFrame(detect);
  };
  detect();
};

/**
 * wrap用于将组件append到body节点
 * @param {Object} template 模板import进来的Vue模板对象
 * @param {Object} data 组件需要的props
 * @param {Object} options 配置项
 * @param {Number} options.unmountDelay 延迟销毁，解决可能出现的动画执行不完就被销毁的情况，单位ms
 * @param {Object} options.vueInstanceProps 用于自定义vue实例对象属性
 * @param {Function} options.vueInstanceProps.containerRender 模板文件最外层包裹容器渲染函数 function({ h, template, props })
 * @returns Promise
 */
var wrap = function wrap(template) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _vueInstanceProps$opt = _objectSpread2(_objectSpread2({}, vueInstanceProps), options.vueInstanceProps),
    _vueInstanceProps$opt2 = _vueInstanceProps$opt.containerRender,
    containerRender = _vueInstanceProps$opt2 === void 0 ? defaultContainerRender : _vueInstanceProps$opt2,
    vips = _objectWithoutProperties(_vueInstanceProps$opt, _excluded);

  // 声明实例对象变量
  var extendVm = null;

  // 卸载销毁
  var unmountedNode = function unmountedNode() {
    setTimeout(function () {
      extendVm.$destroy();
      if (document.body.contains(extendVm.$el)) {
        document.body.removeChild(extendVm.$el);
      }
    }, options.unmountDelay || 0);
  };

  // 返回promise，根据vueInstanceProps传入vue实例对象属性，通过判断 options.vueInstanceProps可以自定义vue实例对象属性
  var p = new Promise(function (resolve, reject) {
    var Instance = Vue.extend(_objectSpread2({
      render: function render(h) {
        // 创建组件实例
        var props = _objectSpread2({
          callbackResolve: resolve,
          callbackReject: reject
        }, data);
        return containerRender({
          h: h,
          template: template,
          props: props
        });
      }
    }, vips));

    // 插入dom
    extendVm = new Instance().$mount();
    document.body.appendChild(extendVm.$el);
  });

  // 组件resolve回调
  var callbackResolve = function callbackResolve(val) {
    unmountedNode();
    return Promise.resolve(val);
  };

  // 组件reject回调
  var callbackReject = function callbackReject(err) {
    unmountedNode();
    return Promise.reject(err);
  };
  return p.then(callbackResolve, callbackReject);
};

export { detectPortalInstances, initVueInstanceProps, wrap };
//# sourceMappingURL=portal-vue2.esm.js.map
