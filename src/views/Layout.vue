<template>
  <div class="layout">
    <el-container>
      <el-header class="header">
        <h3>浮山化工园区ERP管理平台</h3>
      </el-header>
      <el-container class="container">
        <el-aside width="220px">
          <el-menu :default-active="route.name" class="el-menu-vertical-demo">
            <el-sub-menu :index="item.label" v-for="item in menu">
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.label }}</span>
              </template>
              <el-menu-item @click="navigator(children)" :index="children.name" v-for="children in item.children">{{
                children.label }}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Document, Menu as Setting } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface MenuItem {
  label: string
  name: string
}

const menu = [
  {
    icon: Document,
    label: '园区基本信息',
    children: [
      {
        label: '园区公司列表',
        name: 'ParkCompanyList'
      },
      {
        label: '园区基础信息管理',
        name: 'parkInfo'
      },
      {
        label: '人员管理',
        name: 'deviceOverhaul'
      }
    ]
  },
  {
    icon: Document,
    label: '应急管理',
    children: [
      {
        label: '应急救援物资',
        name: 'materialEmergency'
      },
      {
        label: '应急预案管理',
        name: 'meetReservePlan'
      },
      {
        label: '应急事件管理',
        name: 'emergencyDrill'
      },
    ]
  },
  {
    icon: Setting,
    label: '园区监控',
    children: [
      {
        label: '卡口管理',
        name: 'parkMonitor'
      },
      // {
      //   label: '危出入园管理',
      //   name: 'accessPark'
      // },
      // {
      //   label: '公司监控',
      //   name: 'companyMonitor'
      // },
    ]
  },
  // {
  //   icon: IconMenu,
  //   label: '重大危险源安全管理',
  //   children: [
  //     {
  //       label: '危化品管理',
  //       name: 'chemicalManagement'
  //     },
  //     {
  //       label: '在线检测预警',
  //       name: 'inspectEarlyWarning'
  //     },
  //     {
  //       label: '隐患管理',
  //       name: 'hiddenDangerManagement'
  //     }
  //   ]
  // },
]

const navigator = function (item: MenuItem) {
  router.push(item.name)
}
</script>

<style scoped>
.layout {
  height: 100vh;
}

.layout .header {
  line-height: 60px;
  border-bottom: 1px solid #ccc;
}

.container {
  height: calc(100vh - 60px);
}

.el-menu {
  height: 100%;
}

:deep(.el-main) {
  padding: 0 !important;
}
</style>