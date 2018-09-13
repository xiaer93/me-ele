/**
 * Created by xiaer on 2018/9/13.
 */
const Model = require('../model')

module.exports = {
  getCityList () {
  return new Promise((resolve, reject) => {
    axios.get('/home/cityList')
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res.statusText)
        }
      })
  })
},
  getAddress: function (req, res) {
    let {latitude, longitude} = req.query
    res.json({
      code: 0,
      msg: '',
      result: {
        address: `武汉-${latitude}:${longitude}`
      }
    })
  },
  searchAddress: function (req, res) {
    let {latitude, longitude, keyword, offset, limit} = req.query
    let retData = new Array(limit).map((t, i) => {
      return {
        address: latitude ? `${keyword}(${latitude}, ${longitude})-${offset * limit + i}` : `${keyword}-${offset * limit + i}`,
        latitude: 0,
        longitude: 0,
        city: '武汉',
        bus: '520路'
      }
    })

    res.json({
      code: 0,
      msg: '',
      result: {
        addressList: retData
      }
    })
  }
}
