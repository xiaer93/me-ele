/**
 * Created by xiaer on 2018/9/3.
 */
import axios from 'axios'
import {searchOption, hotWordOption} from 'api/config'

export default {
  search (options) {
    return new Promise((resolve, reject) => {
      let params = Object.assign({}, searchOption, options)
      axios.get('/search', {params})
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.statusText)
          }
        })
    })
  },
  hotWord (options) {
    return new Promise((resolve, reject) => {
      let params = Object.assign({}, hotWordOption, options)
      axios.get('/hotWord', {params})
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
