/**
 * Created by xiaer on 2018/9/5.
 */
import * as types from './mutation-type'
import {menuList, editAddress} from 'common/js/config'

const mutations = {
  [types.SET_MENU_LIST] (state, list) {
    state.menuList = list
    menuList.save(list)
  },
  [types.SET_EDIT_ADDRESS] (state, address) {
    state.editAddress = address
    editAddress.save(address)
  }
}

export default mutations
