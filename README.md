# Portal 是什么

Vue 鼓励我们通过将 UI 和相关行为封装到组件中来构建 UI，我们可以将这些组件彼此嵌套在一起，以构建构成应用程序 UI 的组件树。这个模型已经在 Vue 和其他框架中以多种方式证明了自己，但是 RFC 试图解决的一个弱点是:

有时，组件模板的一部分在逻辑上属于这个组件，而从技术的角度来看(即:样式需求)，最好将模板的这一部分移到 DOM 中的其他位置，在不使用 DOM 树的情况下将它从深度嵌套的位置中分离出来。

所以在 Vue3.0 中有了 teleport，react 中有了 portal。

在 Vue2.x 中并没有类似的功能，该 npm 包利用 Vue 中的 extend 和 Js 中的 appendChild 将需要的组件 append 到 body 下，实现弹窗和主体页面充分解耦，并且利用 Promise 实现使用组件函数化，脱离对具体 UI 的依赖，让函数式的流程成为前端逻辑真正的基础。

# Portal 使用方法

## 安装依赖

```
npm install
```

## 编译

```
npm run build
```

## 开发

```
npm start
```

## 初始化和设置检测

```
import { initVueInstanceProps, detectPortalInstances } from '@filez/portal'
...
// 检测portal未调用resolve/reject导致未销毁实例造成的泄露 参数是一个对象，非对象会报错
if (process.env.NODE_ENV === 'development') {
  detectPortalInstances()
}
// 初始化
initVueInstanceProps({
  store,
  i18n,
  router,
  containerRender: ({ h, template, props }) => {
    return h(
      'div',
      {
        class: {
          'portal-instance-container': true,
        },
      },
      [
        h(
          ConfigProvider,
          {
            props: {
              locale: this.getAntLocale(),
            },
          },
          [
            h(template, {
              props,
            }),
          ],
        ),
      ],
    )
  },
})
```

## 组件开发者看这里

- 合适的位置创建组件文件夹
- **请务必写 readme，里面详细介绍 props 属性的作用，可配置项、必填项等**
- 组件文件夹中至少包含 index.js 和模板文件(.vue)
- 组件内至少包含 props，提供给组件使用者拿到回调，适当使用 resolve 还是 reject
- 有必要的时候才会使用 callbackReject 回调报错

```
  props: {
    callbackResolve: null,
    callbackReject: null,
  },
```

- 支持多层弹窗

- 正常开发组件即可
- options 配置项目前提供了
  - unmountDelay 解决组件销毁动画还未执行完成的问题，默认 300ms
  - vueInstanceProps 可以自己传入 vue 实例的东西，比如 store、i18n 等他是一个{},也可以传入外层包裹 vueInstanceProps.containerRender,参考 initVueInstanceProps 中的使用
  - ...

```
// dialog/index.js
/**
 * 将组件调用函数化
 */
import temp from './template.vue'
import { wrap } from '@filez/portal'
/**
 * 提供给使用者的接口
 * @param {Object} template 模板import进来的Vue模板对象
 * @param {Object} data 组件需要的props
 * @param {Object} options 配置项,如果使用者传入options，以使用者options为主
 * @param {Number} options.unmountDelay 延迟销毁，解决可能出现的动画执行不完就被销毁的情况，单位ms
 * @param {Object} options.vueInstanceProps，用于自定义vue实例对象属性
 * @param {Function} options.vueInstanceProps.container 模板文件最外层包裹dom信息，是一个函数
 * @returns Promise
 */
export default (data, options = {}) => {
  return wrap(temp, data, { unmountDelay: 0, vueInstanceProps:{}, ...options })
}
```

## 组件使用者看这里

- 在需要使用的文件中 import 相应组件,直接调用函数

```
import demo from 'xxx/demo'
...
demo({ name: '我是name' },{unmountDelay: 300}).then(val => {
  console.log('data:' + val)
}).catch(err=>{
  console.log('error:' + err)
})

```
