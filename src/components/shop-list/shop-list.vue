<template>
  <!--商家列表组件-->
  <div class="shop-wrapper">
    <div class="filter">
      <div class="filter-mask" v-show="isOrderShow || isFilterShow" @click="hideMask"></div>
      <div class="filter-menu" ref="menu">
        <ul class="filter-menu-content">
          <li class="filter-menu-item filter-menu-item-icon" @click="showDialog('order')" :class="{'active-black': innerOrder, 'active-blue': isOrderShow}">{{(innerOrder && innerOrder.name) || '综合排序'}}</li>
          <li class="filter-menu-item" @click="reOrder(outerSort[0].id)" :class="{'active-black': searchOptions.orderBy === outerSort[0].id}">{{outerSort[0].name}}</li>
          <li class="filter-menu-item" @click="reOrder(outerSort[1].id)" :class="{'active-black': searchOptions.orderBy === outerSort[1].id}">{{outerSort[1].name}}</li>
          <li class="filter-menu-item" @click="showDialog('filter')" :class="{'active-blue': isFilterShow}">筛选</li>
        </ul>
        <div class="filter-sort" v-show="isOrderShow">
          <ul class="filter-sort-box">
            <li class="filter-sort-item" v-for="item in innerSort" :key="item.id" @click="reOrder(item.id)">{{item.name}}</li>
          </ul>
        </div>
        <div class="filter-select" v-show="isFilterShow">
          <div class="filter-select-content">
            <h3 class="filter-select-title">商家服务（可多选）</h3>
            <ul class="filter-select-box">
              <li class="filter-select-item"
                  v-for="item in shopServer"
                  :key="item.id"
                  @click="setServer(item)"
                  :class="{'active-filter': searchOptions.shopServer.indexOf(item.id) !== -1}"
              >
                <img class="filter-select-avatar" :src="item.avatar" alt="">
                <span class="filter-select-name">{{item.name}}</span>
              </li>
            </ul>
            <h3 class="filter-select-title">优惠活动（单选）</h3>
            <ul class="filter-select-box">
              <li class="filter-select-item"
                  v-for="item in saleActivity"
                  :key="item.id"
                  @click="setActivity(item)"
                  :class="{'active-filter': item.id === searchOptions.saleActivity}"
              >
                <span class="filter-select-name">{{item.name}}</span>
              </li>
            </ul>
            <h3 class="filter-select-title">人均消费</h3>
            <ul class="filter-select-box">
              <li class="filter-select-item"
                  v-for="(item, index) in saleAverage"
                  :key="index"
                  @click="setAverage(item)"
                  :class="{'active-filter': item.id === searchOptions.saleAverage}"
              >
                <span class="filter-select-name">{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="filter-select-btn">
            <span class="filter-select-clear" @click="resetSearchOption">清空</span>
            <span class="filter-select-submit" @click="restartSearch">确定</span>
          </div>
        </div>
      </div>
    </div>
    <ul class="shop">
      <li class="shop-item" v-for="(searchItem, index) in searchList" :key="index" @click="openShop(searchItem)">
        <div class="shop-item-left">
          <img v-lazy="searchItem.restaurant.shopAvatar" :alt="searchItem.restaurant.shopName" class="shop-item-avatar">
        </div>
        <div class="shop-item-right">
          <h3 class="shop-item-col">
            <span class="shop-item-brand" v-if="searchItem.restaurant.isBrand"></span>
            <span class="shop-item-name">{{searchItem.restaurant.shopName}}</span>
          </h3>
          <p class="shop-item-col">
            <img src="~common/image/star.svg" alt="" class="shop-item-star">
            <span class="shop-item-average">{{searchItem.restaurant.shopRate}}</span>
            <span class="shop-item-sales">月售{{searchItem.restaurant.recentOrderNum}}单</span>
          </p>
          <p class="shop-item-col">
            <span class="shop-item-freight">{{searchItem.restaurant.shopSend.rules.price}}起送&nbsp;<i class="shop-item-grap"></i>&nbsp;配送费{{searchItem.restaurant.shopSend.rules.fee}}</span>
            <span class="shop-item-time">{{searchItem.restaurant.distance}}km&nbsp;<i class="shop-item-grap"></i>&nbsp;{{searchItem.restaurant.orderLeadTime}}分钟</span>
          </p>
          <p class="shop-item-col">
            <span class="shop-item-tag" v-for="tag in searchItem.restaurant.shopCatalog.children" :key="tag.id">{{tag.name}}</span>
          </p>
          <div class="shop-item-col shop-item-line">
            <p class="shop-item-activity" v-for="(activity, activityIndex) in searchItem.restaurant.shopDiscount" :key="activityIndex">
              <span class="shop-item-activity-icon" :style="{color: activity.icon_color}">{{activity.icon_name}}</span>
              <span class="shop-item-activity-text">{{activity.discountName}}</span>
            </p>
          </div>

          <!--店内食品展示-->
          <!--/店内食品展示-->
        </div>
      </li>
    </ul>
    <div class="shop-loading">
      <loading slot="load-icon" :isAlwaysShow="true"></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading'
import searchApi from 'api/search'
import {CONFIG_SORT, CONFIG_FILTER} from 'api/variable'

export default {
  data () {
    return {
      isOrderShow: false,
      isFilterShow: false,
      // 搜索关键词
      searchOptions: {
        orderBy: 1,
        shopServer: [],
        saleActivity: -1,
        saleAverage: -1
      },
      // 搜索结果
      searchList: []
    }
  },
  props: {
    searchWord: {
      type: String,
      default: ''
    }
  },
  computed: {
    innerOrder () {
      return this.innerSort.find(t => t.id === this.searchOptions.orderBy)
    }
  },
  watch: {
    searchWord (newWord) {
      // 监听searchWord，搜索商家
      this._search()
    }
  },
  methods: {
    _search () {
      searchApi.search()
        .then(res => {
          if (res.code === 0) {
            this.searchList = res.result.searchList
            this.$emit('searchSuccess')
          } else {
            console.log(res.msg)
          }
        })
    },
    loadMore () {
      searchApi.search()
        .then(res => {
          if (res.code === 0) {
            this.searchList = this.searchList.concat(res.result.searchList)
            this.$emit('loadSuccess')
          } else {
            console.log(res.msg)
          }
        })
    },
    // 重新搜索
    setServer (item) {
      let tmpSupport = [...this.searchOptions.shopServer]
      let index = tmpSupport.indexOf(item.id)
      if (index === -1) {
        tmpSupport.push(item.id)
      } else {
        tmpSupport.splice(index, 1)
      }

      this.searchOptions.shopServer = tmpSupport
    },
    setActivity (item) {
      this.searchOptions.saleActivity = item.id
    },
    setAverage (item) {
      this.searchOptions.saleAverage = item.id
    },
    reOrder (id) {
      this.hideMask()
      this.searchOptions.orderBy = id
    },
    restartSearch () {
      this.hideMask()
      this._search()
    },
    resetSearchOption () {
      this.searchOptions.shopServer = []
      this.searchOptions.saleActivity = -1
      this.searchOptions.saleAverage = -1
    },
    showDialog (name) {
      this.hideMask()
      this.$emit('scrollTop')

      if (name === 'order') {
        this.isOrderShow = true
        // eslint-disable-next-line
        return
      }
      if (name === 'filter') {
        this.isFilterShow = true
        // eslint-disable-next-line
        return
      }
    },
    hideMask () {
      this.isOrderShow = false
      this.isFilterShow = false
    },
    openShop (shop) {
      this.$router.push({
        name: 'Restaurant',
        query: {
          id: 1
        }
      })
    }
  },
  created () {
    this._search()

    /* 非响应式数据 */
    // 综合排序
    this.innerSort = CONFIG_SORT.filter(t => {
      return !t.isOuter
    })
    // 距离排序
    this.outerSort = CONFIG_SORT.filter(t => {
      return t.isOuter
    })
    // 商家服务
    this.shopServer = CONFIG_FILTER.shopServer
    // 优惠活动
    this.saleActivity = CONFIG_FILTER.saleActivity
    // 人均消费
    this.saleAverage = CONFIG_FILTER.saleAverage
  },
  mounted () {

  },
  destroyed () {
  },
  components: {
    Loading
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.shop-wrapper{
  width: 100%;
}
.shop{
  padding: 0 .2rem;
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
      font-size: @font-size-small;
      color: @text-color-6;
    }
    &-name{
      font-size: @font-size-large-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-star{
      width: 1.1rem;
    }
    &-average{
      font-size: @font-size-small;
    }
    &-sales{
      font-size: @font-size-small;
    }
    &-freight{
      float: left;
      color: @text-color-6;
      font-size: @font-size-small;
    }
    &-time{
      float: right;
      color: @text-color-9;
      font-size: @font-size-small;
    }
    &-grap{
      position: relative;
      display: inline-block;
      top: .02rem;
      height: .2rem;
      width: 1px;
      background-color: #ddd;
    }
    &-tag{
      float: left;
      margin-right: .1rem;
      padding: .04rem .1rem;
      border: .01rem solid #f2f2f2;
      border-radius: .06rem;
      font-size: @font-size-small;
      color: @text-color-9;
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
  &-loading{
    height: 2rem;
    width: 100%;
  }
}
.filter{
  position: relative;
  z-index: 1;
  height: .8rem;
  line-height: .8rem;
  width: 100%;
  &-menu{
    position: relative;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: .8rem;
    &-content{
      display: flex;
      width: 100%;
      height: .8rem;
      border-bottom: 1px solid #ddd;
      background-color: #fff;
    }
    &-item{
      width: 25%;
      font-size: @font-size-medium;
      color: @text-color-6;
      text-align: center;
      .hide-text(1);
      &-icon{
        position: relative;
        &::after{
          display: block;
          position: absolute;
          content: '';
          right: .1rem;
          top: 50%;
          border: .06rem solid transparent;
          border-top-color: #000;
          margin-top: -.04rem;
        }
      }
    }
  }
  &-sort{
    position: absolute;
    top: .8rem;
    left: 0;
    width: 100%;
    background-color: #fff;
    &-box{
      padding-left: .4rem;
    }
    &-item{
      font-size: @font-size-medium;
      line-height: .8rem;
      color: @text-color-3;
    }
  }
  &-select{
    position: absolute;
    left: 0;
    top: .8rem;
    width: 100%;
    font-size: @font-size-medium-s;
    background-color: #fff;
    border-top: 1px solid #ddd;
    &-content{
      padding: 0 .3rem;
    }
    &-title{
      font-size: @font-size-small;
      color: #666;
    }
    &-box{
      .clearfix();
    }
    &-item{
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      margin: 0 0 .12rem .14rem;
      width: 2.2rem;
      height: .7rem;
      line-height: .7rem;
      color: @text-color-3;
      background-color: #fafafa;
      &:nth-child(3n + 1) {
        margin-left: 0;
      }
    }
    &-avatar{
      margin-right: .1rem;
      width: .3rem;
      height: auto;
    }
    &-name{
      display: inline-block;
      font-size: .26rem;
      font-weight: inherit;
      color: inherit;
      text-align: center;
    }
    &-btn{
      display: flex;
      margin-top: .2rem;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: .3rem;
      box-shadow: 0 -.02rem 0.02rem 0 #ededed;
    }
    &-clear{
      flex: 1 1 auto;
      color: #e5e5e5;
      background-color: #fff;
    }
    &-submit{
      flex: 1 1 auto;
      color: #fff;
      background-color: #00d762;
    }
  }
  &-mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
  }
  .active-black{
    color: @text-color-3;
    font-weight: @font-weight-bold;
  }
  .active-blue{
    color: @text-color-31;
    font-weight: @font-weight-bold;
    &::after{
      border-top-color: @text-color-31;
    }
  }
  .active-filter{
    font-weight: @font-weight-bold;
    color: @text-color-31;
    background-color: #edf5ff;
  }
}
</style>
