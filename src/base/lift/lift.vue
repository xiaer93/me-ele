<template>
  <div class="lift" ref="lift">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import * as $ from 'jquery'

export default {
  data () {
    return {
      scrollMainTopList: []
    }
  },
  methods: {
    _findMinIndex (top) {
      let retIndex = 0
      this.scrollMainTopList.forEach((t, i) => {
        if (t < top) {
          retIndex = i
        }
      })
      return retIndex
    }
  },
  mounted () {
    let self = this
    setTimeout(() => {
      // 存储非响应对象
      self.$lift = $(self.$refs.lift)
      self.$liftMain = self.$lift.children('.lift-main')
      self.$liftMainScroll = self.$liftMain.children('.lift-scroll')
      self.$liftMainItem = self.$liftMain.children('.lift-scroll').children()
      self.$liftNumberItem = self.$lift.children('.lift-number').children('.lift-scroll').children()

      // 存储电梯的楼层高度~
      self.$liftMainItem.map((index, ele) => {
        self.scrollMainTopList.push($(ele).position().top)
      })

      self.$liftNumberItem.on('click', function (event) {
        let index = $(this).index()

        self.$liftMain.animate({
          'scrollTop': self.scrollMainTopList[index] + 10
        }, 200)
      })

      self.$liftMain.on('scroll', function () {
        let scrollTop = $(this).scrollTop()
        let minIndex = self._findMinIndex(scrollTop)

        self.$liftNumberItem.removeClass('active').eq(minIndex).addClass('active')
      })
    }, 20)
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.lift{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
