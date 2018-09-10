/**
 * Created by xiaer on 2018/9/10.
 */
const express = require('express')
const Router = express.Router()

Router.get('/', function (req, res) {
  res.json({status: 'ok'})
})

// home
Router.get('/menu', home.menu)

module.exports = function (app) {
  // 使用路由中间件
  app.use('/api', Router)
}
