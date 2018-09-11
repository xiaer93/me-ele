/**
 * Created by xiaer on 2018/9/5.
 */
import {menuList, editAddress, localPosition} from 'common/js/config'

const state = {
  // 首页菜单
  menuList: menuList.get(),
  // 编辑地址
  editAddress: editAddress.get(),
  // 收获地址
  localPosition: localPosition.get() || {}
}

export default state
