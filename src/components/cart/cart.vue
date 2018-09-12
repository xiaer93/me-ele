<template>
  <div class="cart">
    <div class="cart-header">
      <header-title>购物车</header-title>
    </div>
    <div class="cart-content">
      <div class="cart-content-item">
        <div class="cart-content-header">
          <h2 class="cart-content-header-title">肯德基宅急送（硚口路店）<span><svg class="m-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg></span></h2>
          <span class="cart-content-header-btn">
            <svg class="m-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#binCart"></use></svg>
          </span>
        </div>
        <ul class="cart-content-food">
          <li class="cart-content-food-item">
            <div class="cart-content-food-left">
              <img src="/static/restaurant/shop-food.webp" alt="" class="cart-content-food-avatar">
              <p class="cart-content-food-infos">
                <span class="cart-content-food-name">二块香辣鸡翅（炸鸡）</span>
                <span class="cart-content-food-number">X2</span>
              </p>
            </div>
            <p class="cart-content-food-right">
              <span class="cart-content-food-delete">
                <svg class="m-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use></svg>
              </span>
              <span class="cart-content-food-price">22</span>
            </p>
          </li>
        </ul>
        <div class="cart-content-pay">
          <p class="cart-content-pay-price">合计<span>￥22</span></p>
          <button class="cart-content-pay-btn">去结算</button>
        </div>
      </div>
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

.cart{
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #fff;
  &-header{

  }
  &-content{
    height: calc(100% - .9rem);
    overflow-y: scroll;
    &-item{
      margin-bottom: .1rem;
    }
    &-header{
      display: flex;
      height: 1rem;
      padding: 0 .32rem;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e0e0e0;
      &-title{
        font-size: @font-size-medium-s;
        color: @text-color-3;
        span{
          display: inline-block;
          width: .2rem;
          height: .4rem;
          vertical-align: middle;
        }
      }
      &-btn{
        width: .4rem;
        height: .4rem;
        .extend-click();
      }
    }
    &-food{
      &-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: .2rem .32rem;
        height: 1.4rem;
        border-bottom: 1px solid #e0e0e0;
      }
      &-left{
        display: flex;
        width: 80%;
        height: 100%;
      }
      &-avatar{
        width: 1rem;
        height: 1rem;
      }
      &-infos{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: .2rem;
        &-name{
          display: block;
          font-size: @font-size-medium-s;
          color: @text-color-3;
        }
        &-number{
          display: block;
          margin-top: ;
          font-size: @font-size-small-m;
          color: @text-color-9;
        }
      }
      &-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items:flex-end;
        height: 100%;
      }
      &-delete{
        width: .2rem;
        height: .2rem;
        .extend-click();
      }
      &-price{
        font-size: @font-size-large-s;
        color: @text-color-ff;
        font-weight: @font-weight-bold;
      }
    }
    &-pay{
      padding: .1rem .32rem;
      text-align: right;
      &-price{
        display: inline-block;
        font-size: @font-size-medium-s;
        color: @text-color-6;
        span{
          font-size: @font-size-large-s;
          font-weight: @font-weight-bold;
          color: @text-color-ff;
        }
      }
      &-btn{
        display: inline-block;
        margin-left: .2rem;
        width: 1.2rem;
        height: .66rem;
        line-height: .66rem;
        text-align: center;
        color: #fff;
        font-size: @font-size-medium;
        font-weight: @font-weight-bold;
        background-color: #29d96c;
        border-radius: .04rem;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
