<template>
  <div class="cart">
    <div class="cart-header">
      <header-title @back="$router.back()">购物车</header-title>
    </div>
    <div class="cart-content">
      <div class="cart-content-item" v-for="shop in shops" :key="shop._id">
        <div class="cart-content-header">
          <h2 class="cart-content-header-title" @click="$router.push({name: 'Restaurant', query: {id: shop._id}})">{{shop.name}}<span><svg class="m-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg></span></h2>
          <span class="cart-content-header-btn" @click="deleteCart(shop)">
            <svg class="m-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#binCart"></use></svg>
          </span>
        </div>
        <ul class="cart-content-food">
          <li class="cart-content-food-item" v-for="food in Object.values(shop.foods)" :key="food._id">
            <div class="cart-content-food-left">
              <img :src="food.avatar" alt="" class="cart-content-food-avatar">
              <p class="cart-content-food-infos">
                <span class="cart-content-food-name">{{food.name}}</span>
                <span class="cart-content-food-number">X{{food.number}}</span>
              </p>
            </div>
            <p class="cart-content-food-right">
              <span class="cart-content-food-delete" @click="deleteFood(shop, food)">
                <svg class="m-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use></svg>
              </span>
              <span class="cart-content-food-price">{{food.price}}</span>
            </p>
          </li>
        </ul>
        <div class="cart-content-pay">
          <p class="cart-content-pay-price">合计<span>￥{{calculate(shop)}}</span></p>
          <button class="cart-content-pay-btn" @click="payMent">去结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderTitle from 'base/header-title'
import {mapMutations, mapGetters} from 'vuex'

// fixme: 为什么删除食物的时候，视图没有更新？？？
export default {
  computed: {
    shops () {
      return Object.values(this.cart)
    },
    ...mapGetters([
      'cart',
      'userInfo'
    ])
  },
  watch: {
    cart () {
      // vuex数据驱动bug？？？
      console.log('cart')
    }
  },
  methods: {
    calculate (shop) {
      return Object.values(shop.foods).reduce((total, food) => {
        return total + food.price * food.number
      }, 0)
    },
    deleteFood (shop, food) {
      let {_id} = food
      this.setCart({restaurant: shop, food: {_id, number: 0}})
    },
    deleteCart (shop) {
      this.clearCart({restaurant: shop})
    },
    payMent () {
      if (this.userInfo._id) {
        alert('敬请期待')
      } else {
        this.$router.push({
          name: 'Login'
        })
      }
    },
    ...mapMutations({
      setCart: 'SET_CART',
      clearCart: 'CLEAR_CART'
    })
  },
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
