/**
 * Created by xiaer on 2018/9/10.
 */
import axios from 'axios'

// RestAPI接口规范？
export default {
  getAddress () {
    return new Promise((resolve, reject) => {
      axios.get('/profile/address')
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
      axios.put('/profile/address', {address})
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
      axios.delete('/profile/address', {address})
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
