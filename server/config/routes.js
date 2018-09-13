/**
 * Created by xiaer on 2018/9/10.
 */
const express = require('express')
const Router = express.Router()
const home = require('../control/home')
const location = require('../control/location')

Router.get('/', function (req, res) {
  res.json({status: 'ok'})
})

// home
Router.get('/home/menuList', home.menu)

// location
Router.get('/location/getCityList', location.getCityList)
Router.get('/location/getAddress', location.getAddress)
Router.get('/location/searchAddress', location.searchAddress)

module.exports = function (app) {
  // 使用路由中间件
  app.use('/api', Router)
}
