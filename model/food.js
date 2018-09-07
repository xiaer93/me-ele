/**
 * Created by xiaer on 2018/9/7.
 */
// food的schema
export default {
  foodName: {
    type: String,
    default: ''
  },
  foodDesc: {
    type: String,
    default: ''
  },
  foodAvatar: {
    type: String,
    default: ''
  },
  foodMounthCount: {
    type: Number,
    default: 0
  },
  foodCount: {
    type: Number,
    defalut: 0
  },
  foodPrice: {
    type: Number,
    default: 0
  },
  // 好评率
  foodRate: {
    type: Number,
    default: 0
  },
  // 美食打折
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
  // 美食分类
  foodCatalog: [
    {
      catalogId: {
        type: Number,
        default: 0
      },
      catalogName: {
        type: String,
        default: ''
      }
    }
  ],
  // 所属店铺
  foodShop: {
    type: Object,
    default: {}
  },
  // 店铺推荐
  isRecommend: {
    type: Boolean,
    defalut: false
  }
}
