/**
 * Created by xiaer on 2018/9/14.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let adSchema = new Schema({
  id: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  },
  validCoords: {
    longitude: {
      type: String,
      default: '-90,90'
    },
    latitude: {
      type: String,
      default: '-90,90'
    }
  }
})

module.exports = mongoose.model('ad', adSchema)
