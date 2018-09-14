<template>
  <div class="order">
    <div class="order-banner">
      <banner :imgList="bannerList"></banner>
    </div>
    <div class="order-recommend">
      <h2 class="order-recommend-title">商家推荐</h2>
      <div class="order-recommend-scroll">
        <ul class="order-recommend-content" :style="{'width': `${recommendFood.length * 2.6 + .4}rem`}">
          <li class="m-food-recommend"
              v-for="(food, index) in recommendFood"
              :key="index"
          >
            <p class="m-food-recommend-mask">
              <img :src="food.foodImg" alt="" class="m-food-recommend-avatar">
            </p>
            <p class="m-food-recommend-name">{{food.foodName}}</p>
            <p class="m-food-recommend-infos">
              <span class="m-food-recommend-sales">月售{{food.foodSales}}</span>
              <span class="m-food-recommend-likes">好评率{{food.foodLikes}}%</span>
            </p>
            <p class="m-food-recommend-price">{{food.foodPrice}}</p>
            <p class="m-food-recommend-control">
              <span class="m-food-recommend-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
              {{11}}
              <span class="m-food-recommend-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>

    <!--// 不能够在父组件内控制子组件的样式，!!! 可以，但是组件必须使用$el指向dom元素-->
    <lift class="order-lift" ref="lift">
      <lift-number class="order-lift-number">
        <div class="order-lift-number-item" v-for="(name, index) in foodCatalog" :key="index">{{name}}</div>
      </lift-number>
      <lift-main class="order-lift-main">
        <div class="order-lift-main-item" v-for="(item, index) in foodList" :key="index">
          <h3 class="order-lift-main-title">
            {{item.name}}<span class="order-main-description">{{item.description}}</span>
          </h3>
          <ul class="order-lift-main-food">
            <li class="order-main-item m-food" v-for="(food, foodIndex) in item.foods" :key="foodIndex">
              <p class="m-food-mask">
                <img :src="food.foodAvatar" alt="">
              </p>
              <div class="m-food-content">
                <h3 class="m-food-name">{{food.name}}</h3>
                <p class="m-food-description">{{food.foodDesc}}</p>
                <p class="m-food-infos">
                  <span class="m-food-sales">月售{{food.foodMounthCount}}份</span>
                  <span class="m-food-likes">好评率{{food.foodRate || 66}}%</span>
                </p>
                <p class="m-food-discount">
                  <span class="m-food-discount-number">4折</span>
                  <span class="m-food-discount-text">每单限1份优惠</span>
                </p>
                <p class="m-food-price">
                  <span class="m-food-price-new">1.6</span>
                  <span class="m-food-price-old">4</span>
                </p>
                <p class="m-food-control">
              <span class="m-food-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
                  {{11}}
              <span class="m-food-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </lift-main>
    </lift>
    <!--// 为什么touchmove.prevent不能放在order-cart中？？？父元素为容器，子元素滚动，放在父元素中prevent会阻止滚动-->
    <div class="order-cart">
      <div class="order-cart-mask" v-show="isShowCart" @click="isShowCart = false"></div>
      <div class="order-cart-notice">已减8元</div>
      <div class="order-cart-list" :style="{'maxHeight': isShowCart ? '7rem' : '0'}">
        <h3 class="order-cart-list-header">
          <span class="order-cart-list-title">已选商品</span>
          <p class="order-cart-list-clear">
            <svg class="m-icon m-icon-clear"><use xlink:href="#cart-remove"></use></svg>
            <span>清空</span>
          </p>
        </h3>
        <div class="order-cart-list-content">
          <ul class="order-cart-list-scroll">
            <li class="order-cart-list-item">
              <p class="order-cart-list-left">
                <span class="order-cart-list-name">低温澳大利亚牛肉沙拉</span>
                <span class="order-cart-list-taste">无糖/经典凯撒汁</span>
              </p>
              <p class="order-cart-list-center">11</p>
              <p class="order-cart-list-right">
              <span class="order-cart-list-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
                {{11}}
              <span class="order-cart-list-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
              </p>
            </li>
            <li class="order-cart-list-item">
              <p class="order-cart-list-left">
                <span class="order-cart-list-name">低温澳大利亚牛肉沙拉</span>
                <span class="order-cart-list-taste">无糖/经典凯撒汁</span>
              </p>
              <p class="order-cart-list-center">22</p>
              <p class="order-cart-list-right">
              <span class="order-cart-list-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
                {{11}}
              <span class="order-cart-list-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
              </p>
            </li>
            <li class="order-cart-list-item">
              <p class="order-cart-list-left">
                <span class="order-cart-list-name">低温澳大利亚牛肉沙拉</span>
                <span class="order-cart-list-taste">无糖/经典凯撒汁</span>
              </p>
              <p class="order-cart-list-center">11</p>
              <p class="order-cart-list-right">
              <span class="order-cart-list-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
                {{11}}
              <span class="order-cart-list-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
              </p>
            </li>
            <li class="order-cart-list-item">
              <p class="order-cart-list-left">
                <span class="order-cart-list-name">低温澳大利亚牛肉沙拉</span>
                <span class="order-cart-list-taste">无糖/经典凯撒汁</span>
              </p>
              <p class="order-cart-list-center">22</p>
              <p class="order-cart-list-right">
              <span class="order-cart-list-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
                {{11}}
              <span class="order-cart-list-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
              </p>
            </li>
            <li class="order-cart-list-item">
              <p class="order-cart-list-left">
                <span class="order-cart-list-name">低温澳大利亚牛肉沙拉</span>
                <span class="order-cart-list-taste">无糖/经典凯撒汁</span>
              </p>
              <p class="order-cart-list-center">11</p>
              <p class="order-cart-list-right">
              <span class="order-cart-list-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
                {{11}}
              <span class="order-cart-list-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
              </p>
            </li>
            <li class="order-cart-list-item">
              <p class="order-cart-list-left">
                <span class="order-cart-list-name">低温澳大利亚牛肉沙拉</span>
                <span class="order-cart-list-taste">无糖/经典凯撒汁</span>
              </p>
              <p class="order-cart-list-center">22</p>
              <p class="order-cart-list-right">
              <span class="order-cart-list-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
                {{11}}
              <span class="order-cart-list-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
              </p>
            </li>
            <li class="order-cart-list-item">
              <p class="order-cart-list-left">
                <span class="order-cart-list-name">低温澳大利亚牛肉沙拉</span>
                <span class="order-cart-list-taste">无糖/经典凯撒汁</span>
              </p>
              <p class="order-cart-list-center">11</p>
              <p class="order-cart-list-right">
              <span class="order-cart-list-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
                {{11}}
              <span class="order-cart-list-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
              </p>
            </li>
            <li class="order-cart-list-item">
              <p class="order-cart-list-left">
                <span class="order-cart-list-name">低温澳大利亚牛肉沙拉</span>
                <span class="order-cart-list-taste">无糖/经典凯撒汁</span>
              </p>
              <p class="order-cart-list-center">22</p>
              <p class="order-cart-list-right">
              <span class="order-cart-list-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
                {{11}}
              <span class="order-cart-list-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
              </p>
            </li>
            <li class="order-cart-list-item">
              <p class="order-cart-list-left">
                <span class="order-cart-list-name">餐盒</span>
              </p>
              <p class="order-cart-list-center">22</p>
              <p class="order-cart-list-right"></p>
            </li>
          </ul>
        </div>
      </div>
      <div class="order-cart-content">
        <span class="order-cart-icon" @click="toggleCart"></span>
        <p class="order-cart-tips">
          <span class="order-cart-price">为选购商品</span>
          <span class="order-cart-shipping">另需配送费2.1元</span>
        </p>
        <p class="order-cart-btn">满20起送</p>
      </div>
    </div>
    <!--优惠信息弹窗-->
    <div class="order-activity"></div>
    <toast :message="'hello word'"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
