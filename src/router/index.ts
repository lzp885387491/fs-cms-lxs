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
          path: '/deviceOverhaul',
          name: 'deviceOverhaul',
          component: () => import('../views/DeviceOverhaul.vue')
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
        }
      ]
    },
  ]
})

export default router
