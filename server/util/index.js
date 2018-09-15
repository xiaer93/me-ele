/**
 * Created by xiaer on 2018/9/15.
 */
function deepCopy (obj) {
  return _inner(obj)

  function _inner (item) {
    if (typeof item !== 'object') {
      return item
    }

    if (item instanceof Array) {
      item = item.map(t => _inner(t))
    } else {
      Object.keys(item).forEach(k => {
        item[k] = _inner(item[k])
      })
    }

    return item
  }
}

module.exports = {
  deepCopy
}
