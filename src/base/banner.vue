<template>
  <swiper :options="swiperOption" class="banner-inner" ref="swiperBanner">
    <swiper-slide v-for="(item, index) in imgList" :key="index">
      <img class="banner-inner-img" :src="item.image" alt="item.id">
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
        direction: 'horizontal',
        autoplay: this.isAutoPlay,
        loop: true
      }
    }
  },
  props: {
    imgList: {
      type: Array
    },
    isAutoPlay: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    imgList () {
      this.$nextTick(() => {
        this.$refs.swiperBanner.swiper.update()
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
    height: 100%;
    &-img{
      width: 100%;
    }
  }
</style>
