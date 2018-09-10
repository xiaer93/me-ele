/**
 * Created by xiaer on 2018/9/10.
 */
// 储存数据
class SaveData {
  constructor (key) {
    this._key = `__${key}__`
  }
  get () {
    return JSON.parse(localStorage.getItem(this._key))
  }
  clear () {
    return localStorage.setItem(this._key, '')
  }
  save (data) {
    throw new Error('虚函数必须重定义')
  }
  delete (data) {
    throw new Error('虚函数必须重定义')
  }
}

class SaveDataByArray extends SaveData {
  constructor (key, options) {
    super(key)
    this._unique = options.unique
    this._uniqueId = options.uniqueId || '_id'
  }
  save (data) {
    let storage = this.get() || []

    if (this._unique) {
      this._delete(storage, data)
      storage.push(data)
    } else {
      storage.push(data)
    }

    localStorage.setItem(this._key, storage)
    return storage
  }
  delete (data) {
    let storage = this.get() || []
    this._delete(storage, data)
    localStorage.setItem(this._key, storage)
  }
  _delete (array, data) {
    let _index = undefined

    if (data instanceof Object) {
      _index = array.findIndex(t => {
        return data[this._uniqueId] === t[this._uniqueId]
      })
    } else {
      _index = array.findIndex(t => {
        return data === t
      })
    }

    _index && array.splice(_index)
  }
}
