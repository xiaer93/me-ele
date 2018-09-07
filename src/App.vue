<template>
  <div id="app">
    <svg-ele></svg-ele>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import SvgEle from 'base/svg'

export default {
  name: 'App',
  components: {
    Tab,
    SvgEle
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
