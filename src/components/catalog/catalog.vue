<template>
  <div class="catalog">
    <div class="catalog-header">
      <div class="catalog-header-col">
        <span class="catalog-header-btn">
          <svg class="catalog-icon catalog-icon-return" @click="$router.push('/')">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
        </svg>
        </span>
        <h2 class="catalog-header-title">晚餐</h2>
      </div>
      <div class="catalog-header-catalog">
        <ul class="catalog-header-catalog-content">
          <li class="catalog-header-item">全部</li>
          <li class="catalog-header-item">简餐便当</li>
        </ul>
      </div>
    </div>
    <div class="catalog-shop">
      <shop-list :offsetTop="searchBoxHeight" :searchWord="searchWord"></shop-list>
    </div>
    <div class="catalog-dialog" v-show="isShowDialog">
      <div class="catalog-menu">
        <h3 class="catalog-menu-title">请选择分类</h3>
      </div>
      <div class="catalog-mask"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ShopList from 'components/shop-list/shop-list'

export default {
  data () {
    return {
      searchBoxHeight: 0,
      searchWord: '',
      isShowDialog: false
    }
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
  }
  &-header{
    width: 100%;
    height: 1.6rem;
    overflow: hidden;
    background-image: linear-gradient(90deg,#0af,#0085ff);
    &-col{
      position: relative;
      margin: .2rem 0;
    }
    &-title{
      font-size: .36rem;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }
    &-btn{
      position: absolute !important;
      left: .3rem;
      top: 0;
      display: block;
      width: .5rem;
      height: .5rem;
      .extend-click();
    }
    &-catalog{
      height: .7rem;
      line-height: .7rem;
      width: 100%;
      overflow-x: scroll;
      &-content{
        display: flex;
        width: 10rem;
        font-size: .28rem;
        color: #b2e0ff;
      }
    }
    &-item{
      margin: 0 .3rem;
      font-size: inherit;
      color: inherit;
    }
  }
}
</style>
