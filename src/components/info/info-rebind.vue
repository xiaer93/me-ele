<template>
  <div class="info-rebind">
    <div class="info-rebind-header">
      <header-title>换绑手机</header-title>
    </div>
    <div class="info-rebind-content">
      <p class="m-input">
        <label for="" class="m-input-label">手机号</label>
        <input value="111*****111" type="text" class="m-input-text" readonly>
        <span class="m-input-btn">获取验证码</span>
      </p>
      <p class="m-input m-input-qr">
        <label for="" class="m-input-label">验证码</label>
        <input type="text" class="m-input-text">
      </p>
    </div>
    <div class="info-rebind-footer">
      <button class="info-rebind-footer-btn">验证后绑定新手机号</button>
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

.info-rebind{
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  &-content{
    margin-top: .2rem;
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
    display: flex;
    align-items: center;
    height: .9rem;
    line-height: .9rem;
    margin-left: .3rem;
    border-bottom: 1px solid #ddd;
    &:last-child{
      border-bottom: none;
    }
    &-label{
      width: 1.2rem;
      font-size: @font-size-medium;
      color: @text-color-3;
    }
    &-text{
      flex: 1 1 auto;
      height: 100%;
      font-size: @font-size-large-s;
      color: @text-color-3;
      outline: none;
      border: none;
    }
    &-btn{
      margin-right: .3rem;
      width: 2rem;
      height: .6rem;
      line-height: .6rem;
      font-size: @font-size-large-s;
      color: @text-color-f;
      text-align: center;
      background-color: #0097ff;
    }
  }
  .m-input-qr{
    .m-input-label{
      width: 1.5rem;
    }
  }
</style>
