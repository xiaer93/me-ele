/**
 * Created by xiaer on 2018/9/2.
 */
import axios from 'axios'

const homeApi = {
  getMenuList (params) {
    return new Promise((resolve, reject) => {
      axios.get('api/home/menuList', {params})
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            console.log(res.statusText)
          }
        })
    })
  },
  getBannerList (params) {
    return new Promise((resolve, reject) => {
      axios.get('/home/bannerList', {params})
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            console.log(res.statusText)
          }
        })
    })
  }
}

export default homeApi
