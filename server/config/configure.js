/**
 * Created by xiaer on 2018/9/10.
 */
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverrid = require('method-override')
const routes = require('./routes')

module.exports = function (app) {
  // 错误日志？
  app.use(morgan('dev'))
  // formate
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  // cookie
  app.use(cookieParser())
  // 降级支持restAPI
  app.use(methodOverrid())

  routes(app)
}
