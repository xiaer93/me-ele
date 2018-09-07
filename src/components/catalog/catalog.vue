<template>
  <div class="catalog">
    <div class="catalog-header" ref="header">
      <div class="catalog-header-content">
        <div class="catalog-header-col">
        <span class="catalog-header-return" @click="$router.push('/')">
          <svg class="catalog-icon catalog-icon-return">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
          </svg>
        </span>
          <h2 class="catalog-header-title">{{currentCatalog.name}}</h2>
        </div>
        <div class="catalog-header-catalog">
          <div class="catalog-header-catalog-content">
            <ul class="catalog-header-catalog-ul" :style="{'width': `${currentCatalog.childMenu.length * 1.72 + 1.2}rem`}">
              <li class="catalog-header-item"
                  :class="{'active': searchWord === '全部'}"
                  @click="setWord('全部')"
              >全部</li>
              <li class="catalog-header-item"
                  v-for="(item, index) in currentCatalog.childMenu"
                  :key="index"
                  :class="{'active': searchWord === item.name}"
                  @click="setWord(item.name)"
              >{{item.name}}</li>
            </ul>
          </div>
          <span class="catalog-header-catalog-show" @click="isShowDialog = true">
            <svg class="catalog-icon catalog-icon-show"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#drop-down"></use></svg>
          </span>
        </div>
      </div>
    </div>
    <div class="catalog-shop" ref="shop">
      <shop-list :offsetTop="searchBoxHeight" :searchWord="searchWord"></shop-list>
    </div>
    <!--fixme: 如何阻止滚动冒泡至上层？-->
    <div class="catalog-dialog" v-show="isShowDialog">
      <div class="catalog-menu">
        <div class="catalog-menu-header">
          <h3 class="catalog-menu-title">请选择分类</h3>
          <span class="catalog-menu-close" @click="isShowDialog = false"></span>
        </div>
        <div class="catalog-menu-content">
          <div class="catalog-menu-catalog">
            <ul class="catalog-menu-scroll">
              <li class="m-catalog"
                  v-for="(menu, index) in menuList"
                  :key="index"
                  @click="selectId(menu)"
                  :class="{'active': menu.catalogId === selectCatalogId}"
              >
                <span class="m-catalog-food">{{menu.name}}</span>
                <span class="m-catalog-count" :data-count="menu.count">{{menu.count}}</span>
              </li>
            </ul>
          </div>
          <div class="catalog-menu-subcatalog">
            <ul class="catalog-menu-scroll">
              <li class="m-catalog" v-for="(menu, index) in selectCatalog" :key="index">
                <img src="" alt="" class="m-catalog-avatar">
                <span class="m-catalog-food">{{menu.name}}</span>
                <span class="m-catalog-count">{{menu.count}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="catalog-mask" @click="isShowDialog = false" @touchmove.prevent></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import * as $ from 'jquery'
import {mapGetters} from 'vuex'
import ShopList from 'components/shop-list/shop-list'

export default {
  data () {
    return {
      searchBoxHeight: 0,
      searchWord: '',
      currentCatalogId: 0,
      selectCatalogId: 0,
      isShowDialog: false
    }
  },
  computed: {
    currentCatalog () {
      return this.menuList[this.currentCatalogId - 1]
    },
    selectCatalog () {
      return this.menuList[this.selectCatalogId - 1].childMenu
    },
    ...mapGetters([
      'menuList'
    ])
  },
  watch: {

  },
  methods: {
    setWord (word) {
      this.searchWord = word
    },
    selectId (menu) {
      this.selectCatalogId = menu.catalogId
    }
  },
  created () {
    this.currentCatalogId = Number.parseInt(this.$route.params.id)
    this.selectCatalogId = this.currentCatalogId
  },
  mounted () {
    setTimeout(() => {
      this.searchBoxHeight = $(this.$refs.header).height()
      console.log(this.searchBoxHeight)
    }, 20)
  },
  components: {
    ShopList
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.catalog{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  min-height: 100%;
  font-size: .28rem;
  background-color: #fff;
  &-icon{
    &-return{
      width: .5rem;
      height: .5rem;
      fill: #effaff;
    }
    &-show{
      width: .3rem;
      height: .3rem;
      margin: auto;
    }
  }
  &-header{
    width: 100%;
    height: 1.6rem;
    overflow: hidden;
    &-content{
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 1.6rem;
      background-image: linear-gradient(90deg,#0af,#0085ff);
    }
    &-col{
      position: relative;
      margin: .2rem 0;
    }
    &-title{
      font-size: @font-size-large-l;
      color: @text-color-f;
      font-weight: @font-weight-bold;
      text-align: center;
    }
    &-return{
      position: absolute !important;
      left: .3rem;
      top: 0;
      display: block;
      width: .5rem;
      height: .5rem;
      .extend-click();
    }
    &-catalog{
      position: absolute;
      display: flex;
      margin-bottom: .1rem;
      height: .6rem;
      line-height: .6rem;
      width: 100%;
      &-content{
        flex: 1 1 auto;
        overflow-x: scroll;
      }
      &-ul{
        display: flex;
        height: 100%;
        font-size: @font-size-medium;
        color: @text-color-f;
      }
      &-show{
        display: flex;
        flex: 0 0 auto;
        height: 100%;
        width: .8rem;
      }
    }
    &-item{
      box-sizing: border-box;
      margin: 0 .3rem;
      text-align: center;
      border-bottom: .04rem solid transparent;
      opacity: .7;
      &.active{
        opacity: 1;
        border-bottom-color: #fff;
      }
    }
  }
  &-shop{
    position: relative;
    z-index: 0;
  }
  &-dialog{
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &-menu{
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    &-header{
      display: flex;
      padding: 0 .3rem;
      height: .8rem;
      line-height: .8rem;
      font-weight: 700;
      color: #333;
      background-color: #f9f9f9;
    }
    &-title{
      flex: 1 1 auto;
      font-weight: inherit;
      font-size: inherit;
      color: inherit;
    }
    &-close{
      width: .8rem;
      height: .8rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAlFJREFUaAXtmEFOwkAUhmld6GW8AgsXegNNxGWBBZ7HBMqWhTvixrh1SYI3MfEASv1/0kcKKS3TeTMm5jVpBsr0n/f9M29mmF7PLnPAHDAHzAFzwBwwB8wBc8AcMAfMAXPAHPj3DiRahNPp9DpN036SJC9Zlq00dKF5Cb3boijW4/F4qaGpAkxYBPPGgBDgD+7BcDh89glwNpvd4P0lYC9K3YfRaLTw0eS7qa/AVgQ9KzoI8Az3Is/zO3nmWh7C8n1o7tpw1avWVwHmMGbPirAPdB0stAvcKkNaBZg5i4AGvtDHYGHkI4bzqxjqU6rksATAYczhzB6WZzSBZrTldAvsk+j5lqrADKYLdCxYxqcO7AodEzYY8KnQsWGDArdBI8+/UGe3zm6DwWyMkhOUWs5St3oFGdLVBo7lNIC/Ue9c6mJiCw7LtoIDs5E6aD6vXgCehOxZaSsKMBtrgo4FyzhUNh4UaruYs+Uw3qsKWK7Tn3sPA36JAiyzMTh2OStMMMF77y1ap5TBgQUWYNt/PRIUe1Y+x4QOCtwAOwGw995bDHMpg01aTbAyG9dNZGVOt+69XSCrdYMAnwIrQcSGVgd2gf0LaFXgLrCxodWAfWBjQqsAl6eLq5qlx3m7eCyncSJ6hZOVdzGna6myLGFm5VHq4TrrDEsInozULVmbzea+K2T1PRVgwK6rogi4E6xo1EFD80N+9ylVhjQDQA4PAM6D+KXWgdt8Pu+zZwmL4Zyj5F9Iu8wBc8AcMAfMAXPAHDAHzAFzwBwwB8wBc8AcaHbgF/TfvAgAPh+ZAAAAAElFTkSuQmCC);
      background-repeat: no-repeat;
      background-size: contain;
    }
    &-content{
      display: flex;
      height: 8rem;
    }
    &-catalog{
      flex: 0 0 auto;
      width: 2.6rem;
      height: 100%;
      overflow-y: scroll;
    }
    &-subcatalog{
      flex: 1 1 auto;
      height: 100%;
      overflow-y: scroll;
    }
    &-scroll{
      width: 100%;
      height: auto;
      background-color: #fcfcfc;
    }
  }
  &-mask{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
  }
  .m-catalog{
    height: 1rem;
    .clearfix();
    border: .02rem solid;
    border-color: transparent #f8f8f8 transparent transparent;
    &-food{
      float: left;
      display: block;
      height: .4rem;
      margin-top: .3rem;
      padding-left: .3rem;
      font-size: .28rem;
      border-left: .1rem solid transparent;
    }
    &-count{
      float: right;
      display: block;
      margin-top: .2rem;
      margin-right: .2rem;
      padding: 0.06rem 0.1rem;
      border-radius: .06rem;
      border: .02rem solid #f8f8f8;
    }
    &.active{
      border-color: #f8f8f8 transparent #f8f8f8 transparent;
      background-color: #fff;
    }
  }
}
</style>
