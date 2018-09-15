/**
 * Created by xiaer on 2018/9/14.
 */
const Model = require('../model')
const deepCopy = require('../util').deepCopy

const hotWord = [
  {
    "is_highlight": 0,
    "search_word": "土豆泥",
    "type": 1,
    "url": ""
  },
  {
    "is_highlight": 0,
    "search_word": "烧烤",
    "type": 1,
    "url": ""
  },
  {
    "is_highlight": 0,
    "search_word": "沙县小吃",
    "type": 1,
    "url": ""
  },
  {
    "is_highlight": 0,
    "search_word": "粥",
    "type": 1,
    "url": ""
  },
  {
    "is_highlight": 0,
    "search_word": "重庆酸辣粉",
    "type": 1,
    "url": ""
  },
  {
    "is_highlight": 0,
    "search_word": "排骨汤",
    "type": 1,
    "url": ""
  },
  {
    "is_highlight": 0,
    "search_word": "桂林米粉",
    "type": 1,
    "url": ""
  },
  {
    "is_highlight": 0,
    "search_word": "煲仔饭",
    "type": 1,
    "url": ""
  }
]

module.exports = {
  hotWord (req, res) {
    let {latitude, longitude} = req.query
    res.json({
      code: 0,
      msg: '',
      result: {
        hotWord
      }
    })
  },
  search (req, res) {
    let {latitude, longitude, offset, limit, keyword, catalogId} = req.query
    offset = Number.parseInt(offset)
    limit = Number.parseInt(limit)
    catalogId = catalogId && catalogId.map(t => Number.parseInt(t))
    console.log(keyword)
    // 店铺搜索只分3种，1为home页，2为目录页，3为search页。（其余各种排序暂时不进行处理）
    if (catalogId && catalogId.length) {
      // 目录页
      Model.Shops.find({catalog: {$elemMatch: {id: {$in: catalogId}}}})
        .skip(offset * limit)
        .limit(limit)
        .exec(function (err, doc) {
          if (err) {
            res.json({
              code: 1,
              msg: err.message,
              result: ''
            })
          }

          let docLen = doc.length
          doc.forEach(t => {
            t.distance = Math.floor(Math.random() * 29) + 1
            // 月售以该餐厅第一道美食为准
            // find返回为数组对象
            Model.Foods.find({_id: t.foodList[0].foods[0]}, function (err, food) {
              t.recentOrderNum = food[0].mounthCount

              docLen -= 1
              if (docLen === 0) {
                res.json({
                  code: 0,
                  msg: '',
                  result: {
                    searchList: doc
                  }
                })
              }
            })
          })
        })
    } else if (typeof keyword !== 'undefined') {
      // 搜索页
      Model.Shops.find({name: new RegExp(keyword, 'i')})
        .skip(offset * limit)
        .limit(limit)
        .exec(function (err, doc) {
          if (err) {
            res.json({
              code: 1,
              msg: err.message,
              result: ''
            })
          }

          res.json({
            code: 0,
            msg: '',
            result: {
              searchList: doc
            }
          })
        })

    } else {
      // home页返回商家数据
      Model.Shops.find({})
        .skip(offset * limit)
        .limit(limit)
        .exec(function (err, doc) {
          if (err) {
            res.json({
              code: 1,
              msg: err.message,
              result: ''
            })
          }

          let docLen = doc.length
          doc.forEach(t => {
            t.distance = Math.floor(Math.random() * 29) + 1
            // 月售以该餐厅第一道美食为准
            // find返回为数组对象
            Model.Foods.find({_id: t.foodList[0].foods[0]}, function (err, food) {
              t.recentOrderNum = food[0].mounthCount

              docLen -= 1
              if (docLen === 0) {
                res.json({
                  code: 0,
                  msg: '',
                  result: {
                    searchList: doc
                  }
                })
              }
            })
          })
        })
    }
  },
  getFood (req, res) {
    let {_id} = req.query
    Model.Shops.find({_id}, function (err, doc) {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          result: ''
        })
      }

      // ObjectId不适合深度拷贝，修改后不保存同样用
      let docFood = doc[0].foodList
      let countFood = 0

      for(let i = 0; i < docFood.length; ++i) {
        countFood += docFood[i].foods.length
        for (let j = 0; j < docFood[i].foods.length; ++j) {
          Model.Foods.find({_id: docFood[i].foods[j]}, function (err2, food) {
            if (err2) {
              res.json({
                code: 1,
                msg: err.message,
                result: ''
              })
            }

            docFood[i].foods[j] = food[0]
            countFood -= 1
            if(countFood === 0) {
              res.json({
                code: 0,
                msg: '',
                result: {
                  restaurant: doc[0]
                }
              })
            }
          })
        }
      }
    })
  }
}
