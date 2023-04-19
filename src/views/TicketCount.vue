<template>
  <div class="job-list">
    <div class="main">
      <div class="table-title">特殊作业票证统计</div>
      <div class="search mt-2">
        <div class="search-left">
          <el-input
            v-model="form.work_type"
            clearable
            size="large"
            class="ipt-search"
            placeholder="根据作业类型"
          ></el-input>
          <el-button type="primary" @click="search" size="large">搜索</el-button>
        </div>
        <el-button type="primary" @click="jobReport" size="large">添加票证</el-button>
        <el-dialog title="作业报备" v-model="dialogFormVisible" width="50%">
          <el-form :model="addForm" size="mini">
            <el-form-item label="作业类型" :label-width="formLabelWidth">
              <el-select v-model="addForm.work_type" placeholder="请选择作业类型">
                <el-option
                  v-for="item in jobType"
                  :label="item.title"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="监护人" :label-width="formLabelWidth">
              <el-input placeholder="请选择监护人" v-model="addForm.guardian" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="申请单位" :label-width="formLabelWidth">
              <el-input placeholder="请选择申请单位" v-model="addForm.applicant"></el-input>
            </el-form-item>
            <el-form-item label="作业单位" :label-width="formLabelWidth">
              <el-input placeholder="请选择作业单位" v-model="addForm.work_unit"></el-input>
            </el-form-item>
            <el-form-item label="作业负责人" :label-width="formLabelWidth">
              <el-input placeholder="请选择作业负责人" v-model="addForm.work_head"></el-input>
            </el-form-item>
            <el-form-item label="安全交底人" :label-width="formLabelWidth">
              <el-input placeholder="请选择安全交底人" v-model="addForm.work_secure"></el-input>
            </el-form-item>
            <el-form-item label="作业证编号" :label-width="formLabelWidth">
              <el-input placeholder="请选择作业证编号" v-model="addForm.work_number"></el-input>
            </el-form-item>
            <el-form-item label="审批日期" :label-width="formLabelWidth">
              <el-date-picker v-model="addForm.work_pro" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="实施日期" :label-width="formLabelWidth">
              <el-date-picker v-model="addForm.work_start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addInformation" size="mini">确 定</el-button>
          </template>
        </el-dialog>
      </div>
      <div class="table mt-2">
        <el-table
          :data="newTableData"
          class="table-content"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="work_type" label="作业类型" width="auto"></el-table-column>
          <el-table-column prop="guardian" label="监护人" width="auto"></el-table-column>
          <el-table-column prop="applicant" label="申请单位" width="auto"></el-table-column>
          <el-table-column prop="work_unit" label="作业单位" width="auto"></el-table-column>
          <el-table-column prop="work_head" label="作业负责人" width="auto"></el-table-column>
          <el-table-column prop="work_secure" label="安全交底人" width="auto"></el-table-column>
          <el-table-column prop="work_number" label="作业证编号" width="auto"></el-table-column>
          <el-table-column prop="work_pro" label="审批日期" width="auto">
            <template #default="scope">{{Dates(scope.row.work_pro)}}</template>
          </el-table-column>
          <el-table-column prop="work_start" label="实施日期" width="auto">
            <template #default="scope">{{Dates(scope.row.work_start)}}</template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click.prevent="Delete(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block mt-2">
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
  work_type: '作业类型',
  guardian: '监护人',
  applicant: '申请单位',
  work_unit: '作业单位',
  work_head: '作业负责人',
  work_secure: '安全交底人',
  work_number: '作业编号',
  work_start: '实施日期',
  work_pro: '审核日期'
})
const Dates = function (time: any) {
  var date = new Date(time).toJSON()
  var timeft = new Date(+new Date(date))
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
  return timeft
}
const Delete = function (index: any) {
  let arr = tableData;
  arr.splice((currentPage.value-1) * pagingItem.value + index, 1)
  tableData = arr;
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
}
let addForm = reactive({
  work_type: '',
  guardian: '',
  applicant: '',
  work_unit: '',
  work_head: '',
  work_secure: '',
  work_number: '',
  work_start: '',
  work_pro: ''
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('15rem')
let currentPage = ref(1)
let pagingItem = ref(5)
let tableData = reactive([
  {
    work_type: '动火安全作业',
    guardian: '杨瑞强',
    applicant: '华辉捷环保公司',
    work_unit: '生产车间1',
    work_head: '李安',
    work_secure: '杨瑞强',
    work_number: 'HC-001',
    work_start: '2023-01-10T13:15:14.7666463Z',
    work_pro: '2023-01-10T13:15:14.7666463Z'
  },
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
  //   border: "0",
})
let jobType = reactive([
  {
    id: '1',
    title: '动火作业',
    value: '动火作业'
  },
  {
    id: '2',
    title: '动土作业',
    value: '动土作业'
  },
  {
    id: '3',
    title: '吊装作业',
    value: '吊装作业'
  },
  {
    id: '4',
    title: '断路作业',
    value: '断路作业'
  },
  {
    id: '5',
    title: '高处作业',
    value: '高处作业'
  },
  {
    id: '6',
    title: '设备检修',
    value: '设备检修'
  },
  {
    id: '7',
    title: '抽堵盲板',
    value: '抽堵盲板'
  },
  {
    id: '8',
    title: '受限空间',
    value: '受限空间'
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
const addInformation = function () {
  if (chek(addForm)) {
    dialogFormVisible.value = false
    const newForm = JSON.parse(JSON.stringify(addForm))
    tableData.push(newForm)
    ElMessage({
      message: '创建成功',
      type: 'success'
    })
  }
}

const form: any = reactive({
  work_type: ''
})
const search = function () {
  let list = reactive(JSON.parse(JSON.stringify(tableData)))
  let from1: any = reactive({
    work_type: {
      filter: (key: any) => {
        return !form.work_type
          ? key
          : key.filter((item: any) => {
              return item.work_type.includes(form.work_type)
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
    guardian: '',
    applicant: '',
    work_unit: '',
    work_head: '',
    work_secure: '',
    work_number: '',
    work_start: '',
    work_pro: ''
  })
}
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

:deep(.el-dialog) {
  --el-dialog-margin-top: 0 !important;
  position: relative !important;
  margin: 0 auto !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
}
.job-list {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;

  :deep(.el-input__inner),
  :deep(input) {
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

      /*最外层透明*/
      :deep(.el-table),
      :deep(.el-table__expanded-cell) {
        background-color: transparent;
      }

      .table-content {
        /* 表格内背景颜色 */
        :deep(th),
        :deep(tr),
        :deep(td) {
          background-color: transparent !important;
          //表格字体颜色
        }
      }

      .table-contentbefore {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0;
        z-index: 3;
      }

      :deep(.cell) {
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
      :deep(li),
      :deep(.el-pagination button:disabled),
      :deep(.btn-prev),
      :deep(.btn-next) {
        background-color: transparent;
      }
    }
  }
}
</style>