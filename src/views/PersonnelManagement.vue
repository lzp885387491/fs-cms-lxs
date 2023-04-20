<template>
  <div class="user-list">
    <div class="header">
      <div class="search">
        <el-input v-model="from.avatarName" clearable class="ipt-search" placeholder="搜索员工"></el-input>
        <el-input v-model="from.phoneNumber" clearable class="ipt-search" placeholder="搜索手机号"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <el-button type="primary" @click="dialogFormVisible = true">添加员工</el-button>
      <el-dialog v-model="dialogFormVisible" title="添加成员" width="30%">
        <el-form :model="ruleForm">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="ruleForm.avatarName" autocomplete="off" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth">
            <el-input v-model="ruleForm.deptNo" autocomplete="off" placeholder="请选择部门" />
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="ruleForm.phoneNumber" autocomplete="off" placeholder="请输入手机号" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确定 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="container">
      <el-table :data="newTableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" align="center" width="80">
        </el-table-column>
        <el-table-column prop="avatarName" label="姓名" align="center" width="auto">
        </el-table-column>
        <el-table-column prop="deptNo" align="center" label="部门" width="auto">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" align="center" width="auto">
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="delate(scope.row)">删除</el-button>
            <el-button link type="primary" size="small" @click="patch(scope.row)">编辑</el-button>
            <el-dialog v-model="dialogFormVisible1" title="修改信息" width="30%">
              <el-form :model="patchForm">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="patchForm.avatarName" autocomplete="off" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                  <el-input v-model="patchForm.deptNo" autocomplete="off" placeholder="请选择部门" />
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="patchForm.phoneNumber" autocomplete="off" placeholder="请输入手机号" />
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible1 = false">取消</el-button>
                  <el-button type="primary" @click="dialogFormVisible1 = false">确定 </el-button>
                </span>
              </template>
            </el-dialog>

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
import { reactive, ref, computed, onMounted } from 'vue'
import { getUserListApi, whereUserListApi, patchUserListApi } from '@/api/api'
let from = reactive({
  avatarName: '',
  phoneNumber: ''
})
const ruleForm = reactive({
  avatarName: "",
  deptNo: 0,
  phoneNumber: ""
})
let patchForm = ref({
  avatarName: "",
  deptNo: 0,
  phoneNumber: ""
})
let dialogFormVisible = ref(false)
let dialogFormVisible1 = ref(false)
let formLabelWidth = ref('8rem')
let currentPage = ref(1)
let pagingItem = ref(10)
let tableData = ref([])
let val = computed(() => {
  return tableData.value.length
})
//计算属性计算出分页后需要的用户信息
let newTableData = computed(() => {
  return tableData.value.slice(
    (currentPage.value - 1) * pagingItem.value,
    currentPage.value * pagingItem.value
  )
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

onMounted(() => {
  UserListApi()
})
//调用接口获取人员信息
let UserListApi = async function () {
  await getUserListApi().then(res => {
    console.log(res);
    tableData.value = JSON.parse(JSON.stringify(res.data.data))
  }).catch(error => {
    console.log(error);
  })
}
const deleteRow = (index: number) => {
  let arr = tableData.value;
  arr.splice((currentPage.value - 1) * pagingItem.value + index, 1)
  tableData.value = arr;
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
}
const handleSizeChange = function (val: any) {
  pagingItem.value = val
}
const handleCurrentChange = function (val: any) {
  currentPage.value = val
}
const search = function () {
  // whereUserListApi()
  let list = reactive(JSON.parse(JSON.stringify(tableData.value)))
  console.log(tableData.value);

  let from1: any = reactive({
    avatarName: {
      filter: (key: any) => {
        return !from.avatarName
          ? key
          : key.filter((item: any) => {
            return item.avatarName.includes(from.avatarName)
          })
      }
    },
    phoneNumber: {
      filter: (key: any) => {
        return !from.phoneNumber
          ? key
          : key.filter((item: any) => {
            return item.phoneNumber.includes(from.phoneNumber)
          })
      }
    }

  })
  Object.keys(from1).forEach((key1: any) => {
    list = from1[key1].filter(list)
  })
  currentPage.value = 1
  tableData.value = list
}
const patch = function (val: any) {
  console.log(val.id);
  dialogFormVisible1.value = true
  patchForm.value=val
  // patchUserListApi(val.id, {
  // }).then(res=>{
  // console.log(res)
  // })
}
const delate = function (val: any) {
  // delateUserListApi(val.id, {
  // }).then(res=>{
  // console.log(res)
  // })
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
        height: 4rem;
        width: 25rem;
      }

      .clear {
        margin: 0;
      }
    }



  }

  .container {
    margin: 2rem 0;

    .table-link {
      font-size: 14px;
      margin: 0 5px;
    }

  }

}
</style>