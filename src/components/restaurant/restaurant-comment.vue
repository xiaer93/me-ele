<template>
  <div class="comment">
    <div class="comment-score">
      <p class="comment-score-number">4.7</p>
      <div class="comment-score-star">
        <span class="comment-score-star-text">商家评论</span>
        <star></star>
      </div>
      <p class="comment-score-taste">
        <span class="comment-score-taste-text">味道</span>
        <span class="comment-score-taste-number">4.2</span>
      </p>
      <p class="comment-score-pack">
        <span class="comment-score-pack-text">包装</span>
        <span class="comment-score-pack-number">4.2</span>
      </p>
      <p class="comment-score-send">
        <span class="comment-score-taste-text">配送</span>
        <span class="comment-score-taste-number">4.4</span>
      </p>
    </div>
    <div class="comment-content">
      <ul class="comment-content-filter">
        <li class="comment-content-filter-item">全部<em>212</em></li>
        <li class="comment-content-filter-item">全部<em>212</em></li>
        <li class="comment-content-filter-item">全部<em>212</em></li>
        <li class="comment-content-filter-item">全部<em>212</em></li>
      </ul>
      <ul class="comment-content-main">
        <li class="m-comment">
          <img src="/static/users/user-1.webp" alt="" class="m-comment-avatar">
          <div class="m-comment-content">
            <p class="m-comment-name">冬瓜</p>
            <div class="m-comment-like">
              <star></star>
              <span class="m-comment-like-tag">满意</span>
            </div>
            <div class="m-comment-text">
              请问我要多葱！！！葱在哪里？？？？！！！！
            </div>
            <ul class="m-comment-imgs">
              <li class="m-comment-imgs-item">
                <img src="/static/comment/1.webp" alt="">
              </li>
              <li class="m-comment-imgs-item">
                <img src="/static/comment/1.webp" alt="">
              </li>
              <li class="m-comment-imgs-item">
                <img src="/static/comment/1.webp" alt="">
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'base/star'

export default {
  components: {
    Star
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.comment{
  &-score{
    display: flex;
    align-items: center;
    padding: 0 .5rem;
    height: 2rem;
    background-color: #fff;
    &-number{
      font-size: .8rem;
      color: @text-color-ff;
    }
    &-star{
      margin-left: .36rem;
      &-text{
        display: block;
        font-size: @font-size-small-s;
        color: @text-color-6;
        margin-bottom: .1rem;
      }
    }
    &-taste{
      margin-left: .6rem;
      color: @text-color-6;
      &-text{
        display: block;
        margin-bottom: .1rem;
        font-size: @font-size-small-s;
      }
      &-number{
        font-size: @font-size-large-l;
      }
    }
    &-pack{
      margin-left: .6rem;
      color: @text-color-6;
      &-text{
        display: block;
        margin-bottom: .1rem;
        font-size: @font-size-small-s;
      }
      &-number{
        font-size: @font-size-large-l;
      }
    }
    &-send{
      flex: 1 1 auto;
      margin-left: .6rem;
      text-align: right;
      color: @text-color-6;
      border-left: 1px solid #eee;
      &-text{
        display: block;
        margin-bottom: .1rem;
        font-size: @font-size-small-s;
      }
      &-number{
        font-size: @font-size-large-l;
      }
    }
  }
  &-content{
    margin-top: .16rem;
    padding: .3rem;
    background-color: #fff;
    &-filter{
      .clearfix();
      &-item{
        float: left;
        display: block;
        padding: .12rem .2rem;
        margin: 0 .14rem .22rem 0;
        font-size: @font-size-small;
        color: #6d7885;
        background-color: #ebf5ff;
        border-radius: .1rem;
        &.active{
          color: #fff;
          background-color: #0097ff;
        }
      }
    }
    &-main{

    }
  }
}
  .m-comment{
    display: flex;
    padding: .3rem 0;
    border-bottom: 1px solid #eee;
    font-size: @font-size-medium-s;
    color: @text-color-3;
    &-avatar{
      flex: 0 0 auto;
      width: .6rem;
      height: .6rem;
      border-radius: 100%;
    }
    &-content{
      margin-left: .2rem;
      flex: 1 1 auto;
    }
    &-name{

    }
    &-like{
      display: flex;
      align-items: center;
      margin-top: .2rem;
      &-tag{
        margin-left: .1rem;
      }
    }
    &-text{
      margin-top: .2rem;
    }
    &-imgs{
      display: flex;
      margin-top: .2rem;
      width: 6rem;
      overflow: hidden;
      &-item{
        flex: 1 1 auto;
        margin-left: .1rem;
        &:first-child{
          margin-left: 0;
        }
      }
      img{
        width: 100%;
      }
    }
  }
</style>
