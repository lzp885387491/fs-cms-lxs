<template>
    <div class="job-list">
        <div class="main">
            <div class="table-title">隐患管理</div>
            <div class="search mt-2">
                <div class="search-left">
                    <el-input v-model="form.pre_conditions" clearable size="large" class="ipt-search"
                        placeholder="根据安全隐患查询"></el-input>
                    <el-button type="primary" @click="search" size="large">搜索</el-button>
                </div>
                <el-button type="primary" @click="jobReport" size="large">添加记录</el-button>
                <el-dialog title="作业报备" v-model="dialogFormVisible" width="50%">
                    <el-form :model="addForm" size="mini">
                        <el-form-item label="排查出的安全隐患" :label-width="formLabelWidth">
                            <el-input v-model="addForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="整改措施" :label-width="formLabelWidth">
                            <el-input v-model="addForm.measure" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="责任领导" :label-width="formLabelWidth">
                            <el-input v-model="addForm.leading" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="整改时限" :label-width="formLabelWidth">
                            <el-date-picker v-model="addForm.deadlineTimer" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="完成时间" :label-width="formLabelWidth">
                            <el-input v-model="addForm.timer" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="完成情况" :label-width="formLabelWidth">
                            <el-input v-model="addForm.result" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="验收责任人" :label-width="formLabelWidth">
                            <el-input v-model="addForm.Person" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="addInformation" size="mini">确 定</el-button>
                    </template>
                </el-dialog>
            </div>
            <div class="table mt-2">
                <el-table :data="newTableData" :border="true" class="table-content" style="width: 100%"
                    :header-cell-style="headerCellStyle" :cell-style="cellStyle">
                    <el-table-column prop="name" label="排查出的安全隐患" width="auto"></el-table-column>
                    <el-table-column prop="measure" label="整改措施" width="auto"></el-table-column>
                    <el-table-column prop="leading" label="责任领导" width="auto"></el-table-column>
                    <el-table-column prop="deadlineTimer" label="整改时限" width="auto"></el-table-column>
                    <el-table-column prop="timer" label="完成时间" width="auto">
                        <template #default="scoped">{{ Dates(scoped.row.timer) }}</template>
                    </el-table-column>
                    <el-table-column prop="result" label="完成情况" width="auto"></el-table-column>
                    <el-table-column prop="Person" label="验收责任人" width="auto"></el-table-column>
                    <el-table-column label="操作" width="auto">
                        <template #default="scope">
                            <el-popover :visible="visible" placement="top" :width="160">
                                <p>确定要删除此数据嘛?</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="small" text @click="visible = false">取消</el-button>
                                    <el-button size="small" type="primary" @click="visible = false">确定</el-button>
                                </div>
                                <template #reference>
                                    <el-button @click="deleteRow(scope.$index)" type="text" class="table-clink"
                                        size="small">删除</el-button>
                                </template>
                            </el-popover>
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
import { ElMessage } from 'element-plus'
import { reactive, ref, computed } from 'vue'
const visible = ref(false)
let form = reactive({
    pre_conditions: ''
})
function chek(data: any | undefined) {
    console.log(data);
    
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
    name: '排查出的安全隐患',
    measure: '整改措施',
    leading: '责任领导',
    timer: '完成时间',
    deadlineTimer: '整改时限',
    result: '完成情况',
    Person: '验收责任人'
})
const Dates = function (time: any) {
    var date = new Date(time).toJSON()
    var timeft = new Date(+new Date(date))
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
    return timeft
}
let addForm = reactive({
    name: '',
    measure: '',
    leading: '',
    timer: '',
    deadlineTimer: '',
    result: '',
    Person: ''
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('17rem')
let currentPage = ref(1)
let pagingItem = ref(5)
let tableData = reactive([
    {
        id: 1,
        name: '化工车间有毒气体报警仪未正常运行',
        measure: '查明原因限期恢复',
        leading: '赵少飞',
        timer: '2022-07-10T13:15:14.7666463Z',
        deadlineTimer: '2',
        result: '已完成',
        Person: '张锋'
    }, {
        id: 2,
        name: '工人在检修活化料时未正确佩戴劳动防护用品',
        measure: '立即佩戴好',
        leading: '李帅汶',
        timer: '2022-07-10T13:15:14.7666463Z',
        deadlineTimer: '1',
        result: '已完成',
        Person: '张锋'
    }, {
        id: 3,
        name: '成型车间巡检工未及时发现皮带断裂',
        measure: '暂停运行并检修',
        leading: '王浩强',
        timer: '2022-07-10T13:15:14.7666463Z',
        deadlineTimer: '2',
        result: '已完成',
        Person: '张锋'
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
let cellStyle = reactive({
    textAlign: 'center',
    fontSize: '1.5rem',
    padding: '1rem 0'
})
let jobType = reactive([
    {
        id: '1',
        title: '高空作业'
    },
    {
        id: '2',
        title: '火工品装卸'
    },
    {
        id: '3',
        title: '危险品包装'
    },
    {
        id: '4',
        title: '有毒物质接触'
    },
    {
        id: '5',
        title: '射线处理'
    },
    {
        id: '6',
        title: '水上作业'
    }
])
let auditStatus = reactive([
    {
        id: '1',
        status: 0,
        title: '未通过'
    },
    {
        id: '2',
        status: 1,
        title: '已通过'
    }
])
let companyName = reactive([
    {
        id: '1',
        name: 'ABC公司'
    },
    {
        id: '2',
        name: 'DEF公司'
    },
    {
        id: '3',
        name: 'GHI公司'
    },
    {
        id: '4',
        name: 'JKL公司'
    },
    {
        id: '5',
        name: 'MNO公司'
    }
])
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
const addInformation = function () {
    if (chek(addForm)) {
        dialogFormVisible.value = false
        let froms = JSON.parse(JSON.stringify(addForm))
        tableData.push(froms)
        ElMessage({
            message: '创建成功',
            type: 'success'
        })
    }
}
const search = function () {
    let list = reactive(JSON.parse(JSON.stringify(tableData)))
    let from1: any = reactive({
        pre_conditions: {
            filter: (key: any) => {
                return !form.pre_conditions
                    ? key
                    : key.filter((item: any) => {
                        return item.name.includes(form.pre_conditions)
                    })
            }
        }
    })

    Object.keys(from1).forEach((key1: any) => {
        list.values = from1[key1].filter(list)
    })
    currentPage.value = 1

    searchtableData.value = list.values
}

const jobReport = function () {
    dialogFormVisible.value = true
    Object.assign(addForm, {
        name: '',
        measure: '',
        leading: '',
        timer: '',
        deadlineTimer: '',
        result: '',
        Person: ''
    })
}

const deleteRow = function (index: any) {

    let arr = tableData;
    arr.splice((currentPage.value - 1) * pagingItem.value + index, 1)
    tableData = arr;
    ElMessage({
        message: '删除成功',
        type: 'success'
    })
}
</script>
<style scoped lang="scss">
:deep(.el-dialog .el-input__wrapper) {
    flex-grow: 0;
    width: 28rem;
}

:deep(.el-dialog .el-input__inner) {
    flex-grow: 0;
    width: 28rem;
}

.block {
    margin-top: 2rem;
}

.job-list {
    box-sizing: border-box;

    ::deep(.el-input__inner),
    ::deep(input) {
        background-color: transparent;
    }

    .head {
        width: 100%;
        height: 5rem;
        display: flex;
        justify-content: center;
        color: aqua;
        text-align: center;

        .text-center {
            font-size: 2rem;
        }
    }

    .main {
        height: calc(100% - 8rem);

        // padding: 0 2rem 2rem;
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
            ::-webkit-scrollbar {
                width: 0;
                height: 0;
            }

            ::deep(.cell) {
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

            ::deep(li),
            ::deep(.el-pagination button:disabled),
            ::deep(.btn-prev),
            ::deep(.btn-next) {
                background-color: transparent;
            }
        }
    }
}
</style>