<template>
  <div class="job-list">
    <div class="main">
      <div class="table-title">园区基础信息管理</div>
      <div class="search mt-2">
        <div class="search-left">
          <el-input
            v-model="form.pre_conditions"
            clearable
            size="large"
            class="ipt-search"
            placeholder="根据前置条件查询"
          ></el-input>
          <el-button type="primary" @click="search" size="large">搜索</el-button>
        </div>
        <el-button type="primary" @click="jobReport" size="large">添加厂区信息</el-button>
        <el-dialog title="作业报备" v-model="dialogFormVisible" width="50%">
          <el-form :model="addForm" size="mini">
            <el-form-item label="厂区名称" :label-width="formLabelWidth">
              <el-input v-model="addForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="法定负责人" :label-width="formLabelWidth">
              <el-input v-model="addForm.person" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="厂区面积" :label-width="formLabelWidth">
              <el-input v-model="addForm.area" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="厂区描述" :label-width="formLabelWidth">
              <el-input v-model="addForm.describe" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="厂区创建日期" :label-width="formLabelWidth">
              <el-date-picker v-model="addForm.createDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="办公人数" :label-width="formLabelWidth">
              <el-input v-model="addForm.workPerson" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="工人人数" :label-width="formLabelWidth">
              <el-input v-model="addForm.workerPerson" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业总人数" :label-width="formLabelWidth">
              <el-input v-model="addForm.totalPerson" autocomplete="off"></el-input>
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
          :border="true"
          class="table-content"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column prop="name" label="厂区名称" width="auto"></el-table-column>
          <el-table-column prop="person" label="法定责任人" width="auto"></el-table-column>
          <el-table-column prop="area" label="厂区面积" width="auto"></el-table-column>
          <el-table-column prop="describe" label="厂区描述" width="auto"></el-table-column>
          <el-table-column prop="createDate" label="创建日期" width="auto">
            <template #default="scoped">{{Dates(scoped.row.createDate)}}</template>
          </el-table-column>
          <el-table-column prop="workPerson" label="办公人数" width="auto"></el-table-column>
          <el-table-column prop="workerPerson" label="工人人数" width="auto"></el-table-column>
          <el-table-column prop="totalPerson" label="总数" width="auto"></el-table-column>
          <el-table-column label="操作" width="auto">
            <template #default="scope">
              <el-popover :visible="visible" placement="top" :width="160">
                <p>确定要删除此数据嘛?</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="small" text @click="visible = false">取消</el-button>
                  <el-button size="small" type="primary" @click="visible = false">确定</el-button>
                </div>
                <template #reference>
                  <el-button
                    @click="deleteRow(scope.$index)"
                    type="text"
                    class="table-clink"
                    size="small"
                  >删除</el-button>
                </template>
              </el-popover>
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
import { getParkInfo, login } from '@/api/api';
const visible = ref(false);
let form = reactive({
  pre_conditions: ''
})
function chek(data: any | undefined) {
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
  name: '厂区名称',
  person: '法定责任人',
  area: '厂区面积',
  describe: '厂区描述',
  createDate: '创建日期',
  workPerson: '办公人数',
  workerPerson: '工人人数',
  totalPerson: '总数'
})
const Dates = function (time: any) :void {
  var date = new Date(time).toJSON()
  var timeft = new Date(+new Date(date))
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
  return timeft
}
let addForm = reactive({
  name: '',
  person: '',
  area: '',
  describe: '',
  createDate: '',
  workPerson: '',
  workerPerson: '',
  totalPerson: ''
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('120px')
let currentPage = ref(1)
let pagingItem = ref(5)
let tableData = reactive([
  {
    id: 1,
    name: '华辉捷环保科技有限公司',
    location: '临汾市浮山县天坛镇平里村西部',
    person: '杨瑞强',
    area: '90余亩',
    describe: '一家以从事石油、煤炭及其他燃料加工业为主的企业',
    createDate: '2021-02-20T13:15:14.7666463Z',
    workPerson: '7',
    workerPerson: '61',
    totalPerson: '68'
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
  console.log(list)

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
    person: '',
    area: '',
    describe: '',
    createDate: '',
    workPerson: '',
    workerPerson: '',
    totalPerson: ''
  })
}

const deleteRow = function (index: any) {

  let arr = tableData;
  arr.splice((currentPage.value-1) * pagingItem.value + index, 1)
  tableData = arr;
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
}

const parkInfoList = async function(){
  let res = await getParkInfo();
  console.log('---------');
  
  console.log(res);
}
parkInfoList();
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