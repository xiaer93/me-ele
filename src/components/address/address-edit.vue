<template>
  <div class="address-edit">
    <div class="address-edit-header">
      <header-title>编辑地址</header-title>
    </div>
    <div class="address-edit-content">
      <div class="address-edit-item">
        <p class="address-edit-name address-edit-flex">
          <label for="" class="address-edit-label">联系人</label>
          <input type="text" placeholder="你的姓名" class="address-edit-input">
        </p>
        <p class="address-edit-radio address-edit-flex">
          <label for="" class="address-edit-label"></label>
          <radio-box :radioList="sexList"></radio-box>
        </p>
      </div>
      <div class="address-edit-item address-edit-flex">
        <label for="" class="address-edit-label">电话</label>
        <input type="text" placeholder="你的手机号" class="address-edit-input">
      </div>
      <div class="address-edit-item address-edit-flex">
        <label for="" class="address-edit-label">地址</label>
        <input type="text" placeholder="小区/写字楼/学校等" class="address-edit-input">
      </div>
      <div class="address-edit-item address-edit-flex">
        <label for="" class="address-edit-label">门牌号</label>
        <input type="text" placeholder="10号楼5层501室" class="address-edit-input">
      </div>
      <div class="address-edit-item address-edit-flex">
        <label for="" class="address-edit-label">标签</label>
        <p class="address-edit-radio">
          <radio-box :radioList="tagList"></radio-box>
        </p>
      </div>
    </div>
    <div class="address-edit-btn">确定</div>
  </div>
</template>

<script type="text/ecmascript-6">
import RadioBox from 'base/radio-box'
import HeaderTitle from 'base/header-title'
import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'

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
    tag: {
      type: 'string',
      enum: ['home', 'school', 'company']
    },
    addressText: {
      type: 'string',
      minLength: 1
    }
  }
}

export default {
  data () {
    return {
      sexList: [
        {
          sex: 'man',
          text: '先生'
        },
        {
          sex: 'woman',
          text: '女士'
        }
      ],
      tagList: [
        {
          location: 'home',
          text: '家'
        },
        {
          location: 'school',
          text: '学校'
        },
        {
          location: 'compony',
          text: '公司'
        }
      ],
      addressObj: {
        firstName: '程',
        sex: '先生',
        tel: '11111111111',
        tag: '家',
        addressText: '武汉市人民政府武汉市人民政府'
      }
    }
  },
  created () {
    window.a = this.$route.params.control
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
