<template>
  <transition name="slide">
    <div class="restaurant" ref="restaurant">
      <div class="restaurant-img">
        <span class="restaurant-img-return">
          <svg class="m-icon m-icon-return" @click="$router.back()">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
            </svg>
        </span>
        <span class="restaurant-img-bg">
          <img :src="restaurant.homeBg" alt="">
        </span>
        <img :src="restaurant.avatar" alt="" class="restaurant-img-avatar">
      </div>
      <div class="restaurant-header">
        <h2 class="restaurant-header-name">{{restaurant.name}}</h2>
        <p class="restaurant-infos">
          <span class="restaurant-infos-likes">评价{{restaurant.rate}}</span>
          <span class="restaurant-infos-sales">月售{{restaurant.recentOrderNum}}单</span>
          <span class="restaurant-infos-time">蜂鸟送约{{restaurant.leadTime}}分钟</span>
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
        <p class="restaurant-notice">{{restaurant.notice}}</p>
      </div>
      <ul class="restaurant-tap">
        <li class="restaurant-tap-item" @click="selectComponent('order')" :class="{'active': currentComponent === 'order'}">
          <span class="restaurant-tap-text">点餐</span>
        </li>
        <li class="restaurant-tap-item" @click="selectComponent('comment')" :class="{'active': currentComponent === 'comment'}">
          <span class="restaurant-tap-text">评价</span>
        </li>
        <li class="restaurant-tap-item" @click="selectComponent('about')" :class="{'active': currentComponent === 'about'}">
          <span class="restaurant-tap-text">商家</span>
        </li>
      </ul>
      <div class="restaurant-component">
        <!--<restaurant-order></restaurant-order>-->
        <!--动态组件，绑定is的变量为字符串~-->
        <transition name="fade">
          <div class="order" v-show="currentComponent === 'order'">
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
                      <img :src="food.avatar" alt="" class="m-food-recommend-avatar">
                    </p>
                    <p class="m-food-recommend-name">{{food.name}}</p>
                    <p class="m-food-recommend-infos">
                      <span class="m-food-recommend-sales">月售{{food.mounthCount}}</span>
                      <span class="m-food-recommend-likes">好评率{{food.rate}}%</span>
                    </p>
                    <p class="m-food-recommend-price">{{food.price}}</p>
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
                <div class="order-lift-main-item" v-for="(item, index) in shopFoods" :key="index">
                  <h3 class="order-lift-main-title">
                    {{item.name}}<span class="order-main-description">{{item.description}}</span>
                  </h3>
                  <ul class="order-lift-main-food">
                    <li class="order-main-item m-food" v-for="food in item.foods" :key="food._id">
                      <p class="m-food-mask">
                        <img :src="food.avatar" alt="">
                      </p>
                      <div class="m-food-content">
                        <h3 class="m-food-name">{{food.name}}</h3>
                        <p class="m-food-description">{{food.desc}}</p>
                        <p class="m-food-infos">
                          <span class="m-food-sales">月售{{food.mounthCount}}份</span>
                          <span class="m-food-likes">好评率{{food.rate || 66}}%</span>
                        </p>
                        <p class="m-food-discount">
                          <span class="m-food-discount-number">4折</span>
                          <span class="m-food-discount-text">每单限1份优惠</span>
                        </p>
                        <p class="m-food-price">
                          <span class="m-food-price-new">{{food.price}}</span>
                          <!--<span class="m-food-price-old">4</span>-->
                        </p>
                        <div class="m-food-control">
                          <!--fixme： 能不能只计算一次-->
                          <p class="m-food-number" v-show="food.number">
                            <span class="m-food-minus" @click="minusCart(food)">
                             <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
                            </span>
                            {{food.number}}
                          </p>
                          <span class="m-food-add" @click="addCart(food)">
                    <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
                  </span>
                        </div>
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
                  <p class="order-cart-list-clear" @click="deleteCart()">
                    <svg class="m-icon m-icon-clear"><use xlink:href="#cart-remove"></use></svg>
                    <span>清空</span>
                  </p>
                </h3>
                <div class="order-cart-list-content">
                  <ul class="order-cart-list-scroll">
                    <transition-group name="fadeOut">
                      <li class="order-cart-list-item" v-if="food.number" v-for="food in cartFood" :key="food._id">
                        <p class="order-cart-list-left">
                          <span class="order-cart-list-name">{{food.name}}</span>
                          <span class="order-cart-list-taste">无糖/经典凯撒汁</span>
                        </p>
                        <p class="order-cart-list-center">{{food.price}}</p>
                        <div class="order-cart-list-right">
                          <p class="order-cart-list-number">
                          <span class="order-cart-list-minus" @click="minusCart(food)">
                             <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
                            </span>
                            {{food.number}}
                        </p>
                          <span class="order-cart-list-add" @click="addCart(food)">
                          <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
                        </span>
                        </div>
                      </li>
                    </transition-group>
                  </ul>
                </div>
              </div>
              <div class="order-cart-content" :class="{'active': cartFood.length}">
                <span class="order-cart-icon" @click="toggleCart"></span>
                <p class="order-cart-tips">
                  <span class="order-cart-price">
                    <span class="order-cart-price-no">未选购商品</span>
                    <span class="order-cart-price-yes">￥{{totalPrice}}</span>
                  </span>
                  <span class="order-cart-shipping">另需配送费2.1元</span>
                </p>
                <p class="order-cart-btn" @click="payMoney">
                  <span class="order-cart-btn-no">￥20起送</span>
                  <span class="order-cart-btn-yes">去结算</span>
                </p>
              </div>
            </div>
            <!--优惠信息弹窗-->
            <div class="order-activity"></div>
            <toast :message="'hello word'"></toast>
          </div>
        </transition>
        <transition name="fade">
          <div class="comment" v-show="currentComponent === 'comment'">
            <div class="comment-score">
              <p class="comment-score-number">4.7</p>
              <div class="comment-score-star">
                <span class="comment-score-star-text">商家评论</span>
                <star></star>
              </div>
              <p class="comment-score-taste">
                <span class="comment-score-taste-text">味道</span>
                <span class="comment-score-taste-number">4.2</span>
              </p>
              <p class="comment-score-pack">
                <span class="comment-score-pack-text">包装</span>
                <span class="comment-score-pack-number">4.2</span>
              </p>
              <p class="comment-score-send">
                <span class="comment-score-taste-text">配送</span>
                <span class="comment-score-taste-number">4.4</span>
              </p>
            </div>
            <div class="comment-content">
              <ul class="comment-content-filter">
                <li class="comment-content-filter-item">全部<em>212</em></li>
                <li class="comment-content-filter-item">全部<em>212</em></li>
                <li class="comment-content-filter-item">全部<em>212</em></li>
                <li class="comment-content-filter-item">全部<em>212</em></li>
              </ul>
              <ul class="comment-content-main">
                <li class="m-comment">
                  <img src="/static/users/user-1.webp" alt="" class="m-comment-avatar">
                  <div class="m-comment-content">
                    <p class="m-comment-name">冬瓜</p>
                    <div class="m-comment-like">
                      <star></star>
                      <span class="m-comment-like-tag">满意</span>
                    </div>
                    <div class="m-comment-text">
                      请问我要多葱！！！葱在哪里？？？？！！！！
                    </div>
                    <ul class="m-comment-imgs">
                      <li class="m-comment-imgs-item">
                        <img src="/static/comment/1.webp" alt="">
                      </li>
                      <li class="m-comment-imgs-item">
                        <img src="/static/comment/1.webp" alt="">
                      </li>
                      <li class="m-comment-imgs-item">
                        <img src="/static/comment/1.webp" alt="">
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="about" v-show="currentComponent === 'about'">
            <div class="about-send">
              <h3 class="about-send-title">配送信息</h3>
              <p class="about-send-time">
                <span class="about-send-time-tag">蜂鸟配送</span>
                <span class="about-send-time-text">约30分钟送达，距离2.2km</span>
              </p>
              <p class="about-send-cost">配送费￥4.6</p>
            </div>
            <div class="about-server">
              <h3 class="about-server-title">活动与服务</h3>
              <p class="about-server-col">
                <span class="about-server-tag">满减</span>
                <span class="about-server-text">新用户下单立减13元(不与其它活动同享)</span>
              </p>
              <p class="about-server-col">
                <span class="about-server-tag">满减</span>
                <span class="about-server-text">新用户下单立减13元(不与其它活动同享)</span>
              </p>
              <p class="about-server-col">
                <span class="about-server-tag">满减</span>
                <span class="about-server-text">新用户下单立减13元(不与其它活动同享)</span>
              </p>
            </div>
            <div class="about-picture">
              <h3 class="about-picture-title">商家实景</h3>
              <ul class="about-picture-content">
                <li class="about-picture-item">
                  <img class="about-picture-item-img" src="/static/shop/shop-door.webp" alt="">
                  <span class="about-picture-item-text">门面(1张)</span>
                </li>
                <li class="about-picture-item">
                  <img class="about-picture-item-img" src="/static/shop/shop-door.webp" alt="">
                  <span class="about-picture-item-text">大堂(2张)</span>
                </li>
              </ul>
            </div>
            <div class="about-infos">
              <h3 class="about-infos-title">商家信息</h3>
              <p class="about-infos-content">金孔雀烧烤王 96年就开始凭借“烤凤爪、肉串、泡菜花饭 ”在南京路赫赫有名 无人不知无人不晓  基本上只要吃过的人都知道凤爪入口即化 花饭包你有回味.！</p>
              <p class="about-infos-detail">
                <span class="about-infos-left">品类</span>
                <span class="about-infos-right">烧烤、地方小吃</span>
              </p>
              <p class="about-infos-detail">
                <span class="about-infos-left">商家电话</span>
                <span class="about-infos-right">11111111111</span>
              </p>
              <p class="about-infos-detail">
                <span class="about-infos-left">地址</span>
                <span class="about-infos-right">南京路74号</span>
              </p>
              <p class="about-infos-detail">
                <span class="about-infos-left">营业时间</span>
                <span class="about-infos-right">12:40-23:40</span>
              </p>
            </div>
            <div class="about-certificate">
              <span class="about-certificate-left">营业资质</span>
              <span class="about-certificate-right">&gt;</span>
            </div>
          </div>
        </transition>
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
import shopApi from 'api/restaurant'
import {Lift, LiftMain, LiftNumber} from 'base/lift/index'
import Banner from 'base/banner'
import Toast from 'base/toast'
import Star from 'base/star'
import * as $ from 'jquery'
import {mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      resData: {},
      bannerList: [
        {
          'id': 20097237,
          'type': 1,
          'image': '/static/banner/5.webp',
          'url': ''
        }
      ],
      currentComponent: 'order',
      isShowCart: false
    }
  },
  computed: {
    restaurant () {
      return this.resData
    },
    shopFoods () {
      return this.resData.foodList
    },
    foodCatalog () {
      let tmpFoodList = this.resData.foodList
      if (tmpFoodList) {
        return tmpFoodList.length ? this.shopFoods.map(t => { return t.name }) : []
      } else {
        return []
      }
    },
    recommendFood () {
      return []
    },
    cartFood () {
      let retData = []
      let tmpFoodList = this.resData.foodList
      if (tmpFoodList) {
        let lenI = tmpFoodList.length
        for (let i = 0; i < lenI; ++i) {
          let tmpFoods = tmpFoodList[i].foods
          let tmpJ = tmpFoods.length
          for (let j = 0; j < tmpJ; ++j) {
            let food = tmpFoods[j]
            food.number && retData.push(food)
          }
        }
      }

      return retData
    },
    totalPrice () {
      return this.cartFood.reduce((total, item) => {
        return total + item.number * item.price
      }, 0)
    },
    // cartFood不适合做计算属性？
    ...mapGetters([
      'cart'
    ])
  },
  watch: {
    // 不能又更新，又指望从这个更新读取有效数据
    cart () {
      console.log('cart')
    }
  },
  methods: {
    getAllFood (params) {
      shopApi.getFood(params)
        .then(res => {
          if (res.code === 0) {
            this.resData = this._updateResData(res.result.restaurant)
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
    },
    toggleCart () {
      this.isShowCart = !this.isShowCart
    },
    addCart (food) {
      food.number += 1
      let {_id, name, avatar, price, number} = food
      this.setCart({_id, name, avatar, price, number})
    },
    minusCart (food) {
      food.number = Math.max(0, food.number - 1)
      let {_id, name, avatar, price, number} = food
      this.setCart({_id, name, avatar, price, number})
    },
    deleteCart () {
      let tmpFoodList = this.resData.foodList
      let lenI = tmpFoodList.length
      for (let i = 0; i < lenI; ++i) {
        let tmpFoods = tmpFoodList[i].foods
        let tmpJ = tmpFoods.length
        for (let j = 0; j < tmpJ; ++j) {
          let food = tmpFoods[j]
          food.number = 0
        }
      }

      this.clearCart()
    },
    payMoney () {
      if (this.cartFood.length) {
        this.isShowCart = false
        alert('敬请期待')
      }
    },
    selectComponent (component) {
      this.currentComponent = component
    },
    _updateResData (data) {
      // 根据本地信息更新购物车
      let tmpFoodList = data.foodList
      let lenI = tmpFoodList.length
      for (let i = 0; i < lenI; ++i) {
        let tmpFoods = tmpFoodList[i].foods
        let tmpJ = tmpFoods.length
        for (let j = 0; j < tmpJ; ++j) {
          let food = tmpFoods[j]
          if (this.cart[food._id]) {
            food.number = this.cart[food._id].number
          } else {
            food.number = 0
          }
        }
      }

      return data
    },
    ...mapMutations({
      setCart: 'SET_CART',
      clearCart: 'CLEAR_CART'
    })
  },
  created () {
    // 获取餐厅数据
    this.getAllFood({_id: this.$route.query.id})
  },
  mounted () {
    setTimeout(() => {
      $(this.$refs.lift.$el).css({
        height: $(window).height()
      })
    }, 20)
  },
  components: {
    BottomTips,
    Lift,
    LiftMain,
    LiftNumber,
    Banner,
    Toast,
    Star
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.restaurant{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  overflow-y: scroll;
  background-color: #f5f5f5;
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
    padding-top: .6rem;
    text-align: center;
    background-color: #fff;
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
    margin: 0 auto;
    padding: .16rem 0 .2rem;
    font-size: @font-size-small;
    color: @text-color-9;
    .hide-text(1);
  }
  &-tap{
    display: flex;
    padding: .3rem 0;
    background-color: #fff;
    border-bottom: 1px solid #eee;
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
        bottom: -.3rem;
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
      .clearfix();
      &.active{
        .order-cart-icon{
          background: #3190e8 url("~common/image/cart-active.svg") no-repeat center/.4rem auto;
        }
        .order-cart-price{
          &-no{
            display: none;
          }
          &-yes{
            display: block;
          }
        }
        .order-cart-btn{
          background-color: #38ca73;
          &-no{
            display: none;
          }
          &-yes{
            display: block;
          }
        }
      }
    }
    &-tips{
      display: flex;
      flex-direction: column;
      justify-content: center;
      float: left;
      height: 100%;
      margin-left: 1.6rem;
    }
    &-price{
      display: block;
      color: @text-color-9;
      &-no{
        display: block;
      }
      &-yes{
        display: none;
        font-size: @font-size-large-l;
        color: @text-color-f;
      }
    }
    &-shipping{
      display: block;
      margin-top: .1rem;
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
      background: #363636 url("~common/image/cart.svg") no-repeat center/.4rem auto;
    }
    &-btn{
      float: right;
      width: 2rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: #fff;
      font-weight: @font-weight-bold;
      &-no{
        display: block;
      }
      &-yes{
        display: none;
        color: @text-color-f;
        font-weight: inherit;
      }
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
        height: .8rem;
        /*min-height: .8rem;*/
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
      &-number{
        display: flex;
        align-items: center;
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
  &-number{
    display: flex;
    align-items: center;
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

.comment{
  &-score{
    display: flex;
    align-items: center;
    padding: 0 .5rem;
    height: 2rem;
    background-color: #fff;
    &-number{
      font-size: .8rem;
      color: @text-color-ff;
    }
    &-star{
      margin-left: .36rem;
      &-text{
        display: block;
        font-size: @font-size-small-s;
        color: @text-color-6;
        margin-bottom: .1rem;
      }
    }
    &-taste{
      margin-left: .6rem;
      color: @text-color-6;
      &-text{
        display: block;
        margin-bottom: .1rem;
        font-size: @font-size-small-s;
      }
      &-number{
        font-size: @font-size-large-l;
      }
    }
    &-pack{
      margin-left: .6rem;
      color: @text-color-6;
      &-text{
        display: block;
        margin-bottom: .1rem;
        font-size: @font-size-small-s;
      }
      &-number{
        font-size: @font-size-large-l;
      }
    }
    &-send{
      flex: 1 1 auto;
      margin-left: .6rem;
      text-align: right;
      color: @text-color-6;
      border-left: 1px solid #eee;
      &-text{
        display: block;
        margin-bottom: .1rem;
        font-size: @font-size-small-s;
      }
      &-number{
        font-size: @font-size-large-l;
      }
    }
  }
  &-content{
    margin-top: .16rem;
    padding: .3rem;
    background-color: #fff;
    &-filter{
      .clearfix();
      &-item{
        float: left;
        display: block;
        padding: .12rem .2rem;
        margin: 0 .14rem .22rem 0;
        font-size: @font-size-small;
        color: #6d7885;
        background-color: #ebf5ff;
        border-radius: .1rem;
        &.active{
          color: #fff;
          background-color: #0097ff;
        }
      }
    }
    &-main{

    }
  }
}
.m-comment{
  display: flex;
  padding: .3rem 0;
  border-bottom: 1px solid #eee;
  font-size: @font-size-medium-s;
  color: @text-color-3;
  &-avatar{
    flex: 0 0 auto;
    width: .6rem;
    height: .6rem;
    border-radius: 100%;
  }
  &-content{
    margin-left: .2rem;
    flex: 1 1 auto;
  }
  &-name{

  }
  &-like{
    display: flex;
    align-items: center;
    margin-top: .2rem;
    &-tag{
      margin-left: .1rem;
    }
  }
  &-text{
    margin-top: .2rem;
  }
  &-imgs{
    display: flex;
    margin-top: .2rem;
    width: 6rem;
    overflow: hidden;
    &-item{
      flex: 1 1 auto;
      margin-left: .1rem;
      &:first-child{
        margin-left: 0;
      }
    }
    img{
      width: 100%;
    }
  }
}

.about{
  &-send{
    padding: .4rem .3rem;
    background-color: #fff;
    font-size: @font-size-small-s;
    &-title{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-time{
      margin-top: .4rem;
      line-height: .4rem;
      &-tag{
        padding: .06rem .1rem;
        color: @text-color-f;
        background-color: #0097ff;
        border-radius: .1rem;
      }
      &-text{
        /*display: inline-block;*/
        margin-left: .2rem;
      }
    }
    &-cost{
      margin-top: .14rem;
    }
  }
  &-server{
    margin-top: .2rem;
    padding: .4rem .3rem;
    background-color: #fff;
    font-size: @font-size-small-s;
    &-title{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-col{
      margin-top: .3rem;
      line-height: .3rem;
      color: @text-color-6;
    }
    &-tag{
      padding: .04rem .08rem;
      background-color: #70bc46;
      color: @text-color-f;
      border-radius: .1rem;
    }
    &-text{

    }
  }
  &-picture{
    margin-top: .2rem;
    padding: .4rem .3rem;
    background-color: #fff;
    font-size: @font-size-small-s;
    &-title{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-content{
      margin-top: .24rem;
      .clearfix()
    }
    &-item{
      position: relative;
      float: left;
      width: 1.6rem;
      height: 1.6rem;
      margin-right: .16rem;
      &-img{
        width: 100%;
      }
      &-text{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: .04rem 0;
        text-align: center;
        font-size: @font-size-medium-s;
        color: #eee;
        background-color: rgba(0,0,0,.5);
      }
    }
  }
  &-infos{
    margin-top: .2rem;
    padding: .4rem 0 .4rem .3rem;
    background-color: #fff;
    font-size: @font-size-small-s;
    &-title{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-content{
      padding: .3rem;
      font-size: @font-size-medium-s;
      color: @text-color-6;
      line-height: .3rem;
      text-align: left;
    }
    &-detail{
      display: flex;
      justify-content: space-between;
      padding: .3rem .3rem .3rem 0;
      border-top: 1px solid #eee;
    }
    &-left{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-right{
      font-size: @font-size-medium-s;
      color: @text-color-6;
    }
  }
  &-certificate{
    display: flex;
    justify-content: space-between;
    margin-top: .2rem;
    padding: .4rem .3rem;
    background-color: #fff;
    font-size: @font-size-small-s;
    &-title{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-left{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-right{

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

.fade-enter-active{
  opacity: 1;
  transition: all .3s .3s;
}
.fade-leave-active{
  opacity: 1;
  transition: all .3s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
  transform: translate(0, 100px);
}

.fadeOut-leave-active{
  transition: all .3s;
}
.fadeOut-leave-to{
  /*height: 0;*/
  opacity: 0;
  transform: scaleY(.5);
}
</style>
