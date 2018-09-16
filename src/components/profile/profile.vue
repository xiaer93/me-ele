<template>
  <div class="profile">
    <div class="profile-header">
      <div class="profile-title">
        <header-title @back="$router.back()">我的</header-title>
      </div>
      <div class="profile-users" @click="login">
        <img :src="userAvatar" alt="" class="profile-users-avatar">
        <p class="profile-users-infos">
          <span class="profile-users-name">{{userInfo.name || '登录/注册'}}</span>
          <span class="profile-users-tel">
            <em class="profile-users-tel-icon"><svg fill="#fff" class="m-icon m-icon-tel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use></svg></em>
            {{userInfo.tel || '登录后享受更多特权'}}
          </span>
        </p>
        <span class="profile-users-btn">
          <svg class="m-icon m-icon-more" fill="#fff"><use xlink:href="#arrow-right"></use></svg>
        </span>
      </div>
    </div>
    <div class="profile-money">
      <div class="profile-money-item profile-money-cash">
        <span class="profile-money-number profile-money-number-blue">0.00<em class="profile-money-tag">元</em></span>
        <span class="profile-money-text">钱包</span>
      </div>
      <div class="profile-money-item profile-money-red">
        <span class="profile-money-number profile-money-number-red">0<em class="profile-money-tag">个</em></span>
        <span class="profile-money-text">红包</span>
      </div>
      <div class="profile-money-item profile-money-gold">
        <span class="profile-money-number profile-money-number-red">0<em class="profile-money-tag">个</em></span>
        <span class="profile-money-text">金币</span>
      </div>
    </div>
    <div class="profile-address m-links" @click="$router.push('/profile/address')">
      <span class="m-links-icon">
        <svg fill="#4aa5f0" class="m-icon"><use xlink:href="#address"></use></svg>
      </span>
      <p class="m-links-text">
        我的地址
      </p>
      <span class="m-links-btn">
        <svg class="m-icon m-icon-more" fill="#fff"><use xlink:href="#arrow-right"></use></svg>
      </span>
    </div>
    <ul class="profile-activity">
      <li class="profile-activity-item m-links">
        <span class="m-links-icon">
          <svg fill="#fc7b53" class="m-icon"><use xlink:href="#point"></use></svg>
        </span>
        <p class="m-links-text">
          金币商城
        </p>
        <span class="m-links-btn">
          <svg class="m-icon m-icon-more" fill="#fff"><use xlink:href="#arrow-right"></use></svg>
        </span>
      </li>
      <li class="profile-activity-item m-links">
        <span class="m-links-icon">
          <svg fill="" class="m-icon"><use xlink:href="#commend"></use></svg>
        </span>
        <p class="m-links-text">
          分享拿10元现金
        </p>
        <span class="m-links-btn">
          <svg class="m-icon m-icon-more" fill="#fff"><use xlink:href="#arrow-right"></use></svg>
        </span>
      </li>
    </ul>
    <ul class="profile-contact">
      <li class="profile-contact-item m-links">
        <span class="m-links-icon">
          <svg fill="#4aa5f0" class="m-icon"><use xlink:href="#service"></use></svg>
        </span>
        <p class="m-links-text">
          我的客服
        </p>
        <span class="m-links-btn">
          <svg class="m-icon m-icon-more" fill="#fff"><use xlink:href="#arrow-right"></use></svg>
        </span>
      </li>
      <li class="profile-activity-item m-links">
        <span class="m-links-icon">
          <svg fill="#3cabff" class="m-icon"><use xlink:href="#download"></use></svg>
        </span>
        <p class="m-links-text">
          下载饿了么APP
        </p>
        <span class="m-links-btn">
           <svg class="m-icon m-icon-more"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
        </span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderTitle from 'base/header-title'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    userAvatar () {
      return this.userInfo.avatar || '/static/users/user-avatar.jpg'
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    login () {
      this.$router.push('/profile/info')
    }
  },
  components: {
    HeaderTitle
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.profile{
  min-height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  &-header{
    .gradient-bg-2();
  }
  &-title{
    position: relative;
    &-return{
      position: absolute;
      left: .1rem;
      top: .1rem;
      width: .4rem;
      height: .4rem;
    }
    &-text{
      display: block;
      font-size: @font-size-large-l;
      color: @text-color-f;
      font-weight: @font-weight-bold;
      text-align: center;
    }
  }
  &-users{
    position: relative;
    display: flex;
    padding: .5rem .3rem;
    &-avatar{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: .6rem;
    }
    &-infos{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: .36rem;
      color: #fff;
    }
    &-name{
      font-size: @font-size-title;
      font-weight: @font-weight-bold;
    }
    &-tel{
      margin-top: .3rem;
      font-size: @font-size-small-m;
      &-icon{
        display: inline-block;
        height: .22rem;
        width: .2rem;
      }
    }
    &-btn{
      position: absolute;
      right: .3rem;
      top: 1rem;
      width: .2rem;
      height: .2rem;
    }
  }
  &-money{
    display: flex;
    width: 100%;
    height: 1.6rem;
    background-color: #fff;
    &-item{
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33%;
      border-right: 1px solid #f6f6f6;
    }
    &-number{
      font-size: .52rem;
      font-weight: @font-weight-bold;
      &-blue{
        color: #0098fb;
      }
      &-red{
        color: #ff5f3e;
      }
    }
    &-text{
      margin-top: .2rem;
      font-size: @font-size-small;
      font-weight: @font-weight-bold;
    }
    &-tag{
      font-size: @font-size-small-m;
      font-style: normal;
    }
  }
  &-address{
    margin: .2rem 0;
  }
  &-activity{
    margin: .2rem 0;
  }
  &-contact{
    margin: .2rem 0;
  }
}
  .m-links{
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 .24rem;
    height: .9rem;
    background-color: #fff;
    border-bottom: 1px solid #fbfbfb;
    &-icon{
      width: .4rem;
      height: .4rem;
    }
    &-text{
      flex: 1 1 auto;
      height: 100%;
      line-height: .9rem;
      margin-left: .2rem;
      font-size: @font-size-medium;
      color: @text-color-3;
      border-bottom: 1px solid #eee;
    }
    &-btn{
      position: absolute;
      right: .2rem;
      top: .35rem;
      width: .2rem;
      height: .2rem;
    }
  }
</style>
