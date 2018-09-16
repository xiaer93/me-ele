/**
 * Created by xiaer on 2018/9/10.
 */
import axios from 'axios'

// RestAPI接口规范？
export default {
  // post登录
  login (data) {
    return new Promise((resolve, reject) => {
      axios.post('/api/user/login', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  checkLogin () {
    return new Promise((resolve, reject) => {
      axios.post('/api/user/checkLogin')
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  logout () {
    return new Promise((resolve, reject) => {
      axios.post('/api/user/logout')
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  getCode () {
    return new Promise((resolve, reject) => {
      axios.get('/api/user/getCode')
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  getUser () {
    return new Promise((resolve, reject) => {
      axios.get('/api/user/getUser')
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  getAddress () {
    return new Promise((resolve, reject) => {
      axios.get('/api/profile/address')
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  changeAddress (address) {
    return new Promise((resolve, reject) => {
      axios.put('/api/profile/address', {address})
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  deleteAddress (address) {
    return new Promise((resolve, reject) => {
      axios.delete('/api/profile/address', {address})
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  }
}
