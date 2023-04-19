<template>
  <div class="job-list">
    <div class="main">
      <div class="table-title">装置开停车和大检修</div>
      <div class="search mt-2">
        <div class="search-left">
          <el-input
            v-model="form.work_time"
            clearable
            size="large"
            class="ipt-search"
            placeholder="根据关停原因查询"
          ></el-input>
          <el-button type="primary" @click="search" size="large">搜索</el-button>
        </div>
        <el-button type="primary" @click="jobReport" size="large">添加检修信息</el-button>
        <el-dialog title="检修信息" v-model="dialogFormVisible" width="50%">
          <el-form :model="addForm" size="mini">
            <el-form-item label="日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="addForm.work_type"
                type="date"
                placeholder="选择日期"
                :size="size"
              />
            </el-form-item>
            <el-form-item label="关停原因" :label-width="formLabelWidth">
              <el-input v-model="addForm.work_time" autocomplete="off" placeholder="请输入关停原因"></el-input>
            </el-form-item>
            <el-form-item label="关停时间" :label-width="formLabelWidth">
              <el-time-picker v-model="addForm.work_location" placeholder="请选择关停时间" />
            </el-form-item>
            <el-form-item label="检修内容" :label-width="formLabelWidth">
              <el-input v-model="addForm.pre_conditions" autocomplete="off" placeholder="请输入检修内容"></el-input>
            </el-form-item>
            <el-form-item label="修理时间" :label-width="formLabelWidth">
              <el-input
                type="number"
                v-model="addForm.security_measures"
                autocomplete="off"
                placeholder="请输入修理时间"
              ></el-input>
            </el-form-item>
            <el-form-item label="重启时间" :label-width="formLabelWidth">
              <el-date-picker v-model="addForm.submit_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="责任人" :label-width="formLabelWidth">
              <el-input v-model="addForm.status" autocomplete="off" placeholder="请输入责任人姓名"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addInformation" size="mini">确 定</el-button>
          </template>
        </el-dialog>
      </div>
      <div class="table">
        <el-table
          :data="newTableData"
          class="table-content"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column label="日期" width="auto">
            <template #default="scope">{{ filTime(scope.row.work_type) }}</template>
          </el-table-column>
          <el-table-column prop="work_time" label="关停原因" width="auto"></el-table-column>
          <el-table-column prop="work_location" label="关停时间" width="auto"></el-table-column>
          <el-table-column prop="pre_conditions" label="检修内容" width="auto"></el-table-column>
          <el-table-column prop="security_measures" label="修理时间(时)" width="auto"></el-table-column>
          <el-table-column prop="submit_time" label="重启时间" width="auto"></el-table-column>
          <el-table-column prop="status" label="责任人" width="auto"></el-table-column>
          <el-table-column prop="operate" label="操作" width="auto">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="deleteRow(scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagingItem"
          layout="total, sizes, prev, pager, next, jumper"
          :total="val"
        ></el-pagination>
      </div>
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