/**
 * Created by xiaer on 2018/9/4.
 */
import * as $ from 'jquery'

/**
 * 防抖函数debounce
 * @param interval
 * @param callback
 * @returns {Function}
 */
function debounce (callback, interval = 20) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(function () {
      // eslint-disable-next-line
      callback(...args)
    }, interval)
  }
}

/**
 * 响应滚动事件
 */
let onScroll = (function () {
  let scrollFunc = []

  $(window).on('scroll', function () {
    let winScroll = $(window).scrollTop()
    for (let i = 0; i < scrollFunc.length; ++i) {
      scrollFunc[i](winScroll)
    }
  })

  return {
    add (callback) {
      scrollFunc.push(callback)
    },
    delete (callback) {
      let index = scrollFunc.findIndex(t => {
        return t === callback
      })
      index !== -1 && scrollFunc.splice(index, 1)
    },
    clear () {
      scrollFunc.length = 0
    }
  }
})()

/**
 * 存储数据至本地（fixme：兼容indexDB），以数组形式存储数据
 */
class SaveData {
  // key为key，id为数组比较标志
  constructor (key, id) {
    this._key = `__${key}__`
    this._id = id
  }

  /**
   * 返回所有数据
   * @returns {Array}
   */
  get () {
    let storage = localStorage.getItem(this._key)
    return storage ? JSON.parse(storage) : []
  }
  // 存储数据
  save (data) {
    let storage = this.get()
    data = data instanceof Array ? data : [data]
    data.forEach(d => {
      let index = storage.find(t => {
        return d[this._id] === t[this._id]
      })

      if (typeof index !== 'undefined') {
        storage.splice(index, 1)
      }
      storage.push(d)
    })

    localStorage.setItem(this._key, JSON.stringify(storage))
    return storage
  }
  // 删除数据
  delete (data) {
    let storage = this.get()

    let index = storage.findIndex(t => {
      return data[this._id] === t[this._id]
    })
    if (index !== -1) {
      storage.splice(index, 1)
      localStorage.setItem(this._key, JSON.stringify(storage))
    }

    return storage
  }
  // 清空数据
  clear () {
    localStorage.setItem(this._key, JSON.stringify([]))
    return []
  }
}

/**
 * 倒计时函数
 */
function countDown (duration, process, end) {
  function _inner () {
    process(duration)
    duration -= 1

    if (duration !== 0) {
      setTimeout(_inner, 1000)
    } else {
      end()
    }
  }

  setTimeout(_inner, 0)
}

export {
  debounce,
  onScroll,
  SaveData,
  countDown
}
