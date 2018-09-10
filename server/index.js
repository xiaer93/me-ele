/**
 * Created by xiaer on 2018/9/7.
 */
const express = require('express')
const config = require('./config/configure')
const mongodb = require('mongodb')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/eleme')
mongoose.connection.on('open', function () {
  console.log('连接数据库成功~')
})

const app = express()
config(app)

app.listen(3000, function () {
  console.log('RestAPI接口：http://localhost:3000')
})
