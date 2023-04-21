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
                    <el-select v-model="form.enterpriseId" placeholder="请选择公司...">
                        <el-option v-for="(item, index) in enterpriseList" :key="item.id || index" :label="item.name"
                            :value="item.id" />
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
import { reactive, ref } from 'vue'
import { UpdateUserInfoApi, getUserInfoApi, getEnterpriseList } from '@/api/api'
import { userStore } from '@/stores/userInfo'
// import list from '@/assets/js/list'
const userStorePinia = userStore();


interface fromType {
    avatarName: string | number,
    phoneNumber: string,
    identityCard: string,
    position: string,
    enterpriseId: string | number,
    deptNo: number | null,
    id: number | null
}
const form: fromType = reactive({
    id: null,
    avatarName: '', // 姓名
    deptNo: null,
    phoneNumber: '', // 手机号
    identityCard: '', // 身份证号
    position: '',  // 职位
    enterpriseId: '' // 企业
});
let userInfo = ref()

const abcd = ref()
let enterpriseList: any = ref();
async function getEnterpriseListApi() {
    const res: any = await getEnterpriseList();
    if (res.status == 200 || res.code == 200) {
        enterpriseList.value = JSON.parse(JSON.stringify(res.data))
        getUserInfo()
    } else {
        getEnterpriseListApi()
    }
}
getEnterpriseListApi()


const onSubmit = () => {
    console.log('这是先获取的form表单输入的值：', form)
    let { id, avatarName, deptNo, phoneNumber, identityCard, enterpriseId } = form;
    setUserInfo(id, {
        avatarName, deptNo, phoneNumber, identityCard, enterpriseId
    });
}

async function setUserInfo(id: any, params: any) {
    const res: any = await UpdateUserInfoApi(id, params);
    if (res.code == 200 || res.status == 200) {
        console.log('修改接口返回值', res);
        console.log('修改完信息了，现在重新调取获取用户信息接口！');
        getUserInfo()
    }
}

async function getUserInfo() {
    const res: any = await getUserInfoApi();
    if (res.data.code == 200) {
        Object.assign(form, res.data.data); // 合并数组
        console.log('这是重新获取的值', form);
        form.enterpriseId = res.data.data.enterprise.id;
        userInfo.value = JSON.parse(JSON.stringify(res.data.data));
        userStorePinia.setUserStore('userinfo', userInfo.value);
    }
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