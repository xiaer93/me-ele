import Vue from 'vue'
import Router from 'vue-router'
import Discover from 'components/discover/discover'
import Home from 'components/home/home'
import Order from 'components/order/order'
import Profile from 'components/profile/profile'
import Search from 'components/search/search'
import Catalog from 'components/catalog/catalog'
import Restaurant from 'components/restaurant/restaurant'
import Login from 'components/login/login'
import About from 'components/about/about'
import Address from 'components/address/address'
import AddressEdit from 'components/address/address-edit'
import Info from 'components/info/info'
import InfoPassword from 'components/info/info-password'
import InfoUsername from 'components/info/info-username'
import InfoRebind from 'components/info/info-rebind'
import Location from 'components/location/location'
import Cart from 'components/cart/cart'

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
      component: Home,
      children: [
        {
          path: 'location',
          name: 'Location',
          component: Location
        }
      ]
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
      component: Profile,
      children: [
        {
          path: 'address',
          component: Address,
          children: [
            {
              path: ':control',
              component: AddressEdit
            }
          ]
        },
        {
          path: 'info',
          name: 'Info',
          component: Info
        },
        {
          path: 'infopwd',
          name: 'InfoPassword',
          component: InfoPassword
        },
        {
          path: 'infouser',
          name: 'InfoUsername',
          component: InfoUsername
        },
        {
          path: 'infobind',
          name: 'InfoRebind',
          component: InfoRebind
        }
      ]
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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