import {Lift, LiftMain, LiftNumber} from 'base/lift/index'
import Banner from 'base/banner'
import Toast from 'base/toast'
import * as $ from 'jquery'

export default {
  props: {
    resData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      bannerList: [
        {
          'id': 20097237,
          'type': 1,
          'image': '/static/banner/5.webp',
          'url': ''
        }
      ],
      isShowCart: false
    }
  },
  computed: {
    foodList () {
      return this.resData.shopFoods
    },
    foodCatalog () {
      return this.resData.shopFoods.length ? this.resData.shopFoods.map(t => { return t.name }) : []
    },
    recommendFood () {
      return []
    }
  },
  methods: {
    addCart (item) {
      if (item.taste) {

      } else {

      }
    },
    toggleCart () {
      this.isShowCart = !this.isShowCart
    }
  },
  created () {

  },
  mounted () {
    setTimeout(() => {
      $(this.$refs.lift.$el).css({
        height: $(window).height()
      })
    }, 20)
  },
  components: {
    Lift,
    LiftMain,
    LiftNumber,
    Banner,
    Toast
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.order{
  height: 100%;
  background-color: #fff;
  &-banner{
    position: relative;
    z-index: 0;
    height: 1.8rem;
  }
  &-recommend{
    margin-top: .2rem;
    &-title{
      margin: .32rem 0 .2rem .32rem;
      font-size: @font-size-large;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-scroll{
      width: 100%;
      overflow-x: scroll;
    }
    &-content{
      width: auto;
      display: flex;
    }
  }
  &-lift{
    display: flex;
    box-sizing: border-box;
    padding-bottom: 1.4rem;
    margin-top: .3rem;
    &-main{
      flex: 1 1 auto;
      height: 100%;
      padding-right: .4rem;
      &-title{
        font-size: @font-size-small-s;
        color: @text-color-6;
        font-weight: @font-weight-bold;
        line-height: 1;
      }
      &-description{
        margin-left: .1rem;
        font-size: @font-size-small-m;
        color: @text-color-9;
      }
    }
    &-number{
      flex: 0 0 auto;
      height: 100%;
      width: 1.6rem;
      margin-right: .2rem;
      background-color: #f8f8f8;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      &-item{
        padding: .4rem 0 .4rem .1rem;
        font-size: @font-size-small-s;
        color: @text-color-6;
        &.active{
          color: @text-color-3;
          background-color: #fff;
        }
      }
    }
  }
  &-cart{
    position: fixed;
    z-index: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    /*height: 1.4rem;*/
    &-notice{
      height: .4rem;
      line-height: .4rem;
      font-size: @font-size-small-m;
      color: @text-color-3;
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
      color: @text-color-9;
      font-size: @font-size-small-m;
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
    &-list{
      display: flex;
      flex-direction: column;
      max-height: 7rem;
      transition: all .6s;
      &-header{
        flex: 0 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .8rem;
        padding: 0 .3rem;
        /*line-height: .8rem;*/
        font-size: @font-size-large;
        color: @text-color-6;
        background-color: #eceff1;
      }
      &-title{

      }
      &-clear{
        position: relative;
        padding-right: .6rem;
        width: .4rem;
        height: .4rem;
        line-height: .4rem;
        span{
          position: absolute;
          display: block;
          width: .6rem;
          top: 0;
          right: 0;
          font-size: @font-size-medium-s;
          color: @text-color-6;
          text-align: center;
        }
      }
      &-content{
        flex: 1 1 auto;
        background-color: #fff;
        overflow: scroll;
      }
      &-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .15rem .25rem;
        min-height: .8rem;
        border-bottom: 1px solid #eee;
      }
      &-left{
        flex: 1 1 auto;
      }
      &-center{
        flex: 0 0 auto;
        width: 1rem;
        text-align: center;
      }
      &-right{
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        width: 1.4rem;
        height: .4rem;
      }
      &-name{
        display: block;
        font-size: @font-size-large;
        color: @text-color-3;
        line-height: .5rem;
      }
      &-taste{
        display: block;
        font-size: @font-size-small-m;
        color: @text-color-9;
      }
      &-minus{
        margin-right: .1rem;
        width: .4rem;
        height: .4rem;
      }
      &-add{
        margin-left: .1rem;
        width: .4rem;
        height: .4rem;
      }
    }
    &-mask{
      position: fixed;
      z-index: -1;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,.5);
    }
  }
}
// 推荐美食
.m-food-recommend{
  position: relative;
  width: 2.4rem;
  margin: 0 .1rem;
  &:first-child{
    margin-left: .32rem;
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
    width: 100%;
    font-size: @font-size-medium;
    color: @text-color-3;
    .hide-text(1);
  }
  &-infos{
    margin: .1rem 0;
    font-size: @font-size-small-m;
    color: @text-color-9;
  }
  &-sales{

  }
  &-price{
    margin: .2rem 0;
    font-size: @font-size-large-l;
    color: @text-color-ff;
    &::before{
      display: inline-block;
      margin-right: -.06rem;
      content: '￥';
      font-size: @font-size-large-s;
    }
  }
  &-control{
    position: absolute;
    right: 0;
    bottom: .14rem;
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
// 店铺所有美食
.m-food{
  display: flex;
  margin: .4rem 0;
  width: 100%;
  &-mask{
    flex: 0 0 auto;
    width: 2rem;
    height: 2rem;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  &-content{
    position: relative;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: .1rem;
  }
  &-name{
    font-size: @font-size-large-s;
    font-weight: @font-weight-bold;
    color: @text-color-3;
  }
  &-description{
    font-size: @font-size-small-m;
    color: @text-color-9;
  }
  &-infos{
    font-size: @font-size-small-m;
    color: @text-color-9;
  }
  &-sales{

  }
  &-likes{
    display: inline-block;
    margin-left: .1rem;
  }
  &-discount{
    font-size: .24rem;
    color: #f18080;
  }
  &-price{
    display: flex;
    align-items: flex-end;
    &-new{
      font-size: @font-size-large-l;
      color: @text-color-ff;
      &::before{
        display: inline-block;
        margin-right: -.06rem;
        content: '￥';
        font-size: @font-size-large-s;
      }
    }
    &-old{
      margin-left: .1rem;
      margin-bottom: .02rem;
      font-size: @font-size-small-m;
      color: @text-color-9;
      &::before{
        display: inline-block;
        margin-right: -.02rem;
        content: '￥';
      }
    }
  }
  &-control{
    position: absolute;
    right: 0;
    bottom: -.04rem;
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
</style>
