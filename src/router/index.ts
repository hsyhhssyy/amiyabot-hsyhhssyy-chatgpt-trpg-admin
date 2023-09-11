import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import EmptyFeature from '../views/EmptyFeature.vue'
import ItemEditTab from '../views/tabs/ItemEditTab.vue'
import EnvEditTab from '../views/tabs/EnvEditTab.vue'

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
