<template>
  <div class="home" ref="home">
    <infinite-load class="home-scroll" @scrollTop="scroll" @loadMore="loadMore" ref="infiniteLoad">
      <header class="header">
        <div class="header-address">
          <svg class="header-address-location" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 31"><path fill="#FFF" fill-rule="evenodd" d="M22.116 22.601c-2.329 2.804-7.669 7.827-7.669 7.827-.799.762-2.094.763-2.897-.008 0 0-5.26-4.97-7.643-7.796C1.524 19.8 0 16.89 0 13.194 0 5.908 5.82 0 13 0s13 5.907 13 13.195c0 3.682-1.554 6.602-3.884 9.406zM18 13a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"></path></svg>
          <span class="header-address-name" @click="showLocation">{{localPosition.address || '未能获取地址'}}</span>
          <svg class="header-address-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8"><path fill="#FFF" fill-rule="evenodd" d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"></path></svg>
        </div>
      </header>
      <div class="search">
        <div class="search-content" ref="search">
          <router-link class="search-box" to="/search">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
            <span class="search-tips">搜索饿了么商家/商品名称</span>
          </router-link>
        </div>
      </div>
      <div class="menu">
        <swiper class="menu-content" :options="swiperOption" ref="swiperMenu">
          <swiper-slide v-for="(page, index) in menuTotalPage" :key="index">
            <ul class="menu-box">
              <li class="menu-item"
                  v-for="(food, index) in genMenuList(page)"
                  :key="index"
                  @click="openCatalog(food.id)"
              >
                <img class="menu-item-img" :src="food.image" alt="food">
                <span class="menu-item-name">{{food.name}}</span>
              </li>
            </ul>
          </swiper-slide>
          <!--swiper额外配置项-->
          <div class="swiper-pagination menu-content-pagination"  slot="pagination"></div>
        </swiper>
      </div>
      <div class="recommend">
        <div class="recommend-left recommend-item">
          <h3 class="recommend-title">品质套餐</h3>
          <p class="recommend-desc">搭配齐全吃得好</p>
          <p class="recommend-link">立即抢购&gt;</p>
          <img class="recommend-img" src="/static/recommend/1.webp" alt="">
        </div>
        <div class="recommend-right recommend-item">
          <h3 class="recommend-title">限量抢购</h3>
          <p class="recommend-desc">超值美味9.9元起</p>
          <p class="recommend-link"><em class="recommend-link-red">5560人</em>正在抢购&gt;</p>
          <img class="recommend-img" src="/static/recommend/1.webp" alt="">
        </div>
      </div>
      <div class="banner">
        <banner :imgList="bannerList"></banner>
      </div>
      <div class="shop">
        <h2 class="shop-title">推荐商家</h2>
        <shop-list @loadSuccess="loadSuccess" @scrollTop="scrollToTop" ref="shopList"></shop-list>
      </div>
      <div class="side">
        <side-nav ref="sideNav" @scrollTop="scrollToTop"></side-nav>
      </div>
    </infinite-load>
    <div class="home-loading" v-if="!menuList.length">
      <span class="home-loading-icon" v-if="!isErrorGet"></span>
      <div class="home-loading-tips" v-else>
        <img src="~common/image/location.gif" alt="" class="home-loading-tips-img">
        <p class="home-loading-tips-text">输入地址后才能订餐哦！</p>
        <router-link to="/home/location" class="home-loading-tips-btn">手动选择地址</router-link>
      </div>
    </div>
    <location @updatePosition="updatePosition" ref="location"></location>
  </div>
</template>

