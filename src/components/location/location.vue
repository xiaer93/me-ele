<template>
  <transition name="slide">
    <div class="location" ref="location" v-if="isShowLocation">
      <div class="location-header">
        <header-title @back="hide">选择收获地址</header-title>
      </div>
      <div class="location-main">
        <div class="location-main-btn">
          <p class="location-main-btn-select" @click="openCityBox">
            <span>选择城市</span>
          </p>
          <div class="location-main-btn-search">
            <input-box v-model="searchWord" @input="searchAddress"></input-box>
          </div>
        </div>
        <div class="location-main-content" v-show="addressList.length">
          <ul class="location-main-search">
            <li class="location-main-item" v-for="(item, index) in addressList" :key="index">
              <h3 class="location-main-item-title">
                {{item.city}}
            </h3>
              <p class="location-main-item-content">
                <span class="location-main-item-address">{{item.address}}</span>
                <span class="location-main-item-traffic">{{item.bus}}</span>
              </p>
            </li>
          </ul>
          <div class="location-main-tips">
            <p class="location-main-tips-p">找不到地址？</p>
            <p class="location-main-tips-p">请尝试只输入小区、写字楼或学校名</p>
            <p class="location-main-tips-p">详细地址（如门牌号）可稍后输入</p>
          </div>
        </div>
      </div>
      <div class="location-city" v-if="isSelectCity">
        <div class="location-city-header">
          <header-title>城市选择</header-title>
        </div>
        <div class="location-city-scroll" :style="{'overflow': cityWord ? 'scroll' : ''}">
          <div class="location-city-search">
            <p class="location-city-search-inner">
              <input-box v-model="cityWord" placeholder="输入城市名、拼音或首字母查询"></input-box>
            </p>
          </div>
          <div class="location-city-content" v-show="!cityWord">
            <lift>
              <lift-main class="location-city-content-main">
                <div class="m-city-main" v-for="(item, index) in cityList.cityList" :key="index">
                  <h3 class="m-city-main-title">{{item.idx}}</h3>
                  <p class="m-city-main-text"
                     v-for="city in item.cities"
                     :key="city.id"
                     @click="setPosition(city)"
                  >{{city.name}}</p>
                </div>
              </lift-main>
              <lift-number class="location-city-content-number">
                <div class="m-city-number" v-for="(item, index) in cityList.alphabet" :key="index">
                  <p class="m-city-number-text">{{item}}</p>
                </div>
              </lift-number>
            </lift>
          </div>
          <div class="location-city-filter" v-show="cityWord">
            <div class="m-city-main">
              <p class="m-city-main-text" v-for="(city, index) in filterCity" :key="index">{{city.name}}</p>
            </div>
            <div class="location-city-filter-tips" v-show="!filterCity.length">无结果</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import HeaderTitle from 'base/header-title'
import InputBox from 'base/input-box'
import {Lift, LiftMain, LiftNumber} from 'base/lift/index'
import locationApi from 'api/location'

