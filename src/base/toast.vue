<template>
  <transition name="scale">
    <div class="toast" v-show="isShow">
      <div class="toast-content">{{message}}</div>
      <div class="toast-mask" @click="hide"></div>
    </div>
  </transition>
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
      default: 3000
    },
    isAutoClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    show () {
      this.isShow = true
      this._autoHide()
    },
    hide () {
      if (!this.isAutoClose) {
        this.isShow = true
      }
    },
    _autoHide () {
      if (this.isAutoClose) {
        setTimeout(() => {
          this.isShow = false
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
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  &-mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0);
  }
  &-content{
    margin: auto;
    padding: .4rem .4rem;
    color: #fff;
    font-size: 0.3rem;
    background-color: rgba(0,0,0,.5);
    border-radius: .8rem;
  }
}
  .scale-enter-active, .scale-leave-active{
    opacity: 1;
    transform: scale(1);
    transition: all .3s;
  }
  .scale-enter{
    opacity: 0;
    transform: scale(0.3);
  }
  .scale-leave-to{
    opacity: 0;
    transform: scale(1);
  }
</style>
