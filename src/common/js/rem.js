/**
 * Created by xiaer on 2018/9/2.
 */
(function (doc, win) {
  let docEle = document.documentElement
  let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recal = function () {
    let clientWidth = docEle.clientWidth
    if (!clientWidth) {
      return
    }
    docEle.style.fontSize = 100 * (clientWidth / 750) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvent, recal, false)
  doc.addEventListener('DOMContentLoaded', recal, false)
})(document, window)
