<template>
    <el-container class="role">
        <el-aside width="200px" class="aside">
            <el-col :span="24">
                <el-button type="primary" @click="addRole">创建角色</el-button>
                <el-menu default-active="1" class="el-menu-vertical-demo">
                    <el-menu-item :index="item.id" v-for="item in roleList">
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-aside>
        <el-main></el-main>
    </el-container>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { addRoleListApi, getRoleListApi } from '@/api/api'
let roleList: any = ref([])
const addRole = function () {
    addRoleListApi().then((res: any) => {
        console.log(res);
    })
}
onMounted(() => {
    getRoleList()
})
const getRoleList = function () {
    getRoleListApi().then((res: any) => {
        console.log(res);
        roleList.value = JSON.parse(JSON.stringify(res.data.data))
    })
}
</script>
<style scoped lang="scss">
.role {
    height: 100%;

    .aside {
        height: 100%;
    }

    ::-webkit-scrollbar {
       width: 0;
       height: 0;
    }
}
</style>