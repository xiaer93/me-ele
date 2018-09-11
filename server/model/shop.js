/**
 * Created by xiaer on 2018/9/10.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

let shopSchema = new Schema({
  // 店名
  shopName: {
    type: String,
    default: ''
  },
  // 描述
  shopDesc: {
    type: String,
    default: ''
  },
  // 大图
  shopHomeBg: {
    type: String,
    default: ''
  },
  // 小图
  shopAvatar: {
    type: String,
    default: ''
  },
  // 公告
  shopNotice: {
    type: String,
    default: ''
  },
  // 折扣信息
  shopDiscount: [
    {
      // 折扣形式
      id: {
        type: Number,
        default: 0
      },
      // 折扣名称
      name: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      // 折扣计算公式
      rules: {
        fee: {
          type: Number,
          default: 0
        },
        price: {
          type: Number,
          default: 0
        },
        name: {
          type: String,
          default: ''
        }
      }
    }
  ],
  // 店铺分类
  shopCatalog: [
    {
      id: {
        type: Number,
        defalut: 0
      },
      name: {
        type: String,
        default: ''
      }
    }
  ],
  // 店铺信息
  shopInfos: {
    tel: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: '110'
    },
    // 坐标
    location: {
      lat: {
        type: Number,
        default: 0
      },
      long: {
        type: Number,
        default: 0
      }
    }
  },
  // 推荐信息
  shopRecommend: {
    isRecommend: {
      type: Boolean,
      defalut: false
    },
    isAd: {
      type: Boolean,
      default: false
    },
    reasonText: {
      type: String,
      default: ''
    }
  },
  // 店铺派送
  shopSend: {
    // 派送形式
    id: {
      type: Number,
      default: ''
    },
    // 派送名称
    name: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    textBg: {
      type: String,
      default: '#fff'
    },
    // 派送规则
    rules: {
      fee: {
        type: Number,
        default: 0
      },
      price: {
        type: Number,
        default: 0
      },
      name: {
        type: String,
        default: ''
      }
    }
  },
  // 店铺美食
  shopFoodList: [{
    type: ObjectId,
    default: null
  }],
  // 店铺评价
  shopComment: [{
    type: ObjectId,
    default: null
  }],
  // 店铺好评率
  shopRate: {
    type: Number,
    default: 0
  },
  // 店铺订单
  shopOrder: [{
    type: ObjectId,
    default: null
  }],
  // 配送时间
  orderLeadTime: {
    type: Number,
    default: 0
  },
  // 品牌联盟
  isBrand: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('shop', shopSchema)
