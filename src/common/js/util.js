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
function debounce (interval, callback) {
  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(function () {
      callback()
    }, interval)
  }
}

// 输出函数，响应scroll事件
let onScroll = (function () {
  let scrollFunc = []

  $(window).on('scroll', debounce(10, function () {
    let winScroll = $(window).scrollTop()
    for (let i = 0; i < scrollFunc.length; ++i) {
      scrollFunc[i](winScroll)
    }
  }))

  return function (callback) {
    scrollFunc.push(callback)
  }
})()

export {
  debounce,
  onScroll
}