<script type="text/ecmascript-6">
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import ShopList from 'components/shop-list/shop-list'
import Location from 'components/location/location'
import SideNav from 'base/side-nav'
import InfiniteLoad from 'base/infinite-load'
import Banner from 'base/banner'
import homeApi from 'api/home'
import * as $ from 'jquery'
import {getPosition, getAddress} from 'common/js/util'
import {mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      menuList: [],
      menuBaseLength: 10,
      bannerList: [],
      swiperOption: {
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination'
        }
      },
      isErrorGet: false
    }
  },
  computed: {
    menuTotalPage () {
      return Math.ceil(this.menuList.length / this.menuBaseLength)
    },
    ...mapGetters([
      'localPosition'
    ])
  },
  watch: {

  },
  methods: {
    getMenuList (options) {
      homeApi.getMenuList(options)
        .then(res => {
          if (res.code === 0) {
            this.menuList = res.result.menuList
            this.setMenuList(this.menuList)
          } else {
            console.log(res.msg)
          }
        })
    },
    getBannerList (options) {
      homeApi.getBannerList(options)
        .then(res => {
          if (res.code === 0) {
            this.bannerList = res.result.bannerList
          } else {
            console.log(res.msg)
          }
        })
    },
    genMenuList (page) {
      page = page - 1
      return this.menuList.slice(page * this.menuBaseLength, page * this.menuBaseLength + this.menuBaseLength)
    },
    openCatalog (catalogId) {
      this.$router.push({
        name: 'Catalog',
        params: {id: catalogId},
        query: {
          detail: encodeURIComponent('全部')
        }
      })
    },
    updatePosition (position) {
      // fixme：：：当没有路由时候，子组件消失、父组件刷新获取数据，却没有bug？？？
      this.setLocalPosition(position)
      this.init()
    },
    // 响应infinite-scroll事件~
    scroll (value) {
      // 处理顶部搜索框
      if (value > this._searchTop) {
        $(this.$refs.search).css({
          position: 'fixed'
        })
      } else {
        $(this.$refs.search).css({
          position: 'static'
        })
      }

      // 处理侧边按钮
      if (value > this._filterTop) {
        this.$refs.sideNav.show()
      } else {
        this.$refs.sideNav.hide()
      }

      // fixme: 耦合度太高，直接处理了子组件中的元素~~~~处理店家筛选导航
      if (value > (this._filterTop - this._searchHeight)) {
        this._$filterMenu.css({
          position: 'fixed',
          top: this._searchHeight
        })
      } else {
        this._$filterMenu.css({
          position: '',
          top: ''
        })
      }
    },
    // 调用infinite-scrollTop方法
    scrollToTop (value) {
      value = typeof value !== 'undefined' ? value : (this._filterTop - this._searchHeight)
      this.$refs.infiniteLoad.scrollTop(value)
    },
    // 响应infinite-loadmore事件
    loadMore () {
      this.$refs.shopList.loadMore()
    },
    // 响应shop-list事件
    loadSuccess () {
      this.$refs.infiniteLoad.resetLoading()
    },
    init () {
      if (this.localPosition.address) {
        let {longitude, latitude} = this.localPosition
        this.getMenuList({longitude, latitude})
        this.getBannerList({longitude, latitude})
      } else {
        _inner().then((result) => {
          let position = {...result}
          this.setLocalPosition(position)
          this.getMenuList(position)
          this.getBannerList(position)
        }).catch((error) => {
          console.log(error)
          this.isErrorGet = true
          this.showLocation()
        })
      }

      // async相等于coo封装，那么内部position相当于resolve的值~
      async function _inner () {
        // 调用html5的方法获取经纬度
        let position = await getPosition()
        // 根据经纬度获取对应的地址信息
        let address = await getAddress(position)

        // 此处的console.log根本就没有输出~~~>>>console.log(position)
        return {...position, address}
      }
    },
    showLocation () {
      this.$refs.location.show()
    },
    ...mapMutations({
      'setMenuList': 'SET_MENU_LIST',
      'setLocalPosition': 'SET_LOCAL_POSITION'
    })
  },
  created () {
    this.init()
  },
  mounted () {
    let self = this
    setTimeout(() => {
      self._searchTop = $(self.$refs.search).offset().top
      self._searchHeight = $(self.$refs.search).outerHeight()
      // fixme: 以下内容耦合度过高，待处理
      // 抽象组件的基本方法：基础组件、业务组件；高内聚低耦合、符合好莱坞原则
      // 组件必须使用$el，否则无法get到正确的值
      self._filterTop = $(self.$refs.shopList.$el).find('.filter').offset().top
      self._$filterMenu = $(self.$refs.shopList.$el).find('.filter-menu')

      // swiper对象
      self._swiperMenu = self.$refs.swiperMenu.swiper
    }, 20)
  },
  components: {
    swiper,
    swiperSlide,
    Banner,
    ShopList,
    SideNav,
    InfiniteLoad,
    Location
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.home{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  bottom: .9rem;
  background-color: #fff;
  &-scroll{
    width: 100%;
    height: 100%;
  }
  &-loading{
    position: fixed;
    top: 2rem;
    bottom: 0.9rem;
    left: 0;
    right: 0;
    display: flex;
    background-color: #fff;
    &-icon{
      display: block;
      margin: auto;
      width: .6rem;
      height: .6rem;
      border-radius: .6rem;
      border: 2px solid transparent;
      border-left-color: #2897ff;
      transform-origin: center;
      animation: rotate .6s linear infinite;
    }
    &-tips{
      position: fixed;
      top: 2rem;
      bottom: 0.9rem;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:center;
      &-img{
        width: 4rem;
        height: 4rem;
      }
      &-text{
        margin-top: .4rem;
        font-size: @font-size-large;
        color: @text-color-6;
      }
      &-btn{
        margin-top: .2rem;
        width: 2.4rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        font-size: @font-size-small-m;
        color: @text-color-f;
        border: none;
        outline: none;
        border-radius: .1rem;
        background-color: #56d176;
      }
    }
  }
  .header{
    position: relative;
    z-index: 1;
    padding-top: .24rem;
    color: #fff;
    .gradient-bg-2();
    &-address{
      display: flex;
      align-items: center;
      padding: 0 .26rem;
      width: 80%;
      line-height: .7rem;
      &-location{
        width: .4rem;
        height: .4rem;
        fill: #fff;
      }
      &-name{
        margin: 0 .1rem;
        font-size: @font-size-large;
        color: @text-color-f;
        font-weight: @font-weight-bold;
        max-width: 80%;
        .hide-text(1);
      }
      &-down{
        width: .2rem;
        height: .1rem;
        fill: #fff;
      }
    }
  }
  .search{
    box-sizing: content-box;
    height: 1.1rem;
    &-content{
      position: static;
      z-index: 1;
      right: 0;
      left: 0;
      top: 0;
      box-sizing: content-box;
      height: .7rem;
      padding: .2rem .26rem;
      .gradient-bg-2();
    }
    &-box{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: .05rem;
    }
    &-icon{
      width: .4rem;
      height: .4rem;
    }
    &-tips{
      display: inline-block;
      margin-left: .1rem;
      height: .64rem;
      line-height: .64rem;
      font-size: @font-size-small-s;
      color: @text-color-9;
    }
    &::before{

    }
    &::after{
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0;
      background-image: linear-gradient(90deg,#0af,#0085ff);
    }
  }
  .menu{
    position: relative;
    z-index: 0;
    height: 3.6rem;
    &-content{
      width: 100%;
      height: 100%;
      &-pagination{
        height: 10px;
        display: flex;
        justify-content: center;
      }
    }
    &-box{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      /*height: 3rem;*/
    }
    &-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: .24rem;
      width: 1.5rem;
      /*height: 1rem;*/
      &-img{
        width: 1rem;
      }
      &-name{
        font-size: @font-size-small-s;
        color: @text-color-6;
      }
    }
  }
  .recommend{
    position: relative;
    z-index: 0;
    /*margin-top: .5rem;*/
    padding: 0 .2rem;
    display: flex;
    &-item{
      position: relative;
      z-index: 0;
      flex: 1 1 auto;
      box-sizing: border-box;
      width: 3rem;
      height: 2.4rem;
      padding: .2rem 0 0 .3rem;
      background-color: #f5f5f5;
    }
    &-left{

    }
    &-right{
      margin-left: .05rem;
      .recommend-title, .recommend-link-red{
        color: @text-color-e8;
      }
    }
    &-title{
      margin-bottom: .1rem;
      font-size: @font-size-large;
      font-weight: @font-weight-bold;
      color: @text-color-3;
    }
    &-desc{
      margin-bottom: .18rem;
      font-size: @font-size-medium-s;
      color: @text-color-7;
    }
    &-link{
      font-size: @font-size-small-s;
      font-weight: @font-weight-bold;
      color: @text-color-3;
      &-red{
        font-weight: inherit;
        font-size: inherit;
        font-style: normal;
      }
    }
    &-img{
      position: absolute;
      z-index: -1;
      right: 0;
      bottom: -.12rem;
      width: 2.1rem;
    }
  }
  .banner{
    position: relative;
    z-index: 0;
    padding: 0 .2rem;
    margin-top: .1rem;
    height: 1.8rem;
  }
  .shop{
    position: relative;
    z-index: 0;
    &-title{
      margin: .4rem 0 .2rem;
      font-size: @font-size-large-s;
      line-height: .3rem;
      color: @text-color-0;
      text-align: center;
      &::before, &::after{
        display: inline-block;
        content: '';
        width: .4rem;
        height: .02rem;
        background-color: #999;
        line-height: .3rem;
        vertical-align: middle;
      }
      &::before{
        margin-right: .24rem;
      }
      &::after{
        margin-left: .24rem;
      }
    }
  }
  .side{
    position: fixed;
    right: .32rem;
    bottom: 1.5rem;
  }
}
  @keyframes rotate {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(1turn);
    }
  }
</style>
