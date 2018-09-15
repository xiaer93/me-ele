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
  [types.ADD_CART] (state, food) {
    state.cart[food._id] = food
    cart.save(state.cart)
  },
  [types.MINUS_CART] (state, food) {
    state.cart[food._id] = food
    cart.save(state.cart)
  },
  [types.CLEAR_CART] (state) {
    state.cart = {}
    cart.save(state.cart)
  }
}

export default mutations
