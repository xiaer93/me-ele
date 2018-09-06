import Vue from 'vue'
import Router from 'vue-router'
import Discover from 'components/discover/discover'
import Home from 'components/home/home'
import Order from 'components/order/order'
import Profile from 'components/profile/profile'
import Search from 'components/search/search'
import Catalog from 'components/catalog/catalog'
import Restaurant from 'components/restaurant/restaurant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/catalog/:id',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/restaurant',
      name: 'Restaurant',
      component: Restaurant
    }
  ]
})
