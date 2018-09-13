<template>
  <div class="infinite-load">
    <slot></slot>
    <span class="infinite-end" ref="endFlag"></span>
    <slot name="load-icon"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import * as $ from 'jquery'
import {onScroll} from 'common/js/util'

export default {
  props: {
    // 无限加载响应灵敏度，默认为0，即加载图标刚刚出现就加载
    sensibility: {
      type: Number,
      default: 0
    },
    ele: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    resetLoading () {
      this.isLoading = false
    }
  },
  mounted () {
    let self = this
    // setTimeout在此处没有使用箭头函数，因此this指向window
    this.$nextTick(function () {
      // 获取屏幕高度
      let winHeight = $(window).height()
      this._scrollEvent = (winScroll) => {
        // fixme： 为什么从search返回时，无法正确抓到endFlag元素？refs不是响应式的，所以router路由切换一次之后，就无法抓取到相应的dom！！！
        // let endTop = $(self.$refs.endFlag).offset().top
        let endTop = $('.infinite-end', self.$el).offset().top
        if (!self.isLoading && endTop < (winHeight + winScroll + self.sensibility)) {
          self.isLoading = true
          self.$emit('loadmore')
        }
      }

      setTimeout(() => {
        console.log(this.ele)
      }, 20)
      onScroll(this.ele).add(this._scrollEvent)
    })
  },
  destroyed () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.infinite-end{
  display: block;
  width: 100%;
  height: 1px;
}
</style>
