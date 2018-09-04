<template>
  <div class="shop">
    <ul class="shop-list">
      <li class="shop-item" v-for="searchItem in searchList" :key="searchItem.restaurant.authentic_id">
        <div class="shop-item-left">
          <img :src="searchItem.restaurant.image_path" :alt="searchItem.restaurant.name" class="shop-item-avatar">
        </div>
        <div class="shop-item-right">
          <h3 class="shop-item-col">
            <span class="shop-item-brand" v-if="searchItem.restaurant.is_brand"></span>
            <span class="shop-item-name">{{searchItem.restaurant.name}}</span>
          </h3>
          <p class="shop-item-col">
            <img src="~common/image/star-1.svg" alt="" class="shop-item-star">
            <span class="shop-item-average">{{searchItem.restaurant.rating}}</span>
            <span class="shop-item-sales">月售{{searchItem.restaurant.recent_order_num}}单</span>
          </p>
          <p class="shop-item-col">
            <span class="shop-item-freight">{{searchItem.restaurant.piecewise_agent_fee.rules[0].price}}起送&nbsp;|&nbsp;配送费{{searchItem.restaurant.piecewise_agent_fee.rules[0].fee}}</span>
            <span class="shop-item-time">{{searchItem.restaurant.distance}}km&nbsp;|&nbsp;{{searchItem.restaurant.order_lead_time}}分钟</span>
          </p>
          <p class="shop-item-col">
            <span class="shop-item-tag" v-for="tag in searchItem.restaurant.flavors" :key="tag.id">{{tag.name}}</span>
          </p>
          <div class="shop-item-col shop-item-line">
            <p class="shop-item-activity" v-for="activity in searchItem.restaurant.activities" :key="activity.activitiesId">
              <span class="shop-item-activity-icon" :style="{color: activity.icon_color}">{{activity.icon_name}}</span>
              <span class="shop-item-activity-text">{{activity.tips}}</span>
            </p>
          </div>
          <!--店内食品展示-->
          <!--/店内食品展示-->
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },
  props: {
    searchList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.shop{
  width: 100%;
  &-list{
    padding: 0 .2rem;
  }
  &-item{
    display: flex;
    /*padding: .3rem 0;*/
    font-size: .24rem;
    color: #666;
    border-bottom: 1px solid #f9f9f9;
    &-left{
      width: 1.2rem;
      margin-right: .2rem;
      margin-top: .3rem;
    }
    &-right{
      flex: 1 1 auto;
    }
    &-avatar{
      width: 100%;
    }
    &-col{
      margin: .3rem 0;
      .clearfix();
    }
    &-name{
      font-size: .28rem;
      color: #333;
      font-weight: bold;
    }
    &-star{
      width: 1.1rem;
    }
    &-average{
      font-size: .2rem;
    }
    &-sales{
      font-size: .2rem;
    }
    &-freight{
      float: left;
      color: #666666;
    }
    &-time{
      float: right;
      color: #e7e7e7;
    }
    &-tag{
      float: left;
      margin-right: .1rem;
      padding: .04rem .1rem;
      border: .01rem solid #f2f2f2;
      border-radius: .02rem;
    }
    &-line{
      border-top: .02rem dashed #eee;
    }
    &-activity{
      display: flex;
      align-items: center;
      margin: .1rem 0;
      &-icon{
        display: block;
        padding: .04rem;
        margin-right: .1rem;
        background-color: #70bc46;
        border-radius: .06rem;
        color: #fff;
      }
    }
  }
}
</style>
