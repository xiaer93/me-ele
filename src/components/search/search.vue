<template>
  <transition name="slide">
    <div class="search">
      <div class="search-header">
        <div class="search-content" ref="headerSearch">
          <svg class="search-icon search-icon-return" @click="$router.push('/')">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
          </svg>
          <div class="search-text">
            <svg class="search-icon search-icon-search">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
            </svg>
            <div class="search-input">
              <input-box placeholder="输入商家、店铺名称" v-model="searchWord" @blur="search()"></input-box>
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
                @click="setSearchWord(item.searchWord)"
            >{{item.searchWord}}</li>
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
      <div class="search-shop">
        <shop-list :offsetTop="searchBoxHeight" :searchWord="searchWord"></shop-list>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import ShopList from 'components/shop-list/shop-list'
import InputBox from 'base/input-box'
import searchApi from 'api/search'
import {SaveData} from 'common/js/util'
import * as $ from 'jquery'

export default {
  data () {
    return {
      hotWord: [],
      historyWord: [],
      searchWord: '',
      searchBoxHeight: 0
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
      this.historyWord = this.searchHistory.save({
        searchWord: this.searchWord
      })
    }
  },
  created () {
    this.searchHistory = new SaveData('searchHistory', 'searchWord')
    this.getHotWord()
    this.getSearchWord()
  },
  mounted () {
    setTimeout(() => {
      let $headerSearch = $(this.$refs.headerSearch)

      // 获取搜索框的高度;height获取元素本身高度，outerHeihgt包含padding、true包括margin
      this.searchBoxHeight = $headerSearch.outerHeight()
    }, 20)
  },
  components: {
    InputBox,
    ShopList
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.search{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  min-height: 100%;
  font-size: .28rem;
  background-color: #fff;
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
    font-size: .26rem;
    background-color: transparent;
  }
  &-btn{
    font-size: .26rem;
    color: #000;
    font-weight: bold;
  }
  &-title{
    margin: .1rem 0;
    &-text{
      font-size: .32rem;
      line-height: 1;
      color: #666;
      font-weight: bold;
    }
    &-btn{
      float: right;
      height: 100%;
      .extend-click();
    }
  }
  &-box{
    /*margin-top: .3rem;*/
    margin-bottom: .3rem;
    .clearfix();
    &-item{
      float: left;
      margin: .3rem .3rem 0 0;
      padding: .1rem .2rem;
      background-color: #f7f7f7;
      border-radius: .04rem;
    }
  }
  &-shop{
    position: relative;
    z-index: 0;
  }
}

/* search 切入切出动画*/
.slide-enter-active, .slide-leave-active{
  transition: all .3s;
}
.slide-enter, .slide-leave-to{
  transform: translate(100%, 0);
}
</style>
