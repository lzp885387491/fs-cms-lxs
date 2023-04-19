<template>
     <div class="user-list">
        <div class="header">
            <div class="search">
                <el-input v-model="from.avatarName" size="small" class="ipt-search" placeholder="搜索员工"></el-input>
                <el-select v-model="from.deptNo" multiple collapse-tags size="small" @change="selectChange"
                    placeholder="请选择部门">
                    <el-option v-for="item in newDeptNoList" :key="item.deptId" :label="item.name" :value="item.deptId">
                    </el-option>
                </el-select>
                <el-select v-model="from.roles" size="small" clearable placeholder="请选择职位">
                    <el-option v-for="(item, index) in newPosition" :key="index" :label="item.value" :value="item.id">
                    </el-option>
                </el-select>
                <!-- <el-date-picker v-model="from.time" size="small" type="date" placeholder="选择入职日期">
                </el-date-picker> -->
                <el-input v-model="from.phoneNumber" size="small" class="ipt-search" placeholder="搜索手机号"></el-input>
                <el-button type="primary" size="small" @click="search">搜索</el-button>
                <el-button type="info" class="clear" size="small" @click="clear">清除</el-button>
            </div>
            <el-button type="primary" @click="dialogFormVisible = true" size="small">添加员工</el-button>
            <el-dialog title="添加成员" class="dialog" width="30%" :visible.sync="dialogFormVisible">
                <from-world ref="fromworld"></from-world>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="news mt-20" v-if="flag">
            <div class="news-content">
                <span class="salary">工资条一对一发放至员工！安全可靠！</span>
                <span class="free-use">免费使用>></span>
            </div>
            <div class="delete" @click="remove">×</div>
        </div>
        <div class="container mt-20">
            <el-table :data="newUserList" border style="width: 100%" max-height="300">
                <el-table-column prop="id" label="入职日期" align="center" width="auto">
                </el-table-column>
                <el-table-column prop="avatarName" label="姓名" align="center" width="auto">
                </el-table-column>
                <el-table-column align="center" label="部门" width="auto">
                    <template slot-scope="scope">
                        {{ department(scope.row.deptNo) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="职位" width="auto">
                    <template slot-scope="scope">
                        {{ position(scope.row.roles) }}
                    </template>
                </el-table-column>
                <el-table-column prop="phoneNumber" align="center" label="手机号" width="auto">
                    <template slot-scope="scope">
                        {{ newPhoneNumber(scope.row.phoneNumber) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="auto">
                    <template slot-scope="scope">
                        <el-link @click="handleClick(scope.row)" class="table-link" :underline="false"
                            type="primary">查看</el-link>
                        <el-link type="primary" class="table-link" :underline="false">编辑</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block mt-20">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[1, 2, 5, 10, 20]" :page-size="pagingItem" layout="total, sizes, prev, pager, next, jumper"
                :total="val">
            </el-pagination>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref, computed } from 'vue'
const size = ref<'default' | 'large' | 'small'>('default')
let form = reactive({
  work_time: ''
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
  work_type: '日期',
  work_time: '关停原因',
  work_location: '关停时间',
  pre_conditions: '检修内容',
  security_measures: '修理时间',
  submit_time: '重启时间',
  status: '责任人'
})
const addForm = reactive({
  work_type: '',
  work_time: '',
  work_location: '',
  pre_conditions: '',
  security_measures: '',
  submit_time: '',
  status: ''
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('120px')
let currentPage = ref(1)
let pagingItem = ref(5)
let tableData = reactive([
  {
    work_type: '2023-01-01',
    work_time: '排放',
    work_location: '08:00',
    pre_conditions: '更换阀门',
    security_measures: '10',
    submit_time: '2023-01-02 18:00',
    status: '陈海峰'
  },
  {
    work_type: '2023-01-02',
    work_time: '自查',
    work_location: '10:00',
    pre_conditions: '维护设备',
    security_measures: '5',
    submit_time: '2023-01-02 15:00',
    status: '方杰本'
  },
  {
    work_type: '2023-01-03',
    work_time: '检查',
    work_location: '12:00',
    pre_conditions: '检修管道',
    security_measures: '7',
    submit_time: '2023-01-03 19:00',
    status: '盖瑞'
  },
  {
    work_type: '2023-01-05',
    work_time: '防爆',
    work_location: '09:00',
    pre_conditions: '更换电缆',
    security_measures: '8',
    submit_time: '2023-01-05 17:00',
    status: '梁海'
  },
  {
    work_type: '2023-01-06',
    work_time: '安检',
    work_location: '13:00',
    pre_conditions: '维修变压器',
    security_measures: '6',
    submit_time: '2023-01-06 19:00',
    status: '高挺'
  },
  {
    work_type: '2023-01-07',
    work_time: '改造',
    work_location: '11:00',
    pre_conditions: '升级泵站',
    security_measures: '12',
    submit_time: '2023-01-08 11:00',
    status: '路方云'
  },
  {
    work_type: '2023-01-08',
    work_time: '维修',
    work_location: '14:00',
    pre_conditions: '更换仪表',
    security_measures: '3',
    submit_time: '2023-01-08 17:00',
    status: '毛亚波'
  },
  {
    work_type: '2023-01-09',
    work_time: '安装',
    work_location: '07:00',
    pre_conditions: '新建过滤器',
    security_measures: '16',
    submit_time: '2023-01-10 23:00',
    status: '毛世爱'
  },
  {
    work_type: '2023-01-11',
    work_time: '维护',
    work_location: '10:30',
    pre_conditions: '检修换热器',
    security_measures: '8',
    submit_time: '2023-01-11 18:30',
    status: '王志亮'
  },
  {
    work_type: '2023-01-12',
    work_time: '更换',
    work_location: '15:00',
    pre_conditions: '更换泵轮',
    security_measures: '4',
    submit_time: '2023-01-12 19:00',
    status: '王淑刚'
  }
])
let searchtableData = ref(tableData)
let val = computed(() => {
  return searchtableData.value.length
})
const initDate = function (num: any) {
  return num < 10 ? '0' + num : num
}
const filTime = function (time: any) {
  if (!time) return
  const date = new Date(time)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  time =
    Y +
    '-' +
    initDate(M) +
    '-' +
    initDate(D) +
    '  ' +
    initDate(h) +
    ':' +
    initDate(m) +
    ':' +
    initDate(s)
  return time
}

let headerCellStyle = reactive({
  fontSize: '1.7rem',
  textAlign: 'center',
  padding: '1rem 0'
})
const deleteRow = (index: number) => {
  let arr = tableData;
  arr.splice((currentPage.value-1) * pagingItem.value + index, 1)
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
const addInformation = function () {
  if (chek(addForm)) {
    tableData.push(addForm)
    dialogFormVisible.value = false
    ElMessage({
      message: '创建成功',
      type: 'success'
    })
  }
}
const search = function () {
  let list = reactive(JSON.parse(JSON.stringify(tableData)))
  let from1: any = reactive({
    work_time: {
      filter: (key: any) => {
        return !form.work_time
          ? key
          : key.filter((item: any) => {
              return item.work_time.includes(form.work_time)
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
    work_type: '',
    work_time: '',
    work_location: '',
    pre_conditions: '',
    security_measures: '',
    submit_time: '',
    status: ''
  })
}
</script>
<style scoped lang="scss">
.user-list {
    padding: 30px;
    min-width: 800px;

    .header {
        display: flex;
        justify-content: space-between;
        gap: 20px;

        .search {
            display: flex;
            gap: 20px;

            .ipt-search {
                width: 188px;
            }

            .clear {
                margin: 0;
            }
        }

       

    }

    .news {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #e5f7ff;
        border: 1px solid #c8ecff;
        border-radius: 4px;
        padding: 8px;
        font-size: 1rem;

        .news-content {
            margin-left: 20px;

            .free-use {
                cursor: pointer;
                color: #409eff;
                margin-left: 50px;
            }

        }

        .delete {
            margin-right: 50px;
            cursor: pointer;
            font-size: 1.5rem;
        }
    }

    .container {
        .table-link {
            font-size: 14px;
            margin: 0 5px;
        }

    }

}
</style>