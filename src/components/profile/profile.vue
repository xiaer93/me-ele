<template>
  <div class="profile">
    <div class="profile-header">
      <div class="profile-title">
        <span class="profile-title-return"></span>
        <h2 class="profile-title-text">我的</h2>
      </div>
      <div class="profile-users" @click="$router.push('/login')">
        <img src="/static/user-avatar.jpg" alt="" class="profile-users-avatar">
        <p class="profile-users-infos">
          <span class="profile-users-name">aaaa</span>
          <span class="profile-users-tel">111111111</span>
        </p>
        <span class="profile-users-btn">
          <svg class="m-icon m-icon-more" fill="#fff"><use xlink:href="#arrow-right"></use></svg>
        </span>
      </div>
    </div>
    <div class="profile-money">
      <div class="profile-money-item profile-money-cash">
        <span class="profile-money-number profile-money-number-blue">0.00yuan</span>
        <span class="profile-money-text">钱包</span>
      </div>
      <div class="profile-money-item profile-money-red">
        <span class="profile-money-number profile-money-number-red">0.00yuan</span>
        <span class="profile-money-text">红包</span>
      </div>
      <div class="profile-money-item profile-money-gold">
        <span class="profile-money-number profile-money-number-red">0.00yuan</span>
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
          我的地址
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
          我的地址
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
          我的地址
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
          <svg class="m-icon m-icon-more" fill="#fff"><use xlink:href="#arrow-right"></use></svg>
        </span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
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
    padding: 0.2rem 0;
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
      width: .6rem;
      height: .6rem;
      border-radius: .6rem;
    }
    &-infos{
      display: flex;
      flex-direction: column;
      margin-left: .36rem;
      color: #fff;
    }
    &-name{
      font-size: @font-size-large-s;
      font-weight: @font-weight-bold;
    }
    &-tel{
      font-size: @font-size-small-m;
    }
    &-btn{
      position: absolute;
      right: .3rem;
      top: .6rem;
      width: .4rem;
      height: .4rem;
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
      border-right: 1px solid #f6f6f6;
    }
    &-number{
      font-size: @font-size-large-s;
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
      margin-left: .2rem;
      font-size: @font-size-medium;
      color: @text-color-3;
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