export default {
  data () {
    return {
      position: {},
      searchWord: '',
      addressList: [],
      cityWord: '',
      cityList: {},
      isSelectCity: false,
      isShowLocation: false
    }
  },
  computed: {
    filterCity () {
      let self = this
      let ret = []
      if (self.cityWord) {
        this.cityList.cityList.forEach((item) => {
          ret = ret.concat(item.cities.filter(t => {
            // fixme: 针对Unicode4字节字符进行优化搜索？
            return t.name.indexOf(self.cityWord) !== -1 || t.pinyin.startsWith(self.cityWord)
          }))
        })
      }

      return ret
    }
  },
  methods: {
    openCityBox () {
      this.isSelectCity = true
    },
    getCityList () {
      locationApi.getCityList()
        .then(res => {
          if (res.code === 0) {
            this.cityList = res.result.cityList
          } else {
            console.log(res.msg)
          }
        })
    },
    searchAddress () {
      locationApi.searchAddress()
        .then(res => {
          if (res.code === 0) {
            this.addressList = res.result.addressList
          } else {
            console.log(res.msg)
          }
        })
    },
    setPosition (position) {
      let {latitude, longitude, name} = position
      this.isSelectCity = false
      this.position = {
        latitude,
        longitude,
        address: name
      }
      this.hide()
      this.$emit('updatePosition', this.position)
    },
    show () {
      this.isShowLocation = true
    },
    hide () {
      this.isShowLocation = false
    },
    stopScroll (event) {
      // fixme: 事件模型：1、捕获阶段（从window到具体），2、对象阶段，3、冒泡阶段（从具体到位未知）
      // touch事件preventDefault，即无法抵到滚动元素；stopPropagation阻止冒泡事件~~~
      // css3属性pass可以控制preventDefault的行为~~~
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
    }
  },
  created () {
    this.getCityList()
  },
  mounted () {
  },
  components: {
    HeaderTitle,
    InputBox,
    Lift,
    LiftMain,
    LiftNumber
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.location{
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: .9rem;
  background-color: #f4f4f4;
  &-header{
  }
  &-main{
    width: 100%;
    height: calc(100% - .9rem);
    overflow-y: scroll;
    &-btn{
      display: flex;
      align-items: center;
      padding: 0 .3rem;
      height: 1.2rem;
      &-search{
        width: 5.6rem;
        height: .72rem;
        background-color: #f4f4f4;
      }
      &-select{
        position: relative;
        margin-right: .6rem;
        flex: 1 1 auto;
        span{
          display: block;
          width: 80%;
          font-size: @font-size-small;
          color: @text-color-3;
          .hide-text(1);
        }
        &::after{
          position: absolute;
          right: -.1rem;
          top: .05rem;
          content: '';
          display: block;
          border: .12rem solid transparent;
          border-top-color: @text-color-3;
        }
      }
      background-color: #fff;
    }
    &-search{
      background-color: #fff;
    }
    &-item{
      padding: .26rem .3rem;
      border-bottom: 1px solid #eee;
      &-title{
        font-size: @font-size-medium;
        font-weight: @font-weight-bold;
        color: #2a2a2a;
      }
      &-content{
        margin-top: .1rem;
        font-size: @font-size-small;
        color: @text-color-3;
        line-height: .34rem;
      }
      &:last-child{
        border-bottom: none;
      }
    }
    &-tips{
      background-color: #fff;
      &-p{
        text-align: center;
        font-size: @font-size-large-s;
        color: @text-color-9;
        line-height: .4rem;
        &:first-child{
          margin-bottom: .16rem;
        }
      }
    }
  }
  &-city{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    &-header{

    }
    &-scroll{
      width: 100%;
      height: calc(100% - 1rem);
    }
    &-search{
      padding: .14rem 0;
      .gradient-bg-2();
      &-inner{
        margin: 0 .5rem;
        height: .6rem;
        background-color: #fff;
        border-radius: .4rem;
      }
    }
    &-content{
      height: calc(100% - .9rem);
      &-main{
        width: 100%;
      }
      &-number{
        position: absolute;
        right: .4rem;
        top: 1.2rem;
      }
    }
    &-filter{
      &-tips{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: @font-size-large-s;
        color: @text-color-3;
      }
    }
  }
}
.m-city{
  &-main{
    &-title{
      height: .7rem;
      line-height: .8rem;
      padding-left: .3rem;
      font-size: @font-size-medium;
      color: @text-color-6;
      background-color: rgb(245, 245, 245);
      border-bottom: 1px solid #ddd;
    }
    &-text{
      height: 1rem;
      line-height: 1rem;
      margin-left: .3rem;
      font-size: @font-size-medium;
      color: @text-color-3;
      border-bottom: 1px solid #ddd;
      &:last-child{
        border-bottom: none;
      }
    }
  }
  &-number{
    margin: .1rem 0;
    color: @text-color-6;
    font-size: @font-size-large-s;
    text-align: center;
    background-color: transparent;
    border-radius: .1rem;
   &.active{
      color: #fff;
      background-color: red;
    }
  }
}

.slide-enter-active, .slide-leave-active{
  transform: translate(0, 0);
  transition: all .3s;
}
.slide-enter, .slide-leave-to{
  transform: translate(100%, 0);
}
</style>
