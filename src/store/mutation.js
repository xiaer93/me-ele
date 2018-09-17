/**
 * Created by xiaer on 2018/9/5.
 */
import * as types from './mutation-type'
import {menuList, editAddress, localPosition, cart} from 'common/js/config'

const mutations = {
  [types.SET_MENU_LIST] (state, list) {
    state.menuList = list
    menuList.save(list)
  },
  [types.SET_EDIT_ADDRESS] (state, address) {
    state.editAddress = address
    editAddress.save(address)
  },
  [types.SET_LOCAL_POSITION] (state, position) {
    state.localPosition = position
    localPosition.save(position)
  },
  // mutation只接受一个参数？还是只接受对象？
  // mutation只能接受一个参数
  [types.SET_CART] (state, data) {
    let {restaurant, food} = data
    if (state.cart[restaurant._id]) {
      let tmpFoods = state.cart[restaurant._id].foods

      if (food.number === 0) {
        // 删除对象~~~
        Reflect.deleteProperty(tmpFoods, food._id)
        if (Object.keys(tmpFoods).length === 0) {
          Reflect.deleteProperty(state.cart, restaurant._id)
        }
      } else {
        tmpFoods[food._id] = food
      }
    } else {
      state.cart[restaurant._id] = {
        name: restaurant.name,
        _id: restaurant._id,
        foods: {}
      }

      state.cart[restaurant._id].foods[food._id] = food
    }
    cart.save(state.cart)
  },
  [types.CLEAR_CART] (state, data) {
    let {restaurant} = data
    Reflect.deleteProperty(state.cart, restaurant._id)
    cart.save(state.cart)
  },
  [types.SET_USERS] (state, infos) {
    state.userInfo = infos
  }
}

export default mutations
