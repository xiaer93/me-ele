<template>
  <div class="input">
    <span class="input-icon">
      <svg class="m-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#searchAddress"></use></svg>
    </span>
    <input type="text"
       class="input-text"
       :placeholder="placeholderText"
       v-bind:value="value"
       v-on="inputListeners"
       ref="text"
    >
    <span class="input-close" @click="clear()" :class="{'active': value}"></span>
  </div>
</template>

<script type="text/ecmascript-6">
import {debounce} from 'common/js/util'

export default {
  props: {
    placeholderText: {
      type: String,
      default: '请输入'
    },
    // 透明input，此处必须为value
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputListeners: function () {
      let self = this
      return Object.assign({}, this.$listeners, {
        input: debounce((event) => {
          self.$emit('input', event.target.value)
        }, 100),
        change: debounce((event) => {
          self.$emit('change', event.target.value)
        }, 20)
      })
    }
  },
  methods: {
    clear () {
      this.$emit('input', '')
    }
  },
  created () {
    setTimeout(() => {
      console.log(this.placeholderText)
    })
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.input{
  position: relative;
  width: 100%;
  height: 100%;
  line-height: inherit;
  font: inherit;
  &-text{
    box-sizing: border-box;
    padding-right: .6rem;
    padding-left: .5rem;
    width: 100%;
    height: 100%;
    line-height: inherit;
    font: inherit;
    background-color: transparent;
    &:focus {
      outline: none;
      border: none;
    }
  }
  &-close{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: .5rem;
    transform-origin: center;
    transform: scale(.2);
    transition: transform .6s;
    /*background-color: red;*/
    &::before, &::after{
      position: absolute;
      display: block;
      top: 50%;
      content: '';
      width: .5rem;
      height: .02rem;
      background-color: #200c00;
    }
    &::before{
      transform: rotate(45deg);
    }
    &::after{
      transform: rotate(-45deg);
    }
  }
  &-icon{
    position: absolute;
    display: block;
    left: .1rem;
    top: 50%;
    width: .26rem;
    height: .26rem;
    margin-top: -.13rem;
    font-size: 0;
  }
}
.active{
  transform: scale(.8) rotate(90deg);
}
</style>
