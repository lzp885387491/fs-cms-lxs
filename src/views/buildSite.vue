<template>
    <div class="job-list">
        <div class="main">
            <div class="table-title">厂区建筑位置管理</div>
            <div class="search mt-2">
                <div class="search-left">
                    <el-input v-model="form.siteName" clearable size="large" class="ipt-search"
                        placeholder="根据建筑位置查询"></el-input>
                    <el-button type="primary" @click="search" size="large">搜索</el-button>
                </div>
                <el-button type="primary" @click="jobReport" size="large">添加位置</el-button>
                <!-- 添加事件弹层 -->
                <el-dialog title="添加建筑位置" v-model="dialogFormVisible" width="30%">
                    <el-form :model="addForm" size="mini">
                        <el-form-item label="位置名称" :label-width="formLabelWidth">
                            <el-input type="text" v-model="addForm.name" class="ipt" placeholder="位置名称"></el-input>
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
                <el-table :data="newTableData" class="table-content" style="width: 100%" :header-cell-style="headerCellStyle"
                    :cell-style="cellStyle">
                    <el-table-column prop="id" label="厂区位置id" width="auto"></el-table-column>
                    <el-table-column prop="name" label="厂区位置名称" width="auto"></el-table-column>
                    <el-table-column label="操作" width="auto">
                        <template #default="scope :any">
                            <el-button link type="primary" size="small" @click.prevent="modify(scope.row)">修改</el-button>
                            <el-button link type="primary" size="small" @click.prevent="detail(scope.row)">详情</el-button>
                            <el-button link type="primary" size="small" @click.prevent="open(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pagingItem"
                    layout="total, sizes, prev, pager, next, jumper" :total="val"></el-pagination>
            </div>
        </div>
    </div>
    <el-dialog title="修改建筑位置" v-model="updateDialog" width="30%">
                    <el-form :model="updateForm" size="mini">
                        <el-form-item label="位置名称" :label-width="formLabelWidth">
                            <el-input type="text" v-model="updateForm.name" class="ipt" placeholder="位置名称"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="updateDialog = false">取 消</el-button>
                            <el-button type="primary" @click="updateRow">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
                <!-- 详情 -->
                <el-dialog title="当前详情" v-model="detailDialog" width="30%">
                    <div class="m-20">{{ detailsForm.name }}</div>
                    <template #footer>
                    </template>
                </el-dialog>
</template>
<!-- details -->
<script setup lang="ts">
import { ElMessage,ElMessageBox } from 'element-plus'
import { reactive, ref, computed } from 'vue'
import { 
    siteList, 
    getSite, 
    addSite, 
    updateSite, 
    deleteSite
 } from '@/api/api'

let tableData = ref([])
let form = reactive({
    siteName: ''
})
let dialogFormVisible = ref(false)
let updateDialog = ref(false)
let detailDialog = ref(false)
let formLabelWidth = ref('15rem')
let currentPage = ref(1)
let pagingItem = ref(10)
// const addFormRule: any = reactive({
//     name: '厂区位置名称',
// })

let addForm = reactive({
    name: '',
})

let updateForm = reactive({
    name: '',
    id:1
})
let detailsForm = reactive({
    name: '',
    id:1
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

//   //计算属性计算出分页后需要的用户信息
let newTableData:any = computed(() => {
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
emer()
async function emer() {
    await siteList({}).then(res => {
        tableData.value = res.data
        searchtableData.value = res.data
        console.log(tableData);
    }).catch(res => {
        ElMessage.warning(res.message)
    })
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

// 删除
async function deleteRow(row: any) {
    await deleteSite(row.id, {}).then(res => {
        ElMessage.success('删除成功')
        emer()
    }).catch(res => {
        ElMessage.warning('该地点不能删除！！')
    })
}
// 更新
const modify = function(row: any){
    updateDialog.value = true
    Object.assign(updateForm,{
        name: row.name,
        id : row.id 
    })
}

async function updateRow() {
    await updateSite(updateForm.id, {
        name: updateForm.name,
    }).then(res=>{
        ElMessage.success('修改成功')
        updateDialog.value = false
        emer()
    }).catch(res=>{
        ElMessage.warning('修改失败！')
    })
}

// 校验
// function chek(data: any | undefined) {
//     // 如果传进来的是一个对象  则循环遍历每一个字段是否为空
//     // 如果传进来的值 是一个数组 就循环遍历每一项 判断每一项的值是否为空
//     // 如果传进来的值 是一个单独的字段 则就只校验该字段是否为空
//     let isType = Object.prototype.toString.call(data)
//     let flag = true
//     if (isType === '[object Object]') {
//         for (const key in data) {
//             if (data[key] === undefined || data[key] === '') {
//                 flag = false
//                 ElMessage({
//                     message: '请填写' + addFormRule[key],
//                     type: 'warning'
//                 })
//                 break
//             }
//         }
//     }
//     return flag
// }
// 添加
async function addInformation() {
    if(addForm.name == ''){
        return ElMessage.warning('厂区名称不能为空！！')
    }
        await addSite({
            name: addForm.name,
        }).then(res => {
            dialogFormVisible.value = false
            ElMessage.success('添加成功！')
            emer()
        }).catch(res => {
            console.log(res);
            ElMessage.warning('添加失败请重试！')
        })
}
// 搜索
const search = function () {
    let list = JSON.parse(JSON.stringify(tableData.value))
    let from1: any = ref({
        planName: {
            filter: (key: any) => {
                console.log(key);
                return !form.siteName
                    ? key
                    : key.filter((item: any) => {
                        return item.name.includes(form.siteName)
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
// // 详情
const detail = async function (row : any){
    detailDialog.value = true
    await getSite(row.id,{}).then(res=>{
        Object.assign(detailsForm,{
        name: res.data.name,
    })
    }).catch(err=>{
        console.log(err);
    })
}

const jobReport = function () {
    dialogFormVisible.value = true
    Object.assign(addForm, {
        name: '',
    })
}
</script>
<style scoped lang="scss">
.m-20{
    margin: 2rem;
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

                .clear {
                    margin: 0;
                }

                .ipt-search {
                    width: 30rem;
                }
            }

            .ipt {
                width: 28rem;
            }
        }

        .table {
            margin-top: 2rem;

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

        .block {
            margin-top: 2rem;
        }
    }
}
</style>