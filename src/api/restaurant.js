/**
 * Created by xiaer on 2018/9/6.
 */
import axios from 'axios'

export default {
  getRecommendFood () {
    return new Promise((resolve, reject) => {
      axios.get('/shop/getRecommendFood')
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
  }
}
