<template>
  <div class="address">
    <div class="address-header">
      <header-title>我的地址</header-title>
    </div>
    <div class="address-list">
      <ul class="address-list-content">
        <li class="address-list-item">
          <div class="address-list-left">
            <p class="address-list-name"><em class="address-list-firstname">程</em>先生<span class="address-list-tel">13397101406</span></p>
            <p class="address-list-text"><em class="address-list-tag">家</em>武汉市人民政府武汉市人民政府</p>
          </div>
          <div class="address-list-right">
            <span class="address-list-edit" @click="$router.push('/profile/address/edit')">
              <svg class="m-icon m-icon-edit"><use data-v-4503efe5="" xlink:href="#edit"></use></svg>
            </span>
            <span class="address-list-remove">
              <svg class="m-icon m-icon-remove"><use data-v-4503efe5="" xlink:href="#delete"></use></svg>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="address-btn">
      <span class="address-btn-icon"></span>
      <span class="address-btn-text">新增收获地址</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderTitle from 'base/header-title'

export default {
  components: {
    HeaderTitle
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/variable";

.address{
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  &-list{
    padding-bottom: .9rem;
    overflow: scroll;
    &-content{

    }
    &-item{
      display: flex;
      justify-content: space-between;
      padding: .3rem;
      color: @text-color-6;
      font-size: @font-size-medium-s;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
    }
    &-left{
      flex: 1 1 auto;
    }
    &-name{
      font-size: @font-size-large-s;
    }
    &-firstname{
      margin-right: .04rem;
      color: @text-color-3;
      font-weight: @font-weight-bold;
      font-style: normal;
    }
    &-tel{
      margin-left: .06rem;
      font-size: @font-size-medium-s;
    }
    &-text{
      margin-top: .1rem;
    }
    &-tag{
      display: inline-block;
      margin-right: .04rem;
      padding: .02rem .03rem;
      border: 1px solid #ffab91;
      color: #ffab91;
    }
    &-right{
      flex: 0 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: .9rem;
    }
    &-edit{
      width: .32rem;
      height: .32rem;
    }
    &-remove{
      width: .3rem;
      height: .3rem;
    }

  }
  &-btn{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: @font-size-large-s;
    color: #3190e8;
    text-align: center;
    background-color: #fff;
    &-icon{
      display: inline-block;
      width: .42rem;
      height: .42rem;
      background: url("~common/image/address-add.png") no-repeat center/cover;
    }
    &-text{
      margin-left: .1rem;
    }
  }
}
</style>
