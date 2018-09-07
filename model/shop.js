/**
 * Created by xiaer on 2018/9/7.
 */
// 商家schema
export default {
  shopName: {
    type: String,
    default: ''
  },
  shopDesc: {
    type: String,
    default: ''
  },
  shopBg: {
    type: String,
    default: ''
  },
  shopAvatar: {
    type: String,
    default: ''
  },
  shopNotice: {
    type: String,
    default: ''
  },
  shopDiscount: [
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
  shopCatalog: [
    {
      // 大分类
      id: {
        type: Number,
        defalut: 0
      },
      name: {
        type: String,
        default: ''
      },
      // 大分类中的小分类
      children: [
        {
          id: {
            type: Number,
            default: 0
          }
        }
      ]
    }
  ],
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
      lat: 110,
      long: 110
    }
  },
  shopSend: {
    id: {
      type: Number,
      default: ''
    },
    text: {
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
    rules: {
      id: {
        type: Number,
        default: 0
      },
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
  shopFoodList: {
    type: Arrary,
    default: []
  },
  shopComment: {
    type: Arrary,
    default: []
  },
  shopRate: {
    type: Number,
    default: 0
  },
  shopRateCount: {
    type: Number,
    default: 0
  },
  recentOrderNum: {
    type: Number,
    default: 0
  },
  orderLeadTime: {
    type: Number,
    default: 0
  },
  isBrand: {
    type: Boolean,
    default: false
  }
}
