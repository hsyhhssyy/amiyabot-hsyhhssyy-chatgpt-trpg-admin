import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import SpeechLog from '../views/tabs/trpg/SpeechLog.vue'
import ViewTemplate from '@src/views/tabs/common/ViewTemplate.vue'
import ViewExecutionLog from '@src/views/tabs/common/ViewExecutionLog.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/template-editor',
        component: ViewTemplate,
      },
      {
        path: '/view-execution-log',
        component: ViewExecutionLog,
      },
      {
        path: '/speech-log',
        component: SpeechLog,
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
