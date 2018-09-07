<template>
  <div class="toast" v-show="isShow">
    <div class="toast-content">
      <slot></slot>
    </div>
    <div class="toast-mask" @click="hideToast"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      isShow: false
    }
  },
  props: {
    message: {
      type: String,
      default: ''
    },
    delay: {
      type: Number,
      default: 1000
    },
    isAutoClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showMessage () {
      this.isShow = false
      this._autoHide()
    },
    hideToast () {
      if (!this.isAutoClose) {
        this.isShow = true
      }
    },
    _autoHide () {
      if (this.isAutoClose) {
        setTimeout(() => {
          this.isShow = true
        }, this.delay)
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.toast{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  &-mask{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0);
  }
  &-content{
    position: absolute;
    left: 50%;
    top: 50%;
    padding: .4rem .1rem;
    background-color: rgba(0,0,0,.5);
    transform: translate(-50%,-50%);
  }
}
</style>
