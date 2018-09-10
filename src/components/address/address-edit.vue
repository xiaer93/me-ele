<template>
  <div class="address-edit">
    <div class="address-edit-header">
      <header-title>编辑地址</header-title>
      <span class="address-edit-delete" v-show="isEditStatus" @click="deleteAddress">删除</span>
    </div>
    <div class="address-edit-content">
      <div class="address-edit-item">
        <p class="address-edit-name address-edit-flex">
          <label for="" class="address-edit-label">联系人</label>
          <input v-model="addressObj.firstName" type="text" placeholder="你的姓名" class="address-edit-input">
        </p>
        <p class="address-edit-radio address-edit-flex">
          <label for="" class="address-edit-label"></label>
          <radio-box :radioList="sexList" :defaultRadio="addressObj.sex"></radio-box>
        </p>
      </div>
      <div class="address-edit-item address-edit-flex">
        <label for="" class="address-edit-label">电话</label>
        <input v-model="addressObj.tel" type="text" placeholder="你的手机号" class="address-edit-input">
      </div>
      <div class="address-edit-item address-edit-flex">
        <label for="" class="address-edit-label">地址</label>
        <input v-model="addressObj.addressText" type="text" placeholder="小区/写字楼/学校等" class="address-edit-input">
      </div>
      <div class="address-edit-item address-edit-flex">
        <label for="" class="address-edit-label">门牌号</label>
        <input v-model="addressObj.houseNumber" type="text" placeholder="10号楼5层501室" class="address-edit-input">
      </div>
      <div class="address-edit-item address-edit-flex">
        <label for="" class="address-edit-label">标签</label>
        <p class="address-edit-radio">
          <radio-box :radioList="tagList" :defaultRadio="addressObj.tag"></radio-box>
        </p>
      </div>
    </div>
    <div class="address-edit-btn">确定</div>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
import RadioBox from 'base/radio-box'
import HeaderTitle from 'base/header-title'
import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import {mapGetters} from 'vuex'

let schema = {
  type: 'object',
  required: ['firstName', 'sex', 'tel', 'addressText'],
  properties: {
    firstName: {
      type: 'string',
      minLength: 1
    },
    sex: {
      type: 'string',
      enum: ['man', 'woman']
    },
    tel: {
      type: 'string',
      pattern: '^\\d{11}$'
    },
    addressText: {
      type: 'string'
    },
    houseNumber: {
      type: 'string',
      minLength: '1'
    },
    tag: {
      type: 'string',
      enum: ['home', 'school', 'company']
    },
  }
}

export default {
  data () {
    return {
      sexList: ['先生', '女士'],
      tagList: ['家', '学校', '公司'],
      addressObj: {
        firstName: '',
        sex: '',
        tel: '',
        tag: '',
        addressText: '',
        houseNumber: ''
      },
      isEditStatus: false
    }
  },
  computed: {
    ...mapGetters([
      'editAddress'
    ])
  },
  methods: {
    deleteAddress () {
      // 删除地址，删除成功后跳转回address页面
    }
  },
  created () {
    this.isEditStatus = this.$route.params.control === 'edit'
  },
  mounted () {
    // vuex的值可以直接赋给data中定义的对象~？？？不可以
    // 等待所有数据都准备好后，拷贝给addressObj
    this.addressObj = Object.assign(this.addressObj, this.editAddress)
  },
  components: {
    RadioBox,
    HeaderTitle
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/variable";

.address-edit{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  &-delete{
    position: absolute;
    right: .3rem;
    top: .24rem;
    font-size: @font-size-medium-s;
    color: @text-color-f;
  }
  &-content{
    padding: 0 .3rem;
    background-color: #fff;
  }
  &-item{
    font-size: @font-size-medium-s;
    border-bottom: 1px solid #eee;
  }
  &-flex{
    display: flex;
    align-items: center;
  }
  &-name{
    .address-edit-input{
      border-bottom: 1px solid #eee;
    }
  }
  &-label{
    display: inline-block;
    width: 1.2rem;
    color: @text-color-3;
    font-weight: @font-weight-bold;
    text-align: left;
  }
  &-input{
    flex: 1 1 auto;
    padding: .36rem 0;
    color: @text-color-6;
    outline: none;
  }
  &-radio{
    margin: .2rem 0;
  }
  &-btn{
    margin: .4rem .3rem 0;
    padding: .26rem 0;
    text-align: center;
    border-radius: .1rem;
    font-size: .48rem;
    color: @text-color-f;
    border: none;
    font-weight: @font-weight-bold;
    background: #00d762;
  }
}
</style>
