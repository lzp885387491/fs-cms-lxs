<template>
    <div class="job-list">
        <div class="main">
            <div class="table-title">园区公司列表</div>
            <div class="search mt-2">
                <div class="search-left">
                    <el-input v-model="form.name" clearable size="large" class="ipt-search" placeholder="根据公司名称"></el-input>
                    <el-button type="primary" @click="search" size="large">搜索</el-button>
                </div>
                <el-button type="primary" @click="jobReport" size="large">添加园区公司</el-button>
                <el-dialog title="园区公司" v-model="dialogFormVisible" width="50%">
                    <el-form :model="addForm" size="mini">
                        <el-form-item label="公司名称" :label-width="formLabelWidth">
                            <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item label="公司地址" :label-width="formLabelWidth">
                            <el-input v-model="addForm.address" autocomplete="off" placeholder="请输入公司地址"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" :label-width="formLabelWidth">
                            <el-input v-model="addForm.contact_person" autocomplete="off" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" :label-width="formLabelWidth">
                            <el-input type="number" v-model="addForm.contact_tel" autocomplete="off"
                                placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="addInformation" size="mini">确 定</el-button>
                    </template>
                </el-dialog>
            </div>
            <div class="table">
                <el-table :data="newTableData" class="table-content" style="width: 100%"
                    :header-cell-style="headerCellStyle" :cell-style="cellStyle">
                    <el-table-column prop="id" label="id" width="auto"></el-table-column>
                    <el-table-column prop="name" label="公司名称" width="auto"></el-table-column>
                    <el-table-column prop="address" label="地址" width="auto"></el-table-column>
                    <el-table-column prop="contact_person" label="联系人" width="auto"></el-table-column>
                    <el-table-column prop="contact_tel" label="联系电话" width="auto"></el-table-column>
                    <el-table-column prop="operate" label="操作" width="auto">
                        <template #default="scope">
                            <el-button link type="primary" size="small">编辑</el-button>
                            <el-button link type="primary" size="small"
                                @click.prevent="deleteRow(scope.$index)">删除</el-button>
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
</template>
<script setup lang="ts">
import { createEnterpriseList, getEnterpriseList } from '@/api/api';
import { ElMessage } from 'element-plus'
import { reactive, ref, computed } from 'vue'
const size = ref<'default' | 'large' | 'small'>('default')
let form = reactive({
    name: ''
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
    id: 'id',
    name: '公司名称',
    address: '公司地址',
    contact_person: '联系人',
    contact_tel: '联系电话',
})
const addForm = reactive({
    id: '',
    name: '',
    address: '',
    contact_person: '',
    contact_tel: '',
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('120px')
let currentPage = ref(1)
let pagingItem = ref(5)
let tableData = reactive([
    {
        id: '2023-01-01',
        name: '排放',
        address: '08:00',
        contact_person: '更换阀门',
        contact_tel: '10',
        submit_time: '2023-01-02 18:00',
        status: '陈海峰'
    },
    {
        id: '2023-01-02',
        name: '自查',
        address: '10:00',
        contact_person: '维护设备',
        contact_tel: '5',
        submit_time: '2023-01-02 15:00',
        status: '方杰本'
    },
    {
        id: '2023-01-03',
        name: '检查',
        address: '12:00',
        contact_person: '检修管道',
        contact_tel: '7',
        submit_time: '2023-01-03 19:00',
        status: '盖瑞'
    },
    {
        id: '2023-01-05',
        name: '防爆',
        address: '09:00',
        contact_person: '更换电缆',
        contact_tel: '8',
        submit_time: '2023-01-05 17:00',
        status: '梁海'
    },
    {
        id: '2023-01-06',
        name: '安检',
        address: '13:00',
        contact_person: '维修变压器',
        contact_tel: '6',
        submit_time: '2023-01-06 19:00',
        status: '高挺'
    },
    {
        id: '2023-01-07',
        name: '改造',
        address: '11:00',
        contact_person: '升级泵站',
        contact_tel: '12',
        submit_time: '2023-01-08 11:00',
        status: '路方云'
    },
    {
        id: '2023-01-08',
        name: '维修',
        address: '14:00',
        contact_person: '更换仪表',
        contact_tel: '3',
        submit_time: '2023-01-08 17:00',
        status: '毛亚波'
    },
    {
        id: '2023-01-09',
        name: '安装',
        address: '07:00',
        contact_person: '新建过滤器',
        contact_tel: '16',
        submit_time: '2023-01-10 23:00',
        status: '毛世爱'
    },
    {
        id: '2023-01-11',
        name: '维护',
        address: '10:30',
        contact_person: '检修换热器',
        contact_tel: '8',
        submit_time: '2023-01-11 18:30',
        status: '王志亮'
    },
    {
        id: '2023-01-12',
        name: '更换',
        address: '15:00',
        contact_person: '更换泵轮',
        contact_tel: '4',
        submit_time: '2023-01-12 19:00',
        status: '王淑刚'
    }
])
let searchtableData = ref(tableData)
let val = computed(() => {
    return searchtableData.value.length
})
let headerCellStyle = reactive({
    fontSize: '1.7rem',
    textAlign: 'center',
    padding: '1rem 0'
})
const deleteRow = (index: number) => {
    let arr = tableData;
    arr.splice((currentPage.value - 1) * pagingItem.value + index, 1)
    tableData = arr;
    ElMessage({
        message: '删除成功',
        type: 'success'
    })
}
let cellStyle = reactive({
    textAlign: 'center',
    fontSize: '1.5rem',
    padding: '1rem 0'
})
const handleSizeChange = function (val: any) {
    pagingItem.value = val
    console.log(pagingItem.value)

    console.log(val)
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
const addInformation = async function () {
    if (chek(addForm)) {
        tableData.push(addForm)
        dialogFormVisible.value = false
        ElMessage({
            message: '创建成功',
            type: 'success'
        })
    }
    // let { name, address, contact_person, contact_tel } = addForm
    // let res = await createEnterpriseList({
    //     name,
    //     address,
    //     contact_person,
    //     contact_tel
    // })
    // if (res) {
    //     console.log(res);
    // }
}
const getEnterpriseInfo = async function () {
    let res = await getEnterpriseList()
    console.log(res);
}
getEnterpriseInfo()
const search = function () {
    let list = reactive(JSON.parse(JSON.stringify(tableData)))
    let from1: any = reactive({
        name: {
            filter: (key: any) => {
                return !form.name
                    ? key
                    : key.filter((item: any) => {
                        return item.name.includes(form.name)
                    })
            }
        }
    })
    console.log(list)

    Object.keys(from1).forEach((key1: any) => {
        list.values = from1[key1].filter(list)
        console.log(list)
    })
    currentPage.value = 1
    console.log(list)

    searchtableData.value = list.values
    console.log(searchtableData)
}
const jobReport = function () {
    dialogFormVisible.value = true
    Object.assign(addForm, {
        id: '',
        name: '',
        address: '',
        contact_person: '',
        contact_tel: '',
    })
}
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
</style>