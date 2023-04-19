<template>
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
                    <el-link type="primary">注册</el-link>
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
    username: "xiaoc",
    password: "999999"
})

const submit = async function(){
    let res =  await login(form);
    console.log(res);
    if (res.data.code == 200) {
        sessionStorage.setItem("token",res.data.data.access_token);
        router.push('/parkInfo');
    }else{
        console.log('网络错误');
    }
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
</style>