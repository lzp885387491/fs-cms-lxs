<template>
  <div class="layout">
    <el-container class="container">
      <div class="aside">
        <el-col :span="24" class="col">
          <el-menu :default-active="route.name" class="el-menu-vertical-demo menu" active-text-color="#ffd04b"
          background-color="#545c64" text-color="#fff" :collapse="isCollapse">
          <img class="fs-icon_title" src="../assets/images/icon-fs_logo3.png" alt="">
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
        </el-col>
      </div>
      <div class="content">
        <el-header class="header">
          <el-icon v-model="isCollapse" @click="collapse" size="3rem">
            <Expand v-if="isCollapse" />
            <Fold v-else />
          </el-icon>
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
        <el-container>

          <div class="main">
            <RouterView></RouterView>
          </div>
        </el-container>
      </div>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Document, CreditCard } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown, Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
const { getUserInfo } = useUserStore();

const userInfo: any = ref({});
const isCollapse = ref(false)
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
    icon: Document,
    label: '危废管理',
    children: [
      {
        label: '危险废物列表',
        name: 'hazardousWasteList'
      },
      {
        label: '危险废物转移记录',
        name: 'hazardousWasteTransferRecords'
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
    ]
  },
  {
    icon: CreditCard,
    label: '封闭化管理',
    children: [
      {
        label: '人员车辆进出管理',
        name: 'PersonVehicleInOutManagement'
      },
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
const collapse = function () {
  isCollapse.value ? isCollapse.value = false : isCollapse.value = true
}

const navigator = function (item: MenuItem) {
  router.push(item.name)
};

(async function () {
  userInfo.value = await getUserInfo();
})()


function nav(name: string): void {
  router.push(name);
}
</script>

<style scoped lang="scss">
.el-menu{
  text-align: center;
}
.fs-icon_title{
  padding: 20px 0;
  width: 80%;
}
.layout {
  height: 100vh;
  width: 100vw;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    // grid-template-columns: 200px auto;

    .aside {
      .col {
        height: 100%;

        .menu {
          height: 100%;
        }
      }
    }

    .content {
      width: 100%;
      box-sizing: border-box;
      .header {
        height: 60px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;

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

          .pointer {
            cursor: pointer;
          }
        }
      }

      .main {
        height: calc(100% - 60px);
        padding: 20px;
        width:calc(100% - 20px) ;
        box-sizing: border-box;
      }
    }

  }
}</style>