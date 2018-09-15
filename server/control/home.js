/**
 * Created by xiaer on 2018/9/10.
 */
const Model = require('../model')

const u = {
  "avatar": "/static/user-avatar.png",
  "name": "7c93454dfa2",
  "tel": "11111111111",
  "address": [
    {
      "firstName": "程",
      "sex": "man",
      "tel": "11111111111",
      "tag": "家",
      "addressText": "武汉市人民政府武汉市人民政府"
    }
  ]
}

module.exports = {
  location: function (req, res) {
    let a = new Model.User(u)
    a.save()
    res.send('1')
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
        let {longitude: longitudeStr, latitude: latitudeStr} = t.validCoords
        let longitudeArray = longitudeStr.split(',')
        let latitudeArray = longitudeStr.split(',')

        return longitude > longitudeArray[0] && longitude < longitudeArray[1]
      })
      res.json({
        code: 0,
        msg: '',
        result: {
          menuList: filterDoc
        }
      })
    })
  },
  // 根据经纬度，推荐对应的广告
  banner: function (req, res) {
    let {longitude, latitude} = req.query
    Model.Banner.find({}, function (err, doc) {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          result: ''
        })
      }
      let filterDoc = doc.filter(t => {
        let {longitude: longitudeStr, latitude: latitudeStr} = t.validCoords
        let longitudeArray = longitudeStr.split(',')
        let latitudeArray = longitudeStr.split(',')

        return longitude > longitudeArray[0] && longitude < longitudeArray[1]
      })
      res.json({
        code: 0,
        msg: '',
        result: {
          bannerList: filterDoc
        }
      })
    })
  }
}
