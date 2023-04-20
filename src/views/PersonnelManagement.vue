<template>
  <div class="user-list">
    <div class="table-title">人员管理</div>
    <div class="header mt-2">
      <div class="search">
        <el-input v-model="from.id" clearable size="large" class="ipt-search" placeholder="通过id查询"></el-input>
        <!-- <el-input v-model="from.phoneNumber" clearable size="large" class="ipt-search" placeholder="搜索手机号"></el-input> -->
        <el-button type="primary" @click="search" size="large">搜索</el-button>
      </div>
      <el-button type="primary" @click="dialogFormVisible = true" size="large">添加员工</el-button>
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
            <el-button type="primary" @click="add">确定 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="container mt-2">
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
            <el-button link type="primary" size="small" @click="patch(scope.row)">修改</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
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
          <el-button type="primary" @click="update">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="block mt-2">
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
  id: '',
  avatarName: '',
  phoneNumber: ''
})
const ruleForm = reactive({
  avatarName: "",
  deptNo: '',
  phoneNumber: ""
})
let patchForm = ref({
  id: '',
  avatarName: "",
  deptNo: '',
  phoneNumber: ""
})
let dialogFormVisible = ref(false)
let dialogFormVisible1 = ref(false)
let formLabelWidth = ref('8rem')
let currentPage = ref(1)
let pagingItem = ref(10)
let tableData = ref([])
let searchtableData: any = ref(tableData)
let val = computed(() => {
  return searchtableData.value.length
})
//计算属性计算出分页后需要的用户信息
let newTableData = computed(() => {
  return searchtableData.value.slice(
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
  getUserList()
})
//调用接口获取人员信息
let getUserList = async function () {
  await getUserListApi().then(res => {
    console.log(res);
    tableData.value = JSON.parse(JSON.stringify(res.data.data))
  }).catch(error => {
    console.log(error);
  })
}
const handleSizeChange = function (val: any) {
  pagingItem.value = val
}
const handleCurrentChange = function (val: any) {
  currentPage.value = val
}
//搜索
const search = function () {
  whereUserListApi(from.id).then((res: any) => {
    if (!from.id) {
      getUserList()
    } else {
      searchtableData.value = [JSON.parse(JSON.stringify(res.data.data))]
    }
    console.log(res);
  })
  // let list = reactive(JSON.parse(JSON.stringify(tableData.value)))
  // console.log(tableData.value);

  // let from1: any = reactive({
  //   avatarName: {
  //     filter: (key: any) => {
  //       return !from.avatarName
  //         ? key
  //         : key.filter((item: any) => {
  //           return item.avatarName.includes(from.avatarName)
  //         })
  //     }
  //   },
  //   phoneNumber: {
  //     filter: (key: any) => {
  //       return !from.phoneNumber
  //         ? key
  //         : key.filter((item: any) => {
  //           return item.phoneNumber.includes(from.phoneNumber)
  //         })
  //     }
  //   }

  // })
  // Object.keys(from1).forEach((key1: any) => {
  //   list = from1[key1].filter(list)
  // })
  // currentPage.value = 1
  // searchtableData.value = list
}
//修改
const patch = function (val: any) {
  console.log(val);
  dialogFormVisible1.value = true
  Object.assign(patchForm.value, val)

}
const update = async function () {
  dialogFormVisible1.value = false
  console.log(patchForm.value.id);
await  patchUserListApi(patchForm.value.id, {
    avatarName: patchForm.value.avatarName,
    deptNo: patchForm.value.deptNo,
    phoneNumber: patchForm.value.phoneNumber
  }).then(res => {
    console.log(res)
    getUserList()
    ElMessage.success('修改成功')
  })
}
// 删除
const delate = function (val: any) {
  // delateUserListApi(val.id, {
  // }).then(res=>{
  // console.log(res)
  // })
}
//增加
const add = function () {
  dialogFormVisible.value = false
}
</script>
<style scoped lang="scss">
.user-list {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  .header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    .search {
      display: flex;
      gap: 1rem;

      .ipt-search {
        width: 25rem;
      }

      .clear {
        margin: 0;
      }
    }



  }

  .container {
    .table-link {
      font-size: 1.5rem;
      margin: 0 0.5rem;
    }

  }

}
</style>