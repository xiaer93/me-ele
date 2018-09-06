<template>
  <transition name="slide">
    <div class="restaurant">
    <div class="restaurant-img">
      <span class="restaurant-img-return">
        <svg class="restaurant-icon restaurant-icon-return" @click="$router.push('/')">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
          </svg>
      </span>
      <span class="restaurant-img-bg">
        <img src="/static/restaurant/shop-bg.webp" alt="">
      </span>
      <img src="/static/restaurant/shop-avatar.webp" alt="" class="restaurant-img-avatar">
    </div>
    <div class="restaurant-header">
      <h2 class="restaurant-header-name">形成小故事</h2>
      <p class="restaurant-infos">
        <span class="restaurant-infos-likes">评价4.6</span>
        <span class="restaurant-infos-sales">月售684单</span>
        <span class="restaurant-infos-time">蜂鸟送约65分钟</span>
      </p>
      <ul class="restaurant-money">
        <li class="restaurant-money-item">
          <span class="restaurant-money-if">￥<em>2</em> 满35可用</span>
          <span class="restaurant-money-get">领取</span>
        </li>
      </ul>
      <p class="restaurant-tips">
        <span class="restaurant-tips-left">收单 新用户下单立减25元（不与其他活动同享）</span>
        <span class="restaurant-tips-right">5个优惠</span>
      </p>
      <p class="restaurant-notice">
        公告：温馨提示：9：00—17：00期间闭店状态可以下预订单！所有菜品不包含米饭，米饭需单点。不单独提供餐具，餐具只包含筷子和勺子，谢谢！
      </p>
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
    <div class="restaurant-banner">
      <banner :imgList="bannerList"></banner>
    </div>
    <div class="restaurant-recommend">
      <h2 class="restaurant-recommend-title">商家推荐</h2>
      <div class="restaurant-recommend-scroll">
        <ul class="restaurant-recommend-content" :style="{'width': `${recommendFood.length * 2.6}rem`}">
          <li class="restaurant-recommend-item"
              v-for="(food, index) in recommendFood"
              :key="index"
          >
            <p class="restaurant-recommend-mask">
              <img :src="food.foodImg" alt="" class="restaurant-recommend-avatar">
            </p>
            <p class="restaurant-recommend-name">{{food.foodName}}</p>
            <p class="restaurant-recommend-infos">
              <span class="restaurant-recommend-sales">月售{{food.foodSales}}</span>
              <span class="restaurant-recommend-likes">好评率{{food.foodLikes}}%</span>
            </p>
            <p class="restaurant-recommend-price">{{food.foodPrice}}</p>
            <p class="restaurant-recommend-control">
              <span class="restaurant-recommend-minus">
               <svg class="restaurant-icon restaurant-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
              {{11}}
              <span class="restaurant-recommend-add">
                <svg class="restaurant-icon restaurant-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="restaurant-component" :style="{'height': orderHeight, 'paddingBottom': paddingBottom}">
      <!--<restaurant-order></restaurant-order>-->
      <!--动态组件，绑定is的变量为字符串~-->
      <component :is="currentComponent"></component>
    </div>
    <div class="restaurant-cart">
      <div class="restaurant-cart-notice">已减8元</div>
      <div class="restaurant-cart-content">
        <span class="restaurant-cart-icon"></span>
        <p class="restaurant-cart-tips">
          <span class="restaurant-cart-price">为选购商品</span>
          <span class="restaurant-cart-shipping">另需配送费2.1元</span>
        </p>
        <p class="restaurant-cart-btn">满20起送</p>
      </div>
    </div>
    <!--优惠信息弹窗-->
    <div class="restaurant-activity"></div>
    <!--黑色遮罩层-->
    <div class="restaurant-mask"></div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import * as $ from 'jquery'
import RestaurantOrder from 'components/restaurant/restaurant-order.vue'
import Banner from 'base/banner'
import shopApi from 'api/shop'

