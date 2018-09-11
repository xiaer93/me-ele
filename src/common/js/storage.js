/**
 * Created by xiaer on 2018/9/11.
 */

/**
 * 存储数据至本地（fixme：兼容indexDB），以数组形式存储数据
 */
// 储存数据
class SaveData {
  constructor (key) {
    this._key = `__${key}__`
  }
  get () {
    throw new Error('虚函数必须重定义')
  }
  save (data) {
    throw new Error('虚函数必须重定义')
  }
  delete (data) {
    throw new Error('虚函数必须重定义')
  }
  clear () {
    return localStorage.setItem(this._key, '')
  }
}

// 以数组结构存储数据
class SaveDataByArray extends SaveData {
  constructor (key, options) {
    super(key)
    this._unique = options.unique
    this._uniqueId = options.uniqueId || '_id'
  }
  get () {
    let _storage = localStorage.getItem(this._key)
    return _storage ? JSON.parse(_storage) : []
  }
  save (data) {
    let storage = this.get()

    if (this._unique) {
      this._delete(storage, data)
      storage.push(data)
    } else {
      storage.push(data)
    }

    localStorage.setItem(this._key, JSON.stringify(storage))
    return storage
  }
  delete (data) {
    let storage = this.get() || []
    this._delete(storage, data)
    localStorage.setItem(this._key, JSON.stringify(storage))
  }
  _delete (array, data) {
    let _index

    if (data instanceof Object) {
      _index = array.findIndex(t => {
        return data[this._uniqueId] === t[this._uniqueId]
      })
    } else {
      _index = array.findIndex(t => {
        return data === t
      })
    }

    _index !== -1 && array.splice(_index, 1)
  }
}

// 直接储存数据~
class SaveDataByDefault extends SaveData {
  get () {
    let _storage = localStorage.getItem(this._key)
    return _storage ? JSON.parse(_storage) : undefined
  }
  save (data) {
    localStorage.setItem(this._key, JSON.stringify(data))
  }
  delete () {
    this.clear()
  }
}

export {
  SaveDataByArray,
  SaveDataByDefault
}
