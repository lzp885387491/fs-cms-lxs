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
        <el-button type="primary" @click="showAddPlan" size="large">添加应急预案</el-button>
        <el-dialog title="添加应急预案信息" v-model="dialogFormVisible" width="30%" @close="clearPlan">
          <el-form :model="selectPlan" size="default">
            <el-form-item label="预案名称" :label-width="formLabelWidth">
              <el-input type="text" v-model="selectPlan.name" class="ipt" placeholder="输入预案名称"></el-input>
            </el-form-item>
            <el-form-item label="地点" :label-width="formLabelWidth">
              <el-select v-model="selectPlan.siteId" placeholder="选择预案地点">
                <el-option
                  v-for="item in siteList"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input
                type="text"
                v-model="selectPlan.description"
                class="ipt"
                placeholder="输入预案描述"
              ></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="hiddenDialog">取 消</el-button>
              <el-button v-show="btnStatus=='add'" type="primary" @click="addPlan">添 加</el-button>
              <el-button v-show="btnStatus=='edit'" type="primary" @click="editPlan">修 改</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="table mt-2">
        <!-- <el-table
          :data="tableList"
          class="table-content"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column type="index" label="序号" min-width="30"></el-table-column>
          <el-table-column prop="name" label="预案名称" width="auto"></el-table-column>
          <el-table-column prop="description" label="预案描述" width="auto"></el-table-column>
          <el-table-column prop="site.name" label="演练地点" width="auto"></el-table-column>
          <el-table-column label="操作" width="auto">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="showEditPlan(scope.row)"
              >编辑</el-button>
              <el-button link type="danger" size="small" @click.prevent="openTip(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>-->
        <el-table
          :data="fixedData"
          class="table-content"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column type="index" label="序号" min-width="30"></el-table-column>
          <el-table-column prop="name" label="预案名称" width="auto"></el-table-column>
          <el-table-column prop="description" label="预案描述" width="auto"></el-table-column>
          <el-table-column prop="site" label="演练地点" width="auto"></el-table-column>
          <el-table-column label="操作" width="auto">
            <template #default>
              <el-button  @click.prevent="checkFile" link type="primary" size="small">查看文件</el-button>
              <!-- <el-button link type="danger" size="small">删除</el-button> -->
            </template>
          </el-table-column>
          <!-- @click.prevent="openTip(scope.row.id)" -->
          <!-- @click.prevent="showEditPlan(scope.row)" -->
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
import { useRouter } from 'vue-router'
import { reactive, ref, computed, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'

import {
  getEmergencyPlanList,
  createEmergencyPlanList,
  deleteEmergencyPlan,
  getSiteList,
  updateEmergencyPlan
} from '@/api/plan-api'
let router = useRouter();
const checkFile=function(){
  window.location.href = "https://unier.oss-cn-beijing.aliyuncs.com/fs/resource/%E6%B5%AE%E5%B1%B1%E5%8E%BF%E4%BA%A7%E4%B8%9A%E9%9B%86%E8%81%9A%E5%8C%BA%E7%BB%BC%E5%90%88%E5%BA%94%E6%80%A5%E9%A2%84%E6%A1%88.pdf"
}
onMounted(async () => {
  getPlanList()
  getSiteData()
})
interface Site {
  id: number
  name: string
}
interface Plan {
  name: string
  site: Site
  description: string
  id: number
}
let fixedData = ref([
  { description: '建立预防为主、防治结合的综合应急处理机制，提高快速反应和应急处置能力，高效有序地实施救援，最大限度减少人员伤亡和财产损失，防止和减少环境污染，把事故危害降低到最低水平，并在应急领导小组统一领导下做好应急救助工作，维护社会稳定。', id: 5, name: '浮山产业集聚区综合应急预案', site: '浮山化工园区' }
])
let btnStatus = ref('add')
let resList = ref([]) //服务端返回的数据
let searchList = ref([])
let pageNum = ref(1) //第几页
let pageSize = ref(5) //每页数量
let siteList:any = ref([])
let selectId = ref(0)
let selectPlan: any = reactive({
  // name: '',
  // description: '',
  // site: 1
}) //选中的预案
let total = computed(() => {
  return searchList.value.length
})
let tableList = computed(() => {
  return searchList.value.slice(
    (pageNum.value - 1) * pageSize.value,
    pageNum.value * pageSize.value
  )
}) //分页后的数据
const getPlanList = async function () {
  let res = await getEmergencyPlanList()
  if (res.status == 200 || res.status == 304) {
    resList.value = res.data
    searchList.value = res.data
  }
}
const getSiteData = async function () {
  let res = await getSiteList()
  if (res.status == 200 || res.status == 304) {
    siteList.value = res.data
  }
}
const showDialog = function () {
  dialogFormVisible.value = true
}
const hiddenDialog = function () {
  dialogFormVisible.value = false
}
const clearPlan = function () {
  selectPlan = reactive({
    // site: 1
  })
}
const addPlan = async function () {
  if (check(selectPlan)) {
    console.log(1)
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
  }
} //添加方案
const openTip = function (id: number) {
  ElMessageBox.confirm('是否确认删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deletePlan(id)
  })
}
const deletePlan = async function (id: number) {
  let res = await deleteEmergencyPlan({ id })
  if (res.status == 200) {
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
const showEditPlan = function (plan: Plan) {
  selectId.value = plan.id
  btnStatus.value = 'edit'
  let { name, description, site, id } = plan
  showDialog()
  selectPlan = reactive({
    name,
    description,
    siteId: site.id,
    id
  })
}
const showAddPlan = function (plan: Plan) {
  btnStatus.value = 'add'
  showDialog()
}

const editPlan = async function () {
  if (check(selectPlan)) {
    let { name, description, siteId } = selectPlan
    let res = await updateEmergencyPlan(selectId.value, {
      name,
      description,
      siteId
    })
    if (res.status == 200) {
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
      hiddenDialog()
      getPlanList()
    } else {
      ElMessage({
        message: '修改失败',
        type: 'warning'
      })
    }
  }
}

const handleSizeChange = function (val: any) {
  pageSize.value = val
}
const handleCurrentChange = function (val: any) {
  pageNum.value = val
}

function check(data: any) {
  let flag = true
  for (const key in addFormRule) {
    if (data[key] === undefined || data[key] === '') {
      flag = false
      ElMessage({
        message: '请填写' + addFormRule[key],
        type: 'warning'
      })
      break
    }
  }
  return flag
}
const addFormRule: any = reactive({
  name: '预案名称',
  siteId: '演练地点',
  description: '预案描述'
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('15rem')

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
const Dates = function (time: any) {
  var date = new Date(time).toJSON()
  var timeft = new Date(+new Date(date))
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
  return timeft
}
</script>
<style scoped lang="scss">
:deep(.el-dialog .el-input__wrapper) {
  flex-grow: 0 !important;
  width: 100% !important;
}
:deep(.el-dialog .el-input__inner) {
  flex-grow: 0 !important;
  // width: 25rem !important;
}
:deep(.el-form-item__content) {
  max-width: 30rem;
}
:deep(.el-select--default) {
  width: 100% !important;
}
:deep(.ipt) {
  width: 100% !important;
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