/**
 * Created by xiaer on 2018/9/3.
 */
import axios from 'axios'
import {searchOption} from 'api/config'

export default {
  search (options) {
    return new Promise((resolve, reject) => {
      let params = Object.assign({}, searchOption, options)
      axios.get('/search', params)
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
