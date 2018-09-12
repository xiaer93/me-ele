<template>
  <transition name="slide">
    <div class="restaurant">
    <div class="restaurant-img">
      <span class="restaurant-img-return">
        <svg class="m-icon m-icon-return" @click="$router.push('/')">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
          </svg>
      </span>
      <span class="restaurant-img-bg">
        <img :src="resData.restaurant.shopBg" alt="">
      </span>
      <img :src="resData.restaurant.shopAvatar" alt="" class="restaurant-img-avatar">
    </div>
    <div class="restaurant-header">
      <h2 class="restaurant-header-name">{{resData.restaurant.shopName}}</h2>
      <p class="restaurant-infos">
        <span class="restaurant-infos-likes">评价{{resData.restaurant.shopRate}}</span>
        <span class="restaurant-infos-sales">月售{{resData.restaurant.recentOrderNum}}单</span>
        <span class="restaurant-infos-time">蜂鸟送约{{resData.restaurant.orderLeadTime}}分钟</span>
      </p>
      <ul class="restaurant-money" @click="showRedPacket">
        <li class="restaurant-money-item">
          <span class="restaurant-money-if">￥<em>2</em> 满35可用</span>
          <span class="restaurant-money-get">领取</span>
        </li>
      </ul>
      <p class="restaurant-tips" @click="showActivity">
        <span class="restaurant-tips-left"><em>首单</em>新用户下单立减25元（不与其他活动同享）</span>
        <span class="restaurant-tips-right">5个优惠</span>
      </p>
      <p class="restaurant-notice">{{resData.restaurant.shopNotice}}</p>
    </div>
    <ul class="restaurant-tap">
      <li class="restaurant-tap-item" :class="{'active': currentComponent === 'RestaurantOrder'}">
        <span class="restaurant-tap-text">点餐</span>
      </li>
      <li class="restaurant-tap-item">
        <span class="restaurant-tap-text">评价</span>
      </li>
      <li class="restaurant-tap-item">
        <span class="restaurant-tap-text">商家</span>
      </li>
    </ul>
    <div class="restaurant-component">
      <!--<restaurant-order></restaurant-order>-->
      <!--动态组件，绑定is的变量为字符串~-->
      <component :is="currentComponent" :resData="resData"></component>
    </div>
    <!--红包弹窗-->
    <bottom-tips ref="redpacket" title="店铺专享红包" class="restaurant-redpacket">
      <ul class="restaurant-redpacket-content">
        <li class="restaurant-redpacket-content-item">
          <h4 class="restaurant-redpacket-contnet-tips">可领红包</h4>
          <div class="restaurant-redpacket-content-main">
            <span class="restaurant-redpacket-content-price">￥12</span>
            <p class="restaurant-redpacket-content-infos">
              <span class="restaurant-redpacket-content-rule">满￥177可用</span>
              <span class="restaurant-redpacket-content-date">限连锁店使用，2018-09-30到期</span>
            </p>
            <span class="restaurant-redpacket-content-btn">领取</span>
          </div>
        </li>
      </ul>
    </bottom-tips>
    <!--优惠活动弹窗-->
    <bottom-tips ref="activity" title="优惠活动" class="restaurant-activity">
      <ul class="restaurant-activity-content">
        <li class="restaurant-activity-content-item">
          <p class="restaurant-activity-content-infos">
            <em class="restaurant-activity-content-tag">满减</em>
            <span class="restaurant-activity-content-text">满50减1</span>
          </p>
        </li>
        <li class="restaurant-activity-content-item">
          <p class="restaurant-activity-content-infos">
            <em class="restaurant-activity-content-tag">首单</em>
            <span class="restaurant-activity-content-text">新用户下单立减13元（不与其他活动同享）</span>
          </p>
        </li>
      </ul>
    </bottom-tips>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import BottomTips from 'base/bottom-tips'
import RestaurantOrder from 'components/restaurant/restaurant-order.vue'
import shopApi from 'api/shop'
// import * as $ from 'jquery'

