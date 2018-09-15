/**
 * Created by xiaer on 2018/9/10.
 */
const Model = require('../model')

const loginQr = {}

module.exports = {
  // fixme: 登陆后下发cookie，如何确保用户信息安全？避免前端攻击
  login (req, res) {
    let {tel, qrCode} = req.body
    if (loginQr[tel] === qrCode) {
      Model.User.find({tel}, function (err, doc) {
        if (err) {
          let newUser = new Model.User({tel})
          newUser.save(function (err2) {
            // 下发cookie，记录cookie
            res.cookie('userTel', doc.tel, {
              path: '/',
              maxAge: 1000 * 60 * 60
            })
            res.json({
              code: 0,
              msg: '',
              result: {
                user: newUser
              }
            })
          })
        }

        // 下发cookie，记录cookie
        res.cookie('userTel', doc[0].tel, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.json({
          code: 0,
          msg: '',
          result: {
            user: doc[0]
          }
        })
      })
    } else {
      res.json({
        code: 1,
        msg: '验证码错误',
        result: ''
      })
    }
  },
  logout (req, res) {
    res.cookie('userTel', '', {
      path: '/',
      maxAge: -1
    })
    res.json({
      code: 0,
      msg:'',
      result: ''
    })
  },
  checkLogin (req, res) {
    let tel = req.cookies.userTel
    Model.User.find({tel}, function (err, doc) {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          result: ''
        })
      } else {
        res.json({
          code: 0,
          msg:'',
          result: {
            user: doc[0]
          }
        })
      }
    })
  },
  // 发送二维码
  getCode (req, res) {
    let {tel} = req.query
    let qrCode = Math.random().toString(16).substr(2, 6)
    loginQr[tel] = qrCode
    res.json({
      code: 0,
      msg: '',
      result: {
        qrCode
      }
    })
  },
  // 获取地址
  getAddress (req, res) {

  },
  // 添加收获地址
  addAddress (req, res) {

  },
  // 删除地址
  deleteAddress (req, res) {

  },
  // 编辑地址
  editAddress (req, res) {

  }
}
