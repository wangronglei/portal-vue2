<template>
  <div id="app">
    <div class="introduce">
      <img src="./assets/logo.png" alt="" />
      <h1>Demo App for portal</h1>
      <h2>Click the button below</h2>
    </div>
    <div class="btn-group">
      <button @click="single">Click me!</button>
    </div>
  </div>
</template>

<script>
import dialog from './dialog'

export default {
  name: 'App',
  methods: {
    single() {
      dialog({ title: '111' }, { unmountDelay: 300 }).then(val => {
        console.log(`111:${val}`)
      })
    },
  },
}
</script>

<style lang="less">
body,
html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  position: relative;
  width: 640px;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  .introduce {
    padding-top: 80px;
  }
  .btn-group {
    button {
      display: inline-block;
      width: 80px;
      height: 35px;
      padding: 0 9px;
      margin-top: 6px;
      margin-left: 10px;
      font-size: 13px;
      line-height: 23px;
      color: #fff;
      cursor: pointer;
      background: #4395ff;
      border: 0;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      outline: none;
    }
    button:hover {
      background: #3485fb;
    }
  }
}
</style>
