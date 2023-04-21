<template>
  <div class="job-list">
    <div class="main">
      <div class="df">
        <div class="table-title">园区基础信息管理</div>
        <el-button type="primary" @click="upDate" size="large"
            :class="tableData.name == '' ? 'none' : ''">修改信息</el-button>
            <el-button type="primary" @click="jobReport" size="large"
              :class="tableData.name == '' ? '' : 'none'">添加厂区信息</el-button>
      </div>
      <div class="search mt-2">
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
      <!-- 园区信息 -->
      <el-form :class="tableData.name == '' ? 'none' : ''" label-position="right" label-width="100px" :model="tableData" style="max-width: 50%;margin: 0 auto;">
        <el-form-item :label="addFormRule.name">
          <el-input v-model="tableData.name" :disabled="disabled">

          </el-input>
        </el-form-item>
        <el-form-item :label="addFormRule.person">
          <el-input v-model="tableData.person" :disabled="disabled">

          </el-input>
        </el-form-item>
        <el-form-item :label="addFormRule.area">
          <el-input v-model="tableData.area" @input="tableData.area = (tableData.area.replace(/[^0-9.]/g,''))" :disabled="disabled">
            <template #append>平方公里</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="addFormRule.description">
          <el-input v-model="tableData.description" :disabled="disabled">

          </el-input>
        </el-form-item>
        <el-form-item :label="addFormRule.createDate">
          <el-input v-model="tableData.createDate" :disabled="disabled">

          </el-input>
        </el-form-item>
        <el-form-item :label="addFormRule.workPerson">
          <el-input v-model="tableData.workPerson" @input="tableData.workPerson = Number(tableData.workPerson.replace(/[^\d]/g,''))" :disabled="disabled">

          </el-input>
        </el-form-item>
        <el-form-item :label="addFormRule.workerPerson">
          <el-input v-model="tableData.workerPerson" @input="tableData.workerPerson = Number(tableData.workerPerson.replace(/[^\d]/g,''))" :disabled="disabled">

          </el-input>
        </el-form-item>
        <el-form-item :label="addFormRule.totalPerson">
          <el-input v-model="tableData.totalPerson" @input="tableData.totalPerson = Number(tableData.totalPerson.replace(/[^\d]/g,''))" :disabled="disabled">

          </el-input>
        </el-form-item>
        <el-form-item :label="addFormRule.location">
          <el-input v-model="tableData.location" :disabled="disabled">

          </el-input>
        </el-form-item>
        <div class="df-sa">
          <el-button type="primary" @click="determine" size="large"
              :class="disabled ? 'none' : ''">确定</el-button>
              <el-button type="primary" @click="cancellation" size="large"
              :class="disabled ? 'none' : ''">取消</el-button>
        </div>
      </el-form>
      <el-empty description="暂无数据" :class="tableData.name == '' ? '' : 'none'"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref, computed } from 'vue'
import { getParkInfo, createPark, updateParkInfo } from '@/api/api';
import type { cretaePark } from '@/types/xhrPayLoadApi';
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
  totalPerson: '总数',
  location: '位置'
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
let disabled = ref(true);
let tableData: any = ref({
  name: ''
});
const getParkList = function () {
  getParkInfo().then((res) => {
    res.data.data.forEach((el: any) => {
      tableData.value = el;
    });
  });
}
getParkList();

const addInformation = async function () {
  if (chek(addForm)) {
    dialogFormVisible.value = false
    let froms = JSON.parse(JSON.stringify(addForm))
    tableData.value = froms;
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

// 创建园区
const createParkInfo = async function (data: cretaePark) {
  let value = false;
  let res = await createPark(data);
  if (res.data.code == 200) { value = true; };
  return value;
}
// 修改园区信息
const upDate = function(){
  disabled.value = false
}
// 确定
const determine = async function(){
  console.log(tableData.value);
  
  let res = await updateParkInfo(tableData.value);
  if (res.data.code == 200) {
    disabled.value = true;
    ElMessage({
      message: "修改成功",
      type: 'success'
    })
    getParkList()
  };
}
// 取消m
const cancellation = function(){
  disabled.value = true;
  getParkList();
}
</script>
<style scoped lang="scss">
:deep(.el-dialog .el-input__wrapper) {
  flex-grow: 0;
  width: 28rem;
}
.df{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.df-sa{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
:deep(.el-dialog .el-input__inner) {
  flex-grow: 0;
  width: 28rem;
}

.none {
  display: none;
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