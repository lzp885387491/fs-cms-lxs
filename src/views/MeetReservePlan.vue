<template>
  <div class="job-list">
    <div class="main">
      <div class="table-title">应急预案管理</div>
      <div class="search mt-2">
        <div class="search-left">
          <el-input
            v-model="form.name"
            clearable
            size="large"
            class="ipt-search"
            placeholder="根据预案名称查询"
          ></el-input>
          <el-button type="primary" @click="search" size="large">搜索</el-button>
        </div>
        <el-button type="primary" @click="showDialog" size="large">添加应急预案</el-button>
        <el-dialog title="添加应急预案信息" v-model="dialogFormVisible" width="30%">
          <el-form :model="selectPlan" size="default">
            <el-form-item label="预案名称" :label-width="formLabelWidth">
              <el-input type="text" v-model="selectPlan.name" class="ipt" placeholder="请输入预案名称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="演练地点" :label-width="formLabelWidth">
              <el-input
                type="text"
                v-model="addForm.exerciseLocation"
                class="ipt"
                placeholder="请输入演练地点"
              ></el-input>
            </el-form-item>-->
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input
                type="text"
                v-model="selectPlan.description"
                class="ipt"
                placeholder="请输入预案描述"
              ></el-input>
            </el-form-item>
            <el-form-item label="地点" :label-width="formLabelWidth">
              <el-input type="text" v-model="selectPlan.site" class="ipt" placeholder="请输入预案所定地点"></el-input>
            </el-form-item>
            <!-- <el-form-item label="演练时间" :label-width="formLabelWidth">
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
            </el-form-item>-->
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addPlan">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="table mt-2">
        <el-table
          :data="tableList"
          class="table-content"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="name" label="预案名称" width="auto"></el-table-column>
          <el-table-column prop="description" label="预案描述" width="auto"></el-table-column>
          <el-table-column prop="site" label="演练地点" width="auto"></el-table-column>
          <!-- <el-table-column prop="exerciseLocation" label="演练地点" width="auto"></el-table-column> -->
          <!-- <el-table-column label="演练时间" width="auto">
            <template #default="scope">{{ Dates(scope.row.exerciseTime) }}</template>
          </el-table-column>-->
          <!-- <el-table-column prop="numberOfParticipants" label="参加人数" width="auto"></el-table-column>
          <el-table-column prop="Organizer" label="举办单位" width="auto"></el-table-column>
          <el-table-column prop="head" label="负责人" width="auto"></el-table-column>-->
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
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref, computed, onMounted } from 'vue'
import { getEmergencyPlanList, createEmergencyPlanList, deleteEmergencyPlan } from '@/api/plan-api'
onMounted(async () => {
  getPlanList()
})
let resList = ref([]) //服务端返回的数据
let searchList=ref([])
let pageNum = ref(1) //第几页
let pageSize = ref(5) //每页数量
let selectPlan: any = reactive({
  // name: '',
  // description: '',
  site: 1
}) //选中的预案
let total = computed(() => {
  return searchList.value.length
})
let tableList = computed(() => {
  return searchList.value.slice((pageNum.value - 1) * pageSize.value, pageNum.value * pageSize.value)
}) //分页后的数据
const getPlanList = async function () {
  let res = await getEmergencyPlanList()
  if (res.status == 200 || res.status == 304) {
    resList.value = res.data
    searchList.value=res.data
  }
}
const showDialog = function () {
  selectPlan = reactive({
    site: 1
  })
  dialogFormVisible.value = true
}
const hiddenDialog = function () {
  dialogFormVisible.value = false
}
const addPlan = async function () {
  let res = await createEmergencyPlanList(selectPlan)
  if (res.status == 201) {
    ElMessage({
      message: '创建成功',
      type: 'success'
    })
    hiddenDialog()
    getPlanList()
  } else {
    ElMessage({
      message: '创建失败',
      type: 'warning'
    })
  }
} //添加方案
const deletePlan = async function (id: number) {
  let res = await deleteEmergencyPlan({ id })
  if (res.status == 201) {
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    getPlanList()
  } else {
    ElMessage({
      message: '删除失败',
      type: 'warning'
    })
  }
} //删除方案
let form = reactive({
  name: ''
}) //搜索框

const search = function () {
  let list = reactive(JSON.parse(JSON.stringify(resList.value)))
  let from1: any = reactive({
    name: {
      filter: (data: any) => {
        return !form.name
          ? data
          : data.filter((item: any) => {
              return item.name.includes(form.name)
            })
      }
    }
  })

  Object.keys(from1).forEach((key1: any) => {
    list = from1[key1].filter(list)
  })
  pageNum.value = 1
  searchList.value = list
}

let tableData = reactive([
  {
    id: 1,
    planName: '中毒窒息应急演练',
    exerciseLocation: '成型二车间旁边',
    exerciseTime: '2022-11-02 15:00:00',
    numberOfParticipants: 21,
    Organizer: '应急救援管理机构',
    head: '邢建平'
  }
])
function chek(data: any | undefined) {
  // 如果传进来的是一个对象 则循环遍历每一个字段是否为空
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
const Dates = function (time: any) {
  var date = new Date(time).toJSON()
  var timeft = new Date(+new Date(date))
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
  return timeft
}
// const addInformation = function () {
//   if (chek(addForm)) {
//     let obj = ref(JSON.parse(JSON.stringify(addForm)))
//     tableData.push(obj.value)
//     dialogFormVisible.value = false
//     ElMessage({
//       message: '创建成功',
//       type: 'success'
//     })
//   }
// }

const deleteRow = (index: number) => {
  let arr = tableData
  arr.splice((currentPage.value - 1) * pagingItem.value + index, 1)
  tableData = arr
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
  transform: translateY(-65%) !important;
}
.job-list {
  box-sizing: border-box;
  padding: 3rem;
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