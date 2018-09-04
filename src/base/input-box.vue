<template>
  <div class="input">
    <input type="search"
       class="input-text"
       :placeholder="placeholder"
           v-bind:value="value"
           v-on="inputListeners"
    >
    <span class="input-close"></span>
  </div>
</template>

<script type="text/ecmascript-6">
import {debounce} from 'common/js/util'

export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    // 透明input，此处必须为value
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    inputListeners: function () {
      let self = this
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          self.$emit('input', event.target.value)
        },
        change: debounce(20, (event) => {
          self.$emit('change', event.target.value)
        })
      })
    }
  },
  crated () {

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
    width: 100%;
    height: 100%;
    line-height: inherit;
    font: inherit;
    background-color: transparent;
  }
  &-close{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: .5rem;
    background-color: red;
  }
}
</style>
