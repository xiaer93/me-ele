<template>
  <swiper class="scroll">
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
  </swiper>
</template>

<script type="text/ecmascript-6">
import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
  props: {

  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