export default {
  data () {
    return {
      resData: {
        restaurant: {},
        shopFoods: []
      },
      currentComponent: 'RestaurantOrder'
    }
  },
  computed: {
  },
  methods: {
    getAllFood () {
      shopApi.getAllFood()
        .then(res => {
          if (res.code === 0) {
            this.resData = res.result
          } else {
            console.log(res.msg)
          }
        })
    },
    showRedPacket () {
      this.$refs.redpacket.show()
    },
    showActivity () {
      this.$refs.activity.show()
    }
  },
  created () {
    this.getAllFood()
  },
  mounted () {

  },
  components: {
    RestaurantOrder,
    BottomTips
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";
.restaurant{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  &-img{
    position: relative;
    height: 2rem;
    &-bg{
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    &-avatar{
      position: absolute;
      width: 1.5rem;
      left: 50%;
      top: .8rem;
      margin-left: -.75rem;
      box-shadow: 0 0 0.2rem 0 rgba(0,0,0,1);
    }
    &-return{
      position: absolute;
      display: block;
      height: .5rem;
      width: .5rem;
      left: .2rem;
      top: .1rem;
    }
  }
  &-header{
    margin-top: .6rem;
    text-align: center;
    &-name{
      font-size: @font-size-title;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
  }
  &-infos{
    margin-top: .12rem;
    font-size: @font-size-small;
    color: @text-color-6;
    &>span{
      &::after{
        display: inline-block;
        content: '';
        height: .2rem;
        width: .2rem;
      }
      &:last-child::after{
        display: none;
      }
    }
  }
  &-money{
    display: flex;
    justify-content: center;
    margin-top: .16rem;
    font-size: @font-size-small;
    color: #5c1603;
    &-item{
      width: 2.8rem;
      height: .5rem;
      line-height: .5rem;
      background-color: #fff4f4;
      border-radius: .05rem;
    }
    &-get{
      position: relative;
      display: inline-block;
      margin-left: .3rem;
      &::before{
        position: absolute;
        left: -.2rem;
        top: -.05rem;
        content: '';
        display: block;
        width: .1rem;
        height: .1rem;
        border-radius: .1rem;
        background-color: #fff;
      }
      &::after{
        position: absolute;
        left: -.2rem;
        bottom: -.05rem;
        content: '';
        display: block;
        width: .1rem;
        height: .1rem;
        border-radius: .1rem;
        background-color: #fff;
      }
    }
  }
  &-tips{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 6.4rem;
    margin: .24rem auto 0;
    font-size: @font-size-small;
    color: @text-color-3;
    .clearfix();
    &-left{
      width: 80%;
      .hide-text(1);
      &>em{
        display: inline-block;
        margin-right: .1rem;
        padding: .04rem .1rem;
        font-style: normal;
        color: @text-color-f;
        background-color: @text-bg-green;
        border-radius: .1rem;
      }
    }
    &-right{
      padding-right: .1rem;
      color: @text-color-9;
      .add-triangle();
      &::after{
        top: .1rem;
        right: -.14rem;
      }
    }
  }
  &-notice{
    width: 6.4rem;
    margin: .16rem auto .2rem;
    font-size: @font-size-small;
    color: @text-color-9;
    .hide-text(1);
  }
  &-tap{
    display: flex;
    margin: .4rem 0;
    &-item{
      font-size: @font-size-large-s;
      color: @text-color-6;
      margin: 0 .95rem;
      &.active{
        .restaurant-tap-text{
          color: @text-color-3;
          font-weight: @font-weight-bold;
        }
        .restaurant-tap-text::after{
          background-color: #2395ff;
        }
      }
    }
    &-text{
      position: relative;
      display: block;
      &::after{
        position: absolute;
        left: 0;
        bottom: -.2rem;
        display: block;
        content: '';
        width: 100%;
        height: .06rem;
        background-color: transparent;
      }
    }
  }
  &-component{

  }
  &-redpacket{
    height: 8rem;
    &-content{
      height: 100%;
      width: 100%;
      &-tips{
        font-size: @font-size-small-s;
      }
      &-main{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: .24rem 0;
        padding: 0 .36rem;
        height: 2rem;
        background-color: #fff;
      }
      &-price{
        font-size: .48rem;
        color: @text-color-ff;
        font-weight: @font-weight-bold;
      }
      &-infos{
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 3.6rem;
        height: 1.6rem;
        border-right: 1px dashed #333;
        &::before{
          position: absolute;
          right: -.12rem;
          top: -.36rem;
          content: '';
          width: .24rem;
          height: .24rem;
          border-radius: .24rem;
          background-color: #f5f5f5;
        }
        &::after{
          position: absolute;
          right: -.12rem;
          bottom: -.36rem;
          content: '';
          width: .24rem;
          height: .24rem;
          border-radius: .24rem;
          background-color: #f5f5f5;
        }
      }
      &-rule{
        display: block;
        font-size: @font-size-medium;
        color: @text-color-3;
      }
      &-date{
        display: block;
        margin-top: .2rem;
        font-size: @font-size-small-m;
        color: @text-color-6;
      }
      &-btn{
        width: 1.2rem;
        height: .6rem;
        line-height: .6rem;
        background-color: @text-color-ff;
        color: #fff;
        font-size: @font-size-small-s;
        font-weight: @font-weight-bold;
        text-align: center;
        border-radius: .6rem;
      }
    }
  }
  &-activity{
    height: 5.8rem;
    &-content{
      padding:  0 .4rem;
      &-item{
        margin-bottom: .26rem;
      }
      &-infos{
        line-height: .34rem;
      }
      &-tag{
        padding: .06rem .1rem;
        background-color: #f07373;
        color: #fff;
        font-size: @font-size-small-s;
        font-style: normal;
        border-radius: .1rem;
      }
      &-text{
        margin-left: .12rem;
        font-size: @font-size-medium-s;
        color: @text-color-3;
      }
    }
  }
}

/* search 切入切出动画*/
.slide-enter-active, .slide-leave-active{
  transition: all .3s;
}
.slide-enter, .slide-leave-to{
  transform: translate(100%, 0);
}
</style>
