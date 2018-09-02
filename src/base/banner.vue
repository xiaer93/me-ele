<template>
  <swiper :options="swiperOption" class="banner-inner" ref="swiperObj">
    <swiper-slide v-for="item in imgList" :key="item.src">
      <img class="banner-inner-img" :src="item.imgUrl" alt="item.name">
    </swiper-slide>
  </swiper>
</template>

<script type="text/ecmascript-6">
// swiper 输出为小写字母打头
import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
  data () {
    return {
      swiperOption: {
        direction: 'horizontal'
      }
    }
  },
  props: {
    imgList: {
      type: Array
    }
  },
  watch: {
    imgList () {
      this.$nextTick(() => {
        this.$refs.swiperObj.swiper.update()
      })
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .banner-inner{
    width: 100%;
    &-img{
      width: 100%;
    }
  }
</style>
