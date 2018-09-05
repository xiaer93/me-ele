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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
