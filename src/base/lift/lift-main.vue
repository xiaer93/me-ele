<template>
  <div class="lift-main">
    <div class="lift-scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

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
