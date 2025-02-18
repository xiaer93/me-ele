/**
 * Created by xiaer on 2018/9/10.
 */
const Model = require('../model')

const enterData = [
  {
    "id": 2000,
    "name": "美食",
    "image": "/static/menu/1.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2001,
    "name": "商超便利",
    "image": "/static/menu/2.webp",
    "factors": [
      {
        "name": "超市",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "便利店",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "饮用水",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "啤酒",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "牛奶",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "冰品",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2002,
    "name": "午餐",
    "image": "/static/menu/3.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2003,
    "name": "水果",
    "image": "/static/menu/4.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2004,
    "name": "医药健康",
    "image": "/static/menu/5.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2005,
    "name": "浪漫鲜花",
    "image": "/static/menu/6.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2006,
    "name": "厨房生鲜",
    "image": "/static/menu/7.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2007,
    "name": "跑腿代购",
    "image": "/static/menu/8.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2008,
    "name": "地方小吃",
    "image": "/static/menu/9.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2009,
    "name": "麻辣烫",
    "image": "/static/menu/10.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2010,
    "name": "地方菜系",
    "image": "/static/menu/11.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  },
  {
    "id": 2011,
    "name": "特色栏目",
    "image": "/static/menu/1.webp",
    "factors": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "小吃炸串",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "面食粥点",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "轻食西餐",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      },
      {
        "name": "日韩料理",
        "image": "/static/menu/sub/1.webp",
        "restaurant_category_ids": [210]
      }
    ],
    "valid": {
      latitude: [-90, 90],
      longitude: [-90, 90]
    }
  }
]
const shopData = {
  "shopName": "福建沙县小车（光明南店）",
  "shopDesc": "",
  "shopHomeBg": "/static/restaurant/shop-bg.webp",
  "shopAvatar": "/static/restaurant/shop-avatar.webp",
  "shopNotice": "公告：温馨提示：9：00—17：00期间闭店状态可以下预订单！所有菜品不包含米饭，米饭需单点。不单独提供餐具，餐具只包含筷子和勺子，谢谢！",
  "shopDiscount": [
    {
      "id": 1,
      "name": "首",
      "desc": "新用户下单立减10元",
      "rules": {
        "fee": 0,
        "price": 10
      }
    },
    {
      "id": 2,
      "name": "减",
      "desc": "满20减3，满30减5，满50减8",
      "rules": {
        "fee": 50,
        "price": 8
      }
    }
  ],
  "shopCatalog": [
    {
      "id": 213,
      "name": "米粉面馆"
    },
    {
      "id": 237,
      "name": "地方小吃"
    }
  ],
  "shopInfos": {
    "tel": "111",
    "address": "海南省万宁市光明南路东侧189号"
  },
  "shopRecommend": {
    "isRecommend": false,
    "isAd": false,
    "reasonText": ""
  },
  "shopSend": {
    "id": 1,
    "text": "蜂鸟配送",
    "textColor": "#fff",
    "textBg": "#00AAFF",
    "rules": {
      "fee": 3,
      "price": 15,
      "name": "配送费¥3"
    }
  },
  "shopFoodList": [],
  "shopComment": [],
  "shopRate": 4.8,
  "shopOrder": [],
  "orderLeadTime": 27,
  "isBrand": true
}

module.exports = {
  location: function (req, res) {

  },
  // 根据经纬度，推荐对应的菜单~
  menu: function (req, res) {

  }
}
