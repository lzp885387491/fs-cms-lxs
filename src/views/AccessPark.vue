<template>
  <div class="job-list">
    <div class="main">
      <div class="table-title">危出入园管理</div>
      <div class="search">
        <div class="search-left">
          <el-input
            v-model="form.name"
            clearable
            size="large"
            class="ipt-search"
            placeholder="根据危化品名称查询"
          ></el-input>

          <el-button type="primary" @click="search" size="large">搜索</el-button>
        </div>
        <el-button type="primary" @click="jobReport" size="large">添加危化品记录</el-button>
        <el-dialog title="添加危化品" v-model="dialogFormVisible" width="50%">
          <el-form :model="addForm" size="mini">
            <el-form-item label="危化品名称" :label-width="formLabelWidth">
              <el-input v-model="addForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="出/入" :label-width="formLabelWidth">
              <el-input v-model="addForm.inOut" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth">
              <el-input v-model="addForm.leading" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="存放位置" :label-width="formLabelWidth">
              <el-input v-model="addForm.location" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="有无许可证" :label-width="formLabelWidth">
              <el-input v-model="addForm.isCheck" autocomplete="off"></el-input>
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
      <div class="table mt-2">
        <el-table
          :data="newTableData"
          class="table-content"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="name" label="危化品名称" width="auto"></el-table-column>
          <el-table-column prop="inOut" label="出/入" width="auto"></el-table-column>
          <el-table-column prop="leading" label="负责人" width="auto"></el-table-column>
          <el-table-column prop="location" label="存放位置" width="auto"></el-table-column>
          <el-table-column prop="isCheck" label="有无许可证" width="auto"></el-table-column>
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
let form = reactive({
  name: ''
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
  isCheck: '有无许可证',
  location: '存放位置',
  leading: '负责人',
  inOut: '出/入',
  name: '危化品名称'
})
let addForm: any = reactive({
  name: '',
  inOut: '',
  leading: '',
  location: '',
  isCheck: ''
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('120px')
let currentPage = ref(1)
let pagingItem = ref(5)
let tableData = reactive([
  {
    id: 1,
    name: '乙酸',
    inOut: '出',
    leading: '盖婵儒',
    location: 'A仓库',
    isCheck: '是'
  },
  {
    id: 2,
    name: '醋酸',
    inOut: '入',
    leading: '杨婷婷',
    location: 'B仓库',
    isCheck: '否'
  },
  {
    id: 3,
    name: '液氨',
    inOut: '出',
    leading: '张荣荣',
    location: 'C仓库',
    isCheck: '否'
  },
  {
    id: 4,
    name: '氢氟酸',
    inOut: '出',
    leading: '张亚楠',
    location: 'D仓库',
    isCheck: '是'
  },
  {
    id: 5,
    name: '尿素',
    inOut: '入',
    leading: '范芝鸽',
    location: 'E仓库',
    isCheck: '是'
  },
  {
    id: 6,
    name: '硝酸银',
    inOut: '出',
    leading: '吕青叶',
    location: 'F仓库',
    isCheck: '是'
  },
  {
    id: 7,
    name: '磷酸二氢钾',
    inOut: '入',
    leading: '盖婵儒',
    location: 'G仓库',
    isCheck: '否'
  },
  {
    id: 8,
    name: '稀硝酸',
    inOut: '入',
    leading: '张亚楠',
    location: 'H仓库',
    isCheck: '是'
  },
  {
    id: 9,
    name: '硫酸铜',
    inOut: '入',
    leading: '范芝鸽',
    location: 'I仓库',
    isCheck: '是'
  },
  {
    id: 10,
    name: '硝酸',
    inOut: '入',
    leading: '范芝鸽',
    location: 'I仓库',
    isCheck: '是'
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
    let addForms = JSON.parse(JSON.stringify(addForm))
    tableData.push(addForms)
    ElMessage({
      message: '创建成功',
      type: 'success'
    })
  }
}
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

  Object.keys(from1).forEach((key1: any) => {
    list.values = from1[key1].filter(list)
    console.log(list)
  })
  currentPage.value = 1
  searchtableData.value = list.values
}
const jobReport = function () {
  dialogFormVisible.value = true
  Object.assign(addForm, {
    name: '',
    inOut: '',
    leading: '',
    location: '',
    isCheck: ''
  })
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
body {
  margin: 0;
  padding: 0;
}

.job-list {
  box-sizing: border-box;

  .main {
    box-sizing: border-box;

    .search {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 2rem;

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

      .table-content::before {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0;
        z-index: 3;
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