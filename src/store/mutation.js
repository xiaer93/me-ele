/**
 * Created by xiaer on 2018/9/5.
 */
import * as types from './mutation-type'
import {menuList} from 'common/js/config'

const mutations = {
  [types.SET_MENU_LIST] (state, list) {
    state.menuList = list
    menuList.save(list)
  }
}

export default mutations
