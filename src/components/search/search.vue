<template>
  <div class="search">
      <infinite-load class="search-scroll" @loadMore="loadMore" ref="infiniteLoad">
        <div class="search-header" ref="header">
          <div class="search-content" ref="headerSearch">
            <svg class="search-icon search-icon-return" @click="$router.back()">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
            </svg>
            <div class="search-text">
              <div class="search-input">
                <input-box placeholderText="输入商家、店铺名称" v-model="searchWord" @blur="search()"></input-box>
              </div>
            </div>
            <span class="search-btn">搜索</span>
          </div>
        </div>
        <div class="search-word" v-show="!searchWord">
          <div class="search-history" v-show="historyWord.length !== 0">
            <h3 class="search-title">
              <span class="search-title-text">历史搜索</span>
              <span class="search-title-btn" @click="clearHistory()">
          <svg class="search-icon search-icon-clear"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bin"></use></svg>
        </span>
            </h3>
            <ul class="search-box">
              <li class="search-box-item"
                  v-for="(item, index) in historyWord"
                  :key="index"
                  @click="setSearchWord(item)"
              >{{item}}</li>
            </ul>
          </div>
          <div class="search-hot">
            <h3 class="search-title">
              <span class="search-title-text">热门搜索</span>
            </h3>
            <ul class="search-box">
              <li class="search-box-item"
                  v-for="(item, index) in hotWord"
                  :key="index"
                  @click="setSearchWord(item.search_word)"
              >{{item.search_word}}</li>
            </ul>
          </div>
        </div>
        <div class="search-shop" v-show="searchWord">
          <shop-list :searchWord="searchWord" @loadSuccess="loadSuccess" ref="shopList"></shop-list>
        </div>
      </infinite-load>
    </div>
</template>

<script type="text/ecmascript-6">
import InfiniteLoad from 'base/infinite-load'
import ShopList from 'components/shop-list/shop-list'
import InputBox from 'base/input-box'
import searchApi from 'api/search'
import {SaveDataByArray} from 'common/js/storage'
import * as $ from 'jquery'

export default {
  data () {
    return {
      hotWord: [],
      historyWord: [],
      searchWord: ''
    }
  },
  methods: {
    getHotWord () {
      searchApi.hotWord({})
        .then(res => {
          if (res.code === 0) {
            this.hotWord = res.result.hotWord
          } else {
            console.log(res.msg)
          }
        })
    },
    getSearchWord () {
      this.historyWord = this.searchHistory.get()
    },
    setSearchWord (word) {
      this.searchWord = word
      this.search()
    },
    clearHistory () {
      this.historyWord = this.searchHistory.clear()
    },
    search () {
      this.historyWord = this.searchHistory.save(this.searchWord)
    },
    // 响应infinite-loadmore事件
    loadMore () {
      this.$refs.shopList.loadMore()
    },
    // 响应shop-list事件
    loadSuccess () {
      this.$refs.infiniteLoad.resetLoading()
    }
  },
  created () {
    this.searchHistory = new SaveDataByArray('searchHistory', {unique: true})
    this.getHotWord()
    this.getSearchWord()
  },
  mounted () {
    setTimeout(() => {
      // fixme: 耦合程度太高了~~~
      let offsetTop = $(this.$refs.header).outerHeight()
      $(this.$refs.shopList.$el).find('.filter-menu').css({
        position: 'fixed',
        top: offsetTop + 'px'
      })
    }, 20)
  },
  components: {
    InputBox,
    ShopList,
    InfiniteLoad
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.search{
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  font-size: .28rem;
  background-color: #fff;
  &-scroll{
    width: 100%;
    height: 100%;
  }
  &-header{
    position: relative;
    z-index: 1;
    height: .9rem;
  }
  &-content{
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: .2rem 0;
    height: .9rem;
    background-color: #fff;
  }
  &-word{
    position: relative;
    z-index: 0;
    padding: 0 .2rem;
  }
  &-icon{
    &-return{
      width: .5rem;
      height: .5rem;
      fill: #999;
    }
    &-search{
      margin-left: .1rem;
      width: .22rem;
      height: .22rem;
    }
    &-clear{
      fill: #cecece;
      width: .3rem;
      height: .3rem;
    }
  }
  &-text{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 .2rem 0 .3rem;
    width: 5.5rem;
    height: .5rem;
    line-height: .5rem;
    background-color: #f8f8f8;
  }
  &-input{
    flex: 1 1 auto;
    height: inherit;
    margin-left: .1rem;
    font-size: @font-size-medium-s;
    color: @text-color-6;
    background-color: transparent;
  }
  &-btn{
    font-size: @font-size-medium-s;
    color: @text-color-3;
    font-weight: @font-weight-bold;
  }
  &-title{
    display: flex;
    justify-content: space-between;
    margin: .1rem 0;
    &-text{
      display: inline-block;
      font-size: @font-size-large;
      color: @text-color-6;
      font-weight: @font-weight-bold;
    }
    &-btn{
      float: right;
      height: 100%;
      .extend-click();
    }
  }
  &-box{
    /*margin-top: .3rem;*/
    margin-bottom: .5rem;
    .clearfix();
    &-item{
      float: left;
      margin: .3rem .3rem 0 0;
      padding: .1rem .2rem;
      background-color: #f7f7f7;
      border-radius: .1rem;
      font-size: @font-size-medium;
      color: @text-color-6;
    }
  }
  &-shop{
    position: relative;
    z-index: 0;
  }
}
</style>
