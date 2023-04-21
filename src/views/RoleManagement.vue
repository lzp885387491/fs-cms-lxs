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
                @close="handleClose(tag)">
                {{ tag.name }}
            </el-tag>
        </div>


    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { addRoleListApi, getRoleListApi } from '@/api/api'
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
    let res = addRoleListApi(roleInfo)
    console.log(res);
}
//获取角色
async function getRoleList() {
    let res = await getRoleListApi()
    console.log(res);
    roleList.value = JSON.parse(JSON.stringify(res.data.data))
}
const handleClose = function (val: any) {
    console.log(val);

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
        }
    }

    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}
</style>