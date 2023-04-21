<template>
    <el-container class="role">
        <el-aside width="200px" class="aside">
            <el-button type="primary" @click="addRole">创建角色</el-button>
            <el-dialog v-model="dialogFormVisible" title="创建角色" width="30%">
                <el-form :model="roleInfo">
                    <el-form-item label="角色" :label-width="formLabelWidth">
                        <el-input v-model="roleInfo.name" autocomplete="off" placeholder="请输入角色名称"/>
                    </el-form-item>
                    <el-form-item label="角色描述" :label-width="formLabelWidth">
                        <el-input v-model="roleInfo.description" autocomplete="off" placeholder="请输入角色描述" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="add">
                           确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
            <el-tree :data="roleList" :props="defaultProps"  />
        </el-aside>
        <el-main>

        </el-main>
    </el-container>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { addRoleListApi, getRoleListApi } from '@/api/api'
let roleList: any = ref([])
const defaultProps = {
  children: 'children',
  label: 'name',
}
const dialogFormVisible = ref(false)
const formLabelWidth = '10rem'
const roleInfo=ref({
    name:'',
    description:''
})
onMounted(() => {
    getRoleList()
})
//添加角色
const addRole = function () {
    dialogFormVisible.value=true   
}
const add=function(){
    dialogFormVisible.value = false   
    addRoleListApi(roleInfo).then((res: any) => {
        console.log(res);
    })
}
//获取角色
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