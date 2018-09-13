/**
 * Created by xiaer on 2018/9/10.
 */
const Model = require('../model')

module.exports = {
  location: function (req, res) {

  },
  // 根据经纬度，推荐对应的菜单~
  menu: function (req, res) {
    let {longitude, latitude} = req.query
    Model.Enters.find({}, function (err, doc) {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          result: ''
        })
      }

      // fixme: 在mongoose中查找失败，只有在此处进行过滤了~
      let filterDoc = doc.filter(t => {
        return longitude > t.valid.longitude[0] || longitude < t.valid.longitude[1]
      })
      res.json({
        code: 0,
        msg: '',
        result: {
          menuList: filterDoc
        }
      })
    })
  }
}
