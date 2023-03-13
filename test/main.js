import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import { initVueInstanceProps, detectPortalInstances } from '../src/index'

Vue.config.productionTip = false
// 这里初始化portal，这里可以传入store或者i18n等挂载在Vue实例上的
initVueInstanceProps({})
detectPortalInstances()

new Vue({
  render: h => h(App),
}).$mount('#app')
