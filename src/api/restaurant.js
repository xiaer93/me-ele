/**
 * Created by xiaer on 2018/9/6.
 */
import axios from 'axios'

export default {
  hotWord (params) {
    return new Promise((resolve, reject) => {
      axios.get('/api/restaurant/hotWord', {params})
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  search (params) {
    return new Promise((resolve, reject) => {
      axios.get('/api/restaurant/search', {params})
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  getFood (params) {
    return new Promise((resolve, reject) => {
      axios.get('/api/restaurant/getFood', {params})
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
