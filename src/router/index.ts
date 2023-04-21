import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import Layout from '../views/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      alias: '/',
      component: LoginView
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/parkInfo',
          name: 'parkInfo',
          component: () => import('../views/ParkInfo.vue')
        },
        {
          path: '/setUserInfo',
          name: 'setUserInfo',
          component: () => import('@/views/setUserinfo.vue')
        },
        {
          path: '/ParkCompanyList',
          name: 'ParkCompanyList',
          component: () => import('../views/ParkCompanyList.vue')
        },
        {
          path: '/Personnel',
          name: 'Personnel',
          component: () => import('../views/PersonnelManagement.vue')
        },
        {
          path: '/chemicalManagement',
          name: 'chemicalManagement',
          component: () => import('../views/ChemicalManagement.vue')
        },
        {
          path: '/inspectEarlyWarning',
          name: 'inspectEarlyWarning',
          component: () => import('../views/InspectEarlyWarning.vue')
        },
        {
          path: '/hiddenDangerManagement',
          name: 'hiddenDangerManagement',
          component: () => import('../views/HiddenDangerManagement.vue')
        },
        {
          path: '/accessPark',
          name: 'accessPark',
          component: () => import('../views/AccessPark.vue')
        },
        {
          path: '/meetReservePlan',
          name: 'meetReservePlan',
          component: () => import('../views/MeetReservePlan.vue')
        },
        {
          path: '/ticketCount',
          name: 'ticketCount',
          component: () => import('../views/TicketCount.vue')
        },
        {
          path: '/companyMonitor',
          name: 'companyMonitor',
          component: () => import('../views/CompanyMonitor.vue')
        },
        {
          path: '/parkMonitor',
          name: 'parkMonitor',
          component: () => import('../views/ParkMonitor.vue')
        },
        {
          path: '/materialEmergency',
          name: 'materialEmergency',
          component: () => import('../views/MaterialEmergency.vue')
        },
        {
          path: '/emergencyDrill',
          name: 'emergencyDrill',
          component: () => import('../views/EmergencyDrill.vue')
        },
        {
          path: '/factorySite',
          name: 'factorySite',
          component: () => import('../views/FactorySite.vue')
        },
        {
          path: '/materialOutIn',
          name: 'materialOutIn',
          component: () => import('../views/MaterialOutIn.vue')
        },
        //角色管理
        {
          path: '/roleManagement',
          name: 'roleManagement',
          component: () => import('../views/RoleManagement.vue')
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue')
    }
  ]
})

export default router
