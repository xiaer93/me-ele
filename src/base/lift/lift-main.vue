<template>
  <div class="lift-main">
    <div class="lift-scroll" ref="liftMain">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  mounted () {
    let self = this
    setTimeout(() => {
      self.$refs.liftMain.addEventListener('touchmove', function (e) {
      }, false)
    }, 20)
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.lift-main{
  height: 100%;
  overflow-y: scroll;
}
.lift-scroll{
  height: auto;
}
</style>
