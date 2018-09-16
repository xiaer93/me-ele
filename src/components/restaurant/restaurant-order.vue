<template>

</template>

<script type="text/ecmascript-6">
import {Lift, LiftMain, LiftNumber} from 'base/lift/index'
import Banner from 'base/banner'
import Toast from 'base/toast'
import * as $ from 'jquery'
import {mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      shopFoods: [],
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
    foodCatalog () {
      return this.shopFoods.length ? this.shopFoods.map(t => { return t.name }) : []
    },
    recommendFood () {
      return []
    },
    ...mapGetters([
      'cart'
    ])
  },
  methods: {
    raddCart (food) {
      // 不能直接操控传过来的food；food.number += 1
      food.number += 1
      let {_id, number, name, price} = food
      // 避免直接对象引用，直接操控vuex-state对象报错~~~
      this.addCart({
        _id,
        name,
        price,
        number
      })
    },
    rminusCart (food) {
      food.number = Math.max(0, food.number - 1)
      let {_id, number, name, price} = food
      this.addCart({
        _id,
        name,
        price,
        number
      })
    },
    rclearCart () {
      let tmpFoodList = this.shopFoods
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
    toggleCart () {
      this.isShowCart = !this.isShowCart
    },
    genCartNumber (food) {
      let tmp = this.cart[food._id]
      return tmp && tmp.number
    },
    ...mapMutations({
      addCart: 'ADD_CART',
      minusCart: 'MINUS_CART',
      clearCart: 'CLEAR_CART'
    }),
    // 对外接口
    setData (data) {
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

      this.shopFoods = tmpFoodList
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
</style>
