/**
 * Created by xiaer on 2018/9/10.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
    default: Math.random().toString(16).substr(2, 10)
  },
  tel: {
    type: String,
    format: 'tel',
    required: true
  },
  avatar: {
    type: String,
    default: '/static/users/user-1.webp'
  },
  address: [
    {
      firstName: {
        type: String
      },
      sex: {
        type: String,
        enum: ['man', 'woman']
      },
      tel: {
        type: String
      },
      tag: {
        type: String
      },
      addressText: {
        type: String
      }
    }
  ]
})

module.exports = mongoose.model('user', userSchema)
