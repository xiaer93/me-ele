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
function onScroll (ele) {
  let scrollFunc = []

  // 在ele上绑定scroll、touchmove等事件。ele即滚动元素的父容器，子元素滚song
  $(ele).on('scroll', function () {
    let eleScroll = $(this).scrollTop()
    for (let i = 0; i < scrollFunc.length; ++i) {
      scrollFunc[i](eleScroll)
    }
  })

  return {
    add (callback) {
      scrollFunc.push(callback)
      return this
    },
    delete (callback) {
      let index = scrollFunc.findIndex(t => {
        return t === callback
      })
      index !== -1 && scrollFunc.splice(index, 1)
      return this
    },
    clear () {
      scrollFunc.length = 0
      return this
    }
  }
}

/**
 * 获取定位信息
 */
function getPosition () {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let {latitude, longitude} = position.coords
        resolve({latitude, longitude})
      }, function () {
        reject(new Error('获取地理位置失败'))
      })
    } else {
      reject(new Error('不支持html5地理位置服务'))
    }
  })
}
/**
 * 获取定位的地址
 * @param position
 */
function getAddress (position) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('武汉市光谷步行街')
    })
  })
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
  countDown,
  getPosition,
  getAddress
}
