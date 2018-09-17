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
import profileApi from 'api/profile'
import {mapMutations} from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapMutations({
      setUsers: 'SET_USERS'
    })
  },
  created () {
    profileApi.checkLogin()
      .then(res => {
        if (res.code === 0) {
          this.setUsers(res.result.user || {})
        }
      })
  },
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
