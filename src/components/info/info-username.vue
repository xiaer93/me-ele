<template>
  <div class="info-user">
    <div class="info-user-header">
      <header-title @back="$router.back()">账户信息</header-title>
    </div>
    <div class="info-user-content">
      <input type="text" class="info-user-content-input">
    </div>
    <div class="info-user-footer">
      <p class="info-user-footer-tips">用户名只能修改一次（5-24个字）</p>
      <button class="info-user-footer-btn">确认修改</button>
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

.info-user{
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  &-content{
    margin-top: .3rem;
    &-input{
      box-sizing: border-box;
      padding-left: .1rem;
      width: 100%;
      height: .9rem;
      line-height: .9rem;
      background-color: #fff;
      color: @text-color-0;
      font-size: @font-size-large-s;
      outline: none;
      border: none;
      &.active{
        border: 1px solid #ea3106;
      }
    }
  }
  &-footer{
    margin: .3rem .2rem 0;
    &-tips{
      margin-bottom: .1rem;
      font-size: @font-size-small-m;
      color: #a9a9a9;
    }
    &-btn{
      height: 1rem;
      line-height: 1rem;
      width: 100%;
      color: #fff;
      font-size: @font-size-large;
      font-weight: @font-weight-bold;
      border-radius: .1rem;
      outline: none;
      border: none;
      cursor: pointer;
      &.active{
        background-color: #00d762;
      }
    }
  }
}
</style>
