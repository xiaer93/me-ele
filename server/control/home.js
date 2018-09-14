/**
 * Created by xiaer on 2018/9/10.
 */
const Model = require('../model')



module.exports = {
  location: function (req, res) {
    Model.Shops.find({}, function (e,d) {
      d.forEach(t=>{
        t.rate = t.rate.toFixed(1)
        t.save()
      })
    })
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
