<template>
  <div class="user-list">
    <div class="table-title">人员管理</div>
    <div class="header mt-2">
      <div class="search">
        <el-input v-model="from.avatarName" clearable size="large" class="ipt-search" placeholder="通过姓名查询"></el-input>
        <!-- <el-input v-model="from.phoneNumber" clearable size="large" class="ipt-search" placeholder="搜索手机号"></el-input> -->
        <el-button type="primary" @click="search" size="large">搜索</el-button>
      </div>
    </div>
    <div class="container mt-2">
      <el-table :data="newTableData" style="width: 100%" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
        <el-table-column prop="id" label="序号" align="center" width="80">
        </el-table-column>
        <el-table-column prop="avatarName" label="姓名" align="center" width="auto">
        </el-table-column>
        <el-table-column align="center" label="职位" width="auto">
          <template #default="scope">
            {{ positionName(scope.row.deptNo) }}
          </template>
        </el-table-column>
        <el-table-column prop="enterprise.name" label="企业名称" align="center" width="auto"></el-table-column>
        <el-table-column prop="identityCard" label="身份证号" align="center" width="auto">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" align="center" width="auto">
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="patch(scope.row)">修改</el-button>
            <el-button link type="primary" size="small" @click="detail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible1" title="修改信息" width="30%">
      <el-form :model="patchForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="patchForm.avatarName" autocomplete="off" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-select v-model="patchForm.deptNo" class="m-2" placeholder="请选择职位">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-select v-model="patchForm.enterprise" class="m-2" placeholder="请选择职位">
            <el-option v-for="item in enterprise" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="patchForm.phoneNumber" autocomplete="off" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="patchForm.identityCard" autocomplete="off" placeholder="请输入身份证号" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取消</el-button>
          <el-button type="primary" @click="update">确定</el-button>
        </span>
      </template>
    </el-dialog>
     <!-- 详情 -->
     <el-dialog title="当前详情" v-model=" detailDialog " width="30%">
        <div class="m-20">姓名：{{ detailForm.avatarName }}</div>
        <div class="m-20">职位：{{positionName(detailForm.deptNo)  }}</div>
        <div class="m-20">手机号：{{ detailForm.phoneNumber }}</div>
        <div class="m-20">身份证号：{{ detailForm.identityCard }}</div>
        <div class="m-20">公司：{{ detailForm.enterprise.name }}</div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click=" detailDialog = false ">取 消</el-button>
                <el-button type="primary" @click=" detailDialog = false">确 定</el-button>
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
import { getUserListApi, patchUserListApi,getUserApi, getEnterpriseList, getRoleListApi } from '@/api/api'
let from = reactive({
  id: '',
  avatarName: '',
  phoneNumber: ''
})
let patchForm = ref({
  id: '',
  avatarName: "",
  deptNo: '',
  phoneNumber: "",
  identityCard: '',
  enterprise: {
    name:''
  },
})
let detailForm = ref({
  id: '',
  avatarName: "",
  deptNo: '',
  phoneNumber: "",
  identityCard: '',
  enterprise: {
    name:''
  }
})
let roleList: any = ref([])
let dialogFormVisible1 = ref(false)
let detailDialog = ref(false)
let formLabelWidth = ref('10rem')
let currentPage = ref(1)
let pagingItem = ref(10)
let tableData = ref([])
let searchtableData = ref([])
let enterprise: any = ref([])
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
onMounted(async () => {
  await getRoleList()
  getUserList()
  EnterpriseList()
})
//调用接口获取人员信息
async function getUserList() {
  let res =  await getUserListApi()
    console.log(res);
    tableData.value = res.data.data
    searchtableData.value = res.data.data
    return res
}
//获取职位角色信息
async function getRoleList() {
  let res = await getRoleListApi()
  roleList.value = res.data.data
  console.log(roleList.value);
  return res
}
//获取企业信息
async function EnterpriseList() {
  let res =  await getEnterpriseList()
    enterprise.value = res.data
    return res
}
const handleSizeChange = function (val: any) {
  pagingItem.value = val
}
const handleCurrentChange = function (val: any) {
  currentPage.value = val
}

//获取职位ID所对应的职位名称
const positionName = function (deptNo: any) {
  if (deptNo == 0) return "暂无"
  return roleList.value.find((element: any) => deptNo == element.id).name
}
//搜索
const search = function () {
  // getUserApi(from.id).then((res: any) => {
  //   if (!from.id) {
  //     getUserList()
  //   } else {
  //     searchtableData.value = [JSON.parse(JSON.stringify(res.data.data))]
  //   }
  //   console.log(res);
  // })
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
  searchtableData.value = list
}
//修改
const patch = function (val: any) {
  console.log(val);
  dialogFormVisible1.value = true
  Object.assign(patchForm.value, val)
  if (val.deptNo == 0) patchForm.value.deptNo = "暂无"

}
const update = async function () {
  dialogFormVisible1.value = false
  console.log(patchForm.value);

  await patchUserListApi(patchForm.value.id, {
    avatarName: patchForm.value.avatarName,
    deptNo: patchForm.value.deptNo,
    phoneNumber: patchForm.value.phoneNumber,
    identityCard: patchForm.value.identityCard,
    enterprise: patchForm.value.enterprise
  }).then(res => {
    getUserList()
    ElMessage.success('修改成功')
  }).catch((error: any) => {
    console.log(error);
    ElMessage.success('修改失败')
  })
}
//详情
const detail = async function (row: any) {
    detailDialog.value = true
    await getUserApi(row.id).then(res => {
      console.log(res);    
      Object.assign(detailForm.value,res.data.data)
    }).catch(error => {
        console.log(error);
    })
}
</script>
<style scoped lang="scss">
.user-list {
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    .search {
      display: flex;
      gap: 1rem;

      .ipt-search {
        width: 30rem;
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
.m-20{
  margin: 2rem;
    word-wrap: break-word;
}
</style>