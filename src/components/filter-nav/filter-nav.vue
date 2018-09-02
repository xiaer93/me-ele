<template>
  <div class="filter">
    <div class="filter-mask" v-show="isSortShow || isSelectShow" @click="hideMask"></div>
    <ul class="filter-menu">
      <li class="filter-menu-item" @click="select(0)">综合排序</li>
      <li class="filter-menu-item" @click="select(1)">距离最近</li>
      <li class="filter-menu-item" @click="select(2)">品质联盟</li>
      <li class="filter-menu-item" @click="select(3)">筛选</li>
    </ul>
    <div class="filter-sort" v-show="isSortShow">
      <ul class="filter-sort-box">
        <li class="filter-sort-item">综合排序</li>
        <li class="filter-sort-item">好评优先</li>
        <li class="filter-sort-item">销量最高</li>
        <li class="filter-sort-item">起送价最低</li>
        <li class="filter-sort-item">配送最快</li>
        <li class="filter-sort-item">配送费最低</li>
        <li class="filter-sort-item">人均从低到高</li>
        <li class="filter-sort-item">人均从高到低</li>
      </ul>
    </div>
    <div class="filter-select" v-show="isSelectShow">
      <div class="filter-select-content">
        <h3 class="filter-select-title">商家服务（可多选）</h3>
        <ul class="filter-select-box">
          <li class="filter-select-item" v-for="item in shopServer" :key="item.shopServerId">
            <img :src="item.avatar" alt="">
            <span>{{item.name}}</span>
          </li>
        </ul>
        <h3 class="filter-select-title">优惠活动（单选）</h3>
        <ul class="filter-select-box">
          <li class="filter-select-item" v-for="item in saleActivity" :key="item.saleActivityId">
            <span>{{item.name}}</span>
          </li>
        </ul>
        <h3 class="filter-select-title">人均消费</h3>
        <ul class="filter-select-box">
          <li class="filter-select-item" v-for="item in saleAverage" :key="item.saleAverageId">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      shopServer: [
        {
          name: '蜂鸟快送',
          avatar: '/static/shopServer/1.webp',
          shopServerId: 1
        },
        {
          name: '品牌商家',
          avatar: '/static/shopServer/2.webp',
          shopServerId: 2
        },
        {
          name: '食安宝',
          avatar: '/static/shopServer/3.webp',
          shopServerId: 3
        },
        {
          name: '新店',
          avatar: '/static/shopServer/4.webp',
          shopServerId: 4
        },
        {
          name: '开发票',
          avatar: '/static/shopServer/5.webp',
          shopServerId: 5
        }
      ],
      saleActivity: [
        {
          name: '新用户优惠',
          saleActivityId: 1
        },
        {
          name: '特价商品',
          saleActivityId: 2
        },
        {
          name: '下单立减',
          saleActivityId: 3
        },
        {
          name: '赠品优惠',
          saleActivityId: 4
        },
        {
          name: '下单返红包',
          saleActivityId: 5
        },
        {
          name: '进店领红包',
          saleActivityId: 6
        }
      ],
      saleAverage: [
        {
          name: '￥20以下',
          saleActivityId: 1
        },
        {
          name: '￥20 - ￥40',
          saleActivityId: 2
        },
        {
          name: '￥40 - ￥60',
          saleActivityId: 3
        },
        {
          name: '￥60 - ￥80',
          saleActivityId: 4
        },
        {
          name: '￥80 - ￥100',
          saleActivityId: 5
        },
        {
          name: '￥100以上',
          saleActivityId: 6
        }
      ],
      currentMenu: -1,
      isSortShow: false,
      isSelectShow: false
    }
  },
  methods: {
    // 重新搜索
    search (type) {
      if (type === 'distance') {
        this.currentMenu = 2
        this.$emit('search', 'distance')
      } else {
        this.currentMenu = 3
        this.$emit('search', 'brand')
      }
    },
    select (id) {
      this.currentMenu = id
      this.isSortShow = false
      this.isSelectShow = false
      switch (id) {
        case 0: {
          this.isSortShow = true
          break
        }
        case 1: {
          this.search('1')
          break
        }
        case 2: {
          this.search('2')
          break
        }
        case 3: {
          this.isSelectShow = true
        }
      }
    },
    hideMask () {
      this.isSortShow = false
      this.isSelectShow = false
    }
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
    display: flex;
    width: 100%;
    height: 100%;
    border-bottom: .04rem solid #fbfbfb;
    &-item{
      width: 25%;
      font-size: .28rem;
      text-align: center;
      color: #b3b3b3;
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
      font-size: .26rem;
      line-height: .8rem;
      color: #333;
    }
  }
  &-select{
    position: absolute;
    top: .8rem;
    left: 0;
    width: 100%;
    font-size: .22rem;
    background-color: #fff;
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
      float: left;
      margin-left: .1rem;
      width: 2.2rem;
      height: .7rem;
      line-height: .7rem;
      color: #333;
      &:first-child{
        margin-left: 0;
      }
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
}
</style>
