<template>
  <div class="job-list">
    <div class="main">
      <div class="table-title">园区基础信息管理</div>
      <div class="search mt-2">

        <el-button type="primary" @click="jobReport" size="large">添加厂区信息</el-button>
        <el-dialog title="添加厂区信息" v-model="dialogFormVisible" width="50%">
          <el-form :model="addForm" size="default">
            <el-form-item label="厂区名称" :required="true" :label-width="formLabelWidth">
              <el-input v-model="addForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="法定负责人" :required="true" :label-width="formLabelWidth">
              <el-input v-model="addForm.person" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="厂区面积" :required="true" :label-width="formLabelWidth">
              <el-input v-model="addForm.area" type="text" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入数字"
                autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="厂区描述" :required="true" :label-width="formLabelWidth">
              <el-input v-model="addForm.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="位置" :required="true" :label-width="formLabelWidth">
              <el-input v-model="addForm.location" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="厂区创建日期" :required="true" :label-width="formLabelWidth">
              <el-date-picker v-model="addForm.createDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="办公人数" :required="true" :label-width="formLabelWidth">
              <el-input v-model="addForm.workPerson" autocomplete="off" type="text"
                oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入数字"></el-input>
            </el-form-item>
            <el-form-item label="工人人数" :required="true" :label-width="formLabelWidth">
              <el-input v-model="addForm.workerPerson" autocomplete="off" type="text"
                oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入数字"></el-input>
            </el-form-item>
            <el-form-item label="企业总人数" :required="true" :label-width="formLabelWidth">
              <el-input v-model="addForm.totalPerson" autocomplete="off" type="text"
                oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入数字"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="dialogFormVisible = false" size="default">取 消</el-button>
            <el-button type="primary" @click="addInformation" size="default">确 定</el-button>
          </template>
        </el-dialog>
      </div>
      <div class="table mt-2">
        <el-table :data="tableData" :border="true" class="table-content" style="width: 100%"
          :header-cell-style="headerCellStyle" :cell-style="cellStyle">
          <el-table-column prop="name" label="厂区名称" width="auto"></el-table-column>
          <el-table-column prop="person" label="法定责任人" width="auto"></el-table-column>
          <el-table-column prop="area" label="厂区面积" width="auto"></el-table-column>
          <el-table-column prop="description" label="厂区描述" width="auto"></el-table-column>
          <el-table-column prop="location" label="位置" width="auto"></el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="auto">
            <template #default="scoped">{{ Dates(scoped.row.createTime) }}</template>
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
                  <el-button @click="deleteRow(scope.$index)" type="text" class="table-clink" size="small">删除</el-button>
                </template>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref, computed } from 'vue'
import { getParkInfo, createPark } from '@/api/api';
import type { cretaePark } from '@/types/xhrPayLoadApi';
const visible = ref(false);
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
  description: '厂区描述',
  createDate: '创建日期',
  workPerson: '办公人数',
  workerPerson: '工人人数',
  totalPerson: '总数'
})
const Dates = function (time: any): void {
  var date = new Date(time).toJSON()
  var timeft: any = new Date(+new Date(date))
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
  return timeft
}
let addForm = reactive({
  name: '',
  person: '',
  area: '',
  description: '',
  createDate: '',
  workPerson: '',
  workerPerson: '',
  totalPerson: '',
  location: '',
})
let dialogFormVisible = ref(false)
let formLabelWidth = ref('120px')
let tableData: any = ref([]);
const getParkList = function(){
  getParkInfo().then((res) => {
    tableData.value = res.data.data;
  });
}
getParkList();
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

const addInformation = async function () {
  if (chek(addForm)) {
    dialogFormVisible.value = false
    let froms = JSON.parse(JSON.stringify(addForm))
    tableData.value.push(froms);
    let flag = await createParkInfo(froms);
    if (flag) {
      ElMessage({
        message: '创建成功',
        type: 'success'
      })
    } else {
      ElMessage({
        message: '创建失败o.o,稍后在试',
        type: 'success'
      })
    }

  }
}

const jobReport = function () {
  dialogFormVisible.value = true
  Object.assign(addForm, {
    name: '',
    person: '',
    area: '',
    description: '',
    createDate: '',
    workPerson: '',
    workerPerson: '',
    totalPerson: '',
    location: ''
  })
}

const deleteRow = function (index: any) {

  let arr = tableData.value;
  tableData.value = arr;
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
}
// 创建园区
const createParkInfo = async function (data: cretaePark) {
  let value = false;
  let res = await createPark(data);
  if (res.data.code == 200) { value = true; };
  return value;
}
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