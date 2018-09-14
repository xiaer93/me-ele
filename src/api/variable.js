/**
 * Created by xiaer on 2018/9/4.
 */
/* 排序规则 */

// 综合排序
export const CONFIG_SORT = [
  {
    name: '综合排序',
    id: 1
  },
  {
    name: '好评优先',
    id: 2
  },
  {
    name: '销量最高',
    id: 3
  },
  {
    name: '起送价最低',
    id: 4
  },
  {
    name: '配送最快',
    id: 5
  },
  {
    name: '配送费最低',
    id: 6
  },
  {
    name: '人均从低到高',
    id: 7
  },
  {
    name: '人均从高到低',
    id: 8
  },
  {
    name: '距离最近',
    id: 9,
    isOuter: true
  },
  {
    name: '品质联盟',
    id: 10,
    isOuter: true
  }

]

// 筛选
export const CONFIG_FILTER = {
  shopServer: [
    {
      name: '蜂鸟快送',
      avatar: '/static/shopServer/1.webp',
      id: 1
    },
    {
      name: '品牌商家',
      avatar: '/static/shopServer/2.webp',
      id: 2
    },
    {
      name: '食安宝',
      avatar: '/static/shopServer/3.webp',
      id: 3
    },
    {
      name: '新店',
      avatar: '/static/shopServer/4.webp',
      id: 4
    },
    {
      name: '开发票',
      avatar: '/static/shopServer/5.webp',
      id: 5
    }
  ],
  saleActivity: [
    {
      name: '新用户优惠',
      id: 1
    },
    {
      name: '特价商品',
      id: 2
    },
    {
      name: '下单立减',
      id: 3
    },
    {
      name: '赠品优惠',
      id: 4
    },
    {
      name: '下单返红包',
      id: 5
    },
    {
      name: '进店领红包',
      id: 6
    }
  ],
  saleAverage: [
    {
      name: '￥20以下',
      cost_from: 0,
      cost_to: 20,
      id: 1
    },
    {
      name: '￥20 - ￥40',
      cost_from: 20,
      cost_to: 40,
      id: 2
    },
    {
      name: '￥40 - ￥60',
      cost_from: 40,
      cost_to: 60,
      id: 3
    },
    {
      name: '￥60 - ￥80',
      cost_from: 60,
      cost_to: 80,
      id: 4
    },
    {
      name: '￥80 - ￥100',
      cost_from: 80,
      cost_to: 100,
      id: 5
    },
    {
      name: '￥100以上',
      cost_from: 100,
      cost_to: 999,
      id: 6
    }
  ]
}
