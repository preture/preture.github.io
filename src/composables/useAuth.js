import { ref, computed } from 'vue'
import { users } from '../config/auth'

const AUTH_KEY = 'preture-auth'

const _authenticated = ref(sessionStorage.getItem(AUTH_KEY) === 'true')
const _currentUser = ref(sessionStorage.getItem('preture-user') || '')
const _pendingRoute = ref(null)

async function sha256(str) {
  const enc = new TextEncoder().encode(str)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function useAuth() {
  async function login(username, password) {
    const hash = await sha256(password)
    const user = users.find(
      (u) => u.username === username && u.passwordHash === hash
    )
    if (user) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      sessionStorage.setItem('preture-user', username)
      _authenticated.value = true
      _currentUser.value = username
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY)
    sessionStorage.removeItem('preture-user')
    _authenticated.value = false
    _currentUser.value = ''
  }

  const isAuthenticated = computed(() => _authenticated.value && users.length > 0)
  const currentUser = computed(() => _currentUser.value)
  const isConfigured = computed(() => users.length > 0)
  const pendingRoute = computed(() => _pendingRoute.value)

  function requireAuth(path) {
    _pendingRoute.value = path
  }

  function clearPendingRoute() {
    _pendingRoute.value = null
  }

  return {
    isAuthenticated,
    isConfigured,
    currentUser,
    pendingRoute,
    login,
    logout,
    requireAuth,
    clearPendingRoute,
  }
}
