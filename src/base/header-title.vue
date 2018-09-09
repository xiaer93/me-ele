<template>
  <div class="header">
    <span class="header-return" @click="$router.back()">
          <svg class="m-icon m-icon-return">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
          </svg>
    </span>
    <h2 class="header-title">
      <slot></slot>
    </h2>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.header{
  position: relative;
  padding: 0.2rem 0;
  width: 100%;
  .gradient-bg-2();
  &-return{
    position: absolute !important;
    left: .3rem;
    top: .22rem;
    display: block;
    width: .3rem;
    height: .3rem;
    .extend-click();
  }
  &-title{
    font-size: @font-size-large-l;
    color: @text-color-f;
    font-weight: @font-weight-bold;
    text-align: center;
  }
}
</style>
