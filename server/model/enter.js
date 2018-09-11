/**
 * Created by xiaer on 2018/9/11.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let enterSchema = {
  // 通过此id获取到子菜单
  id: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  // 子菜单
  factors: [
    {
      name: {
        type: String,
        default: ''
      },
      image: {
        type: String,
        default: ''
      },
      restaurant_category_ids: [
        {
          type: Number,
          default: 0
        }
      ]
    }
  ],
  // 当前经纬度是否推荐？
  valid: {
    latitude: [
      {
        type: Number,
        default: 0
      }
    ],
    longitude: [
      {
        type: Number,
        default: 0
      }
    ]
  }
}

module.exports = mongoose.model('enter', enterSchema)
