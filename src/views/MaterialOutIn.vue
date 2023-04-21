<template>
    <div class="job-list">
        <div class="main">
            <div class="table-title">物资出入库</div>
            <div class="search">
                <div class="search-left">
                    <el-input v-model="searchForm.name" clearable size="large" class="ipt-search"
                        placeholder="根据名称查询"></el-input>

                    <el-button type="primary" @click="search" size="large">搜索</el-button>
                </div>
                <el-button type="primary" @click="addResource" size="large">添加物资</el-button>
                <el-dialog title="添加物资" v-model="dialogFormVisible" width="50%">
                    <el-form :model="addForm" size="mini">
                        <el-form-item label="资源" :label-width="formLabelWidth">
                            <el-select v-model="addForm.resourceId" class="m-2" placeholder="请选择资源名称">
                                <el-option v-for="item in resourceList" :key="item.id" :label="item.name"
                                    :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="事件" :label-width="formLabelWidth">
                            <el-select v-model="addForm.eventId" class="m-2" placeholder="请选择事件名称">
                                <el-option v-for="item in eventList" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="负责人" :label-width="formLabelWidth">
                            <el-select v-model="addForm.workerId" class="m-2" placeholder="请选择负责人">
                                <el-option v-for="item in userList" :key="item.id" :label="item.avatarName"
                                    :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="任务状态" :label-width="formLabelWidth">
                            <el-input v-model="addForm.taskStatus" autocomplete="off" placeholder="请输入任务状态"></el-input>

                        </el-form-item>
                        <el-form-item label="派发时间" :label-width="formLabelWidth">

                            <el-date-picker v-model="addForm.dispatchTime" type="datetime" placeholder="选择派发时间"
                                format="YYYY/MM/DD HH:mm:ss" />


                            <!-- <el-input v-model="addForm.dispatchTime" autocomplete="off" placeholder="请输入派发时间"></el-input> -->

                        </el-form-item>
                        <el-form-item label="完成时间" :label-width="formLabelWidth">
                            <el-date-picker v-model="addForm.finishTime" type="datetime" placeholder="选择完成时间"
                                format="YYYY/MM/DD HH:mm:ss" />
                            <!-- <el-input v-model="addForm.finishTime" autocomplete="off" placeholder="请输入完成时间"></el-input> -->
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                            <el-button type="primary" @click="addInformation" size="mini">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
                <el-dialog title="修改物资" v-model="editDialogFormVisible" width="50%">
                    <el-form :model="editForm" size="mini">
                        <el-form-item label="资源" :label-width="formLabelWidth">
                            <el-select v-model="editForm.resourceId" class="m-2" placeholder="请选择资源名称">
                                <el-option v-for="item in resourceList" :key="item.id" :label="item.name"
                                    :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="事件" :label-width="formLabelWidth">
                            <el-select v-model="editForm.eventId" class="m-2" placeholder="请选择事件名称">
                                <el-option v-for="item in eventList" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="负责人" :label-width="formLabelWidth">
                            <el-select v-model="editForm.workerId" class="m-2" placeholder="请选择负责人">
                                <el-option v-for="item in userList" :key="item.id" :label="item.avatarName"
                                    :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="任务状态" :label-width="formLabelWidth">
                            <el-input v-model="editForm.taskStatus" autocomplete="off" placeholder="请输入任务状态"></el-input>

                        </el-form-item>
                        <el-form-item label="派发时间" :label-width="formLabelWidth">
                            <el-date-picker v-model="editForm.dispatchTime" type="datetime" placeholder="选择派发时间"
                                format="YYYY/MM/DD HH:mm:ss" />

                        </el-form-item>
                        <el-form-item label="完成时间" :label-width="formLabelWidth">
                            <el-date-picker v-model="editForm.finishTime" type="datetime" placeholder="选择完成时间"
                                format="YYYY/MM/DD HH:mm:ss" />
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
                    :header-cell-style="headerCellStyle" :cell-style="cellStyle" >
                    <el-table-column type="index" label="序号" width="100" />
                    <el-table-column prop="resource.name" label="物资" width="auto"></el-table-column>
                    <el-table-column prop="event.name" label="事件" width="auto">

                    </el-table-column>
                    <el-table-column prop="worker.avatarName" label="负责人" width="auto"></el-table-column>
                    <el-table-column prop="taskStatus" label="任务状态" width="auto">
                    </el-table-column>
                    <el-table-column label="派发时间" width="auto">
                        <template #default="scope">
                            <div>{{ getTime(scope.row.dispatchTime) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column  label="完成时间" width="auto">
                        <template #default="scope">
                            <div>{{ getTime(scope.row.finishTime) }}</div>
                        </template>
                    </el-table-column>
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
// import { factorySiteApi, emergencyResource, addResourceRecordApi, deleteEmergencyResource, updateEmergencyResource, getResourceRecordApi } from '@/api/api'
import { addResourceRecordApi, getResourceRecordApi, deleteResourceRecordApi, updateResourceRecordApi } from '@/api/api'
import { emergencyResource, emergencyEventList, getUserListApi } from '@/api/api'
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
const getTime=function(time:any){
    return time.replace('T',' ').replace('Z','')
}
// 应急资源
let resourceList: any = ref([])
// 应急事件
let eventList: any = ref([])
// 用户信息
let userList: any = ref([])

// 添加规则
const addFormRule: any = reactive({
    eventId: '事件',
    resourceId: '资源',
    workerId: '负责人',
    taskStatus: '任务状态',
    dispatchTime: '派发时间',
    finishTime: '完成时间',
})
// 添加应急资源表单
let addForm: any = reactive({
    eventId: '',
    resourceId: '',
    workerId: '',
    taskStatus: '',
    dispatchTime: '',
    finishTime: '',
})
// 编辑表单
let editForm: any = reactive({
    id: '',
    eventId: '',
    resourceId: '',
    workerId: '',
    taskStatus: '',
    dispatchTime: '',
    finishTime: '',
})
// 添加弹窗
let dialogFormVisible = ref(false)
// 编辑弹窗
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
    // console.log('计算属性成功：', searchtableData.value);
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
                        // console.log(item, searchForm.name);
                        return item.resource.name.includes(searchForm.name)
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
        eventId: '',
        resourceId: '',
        workerId: '',
        taskStatus: '',
        dispatchTime: '',
        finishTime: '',
    })
}
// 提交添加信息的表单
async function addInformation() {
    if (check(addForm)) {
        // console.log(typeof addForm.dispatchTime);
        await addResourceRecordApi(addForm).then(response => {
            ElMessage.success('添加成功！')
            getResourceRecord()
        }).catch(error => {
            ElMessage.warning('添加失败！')
        })
        dialogFormVisible.value = false;
    }
}
// 编辑某条数据
const editRow = (row: any) => {
    editDialogFormVisible.value = true;
    editForm.id = row.id;
    editForm.eventId = row.eventId;
    editForm.resourceId = row.resourceId;
    editForm.workerId = row.workerId;
    editForm.taskStatus = row.taskStatus;
    editForm.dispatchTime = row.dispatchTime;
    editForm.finishTime = row.finishTime;
}
async function submitEditInformation() {
    let params = {
        eventId: editForm.eventId,
        resourceId: editForm.resourceId,
        workerId: editForm.workerId,
        taskStatus: editForm.taskStatus,
        dispatchTime: editForm.dispatchTime,
        finishTime: editForm.finishTime,
    }
    // console.log(params);

    await updateResourceRecordApi(editForm.id, params).then(response => {
        getResourceRecord()
        ElMessage.success('更新成功！')
        // console.log('更新成功！');

    }).catch(error => {
        // console.log(error);

    })
    editDialogFormVisible.value = false;
}

