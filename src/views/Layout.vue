<template>
  <div class="layout">
    <el-container>
      <el-header class="header">
        <h3>浮山化工园区ERP管理平台</h3>
        <div class="user-info">
          <div class="avatar">
            <img src="@/assets/images/user_avatar.png" alt="">
          </div>
          <el-dropdown class="pointer" trigger="click">
            <span class="el-dropdown-link">
              <span>{{ userInfo.avatarName ? userInfo.avatarName : '用户昵称' }}</span>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="pointer" :icon="Setting" @click="nav('setUserInfo')">修改个人信息</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside width="220px">
          <el-menu :default-active="route.name" class="el-menu-vertical-demo">
            <el-sub-menu :index="item.label" v-for="(item, index) in menu" :key=index>
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.label }}</span>
              </template>
              <el-menu-item @click="navigator(children)" :index="children.name" v-for="(children, index) in item.children"
                :key="index">{{
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
import { Document, } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown, Setting } from '@element-plus/icons-vue'
import { getUserInfoApi } from '@/api/api'
import { ref } from 'vue'
import { userStore } from '@/stores/userInfo'

const route = useRoute()
const router = useRouter()
let userInfo: any = ref({})

let userStorePinia = userStore();


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
        name: 'Personnel'
      },
      {
        label: '园区建筑位置',
        name: 'buildSite'
      },
      {
        label: '角色管理',
        name: 'roleManagement'     
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
      {
        label: '物资出入库',
        name: 'materialOutIn'
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

async function getUserInfo() {
  const res: any = await getUserInfoApi();
  if (res.data.code == 200) {
    userInfo.value = JSON.parse(JSON.stringify(res.data.data));
    userStorePinia.setUserStore('userinfo', userInfo.value);
  }
}
getUserInfo()

function nav(name: string): void {
  router.push(name);
}
</script>

<style scoped lang="scss">
.layout {
  height: 100vh;
}

.pointer {
  cursor: pointer;
}

.layout .header {
  height: 60px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 16px;
  }

  .user-info {
    display: flex;
    align-items: center;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.container {
  height: calc(100vh - 60px);

}

.el-menu {
  height: 100%;
}
</style>