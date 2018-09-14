<template>
  <div class="star">
    <span class="star-dark">
      <img src="~common/image/star.svg" alt="">
    </span>
    <span class="star-light" :style="{'width': `${rate}rem`}">
      <img src="~common/image/star-light.svg" alt="">
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    total: {
      type: Number,
      default: 5
    },
    score: {
      type: Number,
      default: 2.5
    }
  },
  computed: {
    rate () {
      return this.score / this.total
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.star{
  position: relative;
  display: block;
  width: 1rem;
  height: .2rem;
  font-size: 0;
  &-dark{
    display: block;
    width: 100%;
    height: 100%;
  }
  &-light{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  img{
    width: 1rem;
  }
}
</style>