// 删除某条记录
async function deleteRow(row: any) {
    await deleteResourceRecordApi(row.id, {}).then(response => {
        ElMessage.success('删除成功！')
    }).catch(error => {
        ElMessage.warning(error.message)
    })
    getResourceRecord()

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
async function getResourceRecord() {
    await getResourceRecordApi().then(response => {
        tableData.value = response.data.data;
        searchtableData.value = response.data.data;
        // console.log('tableData', tableData.value);
        // console.log('searchtableData', searchtableData.value);
    }).catch(error => {
        // console.log(error);
    })
}

getResourceRecord()
// 获取应急资源列表
async function emergencyResourceApi() {
    await emergencyResource().then(response => {
        // console.log('应急资源列表有：', response.data);
        resourceList.value = response.data;

    })
}
emergencyResourceApi()//得到应急资源列表
// 获取应急事件列表
async function emergencyEventListApi() {
    await emergencyEventList().then(response => {
        // console.log('应急事件列表有：', response.data);
        eventList.value = response.data;
    })
}
emergencyEventListApi()//得到应急事件列表
// 获取用户信息列表
async function getUserList() {
    await getUserListApi().then(response => {
        // console.log('用户信息列表有：', response.data.data);
        userList.value = response.data.data;
    })
}
getUserList();//得到用户列表
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
    padding: 20px;

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