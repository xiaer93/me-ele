/**
 * Created by xiaer on 2018/9/2.
 */
import axios from 'axios'

const homeApi = {
  getMenuList () {
    return new Promise((resolve, reject) => {
      axios.get('/home/menuList')
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            console.log(res.statusText)
          }
        })
    })
  },
  getBannerList () {
    return new Promise((resolve, reject) => {
      axios.get('/home/bannerList')
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            console.log(res.statusText)
          }
        })
    })
  },
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
  }
}

export default homeApi
