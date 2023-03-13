import Vue from 'vue'

/**
 * 模板容器默认渲染函数
 */
const defaultContainerRender = ({ h, template, props }) =>
  h('div', { class: { 'portal-instance-container': true } }, [h(template, { props })])

/**
 * 存储传入的vue实例属性，通过initVueInstanceProps初始化
 */
let vueInstanceProps = {}

/**
 * initVueInstanceProps 用于初始化，可以传入store、i18n等
 * @param {Object} params vue实例对象属性,如store、i18n、router等，container表示模板文件最外层包裹
 */
export const initVueInstanceProps = (params = {}) => (vueInstanceProps = params)

/**
 * detectPortalInstances 用于检测portal是否在callback后正确销毁
 * @param {Object} params 参数对象
 * @param {String} params.selectors 查询的css选择器，默认值.portal-instance-container
 */
export const detectPortalInstances = ({ selectors = '.portal-instance-container' } = {}) => {
  const hide = () => {
    const dom = document.querySelector('#portal-instances-detector')
    if (dom) {
      document.body.removeChild(dom)
    }
  }

  const show = value => {
    const dom = document.createElement('div')
    dom.id = 'portal-instances-detector'
    dom.style = 'position:fixed; top: 0; right: 0; color: red; font-size: 14px; z-index: 999;'
    dom.innerHTML = `检测到未销毁的portal实例 <b>${value}</b> 个，请确保portal组件正确使用resolve/reject来结束调用`
    document.body.appendChild(dom)
  }

  let prev = 0
  const detect = () => {
    const count = document.querySelectorAll(selectors).length
    if (count === 0) {
      hide()
    } else if (count > 0 && count !== prev) {
      hide()
      show(count)
    }
    prev = count
    window.requestAnimationFrame(detect)
  }
  detect()
}

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
export const wrap = (template, data = {}, options = {}) => {
  const { containerRender = defaultContainerRender, ...vips } = {
    ...vueInstanceProps,
    ...options.vueInstanceProps,
  }

  // 声明实例对象变量
  let extendVm = null

  // 卸载销毁
  const unmountedNode = () => {
    setTimeout(() => {
      extendVm.$destroy()
      if (document.body.contains(extendVm.$el)) {
        document.body.removeChild(extendVm.$el)
      }
    }, options.unmountDelay || 0)
  }

  // 返回promise，根据vueInstanceProps传入vue实例对象属性，通过判断 options.vueInstanceProps可以自定义vue实例对象属性
  const p = new Promise((resolve, reject) => {
    const Instance = Vue.extend({
      render(h) {
        // 创建组件实例
        const props = {
          callbackResolve: resolve,
          callbackReject: reject,
          ...data,
        }

        return containerRender({ h, template, props })
      },
      ...vips,
    })

    // 插入dom
    extendVm = new Instance().$mount()
    document.body.appendChild(extendVm.$el)
  })

  // 组件resolve回调
  const callbackResolve = val => {
    unmountedNode()
    return Promise.resolve(val)
  }

  // 组件reject回调
  const callbackReject = err => {
    unmountedNode()
    return Promise.reject(err)
  }
  return p.then(callbackResolve, callbackReject)
}
