<template>
  <div class="temp">
    <div class="content">
      <h1>This is an temp2 page</h1>
      <h1>This is an temp2 page</h1>
      <h1>This is an temp2 page</h1>
      <div class="btn-group">
        <button @click="tempClickYes">确定</button>
        <button @click="tempClickNo">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Demo',
  props: {
    title: String,
    callbackResolve: null,
    callbackReject: null,
  },
  methods: {
    tempClickYes() {
      this.callbackResolve(['我确定了'])
    },
    tempClickNo() {
      this.callbackResolve(['我取消了'])
      // this.callbackReject(err))
    },
  },
}
</script>
<style lang="less">
.temp {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 50001;
    box-sizing: border-box;
    min-width: 30em;
    padding: 1em;
    background: #fff;
    border: 1px solid #777;
    border-radius: 0.4em;
    transform: translate(-50%, -50%);
    .btn-group {
      float: right;
      margin-top: 1em;
      overflow: hidden;
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
      .btn-confirm {
        margin-left: 1em;
      }
    }
  }
}
</style>
