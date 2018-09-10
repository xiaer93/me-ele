<template>
  <div class="info">
    <div class="info-title">
      <header-title>账户信息</header-title>
    </div>
    <div class="info-content">
      <div class="info-content-col">
        <div class="info-content-avatar">
          <p class="m-info">
            <span class="m-info-label">头像</span>
            <img src="/static/user-avatar.jpg" class="m-info-img"/>
          </p>
          <span class="info-content-icon">
            <svg data-v-8876803a="" fill="#fff" class="m-icon m-icon-more"><use data-v-8876803a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
          </span>
        </div>
        <div class="info-content-name" @click="$router.push('/profile/infouser')">
          <p class="m-info">
            <span class="m-info-label">用户名</span>
            <span class="m-info-text">111111111</span>
          </p>
          <span class="info-content-icon">
            <svg data-v-8876803a="" fill="#fff" class="m-icon m-icon-more"><use data-v-8876803a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
          </span>
        </div>
      </div>
      <div class="info-content-col">
        <h3 class="info-content-title">账号绑定</h3>
        <div class="info-content-tel" @click="$router.push('/profile/infobind')">
          <p class="m-info m-info-tel">
            <span class="m-info-label">
              <em class="m-info-label-icon m-info-tel-icon">
                <svg class="m-icon m-icon-tel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use></svg>
              </em>
              <span class="m-info-label-text">手机</span>
            </span>
            <span class="m-info-text">11111111111</span>
          </p>
          <span class="info-content-icon">
            <svg class="m-icon m-icon-more"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
          </span>
        </div>
      </div>
      <div class="info-content-col">
        <h3 class="info-content-title">安全设置</h3>
        <div class="info-content-pwd" @click="$router.push('/profile/infopwd')">
          <p class="m-info">
            <span class="m-info-label">登录密码</span>
            <span class="m-info-text">未设置</span>
          </p>
          <span class="info-content-icon">
            <svg data-v-8876803a="" fill="#fff" class="m-icon m-icon-more"><use data-v-8876803a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
          </span>
        </div>
      </div>
    </div>
    <div class="info-footer">
      <button class="info-footer-btn">退出登录</button>
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

.info{
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  &-content{
    &-col{
      margin-bottom: .4rem;
    }
    &-avatar{
      position: relative;
      border-bottom: 1px solid #eee;
    }
    &-name{
      position: relative;
    }
    &-tel{
      position: relative;
    }
    &-pwd{
      position: relative;
    }
    &-title{
      margin: 0 0 .2rem .3rem;
      font-size: @font-size-small;
      color: @text-color-9;
    }
    &-icon{
      position: absolute;
      right: 0.4rem;
      top: 50%;
      width: 0.2rem;
      height: 0.2rem;
      margin-top: -.1rem;
    }
  }
  &-footer{
    &-btn{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      background-color: #fff;
      color: @text-color-ff;
      font-size: @font-size-large;
      outline: none;
      border: none;
    }
  }
}
  .m-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .3rem .7rem .3rem .3rem;
    background-color: #fff;
    &-label{
      display: flex;
      align-items: center;
      font-size: @font-size-large;
      font-weight: @font-weight-bold;
      color: @text-color-3;
      &-icon{
        margin-right: .1rem;
      }
      &-text{
        color: inherit;
        font-size: inherit;
        font-weight: inherit;
      }
    }
    &-img{
      height: 1.2rem;
      width: 1.2rem;
      border-radius: 1.2rem;
    }
  }
  .m-info-tel{
    &-icon{
      display: inline-block;
      height: .32rem;
      width: .2rem;
    }
  }
  .info-content-pwd {
    .m-info-label{
      font-weight: @font-weight-normal;
    }
    .m-info-text{
      font-size: @font-size-large-s;
      color: #0097ff;
    }
  }
</style>
