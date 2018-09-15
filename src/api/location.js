/**
 * Created by xiaer on 2018/9/13.
 */
import axios from 'axios'

const locationApi = {
  getCityList () {
    return new Promise((resolve, reject) => {
      axios.get('/api/location/getCityList')
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  searchAddress (params) {
    return new Promise((resolve, reject) => {
      axios.get('/api/location/searchAddress', {params})
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

export default locationApi
