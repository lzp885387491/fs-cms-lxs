<template>
    <div>
        <el-form :model="form" label-width="120px">
            <el-form-item label="姓名">
                <el-input v-model="form.name" />
            </el-form-item>

            <el-form-item label="联系方式">
                <el-input v-model="form.phoneNumber" />
            </el-form-item>

            <el-form-item label="身份证号">
                <el-input v-model="form.identity" />
            </el-form-item>

            <!-- 职位  下拉列表 \\\ 公司  下拉列表 -->
            <el-form-item label="职位">
                <el-select v-model="form.position" placeholder="please select your zone">
                    <el-option label="职位1" value="职位1Val" />
                    <el-option label="职位2" value="职位2Val" />
                </el-select>
            </el-form-item>

            <el-form-item label="公司">
                <el-select v-model="form.enterprife" placeholder="please select your zone">
                    <el-option label="公司1" value="公司1Val" />
                    <el-option label="公司2" value="公司2Val" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { UpdateUserInfoApi } from '@/api/api'
interface fromType {
    name: string,
    phoneNumber: string,
    identity: string,
    position: string,
    enterprife: string,
}

const form: fromType = reactive({
    name: '',
    phoneNumber: '',
    identity: '',
    position: '',
    enterprife: ''
})

const onSubmit = () => {
    console.log('form', form)
    // 调用设置用户信息接口
    // setUserInfo(form);
}

async function setUserInfo(params: fromType) {
    const res = await UpdateUserInfoApi(params);
    // if (res)
    console.log('setUserInfoRes', res);
}
</script>

<style scoped></style>