<template>
  <div class="info-pwd">
    <div class="info-pwd-title">
      <header-title>账户信息</header-title>
    </div>
    <div class="info-pwd-content">
      <p class="m-input">
        <input type="password" class="m-input-text" placeholder="旧密码">
        <span class="m-input-tips"></span>
      </p>
      <p class="m-input">
        <input type="password" class="m-input-text" placeholder="新密码">
        <span class="m-input-tips"></span>
      </p>
      <p class="m-input">
        <input type="password" class="m-input-text" placeholder="确认密码">
        <span class="m-input-tips"></span>
      </p>
    </div>
    <div class="info-pwd-footer">
      <button class="info-pwd-footer-btn">确认并保存</button>
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

.info-pwd{
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  &-content{
    padding: .2rem;
    background-color: #fff;
  }
  &-footer{
    margin: .3rem .2rem 0;
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
    }
  }
}
  .m-input{
    margin-bottom: .2rem;
    width: 100%;
    &:last-child{
      margin-bottom: 0;
    }
    &-text{
      box-sizing: border-box;
      padding-left: .1rem;
      width: 100%;
      height: .7rem;
      line-height: .7rem;
      border: 1px solid #ddd;
      border-radius: .1rem;
      background-color: #f2f2f2;
      color: @text-color-0;
      font-size: @font-size-large-s;
      outline: none;
      &.active{
        border: 1px solid #ea3106;
      }
      &:hover{
        border: 1px solid #3199e8 !important;
      }
    }
    &-tips{
      color: #ea3106;
      font-size: @font-size-medium-s;
    }
  }
</style>
