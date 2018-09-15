<template>
  <div class="infinite-load" ref="infinite">
    <slot></slot>
    <span class="infinite-end" ref="endFlag"></span>
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
    return {}
  },
  methods: {
    scrollTop (value) {
      $(this.$refs.infinite).animate({
        scrollTop: value + 'px'
      })
    }
  },
  mounted () {
    let self = this
    let ele = this.$refs.infinite
    // setTimeout在此处没有使用箭头函数，因此this指向window
    this.$nextTick(function () {
      // 获取屏幕高度
      let eleHeight = $(ele).height()
      let _scrollEvent = (eleScroll) => {
        // fixme： 为什么从search返回时，无法正确抓到endFlag元素？refs不是响应式的，所以router路由切换一次之后，就无法抓取到相应的dom！！！
        // let endTop = $(self.$refs.endFlag).offset().top

        // 滚动时，实时将数据反馈给父容器
        self.$emit('scrollTop', eleScroll)

        let endTop = $('.infinite-end', self.$el).offset().top
        if (endTop < (eleHeight + eleScroll + self.sensibility)) {
          self.$emit('loadMore')
        }
      }

      self.scrollObserve = onScroll(ele)
      self.scrollObserve.add(_scrollEvent)
    })
  },
  destroyed () {
    this.scrollObserve.clear()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.infinite-load{
  // 提供包含快~
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
}
.infinite-end{
  display: block;
  width: 100%;
  height: 1px;
}
</style>
