/**
 * Created by xiaer on 2018/9/10.
 */

const INDEX_MENU = [
  {
    "id": 1,
    "name": "美食",
    "count": 3891,
    "image": "/static/menu/1.webp",
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 1288,
        "id": 11
      },
      {
        "name": "地方菜系",
        "image": "/static/menu/sub/1.webp",
        "count": 813,
        "id": 2
      },
      {
        "name": "汉堡披萨",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      },
      {
        "name": "香锅冒菜",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  },
  {
    "name": "商超便利",
    "image": "/static/menu/2.webp",
    "catalogId": 2,
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 1
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 2
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  },
  {
    "name": "午餐",
    "image": "/static/menu/3.webp",
    "catalogId": 3,
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 1
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 2
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  },
  {
    "name": "水果",
    "image": "/static/menu/4.webp",
    "catalogId": 4,
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 1
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 2
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  },
  {
    "name": "医药健康",
    "image": "/static/menu/5.webp",
    "catalogId": 5,
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 1
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 2
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  },
  {
    "name": "浪漫鲜花",
    "image": "/static/menu/6.webp",
    "catalogId": 6,
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 1
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 2
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  },
  {
    "name": "厨房生鲜",
    "image": "/static/menu/7.webp",
    "catalogId": 7,
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 1
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 2
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  },
  {
    "name": "跑腿代购",
    "image": "/static/menu/8.webp",
    "catalogId": 8,
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 1
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 2
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  },
  {
    "name": "地方小吃",
    "image": "/static/menu/9.webp",
    "catalogId": 9,
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 1
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 2
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  },
  {
    "name": "麻辣烫",
    "image": "/static/menu/10.webp",
    "catalogId": 10,
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 1
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 2
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  },
  {
    "name": "地方菜系",
    "image": "/static/menu/11.webp",
    "catalogId": 11,
    "childMenu": [
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 1
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 2
      },
      {
        "name": "简餐便当",
        "image": "/static/menu/sub/1.webp",
        "count": 11,
        "id": 3
      }
    ]
  }
]

export default {
  menu (req, res) {
    res.json()
  }
}
