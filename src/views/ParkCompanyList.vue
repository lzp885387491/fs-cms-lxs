<template>
    <div class="job-list">
        <div class="main">
            <div class="table-title">园区公司列表</div>
            <div class="search mt-2">
                <div class="search-left">
                    <el-input v-model="form.id" clearable class="ipt-search" placeholder="根据id查找"></el-input>
                    <el-button type="primary" @click="search" size="large">搜索</el-button>
                </div>
                <el-button type="primary" @click="jobReport" size="large">添加园区公司</el-button>
                <el-dialog title="园区公司" v-model="dialogFormVisible" width="28%">
                    <el-form :model="addForm">
                        <el-form-item label="公司名称" :label-width="formLabelWidth">
                            <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item label="公司地址" :label-width="formLabelWidth">
                            <el-input v-model="addForm.address" autocomplete="off" placeholder="请输入公司地址"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" :label-width="formLabelWidth">
                            <el-input v-model="addForm.contactPerson" autocomplete="off" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" :label-width="formLabelWidth">
                            <el-input type="number" v-model="addForm.contactTel" autocomplete="off"
                                placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addInformation">确 定</el-button>
                    </template>
                </el-dialog>
            </div>
            <div class="table">
                <el-table :data="newTableData" class="table-content" style="width: 100%"
                    :header-cell-style="headerCellStyle" :cell-style="cellStyle">
                    <el-table-column prop="id" label="id" width="auto"></el-table-column>
                    <el-table-column prop="name" label="公司名称" width="auto"></el-table-column>
                    <el-table-column prop="address" label="地址" width="auto"></el-table-column>
                    <el-table-column prop="contactPerson" label="联系人" width="auto"></el-table-column>
                    <el-table-column prop="contactTel" label="联系电话" width="auto"></el-table-column>
                    <el-table-column prop="operate" label="操作" width="auto">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="upDate(scope.row)">编辑</el-button>
                            <el-button class="cl-r" link type="primary" @click="deleteList(scope.$index, scope.row)"
                                size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog v-model="dialogFormVisible3" title="是否删除" width="28%">
                <span>确定要删除吗？</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible3 = false">取消</el-button>
                        <el-button type="primary" @click="deleteRow()">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
            <el-dialog title="修改信息" v-model="dialogFormVisible2" width="28%">
                <el-form :model="upDateForm">
                    <el-form-item label="公司名称" :label-width="formLabelWidth">
                        <el-input v-model="upDateForm.name" autocomplete="off" placeholder="请输入公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址" :label-width="formLabelWidth">
                        <el-input v-model="upDateForm.address" autocomplete="off" placeholder="请输入公司地址"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" :label-width="formLabelWidth">
                        <el-input v-model="upDateForm.contactPerson" autocomplete="off" placeholder="请输入联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" :label-width="formLabelWidth">
                        <el-input type="number" v-model="upDateForm.contactTel" autocomplete="off"
                            placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="upDateFormList()">确 定</el-button>
                </template>
            </el-dialog>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pagingItem"
                    layout="total, prev, pager, next, jumper" :total="val"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { createEnterpriseList, getEnterpriseList, queryEnterpriseList, deleteEnterpriseList, updateEnterpriseList } from '@/api/api';
import { ElMessage } from 'element-plus'
import { reactive, ref, computed, onMounted } from 'vue'
let form = reactive({
    id: ''
})
function chek(data: any | undefined) {
    // 如果传进来的是一个对象  则循环遍历每一个字段是否为空
    // 如果传进来的值 是一个数组 就循环遍历每一项 判断每一项的值是否为空
    // 如果传进来的值 是一个单独的字段 则就只校验该字段是否为空
    let isType = Object.prototype.toString.call(data)
    let flag = true
    if (isType === '[object Object]') {
        for (const key in data) {
            if (data[key] === undefined || data[key] === '') {
                flag = false
                ElMessage({
                    message: '请填写' + addFormRule[key],
                    type: 'warning'
                })
                break
            }
        }
    }
    return flag
}

