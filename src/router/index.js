import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchPage from '../views/SearchPage.vue'
import { buildRoutes } from '../content'
import { categories } from '../config/site'

const contentRoutes = buildRoutes()

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage,
  },
  ...contentRoutes,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
export { categories }
