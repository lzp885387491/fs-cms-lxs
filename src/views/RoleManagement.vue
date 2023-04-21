<template>
    <div class="role">
        <div class="role-add">
            <el-button type="primary" @click="addRole">创建角色</el-button>
            <el-dialog v-model="dialogFormVisible" title="创建角色" width="30%">
                <el-form :model="roleInfo">
                    <el-form-item label="角色" :label-width="formLabelWidth">
                        <el-input v-model="roleInfo.name" autocomplete="off" placeholder="请输入角色名称" />
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
        </div>
        <div class="role-content mt-2">
            <el-tag v-for="tag in roleList" size="large" :key="tag.name" class="tag" closable :type="tag.type"
                @close="handleClose(tag)" @click="update">
                {{ tag.name }}
            </el-tag>
        </div>


    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addRoleListApi, getRoleListApi, deleteRoleListApi } from '@/api/api'
let roleList: any = ref([])
const defaultProps = {
    children: 'children',
    label: 'name',
}
const dialogFormVisible = ref(false)
const formLabelWidth = '10rem'
const roleInfo = ref({
    name: '',
    description: ''
})
onMounted(() => {
    getRoleList()
})
//添加角色
const addRole = function () {
    dialogFormVisible.value = true
}
async function add() {
    dialogFormVisible.value = false
    console.log(roleInfo.value);
    addRoleListApi({
        name: roleInfo.value.name,
        description: roleInfo.value.description
    }).then((res: any) => {
        console.log(res);
        getRoleList()
    }).catch((error) => {
        console.log(error);
    })
}
//获取角色
async function getRoleList() {
    let res = await getRoleListApi()
    roleList.value = JSON.parse(JSON.stringify(res.data.data))
}
//删除角色
const handleClose = function (val: any) {
    ElMessageBox.confirm(
        '确定要删除此条信息?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ) .then(() => {
            deleteRoleListApi(val.id).then((res: any) => {
                console.log(res);
                getRoleList()
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
            })

        }) 

}
const update=function(){
    console.log(1111);    
}
</script>
<style scoped lang="scss">
.role {
    height: 100%;
    width: 100%;

    .role-content {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 2rem;

        .tag {
            display: flex;
            justify-content: space-between;
           :deep(.el-tag__content) {
                cursor: pointer;
            }
        }
    }

    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}
</style>