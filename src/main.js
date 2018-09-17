import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
import 'common/js/rem'

import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'
import * as $ from 'jquery'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'common/less/index.less'
import 'common/less/swiper-4.3.5.min.css'

Vue.config.productionTip = false

Vue.use(VueLazyLoad)
Vue.use(VueAwesomeSwiper)

$(function () {
  FastClick.attach(document.body)
})

// 全局路由拦截
router.beforeEach((to, from, next) => {
  if (store.state && !store.state.userInfo.tel) {
    let exclude = ['/profile/info', '/profile/infouser', '/profile/infouser', '/profile/infobind', '/profile/infopwd']
    let toPath = to.fullPath

    if (exclude.indexOf(toPath) !== -1) {
      next({name: 'Login'})
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
