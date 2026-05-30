import { createRouter, createWebHashHistory } from 'vue-router'
import { buildRoutes } from '../content'
import { categories } from '../config/site'
import { useAuth } from '../composables/useAuth'

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
