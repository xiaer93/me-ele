<template>
  <ul class="radio-box">
    <li class="radio-box-item"
        v-for="(item, index) in radioList"
        :key="index"
        :class="{'active': item === currentRadio}"
        @click="select(item)">{{item.text}}
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    radioList: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      currentRadio: null
    }
  },
  methods: {
    select (item) {
      this.currentRadio = item
      this.$emit('change', item)
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.radio-box{
  .clearfix();
  &-item{
    float: left;
    margin-left: .2rem;
    width: 1.4rem;
    height: .6rem;
    line-height: .6rem;
    font-size: @font-size-small-s;
    color: @text-color-6;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: .1rem;
    &.active{
      color: #2395ff;
      background-color: #eef7ff;
      border: 1px solid rgba(35,149,255,.18);
    }
  }
}
</style>
