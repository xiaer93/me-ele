<template>
  <div class="about">
    <div class="about-title">
      <header-title>关于我们</header-title>
    </div>
    <div class="about-content">
      <h3 class="about-content-title">公司</h3>
      <p class="about-content-text">上海拉扎斯信息科技有限公司</p>
      <h3 class="about-content-title">地址</h3>
      <p class="about-content-text">上海市普陀区金沙江路1518弄近铁城市广场401室</p>
      <h3 class="about-content-title">电话</h3>
      <p class="about-content-text">(021) 8024-1717</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderTitle from 'base/header-title'

export default {
  components: {
    HeaderTitle
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.about{
  &-content{
    padding: 0 .3rem;
    &-title{
      margin: .6rem 0 .3rem;
      font-size: @font-size-title;
      font-weight: @font-weight-bold;
      color: #333;
    }
    &-text{
      margin: .7em 0;
      line-height: 1.4;
    }
  }
}
</style>
