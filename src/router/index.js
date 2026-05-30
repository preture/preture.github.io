import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchPage from '../views/SearchPage.vue'
import { buildRoutes } from '../content'
import { categories } from '../config/site'
import { useAuth } from '../composables/useAuth'

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

router.beforeEach((to) => {
  if (to.meta?.hidden) {
    const { isAuthenticated, requireAuth } = useAuth()
    if (!isAuthenticated.value) {
      requireAuth(to.fullPath)
      return false
    }
  }
})

export default router
export { categories }
