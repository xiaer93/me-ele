<template>
  <div class="side-nav">
    <span class="side-nav-cart" @click="$router.push('/cart')">
      <span class="side-nav-cart-inner">
        <svg class="m-icon"><use :xlink:href="cartIcon"></use></svg>
      </span>
    </span>
    <span class="side-nav-top">
      <transition name="fade">
        <span class="side-nav-top-inner" v-show="isShow" @click="toTop"></span>
      </transition>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
import {onScroll} from 'common/js/util'
import * as $ from 'jquery'

export default {
  props: {
    distance: {
      type: Number,
      default: 100
    },
    hasAddFood: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    cartIcon () {
      return this.hasAddFood ? '#cart_red' : '#cart'
    }
  },
  methods: {
    toTop () {
      $('html').animate({ scrollTop: 0 }, 300)
    },
    _scrollEvent (winScroll) {
      if (winScroll > this.distance) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  mounted () {
    onScroll.add(this._scrollEvent)
  },
  destroyed () {
    onScroll.delete(this._scrollEvent)
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.side-nav{
  display: flex;
  flex-direction: column;
  &-cart{
    display: flex;
    width: .8rem;
    height: .8rem;
    border-radius: 1rem;
    background-color: #fff;
    border: 1px solid #d0d0d0;
    &-inner{
      display: block;
      margin: auto;
      width: .36rem;
      height: .36rem;
    }
  }
  &-top{
    display: block;
    margin-top: .16rem;
    width: .8rem;
    height: .8rem;
    &-inner{
      display: block;
      width: 100%;
      height: 100%;
      border: 1px solid #d0d0d0;
      border-radius: 1rem;
      background: #fff url("~common/image/btn-top.svg") no-repeat center/.36rem .36rem;
    }
  }
}
.fade-enter-active, .fade-leave-active{
  opacity: 1;
  transform: translate(0, 0);
  transition: all .3s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
  transform: translate(0, 20px);
}
</style>
