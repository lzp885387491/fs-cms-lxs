<!-- <template>
    <div class="login">
        <div class="header">
            <h3 class="title fs-30">浮山化工园区ERP</h3>
        </div>
        <div class="container">
            <div class="form">
                <h3 class="title">欢迎登录浮山化工园区ERP平台</h3>
                <div>
                    <div class="item">
                        <label for="">用户名</label>
                        <el-input v-model="form.username" placeholder="请输入用户名" />
                    </div>
                    <div class="item">
                        <label for="">密码</label>
                        <el-input v-model="form.password" placeholder="请输入密码" type="password" />
                    </div>
                    <el-button type="primary" class="btn-submit" @click="submit">登录</el-button>
                </div>
                <div class="operation">
                    <el-link type="primary">忘记密码</el-link>
                    <el-link type="primary" @click="toRegister()">注册</el-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/api';

const router = useRouter();

const form = reactive({
    username: "admin",
    password: "999999"
})

const submit = async function(){
    let res =  await login(form);
    if (res.data.code == 200) {
        sessionStorage.setItem("token",res.data.data.access_token);
        router.push('/ParkCompanyList');
    }else{
        console.log('网络错误');
    }
}
const toRegister = function(){
    router.push("/register")
}
</script>

<style scoped>
.login{
    height: 100vh;
    background: #409EFF;
}

.login .header{
    color:#fff;
    height: 60px;
    line-height: 60px;
}

.login .container{
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.login .container .form{
    background: #fff;
    border-radius: 4px;
    padding: 15px;
    width: 360px;
}

.title{
    text-align: center;
}

.form .item{
    display: flex;
    align-items: center;
    gap:20px;
    margin-top: 30px;
}

.form .item label{
    width: 100px;
    text-align: right;
}

.form .operation{
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.btn-submit{
    width: 100%;
    margin-top: 40px;
}
</style> -->

<template>
    <div class="main">
        <div class="htmleaf-container">
            <div class="wrapper" :class="isActivity ? 'form-success' : ''">
                <div class="container">
                    <h1>Welcome</h1>

                    <form class="form" :class="isShow ? 'none' : ''">
                        <input type="text" v-model="forms.username" placeholder="Username">
                        <input type="password" v-model="forms.password" placeholder="Password">
                        <button class="login-button" @click="toLogin">Login</button>
                    </form>
                </div>

                <ul class="bg-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
        <div class="title">
            <h1>浮山化工园区ERP</h1>
            <!-- 欢迎登录浮山化工园区ERP平台 -->
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import { login } from '@/api/api';
import { ElMessage } from 'element-plus';
let router = useRouter();
const forms = reactive({
    username: "admin",
    password: "999999"
})
let isActivity = ref(false);
let isShow = ref(false);
const toLogin = function(e:any){
    e.preventDefault();
    isActivity.value = true;
    isShow.value = true;
    submit();
}
const submit = async function(){
    let res:any =  await login(forms);
    if (res.data.code == 200) {
        sessionStorage.setItem("token",res.data.data.access_token);
        router.push('/ParkCompanyList');
    }else{
        ElMessage({
            message: res.data,
            type: 'warning',
        })
    }
}
</script>
<style scoped>
.main{
    overflow: hidden;
}
.none{
    display: none;
}
.title{
    text-align:center;margin:50px 0; font:normal 14px/24px 'MicroSoft YaHei';color:#000000
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
body ::-webkit-input-placeholder {
  /* WebKit browsers */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
body :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
.wrapper {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  opacity: 0.8;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 400px;
  margin-top: -200px;
  overflow: hidden;

}

.wrapper.form-success .container h1 {
  -webkit-transform: translateY(85px);
      -ms-transform: translateY(85px);
          transform: translateY(85px);
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 80px 0;
  height: 400px;
  text-align: center;
}
.container h1 {
  font-size: 40px;
  -webkit-transition-duration: 1s;
          transition-duration: 1s;
  -webkit-transition-timing-function: ease-in-put;
          transition-timing-function: ease-in-put;
  font-weight: 200;
}
form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
form input {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
  font-weight: 300;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: white;
  width: 300px;
  color: #53e3a6;
}
form button {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #53e3a6;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
}
form button:hover {
  background-color: #f5f7f9;
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 17s;
          animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
          animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
          animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
          animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
          animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
          animation-delay: 15s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
          animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}
</style>