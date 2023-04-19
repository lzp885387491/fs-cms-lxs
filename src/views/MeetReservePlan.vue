<template>
  <div class="job-list">
    <div class="main">
      <div class="table-title">应急预案管理</div>
      <div class="search mt-2">
        <div class="search-left">
          <el-input
            v-model="form.planName"
            clearable
            size="large"
            class="ipt-search"
            placeholder="根据预案名称查询"
          ></el-input>
          <el-button type="primary" @click="search" size="large">搜索</el-button>
        </div>
        <el-button type="primary" @click="jobReport" size="large">添加</el-button>
        <el-dialog title="添加应急预案信息" v-model="dialogFormVisible" width="30%">
          <el-form :model="addForm" size="mini">
            <el-form-item label="预案名称" :label-width="formLabelWidth">
              <el-input type="text" v-model="addForm.planName" class="ipt" placeholder="请输入预案名称"></el-input>
            </el-form-item>
            <el-form-item label="演练地点" :label-width="formLabelWidth">
              <el-input
                type="text"
                v-model="addForm.exerciseLocation"
                class="ipt"
                placeholder="请输入演练地点"
              ></el-input>
            </el-form-item>
            <el-form-item label="演练时间" :label-width="formLabelWidth">
              <el-date-picker v-model="addForm.exerciseTime" type="datetime" placeholder="请选择时间" />
            </el-form-item>
            <el-form-item label="参加人数" :label-width="formLabelWidth">
              <el-input
                type="text"
                v-model="addForm.numberOfParticipants"
                class="ipt"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="举办单位" :label-width="formLabelWidth">
              <el-input type="text" v-model="addForm.Organizer" class="ipt" placeholder="请输入举办单位"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth">
              <el-input type="text" v-model="addForm.head" class="ipt" placeholder="请输入负责人"></el-input>
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
        <el-table
          :data="newTableData"
          class="table-content"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="planName" label="预案名称" width="auto"></el-table-column>
          <el-table-column prop="exerciseLocation" label="演练地点" width="auto"></el-table-column>
          <el-table-column label="演练时间" width="auto">
            <template #default="scope">{{ Dates(scope.row.exerciseTime) }}</template>
          </el-table-column>
          <el-table-column prop="numberOfParticipants" label="参加人数" width="auto"></el-table-column>
          <el-table-column prop="Organizer" label="举办单位" width="auto"></el-table-column>
          <el-table-column prop="head" label="负责人" width="auto"></el-table-column>
          <el-table-column label="操作" width="auto">
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
// let arr = reactive([])
let form = reactive({
  planName: ''
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
const addFormRule: any = reactive({
  planName: '预案名称',
  exerciseLocation: '演练地点',
  exerciseTime: '演练时间',
  numberOfParticipants: '参加人数',
  Organizer: '举办单位',
  head: '负责人'
})
let addForm = reactive({
  planName: '',
  exerciseLocation: '',
  exerciseTime: '',
  numberOfParticipants: '',
  Organizer: '',
  head: ''
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('15rem')
let currentPage = ref(1)
let pagingItem = ref(5)
let tableData = reactive([
   {
    id: 1,
    planName: '中毒窒息应急演练',
    exerciseLocation: '成型二车间旁边',
    exerciseTime: '2022-11-02 15:00:00',
    numberOfParticipants: 21,
    Organizer: '应急救援管理机构',
    head: '邢建平'
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
const Dates = function (time: any) {
  var date = new Date(time).toJSON()
  var timeft = new Date(+new Date(date))
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
  return timeft
}
const addInformation = function () {
  if (chek(addForm)) {
    let obj = ref(JSON.parse(JSON.stringify(addForm)))
    tableData.push(obj.value)
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
    planName: {
      filter: (key: any) => {
        return !form.planName
          ? key
          : key.filter((item: any) => {
              return item.planName.includes(form.planName)
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
const deleteRow = (index: number) => {
  let arr = tableData;
  arr.splice((currentPage.value-1) * pagingItem.value + index, 1)
  tableData = arr;
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
}

const jobReport = function () {
  dialogFormVisible.value = true
  Object.assign(addForm, {
    planName: '',
    exerciseLocation: '',
    exerciseTime: '',
    numberOfParticipants: '',
    Organizer: '',
    head: ''
  })
}
</script>
<style scoped lang="scss">
.job-list {
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