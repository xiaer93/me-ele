<template>
  <div class="login">
    <div class="login-content">
      <div class="login-header">
        <h1 class="login-header-title">饿了么</h1>
        <span class="login-header-icon">
          <svg class="m-icon m-icon-title"><use xlink:href="#logo"></use></svg>
        </span>
      </div>
      <div class="login-main">
        <h2 class="login-main-header">短信登录</h2>
        <p class="login-main-tel">
          <input v-model="loginObj.tel" type="text" placeholder="手机号" class="login-main-tel-text m-login-input">
          <span class="login-main-tel-qr" @click="getQr" ref="qr">{{qrText}}</span>
        </p>
        <p class="login-main-qr">
          <input v-model="loginObj.qr" type="text" placeholder="验证码" class="login-main-qr-text m-login-input">
        </p>
        <p class="login-main-tips">
          温馨提示：未注册饿了么账号的手机号，登录时将自动注册，且代表您已同意<a class="login-main-tips-link">《用户服务协议》</a>
        </p>

        <div class="login-main-btn">
          <button class="login-main-btn-login" @click="login">登录</button>
        </div>
      </div>
      <div class="login-footer">
        <router-link class="login-footer-aboutme" to="/about">关于我们</router-link>
      </div>
      <div class="login-message">
        <toast :message="errorMsg" ref="toast"></toast>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import Toast from 'base/toast'
import {countDown} from 'common/js/util'

let ajv = new Ajv({allErrors: true, jsonPoniters: true})
AjvErrors(ajv)

let schema = {
  type: 'object',
  required: ['tel', 'qr'],
  properties: {
    tel: {
      type: 'string',
      pattern: '^\\d{11}$'
    }
  },
  errorMessage: {
    type: '',
    properties: {
      tel: '请填写合法的手机号'
    }
  }
}

export default {
  data () {
    return {
      loginObj: {
        tel: '',
        qr: ''
      },
      errorMsg: '',
      qrText: '获取验证码',
      hasGetQr: false
    }
  },
  methods: {
    login () {
      if (!this.loginObj.qr) {
        return
      }

      // 使用json-schema验证数据~~~！
      let validate = ajv.compile(schema)
      let valid = validate(this.loginObj)

      if (!valid) {
        this.errorMsg = validate.errors[0].message
        this.$refs.toast.show()
      } else {
        alert('登录成功')
      }
    },
    getQr () {
      // 使用json-schema验证数据~~~！
      let validate = ajv.compile(schema)
      let valid = validate(this.loginObj)

      if (!valid) {
        ;
      } else {
        this.genBtnText()
      }
    },
    genBtnText () {
      this.$refs.qr.classList.remove('active')
      countDown(30, (value) => {
        this.qrText = `已发送${value}s`
      }, () => {
        this.qrText = '重新获取'
        this.$refs.qr.classList.add('active')
      })
    }
  },
  components: {
    Toast
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.login{
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  &-content{
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    margin: 0 auto;
  }
  &-header{
    margin-top: 40px;
    &-title{
      height: 0;
      visibility: hidden;
    }
    &-icon{
      display: block;
      margin: 0 auto;
      width: 140px;
      height: 56px;
    }
  }
  &-main{
    margin-top: 40px;
    text-align: center;
    &-header{
      display: inline-block;
      padding-bottom: 4px;
      font-size: 14px;
      color: #2395ff;
      font-weight: @font-weight-bold;
      text-align: center;
      cursor: pointer;
      border-bottom: 2px solid #2395ff;
    }
    &-tel{
      position: relative;
      margin-top: 16px;
      &-text{

      }
      &-qr{
        position: absolute !important;
        right: 10px;
        top: 50%;
        color: #ccc;
        text-align: center;
        font-size: 14px;
        background: transparent;
        transform: translate(0, -50%);
        .extend-click();
        &.active{
          color: #2395ff;
        }
      }
    }
    &-qr{
      margin-top: 16px;
    }
    &-tips{
      margin-top: 12px;
      color: #999;
      font-size: 14px;
      line-height: 20px;
      &-link{
        color: #2395ff;
      }
    }
    &-btn{
      display: block;
      width: 100%;
      height: 42px;
      line-height: 42px;
      margin-top: 30px;
      &-login{
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background: #4cd96f;
        color: #fff;
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        outline: none;
        border: none;
      }
    }
  }
  &-footer{
    display: block;
    margin-top: 20px;
    text-align: center;
    color: #999;
  }
  &-message{
    position: relative;
    flex: 1 1 auto;
  }
}
.m-login-input{
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  padding-left: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  font-size: 14px;
  background: #fff;
  outline: none;
  &:focus{
    border-color: #0089dc;
  }
}
</style>
