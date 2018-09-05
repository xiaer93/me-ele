<template>
  <div class="catalog">
    <div class="catalog-header">
      <div class="catalog-header-col">
        <span class="catalog-header-return">
          <svg class="catalog-icon catalog-icon-return" @click="$router.push('/')">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
        </svg>
        </span>
        <h2 class="catalog-header-title">{{currentCatalog.name}}</h2>
      </div>
      <div class="catalog-header-catalog">
        <ul class="catalog-header-catalog-content" :style="{'width': `${(currentCatalog.childMenu.length + 1) * 1.8}rem`}">
          <li class="catalog-header-item">全部</li>
          <li class="catalog-header-item"
            v-for="(item, index) in currentCatalog.childMenu"
            :key="index"
          >{{item.name}}</li>
        </ul>
        <span class="catalog-header-catalog-show">
          <svg class="catalog-icon catalog-icon-show"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#drop-down"></use></svg>
        </span>
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
import {mapGetters} from 'Vuex'
import ShopList from 'components/shop-list/shop-list'

export default {
  data () {
    return {
      searchBoxHeight: 0,
      searchWord: '',
      currentCatalogId: 0,
      isShowDialog: false
    }
  },
  computed: {
    currentCatalog () {
      return this.menuList[this.currentCatalogId]
    },
    ...mapGetters([
      'menuList'
    ])
  },
  mounted () {
    this.currentCatalogId = Number.parseInt(this.$route.params.id)
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
      height: .7rem;
      line-height: .7rem;
      width: 100%;
      overflow-x: scroll;
      &-content{
        display: flex;
        width: 10rem;
        padding-right: rem;
        font-size: .28rem;
        color: #b2e0ff;
      }
      &-show{

      }
    }
    &-item{
      width: 1.2rem;
      margin: 0 .3rem;
      font-size: inherit;
      color: inherit;
      text-align: center;
    }
  }
}
</style>