export default {
  data () {
    return {
      currentComponent: 'RestaurantOrder',
      bannerList: [
        {
          'id': 20097237,
          'banner_type': 1,
          'image_hash': '/static/banner/5.webp',
          'url': ''
        }
      ],
      recommendFood: []
    }
  },
  computed: {
    orderHeight () {
      return this.currentComponent === 'RestaurantOrder' ? `${$(window).outerHeight()}px` : 'auto'
    },
    paddingBottom () {
      return this.currentComponent === 'RestaurantOrder' ? `1.4rem` : '0'
    }
  },
  methods: {
    getRecommendFood () {
      shopApi.getRecommendFood()
        .then(res => {
          if (res.code === 0) {
            this.recommendFood = res.result.recommendFood
          } else {
            console.log(res.msg)
          }
        })
    }
  },
  created () {
    this.getRecommendFood()
  },
  mounted () {

  },
  components: {
    RestaurantOrder,
    Banner
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";
.restaurant{
  position: relative;
  z-index: 2;
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
      box-shadow: 0 0 0.4rem 0 rgba(0,0,0,1);
    }
    &-return{
      position: absolute;
      display: block;
      height: .3rem;
      width: .3rem;
      left: .2rem;
      top: .2rem;
    }
  }
  &-header{
    margin-top: .6rem;
    text-align: center;
    &-name{
      font-size: .46rem;
      color: #000;
      font-weight: bold;
    }
  }
  &-infos{
    font-size: .22rem;
    color: #a3a3a3;
  }
  &-money{
    display: flex;
    justify-content: center;
    font-size: .22rem;
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
  &-icon{
    width: inherit;
    height: inherit;
    &-return{
      fill: #fff;
    }
    &-add{
      fill: rgb(35, 149, 255);
    }
    &-minus{
      fill: rgb(35, 149, 255);
    }
  }
  &-tips{
    width: 6.4rem;
    margin: 0 auto;
    font-size: .24rem;
    color: #333;
    .clearfix();
    &-left{
      float: left;
      width: 85%;
      .f-hide-text(1)
    }
    &-right{
      float: right;
      color: #999;
    }
  }
  &-notice{
    width: 6.4rem;
    margin: 0 auto;
    font-size: .24rem;
    color: #333;
    .f-hide-text(1);
  }
  &-banner{
    height: 1.8rem;
  }
  &-tap{
    display: flex;
    margin: .4rem 0;
    &-item{
      font-size: .28rem;
      color: #5f5f5f;
      margin: 0 .96rem;
      &.active{
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
  &-recommend{
    margin: .2rem 0;
    &-title{
      margin: .2rem 0;
      font-size: .32rem;
      color: #333;
    }
    &-scroll{
      width: 100%;
      overflow-x: scroll;
    }
    &-content{
      width: auto;
      display: flex;
    }
    &-item{
      position: relative;
      width: 2.4rem;
      margin: 0 .1rem;
    }
    &-mask{
      width: 2.4rem;
      height: 2.4rem;
      overflow: hidden;
    }
    &-avatar{
      width: 100%;
      border-radius: .06rem;
    }
    &-name{
      margin: .1rem 0;
      font-size: .24rem;
      color: #333;
    }
    &-infos{
      margin: .1rem 0;
      font-size: .18rem;
      color: #999;
    }
    &-price{
      margin: .2rem 0;
      font-size: .26rem;
      color: #ff5339;
    }
    &-control{
      position: absolute;
      right: 0;
      bottom: .1rem;
      display: flex;
      align-items: center;
      /*width: 1.2rem;*/
      height: .46rem;
      font-size: .24rem;
    }
    &-add{
      display: block;
      width: .4rem;
      height: .4rem;
      margin-left: .1rem;
    }
    &-minus{
      display: block;
      width: .4rem;
      height: .4rem;
      margin-right: .1rem;
    }
  }
  &-cart{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.4rem;
    &-notice{
      height: .4rem;
      line-height: .4rem;
      font-size: .2rem;
      color: #3c3c3c;
      text-align: center;
      background-color: #fffad8;
    }
    &-content{
      position: relative;
      height: 1rem;
      background-color: #505052;
      .clearfix()
    }
    &-tips{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      float: left;
      height: 100%;
      margin-left: 1.6rem;
    }
    &-price{
      display: block;
      color: #fbfbfb;
    }
    &-shipping{
      display: block;
      color: #999;
      font-size: .2rem;
    }
    &-icon{
      position: absolute;
      left: 0.24rem;
      top: -0.3rem;
      box-sizing: border-box;
      width: 1rem;
      height: 1rem;
      border: .1rem solid #444;
      border-radius: 1rem;
      background: #3190e8 url("~common/image/cart-active.svg") no-repeat center/.4rem auto;
    }
    &-btn{
      float: right;
      width: 2rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: #fff;
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
