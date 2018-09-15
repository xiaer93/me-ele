/**
 * Created by xiaer on 2018/9/10.
 */
const express = require('express')
const Router = express.Router()
const home = require('../control/home')
const location = require('../control/location')
const restaurant = require('../control/restaurant')

Router.get('/', function (req, res) {
  res.json({status: 'ok'})
})

// home
Router.get('/home/menuList', home.menu)
Router.get('/home/bannerList', home.banner)
Router.get('/home/location', home.location)

// location
Router.get('/location/getCityList', location.getCityList)
Router.get('/location/getAddress', location.getAddress)
Router.get('/location/searchAddress', location.searchAddress)

// restaurant
Router.get('/restaurant/search', restaurant.search)
Router.get('/restaurant/hotWord', restaurant.hotWord)
Router.get('/restaurant/getFood', restaurant.getFood)

module.exports = function (app) {
  // 使用路由中间件
  app.use('/api', Router)
}
