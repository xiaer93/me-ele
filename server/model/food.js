/**
 * Created by xiaer on 2018/9/10.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

let foodSchema = new Schema({
  // 名称
  foodName: {
    type: String,
    default: ''
  },
  // 描述
  foodDesc: {
    type: String,
    default: ''
  },
  // 图像
  foodAvatar: {
    type: String,
    default: ''
  },
  // 月销量
  foodMounthCount: {
    type: Number,
    default: 0
  },
  // 总销量
  foodTotalCount: {
    type: Number,
    defalut: 0
  },
  // 价格
  foodPrice: {
    type: Number,
    default: 0
  },
  // 好评率
  foodRate: {
    type: Number,
    default: 0
  },
  // 打折
  foodDiscount: [
    {
      discountId: {
        type: Number,
        default: 0
      },
      discountName: {
        type: String,
        default: ''
      }
    }
  ],
  // 店铺
  foodShop: {
    type: ObjectId,
    default: null
  }
})

module.exports = mongoose.model('food', foodSchema)
