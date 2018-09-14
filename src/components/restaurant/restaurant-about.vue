<template>
  <div class="about">
    <div class="about-send">
      <h3 class="about-send-title">配送信息</h3>
      <p class="about-send-time">
        <span class="about-send-time-tag">蜂鸟配送</span>
        <span class="about-send-time-text">约30分钟送达，距离2.2km</span>
      </p>
      <p class="about-send-cost">配送费￥4.6</p>
    </div>
    <div class="about-server">
      <h3 class="about-server-title">活动与服务</h3>
      <p class="about-server-col">
        <span class="about-server-tag">满减</span>
        <span class="about-server-text">新用户下单立减13元(不与其它活动同享)</span>
      </p>
      <p class="about-server-col">
        <span class="about-server-tag">满减</span>
        <span class="about-server-text">新用户下单立减13元(不与其它活动同享)</span>
      </p>
      <p class="about-server-col">
        <span class="about-server-tag">满减</span>
        <span class="about-server-text">新用户下单立减13元(不与其它活动同享)</span>
      </p>
    </div>
    <div class="about-picture">
      <h3 class="about-picture-title">商家实景</h3>
      <ul class="about-picture-content">
        <li class="about-picture-item">
          <img class="about-picture-item-img" src="/static/shop/shop-door.webp" alt="">
          <span class="about-picture-item-text">门面(1张)</span>
        </li>
        <li class="about-picture-item">
          <img class="about-picture-item-img" src="/static/shop/shop-door.webp" alt="">
          <span class="about-picture-item-text">大堂(2张)</span>
        </li>
      </ul>
    </div>
    <div class="about-infos">
      <h3 class="about-infos-title">商家信息</h3>
      <p class="about-infos-content">金孔雀烧烤王 96年就开始凭借“烤凤爪、肉串、泡菜花饭 ”在南京路赫赫有名 无人不知无人不晓  基本上只要吃过的人都知道凤爪入口即化 花饭包你有回味.！</p>
      <p class="about-infos-detail">
        <span class="about-infos-left">品类</span>
        <span class="about-infos-right">烧烤、地方小吃</span>
      </p>
      <p class="about-infos-detail">
        <span class="about-infos-left">商家电话</span>
        <span class="about-infos-right">11111111111</span>
      </p>
      <p class="about-infos-detail">
        <span class="about-infos-left">地址</span>
        <span class="about-infos-right">南京路74号</span>
      </p>
      <p class="about-infos-detail">
        <span class="about-infos-left">营业时间</span>
        <span class="about-infos-right">12:40-23:40</span>
      </p>
    </div>
    <div class="about-certificate">
      <span class="about-certificate-left">营业资质</span>
      <span class="about-certificate-right">&gt;</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="less" rel="stylesheet/less">
/* title等类似应该提取为元件 ？？？？？ */
@import "~common/less/mixin";

.about{
  &-send{
    padding: .4rem .3rem;
    background-color: #fff;
    font-size: @font-size-small-s;
    &-title{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-time{
      margin-top: .4rem;
      line-height: .4rem;
      &-tag{
        padding: .06rem .1rem;
        color: @text-color-f;
        background-color: #0097ff;
        border-radius: .1rem;
      }
      &-text{
        /*display: inline-block;*/
        margin-left: .2rem;
      }
    }
    &-cost{
      margin-top: .14rem;
    }
  }
  &-server{
    margin-top: .2rem;
    padding: .4rem .3rem;
    background-color: #fff;
    font-size: @font-size-small-s;
    &-title{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-col{
      margin-top: .3rem;
      line-height: .3rem;
      color: @text-color-6;
    }
    &-tag{
      padding: .04rem .08rem;
      background-color: #70bc46;
      color: @text-color-f;
      border-radius: .1rem;
    }
    &-text{

    }
  }
  &-picture{
    margin-top: .2rem;
    padding: .4rem .3rem;
    background-color: #fff;
    font-size: @font-size-small-s;
    &-title{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-content{
      margin-top: .24rem;
      .clearfix()
    }
    &-item{
      position: relative;
      float: left;
      width: 1.6rem;
      height: 1.6rem;
      margin-right: .16rem;
      &-img{
        width: 100%;
      }
      &-text{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: .04rem 0;
        text-align: center;
        font-size: @font-size-medium-s;
        color: #eee;
        background-color: rgba(0,0,0,.5);
      }
    }
  }
  &-infos{
    margin-top: .2rem;
    padding: .4rem 0 .4rem .3rem;
    background-color: #fff;
    font-size: @font-size-small-s;
    &-title{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-content{
      padding: .3rem;
      font-size: @font-size-medium-s;
      color: @text-color-6;
      line-height: .3rem;
      text-align: left;
    }
    &-detail{
      display: flex;
      justify-content: space-between;
      padding: .3rem .3rem .3rem 0;
      border-top: 1px solid #eee;
    }
    &-left{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-right{
      font-size: @font-size-medium-s;
      color: @text-color-6;
    }
  }
  &-certificate{
    display: flex;
    justify-content: space-between;
    margin-top: .2rem;
    padding: .4rem .3rem;
    background-color: #fff;
    font-size: @font-size-small-s;
    &-title{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-left{
      font-size: @font-size-medium-s;
      color: @text-color-3;
      font-weight: @font-weight-bold;
    }
    &-right{

    }
  }
}
</style>
