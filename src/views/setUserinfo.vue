<template>
    <div class="set-user-info">
        <div class="form_box">
            <h2>修改用户信息</h2>
            <el-form :model="form" label-position="top" label-width="100px">
                <el-form-item label="姓名">
                    <el-input v-model="form.avatarName" placeholder="请输入姓名..." />
                </el-form-item>

                <el-form-item label="联系方式">
                    <el-input v-model="form.phoneNumber" placeholder="请输入联系方式..." />
                </el-form-item>

                <el-form-item label="身份证号">
                    <el-input v-model="form.identityCard" placeholder="请输入身份证号..." />
                </el-form-item>

                <el-form-item label="职位">
                    <el-input disabled v-model="form.position" :placeholder="form.position ? form.position : '无信息'" />
                </el-form-item>

                <el-form-item label="公司">
                    <el-select v-model="form.enterprise" placeholder="请选择公司...">
                        <el-option label="公司1" value="公司1Val" />
                        <el-option label="公司2" value="公司2Val" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { UpdateUserInfoApi } from '@/api/api'
import { userStore } from '@/stores/userInfo'
import list from '@/assets/js/list'

console.log(list);


interface fromType {
    avatarName: string, // 姓名
    phoneNumber: string, // 手机号
    identityCard: string, // 身份证号
    position: string,  // 职位
    enterprise: string, // 企业
}

const form: fromType = reactive({
    avatarName: '',
    phoneNumber: '',
    identityCard: '',
    position: '',
    enterprise: ''
})

// const userStorePinia = userStore();
// const piniaRes = JSON.parse(JSON.stringify(userStorePinia.getUserStore('userinfo')));

//     Object.assign(form, piniaRes);// 合并数组
//     console.log(form);

const onSubmit = () => {
    console.log('form', form)
    // setUserInfo(form);
}

async function setUserInfo(params: fromType) {
    const res = await UpdateUserInfoApi(params);
    // if (res)
    console.log('setUserInfoRes', res);
}
</script>

<style scoped lang="scss">
.set-user-info {
    width: 100%;
    height: 100%;

    .form_box {
        width: 500px !important;
        // background-color: #ccc;

        h2 {
            padding: 0;
            margin: 0 0 0 50px;
        }

        :deep(.el-input) {
            width: 500px;
        }

        .el-form {
            margin: 30px 0 0 30px;
            width: 500px;
        }

    }
}
</style>