<template>
  <!--商家列表组件-->
  <div class="shop-wrapper" v-show="isHome || searchWord">
    <div class="filter" @touchmove.prevent>
      <div class="filter-mask" v-show="isSortShow || isSelectShow" @click="hideMask"></div>
      <div class="filter-menu" ref="menu">
        <ul class="filter-menu-content">
          <li class="filter-menu-item" @click="select(0)" :class="{'active-black': currentMenu === 0, 'active-blue': isSortShow}">综合排序</li>
          <li class="filter-menu-item" @click="select(1)" :class="{'active-black': currentMenu === 1}">距离最近</li>
          <li class="filter-menu-item" @click="select(2)" :class="{'active-black': currentMenu === 2}">品质联盟</li>
          <li class="filter-menu-item" @click="select(3)" :class="{'active-blue': isSelectShow}">筛选</li>
        </ul>
        <div class="filter-sort" v-show="isSortShow">
          <ul class="filter-sort-box">
            <li class="filter-sort-item" v-for="item in sortTag" :key="item.sortId">{{item.name}}</li>
          </ul>
        </div>
        <div class="filter-select" v-show="isSelectShow">
          <div class="filter-select-content">
            <h3 class="filter-select-title">商家服务（可多选）</h3>
            <ul class="filter-select-box">
              <li class="filter-select-item"
                  v-for="item in shopServer"
                  :key="item.shopServerId"
                  @click="setServer(item)"
                  :class="{'active-filter': searchOptions.shopServerIds.indexOf(item.shopServerId) !== -1}"
              >
                <img class="filter-select-avatar" :src="item.avatar" alt="">
                <span class="filter-select-name">{{item.name}}</span>
              </li>
            </ul>
            <h3 class="filter-select-title">优惠活动（单选）</h3>
            <ul class="filter-select-box">
              <li class="filter-select-item"
                  v-for="item in saleActivity"
                  :key="item.saleActivityId"
                  @click="setActivity(item)"
                  :class="{'active-filter': item.saleActivityId === searchOptions.activity_types}"
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
                  :class="{'active-filter': item.cost_to === searchOptions.cost_to && item.cost_from === searchOptions.cost_from}"
              >
                <span class="filter-select-name">{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="filter-select-btn">
            <span class="filter-select-clear" @click="resetSearchOption">清空</span>
            <span class="filter-select-submit">确定</span>
          </div>
        </div>
      </div>
    </div>
    <infinite-load @loadmore="loadMore" ref="infiniteLoad">
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
              <img src="~common/image/star-1.svg" alt="" class="shop-item-star">
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
    </infinite-load>
  </div>
</template>

<script type="text/ecmascript-6">
import InfiniteLoad from 'base/infinite-load'
import Loading from 'base/loading'
import * as $ from 'jquery'
import {onScroll} from 'common/js/util'
import searchApi from 'api/search'
import {CONFIG_SORT, CONFIG_FILTER} from 'api/variable'

export default {
  data () {
    return {
      // 综合排序
      sortTag: CONFIG_SORT.filter(t => {
        return !t.notSubNav
      }),
      // 商家服务
      shopServer: CONFIG_FILTER.shopServer,
      // 优惠活动
      saleActivity: CONFIG_FILTER.saleActivity,
      // 人均消费
      saleAverage: CONFIG_FILTER.saleAverage,
      currentMenu: -1,
      isSortShow: false,
      isSelectShow: false,
      // 搜索关键词
      searchOptions: {
        order_by: -1,
        shopServerIds: [],
        saleActivityId: -1,
        saleAverageId: -1
      },
      // 搜索结果
      searchList: []
    }
  },
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    searchWord: {
      type: String,
      default: ''
    },
    isHome: {
      type: Boolean,
      deafult: false
    }
  },
  watch: {
    searchWord (newWord) {
      // 监听searchWord，搜索商家
      this.search()
    }
  },
  methods: {
    search () {
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
            this.$refs.infiniteLoad.resetLoading()
          } else {
            console.log(res.msg)
          }
        })
    },
    // 重新搜索
    setServer (item) {
      let tmpSupport = [...this.searchOptions.shopServerIds]
      let index = tmpSupport.indexOf(item.shopServerId)
      if (index === -1) {
        tmpSupport.push(item.shopServerId)
      } else {
        tmpSupport.splice(index, 1)
      }

      this.searchOptions.shopServerIds = tmpSupport
    },
    setActivity (item) {
      this.searchOptions.saleActivityId = item.saleActivityId
    },
    setAverage (item) {
      this.searchOptions.saleAverageId = item.saleAverageId
    },
    resetSearchOption () {
      this.searchOptions = {
        order_by: -1,
        shopServerIds: [],
        saleActivityId: -1,
        saleAverageId: -1
      }
    },
    select (id) {
      this.currentMenu = id
      this.isSortShow = false
      this.isSelectShow = false
      switch (id) {
        case 0: {
          this.isSortShow = true
          this._scrooTop()
          break
        }
        case 1: {
          break
        }
        case 2: {
          break
        }
        case 3: {
          this.isSelectShow = true
          this._scrooTop()
        }
      }
    },
    hideMask () {
      this.isSortShow = false
      this.isSelectShow = false
    },
    openShop (shop) {
      this.$router.push({
        path: '/restaurant'
      })
    },
    // 滚动到顶部
    _scrooTop () {
      this.isHome && $(window).scrollTop(this.menuTop - this.offsetTop)
    }
  },
  created () {
    this.isHome && this.search()
  },
  mounted () {
    setTimeout(() => {
      this.menuTop = $(this.$refs.menu).offset().top

      // fixme：为什么必须延时20ms和2000ms获取到的menu-offsetTop不相同值？？？？
      // search中的，（offsetTop）都是延时20ms获取的~~?
      if (!this.isHome) {
        $(this.$refs.menu).css({
          position: 'fixed',
          top: this.offsetTop
        })
        return
      }

      // 首页监听滚动事件
      this._scrollEvent = (winScroll) => {
        if (this.menuTop < (winScroll + this.offsetTop)) {
          $(this.$refs.menu).css({
            position: 'fixed',
            top: this.offsetTop
          })
        } else {
          $(this.$refs.menu).css({
            position: 'relative',
            top: 0
          })
        }
      }
      onScroll.add(this._scrollEvent)
    }, 500)
  },
  destroyed () {
    onScroll.delete(this._scrollEvent)
  },
  components: {
    InfiniteLoad,
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
  }
  .active-filter{
    font-weight: @font-weight-bold;
    color: @text-color-31;
    background-color: #edf5ff;
  }
}
</style>
