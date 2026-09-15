import { createRouter, createWebHashHistory } from 'vue-router'
import { buildRoutes } from '../content'
import { categories } from '../config/site'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchPage.vue'),
  },
  ...buildRoutes(),
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
export { categories }
