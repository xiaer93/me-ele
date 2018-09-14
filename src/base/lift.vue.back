<template>
  <!--电梯-->
  <div class="lift" ref="lift">
    <!--电梯按钮-->
    <div class="lift-box" ref="liftBox" @click="onClick($event)">
      <div class="lift-scroll">
        <!--// 插槽能够定义类型吗？-->
        <slot name="lift-number"></slot>
      </div>
    </div>
    <!--电梯主体-->
    <div class="lift-content" @scroll="onScroll($event)" ref="liftContent">
      <div class="lift-scroll" ref="liftScroll">
        <!--// 插槽没有类名-->
        <slot name="lift-main"></slot>
      </div>
    </div>
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
        'scrollTop': this.scrollMainTopList[index] + 1
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
  display: flex;
  width: 100%;
  height: 100%;
  &-content{
    flex: 1 1 auto;
    height: 100%;
    overflow-y: scroll;
  }
  &-box{
    flex: 0 0 auto;
    height: 100%;
    width: 1.6rem;
    margin-right: .2rem;
    overflow-y: scroll;
    background-color: #f8f8f8;
  }
  &-scroll{
    position: relative;
  }
}
</style>
