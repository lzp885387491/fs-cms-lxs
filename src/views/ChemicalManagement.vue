<template>
  <div class="job-list">
    <div class="main">
      <div class="table-title">危化品管理</div>
      <div class="search mt-2">
        <div class="search-left">
          <el-input
            v-model="form.hazardousType"
            clearable
            size="large"
            class="ipt-search"
            placeholder="根据前置条件查询"
          ></el-input>
          <el-button type="primary" @click="search" size="large">搜索</el-button>
        </div>
        <el-button type="primary" @click="jobReport" size="large">添加危化品</el-button>
        <el-dialog title="添加危化品" v-model="dialogFormVisible" width="50%">
          <el-form :model="addForm" size="mini">
            <el-form-item label="危化品名称" :label-width="formLabelWidth">
              <el-input v-model="addForm.hazardousType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
              <el-input v-model="addForm.hazardousNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="储存地点" :label-width="formLabelWidth">
              <el-input v-model="addForm.storageLocation" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth">
              <el-input v-model="addForm.head" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否按时检查" :label-width="formLabelWidth">
              <el-input v-model="addForm.onTime" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="addInformation" size="mini">确 定</el-button>
            </span>
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
          <el-table-column prop="hazardousType" label="危化品名称" width="auto"></el-table-column>
          <el-table-column prop="hazardousNum" label="数量" width="auto"></el-table-column>
          <el-table-column prop="storageLocation" label="储存地点" width="auto"></el-table-column>
          <el-table-column prop="head" label="负责人" width="auto"></el-table-column>
          <el-table-column prop="onTime" label="是否按时检查" width="auto"></el-table-column>
          <el-table-column label="操作" width="auto">
            <template #default="scope">
              <el-link type="primary" @click="delete1(scope.$index)">删除</el-link>
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
  <!-- MajorHazard -->
  <script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
let form = reactive({
  hazardousType: ''
})
let addForm = reactive({
  hazardousType: '',
  hazardousNum: '',
  storageLocation: '',
  head: '',
  onTime: ''
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('120px')
let currentPage = ref(1)
let pagingItem = ref(10)
let tableData = reactive([
  {
    hazardousType: '天然气',
    hazardousNum: 12,
    storageLocation: '生产车间',
    head: '李帅汶',
    onTime: '是'
  },
  {
    hazardousType: '天然气',
    hazardousNum: 7,
    storageLocation: '生产车间',
    head: '李帅汶',
    onTime: '是'
  },
  {
    hazardousType: '天然气',
    hazardousNum: 23,
    storageLocation: '生产车间',
    head: '李帅汶',
    onTime: '是'
  },
  {
    hazardousType: '天然气',
    hazardousNum: 32,
    storageLocation: '生产车间',
    head: '李帅汶',
    onTime: '否'
  },
  {
    hazardousType: '天然气',
    hazardousNum: 67,
    storageLocation: '生产车间',
    head: '李帅汶',
    onTime: '是'
  },
  {
    hazardousType: '天然气',
    hazardousNum: 92,
    storageLocation: '生产车间',
    head: '李帅汶',
    onTime: '是'
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
const handleSizeChange = function (val: any) {
  pagingItem.value = val
}
const handleCurrentChange = function (val: any) {
  currentPage.value = val
}
let newTableData = computed(() => {
  return searchtableData.value.slice(
    (currentPage.value - 1) * pagingItem.value,
    currentPage.value * pagingItem.value
  )
})
const addInformation = function () {
  if (addForm.hazardousType == '') {
    return ElMessage.warning('危化品不能为空')
  } else if (addForm.hazardousNum == '') {
    return ElMessage.warning('数量不能为空')
  } else if (addForm.storageLocation == '') {
    return ElMessage.warning('储存地点不能为空')
  } else if (addForm.head == '') {
    return ElMessage.warning('负责人不能为空')
  } else if (addForm.onTime == '') {
    return ElMessage.warning('是否按时检查  不能为空')
  }
  dialogFormVisible.value = false
  let obj = ref(JSON.parse(JSON.stringify(addForm)))
  tableData.push(obj.value)
}
const search = function () {
  let list = reactive(JSON.parse(JSON.stringify(tableData)))
  let from1: any = reactive({
    hazardousType: {
      filter: (key: any) => {
        return !form.hazardousType
          ? key
          : key.filter((item: any) => {
              return item.hazardousType.includes(form.hazardousType)
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
    hazardousType: '',
    hazardousNum: '',
    storageLocation: '',
    head: '',
    onTime: ''
  })
}
const delete1 = function (index: any) {
  let arr = tableData
  arr.splice((currentPage.value - 1) * pagingItem.value + index, 1)
  tableData = arr
  ElMessage({
    message: '删除成功',
    type: 'success'
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

.block {
  margin-top: 2rem;
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
      margin-bottom: 2rem;

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
      .table-clink {
        font-size: 1.5rem;
      }
    }
  }
}
</style>