<template>
    <div class="job-list">
        <div class="main">
            <div class="table-title">应急事件管理</div>
            <div class="search mt-2">
                <div class="search-left">
                    <el-input v-model="form.eventName" clearable size="large" class="ipt-search"
                        placeholder="根据事件名称查询"></el-input>
                    <el-button type="primary" @click="search" size="large">搜索</el-button>
                </div>
                <el-button type="primary" @click="jobReport" size="large">添加事件</el-button>
                <!-- 添加事件弹层 -->
                <el-dialog title="添加应急事件信息" v-model="dialogFormVisible" width="30%">
                    <el-form :model="addForm" size="mini">
                        <el-form-item label="事件名称" :label-width="formLabelWidth">
                            <el-input type="text" v-model="addForm.name" class="ipt" placeholder="事件名称"></el-input>
                        </el-form-item>
                        <el-form-item label="事件级别" :label-width="formLabelWidth">
                            <el-input type="text" v-model="addForm.level" class="ipt" placeholder="事件级别"></el-input>
                        </el-form-item>
                        <el-form-item label="事件描述" :label-width="formLabelWidth">
                            <el-input type="text" v-model="addForm.description" class="ipt" placeholder="事件描述"></el-input>
                        </el-form-item>
                        <el-form-item label="部署地点" :label-width="formLabelWidth">
                            <el-select v-model="addForm.site_id" class="m-2" placeholder="请选择厂区">
                                <el-option v-for="item in factoryInfo" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="事件类型" :label-width="formLabelWidth">
                            <el-input type="text" v-model="addForm.type" class="ipt" placeholder="事件类型"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addInformation">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
            <div class="table mt-2">
                <el-table :data="newTableData" class="table-content" style="width: 100%"
                    :header-cell-style="headerCellStyle" :cell-style="cellStyle">
                    <el-table-column class="chao" prop="name" label="应急事件名称" width="auto"></el-table-column>
                    <el-table-column class="chao" prop="level" label="应急事件级别" width="auto"></el-table-column>
                    <el-table-column class="chao" prop="description" label="应急事件描述" width="auto"></el-table-column>
                    <el-table-column class="chao" label="事件站点" width="auto">
                        <template #default="scope: any">
                            <div>{{ getSiteName(scope.row.siteId) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column class="chao" prop="type" label="事件类型" width="auto"></el-table-column>
                    <el-table-column label="操作" width="auto">
                        <template #default=" scope: any ">
                            <el-button link type="primary" size="small" @click.prevent=" modify(scope.row) ">修改</el-button>
                            <el-button link type="primary" size="small" @click.prevent=" detail(scope.row) ">详情</el-button>
                            <el-button link type="primary" size="small"
                                @click.prevent=" deleteRow(scope.row) ">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change=" handleSizeChange " @current-change=" handleCurrentChange "
                    :current-page=" currentPage " :page-sizes=" [5, 10, 15, 20] " :page-size=" pagingItem "
                    layout="total, sizes, prev, pager, next, jumper" :total=" val "></el-pagination>
            </div>
        </div>
    </div>
    <el-dialog title="修改应急事件信息" v-model=" updateDialog " width="30%">
        <el-form :model=" updateForm " size="mini">
            <el-form-item label="事件名称" :label-width=" formLabelWidth ">
                <el-input type="text" v-model=" updateForm.name " class="ipt" placeholder="事件名称"></el-input>
            </el-form-item>
            <el-form-item label="事件级别" :label-width=" formLabelWidth ">
                <el-input type="text" v-model=" updateForm.level " class="ipt" placeholder="事件级别"></el-input>
            </el-form-item>
            <el-form-item label="事件描述" :label-width=" formLabelWidth ">
                <el-input type="text" v-model=" updateForm.description " class="ipt" placeholder="事件描述"></el-input>
            </el-form-item>
            <el-form-item label="部署地点" :label-width=" formLabelWidth ">
                <el-select v-model=" updateForm.siteId " class="ipt" placeholder="请选择厂区">
                    <el-option v-for="  item   in   factoryInfo  " :key=" item.id " :label=" item.name " :value=" item.id " />
                </el-select>
            </el-form-item>
            <el-form-item label="事件类型" :label-width=" formLabelWidth ">
                <el-input type="text" v-model=" updateForm.type " class="ipt" placeholder="事件类型"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click=" updateDialog = false ">取 消</el-button>
                <el-button type="primary" @click=" updateRow ">确 定</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog title="当前详情" v-model=" detailDialog " width="30%">
        <div class="m-20">事件名称：{{ detailsForm.name }}</div>
        <div class="m-20">事件级别：{{ detailsForm.level }}</div>
        <div class="m-20">事件位置：{{ detailsForm.siteId }}</div>
        <div class="m-20">事件类型：{{ detailsForm.type }}</div>
        <div class="m-20">事件描述：{{ detailsForm.description }}</div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click=" detailDialog = false ">取 消</el-button>
                <el-button type="primary" @click=" updateRow ">确 定</el-button>
            </span>
        </template>
    </el-dialog>


    <!-- 详情 -->
    <!-- <el-dialog title="当前详情" v-model="updateDialog" width="30%">
                    <el-form :model="detailsForm" size="mini">
                        <el-form-item label="事件名称" :label-width="formLabelWidth">
                            <el-input type="text" :value="detailsForm.name" v-model="detailsForm.name" class="ipt" placeholder="事件名称"></el-input>
                        </el-form-item>
                        <el-form-item label="事件级别" :label-width="formLabelWidth">
                            <el-input type="text" v-model="detailsForm.level" class="ipt" placeholder="事件级别"></el-input>
                        </el-form-item>
                        <el-form-item label="事件描述" :label-width="formLabelWidth">
                            <el-input type="text" v-model="detailsForm.description" class="ipt" placeholder="事件描述"></el-input>
                        </el-form-item>
                        <el-form-item label="事件站点" :label-width="formLabelWidth">
                            <el-input type="text" v-model="detailsForm.siteId" class="ipt" placeholder="事件站点"></el-input>
                        </el-form-item>
                        <el-form-item label="事件类型" :label-width="formLabelWidth">
                            <el-input type="text" v-model="detailsForm.type" class="ipt" placeholder="事件类型"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="updateDialog = false">取 消</el-button>
                            <el-button type="primary" @click="updateRow">确 定</el-button>
                        </span>
                    </template>
                </el-dialog> -->
</template>
<!-- details -->
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref, computed, onMounted } from 'vue'
import {
    emergencyEventList,
    deleteEmergencyEvent,
    addEmergencyEvent,
    updateEmergencyEvent,
    getEmergencyEvent,
    factorySiteApi
} from '@/api/api'

let tableData = ref([])
let form = reactive({
    eventName: ''
})
let dialogFormVisible = ref(false)
let updateDialog = ref(false)
let detailDialog = ref(false)
let formLabelWidth = ref('15rem')
let currentPage = ref(1)
let pagingItem = ref(5)
const addFormRule: any = reactive({
    name: '应急事件名称',
    level: '应急事件级别',
    description: '应急事件描述',
    site_id: '事件站点',
    type: '事件类型',
})

let addForm = reactive({
    name: '',
    site_id: 1,
    level: '',
    description: '',
    type: ''
})

let updateForm = reactive({
    name: '',
    siteId: 1,
    level: '',
    description: '',
    type: '',
    id: 1
})
let detailsForm = reactive({
    name: '',
    siteId: 1,
    level: '',
    description: '',
    type: '',
    id: 1
})

let searchtableData = ref([])
let val = computed(() => {
    return searchtableData.value.length
})

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

onMounted(async () => {
    await getFactorySite()
    emer()
})

// 获取地点名称
const getSiteName = function (id: any) {
    return factoryInfo.value.find((item: any) => {
        return item.id == id
    }).name
}
let factoryInfo: any = ref([])
async function getFactorySite() {
    await factorySiteApi().then(response => {
        factoryInfo.value = response.data;
    }).catch(error => {
        console.log(error);

    })
}


//   //计算属性计算出分页后需要的用户信息
let newTableData: any = computed(() => {
    return searchtableData.value.slice(
        (currentPage.value - 1) * pagingItem.value,
        currentPage.value * pagingItem.value
    )
})
const handleSizeChange = function (val: any) {
    pagingItem.value = val
}
const handleCurrentChange = function (val: any) {
    currentPage.value = val
}

// 获取列表
async function emer() {
    await emergencyEventList({}).then(res => {
        tableData.value = res.data
        searchtableData.value = res.data
    }).catch(res => {
        ElMessage.warning(res.message)
    })
}

// 删除
async function deleteRow(row: any) {
    await deleteEmergencyEvent(row.id, {}).then(res => {
        ElMessage.success('删除成功')
        emer()
    }).catch(res => {
        ElMessage.warning('删除失败！！')
    })
}
// 更新
const modify = function (row: any) {
    updateDialog.value = true
    Object.assign(updateForm, {
        name: row.name,
        siteId: row.siteId,
        level: row.level,
        description: row.description,
        type: row.type,
        id: row.id
    })
}

async function updateRow() {
    await updateEmergencyEvent(updateForm.id, {
        name: updateForm.name,
        siteId: +updateForm.siteId,
        level: updateForm.level,
        description: updateForm.description,
        type: updateForm.type
    }).then(res => {
        ElMessage.success('修改成功')
        updateDialog.value = false
        emer()
    }).catch(res => {
        ElMessage.warning('修改失败！')
    })
}

// 校验
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
                console.log(key)
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
// 添加
async function addInformation() {
    if (chek(addForm)) {
        await addEmergencyEvent({
            name: addForm.name,
            siteId: addForm.site_id,
            level: addForm.level,
            description: addForm.description,
            type: addForm.type
        }).then(res => {
            dialogFormVisible.value = false
            ElMessage.success('添加成功！')
            emer()
        }).catch(res => {
            console.log(res);
            ElMessage.warning('添加失败请重试！')
        })
    }
}
// 搜索
const search = function () {
    let list = JSON.parse(JSON.stringify(tableData.value))
    let from1: any = ref({
        planName: {
            filter: (key: any) => {
                console.log(key);
                return !form.eventName
                    ? key
                    : key.filter((item: any) => {
                        return item.name.includes(form.eventName)
                    })
            }
        }
    })
    Object.keys(from1.value).forEach((key1: any) => {
        list = from1.value[key1].filter(list)
    })
    currentPage.value = 1
    searchtableData.value = list
}
// 详情
const detail = async function (row: any) {
    detailDialog.value = true
    await factorySiteApi().then(response => {
        factoryInfo.value = response.data;
    }).catch(error => {
        console.log(error);
    })
    const getSiteName = function (id: any) {
    return factoryInfo.value.find((item: any) => {
        return item.id == id
    }).name
}
    await getEmergencyEvent(row.id, {}).then(res => {
        Object.assign(detailsForm,{
        name: res.data.name,
        level: res.data.level,
        siteId: getSiteName(res.data.siteId),
        type: res.data.type,
        description: res.data.description,
    })
    }).catch(err => {
        ElMessage.warning('暂不支持查看详情，请查看问题！！！')
    })
}

const jobReport = function () {
    dialogFormVisible.value = true
    Object.assign(addForm, {
        name: '',
        site_id: 1,
        level: '',
        description: '',
        type: ''
    })
}
</script>
<style scoped lang="scss">
.m-20{
    margin: 2rem;
    word-wrap: break-word;
}
.job-list {
    padding: 20px;
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

                .ipt-search {
                    width: 30rem;
                }
            }

        }
    }
}

.block {
    margin-top: 2rem;
}

::v-deep(.cell) {
    overflow: hidden; //超出的文本隐藏
    display: -webkit-box;
    -webkit-line-clamp: 1; // 超出多少行
    -webkit-box-orient: vertical;
}
</style>