<template>
  <!--fixme:为什么加载项水平移动？-->
  <div class="loading-wrapper" v-show="isShowLoading || isAlwaysShow">
    <div class="loading-scale"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    isAlwaysShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShowLoading: false
    }
  },
  methods: {
    show () {
      this.isShowLoading = true
    },
    hide () {
      this.isShowLoading = false
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.loading{
  &-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
  }
  &-scale{
    position: absolute;
    width: 2rem;
    height: 2rem;
    left: 50%;
    top: 50%;
    margin: -1rem 0 0 -1rem;
    background: url("~common/image/loading.png") no-repeat;
    background-size: 88rem auto;
    animation: load steps(43, end) 1.5s infinite;
    transform-origin: center;
    transform: scale(.5);
  }
}
@keyframes load {
  100%{
    background-position: -8800px 0;
  }
}
</style>
