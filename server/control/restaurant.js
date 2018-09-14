/**
 * Created by xiaer on 2018/9/14.
 */
const Model = require('../model')

module.exports = {
  search (req, res) {
    let {latitude, longitude, offset, limit, keyword} = req.query
    offset = Number.parseInt(offset)
    limit = Number.parseInt(limit)
    // 店铺搜索只分3种，1为home页，2为目录页，3为search页。（其余各种排序暂时不进行处理）
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
}
