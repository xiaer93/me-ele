<template>
  <div class="order">
    <lift>
      <div slot="lift-main" class="order-main" v-for="(item, index) in foodList" :key="index">
        <h3 class="order-main-title">
          {{item.name}}<span class="order-main-description">{{item.description}}</span>
        </h3>
        <ul class="order-main-food">
          <li class="order-main-item m-food" v-for="(food, foodIndex) in item.foods" :key="foodIndex">
            <p class="m-food-mask">
              <img :src="food.image_path" alt="">
            </p>
            <div class="m-food-content">
              <h3 class="m-food-name">{{food.name}}</h3>
              <p class="m-food-description">{{food.tips}}</p>
              <p class="m-food-infos">
                <span class="m-food-sales">月售{{food.month_sales}}份</span>
                <span class="m-food-likes">好评率{{food.likes || 66}}%</span>
              </p>
              <p class="m-food-discount">
                <span class="m-food-discount-number">4折</span>
                <span class="m-food-discount-text">每单限1份优惠</span>
              </p>
              <p class="m-food-price">
                <span class="m-food-price-new">￥1.6</span>
                <span class="m-food-price-old">￥4</span>
              </p>
              <p class="m-food-control">
              <span class="m-food-control-minus">
               <svg class="m-icon m-icon-minus"><use xlink:href="#cart-add"></use></svg>
              </span>
                {{11}}
              <span class="m-food-control-add">
                <svg class="m-icon m-icon-add"><use xlink:href="#cart-minus"></use></svg>
              </span>
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div slot="lift-number" class="order-number" v-for="(name, index) in foodCatalog" :key="index">{{name}}</div>
    </lift>
  </div>
</template>

<script type="text/ecmascript-6">
import Lift from 'base/lift'
import shopApi from 'api/shop'

export default {
  data () {
    return {
      foodList: []
    }
  },
  computed: {
    foodCatalog () {
      return this.foodList.map(t => {
        return t.name
      })
    }
  },
  methods: {
    getAllFood () {
      shopApi.getAllFood()
        .then(res => {
          if (res.code === 0) {
            this.foodList = res.result.foodList
          } else {
            console.log(res.msg)
          }
        })
    }
  },
  created () {
    this.getAllFood()
  },
  components: {
    Lift
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.order{
  height: 100%;
  &-main{
    padding-right: .4rem;
    &-title{
      font-size: .24rem;
      color: #6f6f6f;
      line-height: 1;
    }
    &-description{
      margin-left: .1rem;
      font-size: .2rem;
      color: #999999;
    }
  }
  &-number{
    padding: .4rem 0 .4rem .1rem;
    font-size: .22rem;
    color: #666;
    &.active{
      color: #333333;
      background-color: #fff;
    }
  }
}
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
    font-size: .3rem;
    color: #393939;
  }
  &-description{
    font-size: .2rem;
    color: #a1a1a1;
  }
  &-infos{
    font-size: .2rem;
    color: #a1a1a1;
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
      font-size: .28rem;
      color: #ff553c;
    }
    &-old{
      margin-left: .1rem;
      margin-bottom: .02rem;
      font-size: .2rem;
      color: #acacac;
    }
  }
  &-control{
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: .2rem;
    line-height: .3rem;
    &-minus{
      width: .3rem;
      height: .3rem;
    }
    &-add{
      width: .3rem;
      height: .3rem;
    }
  }
  .m-icon{
    width: inherit;
    height: inherit;
    &-minus{

    }
    &-add{

    }
  }
}
</style>