const addFormRule: any = reactive({
    name: '公司名称',
    address: '公司地址',
    contactPerson: '联系人',
    contactTel: '联系电话',
})
const addForm = reactive({
    name: '',
    address: '',
    contactPerson: '',
    contactTel: '',
})
const upDateForm = reactive({
    id: 0,
    name: '',
    address: '',
    contactPerson: '',
    contactTel: '',
})
let dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)
const dialogFormVisible3 = ref(false)
const ind = ref()
const rows = ref()
let formLabelWidth = ref('120px')
let currentPage = ref(1)
let pagingItem = ref(5)
let tableData = ref([])
let searchtableData: any = ref(tableData)
let val = computed(() => {
    return searchtableData.value.length
})
let headerCellStyle = reactive({
    fontSize: '1.7rem',
    textAlign: 'center',
    padding: '1rem 0'
})
const deleteList = function (index: number, row: any) {
    ind.value = index;
    rows.value = row.id;
    dialogFormVisible3.value = true
}
const deleteRow = async () => {
    let res = await deleteEnterpriseList(rows.value)
    if (res) {
        let arr = tableData;
        searchtableData.value.splice((currentPage.value - 1) * pagingItem.value + ind.value, 1)
        tableData = arr;
        ElMessage({
            message: '删除成功',
            type: 'success'
        })
    }
    dialogFormVisible3.value = false
}
const upDate = function (row: any) {
    dialogFormVisible2.value = true
    upDateForm.id = row.id
    upDateForm.name = row.name
    upDateForm.address = row.address
    upDateForm.contactPerson = row.contactPerson
    upDateForm.contactTel = row.contactTel
}
const upDateFormList = async function () {
    let { name, address, contactPerson, contactTel } = upDateForm
    await updateEnterpriseList(upDateForm.id, {
        name,
        address,
        contactPerson,
        contactTel
    }).then(res => {
        dialogFormVisible2.value = false
        getEnterpriseInfo()
        ElMessage.success('修改成功')
    })
}
let cellStyle = reactive({
    textAlign: 'center',
    fontSize: '1.5rem',
    padding: '1rem 0'
})
const handleSizeChange = function (val: any) {
    pagingItem.value = val
}
const handleCurrentChange = function (val: any) {
    currentPage.value = val
}

const addInformation = async function () {
    let { name, address, contactPerson, contactTel } = addForm
    let res = await createEnterpriseList({
        name,
        address,
        contactPerson,
        contactTel
    })
    if (res) {
        if (chek(addForm)) {
            dialogFormVisible.value = false
            ElMessage({
                message: '创建成功',
                type: 'success'
            })
            location.reload()
        }
    }
}
const getEnterpriseInfo = async function () {
    let res = await getEnterpriseList()
    if (res) {
        tableData.value = res.data
        return tableData.value
    }
}
onMounted(async () => {
    await getEnterpriseInfo()
})

const search = async function () {
    await queryEnterpriseList(form.id).then((res) => {
        if (form.id == '') {
            getEnterpriseInfo()
            return ElMessage.warning('关键词不能为空！！！')
        } else {
            ElMessage.success('搜索成功')
            searchtableData.value = [res.data]
            return searchtableData.value
        }
    }).catch((error) => {
        getEnterpriseInfo()
        return ElMessage.warning('没有查找到此内容')
    })
}
const jobReport = function () {
    dialogFormVisible.value = true
    Object.assign(addForm, {
        name: '',
        address: '',
        contactPerson: '',
        contactTel: '',
    })
}
//计算属性计算出分页后需要的用户信息
let newTableData = computed(() => {
    return searchtableData.value.slice(
        (currentPage.value - 1) * pagingItem.value,
        currentPage.value * pagingItem.value
    )
})
</script>
<style scoped lang="scss">
.job-list {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    box-sizing: border-box;

    .main {
        height: 100%;
        box-sizing: border-box;

        .search {
            display: flex;
            justify-content: space-between;
            gap: 1rem;

            .search-left {
                display: flex;
                gap: 1rem;

                .clear {
                    margin: 0;
                }

                .ipt-search {
                    width: 20rem;
                }
            }
        }

        .table {
            margin: 2rem 0;

            ::-webkit-scrollbar {
                width: 0;
                height: 0;
            }

            :v-deep(.cell) {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: 4rem;
                padding: 0;
            }

            .table-clink {
                font-size: 1.5rem;
            }
        }
    }
}

.dialog-footer {
    display: flex;
    justify-content: center;
    padding: 2rem;
}

:deep(.el-dialog .el-input__wrapper) {
    flex-grow: 0 !important;
    width: 28rem !important;
}

:deep(.el-dialog .el-input__inner) {
    flex-grow: 0 !important;
    width: 28rem !important;
}

// :deep(.el-table) {
//     --el-table-border-color: none
// }
.cl-r {
    color: red;
}

.cl-r:hover {
    color: rgb(203, 69, 69);
}
</style>