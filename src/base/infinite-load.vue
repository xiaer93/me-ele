<template>
  <div class="infinite-load">
    <slot></slot>
    <span class="infinite-end" ref="endFlag">正在加载</span>
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
    setTimeout(function () {
      // 获取屏幕高度
      let winHeight = $(window).height()
      onScroll(() => {
        // fixme： 为什么从search返回时，无法正确抓到endFlag元素？
        let endTop = $(self.$refs.endFlag).offset().top
        let winScroll = $(window).scrollTop()

        if (!self.isLoading && endTop < (winHeight + winScroll + self.sensibility)) {
          self.isLoading = true
          self.$emit('loadmore')
        }
      })
    }, 20)
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
