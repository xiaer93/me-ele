<template>
  <div class="filter" @touchmove.prevent>
    <div class="filter-mask" v-show="isSortShow || isSelectShow" @click="hideMask"></div>
    <div class="filter-menu">
      <ul class="filter-menu-content" ref="menu">
        <li class="filter-menu-item" @click="select(0)" :class="{'active-black': currentMenu === 0, 'active-blue': isSortShow}">综合排序</li>
        <li class="filter-menu-item" @click="select(1)" :class="{'active-black': currentMenu === 1}">距离最近</li>
        <li class="filter-menu-item" @click="select(2)" :class="{'active-black': currentMenu === 2}">品质联盟</li>
        <li class="filter-menu-item" @click="select(3)" :class="{'active-blue': isSelectShow}">筛选</li>
      </ul>
    </div>
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
              :class="{'active-filter': searchOptions.support_ids.indexOf(item.shopServerId) !== -1}"
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
</template>

<script type="text/ecmascript-6">
import * as $ from 'jquery'
import {onScroll} from 'common/js/util'
import {CONFIG_SORT, CONFIG_FILTER} from 'api/variable'

export default {
  props: {
    offsetTop: {
      type: Number,
      default: 0
    }
  },
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
      // 排序关键词
      searchOptions: {
        order_by: undefined,
        support_ids: [],
        activity_types: undefined,
        cost_from: undefined,
        cost_to: undefined
      }
    }
  },
  methods: {
    // 重新搜索
    search (type) {

    },

    setServer (item) {
      let tmpSupport = [...this.searchOptions.support_ids]
      let index = tmpSupport.indexOf(item.shopServerId)
      if (index === -1) {
        tmpSupport.push(item.shopServerId)
      } else {
        tmpSupport.splice(index, 1)
      }

      this.searchOptions.support_ids = tmpSupport
    },
    setActivity (item) {
      this.searchOptions.activity_types = item.saleActivityId
    },
    setAverage (item) {
      this.searchOptions.cost_from = item.cost_from
      this.searchOptions.cost_to = item.cost_to
    },
    resetSearchOption () {
      this.searchOptions = {
        order_by: undefined,
        support_ids: [],
        activity_types: undefined,
        cost_from: undefined,
        cost_to: undefined
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
    // 滚动到顶部
    _scrooTop () {
      $(window).scrollTop(this.menuTop - this.offsetTop)
    }
  },
  mounted () {
    this.menuTop = 0
    setTimeout(() => {
      // fixme：为什么必须延时20ms和2000ms获取到的menu-offsetTop不相同值？？？？
      this.menuTop = $(this.$refs.menu).offset().top
      onScroll((winScroll) => {
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
      })
    }, 500)
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.filter{
  position: relative;
  z-index: 1;
  height: .8rem;
  line-height: .8rem;
  width: 100%;
  &-menu{
    width: 100%;
    height: .8rem;
    &-content{
      position: relative;
      z-index: 1;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      height: .8rem;
      border-bottom: .04rem solid #fbfbfb;
      background-color: #fff;
    }
    &-item{
      width: 25%;
      font-size: .28rem;
      text-align: center;
      color: #b3b3b3;
    }
  }
  &-sort{
    position: relative;
    left: 0;
    width: 100%;
    background-color: #fff;
    &-box{
      padding-left: .4rem;
    }
    &-item{
      font-size: .26rem;
      line-height: .8rem;
      color: #333;
    }
  }
  &-select{
    position: relative;
    left: 0;
    width: 100%;
    font-size: .22rem;
    background-color: #fff;
    border-top: 1px solid #ddd;
    &-content{
      padding: 0 .3rem;
    }
    &-title{
      font-size: .2rem;
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
      color: #333;
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
    color: #333;
    font-weight: 700;
  }
  .active-blue{
    color: #3190e8;
    font-weight: 700;
  }
  .active-filter{
    font-weight: 700;
    color: #3190e8;
    background-color: #edf5ff;
  }
}
</style>
