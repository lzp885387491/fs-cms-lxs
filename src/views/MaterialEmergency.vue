<template>
    <div class="job-list">
        <div class="main">
            <div class="table-title">应急救援物资</div>
            <div class="search">
                <div class="search-left">
                    <el-input v-model="searchForm.name" clearable size="large" class="ipt-search"
                        placeholder="根据资源名称查询"></el-input>

                    <el-button type="primary" @click="search" size="large">搜索</el-button>
                </div>
                <el-button type="primary" @click="addResource" size="large">添加应急资源</el-button>
                <el-dialog title="添加应急资源" v-model="dialogFormVisible" width="50%">
                    <el-form :model="addForm" size="mini">
                        <el-form-item label="资源名称" :label-width="formLabelWidth">
                            <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入资源名称"></el-input>
                        </el-form-item>
                        <el-form-item label="资源类型" :label-width="formLabelWidth">
                            <el-input v-model="addForm.type" autocomplete="off" placeholder="请输入资源类型"></el-input>
                        </el-form-item>
                        <el-form-item label="资源描述" :label-width="formLabelWidth">
                            <el-input v-model="addForm.description" autocomplete="off" placeholder="请输入资源对应描述"></el-input>
                        </el-form-item>
                        <el-form-item label="部署地点" :label-width="formLabelWidth">
                            <el-select v-model="addForm.siteId" class="m-2" placeholder="请选择厂区">
                                <el-option v-for="item in factoryInfo" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="资源状态" :label-width="formLabelWidth">
                            <el-select v-model="addForm.status" class="m-2" placeholder="请选择资源状态">
                                <el-option v-for="item in resourceStatusList" :key="item.id" :label="item.name"
                                    :value="item.status" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="负责人" :label-width="formLabelWidth">
                            <el-input v-model="addForm.head" autocomplete="off" placeholder="请输入负责人"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人电话" :label-width="formLabelWidth">
                            <el-input v-model="addForm.phoneNumber" autocomplete="off" placeholder="请输入负责人电话"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                            <el-button type="primary" @click="addInformation" size="mini">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
                <el-dialog title="修改应急资源" v-model="editDialogFormVisible" width="50%">
                    <el-form :model="editForm" size="mini">
                        <el-form-item label="资源名称" :label-width="formLabelWidth">
                            <el-input v-model="editForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="资源类型" :label-width="formLabelWidth">
                            <el-input v-model="editForm.type" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="资源描述" :label-width="formLabelWidth">
                            <el-input v-model="editForm.description" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="部署地点" :label-width="formLabelWidth">
                            <el-select v-model="editForm.siteId" class="m-2" placeholder="请选择厂区">
                                <el-option v-for="item in factoryInfo" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="资源状态" :label-width="formLabelWidth">
                            <el-select v-model="editForm.status" class="m-2" placeholder="请选择资源状态">
                                <el-option v-for="item in resourceStatusList" :key="item.id" :label="item.name"
                                    :value="item.status" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="负责人" :label-width="formLabelWidth">
                            <el-input v-model="editForm.head" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人电话" :label-width="formLabelWidth">
                            <el-input v-model="editForm.phoneNumber" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="editDialogFormVisible = false" size="mini">取 消</el-button>
                            <el-button type="primary" @click="submitEditInformation" size="mini">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
            <div class="table mt-2">
                <el-table :data="newTableData" class="table-content" style="width: 100%"
                    :header-cell-style="headerCellStyle" :cell-style="cellStyle">
                    <el-table-column type="index" label="序号" width="100" />
                    <el-table-column prop="name" label="资源名称" width="auto"></el-table-column>
                    <el-table-column prop="stock" label="数量" width="auto"></el-table-column>
                    <el-table-column prop="unit" label="单位" width="auto"></el-table-column>
                    <el-table-column prop="type" label="资源类型" width="auto"></el-table-column>
                    <el-table-column prop="description" label="资源描述" width="auto"></el-table-column>
                    <el-table-column label="部署地点" width="auto">
                        <template #default="scope">
                            <div>{{ getSiteName(scope.row.siteId) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="资源状态" width="auto">
                        <template #default="scope">
                            <div>{{ getStatusName(scope.row.status) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="head" label="负责人" width="auto"></el-table-column>
                    <el-table-column prop="phoneNumber" label="负责人电话" width="auto"></el-table-column>
                    <el-table-column label="操作" width="auto">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click.prevent="editRow(scope.row)">编辑</el-button>
                            <!-- <el-button link type="primary" size="small" @click.prevent="checkRow(scope.row)">查看</el-button> -->
                            <el-button link type="danger" size="small" @click.prevent="open(scope.row)">删除

                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pagingItem"
                    layout="total, sizes, prev, pager, next, jumper" :total="totalNum"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref, computed } from 'vue'
import { factorySiteApi, emergencyResource, addEmergencyResource, deleteEmergencyResource, updateEmergencyResource, getEmergencyResource } from '@/api/api'
let searchForm = reactive({
    name: ''
})
let resourceStatusList = reactive([
    {
        id: 1,
        name: '审核中',
        status: 'pending'
    },
    {
        id: 2,
        name: '审核已通过',
        status: 'approved'
    },
    {
        id: 3,
        name: '审核已拒绝',
        status: 'rejected'
    },
])
const getStatusName = function (status: any) {
    return resourceStatusList.find(item => {
        return item.status == status
    })?.name
}
let factoryValue = ref('')
function check(data: any | undefined) {
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
// 获取地点名称
const getSiteName = function (id: any) {
    return factoryInfo.value.find((item: any) => {
        return item.id == id
    }).name
}
let factoryInfo: any = ref([])
getFactorySite()
async function getFactorySite() {
    await factorySiteApi().then(response => {
        factoryInfo.value = response.data;
    }).catch(error => {
        console.log(error);

    })
}
// 添加规则
const addFormRule: any = reactive({
    name: '资源名称',
    type: '资源类型',
    description: '资源描述',
    siteId: '部署地点',
    status: '资源状态',
    head: '负责人',
    phoneNumber: '负责人电话'
})
// 添加应急资源表单
let addForm: any = reactive({
    name: '',
    type: '',
    description: '',
    siteId: '',
    status: '',
    head: '',
    phoneNumber: '',
})
// 编辑应急资源表单
let editForm: any = reactive({
    id: '',
    name: '',
    type: '',
    description: '',
    siteId: '',
    status: '',
    head: '',
    phoneNumber: ''
})
// 添加应急资源弹窗
let dialogFormVisible = ref(false)
// 编辑应急资源弹窗
let editDialogFormVisible = ref(false)
let formLabelWidth = ref('30rem')
let currentPage = ref(1)
let pagingItem = ref(5)
let tableData = ref([])
let searchtableData: any = ref([])
let totalNum = computed(() => {
    return tableData.value.length
})
let arr: any = ref([])

let headerCellStyle = reactive({
    fontSize: '1.7rem',
    textAlign: 'center',
    padding: '1rem 0'
})
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

//计算属性计算出分页后需要的用户信息
let newTableData = computed(() => {
    return searchtableData.value.slice(
        (currentPage.value - 1) * pagingItem.value,
        currentPage.value * pagingItem.value
    )
})

// interface resource {
//     name: string,
//     type: string,
//     description: string,
//     siteId: number,
//     status: string,
//     head: string,
//     phoneNumber: string
// }

//根据名称查询
const search = function () {
    let list = JSON.parse(JSON.stringify(tableData.value));
    let form: any = ref({
        name: {
            filter: (list: any) => {
                return !searchForm.name
                    ? list
                    : list.filter((item: any) => {
                        return item.name.includes(searchForm.name)
                    })
            }
        }
    })

    Object.keys(form.value).forEach((key: any) => {
        list = form.value[key].filter(list)
    })
    currentPage.value = 1
    searchtableData.value = list
}
// 添加应急资源
const addResource = function () {
    dialogFormVisible.value = true
    Object.assign(addForm, {
        name: '',
        type: '',
        description: '',
        siteId: '',
        status: '',
        head: '',
        phoneNumber: ''
    })
}
async function addInformation() {
    if (check(addForm)) {
        console.log(addForm);
        await addEmergencyResource(addForm).then(response => {
            ElMessage.success('添加成功！')
            emergencyResourceApi()

        }).catch(error => {
            ElMessage.warning('添加失败！')
        })
        console.log(factoryValue);
        dialogFormVisible.value = false;
    }
}
// 编辑某条应急资源
const editRow = (row: any) => {
    editDialogFormVisible.value = true;
    editForm.id = row.id;
    editForm.name = row.name;
    editForm.type = row.type;
    editForm.description = row.description;
    editForm.siteId = row.siteId;
    editForm.head = row.head;
    editForm.phoneNumber = row.phoneNumber;
    editForm.status = row.status;
}
async function submitEditInformation() {
    let params = {
        name: editForm.name,
        type: editForm.type,
        description: editForm.description,
        siteId: +editForm.siteId,
        status: editForm.status,
        head: editForm.head,
        phoneNumber: editForm.phoneNumber
    }
    await updateEmergencyResource(editForm.id, params).then((response: any) => {
        ElMessage.success('更新成功！')
        emergencyResourceApi();
    }).catch((error: any) => {
        console.log(error);
    });
    editDialogFormVisible.value = false;
}
// 查看详情
async function getEmergencyResourceApi(params: number) {
    let res = await getEmergencyResource(params);
    if (res.status == 200) {
        console.log(res.data, '查询成功');
    }
    arr.value = res.data;
    console.log('arr的value', arr.value);

}

// 删除某条应急资源
async function deleteRow(row: any) {
    await deleteEmergencyResource(row.id, {}).then(response => {
        ElMessage.success('删除成功！')
    }).catch(error => {
        ElMessage.warning(error.message)
    })
    emergencyResourceApi()
}
const open = function (row: any) {
    ElMessageBox.confirm(
        '确认要删除吗？',
        '是否删除',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteRow(row)
        })
}
// 获取应急资源列表
async function emergencyResourceApi() {
    await emergencyResource().then(response => {
        tableData.value = response.data;
        searchtableData.value = response.data;
        console.log(tableData.value);

    }).catch(error => {
        ElMessage.warning(error.message)
    })

}
let allArr = [
    {
        name: '呼吸过滤防毒面具',
        type: '防护救助',
        description: '保护人体呼吸器官不受外界有毒气体伤害的专用呼吸设置',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '防护眼镜',
        type: '防护救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '一次性防护口罩',
        type: '防护救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '橡胶手套',
        type: '防护救助',
        description: '无',
        siteId: 2,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '防护服',
        type: '防护救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '一次性帽子',
        type: '防护救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '一次性鞋套',
        type: '防护救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '急救医药箱',
        type: '消防救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '消防沙袋',
        type: '消防救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '消防桶',
        type: '消防救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '干粉灭火器',
        type: '消防救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: 'CO2灭火器',
        type: '消防救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '水基灭火器',
        type: '消防救助',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '铁锹',
        type: '设备工具',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '警戒带',
        type: '设备工具',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '应急手电',
        type: '设备工具',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '对讲机',
        type: '设备工具',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
    {
        name: '担架',
        type: '设备工具',
        description: '无',
        siteId: 1,
        status: 'approved',
        head: '卫鹏',
        phoneNumber: '17603592484'
    },
]

// const add=function() {
//     let promises: any = [];
//     allArr.forEach((params: any) => {
//         let promise = addEmergencyResource(params);
//         promises.push(promise)
//     })
//     const res = await Promise.all(promises);
//     console.log(res);
// }
emergencyResourceApi();
</script>
<style scoped lang="scss">
:deep(.el-dialog .el-input__wrapper) {
    flex-grow: 0 !important;
    width: 28rem !important;
}

:deep(.el-dialog .el-input__inner) {
    flex-grow: 0 !important;
    width: 28rem !important;
}

body {
    margin: 0;
    padding: 0;
}

.job-list {
    box-sizing: border-box;

    .main {
        box-sizing: border-box;

        .search {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            margin-top: 2rem;

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
            ::-webkit-scrollbar {
                width: 0;
                height: 0;
            }

            /*最外层透明*/

            .table-content::before {
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0;
                z-index: 3;
            }

            .table-clink {
                font-size: 1.5rem;
            }
        }

        .block {
            margin-top: 2rem;
        }
    }
}
</style>