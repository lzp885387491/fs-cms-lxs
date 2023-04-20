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
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
                    </div>
                    <div class="item">
                        <label for="">密码</label>
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" />
                    </div>
                    <div class="item">
                        <label for="">用户昵称</label>
                        <el-input v-model="ruleForm.avatarName" placeholder="请输入用户昵称" />
                    </div>
                    <el-button type="primary" class="btn-submit" @click="submit">注册</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { register } from '@/api/api';
import router from '@/router';
import { ElMessage } from 'element-plus'


const ruleForm = reactive({
    username: "",
    password: "",
    checkPass: '',
    avatarName: ''
})
const submit = async function(){
    let { username, password, avatarName } = ruleForm
    await register({
        username,
        password,
        avatarName
    }).then(res=>{
        console.log(res);
        ElMessage.success("注册成功")
        router.push("/login")
    })
}
</script>

<style scoped>
.login {
    height: 100vh;
    background: #409EFF;
}

.login .header {
    color: #fff;
    height: 60px;
    line-height: 60px;
}

.login .container {
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.login .container .form {
    background: #fff;
    border-radius: 4px;
    padding: 15px;
    width: 360px;
}

.title {
    text-align: center;
}

.form .item {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
}

.form .item label {
    width: 100px;
    text-align: right;
}

.form .operation {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.btn-submit {
    width: 100%;
    margin-top: 40px;
}
</style>