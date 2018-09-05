/**
 * Created by xiaer on 2018/9/5.
 */
import * as types from './mutation-type'

const mutations = {
  [types.SET_MENU_LIST] (state, list) {
    state.menuList = list
  }
}

export default mutations
