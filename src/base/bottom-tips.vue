<template>
  <transition name="slide">
    <div class="tips" v-show="isShow" @touchmove.stop>
      <div class="tips-mask"></div>
      <div class="tips-content">
        <div class="tips-content-header">
          <h2 class="tips-content-header-title">{{title}}</h2>
          <span class="tips-content-header-close" @click="hide">
          <svg class="m-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#gray-close"></use></svg>
        </span>
        </div>
        <div class="tips-content-scroll">
          <slot></slot>
        </div>
      </div>
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
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.tips{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  &-content{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    &-header{
      position: relative;
      &-title{
        height: 1rem;
        line-height: 1rem;
        font-size: @font-size-large-l;
        color: @text-color-0;
        text-align: center;
      }
      &-close{
        position: absolute !important;
        right: .4rem;
        top: .3rem;
        width: .4rem;
        height: .4rem;
        .extend-click();
      }
    }
    &-scroll{
      height: calc(100% - 1rem);
      overflow: scroll;
    }
  }
  &-mask{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0, .5);
  }
}
  .slide-enter-active, .slide-leave-active{
    transform: translate(0, 0);
    transition: all .3s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate(0, 100%);
  }
</style>
