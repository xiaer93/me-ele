<template>
  <div class="order">
    <lift>
      <div slot="lift-main" class="order-main" v-for="(item, index) in foodList" :key="index">
        <h3 class="order-main-title">{{item.name}}</h3>
        <ul class="order-main-food">
          <li class="order-main-item" v-for="(food, foodIndex) in item" :key="foodIndex">
            {{food.name}}
          </li>
        </ul>
      </div>

      <div slot="lift-number" class="order-number" v-for="(item, index) in foodCatalog" :key="index">{{item.name}}</div>
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
  height: 6rem;
  &-main{
    height: 6rem;
  }
  &-number{
    &.active{
      color: red;
    }
  }
}
</style>
