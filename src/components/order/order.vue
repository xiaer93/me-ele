<template>
  <div class="order">
    <div class="order-header">
      <header-title>订单</header-title>
    </div>
    <div class="order-content"></div>
    <div class="order-tips">
      <img src="/static/order-tips.png" alt="" class="order-tips-img">
      <p class="order-tips-text">近三个月无外卖订单记录</p>
      <span class="order-tips-more">查看三个月的外卖订单</span>
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

.order{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  margin-bottom: .9rem;
  background-color: #fff;
  &-tips{
    &-img{
      width: 1.8rem;
      height: 1.3rem;
    }
  }
}
</style>
