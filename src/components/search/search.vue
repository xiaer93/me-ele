<template>
  <div class="search">
    <svg-ele></svg-ele>
    <div class="search-header">
      <svg class="search-icon search-icon-return" @click="$router.push('/')">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
      </svg>
      <div class="search-text">
        <svg class="search-icon search-icon-search">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
        </svg>
        <div class="search-input">
          <input-box placeholder="输入商家、店铺名称" v-model="searchWord"></input-box>
        </div>
      </div>
      <span class="search-btn">搜索</span>
    </div>
    <div class="search-history">
      <h3 class="search-title">历史搜索</h3>
      <ul class="search-box">
        <li class="search-box-item"
            v-for="(item, index) in hotWord"
            :key="index"
            @click="setSearchWord(item.search_word)"
        >{{item.search_word}}</li>
      </ul>
    </div>
    <div class="search-hot">
      <h3 class="search-title">热门搜索</h3>
      <ul class="search-box">
        <li class="search-box-item"
            v-for="(item, index) in hotWord"
            :key="index"
            @click="setSearchWord(item.search_word)"
        >{{item.search_word}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SvgEle from 'base/svg'
import InputBox from 'base/input-box'
import searchApi from 'api/search'

export default {
  data () {
    return {
      hotWord: [],
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
    setSearchWord (word) {
      this.searchWord = word
    },
    change (word) {
      this.searchWord = word
    }
  },
  created () {
    this.getHotWord()
  },
  components: {
    SvgEle,
    InputBox
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.search{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 .2rem;
  font-size: .28rem;
  &-header{
    display: flex;
    align-items: center;
    /*height: .7rem;*/
    padding: .2rem 0;
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
    font-size: .32rem;
    color: #666;
    font-weight: bold;
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
}
</style>
