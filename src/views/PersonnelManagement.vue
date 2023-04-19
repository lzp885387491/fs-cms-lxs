<template>
  <div class="user-list">
    <div class="header">
      <div class="search">
        <el-input v-model="from.avatarName" class="ipt-search" placeholder="搜索员工"></el-input>
        <!-- <el-select v-model="from.deptNo" multiple collapse-tags size="small" @change="selectChange" placeholder="请选择部门">
          <el-option v-for="item in newDeptNoList" :key="item.deptId" :label="item.name" :value="item.deptId">
          </el-option>
        </el-select>
        <el-select v-model="from.roles" size="small" clearable placeholder="请选择职位">
          <el-option v-for="(item, index) in newPosition" :key="index" :label="item.value" :value="item.id">
          </el-option>
        </el-select> -->
        <!-- <el-date-picker v-model="from.time" size="small" type="date" placeholder="选择入职日期">
                </el-date-picker> -->
        <el-input v-model="from.phoneNumber" class="ipt-search" placeholder="搜索手机号"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <!-- <el-button type="info" class="clear" size="small" @click="clear">清除</el-button> -->
      </div>
      <!-- <el-button type="primary" @click="dialogFormVisible = true" size="small">添加员工</el-button>
      <el-dialog title="添加成员" class="dialog" width="30%" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" hide-required-asterisk :rules="rules" ref="ruleForm" label-width="40px"
          class="demo-ruleForm">
          <el-form-item prop="name" class="form-item">
            <span slot="label">
              <i class="el-icon-user"></i>
            </span>
            <el-input v-model="ruleForm.name" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="name" class="form-item">
            <span slot="label">
              <i class="el-icon-user"></i>
            </span>
            <el-input v-model="ruleForm.avatarName" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item prop="pass" class="form-item">
            <span slot="label">
              <i class="el-icon-lock"></i>
            </span>
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"
              show-password></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" class="form-item">
            <span slot="label" class="label">
              <i class="el-icon-lock"></i>
            </span>
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码"
              show-password></el-input>
          </el-form-item>
          <el-form-item label-width="auto" class="btn">
            <el-button type="primary" size="medium" class="btn-medium" @click="submitForm('ruleForm')">注册</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog> -->
    </div>
    <div class="container">
      <el-table :data="newTableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" align="center" width="80">
        </el-table-column>
        <el-table-column prop="avatarName" label="姓名" align="center" width="auto">
        </el-table-column>
        <el-table-column prop="deptNo" align="center" label="部门" width="auto">
          <!-- <template slot-scope="scope">
            {{ department(scope.row.deptNo) }}
          </template> -->
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" align="center" width="auto">
        </el-table-column>
        <!-- <el-table-column align="center" label="操作" width="auto">
          <template slot-scope="scope">
            <el-link type="primary" class="table-link" :underline="false">编辑</el-link>
          </template>
        </el-table-column> -->
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
import { getUserListApi } from '@/api/api'
let from = reactive({
  avatarName: '',
  phoneNumber: ''
})

const ruleForm = reactive({
  pass: "",
  name: "",
  checkPass: '',
  avatarName: ''
},)
let dialogFormVisible = ref(false)
let formLabelWidth = ref('120px')
let currentPage = ref(1)
let pagingItem = ref(10)
let tableData = reactive([])
let searchtableData = ref([])
let val = ref(0)
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
  UserListApi()
})
//调用接口获取人员信息
let UserListApi =  function () {
   getUserListApi().then(res => {
    console.log(res);
    tableData = JSON.parse(JSON.stringify(res.data.data))
    searchtableData.value = tableData
    val.value = tableData.length
  }).catch(error => {
    console.log(error);
  })
}
const deleteRow = (index: number) => {
  let arr = tableData;
  arr.splice((currentPage.value - 1) * pagingItem.value + index, 1)
  tableData = arr;
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
  let list = reactive(JSON.parse(JSON.stringify(tableData)))
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
  searchtableData.value = list
  val.value = searchtableData.value.length
  console.log(Array.isArray(searchtableData.value));

  
}
const jobReport = function () {
  dialogFormVisible.value = true
  Object.assign(from, {
    avatarName: ''
  })
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