import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import EmptyFeature from '../views/EmptyFeature.vue'
import ItemEditTab from '../views/tabs/ItemEditTab.vue'
import EnvEditTab from '../views/tabs/EnvEditTab.vue'
import SpeechLog from '../views/tabs/SpeechLog.vue'
import DeepCosplayViewMainTemplate from '@src/views/tabs/deepCosplay/ViewMainTemplate.vue'
import DeepCosplayViewExecutionLog from '@src/views/tabs/deepCosplay/ViewExecutionLog.vue'

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
        path: '/deepcosplay-main-template',
        component: DeepCosplayViewMainTemplate,
      },
      {
        path: '/deepcosplay-view-execution-log',
        component: DeepCosplayViewExecutionLog,
      },
      {
        path: '/speech-log',
        component: SpeechLog,
      },
      {
        path: '/item-edit',
        component: ItemEditTab,
      }, 
      {
        path: '/env-edit',
        component: EnvEditTab,
      },
      {
        path: '/empty-feature',
        component: EmptyFeature,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
