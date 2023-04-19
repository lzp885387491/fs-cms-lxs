<template>
    <div class="job-list">
        <div class="main">
            <div class="table-title">应急救援物资</div>
            <div class="search">
                <div class="search-left">
                    <el-input v-model="form.name" clearable size="large" class="ipt-search"
                        placeholder="根据资源名称查询"></el-input>

                    <el-button type="primary" @click="search" size="large">搜索</el-button>
                </div>
                <el-button type="primary" @click="addResource" size="large">添加应急资源</el-button>
                <el-dialog title="添加应急资源" v-model="dialogFormVisible" width="50%">
                    <el-form :model="addForm" size="mini">
                        <el-form-item label="资源名称" :label-width="formLabelWidth">
                            <el-input v-model="addForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="资源类型" :label-width="formLabelWidth">
                            <el-input v-model="addForm.type" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="资源描述" :label-width="formLabelWidth">
                            <el-input v-model="addForm.description" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="部署地点" :label-width="formLabelWidth">
                            <el-input v-model="addForm.siteId" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="资源状态" :label-width="formLabelWidth">
                            <el-input v-model="addForm.status" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人" :label-width="formLabelWidth">
                            <el-input v-model="addForm.head" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人电话" :label-width="formLabelWidth">
                            <el-input v-model="addForm.phoneNumber" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                            <el-button  type="primary" @click="addInformation" size="mini">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
            <div class="table mt-2">
                <el-table :data="newTableData" class="table-content" style="width: 100%"
                    :header-cell-style="headerCellStyle" :cell-style="cellStyle">
                    <el-table-column type="index" label="序号" width="100" />
                    <el-table-column prop="name" label="资源名称" width="auto"></el-table-column>
                    <el-table-column prop="type" label="资源类型" width="auto"></el-table-column>
                    <el-table-column prop="description" label="资源描述" width="auto"></el-table-column>
                    <el-table-column prop="siteId" label="部署地点" width="auto"></el-table-column>
                    <el-table-column prop="status" label="资源状态" width="auto"></el-table-column>
                    <el-table-column prop="head" label="负责人" width="auto"></el-table-column>
                    <el-table-column prop="phoneNumber" label="负责人电话" width="auto"></el-table-column>
                    <el-table-column label="操作" width="auto">
                        <template #default="scope">
                            <el-button link type="primary" size="small"
                                @click.prevent="deleteRow(scope.row)">删除</el-button>
                            <el-button link type="primary" size="small"
                                @click.prevent="editRow(scope.row)">编辑</el-button>
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
import { ElMessage } from 'element-plus'
import { reactive, ref, computed } from 'vue'
import { emergencyResource,addEmergencyResource,deleteEmergencyResource,updateEmergencyResource,getEmergencyResource } from '@/api/api'
let form = reactive({
    name: ''
})

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
const addFormRule: any = reactive({
    name: '资源名称',
    type: '资源类型',
    description: '资源描述',
    siteId: '部署地点',
    status: '资源状态',
    head: '负责人',
    phoneNumber: '负责人电话'
})
let addForm: any = reactive({
    name: '',
    type: '',
    description: '',
    siteId: 1,
    status: '',
    head: '',
    phoneNumber: ''
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('120px')
let currentPage = ref(1)
let pagingItem = ref(5)
let tableData = ref([])
let searchtableData:any=ref(tableData)
let totalNum = computed(() => {
    console.log(tableData.value.length);
    return tableData.value.length
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

const handleSizeChange = function (val: any) {
    pagingItem.value = val
    console.log(pagingItem.value)
}
const handleCurrentChange = function (val: any) {
    currentPage.value = val
    console.log(val)
    console.log(currentPage.value)
}
//计算属性计算出分页后需要的用户信息
let newTableData = computed(() => {
    return searchtableData.value.slice(
        (currentPage.value - 1) * pagingItem.value,
        currentPage.value * pagingItem.value
    )
})
async function getEmergencyResourceApi(params:number){
    let res=await getEmergencyResource(params);
    if(res.status==200){
        console.log(res.data+'查询成功');
        
    }
}
interface  resource{
    name:string,
    type:string,
    description:string,
    siteId:number,
    status:string,
    head:string,
    phoneNumber:string
}
async function addEmergencyResourceApi(params:resource) {
    let res=await addEmergencyResource(params);
    if(res.status==200){
        // console.log(res);
        
        console.log(res.data+'添加成功');
 
        
    }
}
const addInformation = function () {
    if (check(addForm)) {
        console.log(addForm);
        addEmergencyResourceApi(addForm);
        emergencyResourceApi()
        dialogFormVisible.value = false;
        ElMessage({
            message: '创建成功',
            type: 'success'
        })
    }
}
const search = function () {
    let list=reactive(JSON.parse(JSON.stringify(tableData)));
    let from: any = ref({
        name: {
            filter: (list: any) => {
                return !form.name
                    ? list
                    : list.filter((item: any) => {
                        return item.name.includes(form.name)
                    })
            }
        }
    })

    Object.keys(from).forEach((key: any) => {
        list.values = from[key].filter(list)
        console.log(list)
    })
    currentPage.value = 1
    searchtableData.value = list.values
}
const addResource = function () {
    dialogFormVisible.value = true
    Object.assign(addForm, {
        name: '',
        type:'',
        description:'',
        siteId:1,
        status:'',
        head:'',
        phoneNumber:''
    })
}
const deleteRow = (row:any) => {
    deleteEmergencyResourceApi(row.id);
    emergencyResourceApi()
}
const editRow=(row:any)=>{
    console.log(row.id);
    dialogFormVisible.value=true;

    // updateEmergencyResourceApi
    
}
async function updateEmergencyResourceApi(params:number) {
    let res=await updateEmergencyResource(params);

    console.log(res);
    
}
async function deleteEmergencyResourceApi(params:number) {
    let res=await deleteEmergencyResource(params);
    console.log(res);
    
}

async function emergencyResourceApi() {
    let res=await emergencyResource();
    // console.log(res.data);
    tableData.value=res.data; 
  
    
}
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