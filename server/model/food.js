/**
 * Created by xiaer on 2018/9/10.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

let foodSchema = new Schema({
  // 名称
  name: {
    type: String,
    default: ''
  },
  // 描述
  desc: {
    type: String,
    default: ''
  },
  // 图像
  avatar: {
    type: String,
    default: ''
  },
  // 月销量
  mounthCount: {
    type: Number,
    default: 0
  },
  // 总销量
  totalCount: {
    type: Number,
    defalut: 0
  },
  // 价格
  price: {
    type: Number,
    default: 0
  },
  // 好评率
  rate: {
    type: Number,
    default: 0
  },
  // 打折
  discount: [
    {
      id: {
        type: Number,
        default: 0
      },
      name: {
        type: String,
        default: ''
      }
    }
  ],
  // 店铺
  shop: {
    type: ObjectId,
    default: null
  },
  // 购物车数量
  number: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('food', foodSchema)
