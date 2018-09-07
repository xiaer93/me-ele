<template>
  <div class="lift" ref="lift">
    <slot name="number"></slot>
    <slot name="main"></slot>
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
    onScroll (event) {
      let scrollTop = this.$liftContent.scrollTop()
      let minIndex = this._findMinIndex(scrollTop)

      this.$liftBoxItem.removeClass('active').eq(minIndex).addClass('active')
    },
    onClick (event) {
      let index = this.$liftBoxItem.index(event.target)

      this.$liftContent.animate({
        'scrollTop': this.scrollMainTopList[index] + 10
      }, 200)
    },
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
    setTimeout(() => {
      // 存储非响应对象
      this.$liftContent = $(this.$refs.liftContent)
      this.$liftBoxItem = $('.lift-scroll>div', this.$refs.liftBox)

      // 存储电梯的楼层高度~
      $(this.$refs.liftScroll).children().map((index, ele) => {
        this.scrollMainTopList.push($(ele).position().top)
      })
    }, 20)
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.lift{
  width: 100%;
  height: 100%;
}
</style>
