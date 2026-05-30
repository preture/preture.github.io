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
  const level = to.meta?.level
  if (level) {
    const { canAccess, requireAuth } = useAuth()
    if (!canAccess(level)) {
      requireAuth(to.fullPath)
      return false
    }
  }
})

export default router
export { categories }
